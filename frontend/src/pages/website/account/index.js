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
import { BsHouse, BsMap, BsStar, BsPerson } from "react-icons/bs";

function AccountPage() {
  return (
    <Container
      fluid
      className="bg-success text-white min-vh-100 d-flex flex-column"
    >
      {/* Header */}
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

      {/* Booking List */}
      <Container className="flex-grow-1 text-center py-3">
        <h5 className="text-start">Lịch đặt của bạn</h5>
        <Card className="bg-light text-dark p-3">
          <Card.Body>
            <Card.Title className="text-success">
              CLB Pickleball Hoàng Thành Trung
            </Card.Title>
            <Card.Text>
              Chi tiết: Pickleball 4: 18h - 18h30, Pickleball 5: 18h30 - 19h,
              Pickleball 7: 18h30 - 19h
              <br /> Ngày: 08/02/2025
              <br /> Địa chỉ: 449 Lê Văn Việt quận 9 (bên trong trường Đào tạo
              bồi dưỡng Nghiệp vụ Kiểm sát)
            </Card.Text>
            <Button variant="danger" size="sm">
              Hủy do quá giờ thanh toán
            </Button>
          </Card.Body>
        </Card>
      </Container>

      {/* Bottom Navigation */}
      <Navbar fixed="bottom" bg="success" className="text-center py-2">
        <Nav className="w-100 d-flex justify-content-around">
          <Nav.Link
            href="#"
            className="text-white d-flex flex-column align-items-center"
          >
            <BsHouse size={20} />
            Trang chủ
          </Nav.Link>
          <Nav.Link
            href="#"
            className="text-white d-flex flex-column align-items-center"
          >
            <BsMap size={20} />
            Bản đồ
          </Nav.Link>
          <Nav.Link
            href="#"
            className="text-white d-flex flex-column align-items-center"
          >
            <BsStar size={20} />
            Nổi bật
          </Nav.Link>
          <Nav.Link
            href="#"
            className="text-white d-flex flex-column align-items-center border rounded p-1"
            style={{ borderColor: "white" }}
          >
            <BsPerson size={20} />
            Tài khoản
          </Nav.Link>
        </Nav>
      </Navbar>
    </Container>
  );
}

export default AccountPage;
