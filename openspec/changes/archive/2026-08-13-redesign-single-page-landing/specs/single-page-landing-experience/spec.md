## Purpose

Defines the complete single-page marketing experience that explains The Agent, preserves important existing destinations, and guides visitors to product, self-hosting, source, or hosted-beta actions.

## ADDED Requirements

### Requirement: Single-page product narrative
The site SHALL present all marketing and decision content in one HTML page, ordered as a short product argument from understanding through proof, broader use, cost and control context, and next steps. It MUST NOT add a separate local Features, Pricing, Help, or marketing page.

#### Scenario: Visitor follows the primary narrative
- **WHEN** a visitor loads the landing page and reads from top to bottom
- **THEN** the page presents navigation, hero, problem framing, product walkthrough, broader-use stories, feature explorer, open-source next steps, hosted beta, FAQ, and footer in a coherent order without repetitive standalone pricing or trust sections

#### Scenario: Visitor needs procedural information
- **WHEN** a visitor selects a self-hosting, repository, security, support, legal, or detailed help action
- **THEN** the page opens the canonical external resource instead of navigating to another local marketing page

### Requirement: Anchored navigation
The navigation SHALL use the existing logo with live "The Agent" text and SHALL link to meaningful sections on the same page for How it works, Features, Open source, and Help. The page SHALL preserve the active section in the URL hash and SHALL keep anchored content visible below any sticky header.

#### Scenario: Visitor uses desktop navigation
- **WHEN** a visitor activates an in-page navigation item
- **THEN** the page moves focus and viewport to the corresponding section and updates the URL hash without a full-page navigation

#### Scenario: Visitor opens a shared section link
- **WHEN** the page loads with a recognized section hash
- **THEN** the matching section is exposed and positioned without hiding its heading behind the header

#### Scenario: Visitor uses mobile navigation
- **WHEN** the viewport cannot accommodate the desktop navigation
- **THEN** the header shows the product lockup, a keyboard-operable menu, and one visually quiet beta action without obscuring page content

### Requirement: Product naming and preserved content
The marketing page SHALL use "The Agent" as the product name and SHALL identify AppifyHub quietly as the parent project. "Abot" MAY appear only in install metadata for the hosted PWA, where it is the correct installed-app name. Existing content and destinations MUST be retained, replaced, or explicitly rejected during implementation rather than disappearing accidentally.

#### Scenario: Current content is migrated
- **WHEN** the new content inventory is reviewed against the current page
- **THEN** the origin story, source/community destination, Terms of Service, Privacy Policy, AppifyHub attribution, multilingual support, image and media capabilities, web search, and monitoring are each mapped to a new location or a documented replacement

#### Scenario: Inaccurate legacy claim is encountered
- **WHEN** the current "Zero Lock-in" or shared-chat-history wording is migrated
- **THEN** it is replaced with approved language about linked identity and settings, self-hosting, and planned export/import without implying shared conversation history

### Requirement: Responsive and accessible reading experience
The page SHALL provide a logical heading hierarchy with one H1, WCAG AA text and control contrast, visible keyboard focus, readable line lengths, and responsive layouts that preserve meaning without horizontal scrolling of core marketing copy.

#### Scenario: Page is viewed on a narrow mobile viewport
- **WHEN** the page is rendered at approximately 390 CSS pixels wide
- **THEN** the hero promise, primary CTA, and one product state appear in or near the first viewport, tables become labeled stacked rows, and typography wraps without clipping or oversized empty gaps

#### Scenario: Visitor navigates by keyboard
- **WHEN** a visitor traverses the page without a pointing device
- **THEN** all interactive controls receive visible focus in a logical order and can be operated with standard keyboard input

#### Scenario: Non-essential media is unavailable
- **WHEN** images, motion, or JavaScript fail to load
- **THEN** the page still communicates the product category, core promise, cost and hosting choices, security limitations, and next steps

### Requirement: Search and social metadata
The page SHALL include accurate title, description, canonical, Open Graph, social-card, SoftwareApplication, FAQPage, robots, and sitemap metadata using only facts visible or supportable on the page.

#### Scenario: Search metadata is inspected
- **WHEN** a crawler reads the page without executing JavaScript
- **THEN** it receives the approved product title and description, canonical URL, visible FAQ structured data, and no unsupported "free" or availability claim
