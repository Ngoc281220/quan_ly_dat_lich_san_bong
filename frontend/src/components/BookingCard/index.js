import React from "react";
import { Offcanvas, Card, Container, Row, Col, Button, Badge } from "react-bootstrap";
import { FaMapMarkerAlt, FaClock, FaPhone, FaHeart, FaArrowLeft } from "react-icons/fa";

function OffcanvasBookingCard({ show, handleClose }) {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="bottom">
      <Offcanvas.Body>
        <Container className="mt-2">
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between">
            <Button variant="outline-success" onClick={handleClose}>
              <FaArrowLeft />
            </Button>
            <h5 className="text-uppercase fw-bold">Nestworld Badminton - Pickleball</h5>
            <Button variant="outline-danger">
              <FaHeart />
            </Button>
          </div>

          {/* Card chính */}
          <Card className="mt-3 shadow">
            <Card.Body>
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center">
                <Badge bg="success" className="p-2">Chưa có đánh giá</Badge>
                <Button variant="warning" className="fw-bold">Đặt lịch</Button>
              </div>

              {/* Tiêu đề */}
              <Card.Title className="mt-2 text-primary">
                NESTWORLD BADMINTON - PICKLEBALL
              </Card.Title>

              {/* Các nhãn */}
              <div className="mb-2">
                <Badge bg="danger" className="me-2">Phức hợp</Badge>
                <Badge bg="info" className="me-2 text-white">Pickleball</Badge>
                <Badge bg="success">Cầu lông</Badge>
              </div>

              {/* Thông tin */}
              <div className="text-muted">
                <p>
                  <FaMapMarkerAlt className="text-success" /> 16 Đ. Số 385, Hiệp Phú, Thủ Đức, TP HCM
                </p>
                <p>
                  <FaClock className="text-warning" /> 05:00 - 22:00
                </p>
                <p>
                  <FaPhone className="text-primary" />
                  <a href="tel:0886264644" className="text-decoration-none text-dark fw-bold">
                    {" "} 0886264644
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>

          {/* Tabs */}
          <Row className="mt-3 border-bottom">
            <Col className="text-center border-bottom border-success fw-bold">Thông tin</Col>
            <Col className="text-center text-muted">Dịch vụ</Col>
            <Col className="text-center text-muted">Hình ảnh</Col>
            <Col className="text-center text-muted">Đánh giá</Col>
          </Row>

          {/* Nội dung */}
          <Card className="mt-3 p-3">
            <Card.Title className="text-danger">Link đặt sân online</Card.Title>
            <Card.Text>
              <a href="https://datlich.alobo.un/san/sport_nestworld_badminton"
                 className="text-decoration-none"
                 target="_blank"
                 rel="noopener noreferrer">
                https://datlich.alobo.un/san/sport_nestworld_badminton
              </a>
            </Card.Text>
          </Card>
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default OffcanvasBookingCard;
