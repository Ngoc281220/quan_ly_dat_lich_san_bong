import api from "../../config/api";

// Lấy danh sách bài viết 
export async function listPost() {
    return await api.get('/web/posts');
}

export async function detailPost(id) {
    return await api.get(`/web/posts/${id}'`);
}