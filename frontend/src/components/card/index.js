// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Offcanvas, Card, Button, Nav } from 'react-bootstrap';
// import useAuthStore from '../../store';
// import {
//   FaStar,
//   FaMapMarkerAlt,
//   FaPhone,
//   FaHeart,
//   FaShareAlt,
//   FaClock,
//   FaCopy,
// } from 'react-icons/fa';
// // import OffcanvasBookingCard from "../BookingCard";
// function CommonCard({ id, image, title, location, time, phone, rating }) {
//   const navigate = useNavigate();
//   const [show, setShow] = useState(false);
//   const [activeTab, setActiveTab] = useState('info');
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const { user } = useAuthStore();

//   return (
//     <Card className="mb-3 shadow-sm card-container">
//       <div
//         className="card-background"
//         style={{
//           backgroundImage: image
//             ? `url(${image})`
//             : 'linear-gradient(#555, #777)',
//         }}
//       >
//         <div className="card-overlay">
//           <div className="card-content">
//             <div className="d-flex justify-content-between align-items-center">
//               <div>
//                 {rating && (
//                   <span className="badge bg-warning text-dark me-2">
//                     <FaStar /> {rating}
//                   </span>
//                 )}
//               </div>
//               <div>
//                 <FaHeart className="text-light me-2" />
//                 <FaShareAlt className="text-light" />
//               </div>
//             </div>

//             <div className="d-flex align-items-center justify-content-between">
//               <div>
//                 <Card.Title className="mt-2 fs-6 text-light">
//                   {title}
//                 </Card.Title>
//                 <Card.Text className="text-light fs-14 mb-2">
//                   <FaMapMarkerAlt /> {location}
//                 </Card.Text>
//                 <Card.Text className="text-light fs-12 mb-2">
//                   <FaPhone /> {phone} | ⏰ {time}
//                 </Card.Text>
//               </div>
//               <div>
//                 <Button
//                   variant="primary"
//                   className="fs-14 fw-bold text-white mx-3"
//                   onClick={handleShow}
//                 >
//                   XEM CHI TIẾT
//                 </Button>
//                 {user != null && (
//                   <Button
//                     variant="warning"
//                     className="fs-14 fw-bold text-white"
//                     onClick={() => {
//                       navigate(`/booking/${id}`);
//                     }}
//                   >
//                     ĐẶT LỊCH
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Offcanvas
//         show={show}
//         onHide={handleClose}
//         backdrop={true}
//         className="bg-light text-dark w-500"
//       >
//         <Offcanvas.Body>
//           <div
//             style={{
//               backgroundImage:
//                 'url(https://dailysonepoxy.com/wp-content/uploads/2022/02/uu-diem-cua-son-san-the-thao.jpg)',
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//             }}
//           >
//             <Card className="mb-3 shadow-sm">
//               <Card.Body>
//                 <div className="d-flex align-items-center mb-2 justify-content-center">
//                   <Button variant="success" className="rounded-pill px-3">
//                     <FaStar className="me-1" /> 5 (4 đánh giá)
//                   </Button>
//                 </div>
//                 <Card.Subtitle className="mb-2 text-muted">
//                   <h4 className="fs-5">
//                     CLB Cầu Lông TPT Sport - Làng đại học
//                   </h4>
//                   <span className="badge bg-light text-success border border-success">
//                     Cầu lông
//                   </span>
//                 </Card.Subtitle>
//                 <Card.Text>
//                   <div className="d-flex align-items-center mb-2">
//                     <FaMapMarkerAlt className="me-2 text-success" /> D. Tôn Thất
//                     Tùng, Đông Hòa, Dĩ An, Bình Dương
//                   </div>
//                   <div className="d-flex align-items-center mb-2">
//                     <FaClock className="me-2 text-success" /> 06:00 - 22:00
//                   </div>
//                   <div className="d-flex align-items-center">
//                     <FaPhone className="me-2 text-success" />{' '}
//                     <a
//                       href="tel:0374857068"
//                       className="text-decoration-none text-dark"
//                     >
//                       0374857068
//                     </a>
//                   </div>
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </div>
//           <Nav
//             variant="tabs"
//             activeKey={activeTab}
//             onSelect={(selectedKey) => setActiveTab(selectedKey)}
//             className="mb-3"
//           >
//             <Nav.Item>
//               <Nav.Link eventKey="info">Thông tin</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="services">Dịch vụ</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="images">Hình ảnh</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="reviews">Đánh giá</Nav.Link>
//             </Nav.Item>
//           </Nav>

//           {activeTab === 'info' && (
//             <>
//               <Card className="mb-3">
//                 <Card.Body>
//                   <Card.Title>Website</Card.Title>
//                   <Card.Text>
//                     <a
//                       href="https://www.facebook.com/clbcaulongtptsport/"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       https://www.facebook.com/clbcaulongtptsport/
//                     </a>
//                   </Card.Text>
//                 </Card.Body>
//               </Card>

//               <Card className="mb-3">
//                 <Card.Body>
//                   <Card.Title className="text-danger">
//                     Link đặt sân online
//                   </Card.Title>
//                   <Card.Text>
//                     <i>
//                       https://datlich.alobo.un/san/sport_clb_cau_long_tpt_sport
//                     </i>
//                     <Button variant="link" className="text-success ms-2 p-0">
//                       <FaCopy />
//                     </Button>
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </>
//           )}
//         </Offcanvas.Body>
//       </Offcanvas>
//     </Card>
//   );
// }

// export default CommonCard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Offcanvas, Card, Button, Nav, Badge, Container, Row, Col } from 'react-bootstrap';
import useAuthStore from '../../store';
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaHeart,
  FaShareAlt,
  FaClock,
  FaCopy,
  FaRegHeart,
  FaExternalLinkAlt
} from 'react-icons/fa';
import '../../assets/styles/CommonCard.scss'; // Create this CSS file for custom styles

function CommonCard({ id, image, title, location, time, phone, rating, category_name = "Cầu lông" }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [isFavorite, setIsFavorite] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useAuthStore();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link đã được sao chép!');
  };

  return (
    <>
      {/* Main Card */}
      <Card className="common-card shadow-sm mb-4 overflow-hidden">
        <div className="card-image-container">
          <Card.Img 
            variant="top" 
            src={image || 'https://dailysonepoxy.com/wp-content/uploads/2022/02/uu-diem-cua-son-san-the-thao.jpg'} 
            alt={title}
          />
          <div className="card-overlay">
            {rating && (
              <Badge pill bg="warning" className="rating-badge">
                <FaStar className="me-1" /> {rating}
              </Badge>
            )}
            <div className="card-actions">
              <Button 
                variant="link" 
                className="text-white p-0"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? <FaHeart className="text-danger" /> : <FaRegHeart />}
              </Button>
              <Button 
                variant="link" 
                className="text-white p-0 ms-2"
                onClick={handleShare}
              >
                <FaShareAlt />
              </Button>
            </div>
          </div>
        </div>

        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <Card.Title className="mb-1">{title}</Card.Title>
              <Card.Text className="text-muted small mb-2">
                <FaMapMarkerAlt className="me-1 text-primary" /> {location}
              </Card.Text>
            </div>
            <Badge bg="light" text="success" className="border border-success">
              {category_name}
            </Badge>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Card.Text className="small">
                <FaClock className="me-1 text-primary" /> {time}
              </Card.Text>
              <Card.Text className="small">
                <FaPhone className="me-1 text-primary" /> {phone}
              </Card.Text>
            </div>
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={handleShow}
              >
                Chi tiết
              </Button>
              {user && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/booking/${id}`)}
                >
                  Đặt lịch
                </Button>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Offcanvas Details */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="details-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="venue-header mb-4">
            <div 
              className="venue-hero"
              style={{
                backgroundImage: `url(${image || 'https://dailysonepoxy.com/wp-content/uploads/2022/02/uu-diem-cua-son-san-the-thao.jpg'})`
              }}
            >
              <div className="venue-rating">
                <Button variant="light" className="rounded-pill">
                  <FaStar className="text-warning me-1" /> 
                  <span className="fw-bold">5</span> (4 đánh giá)
                </Button>
              </div>
            </div>
            
            <div className="venue-info mt-3">
              <h4 className="mb-2">{title}</h4>
              <Badge bg="light" text="success" className="border border-success mb-3">
                {category_name}
              </Badge>
              
              <div className="venue-details">
                <p className="mb-2">
                  <FaMapMarkerAlt className="me-2 text-primary" /> 
                  {location || "D. Tôn Thất Tùng, Đông Hòa, Dĩ An, Bình Dương"}
                </p>
                <p className="mb-2">
                  <FaClock className="me-2 text-primary" /> 
                  {time || "06:00 - 22:00"}
                </p>
                <p className="mb-3">
                  <FaPhone className="me-2 text-primary" /> 
                  <a href={`tel:${phone || '0374857068'}`} className="text-decoration-none">
                    {phone || "0374857068"}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab} className="mb-4">
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

          <div className="tab-content">
            {activeTab === 'info' && (
              <div className="info-tab">
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Website</Card.Title>
                    <Card.Text>
                      <a
                        href="https://www.facebook.com/clbcaulongtptsport/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex align-items-center"
                      >
                        https://www.facebook.com/clbcaulongtptsport/
                        <FaExternalLinkAlt className="ms-2 small" />
                      </a>
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Body>
                    <Card.Title className="text-danger">
                      Link đặt sân online
                    </Card.Title>
                    <Card.Text className="d-flex align-items-center">
                      <span className="text-truncate">
                        https://datlich.alobo.un/san/sport_clb_cau_long_tpt_sport
                      </span>
                      <Button 
                        variant="link" 
                        className="text-primary ms-2 p-0"
                        onClick={() => navigator.clipboard.writeText('https://datlich.alobo.un/san/sport_clb_cau_long_tpt_sport')}
                      >
                        <FaCopy />
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="services-tab">
                <h5>Dịch vụ cung cấp</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Thuê sân theo giờ</li>
                  <li className="list-group-item">Dịch vụ huấn luyện</li>
                  <li className="list-group-item">Bán dụng cụ thể thao</li>
                  <li className="list-group-item">Quán nước giải khát</li>
                </ul>
              </div>
            )}

            {activeTab === 'images' && (
              <div className="images-tab">
                <Row>
                  {[1, 2, 3, 4].map((item) => (
                    <Col xs={6} className="mb-3" key={item}>
                      <Card.Img 
                        variant="top" 
                        src={`https://source.unsplash.com/random/300x200/?badminton,${item}`}
                        className="rounded"
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-tab">
                <Card className="mb-3">
                  <Card.Body>
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <div className="review-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center">
                          TN
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="d-flex justify-content-between">
                          <h6 className="mb-0">Trần Nam</h6>
                          <small className="text-muted">3 ngày trước</small>
                        </div>
                        <div className="mb-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="text-warning small" />
                          ))}
                        </div>
                        <p className="mb-0">Sân chơi tốt, giá cả hợp lý. Nhân viên nhiệt tình.</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            )}
          </div>

          <div className="fixed-bottom bg-white p-3 border-top">
            <Button 
              variant="primary" 
              className="w-100"
              onClick={() => {
                navigate(`/booking/${id}`);
                handleClose();
              }}
            >
              Đặt lịch ngay
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CommonCard;
