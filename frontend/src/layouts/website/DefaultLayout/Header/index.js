import React from 'react';
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
  Nav,
  Image,
} from 'react-bootstrap';
import {
  FaSearch,
  FaHeart,
  FaBell,
  FaMapMarkedAlt,
  FaCalendarCheck,
  FaSlidersH,
} from 'react-icons/fa';
import useAuthStore from '../../../../store';
const renderDate = () => {
  const days = [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ];

  const today = new Date();
  const dayOfWeek = days[today.getDay()];
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  return `${dayOfWeek}, ${day}/${month}/${year}`;
};

function Header() {
  const { user } = useAuthStore();
  return (
    <Navbar expand="lg" className="header shadow-sm">
      <Container fluid>
        {/* Logo + Thông tin User */}
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIysp1hIWfYpvXZjuM6xWj7q_cE1bdtNWxTA&s0"
            roundedCircle
            width="50"
            height="50"
          />
          <div className="ms-2">
            <small className="text-light">{renderDate()}</small>
            <h6 className="fw-bold text-warning m-0">
              {user ? user.full_name : ''}
            </h6>
          </div>
        </Navbar.Brand>

        {/* Thanh tìm kiếm */}
        <Form className="d-flex flex-grow-1 mx-3 search-bar">
          <Button variant="success" className="rounded-start">
            <FaSearch />
          </Button>
          <FormControl
            type="search"
            placeholder="Tìm kiếm"
            className="me-2 border-0"
          />
          <Button variant="light" className="rounded-end">
            <FaSlidersH />
          </Button>
        </Form>

        {/* Các icon điều hướng */}
        <Nav className="ms-auto d-flex align-items-center">
          <Nav.Link
            href="#"
            className="text-light d-flex align-items-center fs-6 fw-light"
          >
            <FaMapMarkedAlt className="me-1" color="white" /> Bản đồ
          </Nav.Link>
          <Nav.Link
            href="#"
            className="text-light d-flex align-items-center fs-6 fw-light"
          >
            <FaCalendarCheck className="me-1" color="white" /> Sân đã đặt
          </Nav.Link>
          <Nav.Link
            href="#"
            className="text-light d-flex align-items-center fs-6 fw-light"
          >
            <FaHeart className="me-1" color="white" /> Yêu thích
          </Nav.Link>
          <Nav.Link href="#" className="text-light">
            <FaBell color="white" />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
