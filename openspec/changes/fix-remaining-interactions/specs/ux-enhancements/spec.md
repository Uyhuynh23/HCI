## ADDED Requirements

### Requirement: Larger font on schedule page
The SchedulePage Gantt chart SHALL use increased font sizes: sport name at 20px (was 18px), time range at 16px (was 14px), time header at 18px (was 16px), and field name labels at 22px (was 20px).

#### Scenario: Gantt block text readability
- **WHEN** the schedule page loads
- **THEN** all text within Gantt chart blocks and headers SHALL be at the specified larger sizes

### Requirement: Responsive Gantt card text for short-duration bookings
Gantt booking cards SHALL display text gracefully regardless of the card width. When a card is too narrow to fit all text (e.g., a 30-minute booking), the text SHALL be truncated with CSS `overflow: hidden` and `text-overflow: ellipsis`, and the card SHALL display a `title` tooltip showing the full sport name and time range on hover. Text SHALL never overflow or wrap outside the card boundaries.

#### Scenario: Normal-width card (≥ 1 hour)
- **WHEN** a booking duration is 1 hour or more
- **THEN** both the sport name and time range SHALL display fully within the card

#### Scenario: Narrow card (< 1 hour)
- **WHEN** a booking duration is less than 1 hour
- **THEN** text SHALL be truncated with ellipsis if it overflows
- **AND** the full sport name and time range SHALL appear in a hover tooltip

#### Scenario: Minimum card width
- **WHEN** a booking duration is very short (e.g., 30 minutes)
- **THEN** the card SHALL still be visually identifiable by its sport color
- **AND** hovering SHALL reveal the full details via tooltip

### Requirement: Audio feedback on task completion
The system SHALL play a short success chime (~200ms, two-tone, generated via Web Audio API) when the following actions complete: schedule created, equipment connected/disconnected, lights toggled off, and connect-all success.

#### Scenario: Schedule creation sound
- **WHEN** a new schedule is successfully created via AddScheduleModal
- **THEN** a short success chime SHALL play

#### Scenario: Equipment connect sound
- **WHEN** the connect-all animation reaches the success phase
- **THEN** a short success chime SHALL play

#### Scenario: Lights toggle sound
- **WHEN** "Tắt toàn bộ đèn" is confirmed
- **THEN** a short success chime SHALL play

### Requirement: Tooltips on equipment icons
Equipment page action buttons and device status icons SHALL have descriptive tooltips visible on hover.

#### Scenario: Connected device tooltip
- **WHEN** the user hovers over a connected device's "Ngắt" button
- **THEN** a tooltip "Ngắt kết nối thiết bị này" SHALL appear

#### Scenario: Device icon tooltip
- **WHEN** the user hovers over a device's icon
- **THEN** a tooltip "Bộ điều khiển chiếu sáng" SHALL appear

#### Scenario: Disconnected device tooltip
- **WHEN** the user hovers over a disconnected device's "Kết nối" button
- **THEN** a tooltip "Kết nối lại thiết bị" SHALL appear
