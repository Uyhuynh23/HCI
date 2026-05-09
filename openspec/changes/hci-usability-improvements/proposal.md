## Why

The current court-management prototype has three usability gaps identified during heuristic evaluation:

1. **Missing customer identity** — The booking modal captures sport, court, date, and time but records no customer information (name/phone). Staff must maintain parallel paper logs, defeating the purpose of a digital system.
2. **Accidental activation on scroll** — On the Fields page, a single tap on any court card navigates to its detail view. When scrolling through the court list, accidental taps trigger unwanted navigation, breaking the user's flow.
3. **No holistic overview** — The Schedule (Gantt) page requires horizontal + vertical scrolling to see all 5 courts across the full operating window. Managers cannot assess facility-wide utilization at a glance.

Addressing these now prevents workflow friction before the prototype reaches end-user testing.

## What Changes

- **Booking modal customer fields** — Add "Tên khách hàng" (Customer Name) and "Số điện thoại" (Phone Number) input fields to `AddScheduleModal`. These fields are stored in the schedule data model and displayed wherever booking details are shown.
- **Safe-interaction on court cards** — Replace the instant `onClick` navigation on active court cards in `FieldsPage` with a **long-press** (≥ 400 ms) or **double-tap** gesture. A brief visual indicator (ripple / highlight) provides feedback that a long-press is in progress. Single taps continue to work for idle courts to maintain fast access. Scrolling is no longer accidentally intercepted.
- **Condensed "Zoom-to-Fit" view** — Add a "Thu gọn" (Condensed) toggle to `SchedulePage` that:
  - Reduces each court row height so all 5 courts fit vertically without scrolling.
  - Expands the time axis from the current 09:00–23:00 window to a full 05:00–23:00 operational range (or makes it configurable).
  - Removes horizontal scroll by scaling the timeline to the container width.
  - Provides a visual density that allows managers to see every booking in one glance.

## Capabilities

### New Capabilities
- `booking-customer-info`: Adds customer name and phone number fields to the booking flow, persists them in the schedule model, and surfaces them in booking displays.
- `safe-court-interaction`: Implements long-press / double-tap gesture gating on active court cards to prevent accidental navigation during scroll.
- `schedule-condensed-view`: Introduces a "Zoom-to-Fit" / condensed toggle in the strategic scheduler allowing the full facility to be viewed on a single screen.

### Modified Capabilities
_(none — no existing specs are affected)_

## Impact

- **Data model** (`AppContext.jsx`, `seedData.js`): Schedule objects gain `customerName` and `customerPhone` optional string fields.
- **Components** (`AddScheduleModal.jsx`): Two new input fields, form-reset logic, and validation updates.
- **Pages** (`FieldsPage.jsx`): Court card click handler replaced with gesture handler; new touch-event logic.
- **Pages** (`SchedulePage.jsx`): New condensed-view state, dynamic row sizing, timeline scale adjustments, toggle UI.
- **No external dependencies added** — all changes are pure React + CSS.
