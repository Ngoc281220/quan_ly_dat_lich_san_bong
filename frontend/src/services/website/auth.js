import api from "../../config/api";

export async function register(params) {
  return await api.post("/auth/register", params);
}

export async function verify(token) {
    return await api.get(`/auth/verify?token=${token}`);
}

export async function login(params) {
  return await api.post("/auth/login", params);
}
