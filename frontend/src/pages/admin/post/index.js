import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { getListPost, deletePostByID } from '../../../services/admin/post';
import { Pencil, Trash } from 'react-bootstrap-icons';
import Pagination from '../../../components/Pagination';
import { showToast } from '../../../components/common';

function PostList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const loadPosts = async (search, page) => {
    setLoading(true);
    try {
      const { data, pagination } = await getListPost(search, page);
      setPosts(data);
      setPagination(pagination);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sân:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn xóa bản ghi này không ?')) {
      try {
        await deletePostByID(id);
        setPosts(posts.filter((item) => item.id !== id)); // Cập nhật danh sách
        setTimeout(() => {
          showToast('Xóa bạn ghi thành công');
        }, 1000);
      } catch (error) {
        showToast('Có lỗi xảy ra', 'error');
      }
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
        <h2>Danh sách bài viết</h2>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Tiêu đề</th>
                <th>Tóm tắt</th>
                <th>Nội dung</th>
                <th>Ngày đăng</th>
                <th>Bình luận</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="text-center py-3 text-gray-500">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : posts.length > 0 ? (
                posts.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.excerpt}</td>
                    <td>{item.content}</td>
                    <td>{item.date}</td>
                    <td>{item.comments}</td>
                    <td>
                      <button
                      onClick={() => navigate(`/admin/posts/update/${item.id}`)}
                      className="btn btn-outline-warning btn-sm mx-1">
                        <Pencil />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-outline-danger btn-sm mx-1"
                      >
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-3 text-gray-500">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination pagination={pagination} onPageChange={setCurrentPage} />
      </div>
    </>
  );
}

export default PostList;
