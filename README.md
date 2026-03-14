# VR Instructor — Field Manual Chat UI

A React + Vite frontend for the VR Instructor RAG server.  
Supports text chat with sourced answers from the instructor manual.

## Requirements

- Node.js 18+
- VR Instructor backend running (see `server.py`)

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Configuration

Set your server URL and API key in the top config bar of the UI.

The Vite dev server proxies `/chat`, `/tts`, and `/health` to
`http://localhost:8080` automatically, so you can leave the server
field as `http://localhost:8080` during local development.

## Build for production

```bash
npm run build
# Output in ./dist — serve with any static host or nginx
```

## Project Structure

```
src/
├── main.jsx                   Entry point
├── App.jsx                    Root component + state
├── api/
│   └── chatApi.js             Fetch wrapper for /chat endpoint
├── components/
│   ├── Header.jsx             Top bar with logo + status
│   ├── ConfigBar.jsx          Server URL + API key inputs
│   ├── Message.jsx            Chat bubbles (user / AI / error / thinking)
│   ├── SourcesBadge.jsx       Hover tooltip showing page references
│   ├── WelcomeScreen.jsx      Empty state with suggestion prompts
│   └── ChatInput.jsx          Auto-resize textarea + send button
└── styles/
    ├── global.css             CSS variables, reset, scanline overlay
    ├── Header.css
    ├── ConfigBar.css
    ├── Message.css            Bubbles, sources badge, tooltip, thinking dots
    ├── ChatInput.css
    └── Welcome.css
```
