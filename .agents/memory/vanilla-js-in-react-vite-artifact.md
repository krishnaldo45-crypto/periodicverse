---
name: Vanilla JS in a react-vite artifact
description: How to honor a "no framework, plain HTML/CSS/JS" spec when the only available web artifact type is react-vite.
---

The platform's web artifact types don't include a plain-static option — `react-vite` (Vite + React scaffold) is what's available. When a user's spec explicitly forbids React/frameworks (e.g. "must be vanilla HTML/CSS/JS, files literally named index.html/style.css/script.js"), there is no artifact type that matches literally.

**Resolution used:** create the artifact as `react-vite`, but instruct the build (design subagent or self) to bypass React idioms almost entirely — keep only a minimal root mount point in `App.tsx`/`main.tsx` that calls a single `initApp(rootElement)` function, then write all real logic as plain DOM manipulation (template strings, `innerHTML`, `addEventListener`) in `.ts`/`.js` files under `src/components/`, with plain CSS (optionally alongside the scaffold's Tailwind) for styling. No JSX component tree, no Radix/shadcn components, no router — one continuously scrolling page.

**Why:** this satisfies the spirit and observable behavior of "no framework" (no component re-render model, no JSX, no framework-specific state management) while still running through the required Vite dev/build pipeline, artifact routing, and BASE_PATH handling that the platform provides.

**How to apply:** when a spec insists on zero frameworks but you're scaffolding through `react-vite`, say so explicitly in the build brief (to yourself or a delegated subagent): "vanilla, framework-free interactive JS/CSS, hand-built HTML/CSS/JS style even though it lives inside the Vite/React scaffold."
