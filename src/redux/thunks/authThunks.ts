import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);
