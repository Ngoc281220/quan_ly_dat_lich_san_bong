import api from "../../config/api";

export async function getListCategory() {
  return await api.get("admin/fields/list-category");
}

export async function createField(params) {
  
}
