import Button from "react-bootstrap/Button";
function PostList() {
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