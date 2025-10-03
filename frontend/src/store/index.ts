import { configureStore } from '@reduxjs/toolkit';
import checkinReducer from './slices/checkinSlice';

export const store = configureStore({
  reducer: {
    checkin: checkinReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;