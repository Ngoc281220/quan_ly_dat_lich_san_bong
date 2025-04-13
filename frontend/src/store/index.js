import { create } from "zustand";

// Hàm tiện ích để đọc cookie
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

// Hàm tiện ích để đặt cookie
const setCookie = (name, value, days = 1) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString(); // 864e5 = 1 day
  document.cookie = `${name}=${value}; path=/; expires=${expires}`;
};

// Hàm tiện ích để xóa cookie
const removeCookie = (name) => {
  document.cookie = `${name}=; path=/; max-age=0`;
};

const useAuthStore = create((set) => ({
  user: JSON.parse(getCookie("user") || "null"),
  token: getCookie("accessToken") || null,
  loading: true,

  setUser: (user, token) => {
    setCookie("user", JSON.stringify(user), 1); // lưu 1 ngày
    setCookie("accessToken", token, 1);
    set({ user, token });
  },

  setLoading: (value) => set({ loading: value }),

  logout: () => {
    removeCookie("user");
    removeCookie("accessToken");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
