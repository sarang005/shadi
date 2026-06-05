import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile } from "../thunks/profileViewThunks";

const profileViewSlice = createSlice({
  name: "profileView",
  initialState: {
    profile: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      });
  },
});

export default profileViewSlice.reducer;
