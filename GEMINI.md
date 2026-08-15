# Project Rules — Landing (Vanilla HTML/SCSS/JS)

## Code Style

### HTML, SCSS, and JavaScript

Use clear, idiomatic vanilla HTML, SCSS, and JavaScript. Keep behavior in `src/js/`, styles in `src/scss/`, and generated output in `dist/`. Prefer simple DOM code over adding abstractions or framework patterns.

### Comments

- For new code, avoid comments unless the logic is genuinely complex or the block is long
- When editing existing code, prefer updating comments over deleting them
- Comments should start with a lowercase letter, except in documentation or where grammar requires it

## MANDATORY PROJECT RULES

### Stack

- Vanilla HTML, SCSS, and JavaScript — no frameworks
- Keep source files in `index.html`, `src/scss/`, `src/js/`, and `src/images/`
- `dist/` is built output; never edit files there directly
- ALL commands must be run from project root (where `package.json` exists)

### Environment Management

- ALWAYS use both `bun` and `npm` for dependency management
- ALWAYS use `bun` for commands and task execution; use `npm` only when dependency management requires it
- Use tools from `package.json` for linting, building, serving, image optimization, and asset copying

### Development Workflow

- `bun run watch` — starts BrowserSync with live reload and watches all sources
- `bun run build` — full production build: lints, compiles SCSS, minifies JS, optimizes images, and copies assets
- `bun run build:css` — lint SCSS, compile Sass, add vendor prefixes
- `bun run build:js` — lint JS and minify with uglifyjs
- `bun run lint` — ESLint check on `src/js/`
- `bun run lint-scss` — StyleLint check on `src/scss/`
- Always run `bun run build` before committing or at the end of implementation tasks

### Project Structure

- Version is managed through the `version` property of `package.json`
- `src/scss/` — SCSS source files
- `src/js/main.js` — vanilla JS entry point for animations and scroll effects
- `src/images/` — source images optimized during build
- `dist/` — generated output; do not edit directly
- `index.html` — main page, edited directly
- Netlify deploys from `dist/` on git push

### RTK - Rust Token Killer

- Use RTK for shell-command output reduction when running commands directly
- Use `rtk gain`, `rtk gain --history`, `rtk discover`, and `rtk proxy <cmd>` directly for RTK meta operations
- Prefer `rtk <cmd>` for shell commands with potentially large output when the environment does not rewrite commands automatically


# Component Guidelines

## HTML, SCSS, and JavaScript sections

### Naming and structure

- Use generic, reusable class and function names when behavior or styling is shared
- Keep section-specific names only when the section is genuinely unique to the landing page
- Avoid introducing React-style component props, interfaces, or framework patterns in this vanilla project
- Keep HTML structure, SCSS partials, and JS behavior aligned by naming the same concept consistently

### Copy and content

- User-facing copy lives directly in HTML or JavaScript in this project
- Keep repeated labels and calls to action consistent across the page
- Do not introduce placeholder copy or generic SaaS filler

### When changing existing page sections

1. Update the relevant `index.html` section
2. Update matching SCSS in `src/scss/`
3. Update JavaScript in `src/js/main.js` only when behavior changes
4. Search for all matching classes, anchors, and IDs before renaming anything
5. Run `bun run build` when done

