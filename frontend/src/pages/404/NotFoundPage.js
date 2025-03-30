import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h3 className="text-muted">Oops! Trang bạn tìm kiếm không tồn tại.</h3>
      <p className="text-secondary">Hãy kiểm tra lại URL hoặc quay về trang chủ.</p>
      <Button variant="primary" onClick={() => navigate("/")}
        className="d-flex align-items-center mt-3">
        <FaArrowLeft className="me-2" /> Quay lại trang chủ
      </Button>
    </Container>
  );
};

export default NotFoundPage;
