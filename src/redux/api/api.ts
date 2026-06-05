import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.yourdomain.com",
  headers: {
    "Content-Type": "application/json",
  },
});
