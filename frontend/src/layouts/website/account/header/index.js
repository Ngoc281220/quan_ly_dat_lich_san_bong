import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav,
} from "react-bootstrap";

function AccountHeader() {
  return (
    <Container>
      <Card className="text-white bg-transparent border-0 text-center mt-3">
        <Card.Body>
          <Card.Title>ALoBO - Đặt lịch online sân thể thao</Card.Title>
          <Card.Text>Tạo tài khoản để dễ dàng quản lý lịch đặt</Card.Text>
          <div className="d-flex justify-content-end">
            <Button variant="light" className="me-2">
              Đăng nhập
            </Button>
            <Button variant="outline-light">Đăng ký</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
