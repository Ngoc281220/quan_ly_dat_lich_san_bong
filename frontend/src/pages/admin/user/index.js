import { useEffect, useState } from "react";
import { getAllUser } from "../../../services/admin/user";
import Button from "react-bootstrap/Button";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";
import Pagination from "../../../components/Pagination";

function ListUser() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const { data, pagination } = await getAllUser();
            setUsers(data);
            setPagination(pagination);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách người dùng:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadUsers();
    }, [currentPage]);
return(
<>
    <div>
        {/* <div className="d-flex justify-content-end">
            <Button href="/admin/fields/create" variant="primary">
                Thêm người dùng
            </Button>
        </div> */}

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
                        ) : users.length > 0 ? (
                            users.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>
                                <button className="btn btn-outline-primary btn-sm mx-1" size="sm" 
                                    >
                                    <Eye />
                                </button>
                                <button className="btn btn-outline-warning btn-sm mx-1">
                                    <Pencil />
                                </button>
                                <button className="btn btn-outline-danger btn-sm mx-1">
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
</>
);
}

export default ListUser;
