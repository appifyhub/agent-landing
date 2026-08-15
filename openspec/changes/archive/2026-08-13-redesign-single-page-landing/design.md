## Context

The current repository is a static vanilla HTML, SCSS, and JavaScript site with generated assets under `dist/`. GitHub Pages publishes the `release` branch root, where the source `index.html` loads `dist/` assets. Netlify publishes `dist/` directly, where the build writes a path-adjusted `dist/index.html`. The present page uses a dark navy canvas, the existing colorful curved logo, a phone mockup, six generic feature items, two direct chat CTAs, a GitHub community CTA, and a small legal footer. The supplied desktop and mobile captures show strong brand recognition but weak navigation and hierarchy, repetitive content treatment, oversized mobile composition, large dead zones, and low-contrast footer content.

The positioning brief is the redesign authority. The current page and screenshots are a content-preservation and brand-equity baseline only. See `proposal.md` for motivation and the capability specs for observable behavior.

## Goals / Non-Goals

**Goals:**

- Produce one cohesive, product-led page that explains The Agent within 30 seconds and supports deeper exploration without local page changes.
- Evolve the existing dark identity into a modern, high-contrast system derived from the logo's curves and blue-red-purple color movement.
- Make real product proof and user choice the page's visual and narrative backbone, with cost, ownership, and trust facts available where they support a decision rather than repeated in dedicated chapters.
- Keep all core content useful without JavaScript and enhance it with accessible interaction.
- Preserve every important current destination or replace it deliberately with a more accurate action.

**Non-Goals:**

- Creating a separate local Help, Features, Pricing, or documentation site.
- Redesigning The Agent product UI or fabricating screenshots for unavailable functionality.
- Adding a frontend framework, component runtime, CMS, or speculative backend integration.
- Implementing model routing, account creation, credit purchase, or self-hosting workflows inside the landing page.

## Decisions

### Use one page with external utility destinations

All marketing, product explanation, feature exploration, cost and control context, beta context, and FAQ content will live in `index.html`. Header navigation will target section IDs. Procedural help, installation, source, security, legal documents, and support resources can open canonical external destinations.

This interprets "single-page website" as one marketing surface without pretending repositories and operational documentation belong inside a landing page. A literal no-external-links page was rejected because it would weaken trust and make self-hosting harder.

### Build a logo-derived dark visual system

The visual character is calm technical confidence with rounded geometry:

- **Midnight canvas** (`#07111f` range): primary page background.
- **Ink blue** (`#0e1b2f` range): section and control surfaces.
- **Muted plum** (`#3f2a52` range): quiet depth and selected states.
- **Signal coral** (`#df5967` range): primary action and important emphasis.
- **Agent indigo** (`#4b53b8` range): capability and technical accents.
- **Warm white** (`#f4f1ec` range): primary text and contrast.

Exact values will be tuned against the source logo and WCAG AA contrast during implementation. A modern rounded grotesk will carry display copy, a highly readable sans serif will carry body copy, and a restrained mono treatment will identify model, cost, and status data.

The signature element will be a single "choice path": a curved ribbon or line that splits and rejoins where the narrative discusses models, payment, chat surfaces, and hosting. It is derived from the logo's folded motion and the product's user-choice premise. It will be used sparingly. Generic neon glows, glass panels, floating blobs, provider-logo walls, and a uniform rounded-card grid are rejected.

### Structure the page as alternating argument and proof

The page will use a consistent responsive desktop grid and a disciplined mobile stack. Quiet text-led sections will alternate with denser product-proof sections. Content will follow this order:

1. Navigation and product lockup.
2. Typewriter hero with the first product sequence.
3. Problem and point-of-view comparisons.
4. Interactive "choose capability, model, and path" walkthrough.
5. Groups, proactive actions, and sponsorship stories.
6. In-page feature explorer with concise cost and hosting context.
7. Standalone open-source next steps directly on the page background.
8. Hosted-beta entry, FAQ, and full footer.

Standalone pricing and trust chapters were removed after visual review because they repeated information already expressed in the comparison, explorer, FAQ, open-source CTA, and footer. FAQ accordions and explorer tabs provide progressive disclosure so the page can remain complete without feeling like a warehouse.

### Treat animation as progressive enhancement

The first hero phrase and full accessible H1 will exist in HTML. JavaScript will animate only an `aria-hidden` visual copy, reserve the longest phrase's dimensions, and loop while both the hero and browser tab are visible. It will pause offscreen or on `visibilitychange`, then resume from the same position. The product sequence will use finite, stateful transitions.

The brief contains one instruction to ignore reduced-motion preferences, but its hero and acceptance criteria require a static reduced-motion mode. The accessible requirement takes precedence: reduced motion disables typewriter, cursor, reveal, parallax, and non-essential transitions.

The current external ScrollReveal dependency and pointer-driven decorative movement will be removed. Native CSS and focused vanilla JavaScript are sufficient and reduce runtime fragility.

### Use progressive, accessible controls

The mobile menu, capability walkthrough, explorer tabs, and FAQ disclosure controls will use native elements and established ARIA patterns. Core content remains in document order and visible before enhancement. JavaScript adds state management, URL synchronization, and transitions rather than injecting the page's meaning.

The explorer hash will encode the selected category in a stable form such as `#features/see-create`. Unknown hashes fall back to the default category without throwing or hiding content.

### Keep volatile data behind a small adapter

The page will render durable qualitative copy by default. A small data adapter may read configured JSON or an API for operating fee, model count, welcome credits, supported surfaces, and repository proof. Each field validates independently; one failure cannot remove the surrounding section. Dynamic values include updated-at context and are hidden when unavailable.

No endpoint or vendor is assumed in the proposal. If a maintained source is not available during implementation, exact volatile values will be omitted rather than hard-coded.

### Make product screenshots an approval gate

The P0 shot list in the brief is the source of product proof. Raw, redacted captures will live outside generated output; approved optimized derivatives will be added under `src/images/`. Each capture must be current, synthetic, readable at its rendered breakpoint, and free of secrets or unsupported behavior.

Implementation begins with an asset audit. The current site and phone screenshot are content-preservation references only and do not define the new composition. They do not substitute for the required multi-model, picker, image, group, monitor, usage, BYOK, and lockdown proof.

### Preserve current content through an explicit migration map

- The origin-story link moves to the open-source chapter or footer.
- Telegram and WhatsApp cease to be equal hero primaries; verified live destinations can remain as supported-surface references or secondary footer links consistent with beta capacity.
- "50+ languages" becomes durable multilingual-support copy unless a maintained count exists.
- Image work, web/search/media, and monitoring remain visible within the explorer and product stories.
- "Zero Lock-in" and cross-platform history claims are removed and replaced with linked identity/settings, self-hosting, and honest portability status.
- "See All Features" becomes the in-page feature explorer.
- The GitHub community CTA becomes a self-host action and a filtered AppifyHub repository action, while direct client/server, contributing, and license destinations remain in the footer.
- Terms, Privacy, and AppifyHub attribution remain in the footer with improved contrast and hierarchy.

### Keep analytics provider-neutral

Interaction code will emit approved event objects to a small optional adapter. The page will not add a vendor until one is configured. Missing analytics is a no-op, and no interaction waits for a tracking request.

## Risks / Trade-offs

- **Long single page becomes exhausting** → Remove repetitive pricing and trust chapters, alternate narrative and proof density, use progressive disclosure, and keep anchors persistent and shareable.
- **Many screenshots harm loading performance** → Prioritize the first hero state, lazy-load below-fold media, use responsive AVIF/WebP derivatives, and reserve dimensions.
- **Dark logo-derived gradients become generic AI decoration** → Restrict gradients to the logo, choice path, and state emphasis; use opaque surfaces, typography, and real UI for most visual interest.
- **Typewriter reduces comprehension or accessibility** → Server-render the strongest phrase, expose one stable H1, pause the loop whenever the hero is offscreen, and disable it for reduced motion.
- **Dynamic marketing data becomes stale or breaks the page** → Validate fields independently and fall back to non-numeric copy.
- **Product captures become inaccurate quickly** → Track capture date/version, keep uncropped sources, and prefer live HTML for volatile values.
- **Legacy direct chat links conflict with capped beta** → Demote them from conversion CTAs and expose only verified destinations consistent with current access policy.

## Migration Plan

1. Inventory and approve current destinations, product claims, external URLs, dynamic data sources, and P0 screenshots.
2. Build the new semantic HTML narrative and non-JavaScript baseline while retaining current legal and parent-brand links.
3. Replace the SCSS token and layout system, then implement desktop and mobile composition.
4. Add typewriter, product-state, explorer, navigation, FAQ, URL-state, and analytics enhancement.
5. Optimize product media, add metadata and structured data, and remove superseded decorative/runtime assets.
6. Run the production build, keyboard and reduced-motion checks, browser console checks, and visual review at desktop and mobile sizes.
7. Build once for both publishing layouts: commit the source root plus generated `dist/` for GitHub Pages on `release`, and publish generated `dist/` directly on Netlify. Roll back by reverting the change and rebuilding the previous source.

## Open Questions

- Final canonical URLs and any maintained JSON/API endpoints can be supplied during implementation without changing the page architecture.
- Final P0 product captures are implementation inputs; sections will use compliant fallback content until approved assets exist. Hosted-beta entry uses the verified Telegram and WhatsApp bot destinations.
