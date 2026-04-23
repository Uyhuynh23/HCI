## MODIFIED Requirements

### Requirement: Idle field display
Idle fields on FieldsPage SHALL be visually distinct from active fields. They SHALL NOT display a sport badge or sport-colored border. The status text "Trống" SHALL use a neutral gray color instead of green.

#### Scenario: Idle field in list
- **WHEN** a field has status "idle"
- **THEN** the sport column SHALL display "—" (em dash) with neutral gray styling instead of a colored sport badge
- **AND** the border-left color SHALL be neutral gray (`border-outline-variant`) instead of sport-specific color
- **AND** the icon SHALL use a neutral gray background instead of sport-colored background
- **AND** the status text "Trống" SHALL be gray (`text-outline`) not green

#### Scenario: Active field in list (unchanged)
- **WHEN** a field has status "active"
- **THEN** the field SHALL display its sport badge, sport-colored border, and icon as before
