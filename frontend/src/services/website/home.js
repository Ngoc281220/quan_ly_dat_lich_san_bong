import api from "../../config/api";

export async function loadListField() {
    return await api.get('/web/home');
}