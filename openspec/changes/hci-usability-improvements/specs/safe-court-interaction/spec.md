## ADDED Requirements

### Requirement: Active courts require long-press to navigate
Court cards with status "active" (Hoạt động) on the FieldsPage SHALL require a long-press gesture of at least 400 milliseconds to trigger navigation to the court detail page. A single tap on active courts SHALL NOT navigate.

#### Scenario: Long-press on active court navigates
- **WHEN** the user presses and holds on an active court card for ≥ 400 ms without moving the pointer
- **THEN** the system SHALL navigate to the court's detail page (`/fields/:id`)

#### Scenario: Short tap on active court does nothing
- **WHEN** the user taps (< 400 ms) on an active court card
- **THEN** the system SHALL NOT navigate away from the FieldsPage

#### Scenario: Scroll during press cancels navigation
- **WHEN** the user presses on an active court card but moves the pointer/finger more than 10 pixels before 400 ms elapses
- **THEN** the long-press gesture SHALL be cancelled and no navigation SHALL occur

### Requirement: Idle courts retain instant click navigation
Court cards with status "idle" (Trống) SHALL continue to navigate to the detail page on a single click/tap, with no delay.

#### Scenario: Tap on idle court navigates immediately
- **WHEN** the user taps on an idle court card
- **THEN** the system SHALL navigate to the court detail page immediately

### Requirement: Visual feedback during long-press
During a long-press on an active court card, the system SHALL display a visual progress indicator (radial ring or highlight animation) to signal that the gesture is being registered.

#### Scenario: Progress ring appears during hold
- **WHEN** the user presses and holds on an active court card
- **THEN** a circular progress indicator SHALL animate from 0% to 100% over the 400 ms hold duration

#### Scenario: Progress ring disappears on cancel
- **WHEN** the user releases the press or moves the pointer before 400 ms
- **THEN** the progress indicator SHALL immediately disappear

### Requirement: Manage button bypasses long-press
The "Quản lý" action button on each court card SHALL continue to work with a single click, regardless of court status, and SHALL NOT be affected by the long-press gesture.

#### Scenario: Click manage button on active court
- **WHEN** the user clicks the "Quản lý" button on an active court card
- **THEN** the system SHALL navigate to the court detail page immediately without requiring a long-press
