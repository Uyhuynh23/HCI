## Context

The HCI court-management prototype is a React + Vite SPA that manages sports-court bookings across a 5-court facility. State is centralized in `AppContext` via `useReducer` and persisted to `localStorage`. The UI is composed of three main pages:

- **FieldsPage** — lists courts with live status; single-click navigates to detail.
- **SchedulePage** — Gantt-style timeline (09:00–23:00) with drag-to-reschedule bookings.
- **AddScheduleModal** — form to create a new booking (sport, court, date, time range).

All three files are self-contained React components with inline Tailwind-style utility classes. No external form library or gesture library is used.

## Goals / Non-Goals

**Goals:**
- Add `customerName` and `customerPhone` to the booking data model and capture them in the booking modal.
- Prevent accidental court-card navigation on `FieldsPage` when the user is scrolling by introducing a long-press gesture guard on active courts.
- Provide a single-screen, no-scroll overview of the entire facility schedule through a "Condensed View" toggle.

**Non-Goals:**
- Backend API integration or database persistence (stays localStorage-only).
- Phone-number format validation against Vietnam carrier patterns (basic length check only).
- Adding customer information to the Gantt booking blocks (they're too narrow; details shown on click/hover only).
- Making the condensed view the default — the current detailed view remains default.

## Decisions

### 1. Customer Fields — Optional, Not Required

**Decision:** `customerName` and `customerPhone` are optional fields (no validation-gating on Confirm). The existing booking flow must remain fast — forcing name+phone would slow down walk-in bookings.

**Alternative considered:** Making fields mandatory. Rejected because staff reported they often create bookings without customer contact info for walk-ins.

### 2. Gesture Guard — Long-press (≥ 400 ms) for Active Courts Only

**Decision:** Implement a custom `useLongPress` hook using `pointerdown` / `pointerup` / `pointermove` events. Active courts require a 400 ms long-press to navigate. Idle courts keep instant click.

**Alternative considered:**
- *Double-tap:* Accessible but not intuitive for desktop users; inconsistent with web conventions.
- *Swipe-guard zone:* Complex to implement, fragile across viewport sizes, and doesn't solve the core problem of accidental taps.
- *Third-party gesture library (e.g., `react-use-gesture`):* Adds dependency for a single interaction; custom hook is ~30 lines and zero-dep.

**Visual feedback:** A radial progress-ring overlay appears during the long-press to signal the gesture is registering. If the pointer moves > 10 px during the hold (i.e., user is scrolling), the gesture is cancelled.

### 3. Condensed View — CSS-driven Scaling, No Virtual Scrolling

**Decision:** The toggle switches CSS variables: reduced row height (120px → 56px), compressed font size, and the timeline container is forced to `width: 100%; overflow: hidden` (no horizontal scroll). The time axis shifts from the current 09:00–23:00 range to a full 05:00–23:00 window to cover early-morning bookings.

**Alternative considered:**
- *CSS `transform: scale()` on the whole Gantt:* Makes text unreadable, breaks pointer events.
- *Canvas / SVG render:* High effort, breaks existing drag-and-drop logic.
- *Virtualized rows:* Unnecessary — max 5 rows; no performance concern.

### 4. Data Model — Additive Change, Backward-compatible

**Decision:** Add two optional string fields to the schedule object: `customerName?: string` and `customerPhone?: string`. Existing schedules without these fields continue to work (undefined is safely handled via optional chaining). No migration script needed.

## Risks / Trade-offs

- **[Long-press discoverability]** → Users may not know to long-press active courts. Mitigation: On first session, show a tooltip "Nhấn giữ để mở chi tiết sân đang hoạt động" (Long-press to open active court details). Also, the progress-ring animation serves as a continuous affordance.
- **[Condensed view text legibility]** → At 56 px row height, booking labels may truncate. Mitigation: Show only sport icon + time; full details on hover tooltip.
- **[Time axis change from 09–23 to 05–23]** → Wider range means each hour occupies less horizontal space in condensed mode. Mitigation: Only apply the 05–23 range in condensed mode; normal mode retains 09–23.
