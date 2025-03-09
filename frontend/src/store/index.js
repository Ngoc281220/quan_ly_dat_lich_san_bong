import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  token: sessionStorage.getItem("accessToken") || null,
  loading: true,
  setUser: (user, token) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("accessToken", token);
    set({ user, token });
  },
  setLoading: (value) => set({ isLoading: value }),
  logout: () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
