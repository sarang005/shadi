import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import dashboardReducer from '@/features/dashboard/dashboardSlice';
import matchesReducer from '@/features/matches/matchesSlice';
import profileReducer from '@/features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    matches: matchesReducer,
    profile: profileReducer,
  },
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
