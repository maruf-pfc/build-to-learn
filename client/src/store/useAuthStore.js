import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/api";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const { data } = await api.post("/auth/login", { email, password });
          set({
            user: data.user,
            isAuthenticated: true,
          });
          return data;
        } catch (error) {
          throw error.response?.data?.message || "Login failed";
        }
      },

      register: async (userData) => {
        try {
          const { data } = await api.post("/auth/register", userData);
          set({
            user: data.user,
            isAuthenticated: true,
          });
          return data;
        } catch (error) {
          throw error.response?.data?.message || "Registration failed";
        }
      },

      checkAuth: async () => {
        try {
          const { data } = await api.get("/auth/me");
          set({ user: data, isAuthenticated: true });
        } catch (error) {
          set({ user: null, isAuthenticated: false });
        }
      },

      logout: async () => {
        try {
          await api.post("/auth/logout");
          set({ user: null, isAuthenticated: false });
        } catch (error) {
          console.error("Logout failed", error);
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
