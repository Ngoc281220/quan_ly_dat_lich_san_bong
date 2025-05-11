import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { loadCategory } from '../../../services/admin/categories';
import { Pencil} from 'react-bootstrap-icons';

export default function Categories() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const { data } = await loadCategory();
      setData(data || []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button href="/admin/categories/create" variant="primary">
          Thêm danh mục
        </Button>
      </div>

      <div className="data-table-container">
        <h2>Danh sách </h2>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên</th>
                <th>Mô tả</th>
                <th>Hạnh động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="text-center py-3 text-gray-500">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      <button
                        className="btn btn-outline-warning btn-sm mx-1"
                        onClick={() =>
                          navigate(`/admin/categories/update/${item.id}`)
                        }
                      >
                        <Pencil />
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
      </div>
    </div>
  );
}
