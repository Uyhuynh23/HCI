## ADDED Requirements

### Requirement: Centralized app state via React Context
The system SHALL provide a single React Context (`AppContext`) that holds all application state: fields, schedules, equipment, and activities. All pages and components SHALL read and write data exclusively through this context.

#### Scenario: Context available in all pages
- **WHEN** any page component renders within the app
- **THEN** it SHALL have access to the full app state via `useApp()` hook

#### Scenario: State updates propagate across pages
- **WHEN** a schedule is added on the FieldDetailPage
- **THEN** the SchedulePage and FieldsPage SHALL reflect the new schedule without requiring a page reload

### Requirement: localStorage persistence
The system SHALL persist all state to `localStorage` under the key `kinetic-grid-data` on every state change. On app load, the system SHALL restore state from `localStorage` if it exists.

#### Scenario: State persists across page reloads
- **WHEN** a user adds a schedule and reloads the browser
- **THEN** the schedule SHALL still appear in all relevant pages

#### Scenario: localStorage is empty on first visit
- **WHEN** the app loads and no `kinetic-grid-data` key exists in localStorage
- **THEN** the system SHALL write seed data and use it as the initial state

### Requirement: Seed data on first launch
The system SHALL populate initial data on first launch containing: at least 4 fields with varied sports and statuses, at least 5 schedule entries across different fields and time slots, at least 5 equipment entries with varied connection statuses, and at least 3 recent activity entries.

#### Scenario: First launch experience
- **WHEN** a new user opens the app for the first time
- **THEN** they SHALL see a populated dashboard with realistic data across all pages

#### Scenario: Seed dates are relative to today
- **WHEN** seed data is generated
- **THEN** schedule dates and activity times SHALL be relative to the current date/time so data never appears stale

### Requirement: CRUD operations for schedules
The context SHALL expose `addSchedule(schedule)`, `updateSchedule(id, changes)`, and `deleteSchedule(id)` operations.

#### Scenario: Adding a schedule
- **WHEN** `addSchedule()` is called with valid schedule data
- **THEN** the schedule SHALL be added to state and persisted to localStorage

### Requirement: Update operations for fields and equipment
The context SHALL expose `updateField(id, changes)` and `updateEquipment(id, changes)` operations for modifying field status/sport and equipment connection status respectively.

#### Scenario: Updating a field's active sport
- **WHEN** `updateField(id, { sport: 'Cầu lông' })` is called
- **THEN** the field's sport SHALL be updated in state and persisted

#### Scenario: Toggling equipment connection
- **WHEN** `updateEquipment(id, { connectionStatus: 'disconnected' })` is called
- **THEN** the equipment's status SHALL change and persist

### Requirement: Add activity log entry
The context SHALL expose `addActivity(activity)` to log user actions. Significant actions (adding schedule, toggling lights, disconnecting equipment) SHALL automatically create activity entries.

#### Scenario: Action logged on schedule creation
- **WHEN** a new schedule is created via AddScheduleModal
- **THEN** a new activity entry SHALL appear in the HomePage activity list
