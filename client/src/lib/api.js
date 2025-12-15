import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const api = axios.create({
  baseURL: "http://localhost:3340/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
