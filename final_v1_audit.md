# Final_v1.txt — Audit Against Actual Codebase

This document lists every factual error, mismatch, and omission found in `Final_v1.txt` when compared to the actual Kinetic Grid prototype (React codebase).

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ❌ **Wrong** | The document describes a feature/behavior that does NOT exist in the prototype |
| ⚠️ **Inaccurate** | The feature exists but is described incorrectly |
| 🟡 **Incomplete** | The document omits a feature that DOES exist in the prototype |
| 📝 **Comment note** | The inline comment `[a]-[k]` at the bottom already flags this — included for completeness |

---

## Section 1: Scope of Evaluation (Lines 5–10)

### ⚠️ Line 6 — "Intelligent Dashboard: High-level status monitoring and activity tracking."
- **Actual:** The HomePage (`/`) shows live stats (active fields, sensor status) and a recent activity feed. The term "Intelligent Dashboard" is a stretch — it's a simple status overview, not an AI/analytics-driven dashboard. Consider calling it "Trang Chủ / Home Dashboard" to match the UI header "TRANG CHỦ".

### ⚠️ Line 7 — "Integrated Connectivity: Hardware discovery and batch pairing via Radar."
- **Actual:** The EquipmentPage (`/equipment`) has a static radar illustration (circles + sweep line) and a "KẾT NỐI TẤT CẢ" batch-connect button. The radar does NOT actually "scan" or "discover" — it's a static visual. Devices are pre-seeded in the data. The word "discovery" implies dynamic scanning which doesn't exist.

---

## Section 2: Task Scenarios (Lines 53–58)

### ❌ Line 55 — Task 1: "24 laser projectors"
- **Actual:** The prototype seeds **5 courts** with **5 equipment devices** (one per court: `eq-1` through `eq-5`). The UI shows `KẾT NỐI TẤT CẢ (5 THIẾT BỊ)`. There are NOT 24 devices. The button and count are data-driven, so during testing the evaluators may have used different seed data, but the current codebase says 5.

> [!IMPORTANT]
> If the evaluation was done on a Figma prototype with 24 devices and the codebase was built later with only 5, this is a **data discrepancy**, not a code error. Either update the seed data to 24 devices or change the document to say 5.

### ❌ Line 57 — Task 3: "adjust the laser intensity"
- **Actual:** There is **NO intensity slider, brightness control, or laser adjustment** anywhere in the prototype. The FieldDetailPage (`/fields/:id`) has:
  - Status card (sport + countdown timer)
  - Quick Controls (3 sport-switch buttons: Bóng chuyền, Cầu lông, Pickleball)
  - "TẮT TOÀN BỘ ĐÈN" kill switch
  - Today's schedule list + "ĐẶT SÂN" booking button
  - **No slider. No intensity. No settings panel.**
- 📝 This matches inline comment `[c]` ("không có") and `[k]` ("??? có setting button không").

---

## Section 3.1: Task 1 Analysis (Lines 97–145)

### ⚠️ Line 139 — "clicking an individual device icon on the radar"
- **Actual:** The radar visual is purely decorative (`div` elements with CSS borders). The device icons on the radar are NOT clickable — there are no click handlers on radar elements. A user cannot "click an individual device icon on the radar." Anh Uy may have clicked a device card on the right-side list instead.

### 🟡 Missing — Connect-all animation flow
- **Actual:** The prototype now has a **3-phase animated flow**: clicking "KẾT NỐI TẤT CẢ" → spinning icon for 5 seconds ("ĐANG KẾT NỐI...") → green success ("ĐÃ KẾT NỐI THÀNH CÔNG ✓") for 2 seconds → auto-reset. The document doesn't mention this animation at all.
- **Impact:** The "4 seconds" time reported for Phát would not be possible with a mandatory 5-second animation. This suggests either (a) the test was done BEFORE the animation was added, or (b) the timer should be reconsidered.

---

## Section 3.2: Task 2 Analysis (Lines 147–194)

### ⚠️ Line 148–149 — "Swipe interaction versus Filtering"
- **Actual:** The FieldsPage (`/fields`) is a **scrollable list** (vertical scroll, `overflow-y-auto`). There is NO swipe gesture — it's standard scroll. The document calls it "swiping" but it's just scrolling through a list. The evaluation should say "scrolling" not "swiping."

### ❌ Line 188 — "color-coding (Green = Idle)"
- **Actual:** After our fixes, idle courts now use **neutral gray** styling (gray border, gray icon background, gray "Trống" text). They are NOT green. Active courts use sport-specific colors (blue for Pickleball, green for Cầu lông, red for Bóng chuyền).
- 📝 This matches inline comment `[b]` ("dùng màu xanh cho empty hơi kì") — the original design DID use green for idle, but this was identified as confusing and has been fixed. **The document should be updated to reflect the current gray styling.**

> [!WARNING]
> If the evaluation was done BEFORE the idle-color fix, then the user feedback about "green squares" (line 192, Mợ Út) was accurate at the time. But the document should now reflect the corrected design, or add a note that this was changed post-evaluation.

### ⚠️ Line 191 — "an idle court can be transformed into any sport"
- **Actual:** This is true via FieldDetailPage's "Thay đổi nhanh" (Quick Controls), but it requires navigating INTO the court detail first (click "Quản lý"). It cannot be done from the list view. The document implies it's discoverable from the list, which is misleading.

---

## Section 3.3: Task 3 Analysis (Lines 196–243)

### ❌ Line 197 — "adjust the laser intensity"
- **Actual:** This feature does **NOT EXIST**. There is no intensity slider, brightness control, or any settings panel in the FieldDetailPage. The available controls are:
  - **Sport switch** (3 buttons: Bóng chuyền, Cầu lông, Pickleball)
  - **Kill switch** ("TẮT TOÀN BỘ ĐÈN")
  - **Book court** ("ĐẶT SÂN" → AddScheduleModal)
- 📝 Matches comment `[c]`. This is a critical error — an entire sub-task refers to a non-existent feature.

### ❌ Line 237 — "intensity slider" and "slider hitbox"
- **Actual:** No slider exists. Má Uy could not have "nearly touched the Kill Switch while adjusting the intensity slider" because there is no slider to adjust. The near-miss of the Kill Switch may have happened through another interaction (perhaps tapping Quick Controls buttons), but not a slider.
- 📝 Partially matches comment `[d]` which confirms the near-miss happened, but the cause (slider) is wrong.

### ❌ Line 240 — "Settings button" and "hitboxes for sliders and buttons"
- **Actual:** There is no "Settings" button in FieldDetailPage. The only interactive elements are sport buttons, the kill switch, and the booking button.
- 📝 Matches comment `[k]` ("??? có setting button không").

### 🟡 Missing — Live countdown timer
- **Actual:** The prototype now has a **real-time countdown timer** that ticks down every second in MM:SS format. When it reaches 00:00, the field auto-transitions to idle. The document mentions "Countdown Timer" (line 238) and Mẹ Hân's positive feedback, but doesn't describe it as a **live** timer — just implies a static display.

---

## Section 3.4: Task 4 Analysis (Lines 245–292)

### ❌ Line 289 — Comment `[g]`: "feedback sai, vì có label trên block đó"
- **Actual:** This comment is CORRECT — the Gantt blocks DO have text labels. Each block shows:
  - Sport name (e.g., "Pickleball") — 20px bold white text
  - Time range (e.g., "08:00 - 10:00") — 16px white text
- Chị Uy's feedback "colored blocks should have text labels" was wrong about the prototype's capability. The document should correct this: the labels exist but may be hard to read for short-duration blocks (text can be truncated with ellipsis).

### ⚠️ Line 290 — "The red 'Now' indicator"
- **Actual:** The "Now" line exists but it is **blue** (`bg-[#005bbf]`), not red. The label says "BÂY GIỜ" in a blue pill badge. The document says "red" which is factually wrong.

### 🟡 Missing — Overlap detection
- **Actual:** The prototype NOW has overlap detection when adding a new schedule. If a user tries to book a time that overlaps with an existing booking, it shows a red error: "Trùng lịch! [sport] đã đặt từ [start] - [end]." This directly addresses Anh Uy's suggestion in comment `[h]`. The document should mention this as a feature.

### 🟡 Missing — Drag-to-reschedule
- **Actual:** Schedule blocks in the Gantt chart are **draggable**. Users can drag a block to change its time (snaps to 15-minute increments). The time preview updates live during drag. This is a significant interaction feature that the document doesn't mention at all.

---

## Section 4: Discussion & Recommendations (Lines 294–315)

### ❌ Line 303 — "sliders have hitboxes that are too small"
- **Actual:** No sliders exist in the prototype. This recommendation is based on a non-existent feature.

### ⚠️ Line 308 — "Increase the font size on the Scheduler's timeline by at least 20%"
- **Actual:** This has already been done. Font sizes were increased:
  - Sport name: 18px → 20px (+11%)
  - Time range: 14px → 16px (+14%)
  - Time headers: 16px → 18px (+12.5%)
  - Field labels: 20px → 22px (+10%)
- The increases are around 10-14%, not 20%, but the direction is correct. The document should acknowledge the improvement was made.

### ❌ Line 311 — "Expand the Hitbox for settings buttons and light intensity sliders"
- **Actual:** Neither settings buttons nor intensity sliders exist. This recommendation is moot.

### ⚠️ Line 312 — "Integrate a Zoom-in feature for the Gantt chart"
- **Actual:** No zoom feature exists. The Gantt chart is fixed-width (`min-w-[1200px]`) with horizontal scroll via `overflow-x-auto`. This recommendation is valid but hasn't been implemented.

### ⚠️ Line 314 — "Implement a two-step Confirmation Dialog for the Kill Switch"
- **Actual:** This ALREADY EXISTS. Clicking "TẮT TOÀN BỘ ĐÈN" opens a confirmation modal with "Không, Quay lại" and "Đồng Ý Tắt" buttons. It is a two-step process. The document recommends something that's already implemented.

### ⚠️ Line 309 — "Incorporate sport labels directly onto the colored blocks"
- **Actual:** Sport labels already exist on blocks (sport name + time range as text). The recommendation asks for something that's already there. The real issue is text visibility on narrow/short-duration blocks — which has been addressed with `overflow-hidden text-ellipsis` and hover tooltips.

---

## Features in the Prototype NOT Mentioned in the Document

| Feature | Location | Description |
|---------|----------|-------------|
| **Audio feedback** | All pages | Success chime (Web Audio API) plays on schedule creation, equipment connect/disconnect, lights toggle |
| **Equipment tooltips** | `/equipment` | Hover tooltips on device icons ("Bộ điều khiển chiếu sáng") and action buttons ("Ngắt kết nối thiết bị này") |
| **Drag-to-reschedule** | `/schedule` | Gantt blocks are draggable with 15-min snap and live time preview |
| **Schedule overlap detection** | AddScheduleModal | Prevents double-booking with inline error message |
| **Connect-all animation** | `/equipment` | 3-phase flow: spinning (5s) → success (2s) → reset |
| **Date/time picker modals** | Multiple pages | Custom date picker and time range picker modals |
| **Search by name** | `/fields` | Text search input filters courts by name |
| **Activity feed** | `/` (Home) | Real-time activity log showing recent system events |

---

## Summary

| Category | Count |
|----------|-------|
| ❌ Feature doesn't exist (described wrongly) | **6** |
| ⚠️ Feature exists but described inaccurately | **8** |
| 🟡 Feature exists but omitted from document | **8** |
| **Total issues** | **22** |

> [!CAUTION]
> The most critical errors are the repeated references to a **"laser intensity slider"** and **"settings button"** — these features do not exist anywhere in the codebase. Three task descriptions, two qualitative observations, and two recommendations are based on this non-existent feature. This needs to be rewritten entirely.
