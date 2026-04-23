## ADDED Requirements

### Requirement: Live system status cards
The HomePage status cards SHALL display values computed from the app context: "Hoạt động tốt" / sensor status based on equipment data, count of active fields out of total, and count of warnings from equipment with non-connected status.

#### Scenario: Active field count
- **WHEN** 3 out of 5 fields have status "active"
- **THEN** the status card SHALL display "03" with "Sân đang bật" and "Trên tổng số 5 sân"

#### Scenario: Warning count from equipment
- **WHEN** 2 equipment entries have status other than "connected"
- **THEN** the warning card SHALL display "02" with "Cảnh báo"

### Requirement: Recent activity from data
The HomePage recent activity list SHALL render entries from the context's `activities[]` array, sorted by time descending, displaying the most recent 5 entries.

#### Scenario: Activity list reflects real data
- **WHEN** activities exist in the context
- **THEN** the HomePage SHALL render them with the correct icon (info → bolt, warning → warning), message text, and time

#### Scenario: New activity appears
- **WHEN** a user creates a schedule on another page
- **THEN** returning to HomePage SHALL show the new activity entry at the top of the list

### Requirement: Notification bell indicator
The notification bell button on all pages SHALL display a badge dot when there are unread warnings (equipment with non-connected status).

#### Scenario: Warning badge visible
- **WHEN** there are equipment entries not in "connected" status
- **THEN** the notification bell SHALL show a small red indicator dot

#### Scenario: No warnings
- **WHEN** all equipment entries are "connected"
- **THEN** the notification bell SHALL appear without any badge
