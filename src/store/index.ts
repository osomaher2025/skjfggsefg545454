
import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './slices/jobsSlice';
import notificationsReducer from './slices/notificationsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    notifications: notificationsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
