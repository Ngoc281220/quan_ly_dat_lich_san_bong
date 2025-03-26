import api from "../../config/api";

export async function loadCategory() {
    return await api.get('/load-category');
}