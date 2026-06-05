import { createSlice } from '@reduxjs/toolkit';
import { fetchMatches, sendInterest } from './matchesThunk';

const initialState = {
  profiles: [],
  totalCount: 0,
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
  likedIds: {},
};

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    toggleLocalLike: (state, action) => {
      const { id } = action.payload;
      state.likedIds[id] = !state.likedIds[id];
      const profile = state.profiles.find((p) => p.id === id);
      if (profile) profile.liked = state.likedIds[id];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload.profiles ?? [];
        state.totalCount = action.payload.totalCount ?? 0;
        state.page = action.payload.pagination?.page ?? action.payload.page ?? 1;
        state.totalPages =
          action.payload.pagination?.totalPages ?? action.payload.totalPages ?? 1;
        action.payload.profiles.forEach((p) => {
          if (p.liked) state.likedIds[p.id] = true;
        });
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendInterest.fulfilled, (state, action) => {
        const { id, liked } = action.payload;
        state.likedIds[id] = liked;
      });
  },
});

export const { toggleLocalLike } = matchesSlice.actions;
export default matchesSlice.reducer;
