import api from "../../config/api";
import axios from "axios";

export async function createPost(params) {
    return axios.post("http://127.0.0.1:8000/api/admin/posts/create", params, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
    });
}

export async function getListPost(search, page = 1) {
  return await api.get(`/admin/posts?search=${search}&page=${page}`);
}

export async function deletePostByID(id) {
  return await api.get(`/admin/posts/delete/${id}`);
}

export async function getPostByID(id) {
  return await api.get(`/admin/posts/${id}`);
}

export async function updatePostByID(id, params) {
  return await api.post(`/admin/posts/update/${id}`, params);
}