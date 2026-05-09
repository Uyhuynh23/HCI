## 1. Data Model — Customer Fields

- [ ] 1.1 Add `customerName` and `customerPhone` optional string fields to the schedule object shape in `seedData.js` (populate a few seed schedules with sample customer data for testing)
- [ ] 1.2 Verify `AppContext.jsx` reducers (`ADD_SCHEDULE`, `UPDATE_SCHEDULE`) pass through the new fields without modification (no code change expected — confirm only)

## 2. Booking Modal — Customer Info Inputs

- [ ] 2.1 Add `customerName` and `customerPhone` state variables to `AddScheduleModal` with empty-string defaults
- [ ] 2.2 Add a "THÔNG TIN KHÁCH HÀNG" section in the modal body with two styled input fields ("Tên khách hàng" and "Số điện thoại") matching existing section styling (icon + input rows)
- [ ] 2.3 Include `customerName` and `customerPhone` in the `newSchedule` object built inside `handleConfirm`
- [ ] 2.4 Update the `addActivity` message to include the customer name when provided
- [ ] 2.5 Reset `customerName` and `customerPhone` to empty strings in the `useEffect` that fires on modal open

## 3. Safe Court Interaction — Long-press Gesture

- [ ] 3.1 Create a `useLongPress` custom hook in `src/hooks/useLongPress.js` that returns pointer event handlers and an `isPressed` boolean. Configurable threshold (default 400 ms) and move-cancel distance (default 10 px)
- [ ] 3.2 In `FieldsPage`, replace the direct `onClick={() => navigate(...)}` on court cards with the `useLongPress` hook for active courts, keeping instant `onClick` for idle courts
- [ ] 3.3 Add a radial progress-ring overlay (CSS animation, 400 ms) that appears on the court card during long-press and disappears on release/cancel
- [ ] 3.4 Ensure the "Quản lý" button retains its own `onClick` with `e.stopPropagation()` so it bypasses the long-press guard
- [ ] 3.5 Add a one-time tooltip/snackbar hint on first interaction: "Nhấn giữ để mở chi tiết sân đang hoạt động"

## 4. Schedule Condensed View

- [ ] 4.1 Add a `isCondensed` boolean state to `SchedulePage` (default `false`)
- [ ] 4.2 Add a "Thu gọn" toggle button in the filter bar with a `zoom_out_map` / `zoom_in_map` icon that toggles `isCondensed`
- [ ] 4.3 Define condensed-mode CSS variables / constants: `CONDENSED_START_HOUR = 5`, `CONDENSED_END_HOUR = 23`, condensed row height `56px`, remove `min-w-[1400px]` constraint
- [ ] 4.4 Conditionally apply condensed values to the Gantt time header generation, `timeToPercent`, `durationPercent`, and `DraggableBooking` calculations when `isCondensed` is true
- [ ] 4.5 Adjust booking block rendering in condensed mode: smaller font, truncated text with `text-ellipsis`, show full details on hover via `title` attribute or custom tooltip
- [ ] 4.6 Verify "now" marker position recalculates correctly with the extended time range
- [ ] 4.7 Ensure drag-and-drop works correctly in condensed mode by passing the active `containerWidth` and time constants to `DraggableBooking`

## 5. Verification & Polish

- [ ] 5.1 Manual test: create a booking with and without customer info — confirm data persists and displays in activity log
- [ ] 5.2 Manual test: scroll the FieldsPage court list rapidly — confirm no accidental navigation occurs on active courts
- [ ] 5.3 Manual test: toggle condensed view — confirm all 5 courts and full 05–23 timeline visible without scroll
- [ ] 5.4 Manual test: drag a booking in condensed view — confirm snap behavior and overlap check still function
- [ ] 5.5 Review backward compatibility: clear localStorage, reload — confirm seed data + new fields coexist without errors
