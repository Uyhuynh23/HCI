## ADDED Requirements

### Requirement: Animated connect-all flow
The "Kết nối tất cả" button SHALL follow a three-phase animation: connecting (5 seconds with spinning icon) → success confirmation (2 seconds with checkmark) → reset to idle. The actual device state update SHALL occur at the connecting→success transition.

#### Scenario: User clicks connect all
- **WHEN** the user clicks "KẾT NỐI TẤT CẢ"
- **THEN** the button text SHALL change to "ĐANG KẾT NỐI..." with a spinning sync icon
- **AND** after 5 seconds, all devices SHALL be updated to "connected"
- **AND** the button SHALL show "ĐÃ KẾT NỐI THÀNH CÔNG ✓" with a green background for 2 seconds
- **AND** the button SHALL then reset to its default state

#### Scenario: Button disabled during connecting
- **WHEN** the connect-all animation is in "connecting" or "success" phase
- **THEN** the button SHALL be disabled (not clickable)

#### Scenario: Navigation during animation
- **WHEN** the user navigates away during the connecting animation
- **THEN** the animation interval SHALL be cleaned up (no memory leak)
