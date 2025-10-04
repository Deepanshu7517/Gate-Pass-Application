import { configureStore } from "@reduxjs/toolkit";
import checkinReducer from "./slices/checkinSlice";
import type { CheckinState } from "../types";

// Load state from localStorage
const loadState = (): CheckinState | undefined => {
  try {
    const serializedState = localStorage.getItem("checkin-state");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Failed to load state from localStorage", error);
    return undefined;
  }
};

// Save state to localStorage
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
  reducer: {
    checkin: checkinReducer,
  },
  preloadedState: loadedState ? { checkin: loadedState } : undefined,
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  const state = store.getState().checkin;
  saveState(state);
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;