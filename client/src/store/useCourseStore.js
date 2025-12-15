import { create } from "zustand";
import api from "@/lib/api";

export const useCourseStore = create((set) => ({
  courses: [],
  isLoading: false,
  error: null,

  fetchCourses: async (params = {}) => {
    set({ isLoading: true });
    try {
      const queryString = new URLSearchParams(params).toString();
      const { data } = await api.get(`/courses?${queryString}`);
      set({ courses: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  enrollCourse: async (courseId) => {
    try {
      await api.post(`/courses/${courseId}/enroll`);
      return true;
    } catch (error) {
      throw error.response?.data?.message || "Enrollment failed";
    }
  },
}));
