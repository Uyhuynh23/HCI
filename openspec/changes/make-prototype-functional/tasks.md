## 1. Data Layer Foundation

- [ ] 1.1 Create `src/context/AppContext.jsx` with React Context, useReducer, and localStorage sync. Define data shapes for fields, schedules, equipment, and activities. Export `AppProvider` and `useApp()` hook.
- [ ] 1.2 Create seed data generation function in `src/context/seedData.js` — generate 4-6 fields (mixed sports/statuses), 5+ schedules (relative to today), 5 equipment entries (varied connection states), 3+ activity entries (relative times).
- [ ] 1.3 Wrap routes with `<AppProvider>` in `App.jsx`, loading from localStorage or seeding on first mount.

## 2. HomePage — Live Dashboard

- [ ] 2.1 Refactor `HomePage.jsx` to consume `useApp()` — compute active field count, total fields, and warning count from context data.
- [ ] 2.2 Render the recent activity list from `activities[]` array (latest 5, sorted by time desc), with correct icons and timestamps.
- [ ] 2.3 Add notification bell badge dot based on equipment warning count.

## 3. FieldsPage — Filters & Navigation

- [ ] 3.1 Refactor `FieldsPage.jsx` to render field list from `fields[]` context data instead of hardcoded JSX. Each row dynamically shows name, sport badge, status, time remaining.
- [ ] 3.2 Wire search input to filter fields by name (case-insensitive, real-time).
- [ ] 3.3 Wire sport filter chips with toggle state — active chip filters field list by sport. "Tất cả" shows all.
- [ ] 3.4 Wire status filter chips with toggle state — active chip filters field list by status ("Hoạt động" → active, "Trống" → idle).
- [ ] 3.5 Make all "Quản lý" buttons navigate to `/fields/:id` using each field's ID.

## 4. FieldDetailPage — Dynamic & Interactive

- [ ] 4.1 Refactor `FieldDetailPage.jsx` to read `:id` from `useParams()`, look up field from context, and render all content dynamically (title, status card, sport icon/color).
- [ ] 4.2 Show today's schedules for this field from context's `schedules[]`, filtered by fieldId and today's date, sorted by startTime.
- [ ] 4.3 Wire quick-control sport buttons to call `updateField(id, { sport })` — update status card immediately.
- [ ] 4.4 Wire "Tắt toàn bộ đèn" confirm button to call `updateField(id, { status: 'idle', timeRemaining: null })` and add activity log entry.
- [ ] 4.5 Handle field-not-found case with a friendly message and back button.

## 5. EquipmentPage — Device Interactions

- [ ] 5.1 Refactor `EquipmentPage.jsx` to render device list from `equipment[]` context data. Style each card based on connectionStatus.
- [ ] 5.2 Wire "Ngắt" buttons to open disconnect modal with the correct device name/info.
- [ ] 5.3 Wire disconnect modal confirm to call `updateEquipment(id, { connectionStatus: 'disconnected' })` and log activity.
- [ ] 5.4 Wire "Hủy" buttons on connecting/searching devices to set status to "disconnected".
- [ ] 5.5 Wire "Kết nối tất cả" button to batch-update all equipment to "connected".
- [ ] 5.6 Update device count label to show actual count from equipment data.

## 6. SchedulePage — Data-Driven Gantt

- [ ] 6.1 Refactor `SchedulePage.jsx` to render Gantt rows from `fields[]` and booking blocks from `schedules[]` (filtered by date). Calculate block positions from start/end times relative to 08:00-19:00 axis.
- [ ] 6.2 Position "BÂY GIỜ" marker based on current time using `new Date()`.
- [ ] 6.3 Compute bottom stats from schedule data — usage percentage and 24h booking count.
- [ ] 6.4 Wire filter buttons (date, court, sport) with local state to filter displayed Gantt data.

## 7. AddScheduleModal — Save & Persist

- [ ] 7.1 Refactor `AddScheduleModal.jsx` to accept a `useApp()` context reference. On "XÁC NHẬN", call `addSchedule()` with the form data (date, fieldId, sport, startTime, endTime) and `addActivity()` for the log entry.
- [ ] 7.2 Update all 3 usage sites (FieldsPage, FieldDetailPage, SchedulePage) to pass context-aware callbacks.

## 8. Verification

- [ ] 8.1 Launch dev server, navigate through all 5 main pages, verify no dead buttons remain.
- [ ] 8.2 Create a schedule via AddScheduleModal, verify it appears on SchedulePage Gantt, FieldDetailPage schedule list, and HomePage activity log.
- [ ] 8.3 Toggle equipment connections, verify state persists across page navigation.
- [ ] 8.4 Reload the browser, verify all data persists from localStorage.
- [ ] 8.5 Clear localStorage, reload, verify seed data populates correctly.
