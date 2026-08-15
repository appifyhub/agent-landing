## Purpose

Defines the in-page explorer that proves The Agent's breadth through current, task-oriented capabilities without becoming a repetitive catalog or sending visitors to another marketing page.

## ADDED Requirements

### Requirement: Task-oriented capability taxonomy
The explorer SHALL organize current functionality into Ask and reason, Search and monitor, See and create, Hear and transcribe, Groups and proactive actions, and Control, costs, and hosting. Provider and model names SHALL be secondary to what the visitor wants to do.

#### Scenario: Visitor opens the explorer
- **WHEN** the explorer first becomes visible
- **THEN** one category is selected and shows one large real product example plus three to five concise supporting capabilities

#### Scenario: Visitor changes category
- **WHEN** a visitor selects another category
- **THEN** the example, capability list, status, and relevant help destination update without leaving the landing page

### Requirement: Current and truthful capability content
Each explorer category SHALL include a user-centered outcome, realistic example, concise supporting capabilities, and an accurate status. A single shared source destination SHALL appear below the explorer instead of repeating a link in every category. Planned capabilities MUST NOT appear with the same treatment as available features.

#### Scenario: Current capability is displayed
- **WHEN** an item is marked Available or Beta
- **THEN** the visible example and proof show a real supported workflow and avoid subjective "best" claims without an evaluation method

#### Scenario: Volatile catalog value is unavailable
- **WHEN** a current model count, provider list, fee, welcome credit, or support status cannot be loaded from a maintained source
- **THEN** the page omits the volatile value and uses accurate non-numeric wording

### Requirement: Deep-linkable explorer state
The selected category SHALL be represented in the URL hash so that feature links are shareable and can restore the same state on load.

#### Scenario: Visitor shares an explorer state
- **WHEN** a visitor selects a category
- **THEN** the URL hash updates without reloading the page and retains a stable deep link

#### Scenario: Deep link is opened
- **WHEN** the page loads with a recognized explorer hash
- **THEN** the matching category opens automatically and its tab receives an appropriate focus target

### Requirement: Responsive tab interaction
The explorer SHALL implement accessible tabs or an equivalent single-selection control with correct semantics and keyboard behavior. On mobile, the category list SHALL be horizontally scrollable with visible overflow affordance rather than expanding into dozens of stacked cards.

#### Scenario: Keyboard user operates categories
- **WHEN** focus is on the category control
- **THEN** arrow and activation keys move and select categories according to the chosen accessible interaction pattern

#### Scenario: Mobile visitor browses categories
- **WHEN** the explorer is rendered on a narrow viewport
- **THEN** category labels remain legible, the selected state is visible, and supporting content does not create horizontal page overflow

### Requirement: Core content survives enhancement failure
The explorer SHALL retain an understandable static summary of all six capability categories when JavaScript is unavailable.

#### Scenario: JavaScript fails before explorer initialization
- **WHEN** interactive enhancement does not run
- **THEN** visitors can still read all capability groups and follow the shared source link
