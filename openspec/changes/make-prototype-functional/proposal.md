## Why

The Kinetic Grid hi-fi prototype has a fully polished UI but almost no working interactions. ~25 buttons are dead, all data is hardcoded in JSX, and modal forms (AddScheduleModal) collect user input then discard it on submit. For HCI evaluation the prototype needs every visible feature to function end-to-end with consistent, persistent data so evaluators can navigate naturally through all screens without hitting dead ends.

## What Changes

- **Introduce a centralized data layer** backed by `localStorage` and React Context so all pages share and persist the same state (fields, schedules, equipment, activity log).
- **Seed realistic initial data** (~4-6 fields, sample schedules, equipment entries, activity entries) on first launch, written once into `localStorage`.
- **Wire every dead button and interaction**:
  - HomePage: live stats computed from data, clickable notification bell, avatar profile (can be simple dropdown).
  - FieldsPage: functional search input, sport filter chips with toggle state, status filter chips with toggle state, all "Quản lý" buttons navigate to `/fields/:id`.
  - FieldDetailPage: dynamic based on `:id` param (title, status, sport, schedule), quick-control buttons change active sport, "Tắt toàn bộ đèn" actually toggles field status, live-ish clock display.
  - EquipmentPage: device list from data, "Ngắt"/"Hủy" toggle connection status, "Kết nối tất cả" batch operation, disconnect modal references correct device.
  - SchedulePage: Gantt rows generated from schedule data, filter buttons (date/court/sport) functional, "BÂY GIỜ" marker positioned from real time, bottom stats computed from data.
- **AddScheduleModal actually saves** — on confirm, write a new schedule entry to context/localStorage, then all pages reflect the new booking.
- **Settings page** — basic placeholder with a theme or profile section (minimal, not a full build).

## Capabilities

### New Capabilities
- `data-layer`: Centralized React Context + localStorage persistence layer with seed data for fields, schedules, equipment, and activity log. Provides CRUD operations consumed by all pages.
- `field-management`: Dynamic field list with filtering (search, sport, status), all navigation links functional, field detail page driven by `:id` param with quick-control actions.
- `schedule-management`: AddScheduleModal persists bookings, Gantt chart driven by schedule data, schedule filters functional, stats computed from real data.
- `equipment-management`: Device list from data, connect/disconnect toggles per device, batch connect, modal references correct device context.
- `home-dashboard`: Homepage stats computed live from data layer, recent activity log from data, notification indicator.

### Modified Capabilities
_(none — no existing specs)_

## Impact

- **Files modified**: All 6 pages, all 4 components, `App.jsx` (context provider wrapping)
- **New files**: ~1-2 (data context/provider, seed data constants)
- **Dependencies**: No new npm packages needed — `localStorage` + React Context + existing `date-fns` are sufficient
- **No breaking changes**: All existing UI preserved; changes are additive (wiring interactions, injecting data)
