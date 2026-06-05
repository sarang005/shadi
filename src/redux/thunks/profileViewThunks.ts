import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

export const fetchProfile = createAsyncThunk(
  "profileView/fetch",
  async (id: string) => (await api.get(`/profile/${id}`)).data,
);
