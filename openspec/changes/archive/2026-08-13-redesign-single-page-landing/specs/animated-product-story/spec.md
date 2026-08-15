## Purpose

Defines the accessible typewriter hero and product demonstration that make The Agent's model choice, chat-native behavior, cost model, and deployment freedom understandable immediately.

## ADDED Requirements

### Requirement: Meaningful typewriter hero
The hero SHALL introduce the product with the eyebrow "Multi-app · No subscription · Multi-model · BYOK" and render "The only agent that..." with "brings leading models together" as meaningful initial content before JavaScript runs. Enhanced motion SHALL rotate through the five approved phrases in the specified order without punctuation.

#### Scenario: JavaScript is unavailable
- **WHEN** the page loads without JavaScript
- **THEN** the complete initial hero promise remains visible and the headline does not depend on an empty animation container

#### Scenario: Typewriter animation runs
- **WHEN** JavaScript is available and reduced motion is not requested
- **THEN** the animated visual begins empty, types the first phrase forward, and then types and deletes the approved phrases continuously at the brief's timing, holds completed phrases for 2.4 to 3 seconds, pauses while the hero is offscreen or the tab is hidden, resumes from the same position when visible, and reserves space to prevent layout shift

#### Scenario: Visitor requests reduced motion
- **WHEN** `prefers-reduced-motion: reduce` is active
- **THEN** the page displays only "brings leading models together" without a cursor or typewriter motion

### Requirement: Accessible headline semantics
The hero SHALL expose one stable, complete H1 to assistive technology and MUST NOT announce individual animated characters or repeated phrases through a live region.

#### Scenario: Screen reader reads the hero
- **WHEN** assistive technology traverses the hero heading
- **THEN** it encounters one complete product promise while the animated visual duplicate is hidden from the accessibility tree

### Requirement: Hero conversion hierarchy
The hero SHALL prioritize understanding over hosted conversion with "See how it works" as the primary action, "Use it self-hosted" as the secondary action, and limited hosted-beta access as a tertiary action. Cost guarantees SHALL be explained in the relevant explorer and FAQ content rather than repeated as a hero microproof row.

#### Scenario: Visitor selects the primary hero action
- **WHEN** the visitor activates "See how it works"
- **THEN** the page moves to the first real product walkthrough on the same page

#### Scenario: Visitor compares next steps
- **WHEN** all hero actions are visible
- **THEN** self-hosting remains prominent and hosted-beta access is clearly limited without appearing to be the product's primary purpose

### Requirement: Real product demonstration
The hero and walkthrough SHALL use approved, readable product states to show a researched answer, user-controlled model or capability settings, an image task, and self-hosting. Adjacent product stories SHALL explain group participation, proactive actions, and sponsorship without fabricating product UI. The demonstration MUST NOT imply automatic best-model routing, unsupported platform branding, or shared conversation history across surfaces.

#### Scenario: Product sequence advances
- **WHEN** the controlled demo changes state
- **THEN** each state presents a realistic task, visible user choice, completed outcome, and readable product UI rather than decorative dashboard art

#### Scenario: Product proof is not yet approved
- **WHEN** a required screenshot is missing, stale, contains sensitive data, or shows planned functionality
- **THEN** that state is omitted or replaced with an approved current capture rather than fabricated product UI

### Requirement: Motion explains state
Motion SHALL be concentrated in the typewriter and meaningful product-state transitions, SHALL avoid sound and decorative bounce or glow, and SHALL keep all content usable when animation is disabled.

#### Scenario: Motion is disabled
- **WHEN** reduced motion is requested or animation initialization fails
- **THEN** the hero and product proof remain visible as understandable static states
