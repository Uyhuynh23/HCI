import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { generateSeedData } from './seedData';

const STORAGE_KEY = 'kinetic-grid-data';

const AppContext = createContext(null);

// Action types
const ACTIONS = {
  SET_STATE: 'SET_STATE',
  ADD_SCHEDULE: 'ADD_SCHEDULE',
  UPDATE_SCHEDULE: 'UPDATE_SCHEDULE',
  DELETE_SCHEDULE: 'DELETE_SCHEDULE',
  UPDATE_FIELD: 'UPDATE_FIELD',
  UPDATE_EQUIPMENT: 'UPDATE_EQUIPMENT',
  BATCH_UPDATE_EQUIPMENT: 'BATCH_UPDATE_EQUIPMENT',
  ADD_ACTIVITY: 'ADD_ACTIVITY',
};

function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_STATE:
      return { ...state, ...action.payload };

    case ACTIONS.ADD_SCHEDULE:
      return {
        ...state,
        schedules: [...state.schedules, action.payload],
      };

    case ACTIONS.UPDATE_SCHEDULE:
      return {
        ...state,
        schedules: state.schedules.map((s) =>
          s.id === action.payload.id ? { ...s, ...action.payload.changes } : s
        ),
      };

    case ACTIONS.DELETE_SCHEDULE:
      return {
        ...state,
        schedules: state.schedules.filter((s) => s.id !== action.payload),
      };

    case ACTIONS.UPDATE_FIELD:
      return {
        ...state,
        fields: state.fields.map((f) =>
          f.id === action.payload.id ? { ...f, ...action.payload.changes } : f
        ),
      };

    case ACTIONS.UPDATE_EQUIPMENT:
      return {
        ...state,
        equipment: state.equipment.map((e) =>
          e.id === action.payload.id ? { ...e, ...action.payload.changes } : e
        ),
      };

    case ACTIONS.BATCH_UPDATE_EQUIPMENT:
      return {
        ...state,
        equipment: state.equipment.map((e) => ({
          ...e,
          ...action.payload.changes,
        })),
      };

    case ACTIONS.ADD_ACTIVITY:
      return {
        ...state,
        activities: [action.payload, ...state.activities],
      };

    default:
      return state;
  }
}

function loadState() {
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    if (json) {
      return JSON.parse(json);
    }
  } catch (e) {
    console.warn('Failed to load state from localStorage:', e);
  }
  return null;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save state to localStorage:', e);
  }
}

const initialState = {
  fields: [],
  schedules: [],
  equipment: [],
  activities: [],
};

export function AppProvider({ children }) {
  const saved = loadState();
  const seed = saved || generateSeedData();

  const [state, dispatch] = useReducer(appReducer, { ...initialState, ...seed });

  // Sync to localStorage on every state change
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Write seed data on first launch
  useEffect(() => {
    if (!saved) {
      saveState(seed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actions = {
    addSchedule: (schedule) => {
      dispatch({ type: ACTIONS.ADD_SCHEDULE, payload: schedule });
    },
    updateSchedule: (id, changes) => {
      dispatch({ type: ACTIONS.UPDATE_SCHEDULE, payload: { id, changes } });
    },
    deleteSchedule: (id) => {
      dispatch({ type: ACTIONS.DELETE_SCHEDULE, payload: id });
    },
    updateField: (id, changes) => {
      dispatch({ type: ACTIONS.UPDATE_FIELD, payload: { id, changes } });
    },
    updateEquipment: (id, changes) => {
      dispatch({ type: ACTIONS.UPDATE_EQUIPMENT, payload: { id, changes } });
    },
    batchUpdateEquipment: (changes) => {
      dispatch({ type: ACTIONS.BATCH_UPDATE_EQUIPMENT, payload: { changes } });
    },
    addActivity: (activity) => {
      dispatch({
        type: ACTIONS.ADD_ACTIVITY,
        payload: {
          id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          time: new Date().toISOString(),
          ...activity,
        },
      });
    },
  };

  return (
    <AppContext.Provider value={{ ...state, ...actions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
