import axios from "axios";
import useAuthStore from "../store";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

class API {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true, // 👈 Cho phép gửi cookie kèm request
    });

    // ❌ Không cần interceptor để gắn Authorization header nữa
    // Vì cookie sẽ tự được browser gửi
    this.api.interceptors.request.use(
      (config) => {
        let token  = getCookie('accessToken');
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            await axios.post(`${API_URL}/auth/refresh-token`, null, {
              withCredentials: true, // 👈 Cho phép gửi cookie trong refresh request
            });

            // Không cần set token lại → cookie mới đã được gửi về
            return this.api(originalRequest);
          } catch (err) {
            console.error("Refresh token failed", err);
            return Promise.reject(err);
          }
        }

        if (error.response.status === 422 || error.response.status === 400) {
          return Promise.reject({
            errors: error.response.data.errors || "Dữ liệu không hợp lệ",
          });
        }

        return Promise.reject({
          message: "Có lỗi xảy ra, vui lòng thử lại.",
        });
      }
    );
  }

  get(endpoint, params = {}) {
    return this.api.get(endpoint, { params });
  }

  post(endpoint, params) {
    return this.api.post(endpoint, params);
  }

  put(endpoint, params) {
    return this.api.put(endpoint, params);
  }

  delete(endpoint) {
    return this.api.delete(endpoint);
  }
}

const api = new API();
export default api;
