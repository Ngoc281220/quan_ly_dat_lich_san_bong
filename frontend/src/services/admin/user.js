import api from "../../config/api";

export async function getAllUser() {
    return await api.get('admin/users');
}

export async function deleteUser(id) {
    return await api.post(`admin/users/delete/${id}`);
}