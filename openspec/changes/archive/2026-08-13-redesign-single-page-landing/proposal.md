## Why

The current landing page presents a small feature list but does not explain The Agent's multi-model, open-source, pay-as-you-go positioning or give visitors enough product proof to choose a next step. The redesign should turn the site into a modern, single-page product argument that communicates the value proposition within 30 seconds while preserving important existing content and brand equity.

## What Changes

- Replace the current hero with the approved "The only agent that..." typewriter narrative, real product proof, and a clear CTA hierarchy for understanding, self-hosting, and limited hosted-beta access.
- Rebuild the site as one responsive marketing page with anchored navigation, shareable feature-explorer states, concise cost and control information, open-source, beta, FAQ, and footer sections.
- Keep the visual system dark and logo-led: muted navy, blue, red, and purple surfaces; rounded geometry and curves; modern typography; and restrained motion derived from the logo rather than generic AI decoration.
- Add interactive product storytelling for capability choice, model choice, cost context, deployment paths, groups, proactive actions, sponsorships, and current product capabilities.
- Present self-hosted, BYOK, and hosted-credit choices concisely within the explorer and FAQ, without repeating them in standalone pricing or trust sections, and use only approved claims about model availability, fees, encryption, rate limits, cross-chat continuity, and data portability.
- Preserve or deliberately relocate current legal links, AppifyHub attribution, source/community links, the product origin story, supported language proof, image/search/media capabilities, and monitoring content. Replace the inaccurate "Zero Lock-in" and shared-history wording with the approved control and linked-settings language.
- Keep procedural help, repositories, legal documents, security details, and installation guides as external destinations; do not add a second local marketing or Help page.
- Add responsive, accessibility, performance, SEO, structured-data, and privacy-respecting measurement requirements to the landing experience.

## Capabilities

### New Capabilities

- `single-page-landing-experience`: One-page information architecture, anchored navigation, preserved content, responsive layout, footer, metadata, and external destination behavior.
- `animated-product-story`: Accessible typewriter hero and real product demonstration states that explain model, media, group-chat, and deployment choices without unsupported implications.
- `capability-explorer`: In-page capability taxonomy, interactive categories, deep-linkable state, current availability labels, and supporting product proof.
- `pricing-trust-and-conversion`: Concise usage-path and security explanations, open-source proof, direct hosted-beta entry, FAQ, and measurement events without repetitive standalone pricing or trust chapters.

### Modified Capabilities

None. This repository has no existing OpenSpec capability specifications.

## Impact

- Replaces most of `index.html` and the existing SCSS layout partials while retaining the vanilla HTML, SCSS, and JavaScript stack.
- Extends `src/js/main.js` for navigation, typewriter, product-demo, explorer, URL-state, and analytics behavior.
- Adds approved product screenshots and optimized derivatives under `src/images/`; generated `dist/` output continues to come from the existing build.
- Requires canonical destinations for client/server source, self-hosting, repository discovery, security, support, legal documents, and hosted-beta entry.
- May consume structured configuration or API data for volatile model counts, support status, welcome credits, and the hosted operating fee; volatile values must be omitted when a current source is unavailable.
