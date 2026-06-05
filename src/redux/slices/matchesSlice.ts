import { createSlice } from "@reduxjs/toolkit";
import { fetchMatches } from "../thunks/matchesThunks";

const matchesSlice = createSlice({
  name: "matches",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });
  },
});

export default matchesSlice.reducer;
