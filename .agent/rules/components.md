---
trigger: model_decision
description: Use when creating or editing landing page HTML, SCSS, or JavaScript sections
globs: *.html,*.scss,*.js
---

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
