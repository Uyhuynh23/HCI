## Context

The Kinetic Grid prototype uses React Context + localStorage for state management. All pages read/write through `useApp()` hook. The current implementation has instant state updates with no transition animations. The prototype targets HCI evaluation where every interaction must feel complete and provide feedback.

## Goals / Non-Goals

**Goals:**
- Every user action produces visible, temporal feedback (not just instant state changes)
- Idle fields are visually distinct from active fields at a glance
- Older users can read schedule information comfortably
- Novice users gain confidence through audio + visual confirmation
- All changes are CSS/JS only — no new packages

**Non-Goals:**
- Real IoT device connection (the 5s delay is simulated)
- Persistent audio settings (no mute toggle needed for prototype)
- Full WCAG AA accessibility compliance

## Decisions

### 1. Connect-all animation via component state machine

**Decision:** Use a local state machine in EquipmentPage: `idle` → `connecting` → `success` → `idle`. The `connecting` phase uses CSS `@keyframes` to spin the sync icon for 5 seconds, then transitions to `success` (showing a checkmark) for 2 seconds, then resets to `idle`. The actual `batchUpdateEquipment` call happens at the transition from `connecting` → `success`.

**Why not setTimeout chain?** A state machine is cleaner to reason about and prevents race conditions if the user navigates away mid-animation.

### 2. Countdown via `useEffect` + `setInterval`

**Decision:** In FieldDetailPage, start a `setInterval(1000)` that calls `updateField(id, { timeRemaining: timeRemaining - 1 })` each second. When `timeRemaining` hits 0, clear the interval and set status to `idle`. Format as `MM:SS`.

**Trade-off:** This writes to localStorage every second. Acceptable for prototype scale (~100 bytes per write).

### 3. Idle field display: conditional rendering

**Decision:** In FieldsPage field list, check `field.status === 'idle'`. If idle:
- Sport badge column shows "—" or is empty (no colored badge)
- Border-left color uses `border-outline-variant` (neutral gray) instead of sport color
- Status text "Trống" uses `text-outline` (gray) instead of `text-secondary` (green)

### 4. Audio feedback via Web Audio API

**Decision:** Create a helper function `playSuccessSound()` that uses the Web Audio API to generate a short two-tone chime (~200ms). No external audio files needed. Call it on: schedule created, equipment connected, lights toggled.

**Why not an mp3 file?** Web Audio API is zero-dependency, works offline, and the sound is tiny.

### 5. Tooltips via native `title` attribute

**Decision:** Use HTML `title` attribute on device icon containers and action buttons in EquipmentPage. Simple, zero-dependency, works everywhere.

**Why not a custom tooltip component?** Overkill for a prototype. Native `title` provides the required functionality.

## Risks / Trade-offs

- **Countdown writes to localStorage every second** → Acceptable at prototype scale. Not suitable for production.
- **Audio may be blocked by autoplay policy** → We play only on user-initiated actions (click handlers), so browsers allow it.
- **CSS spin animation on button may conflict with layout** → Contained within the button via absolute positioning.
