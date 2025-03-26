import api from "../../config/api";

export async function getAllUser() {
    return await api.get('admin/users');
}