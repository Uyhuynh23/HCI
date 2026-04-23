## 1. Audio Utility

- [x] 1.1 Create `src/utils/audio.js` with a `playSuccessSound()` function using Web Audio API — generates a short two-tone chime (~200ms), no external files needed.

## 2. Connect-All Animation (`EquipmentPage.jsx`)

- [x] 2.1 Add local state machine `connectPhase`: `'idle'` | `'connecting'` | `'success'`. Add CSS `@keyframes spin` for the sync icon.
- [x] 2.2 On click: set phase to `'connecting'`, start 5s timer. After 5s: call `batchUpdateEquipment`, `addActivity`, set phase to `'success'`, play success sound. After 2s more: reset to `'idle'`.
- [x] 2.3 Button renders conditionally: idle → blue "KẾT NỐI TẤT CẢ", connecting → blue "ĐANG KẾT NỐI..." + spinning icon + disabled, success → green "ĐÃ KẾT NỐI THÀNH CÔNG ✓" + disabled.
- [x] 2.4 Cleanup: clear timers on unmount via `useEffect` return.

## 3. Equipment Tooltips (`EquipmentPage.jsx`)

- [x] 3.1 Add `title="Bộ điều khiển chiếu sáng"` on device icon container.
- [x] 3.2 Add `title="Ngắt kết nối thiết bị này"` on "Ngắt" buttons, `title="Kết nối lại thiết bị"` on "Kết nối" buttons, `title="Hủy quá trình kết nối"` on "Hủy" buttons.

## 4. Countdown Timer (`FieldDetailPage.jsx`)

- [x] 4.1 Add `useEffect` with `setInterval(1000)` that decrements `timeRemaining` by 1 each second when field is active and timeRemaining > 0. Call `updateField()` each tick.
- [x] 4.2 When timeRemaining reaches 0: clear interval, set status to `'idle'`, set timeRemaining to `null`, add activity log "Hết thời gian tại [field name]", play success sound.
- [x] 4.3 Update display format from `00:XX` to proper `MM:SS` (e.g., 125 → "02:05").
- [x] 4.4 Cleanup: clear interval on unmount and when field changes to idle.

## 5. Idle Field Display Fix (`FieldsPage.jsx`)

- [x] 5.1 In field list rendering: if `field.status === 'idle'`, show "—" in sport column with neutral gray text instead of colored sport badge.
- [x] 5.2 If idle: set border-left to `border-outline-variant` (gray) instead of sport-specific color.
- [x] 5.3 If idle: set icon background to neutral gray instead of sport-colored background.
- [x] 5.4 Change "Trống" status text from `text-secondary` (green) to `text-outline` (gray).

## 6. Schedule Font Size Increase (`SchedulePage.jsx`)

- [x] 6.1 Increase Gantt block sport name from `text-[18px]` to `text-[20px]`.
- [x] 6.2 Increase Gantt block time text from `text-[14px]` to `text-[16px]`.
- [x] 6.3 Increase time header from `text-[16px]` to `text-[18px]`.
- [x] 6.4 Increase field name label from `text-[20px]` to `text-[22px]`.
- [x] 6.5 Add `overflow-hidden text-ellipsis whitespace-nowrap` to both text spans inside DraggableBooking so text truncates on narrow cards.
- [x] 6.6 Add a `title` attribute to the DraggableBooking container: `title="{sport} — {startTime} - {endTime}"` so full info is visible on hover for any card size.

## 7. Wire Audio Feedback

- [x] 7.1 Call `playSuccessSound()` in `AddScheduleModal.jsx` after successful schedule creation.
- [x] 7.2 Call `playSuccessSound()` in `FieldDetailPage.jsx` after "Tắt toàn bộ đèn" confirmation.
- [x] 7.3 Call `playSuccessSound()` in `EquipmentPage.jsx` on individual device connect/disconnect success.

## 8. Verification

- [ ] 8.1 Test connect-all flow: click → 5s spin → green success → auto-reset. Verify devices are connected.
- [ ] 8.2 Test countdown: navigate to an active field, watch timer tick down. Verify auto-idle at 0.
- [ ] 8.3 Test idle field display: verify no sport badge, gray borders, gray status text on idle fields.
- [ ] 8.4 Test audio: create a schedule, verify chime plays. Connect device, verify chime. Toggle lights, verify chime.
- [ ] 8.5 Test tooltips: hover over device icons and buttons, verify tooltips appear.
- [ ] 8.6 Test schedule font: compare Gantt block text size, confirm larger and readable.
- [ ] 8.7 Test short-duration card: create a 30-min schedule, verify text truncates and tooltip shows full info on hover.
