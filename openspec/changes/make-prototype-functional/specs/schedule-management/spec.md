## ADDED Requirements

### Requirement: AddScheduleModal persists data
When the user fills out the AddScheduleModal (date, zone, sport, start time, end time) and clicks "XÁC NHẬN", the system SHALL create a new schedule entry in the context and persist it to localStorage. The modal SHALL close after saving.

#### Scenario: Successful schedule creation
- **WHEN** the user selects a date, zone, sport, and time range, then clicks "XÁC NHẬN"
- **THEN** a new schedule entry SHALL be created with the selected values, appear in the SchedulePage Gantt chart, appear in the relevant FieldDetailPage schedule list, and an activity log entry SHALL be created

#### Scenario: Cancel discards input
- **WHEN** the user clicks "HỦY" on the AddScheduleModal
- **THEN** the modal SHALL close and no schedule SHALL be created

### Requirement: Gantt chart driven by schedule data
The SchedulePage Gantt chart SHALL render booking blocks from the context's `schedules[]` array. Each row SHALL correspond to a field, and blocks SHALL be positioned according to their start/end times relative to the 08:00-19:00 time axis.

#### Scenario: Schedule appears as Gantt block
- **WHEN** a schedule exists for Sân 1 from 09:00 to 11:00 with sport "Pickleball"
- **THEN** a blue draggable block labeled "Pickleball / 09:00 - 11:00" SHALL appear in the Sân 1 row, positioned at the correct horizontal offset

#### Scenario: Newly added schedule appears
- **WHEN** a schedule is added via AddScheduleModal
- **THEN** the new block SHALL appear in the Gantt chart without page reload

### Requirement: Now marker positioned by real time
The "BÂY GIỜ" vertical line on the Gantt chart SHALL be positioned based on the current time relative to the 08:00-19:00 axis. It SHALL update on component mount.

#### Scenario: Current time marker
- **WHEN** the current time is 10:00
- **THEN** the "BÂY GIỜ" marker SHALL be positioned at approximately 18.2% across the timeline (2 hours into an 11-hour range)

### Requirement: Schedule filter buttons functional
The SchedulePage filter buttons (date, court, sport) SHALL open selection UI and filter the displayed schedules.

#### Scenario: Filtering by court
- **WHEN** the user selects a specific court from the filter
- **THEN** only Gantt rows for that court SHALL be displayed

### Requirement: Bottom stats computed from data
The SchedulePage bottom stats ("Công suất sử dụng" and "Đặt sân mới 24H") SHALL be computed from actual schedule data, not hardcoded.

#### Scenario: Usage percentage calculation
- **WHEN** the schedule page loads
- **THEN** "Công suất sử dụng" SHALL reflect the percentage of total field-hours booked vs available for today

#### Scenario: New bookings count
- **WHEN** the schedule page loads
- **THEN** "Đặt sân mới (24H)" SHALL show the count of schedules created within the last 24 hours
