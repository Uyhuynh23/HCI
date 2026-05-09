## ADDED Requirements

### Requirement: Condensed view toggle
The SchedulePage SHALL include a toggle button labeled "Thu gọn" (Condensed) in the filter bar area. Clicking the toggle SHALL switch between the default detailed view and a condensed view. The toggle state SHALL be visually distinct (e.g., filled vs outlined icon).

#### Scenario: Toggle to condensed view
- **WHEN** the user clicks the "Thu gọn" toggle button while in detailed view
- **THEN** the Gantt chart SHALL switch to condensed mode and the toggle SHALL appear in its active state

#### Scenario: Toggle back to detailed view
- **WHEN** the user clicks the "Thu gọn" toggle button while in condensed view
- **THEN** the Gantt chart SHALL switch back to detailed mode and the toggle SHALL appear in its inactive state

### Requirement: All courts visible without vertical scroll
In condensed view, the Gantt chart SHALL display all courts (currently 5) within the visible viewport height without requiring vertical scrolling. Each court row height SHALL be reduced to approximately 56 px (from the default 120 px).

#### Scenario: Five courts fit on screen
- **WHEN** the condensed view is active on a standard viewport (≥ 768 px height)
- **THEN** all 5 court rows, the time header, and the stats footer SHALL be visible without scrolling

### Requirement: Full timeline without horizontal scroll
In condensed view, the timeline SHALL scale to fit the full container width without horizontal scrolling. The `min-width` constraint on the Gantt inner container SHALL be removed in condensed mode.

#### Scenario: Timeline fits container width
- **WHEN** the condensed view is active
- **THEN** the entire time axis (all hours) SHALL be visible within the viewport width and no horizontal scrollbar SHALL appear

### Requirement: Extended time range in condensed mode
In condensed view, the time axis SHALL display an extended range of 05:00–23:00 (18 hours) to cover early-morning and late-evening bookings. The default detailed view SHALL retain its current 09:00–23:00 range.

#### Scenario: Condensed view shows 05:00–23:00
- **WHEN** the condensed view is active
- **THEN** the time header SHALL display hours from 05:00 through 22:00 and the booking blocks SHALL be positioned according to the 05:00–23:00 scale

### Requirement: Booking blocks display compact info
In condensed view, booking blocks within the Gantt chart SHALL display abbreviated information: sport icon/name and time range only. Text SHALL be truncated with ellipsis if the block is too narrow. Full details SHALL be available via hover tooltip.

#### Scenario: Narrow booking block shows truncated text
- **WHEN** a booking block is narrower than 80 px in condensed view
- **THEN** the block SHALL display only the sport abbreviation or icon, with the full detail available on hover

#### Scenario: Hover on condensed booking shows full details
- **WHEN** the user hovers over a booking block in condensed view
- **THEN** a tooltip SHALL display the full sport name, time range, and customer name (if available)

### Requirement: Drag-and-drop remains functional in condensed view
Booking blocks in condensed view SHALL remain draggable. The drag-and-drop behavior SHALL use the condensed pixel-per-minute ratio for accurate repositioning.

#### Scenario: Drag booking in condensed view
- **WHEN** the user drags a booking block in condensed view
- **THEN** the block SHALL snap to 15-minute increments using the condensed timeline scale and update the schedule accordingly
