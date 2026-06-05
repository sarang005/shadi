import { createSlice } from '@reduxjs/toolkit';
import { fetchDashboard } from './dashboardThunk';

const initialState = {
  stats: [],
  todayMatches: [],
  activities: [],
  shortlist: [],
  compatFactors: [],
  profileStrength: 72,
  shortlistedToday: 3,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
