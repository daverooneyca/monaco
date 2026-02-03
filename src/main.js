import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import ScrollAnimator from './ScrollAnimator.js';

// Suppress benign ResizeObserver loop error from Monaco editor
window.addEventListener('error', (event) => {
  if (event.message?.includes('ResizeObserver loop')) {
    event.stopImmediatePropagation();
  }
});

self.MonacoEnvironment = {
  getWorker() {
    return new editorWorker();
  }
};

const content = `The world has changed

I feel it in the water.

I feel it in the earth.

I smell it in the air.

Much that once was is lost, for none now live who remember it.

It began with the forging of the Great Rings. Three were given to the Elves, immortal, wisest and fairest of all beings. Seven to the Dwarf-Lords, great miners and craftsmen of the mountain halls. And nine, nine rings were gifted to the race of Men, who above all else desire power. For within these rings was bound the strength and the will to govern each race. But they were all of them deceived, for another ring was made. Deep in the land of Mordor, in the Fires of Mount Doom, the Dark Lord Sauron forged a master ring, and into this ring he poured his cruelty, his malice and his will to dominate all life.

One ring to rule them all.

One by one, the free lands of Middle-Earth fell to the power of the Ring, but there were some who resisted. A last alliance of men and elves marched against the armies of Mordor, and on the very slopes of Mount Doom, they fought for the freedom of Middle-Earth. Victory was near, but the power of the ring could not be undone. It was in this moment, when all hope had faded, that Isildur, son of the king, took up his father’s sword.

Sauron, enemy of the free peoples of Middle-Earth, was defeated. The Ring passed to Isildur, who had this one chance to destroy evil forever, but the hearts of men are easily corrupted. And the ring of power has a will of its own. It betrayed Isildur, to his death.

And some things that should not have been forgotten were lost. History became legend. Legend became myth. And for two and a half thousand years, the ring passed out of all knowledge. Until, when chance came, it ensnared another bearer.

It came to the creature Gollum, who took it deep into the tunnels of the Misty Mountains. And there it consumed him. The ring gave to Gollum unnatural long life. For five hundred years it poisoned his mind, and in the gloom of Gollum’s cave, it waited. Darkness crept back into the forests of the world. Rumor grew of a shadow in the East, whispers of a nameless fear, and the Ring of Power perceived its time had come. It abandoned Gollum, but then something happened that the Ring did not intend. It was picked up by the most unlikely creature imaginable: a hobbit, Bilbo Baggins, of the Shire.

For the time will soon come when hobbits will shape the fortunes of all.

---

העולם השתנה

אני מרגיש את זה במים.

אני מרגיש את זה באדמה.

אני מריח את זה באוויר.

הרבה ממה שהיה פעם אבד, כי איש אינו חי עוד שזוכר זאת.

זה התחיל עם חישול הטבעות הגדולות. שלוש ניתנו לאלפים, בני האלפים, החכמים והיפים ביותר מכל היצורים. שבע לאדוני הגמדים, כורים גדולים ואומנים של אולמות ההרים. ותשע, תשע טבעות ניתנו במתנה לגזע בני האדם, אשר מעל לכל חפצים בכוח. כי בתוך הטבעות הללו היה קשור הכוח והרצון לשלוט בכל גזע. אבל כולם הוטעו, כי טבעת נוספת נוצרה. עמוק בארץ מורדור, באש הר האבדון, אדון האופל סאורון יצר טבעת אב, ולתוך טבעת זו הוא שפך את אכזריותו, את זדונו ואת רצונו לשלוט בכל החיים.

טבעת אחת לשלוט בכולם.

אחת אחת, אדמות הארץ התיכונה החופשיות נפלו לידי הטבעת, אך היו כאלה שהתנגדו. ברית אחרונה של אנשים ואלפים צעדה נגד צבאות מורדור, ועל מורדות הר האבדון, הם נלחמו על חירות הארץ התיכונה. הניצחון היה קרוב, אך לא ניתן היה לבטל את כוחה של הטבעת. ברגע זה, כאשר כל התקווה דעכה, איסילדור, בן המלך, לקח את חרב אביו.

סאורון, אויבם של עמי הארץ התיכונה החופשיים, הובס. הטבעת עברה לאיסילדור, שהייתה לו הזדמנות אחת להשמיד את הרוע לנצח, אך לבבותיהם של בני האדם מושחתים בקלות. ולטבעת הכוח יש רצון משלה. היא בגדה באיסילדור, אל מותו.

וכמה דברים שלא היו צריכים להישכח אבדו. ההיסטוריה הפכה לאגדה. אגדה הפכה למיתוס. ובמשך אלפיים וחצי שנה, הטבעת נעלמה מכל ידע. עד שכאשר הגיע המקרה, היא לכדה נושא אחר.

היא הגיעה ליצור גולום, שלקח אותה עמוק לתוך מנהרות הרי הערפל. ושם היא כילתה אותו. הטבעת העניקה לגולום חיים ארוכים באופן לא טבעי. במשך חמש מאות שנה היא הרעילה את מוחו, ובאפלולית מערתו של גולום היא חיכתה. החושך זחל חזרה ליערות העולם. שמועה על צל במזרח, לחישות של פחד אלמוני, וטבעת הכוח הבינה שזמנה הגיע. היא נטשה את גולום, אך אז קרה משהו שהטבעת לא התכוונה אליו. היא נאספה על ידי היצור הכי לא סביר שניתן להעלות על הדעת: הוביט, בילבו בגינס, מהפלך.

כי בקרוב יגיע הזמן שבו הוביטים יעצבו את גורלם של כולם.
`;

// Initialize Monaco language
monaco.languages.register({ id: 'cuescript' });

// Initialize Monaco theme
monaco.editor.defineTheme('cueit-dark', {
  base: 'vs-dark',
  inherit: true,
  rules: [{ background: '111111' }],
  colors: {
    'editor.foreground': '#ffffff',
    'editor.background': '#000000',
    'editorCursor.foreground': '#dddddd',
    'editor.selectionHighlightBackground': '#00000000',
    'editor.selectionBackground': '#bc62b1c0',
    'editor.inactiveSelectionBackground': '#bc62b160',
    'editor.findMatchBackground': '#ff00001c',
    'scrollbarSlider.background': '#ddddddc0',
    'scrollbarSlider.hoverBackground': '#ffffffc0',
    'scrollbarSlider.activeBackground': '#eeeeeec0',
  },
});

const model = monaco.editor.createModel(content, 'cuescript', monaco.Uri.file('example.cue'));

const editor = monaco.editor.create(document.getElementById('editor'), {
  model,
  language: 'cuescript',
  // Language features
  autoIndent: 'none',
  accessibilitySupport: 'off',
  accessibilityPageSize: 1,
  autoClosingBrackets: 'never',
  autoClosingComments: 'never',
  autoClosingDelete: 'never',
  autoClosingOvertype: 'never',
  autoClosingQuotes: 'never',
  autoSurround: 'never',
  'bracketPairColorization.enabled': false,
  colorDecorators: false,
  columnSelection: false,
  contextmenu: false,
  definitionLinkOpensInPeek: false,
  detectIndentation: false,
  disableLayerHinting: true,
  disableMonospaceOptimizations: true,
  fixedOverflowWidgets: false,
  inDiffEditor: false,
  indentSize: 0,
  largeFileOptimizations: true,
  linkedEditing: false,
  links: false,
  matchBrackets: 'never',
  parameterHints: {
    enabled: false,
  },
  renderValidationDecorations: 'off',
  renderWhitespace: 'none',
  renderControlCharacters: false,
  showDeprecated: false,
  showUnused: false,
  smoothScrolling: true,
  snippetSuggestions: 'none',
  tabCompletion: 'off',
  useShadowDOM: true,
  glyphMargin: true,
  lineDecorationsWidth: 0,

  // Experimental features
  experimentalWhitespaceRendering: 'svg',
  experimental: {
    asyncTokenization: true,
  },

  // Disable drag & drop, and drop into editor. Consider implementing these one day.
  dragAndDrop: false,
  dropIntoEditor: {
    enabled: false,
  },

  // Add some padding to the top of the un-scrolled script
  padding: {
    top: 24,
  },

  // Remove line numbers from the left margin
  lineNumbers: 'off',

  // Resize editor if window size changes
  automaticLayout: true,

  // Manually control theme
  autoDetectHighContrast: false,

  // Disable multiple cursors
  multiCursorLimit: 1,

  // Disable minimap
  minimap: {
    enabled: false,
  },

  // No overview ruler
  overviewRulerLanes: 0,

  // No code folding
  folding: false,
  showFoldingControls: 'never',

  // No snippet suggestions
  quickSuggestions: false,
  inlineSuggest: {
    enabled: false,
  },
  suggestOnTriggerCharacters: false,
  suggest: {
    snippetsPreventQuickSuggestions: true,
    preview: false,
    selectionMode: 'never',
  },

  // Editor guides
  guides: {
    bracketPairsHorizontal: false,
    indentation: false,
  },

  // Disable hovers
  hover: {
    enabled: false,
  },

  // Disable lightbulb
  lightbulb: {
    enabled: 'off',
  },

  // Disable sticky scroll
  stickyScroll: {
    enabled: false,
  },

  // Disable smart select
  smartSelect: {
    selectSubwords: false,
    selectLeadingAndTrailingWhitespace: false,
  },

  // Render line highlight disable
  renderLineHighlight: 'none',

  // Remove unusual line terminators automatically
  unusualLineTerminators: 'auto',

  // Determine unicode behavior
  unicodeHighlight: {
    ambiguousCharacters: false,
    nonBasicASCII: false,
    invisibleCharacters: false,
  },

  // Disable codelens
  codeLens: false,

  // Do not add rounded borders to editor selection
  roundedSelection: false,

  // Remove automatic word selections
  selectionHighlight: false,
  occurrencesHighlight: 'off',
  semanticHighlighting: {
    enabled: false,
  },

  // Override paste
  pasteAs: {
    enabled: false,
  },
  formatOnPaste: false,

  // Allow scrolling past the last line
  scrollBeyondLastLine: true,

  // Setup scrollbar
  scrollbar: {
    horizontal: 'hidden',
  },

  // Wrap lines at viewport width
  wordWrap: 'on',
  // Advanced wrapping strategy - necessary to ensure line wraps with variable width fonts
  wrappingStrategy: 'advanced',
  wordBreak: 'keepAll',
  wrappingIndent: 'none',

  // Set default font
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontLigatures: false,
  fontVariations: false,
  fontWeight: 'normal',
  fontSize: 14,
  lineHeight: 0,
  letterSpacing: 0,

  find: {
    addExtraSpaceOnTop: false,
    seedSearchStringFromSelection: false,
  },

  // Set tab size in spaces
  tabSize: 5,

  // Editor color theme
  theme: 'cueit-dark',
});

// Create scroll interface for the ScrollAnimator
const scrollInterface = {
  getScrollTop: () => editor.getScrollTop(),
  setScrollTop: (top) => editor.setScrollTop(top),
};

// Initialize the ScrollAnimator with the scroll interface
const scrollAnimator = new ScrollAnimator(scrollInterface, { animationDuration: 1000 });

Object.assign(globalThis, {
  editor,
  model,
  scrollAnimator,
});

const verticalScrollbarSize = 16;
const horizontalScrollbarSize = 12;

const scale = document.getElementById('scale');

// Map slider positions (0-5) to scale percentages
const scalePercentages = [100, 125, 150, 200, 250, 300];

const scaleValue = document.getElementById('scale-value');

scale.addEventListener('change', () => {
  const sliderPosition = scale.valueAsNumber;
  const percentage = scalePercentages[sliderPosition];
  const zoomLevel = (percentage - 100) / 10;
  monaco.editor.EditorZoom.setZoomLevel(zoomLevel);
  scaleValue.textContent = `${percentage}%`;
});

// Font size slider setup
const fontSizeSlider = document.getElementById('font-size');
const fontSizes = [12, 13, 14, 15, 16, 17, 18, 20, 24, 32];
const fontSizeValue = document.getElementById('font-size-value');

fontSizeSlider.addEventListener('change', () => {
  const sliderPosition = fontSizeSlider.valueAsNumber;
  const fontSize = fontSizes[sliderPosition];
  editor.updateOptions({ fontSize });
  fontSizeValue.textContent = fontSize;
});

monaco.editor.EditorZoom.onDidChangeZoomLevel((zoomLevel) => {
  const factor = 1 + zoomLevel * 0.1;

  const containerDomNode = editor.getContainerDomNode();

  editor.updateOptions({
    scrollbar: {
      horizontalScrollbarSize: horizontalScrollbarSize * factor,
      verticalScrollbarSize: verticalScrollbarSize * factor
    }
  });

  const width = 256 * factor;

  console.log(`Setting width to ${width}px`);

  containerDomNode.style.width = `${width}px`;
});

function animateScroll(newTop, immediate = false) {
  scrollAnimator.animateTo(newTop, immediate);
}

let currentTop = 0;
let animationIntervalId = null;

function startScrollAnimation() {
  if (animationIntervalId !== null) {
    return;
  }
  
  // Reset to the beginning when starting animation
  currentTop = 0;
  editor.setScrollTop(0);
  
  // Simulate our prompter engine sending us a new scroll position every 300ms
  animationIntervalId = setInterval(() => {
    const adjustment = speedSlider.valueAsNumber;
    currentTop += adjustment;
    
    // Get the maximum scroll position
    const maxScrollTop = editor.getScrollHeight() - editor.getLayoutInfo().height;
    
    // Wrap around to the beginning when reaching the bottom
    if (currentTop >= maxScrollTop) {
      currentTop = 0;
      editor.setScrollTop(0);
    } else {
      animateScroll(currentTop);
    }
  }, 212); // 212ms is the average time between calls in the CueiT application
}

function stopScrollAnimation() {
  if (animationIntervalId !== null) {
    clearInterval(animationIntervalId);
    animationIntervalId = null;
  }
  
  // Also cancel any ongoing scroll animation
  scrollAnimator.stop();
}

function toggleScrollAnimation() {
  if (animationIntervalId !== null) {
    stopScrollAnimation();
  } else {
    startScrollAnimation();
  }
}

// Set up the toggle button
const toggleAnimationButton = document.getElementById('toggle-animation');
toggleAnimationButton.addEventListener('click', toggleScrollAnimation);

// Set up the speed slider
const speedSlider = document.getElementById('speed');
const speedValue = document.getElementById('speed-value');

speedSlider.addEventListener('change', () => {
  speedValue.textContent = speedSlider.valueAsNumber;
});
