import { createSlice } from '@reduxjs/toolkit';
import { fetchProfile, saveProfileStep } from './profileThunk';

const initialState = {
  currentProfile: null,
  shortlisted: false,
  loading: false,
  saving: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    toggleShortlist: (state) => {
      state.shortlisted = !state.shortlisted;
    },
    clearProfile: (state) => {
      state.currentProfile = null;
      state.shortlisted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProfile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveProfileStep.pending, (state) => {
        state.saving = true;
      })
      .addCase(saveProfileStep.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(saveProfileStep.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      });
  },
});

export const { toggleShortlist, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
