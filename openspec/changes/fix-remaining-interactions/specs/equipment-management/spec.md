## MODIFIED Requirements

### Requirement: Connect All button gains animated flow
The "Kết nối tất cả" button on EquipmentPage SHALL follow the animated three-phase flow defined in the `connect-animation` capability spec instead of instantly updating all devices.

#### Scenario: Connect all replaces instant action
- **WHEN** the user clicks "KẾT NỐI TẤT CẢ"
- **THEN** the system SHALL use the animated flow (connecting → success → idle) instead of instantly setting all to connected

### Requirement: Device cards gain tooltips
Each device card's icon and action button SHALL display a descriptive tooltip on hover, as specified in the `ux-enhancements` capability spec.

#### Scenario: Tooltips on device elements
- **WHEN** the user hovers over device icons or action buttons
- **THEN** descriptive tooltips SHALL appear explaining the element's purpose
