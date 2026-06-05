import { createAsyncThunk } from '@reduxjs/toolkit';
import { getApiErrorMessage } from '@/utils/apiUtils';
import * as dashboardService from './dashboardService';

const useMockAuth = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

export const fetchDashboard = createAsyncThunk(
  'dashboard/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.fetchDashboardData();
    } catch (error) {
      if (useMockAuth && !error.response) {
        return await dashboardService.getMockDashboardData();
      }
      return rejectWithValue(getApiErrorMessage(error, 'Failed to load dashboard.'));
    }
  }
);
