import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetch",
  async () => (await api.get("/dashboard")).data,
);

export const fetchActivity = createAsyncThunk(
  "dashboard/fetchActivity",
  async () => (await api.get("/activity")).data,
);
