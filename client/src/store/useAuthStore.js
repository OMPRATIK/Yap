import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isUpdatingProfile: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (err) {
      console.log("Error is checking auth : ", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (formData) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", formData);
      console.log(res);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
    } catch (err) {
      toast.error(err.response.data.msg);
      console.log("Error in signup : ", err);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (formData) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data });
      toast.success("Logged in successfully!");
    } catch (err) {
      console.log("Error in login : ", err);
      toast.error(err.response.data.msg);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (err) {
      console.log("Error in logout : ", err);
      toast(err.response.data.msg);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.log("Error in updating profile : ", err);
      toast.error(err.response.data.msg);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
