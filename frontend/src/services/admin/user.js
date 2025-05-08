import api from '../../config/api';

export async function getAllUser() {
  return await api.get('admin/users');
}

export async function deleteUser(id) {
  return await api.post(`admin/users/delete/${id}`);
}

export async function getUserById(id) {
  return await api.get(`admin/users/${id}`);
}

export async function updateUserByID(id, params) {
  return await api.post(`/admin/users/update/${id}`, params);
}

export async function detail(id) {
    return await api.get(`admin/users/detail/${id}`);
  }
