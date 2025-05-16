import { useEffect, useState } from 'react';
import {
  listAllBooking,
  updatePaymentById,
  cancelPaymentById,
} from '../../../services/admin/booking';
import { formatCurrencyVND } from '../../../components/common';
import { Badge, Button } from 'react-bootstrap';
import { showToast } from '../../../components/common';

function statusField(status) {
  if (status === 4)
  {
     return (
      <Badge bg="secondary" title="Sân đặt đã hủy">
        Đã hủy đặt sân
      </Badge>
    );
  }
  else if (status !== 0) {
    // return "Hoạt động";
    return (
      <Badge bg="success" title="Đặt sân thành công">
        Đặt sân thành công
      </Badge>
    );
  }
  else {
    return (
      <Badge bg="danger" title="Đặt sân thất bại">
        Đặt sân thất bại
      </Badge>
    );
  }
}

function statusPayment(status) {
  if (status === 0) {
    // return "Hoạt động";

    return (
      <Badge bg="danger" title="Thanh toán thất bại">
        Thanh toán thất bại
      </Badge>
    );
  } else if (status === 1) {
    return (
      <Badge bg="warning" title="Thanh toán qua momo">
        Thanh toán qua momo
      </Badge>
    );
  } else if (status === 2) {
    return (
      <Badge bg="primary" title="Thanh toán qua thẻ ngân hàng">
        Thanh toán qua thẻ ngân hàng
      </Badge>
    );
  } else if (status === 4) {
    return (
      <Badge bg="secondary" title="Đã hủy đặt sân">
        Đã hủy đặt sân
      </Badge>
    );
  }
   else {
    return (
      <Badge bg="success" title="Thanh toán thành công">
        Thanh toán thành công
      </Badge>
    );
  }
}

export default function ManagementBookingField() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    const { data } = await listAllBooking(search);
    setData(data || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdatePayment = async (id) => {
    const res = await updatePaymentById(id);

    if (res?.status) {
      showToast('Cập nhật thanh toán thành công');
      // window.location.reload();
    } else {
      showToast('Cập nhật thanh toán thất bại', 'warning');
    }
  };

  const handleCancelPayment = async (id) => {
    const res = await cancelPaymentById(id);

    if (res?.status) {
      showToast('Hủy đặt sân thành công!');
      // window.location.reload();
    } else {
      showToast('Hủy đặt sân thất bại', 'warning');
    }
  };

  return (
    <>
      <div className="data-table-container">
        <h2>Danh sách sân</h2>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên sân</th>
                <th>Sân</th>
                <th>Tổng giờ</th>
                <th>Giá thuê</th>
                <th>Giờ thuê</th>
                <th>Trạng thái đặt sân</th>
                <th>Hình ảnh thanh toán</th>
                <th>Trạng thái thanh toán</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name_field}</td>
                    <td>
                      {item?.booking_details?.length > 0
                        ? `Sân-${item.booking_details[0].sub_field_id}`
                        : ''}
                    </td>
                    <td>{item.total_hours}</td>
                    <td>{formatCurrencyVND(item.total_price)}</td>
                    <td>{item.total_hours}</td>
                    <td>{statusField(item.payment_status)}</td>
                    <td>
                      {item.image ? (
                        <img src={item.image} width={100} height={100} />
                      ) : (
                        ''
                      )}
                    </td>
                    <td>{statusPayment(item.payment_status)}</td>
                    <td>
                      <Button
                        variant="success"
                        className="mx-2"
                        disabled={item.payment_status === 0}
                        onClick={() => handleUpdatePayment(item.payment_id)}
                      >
                        Xác nhận
                      </Button>

                      <Button
                        variant="danger"
                        disabled={item.payment_status === 0}
                        onClick={() => handleCancelPayment(item.payment_id)}
                      >
                        Hủy
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center' }}>
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* <Pagination pagination={pagination} onPageChange={setCurrentPage} /> */}
      </div>
    </>
  );
}
