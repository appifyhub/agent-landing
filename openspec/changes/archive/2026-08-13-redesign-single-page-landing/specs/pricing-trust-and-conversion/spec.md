## Purpose

Defines concise cost, ownership, security, open-source proof, hosted-beta conversion, FAQ, and measurement behavior so visitors can make an informed next-step decision without repetitive standalone chapters.

## ADDED Requirements

### Requirement: Concise usage choices
The explorer and FAQ SHALL explain self-hosting, hosted use with user-owned provider keys, and hosted use with credits without adding a standalone pricing table. They MUST distinguish Agent fees from provider and infrastructure costs where those details are discussed.

#### Scenario: Visitor compares operating choices
- **WHEN** the visitor opens the cost-control explorer category or relevant FAQ answers
- **THEN** self-hosting, BYOK, and hosted credits are explained without presenting hosted credits as the default

#### Scenario: Hosted-credit costs are explained
- **WHEN** hosted-credit details are shown
- **THEN** the page states provider cost with no model markup, a separate disclosed operating fee, non-expiring credits, and no charge for failed requests

#### Scenario: BYOK or self-host path is explained
- **WHEN** BYOK or self-hosting details are shown
- **THEN** the page states that provider usage or infrastructure can still cost money even though The Agent adds no service or platform fee

### Requirement: Volatile pricing comes from maintained data
Any exact operating fee, model count, welcome-credit amount, platform support state, or repository activity value SHALL come from a configured source and SHALL have a currentness indicator. The page MUST NOT hard-code a volatile marketing value as permanently true.

#### Scenario: Maintained value loads
- **WHEN** a configured value is successfully retrieved
- **THEN** the page displays it with its qualifier or last-updated context

#### Scenario: Maintained value fails to load
- **WHEN** the data source is missing, slow, or returns invalid data
- **THEN** the page falls back to compliant qualitative copy without blocking the rest of the page

### Requirement: Precise security claims
The FAQ and footer SHALL provide concise security context and canonical security, privacy, and source destinations without adding a standalone trust section. The FAQ SHALL explain encrypted hosted storage, encrypted transport, and that selected model providers receive content needed to answer a request. It MUST NOT claim that the hosted service provides complete end-to-end encryption.

#### Scenario: Visitor reviews message handling
- **WHEN** the visitor opens the encryption FAQ answer
- **THEN** it explains server-side processing and transmission to the selected provider in plain language

#### Scenario: Security proof is presented
- **WHEN** a security claim appears on the page
- **THEN** it describes a specific behavior and the footer retains the canonical security destination

### Requirement: Open-source next steps
The page SHALL provide direct actions for the self-host guide and filtered AppifyHub agent repositories. The footer SHALL retain direct client and server repositories, contributing information, and license while preserving the existing source/community intent.

#### Scenario: Visitor chooses self-hosting
- **WHEN** the visitor activates a self-host action from the hero or open-source section
- **THEN** the canonical installation entry point opens in one click rather than an unexplained repository root

### Requirement: Limited hosted-beta entry
The hosted-beta section SHALL identify the hosted product as a closed beta and SHALL link directly to the verified Telegram and WhatsApp bots. Signup, current capacity, and beta conditions SHALL be handled inside those bots rather than duplicated in a landing-page application form.

#### Scenario: Visitor opens hosted beta
- **WHEN** the visitor activates a beta CTA
- **THEN** the selected Telegram or WhatsApp bot opens directly and handles signup and availability there

### Requirement: On-page FAQ
The page SHALL include concise answers for cost, subscriptions, model choice, failed requests, linked identity and settings, group chats, encryption, portability, and limited hosted access. Answers SHALL link to deeper external resources where needed.

#### Scenario: Visitor opens an FAQ answer
- **WHEN** the visitor activates an FAQ control
- **THEN** the answer is exposed accessibly without navigating away and remains understandable without JavaScript

### Requirement: Privacy-respecting measurement
The page SHALL emit the brief's named interaction events with CTA source and viewport class when a configured privacy-respecting analytics sink is available. It MUST NOT collect chat content or add invasive session replay.

#### Scenario: Analytics is configured
- **WHEN** a measured interaction occurs
- **THEN** the configured sink receives the approved event name and non-content context without blocking navigation

#### Scenario: Analytics is not configured
- **WHEN** a measured interaction occurs without an analytics sink
- **THEN** the interaction completes normally without an error or fallback tracking request
