## Why

The HCI prototype evaluation revealed 4 incomplete interaction flows and 3 missing UX enhancements. Evaluators flagged dead-end interactions (instant "Kết nối tất cả" with no feedback, static countdown), inconsistent visual semantics (idle fields showing sport data in green), and accessibility gaps (small font on schedule, no audio/visual feedback for novice users). These must be fixed before the next HCI evaluation round.

## What Changes

- **"Kết nối tất cả" animated flow** (`/equipment`): Replace instant batch-connect with a 5-second spinning animation → success confirmation → auto-reset. Complete visual feedback loop.
- **Live countdown timer** (`/fields/:id`): `timeRemaining` decrements every second in real-time. When it hits 0, the field auto-transitions to idle status.
- **Idle field display fix** (`/fields`): Idle/empty fields no longer show a sport badge or sport-colored border. Status "Trống" uses neutral gray instead of green. Visually distinguishes empty vs active courts.
- **Schedule page font size increase** (`/schedule`): Increase Gantt block text and time header text for readability by older users.
- **Schedule card responsive text** (`/schedule`): Gantt booking cards with short durations (e.g., 30 min) must display text gracefully — truncate or hide labels when the card is too narrow, and show a tooltip with the full info on hover.
- **Audio feedback on task completion**: Play a short success sound when key actions complete (schedule created, equipment connected, lights toggled).
- **Tooltips on equipment icons**: Add hover tooltips explaining device status icons and action buttons on the Equipment page.

## Capabilities

### New Capabilities
- `connect-animation`: Animated "Kết nối tất cả" button flow with spinning state, 5-second delay, success confirmation, and auto-reset.
- `countdown-timer`: Real-time countdown of `timeRemaining` on FieldDetailPage that decrements every second and auto-transitions field to idle at zero.
- `ux-enhancements`: Accessibility and UX polish — larger schedule fonts, responsive Gantt card text, audio feedback on actions, and device icon tooltips.

### Modified Capabilities
- `field-management`: Idle fields no longer display sport badge/border; "Trống" status uses gray instead of green.
- `equipment-management`: "Kết nối tất cả" gains animated flow; individual device cards gain tooltips.

## Impact

- **Files modified**: `EquipmentPage.jsx`, `FieldDetailPage.jsx`, `FieldsPage.jsx`, `SchedulePage.jsx`
- **New assets**: 1 small audio file (success chime, can use Web Audio API to generate)
- **No new dependencies**: All achievable with CSS animations, `useEffect`/`setInterval`, and Web Audio API
- **No breaking changes**: All changes are additive UX enhancements
