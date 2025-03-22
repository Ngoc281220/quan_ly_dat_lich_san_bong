import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message, type = "success") => {
  // "⚠️ Cảnh báo!", "warning"
  // "🚀 Thành công rồi!", "success"
  // "❌ Có lỗi xảy ra!", "error"
  toast[type](message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const formatCurrencyVND = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export const formatTime = (time) => {
  return time.split(":").slice(0, 2).join(":");
}
