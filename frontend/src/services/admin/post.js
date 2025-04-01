import api from "../../config/api";
import axios from "axios";

export async function createPost(params) {
    return axios.post("http://127.0.0.1:8000/api/admin/posts/create", params, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
    });
}