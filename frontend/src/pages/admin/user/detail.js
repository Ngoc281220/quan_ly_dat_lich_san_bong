import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { detail } from '../../../services/admin/user';

const DEFAULT_AVATAR = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const loadData = async () => {
    try {
      const { data } = await detail(id);
      setUser(data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  if (!user || Object.keys(user).length === 0) {
    return <p className="text-center mt-5">Đang tải thông tin người dùng...</p>;
  }

  return (
    <Card className="shadow rounded-4 border-0 mx-auto mt-5" style={{ maxWidth: '460px', padding: '30px' }}>
      <div className="text-center">
        <div style={{
          width: 130, height: 130, margin: '0 auto', borderRadius: '50%',
          padding: 5, background: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)'
        }}>
          <img
            src={user.avatar || DEFAULT_AVATAR}
            alt="Avatar"
            className="rounded-circle"
            width="120"
            height="120"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <h4 className="mt-3 mb-1 fw-bold">{user.name}</h4>
        <p className="text-muted">{user.email}</p>
      </div>

      <ListGroup variant="flush" className="mt-3">
        <ListGroup.Item><strong>Số điện thoại:</strong> {user.phone || 'Chưa cập nhật'}</ListGroup.Item>
        <ListGroup.Item><strong>Ngày sinh:</strong> {user.date_of_birth || 'Chưa cập nhật'}</ListGroup.Item>
        <ListGroup.Item><strong>Địa chỉ:</strong> {user.address || 'Chưa cập nhật'}</ListGroup.Item>
      </ListGroup>

      <div className="text-center mt-4">
        <Button variant="outline-primary" onClick={() => navigate(-1)}>Quay lại</Button>
      </div>
    </Card>
  );
};

export default UserDetail;
