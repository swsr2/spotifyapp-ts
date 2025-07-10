import axios from "axios";
import { SPOTIFY_API_URL } from "../configs/commonConfig";

const api = axios.create({
  baseURL: SPOTIFY_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

export default api;
