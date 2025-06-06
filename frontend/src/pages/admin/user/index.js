import { useEffect, useState } from 'react';
import { getAllUser, deleteUser } from '../../../services/admin/user';
import { Eye, Pencil, Trash } from 'react-bootstrap-icons';
import Pagination from '../../../components/Pagination';
import { showToast } from '../../../components/common';
import { useNavigate } from 'react-router-dom';

function ListUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const { data, pagination } = await getAllUser(currentPage);
      setUsers(data);
      setPagination(pagination);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn xóa bản ghi này không ?')) {
      try {
        await deleteUser(id);
        setUsers(users.filter((item) => item.id !== id)); // Cập nhật danh sách
        setTimeout(() => {
          showToast('Xóa bạn ghi thành công');
        }, 1000);
      } catch (error) {
        showToast('Có lỗi xảy ra', 'error');
        console.error('Erorr', error);
      }
    }
  };

  const handlePageChange = async (page) => {
    const { data, pagination } = await getAllUser(page);
    setUsers(data);
    setPagination(pagination);
  };
  return (
    <>
      <div>
        <div className="data-table-container">
          <h2>Danh sách người dùng</h2>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên</th>
                  <th>email</th>
                  <th>Phone</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" className="text-center py-3 text-gray-500">
                      Đang tải dữ liệu...
                    </td>
                  </tr>
                ) : users.length > 0 ? (
                  users.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        <button
                          onClick={() =>
                            navigate(`/admin/user/detail/${item.id}`)
                          }
                          className="btn btn-outline-primary btn-sm mx-1"
                          size="sm"
                        >
                          <Eye />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/admin/user/update/${item.id}`)
                          }
                          className="btn btn-outline-warning btn-sm mx-1"
                        >
                          <Pencil />
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm mx-1"
                          onClick={() => handleDelete(item.id)}
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
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
      </div>
    </>
  );
}

export default ListUser;
