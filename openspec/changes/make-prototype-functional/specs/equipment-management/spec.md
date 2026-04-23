## ADDED Requirements

### Requirement: Equipment list driven by data
The EquipmentPage SHALL render the device list from the context's `equipment[]` array. Each item SHALL display the field name and current connection status with appropriate styling.

#### Scenario: All devices rendered from data
- **WHEN** the EquipmentPage loads
- **THEN** it SHALL render one card per equipment entry showing field name, connection indicator (green dot + "Đã kết nối", italic "Đang kết nối...", italic "Đang tìm kiếm..."), and the appropriate action button

### Requirement: Disconnect button toggles status
The "Ngắt" button on connected devices SHALL open a disconnect confirmation modal referencing the correct device name and sport. On confirm, the device status SHALL change to "disconnected".

#### Scenario: Disconnecting a device
- **WHEN** the user clicks "Ngắt" on Sân 1 and confirms
- **THEN** Sân 1's status SHALL change to "disconnected", the card SHALL update to show disconnected state, and an activity entry SHALL be logged

#### Scenario: Cancel disconnect
- **WHEN** the user clicks "Không" in the disconnect modal
- **THEN** the modal SHALL close and no status change SHALL occur

### Requirement: Disconnect modal shows correct device info
The disconnect confirmation modal SHALL display the name of the specific device being disconnected, not a hardcoded value.

#### Scenario: Modal shows device name
- **WHEN** the user clicks "Ngắt" on "Sân 3"
- **THEN** the modal text SHALL reference "Sân 3" by name

### Requirement: Cancel button for connecting/searching devices
The "Hủy" button on devices with status "connecting" or "searching" SHALL change the device status to "disconnected".

#### Scenario: Cancelling a connecting device
- **WHEN** the user clicks "Hủy" on a device with status "connecting"
- **THEN** the device status SHALL change to "disconnected"

### Requirement: Connect All button
The "Kết nối tất cả" button SHALL change all equipment entries to "connected" status.

#### Scenario: Batch connect
- **WHEN** the user clicks "Kết nối tất cả"
- **THEN** all equipment entries SHALL have connectionStatus "connected" and the device count SHALL update

### Requirement: Device count from data
The "Đã tìm thấy: XX thiết bị" label SHALL display the actual count of equipment entries from context.

#### Scenario: Device count accuracy
- **WHEN** the equipment data has 5 entries
- **THEN** the label SHALL display "Đã tìm thấy: 5 thiết bị"
