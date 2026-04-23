## ADDED Requirements

### Requirement: Field list driven by data
The FieldsPage SHALL render its court list from the context's `fields[]` array instead of hardcoded JSX. Each field row SHALL display the field's name, sport, status, and time remaining from data.

#### Scenario: All fields rendered from data
- **WHEN** the FieldsPage loads
- **THEN** it SHALL render one row per field in the `fields[]` array with correct name, sport badge, status indicator, and time remaining

### Requirement: Search filter
The search input on FieldsPage SHALL filter the field list by field name in real-time as the user types. Filtering SHALL be case-insensitive.

#### Scenario: Searching by name
- **WHEN** the user types "Sân 3" in the search input
- **THEN** only fields whose name contains "Sân 3" SHALL be displayed

#### Scenario: Empty search shows all
- **WHEN** the search input is cleared
- **THEN** all fields SHALL be displayed

### Requirement: Sport filter chips
The sport filter chips (Tất cả, Pickleball, Cầu lông, Bóng chuyền) SHALL toggle selection state. Only one chip SHALL be active at a time. The active chip SHALL filter the field list to show only fields matching that sport. "Tất cả" SHALL show all fields.

#### Scenario: Filtering by sport
- **WHEN** the user clicks "Pickleball" chip
- **THEN** only Pickleball fields SHALL be displayed and the chip SHALL appear in active/selected style

#### Scenario: Clearing sport filter
- **WHEN** the user clicks "Tất cả" chip
- **THEN** all fields SHALL be displayed regardless of sport

### Requirement: Status filter chips
The status filter chips (Tất cả, Hoạt động, Trống) SHALL toggle selection state. The active chip SHALL filter the field list by status.

#### Scenario: Filtering by active status
- **WHEN** the user clicks "Hoạt động" chip
- **THEN** only fields with status "active" SHALL be displayed

### Requirement: All Quản lý buttons navigate
Every "Quản lý" button on each field row SHALL navigate to `/fields/:id` using that field's ID.

#### Scenario: Clicking Quản lý on any field
- **WHEN** the user clicks "Quản lý" on a field with id "field-3"
- **THEN** the app SHALL navigate to `/fields/field-3`

### Requirement: FieldDetailPage driven by route param
The FieldDetailPage SHALL read the `:id` route parameter, look up the corresponding field from context, and render all content dynamically: page title, status card (sport, time remaining), today's schedule, and quick controls.

#### Scenario: Viewing field details
- **WHEN** the user navigates to `/fields/field-1`
- **THEN** the page title SHALL show the field's name, status card SHALL show current sport and time, and today's schedule SHALL list schedules for that field on today's date

#### Scenario: Field not found
- **WHEN** the user navigates to `/fields/nonexistent-id`
- **THEN** the page SHALL display a friendly "field not found" message with a back button

### Requirement: Quick control buttons change active sport
The three quick-control sport buttons on FieldDetailPage SHALL update the field's active sport in the context when clicked. The status card SHALL immediately reflect the change.

#### Scenario: Switching sport via quick control
- **WHEN** the user clicks the "Cầu lông" quick control button on FieldDetailPage
- **THEN** the field's sport SHALL update to "Cầu lông", the status card SHALL reflect the change, and an activity log entry SHALL be created

### Requirement: Turn off all lights
The "Tắt toàn bộ đèn" button SHALL set the field's status to "idle" and clear timeRemaining. The confirmation modal SHALL execute the action on "Đồng Ý Tắt" and cancel on "Không, Quay lại".

#### Scenario: Confirming lights off
- **WHEN** the user clicks "Đồng Ý Tắt" in the confirmation modal
- **THEN** the field's status SHALL change to "idle", timeRemaining to null, and an activity entry SHALL be logged

#### Scenario: Cancelling lights off
- **WHEN** the user clicks "Không, Quay lại"
- **THEN** the modal SHALL close and no state change SHALL occur
