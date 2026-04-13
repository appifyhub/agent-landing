---
trigger: always_on
---

## MANDATORY PROJECT RULES

### Stack

- Vanilla HTML, SCSS, and JavaScript — no frameworks
- npm for dependency management and script execution
- All commands must be run from project root (where `package.json` exists)

### Development Workflow

- `npm run watch` — starts dev server with live reload (BrowserSync) and watches all sources
- `npm run build` — full production build: lints, compiles SCSS, minifies JS, optimizes images
- `npm run build:css` — lint SCSS, compile Sass, add vendor prefixes
- `npm run build:js` — lint JS, minify with uglifyjs
- `npm run lint` — ESLint check on `src/js/`
- `npm run lint-scss` — StyleLint check on `src/scss/`
- Always run `npm run build` before committing (pre-commit hook does this automatically)

### Project Structure

- `src/scss/` — SCSS source files (7-1 pattern: abstracts, base, components, layout)
- `src/js/main.js` — Vanilla JS entry point (animations, scroll effects)
- `src/images/` — Source images (optimized via imagemin on build)
- `dist/` — Built output, auto-generated; never edit files here directly
- `index.html` — Main page, edit this directly
- Netlify deploys from `dist/` on git push
