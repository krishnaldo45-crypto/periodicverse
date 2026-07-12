---
name: JS data file + TypeScript typecheck
description: Importing a plain .js data module into a TS artifact throws implicit-any tsc errors everywhere it's used, unless you add a sibling .d.ts.
---

When a large hand-authored dataset is written as a plain `.js` file (e.g. `src/data/elements.js` exporting `ELEMENTS`/`CATEGORY_LABELS`) inside an otherwise TypeScript artifact, `tsc --noEmit` reports `TS7016: Could not find a declaration file` at the import site, plus a cascade of `TS7006: implicit any` errors at every place a mapped/found item from that array is used.

**Fix:** add a sibling `elements.d.ts` next to `elements.js` declaring the exported shapes (interface for one array element + `export const ELEMENTS: Shape[]`, `export const CATEGORY_LABELS: Record<string,string>`). TypeScript picks it up automatically for the `.js` import, and the cascade of implicit-any errors at usage sites resolves on its own.

**Why:** Vite/dev server won't fail on these errors (esbuild doesn't typecheck), so the app still runs — but a real `tsc --noEmit` check (e.g. in CI or `pnpm typecheck`) will fail loudly if left unfixed.

**How to apply:** whenever you hand-write a `.js` (not `.ts`) data module for a TypeScript project, immediately add the matching `.d.ts` file in the same pass, before running or trusting a typecheck.
