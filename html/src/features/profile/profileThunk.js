import { createAsyncThunk } from '@reduxjs/toolkit';
import { getApiErrorMessage } from '@/utils/apiUtils';
import * as profileService from './profileService';

const useMockAuth = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

export const fetchProfile = createAsyncThunk(
  'profile/fetch',
  async (id, { rejectWithValue }) => {
    try {
      return await profileService.fetchProfileById(id);
    } catch (error) {
      if (useMockAuth && !error.response) {
        return await profileService.getMockProfile(id);
      }
      return rejectWithValue(getApiErrorMessage(error, 'Failed to load profile.'));
    }
  }
);

export const saveProfileStep = createAsyncThunk(
  'profile/save',
  async (payload, { rejectWithValue }) => {
    try {
      return await profileService.updateProfile(payload);
    } catch (error) {
      if (useMockAuth && !error.response) return payload;
      return rejectWithValue(getApiErrorMessage(error, 'Failed to save profile.'));
    }
  }
);
