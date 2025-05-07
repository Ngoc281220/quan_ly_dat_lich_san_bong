import api from "../../config/api";

export async function loadListField() {
    return await api.get('/web/home');
}

export async function search(keyword) {
    return await api.get(`/web/search?search=${keyword}`);
}