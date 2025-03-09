import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

class API {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // ✅ Thêm token vào mỗi request nếu có
    this.api.interceptors.request.use(
      (config) => {
        const token = sessionStorage.getItem("accessToken");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ✅ Xử lý refresh token khi accessToken hết hạn
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            try {
              const res = await axios.post(`${API_URL}/auth/refresh-token`, {
                refreshToken,
              });
              sessionStorage.setItem("accessToken", res.data.accessToken);

              // Gán token mới vào header và gửi lại request
              originalRequest.headers["Authorization"] =
                "Bearer " + res.data.accessToken;
              return this.api(originalRequest);
            } catch (err) {
              console.error("Refresh token failed", err);
              return Promise.reject(err);
            }
          }
        }
        return Promise.reject(error);
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
