import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";
import { getListField, deleteField } from "../../../services/admin/fields";
import Pagination from "../../../components/Pagination";
import { formatCurrencyVND, formatTime } from "../../../components/common";
import { STATUS_FIELD } from "../../../const";
import { showToast } from "../../../components/common";

function statusField(status) {
  if (status === STATUS_FIELD.ACTIVE) {
    // return "Hoạt động";
    return (
      <Badge bg="success" title="Hoạt động">
        Hoạt động
      </Badge>
    );
  } else if (status === STATUS_FIELD.MAINTENANCE) {
    return (
      <Badge bg="warning" title="Đang bảo trì">
        Đang bảo trì
      </Badge>
    );
  } else {
    return (
      <Badge bg="secondary" title="Ngừng hoạt động">
        Ngừng hoạt động
      </Badge>
    );
  }
}

function FieldList() {
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const loadField = async (page) => {
    setLoading(true);
    try {
      const { data, pagination } = await getListField(page);
      setFields(data);
      setPagination(pagination);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sân:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadField(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn xóa bản ghi này không ?")) {
      try {
        await deleteField(id);
        setFields(fields.filter((item) => item.id !== id)); // Cập nhật danh sách
        setTimeout(() => {
          showToast('Xóa bạn ghi thành công')
        }, 2000);
      } catch (error) {
        showToast('Có lỗi xảy ra', 'error');
        console.error("Erorr", error);
      } finally {
      }
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button href="/admin/fields/create" variant="primary">
          Thêm sân
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
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="text-center py-3 text-gray-500">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : fields.length > 0 ? (
                fields.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.category_name}</td>
                    <td>{item.price ? formatCurrencyVND(item.price) : 0}</td>
                    <td>{formatTime(item.open_time)}</td>
                    <td>{formatTime(item.close_time)}</td>
                    <td>{statusField(item.status)}</td>
                    <td>
                      <button
                        className="btn btn-outline-primary btn-sm mx-1"
                        size="sm"
                        onClick={() => navigate(`/admin/fields/${item.id}`)}
                      >
                        <Eye />
                      </button>
                      <button className="btn btn-outline-warning btn-sm mx-1">
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
        <Pagination pagination={pagination} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}

export default FieldList;
