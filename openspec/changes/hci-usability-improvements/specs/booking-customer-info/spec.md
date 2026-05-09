## ADDED Requirements

### Requirement: Booking modal captures customer name
The AddScheduleModal SHALL include a text input field labeled "Tên khách hàng" (Customer Name) that accepts free-form text up to 100 characters.

#### Scenario: Customer name is entered
- **WHEN** the user types a name into the "Tên khách hàng" field and confirms the booking
- **THEN** the created schedule object SHALL include a `customerName` property with the entered value

#### Scenario: Customer name is left empty
- **WHEN** the user leaves the "Tên khách hàng" field empty and confirms the booking
- **THEN** the created schedule object SHALL have `customerName` set to an empty string and the booking SHALL be created successfully (field is optional)

### Requirement: Booking modal captures customer phone number
The AddScheduleModal SHALL include a text input field labeled "Số điện thoại" (Phone Number) that accepts numeric input with a `tel` input type.

#### Scenario: Phone number is entered
- **WHEN** the user types a phone number into the "Số điện thoại" field and confirms the booking
- **THEN** the created schedule object SHALL include a `customerPhone` property with the entered value

#### Scenario: Phone number is left empty
- **WHEN** the user leaves the "Số điện thoại" field empty and confirms the booking
- **THEN** the booking SHALL be created successfully without a phone number (field is optional)

### Requirement: Customer fields are reset on modal open
When the AddScheduleModal is opened for a new booking, both customer input fields SHALL be reset to empty strings.

#### Scenario: Modal reopened after previous booking
- **WHEN** the user creates a booking with customer info, closes the modal, and opens it again
- **THEN** the "Tên khách hàng" and "Số điện thoại" fields SHALL be empty

### Requirement: Customer info persisted in schedule data model
The schedule data object SHALL support optional `customerName` (string) and `customerPhone` (string) properties. Existing schedules without these properties SHALL continue to function without errors.

#### Scenario: Backward compatibility with existing data
- **WHEN** the application loads schedules from localStorage that lack `customerName` and `customerPhone` fields
- **THEN** the application SHALL render and operate normally, treating missing fields as undefined

### Requirement: Customer info displayed in activity log
When a booking with customer info is created, the activity log message SHALL include the customer name if provided.

#### Scenario: Booking with customer name creates descriptive log
- **WHEN** a booking is confirmed with `customerName` = "Nguyễn Văn A"
- **THEN** the activity log entry SHALL include "Nguyễn Văn A" in the message text
