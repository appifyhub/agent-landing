# Project Rules — Agent Landing Page

> General code style and behavioral rules are in `~/.claude/CLAUDE.md`.

## Code Style

### JavaScript/TypeScript

In JavaScript and TypeScript, use types as much as possible: strict mode will be turned on! If in doubt, follow Java standard formatting. Finally, we also always want trailing commas in multi-line code blocks.

## Stack

Vanilla HTML, SCSS, and JavaScript — no frameworks. npm for dependency management and script execution.

## Development Workflow

- `npm run watch` — dev server with live reload (BrowserSync) and file watchers
- `npm run build` — full production build: lints, compiles SCSS, minifies JS, optimizes images
- `npm run build:css` — lint SCSS, compile Sass, add vendor prefixes
- `npm run build:js` — lint JS, minify with uglifyjs
- `npm run lint` — ESLint on `src/js/`
- `npm run lint-scss` — StyleLint on `src/scss/`
- Always run `npm run build` before committing (pre-commit hook does this automatically)

## Project Structure

- `src/scss/` — SCSS source (7-1 pattern: abstracts, base, components, layout)
- `src/js/main.js` — vanilla JS entry point (animations, scroll effects)
- `src/images/` — source images (optimized via imagemin on build)
- `dist/` — built output, auto-generated; never edit files here directly
- `index.html` — main page, edit this directly
- Netlify deploys from `dist/` on git push
