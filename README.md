# CyberShield

A cybersecurity awareness app for students and beginners — now a proper **Vite + React** project, installable as a **Progressive Web App**.

Nothing about the app's design, content, lessons, threat cards, quiz, scenarios, checklist, or navigation was changed. This pass only:
- Moved the existing component into a real Vite project (`src/App.jsx`, untouched aside from swapping `useState` for a small persistence hook — see below)
- Added Tailwind (the app was written with Tailwind utility classes; this project now actually ships Tailwind so they render correctly)
- Added `vite-plugin-pwa` with a manifest + service worker
- Added real shield-themed app icons
- Made progress **persist across reloads/restarts** using `localStorage`, via a small `usePersistentState` hook — the previous version couldn't do this because it was running in a sandboxed preview; a real app should, and your "progress tracking" and "local storage" requirements need it, so I added it without changing any UI or feature behavior.

## Project structure

```
cybershield/
├── index.html                  # Vite entry HTML, PWA meta tags, icon links
├── package.json
├── vite.config.js              # vite-plugin-pwa + manifest config
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
├── public/
│   └── icons/
│       ├── favicon.ico
│       ├── apple-touch-icon.png
│       ├── icon-192.png
│       ├── icon-512.png
│       └── icon-maskable-512.png
└── src/
    ├── main.jsx                 # React root, mounts <App />
    ├── index.css                # Tailwind directives
    └── App.jsx                  # Your existing CyberShield app (unchanged content/logic)
```

## Run it locally

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`). Chrome treats `localhost` as a secure origin, so the PWA install prompt and service worker both work in dev too.

## Build for production

```bash
npm run build
npm run preview
```

`npm run build` outputs a production bundle to `dist/`, including the generated service worker and `manifest.webmanifest`. `npm run preview` serves that build locally so you can test the installed/offline experience exactly as it'll behave once deployed.

> I built and syntax-checked every file in this project in my sandbox, but my sandbox has no internet access, so I could not actually run `npm install`/`npm run build` here to watch it complete end-to-end. Please run the two commands above — if anything errors, paste the output back to me and I'll fix it immediately.

## Deploy it

Any static host works, since this is a static build: Netlify, Vercel, GitHub Pages, Cloudflare Pages, etc. Push the contents of `dist/` (or connect the repo and let the host run `npm run build` with output directory `dist`). **PWA install requires HTTPS** (or `localhost`) — all of the hosts above provide that automatically.

## Installing it as an app

**Android (Chrome):** open the deployed HTTPS URL → tap the "Install app" banner, or ⋮ menu → **Install app**.

**iOS/iPadOS (Safari):** open the URL → tap **Share** → **Add to Home Screen**.

**Desktop (Chrome/Edge):** open the URL → click the install icon (⊕) in the address bar, or ⋮ menu → **Install CyberShield**.

Once installed, it opens full-screen with its own icon and no browser chrome (`display: "standalone"` in the manifest), and previously visited pages/assets are cached for offline use via the generated service worker.

## What's preserved

Every existing feature works exactly as before: dashboard progress ring, lessons, threat library, Spot-the-Threat, the 20-question quiz with difficulty tiers and results screen, the 10 "What Would You Do?" scenarios, the safety checklist, badges/XP, and the emergency help section. The only functional addition is that completed lessons, quiz best score, checklist state, and threat-detector answers now survive a reload or app restart.
