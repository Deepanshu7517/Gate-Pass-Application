// slices/index.ts (Updated Store Configuration)

import { configureStore } from "@reduxjs/toolkit";
import checkinReducer from "./slices/checkinSlice";
// 1. Import the NDA Agreement Reducer
import ndaAgreementReducer from "./slices/ndaAgreementSlice";
import type { CheckinState } from "../types";

// Load state from localStorage (NOTE: This logic only handles 'checkin' state currently)
const loadState = (): CheckinState | undefined => {
  try {
    const serializedState = localStorage.getItem("checkin-state");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Failed to load state from localStorage", error);
    return undefined;
  }
};

// Save state to localStorage (NOTE: This logic only handles 'checkin' state currently)
const saveState = (state: CheckinState) => {
  try {
    localStorage.setItem("checkin-state", JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save state to localStorage", error);
  }
};

// Load initial state
const loadedState = loadState();

// Create store
export const store = configureStore({
  // 2. Add the ndaAgreementReducer to the store's reducer object
  reducer: {
    checkin: checkinReducer,
    ndaAgreement: ndaAgreementReducer, // <--- This line was missing!
  },
  // Keep preloadedState logic as is (it currently only handles 'checkin')
  preloadedState: loadedState ? { checkin: loadedState } : undefined,
});

// Subscribe to store changes and save to localStorage
// NOTE: This subscription currently only saves the 'checkin' part of the state.
store.subscribe(() => {
  const state = store.getState().checkin;
  saveState(state);
  // If you also need to persist the NDA state, you'd need to update saveState and
  // loadState to handle both slices.
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;