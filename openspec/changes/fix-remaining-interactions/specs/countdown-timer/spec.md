## ADDED Requirements

### Requirement: Real-time countdown timer
The FieldDetailPage SHALL display a live countdown timer that decrements `timeRemaining` every second when the field status is "active". The display format SHALL be `MM:SS`.

#### Scenario: Active field with time remaining
- **WHEN** a field has status "active" and timeRemaining > 0
- **THEN** the timer SHALL tick down by 1 every second, updating the display in real-time

#### Scenario: Timer reaches zero
- **WHEN** the countdown reaches 0
- **THEN** the field status SHALL automatically change to "idle"
- **AND** timeRemaining SHALL be set to null
- **AND** an activity log entry SHALL be created ("Hết thời gian tại [field name]")

#### Scenario: Field is idle
- **WHEN** a field has status "idle"
- **THEN** the timer display SHALL show "--:--" and no countdown interval SHALL be running

#### Scenario: Cleanup on unmount
- **WHEN** the user navigates away from FieldDetailPage
- **THEN** the countdown interval SHALL be cleared (no memory leak)
