import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios";

export const useChartStore = create((set, get) => ({
  messages: [],
  users: [],
  isUsersLoading: true,
  isMessagesLoading: false,
  selectedUser: null,
  onlineUsers: [],

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const { data } = await axiosInstance.get("/messages/users");
      set({ users: data });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const { data } = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: data });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  },
  setSelectedUser: (user) => set({ selectedUser: user }),
}));
