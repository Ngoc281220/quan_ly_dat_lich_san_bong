import api from "../../config/api";

export async function loadListField() {
    return await api.get('/web/home');
}

export async function search(keyword) {
    return await api.get(`/web/search?search=${keyword}`);
}

export async function searchCategory(keyword) {
    return await api.get(`/web/search-category?search=${keyword}`);
}