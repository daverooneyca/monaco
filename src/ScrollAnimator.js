export default class ScrollAnimator {
  constructor(scrollInterface, options = {}) {
    this.scrollInterface = scrollInterface;
    this.animationDuration = options.animationDuration || 1000;
    this.currentScrollAnimation = null;
    this.targetTop = null;
    this.animatedTop = null;
    this.currentVelocity = 0;
    this.lastFrameTime = null;
  }

  /**
   * Rounds a scroll position to prevent sub-pixel jitter during animation.
   * Uses simple rounding to minimize discrete jump size (max 0.5 pixels).
   * @param {number} position - The raw scroll position
   * @returns {number} The rounded scroll position
   */
  alignToZoom(position) {
    // Simple rounding produces much smaller visual artifacts than complex alignment factors
    // Max error is 0.5 pixels vs up to 2 pixels with alignment factors
    return Math.round(position);
  }

  /**
   * Gets the stopping threshold for the animation.
   * Uses a fixed threshold of 0.5 pixels - small enough to be imperceptible
   * but large enough to avoid excessive animation frames.
   * @returns {number} The position threshold for stopping the animation
   */
  getStoppingThreshold() {
    return 0.5;
  }

  animateTo(newTop, immediate = false) {
    this.targetTop = newTop;

    if (immediate) {
      if (this.currentScrollAnimation !== null) {
        cancelAnimationFrame(this.currentScrollAnimation);
        this.currentScrollAnimation = null;
      }
      this.lastFrameTime = null;
      this.animatedTop = null;
      this.currentVelocity = 0;
      // Align to zoom level even for immediate scrolls to prevent jitter
      this.scrollInterface.setScrollTop(this.alignToZoom(newTop));
      return;
    }

    // If an animation is already running, it will pick up the new targetTop in its next frame
    if (this.currentScrollAnimation !== null) {
      return;
    }

    const animate = currentTime => {
      if (!this.lastFrameTime) {
        this.lastFrameTime = currentTime;
      }
      let deltaTime = currentTime - this.lastFrameTime;
      this.lastFrameTime = currentTime;

      // Cap deltaTime to avoid massive jumps after a pause (e.g., tab backgrounded)
      if (deltaTime > 100) {
        deltaTime = 16.6;
      }

      // Avoid division by zero or negative time
      if (deltaTime <= 0) {
        this.currentScrollAnimation = requestAnimationFrame(animate);
        return;
      }

      if (this.animatedTop === null) {
        this.animatedTop = this.scrollInterface.getScrollTop();
      }

      // Critically Damped Spring algorithm for perfectly smooth motion following a moving target.
      // tau controls the "snappiness" (lower = snappier, higher = smoother).
      const tau = this.animationDuration / 4;
      const omega = 2.0 / tau;
      const x = omega * deltaTime;
      const exp = 1.0 / (1.0 + x + 0.48 * x * x + 0.235 * x * x * x);
      const change = this.animatedTop - this.targetTop;
      const temp = (this.currentVelocity + omega * change) * deltaTime;

      this.currentVelocity = (this.currentVelocity - omega * temp) * exp;
      this.animatedTop = this.targetTop + (change + temp) * exp;

      // When we're close enough and velocity is low, snap to the target and stop the animation
      // Use zoom-adjusted threshold to prevent sub-pixel jitter at non-integer zoom levels
      const stoppingThreshold = this.getStoppingThreshold();
      if (Math.abs(this.animatedTop - this.targetTop) < stoppingThreshold && Math.abs(this.currentVelocity) < 0.01) {
        this.scrollInterface.setScrollTop(this.alignToZoom(this.targetTop));
        this.stop();
        return;
      }

      // Align scroll position to zoom level to prevent sub-pixel rendering jitter
      this.scrollInterface.setScrollTop(this.alignToZoom(this.animatedTop));
      this.currentScrollAnimation = requestAnimationFrame(animate);
    };

    this.currentScrollAnimation = requestAnimationFrame(animate);
  }

  stop() {
    if (this.currentScrollAnimation !== null) {
      cancelAnimationFrame(this.currentScrollAnimation);
      this.currentScrollAnimation = null;
    }
    this.lastFrameTime = null;
    this.animatedTop = null;
    this.currentVelocity = 0;
  }

  /**
   * Returns true if an animation is currently running.
   * @returns {boolean}
   */
  isAnimating() {
    return this.currentScrollAnimation !== null;
  }
}
