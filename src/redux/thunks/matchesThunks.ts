import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

export const fetchMatches = createAsyncThunk(
  "matches/fetch",
  async () => (await api.get("/matches")).data,
);
