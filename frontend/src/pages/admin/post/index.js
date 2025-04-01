import Button from "react-bootstrap/Button";
function PostList() {
    return (
        <>
            <div className="d-flex justify-content-end">
                <Button href="/admin/fields/create" variant="primary">
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
                            <th>Tên sân</th>
                            <th>Loại sân</th>
                            <th>Gía thuê</th>
                            <th>Mở sân</th>
                            <th>Đóng sân</th>
                            <th>Trạng thái</th>
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