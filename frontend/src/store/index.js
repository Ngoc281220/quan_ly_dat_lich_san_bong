import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("accessToken") || null,
  loading: true,
  setUser: (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", token);
    set({ user, token });
  },
  setLoading: (value) => set({ isLoading: value }),
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
