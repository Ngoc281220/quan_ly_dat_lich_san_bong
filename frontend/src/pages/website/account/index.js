import { useState, useEffect } from 'react';
import { Card, Container,  Button, Badge } from 'react-bootstrap';
import {  Trash } from 'lucide-react';
import { listBookingBYIDUSER } from '../../../services/website/booking';

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

function AccountPage() {
  const [data, setData] = useState([]);
  const loadData = async () => {
    const { data } = await listBookingBYIDUSER();
    setData(data);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <Container className="a-h">
      <h5 className="mt-4 py-4">Lịch đã đặt</h5>
      {data?.length > 0 ? (
        data.map((item, index) => (
          <Card key={index} className="mt-3 p-3">
            <h6 className="text-success">{item.name_field}</h6>

            Chi tiết:
            {item.booking_details.map((it, idx) => (
              <p key={idx}>
                <strong>{`Sân-${it.sub_field_id} | ${it.time} | ${it.date}`}</strong>
              </p>
            ))}

            <p>
              <strong>Địa chỉ:</strong> {item.location}
            </p>
            <div className="text-end text-danger">
              {statusField(item.payment_status)}
            </div>
          </Card>
        ))
      ) : (
        <p className="text-muted">Chưa có lịch đặt nào</p>
      )}
    </Container>
  );
}

export default AccountPage;
