# Monaco Test

A sample Electron application that demonstrates the Monaco editor (the code editor that powers VS Code) embedded in a desktop application.

## Features

- Monaco editor with a custom dark theme
- Smooth scroll animation with adjustable speed
- Scale/zoom control for the editor
- Word wrapping with variable-width font support
- Custom "cuescript" language registration

## Prerequisites

- Node.js 22.21.1 or later
- npm

## Installation

```bash
npm install
```

## Running the Application

### Development Mode

Start the application with hot reload:

```bash
npm run dev
```

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Controls

- **Toggle Animation**: Click to start/stop automatic scrolling of the editor content
- **Speed**: Adjust the scrolling speed (default is 33% of maximum)
- **Scale**: Zoom in/out of the editor content

## Development

### Running Tests

```bash
npm run test:run
```

### Linting

```bash
npm run lint
```

## Tech Stack

- [Electron](https://www.electronjs.org/) - Desktop application framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Vitest](https://vitest.dev/) - Testing framework
- [ESLint](https://eslint.org/) - Code linting
