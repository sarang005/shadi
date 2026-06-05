import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

export const saveProfile = createAsyncThunk(
  "profileRegistration/save",
  async (payload: any) => (await api.post("/profile", payload)).data,
);
