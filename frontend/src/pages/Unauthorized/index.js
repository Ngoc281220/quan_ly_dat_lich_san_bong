// src/pages/Unauthorized/index.jsx
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        {/* Illustration */}
        <div className="illustration">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm8-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        {/* Title & Message */}
        <h1 className="title">403 - Truy cập bị từ chối</h1>
        <p className="description">
          Bạn không có quyền truy cập trang này. Vui lòng liên hệ quản trị viên nếu bạn nghĩ đây là lỗi.
        </p>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Button 
            type="primary" 
            onClick={() => navigate(-1)} // Quay lại trang trước
            className="back-button"
          >
            Quay lại
          </Button>
          <Button 
            onClick={() => navigate('/')} // Về trang chủ
            className="home-button"
          >
            Trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}