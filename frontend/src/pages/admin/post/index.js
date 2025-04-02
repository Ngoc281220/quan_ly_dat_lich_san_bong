import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { getListPost } from "../../../services/admin/post";

function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const loadPosts = async (search, page) => {
        setLoading(true);
        try {
            const { data, pagination } = await getListPost(page);
            setPosts(data);
            setPagination(pagination);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sân:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts(search, currentPage);
    }, [search, currentPage]);
    return (
        <>
            <div className="d-flex justify-content-end">
                <Button href="/admin/posts/create" variant="primary">
                Thêm bài viết
                </Button>
            </div>
            <div className="data-table-container">
                <h2>Danh sách sân</h2>
                <div className="table-wrapper">
                    <table className="data-table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Tiêu đề</th>
                            <th>Hình ảnh</th>
                            <th>Tóm tắt</th>
                            <th>Nội dung</th>
                            <th>Ngày đăng</th>
                            <th>Bình luận</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </>
    )
}

export default PostList;