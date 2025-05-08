import api from "../../config/api";
import axios from "axios";

export async function getListCategory() {
  return await api.get("admin/fields/list-category");
}

export async function createField(params) {
  
  return axios.post("http://127.0.0.1:8000/api/admin/fields/create", params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

}

export async function getListField(page) {
  return await api.get(`admin/fields?page=${page}`);
}

export async function detaiField(id) {
  return await api.get(`admin/fields/${id}`);
}

export async function deleteField(id) {
  return await api.post(`admin/fields/delete/${id}`);
}

export async function getFieldById(id) {
  return await api.get(`admin/fields/detail/${id}`);
}

export async function updateField(id, params) {
  return await api.post(`admin/fields/update/${id}`, params);
}
