import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboard } from "../thunks/dashboardThunks";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: null,
    todayMatches: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.todayMatches = action.payload.matches;
      })
      .addCase(fetchDashboard.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default dashboardSlice.reducer;
