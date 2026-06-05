import { createAsyncThunk } from '@reduxjs/toolkit';
import { getApiErrorMessage } from '@/utils/apiUtils';
import * as matchesService from './matchesService';

const useMockAuth = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

export const fetchMatches = createAsyncThunk(
  'matches/fetch',
  async (params, { rejectWithValue }) => {
    try {
      return await matchesService.fetchMatches(params);
    } catch (error) {
      if (useMockAuth && !error.response) {
        return await matchesService.getMockMatches();
      }
      return rejectWithValue(getApiErrorMessage(error, 'Failed to load matches.'));
    }
  }
);

export const sendInterest = createAsyncThunk(
  'matches/interest',
  async ({ id, liked }, { rejectWithValue }) => {
    try {
      return await matchesService.toggleLike(id, liked);
    } catch (error) {
      if (useMockAuth && !error.response) return { id, liked };
      return rejectWithValue(getApiErrorMessage(error));
    }
  }
);
