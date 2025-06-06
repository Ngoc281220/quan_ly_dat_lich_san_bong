import api from "../../config/api";

export async function loadCategory(page) {
    return await api.get(`admin/categories?page=${page}`);
}

export async function createCategory(params) {
    return await api.post('admin/categories/create', params);
}

export async function findCategory(id) {
    return await api.get(`admin/categories/find/${id}`);
}

export async function updateCategoryById(params, id) {
    return await api.post(`admin/categories/update/${id}`, params);
}

