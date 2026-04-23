## Context

The Kinetic Grid prototype is a React 19 + Vite + Tailwind v4 sports facility management app with 5 active pages (Home, Fields, FieldDetail, Equipment, Schedule) and 4 modal/dialog components. The UI is fully polished but entirely static — all data is hardcoded in JSX, ~25 buttons have no handlers, and the AddScheduleModal (used in 3 pages) discards all user input on submit. No shared state or persistence layer exists.

The app uses `react-router-dom` for routing with a sidebar layout. Pages are independent — they share no state. The `date-fns` library is already installed for date formatting.

## Goals / Non-Goals

**Goals:**
- Create a single shared data layer (React Context + localStorage) that all pages read/write
- Seed realistic initial data on first load so the app feels populated immediately
- Wire every existing button, filter, and form so evaluators can navigate the full flow without dead ends
- Preserve the existing visual design exactly — no layout or styling changes
- Make AddScheduleModal persist data that appears across Fields, FieldDetail, and Schedule pages

**Non-Goals:**
- Backend/API integration — this is client-side only
- User authentication or multi-user support
- Real-time sensor/IoT data — mocked values are sufficient
- Mobile responsiveness improvements
- Refactoring the existing component structure significantly
- Building a full Settings page — a minimal placeholder with 1-2 interactive elements is sufficient

## Decisions

### 1. React Context + localStorage over Redux/Zustand

**Decision:** Use a single `AppContext` with `useReducer` for state management, syncing to `localStorage` on every dispatch.

**Alternatives considered:**
- **Redux Toolkit**: Overkill for a prototype with 4 entities and no async operations
- **Zustand**: Lower boilerplate than Redux but adds a new dependency. React Context is zero-dependency and sufficient for this scope.
- **Component-level state only**: Would require prop drilling or duplicating data across pages — breaks the consistency requirement.

**Rationale:** Context + useReducer gives us centralized, predictable state with zero new dependencies. The sync-to-localStorage pattern is a one-liner in the reducer wrapper.

### 2. Data Model: Flat arrays with IDs

**Decision:** Store four top-level arrays in context: `fields[]`, `schedules[]`, `equipment[]`, `activities[]`. Each entity has a string `id`. No relational foreign keys — use matching values (e.g., schedule.fieldId matches field.id).

**Rationale:** Simple, debuggable, serializable to localStorage. A flat model avoids nested update complexity. For ~20-50 records total, array scans are instant.

**Data shapes:**
```
field:     { id, name, sport, status('active'|'idle'), zone, timeRemaining }
schedule:  { id, fieldId, sport, date, startTime, endTime, status('ongoing'|'upcoming'|'completed') }
equipment: { id, fieldName, connectionStatus('connected'|'connecting'|'searching'|'disconnected') }
activity:  { id, message, time, type('info'|'warning') }
```

### 3. Seed data loaded once via localStorage check

**Decision:** On app mount, check `localStorage.getItem('kinetic-grid-data')`. If null, write seed data. If exists, parse and use it. Every state change writes back immediately.

**Alternatives considered:**
- **Always reset on reload**: Loses any user actions — bad for prototype testing
- **Import/export buttons**: Extra UI work, not needed for HCI eval

### 4. Single context provider wrapping all routes

**Decision:** Wrap `<BrowserRouter>` children with `<AppProvider>` in `App.jsx`. Every page and component accesses data via `useApp()` hook.

### 5. FieldDetailPage reads `:id` param dynamically

**Decision:** Use `useParams()` to get `:id`, then look up the field from context. The page renders dynamically based on the field data and its related schedules.

**Rationale:** Currently hardcoded to "Sân 2". Making it param-driven is trivial and enables all 4+ "Quản lý" buttons to work correctly.

### 6. Filter state is local per page, not persisted

**Decision:** Sport filter, status filter, and search remain as `useState` within FieldsPage. They filter the context's `fields[]` array in render. Not persisted to localStorage.

**Rationale:** Filter state is UI-ephemeral — persisting it would create confusing UX where users return to a filtered view they forgot they set.

## Risks / Trade-offs

- **localStorage has a ~5MB limit** → Not a risk at this scale (~5KB of data). No mitigation needed.
- **No data validation** → User could enter conflicting times in AddScheduleModal. Mitigation: basic client-side checks (end > start) before saving. No need for comprehensive validation in a prototype.
- **Single-tab only** → If user opens two tabs, they'll diverge. Mitigation: acceptable for HCI eval — not a real production constraint.
- **Seed data may look stale** → Dates in seed data will be static (e.g., "today"). Mitigation: use `new Date()` in seed generation so dates are always relative to current day.
- **No undo/redo** → Destructive actions (disconnect, turn off lights) are final. Mitigation: modal confirmations already exist for dangerous actions, which is sufficient.
