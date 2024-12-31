import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("YapTheme") || "dark",

  setTheme: (theme) => {
    localStorage.setItem("YapTheme", theme);
    set({ theme });
  },
}));
