---
trigger: glob
globs: *.html,*.scss,*.js
---

### Code style

#### HTML, SCSS, and JavaScript

Use clear, idiomatic vanilla HTML, SCSS, and JavaScript. Keep behavior in `src/js/`, styles in `src/scss/`, and generated output in `dist/`. Prefer simple DOM code over adding abstractions or framework patterns.

#### Comments

- For new code, avoid comments unless the logic is genuinely complex or the block is long
- When editing existing code, prefer updating comments over deleting them
- Comments should start with a lowercase line, except in documentation or where grammar requires it
