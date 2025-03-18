import api from "../../config/api";
import axios from "axios";

export async function getListCategory() {
  return await api.get("admin/fields/list-category");
}

export async function createField(params) {
  
  return axios.post("http://127.0.0.1:8000/api/admin/fields/create", params, {
    headers: {
      "Content-Type": "multipart/form-data", // XÓA "application/json"
    },
  });
  // return await api.post("admin/fields/create", params);
}
