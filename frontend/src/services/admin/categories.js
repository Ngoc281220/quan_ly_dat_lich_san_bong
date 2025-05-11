import api from "../../config/api";

export async function loadCategory() {
    return await api.get('admin/categories');
}

export async function createCategory(params) {
    return await api.post('admin/categories/create', params);
}

