import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Offcanvas, Card, Button, Nav } from 'react-bootstrap';
import useAuthStore from '../../store';
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaHeart,
  FaShareAlt,
  FaClock,
  FaCopy,
} from 'react-icons/fa';
// import OffcanvasBookingCard from "../BookingCard";
function CommonCard({ id, image, title, location, time, phone, rating }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useAuthStore();

  return (
    <Card className="mb-3 shadow-sm card-container">
      <div
        className="card-background"
        style={{
          backgroundImage: image
            ? `url(${image})`
            : 'linear-gradient(#555, #777)',
        }}
      >
        <div className="card-overlay">
          <div className="card-content">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {rating && (
                  <span className="badge bg-warning text-dark me-2">
                    <FaStar /> {rating}
                  </span>
                )}
              </div>
              <div>
                <FaHeart className="text-light me-2" />
                <FaShareAlt className="text-light" />
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <div>
                <Card.Title className="mt-2 fs-6 text-light">
                  {title}
                </Card.Title>
                <Card.Text className="text-light fs-14 mb-2">
                  <FaMapMarkerAlt /> {location}
                </Card.Text>
                <Card.Text className="text-light fs-12 mb-2">
                  <FaPhone /> {phone} | ⏰ {time}
                </Card.Text>
              </div>
              <div>
                <Button
                  variant="primary"
                  className="fs-14 fw-bold text-white mx-3"
                  onClick={handleShow}
                >
                  XEM CHI TIẾT
                </Button>
                {user != null && (
                  <Button
                    variant="warning"
                    className="fs-14 fw-bold text-white"
                    onClick={() => {
                      navigate(`/booking/${id}`);
                    }}
                  >
                    ĐẶT LỊCH
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        backdrop={true}
        className="bg-light text-dark w-500"
      >
        <Offcanvas.Body>
          <div
            style={{
              backgroundImage:
                'url(https://dailysonepoxy.com/wp-content/uploads/2022/02/uu-diem-cua-son-san-the-thao.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Card className="mb-3 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-2 justify-content-center">
                  <Button variant="success" className="rounded-pill px-3">
                    <FaStar className="me-1" /> 5 (4 đánh giá)
                  </Button>
                </div>
                <Card.Subtitle className="mb-2 text-muted">
                  <h4 className="fs-5">
                    CLB Cầu Lông TPT Sport - Làng đại học
                  </h4>
                  <span className="badge bg-light text-success border border-success">
                    Cầu lông
                  </span>
                </Card.Subtitle>
                <Card.Text>
                  <div className="d-flex align-items-center mb-2">
                    <FaMapMarkerAlt className="me-2 text-success" /> D. Tôn Thất
                    Tùng, Đông Hòa, Dĩ An, Bình Dương
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <FaClock className="me-2 text-success" /> 06:00 - 22:00
                  </div>
                  <div className="d-flex align-items-center">
                    <FaPhone className="me-2 text-success" />{' '}
                    <a
                      href="tel:0374857068"
                      className="text-decoration-none text-dark"
                    >
                      0374857068
                    </a>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <Nav
            variant="tabs"
            activeKey={activeTab}
            onSelect={(selectedKey) => setActiveTab(selectedKey)}
            className="mb-3"
          >
            <Nav.Item>
              <Nav.Link eventKey="info">Thông tin</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="services">Dịch vụ</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="images">Hình ảnh</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="reviews">Đánh giá</Nav.Link>
            </Nav.Item>
          </Nav>

          {activeTab === 'info' && (
            <>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Website</Card.Title>
                  <Card.Text>
                    <a
                      href="https://www.facebook.com/clbcaulongtptsport/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://www.facebook.com/clbcaulongtptsport/
                    </a>
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="mb-3">
                <Card.Body>
                  <Card.Title className="text-danger">
                    Link đặt sân online
                  </Card.Title>
                  <Card.Text>
                    <i>
                      https://datlich.alobo.un/san/sport_clb_cau_long_tpt_sport
                    </i>
                    <Button variant="link" className="text-success ms-2 p-0">
                      <FaCopy />
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </Card>
  );
}

export default CommonCard;
