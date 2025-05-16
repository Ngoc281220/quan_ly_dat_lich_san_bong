// import { useState, useEffect } from 'react';
// import QRCodeImage from '../../../assets/image/QRCODE.png';
// import { useParams } from 'react-router-dom';
// import { getBookingByOrderCode } from '../../../services/website/booking';
// import { formatCurrencyVND } from '../../../components/common';
// import { paymentMomo, paymentCard } from '../../../services/website/payment';
// import { showToast } from '../../../components/common';

// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Image,
//   Form,
//   Modal,
// } from 'react-bootstrap';

// export default function PaymentPage() {
//   const { order_code } = useParams();
//   const [showQRModal, setShowQRModal] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [data, setData] = useState({});

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const loadData = async () => {
//     try {
//       const { data } = await getBookingByOrderCode(order_code);
//       setData(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     loadData();
//   }, [order_code]);

//   const handlePaymentMomo = async () => {
//     try {
//       const total_price = data.total_price;
//       const order_code = data.order_code;
//       const response = await paymentMomo({ total_price, order_code });
//       if (response.data && response.data.payUrl) {
//         // Chuyển hướng người dùng đến trang thanh toán Momo
//         window.location.href = response.data.payUrl;
//       } else {
//         console.log('Không có URL thanh toán từ Momo');
//       }
//       console.log('respone', response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handlePaymentCard = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('image_payment', selectedFile);
//       formData.append('order_code', data.order_code);
//       formData.append('amount', data.total_price);
//       const respone = await paymentCard(formData);
//       if (respone.data) {
//         showToast('Thanh toán thành công');
//       }
//       else
//       {
//         showToast('Thanh toán thất bại');
//       }
//     } catch (error) {
//       showToast('Thanh toán thất bại');
//     }
//   };
//   return (
//     <Container fluid className="bg-green text-white min-vh-100 p-4">
//       <Row>
//         {/* Thông tin tài khoản ngân hàng */}
//         <Col md={8}>
//           <Card className="p-3 custom-card">
//             <div className="d-flex justify-content-between">
//               <div>
//                 <h5 className="text-warning">1. Tài khoản ngân hàng</h5>
//                 <p>
//                   <strong>Tên tài khoản:</strong> Truong Hai Trieu
//                 </p>
//                 <p>
//                   <strong>Số tài khoản:</strong> 8844472165
//                 </p>
//                 <p>
//                   <strong>Ngân hàng:</strong> BIDV
//                 </p>
//               </div>
//               <div>
//                 <h5 className="text-warning text-end">Thanh toán</h5>
//                 <div className="d-flex justify-content-end my-3">
//                   {/* Thanh toán bằng MoMo */}
//                   <div className="text-center mt-3">
//                     <Button
//                       variant="danger"
//                       size="lg"
//                       className="custom-button mx-3 fs-14"
//                       onClick={handlePaymentMomo}
//                     >
//                       Thanh toán MoMo
//                     </Button>
//                   </div>
//                   <Image
//                     src={QRCodeImage}
//                     width={100}
//                     height={100}
//                     className="qr-image"
//                     onClick={() => setShowQRModal(true)}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="alert alert-warning text-dark custom-alert">
//               Vui lòng chuyển khoản <strong>20.000 đ</strong> và gửi ảnh vào ô
//               bên dưới để hoàn tất đặt lịch!
//             </div>
//             <p>
//               Đơn của bạn còn được giữ chỗ trong{' '}
//               <strong className="text-danger">04:57</strong>
//             </p>
//           </Card>

//           {/* Khu vực tải ảnh */}
//           <Row className="mt-3">
//             <Col md={6} className="d-flex justify-content-center">
//               <Card className="p-3 text-center w-100 custom-upload-card">
//                 <Form.Group>
//                   <Form.Label className="text-muted">
//                     Nhấn vào để tải hình thanh toán (*)
//                   </Form.Label>
//                   <Form.Control type="file" onChange={handleFileChange} />
//                 </Form.Group>
//               </Card>
//             </Col>
//           </Row>
//           <div className="text-center mt-4">
//             <Button
//               variant="warning"
//               size="lg"
//               onClick={handlePaymentCard}
//               className="custom-button w-100"
//             >
//               XÁC NHẬN ĐẶT
//             </Button>
//           </div>
//         </Col>

//         {/* Thông tin đơn hàng & Thanh toán */}
//         <Col md={4}>
//           <Card className="p-3 custom-card">
//             <p>
//               <strong>Tên:</strong> {data.name_user_booking_field}
//             </p>
//             <p>
//               <strong>SDT:</strong> {data.phone}
//             </p>
//             <p>
//               <strong>Mã đơn:</strong> #{data.order_code}
//             </p>
//             <p>
//               <strong>Chi tiết đơn:</strong>
//             </p>
//             <ul>
//               {data &&
//                 data.booking_details &&
//                 data.booking_details.map((item, index) => {
//                   return (
//                     <li key={index}>
//                       {`Sân: ${item.sub_field_id}, Thời gian: ${item.start_time} - ${item.end_time}, Ngày đặt: ${item.date}`}
//                     </li>
//                   );
//                 })}
//             </ul>
//             <p>
//               <strong>Tổng giờ:</strong> {data.total_hours}
//             </p>
//             <p>
//               <strong>Tổng đơn:</strong> {formatCurrencyVND(data.total_price)}
//             </p>
//             <p>
//               <strong>Cần cọc:</strong> {formatCurrencyVND(data.deposit_price)}
//             </p>
//           </Card>
//         </Col>
//       </Row>

//       {/* Nút xác nhận */}

//       {/* Modal hiển thị QR Code lớn */}
//       <Modal show={showQRModal} onHide={() => setShowQRModal(false)} centered>
//         <Modal.Body className="text-center">
//           <h5>Quét mã QR để thanh toán</h5>
//           <Image src={QRCodeImage} width={200} height={200} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowQRModal(false)}>
//             Đóng
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// }

import { useState, useEffect } from 'react';
import QRCodeImage from '../../../assets/image/QRCODE.png';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookingByOrderCode } from '../../../services/website/booking';
import { formatCurrencyVND } from '../../../components/common';
import { paymentMomo, paymentCard } from '../../../services/website/payment';
import { showToast } from '../../../components/common';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Form,
  Modal,
  ProgressBar,
  Alert,
  ListGroup,
  Badge
} from 'react-bootstrap';
import { 
  FaLandmark as FaBank,
  FaQrcode,
  FaMoneyBillWave,
  FaClock,
  FaUpload
} from 'react-icons/fa6';
import '../../../assets/styles/PaymentPage.scss'; // Create this CSS file for custom styles

export default function PaymentPage() {
  const navigate = useNavigate();
  const { order_code } = useParams();
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const { data } = await getBookingByOrderCode(order_code);
      setData(data);
    } catch (error) {
      console.log(error);
      showToast('Không thể tải thông tin đơn hàng', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [order_code]);

  useEffect(() => {
    const timer = timeLeft > 0 && setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePaymentMomo = async () => {
    try {
      const total_price = data.total_price;
      const order_code = data.order_code;
      const response = await paymentMomo({ total_price, order_code });
      if (response.data?.payUrl) {
        window.location.href = response.data.payUrl;
      } else {
        showToast('Không thể kết nối đến MoMo', 'error');
      }
    } catch (error) {
      console.log(error);
      showToast('Thanh toán MoMo thất bại', 'error');
    }
  };

  const handlePaymentCard = async () => {
    if (!selectedFile) {
      showToast('Vui lòng tải lên ảnh chuyển khoản', 'warning');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image_payment', selectedFile);
      formData.append('order_code', data.order_code);
      formData.append('amount', data.total_price);
      
      const response = await paymentCard(formData);
      if (response.data) {
        showToast('Thanh toán thành công!', 'success');
        navigate("/")
      } else {
        showToast('Thanh toán thất bại', 'error');
      }
    } catch (error) {
      showToast('Có lỗi xảy ra khi thanh toán', 'error');
    }
  };

  return (
    <div className="payment-page">
      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <h2 className="text-center text-primary fw-bold">Thanh Toán Đặt Sân</h2>
            <p className="text-center text-muted">Mã đơn hàng: #{order_code}</p>
          </Col>
        </Row>

        <Row>
          {/* Payment Methods Section */}
          <Col lg={8} className="mb-4">
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="d-flex align-items-center mb-4">
                  <div className="flex-grow-1">
                    <h4 className="mb-0">
                      <FaBank className="me-2 text-primary" />
                      Phương thức thanh toán
                    </h4>
                  </div>
                  <div className="text-end">
                    <Badge bg="warning" className="fs-6">
                      <FaClock className="me-1" />
                      Còn lại: {formatTime(timeLeft)}
                    </Badge>
                  </div>
                </div>

                <ProgressBar now={(timeLeft/300)*100} variant="warning" className="mb-4" />

                {/* Bank Transfer Section */}
                <div className="bank-transfer-section mb-4 p-4 rounded bg-light">
                  <Row>
                    <Col md={6}>
                      <h5 className="text-primary mb-3">
                        <FaBank className="me-2" />
                        Chuyển khoản ngân hàng
                      </h5>
                      <ListGroup variant="flush" className="mb-3">
                        <ListGroup.Item>
                          <strong>Ngân hàng:</strong> BIDV
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Số tài khoản:</strong> 8844472165
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Tên tài khoản:</strong> Trần Minh Thiện
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Số tiền:</strong> {formatCurrencyVND(data.deposit_price || 0)}
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                    <Col md={6} className="d-flex flex-column align-items-center">
                      <Image
                        src={QRCodeImage}
                        width={150}
                        className="qr-code mb-3 cursor-pointer"
                        onClick={() => setShowQRModal(true)}
                        rounded
                      />
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => setShowQRModal(true)}
                      >
                        <FaQrcode className="me-1" />
                        Xem mã QR lớn
                      </Button>
                    </Col>
                  </Row>
                </div>

                {/* MoMo Payment */}
                <div className="momo-payment mb-4 p-4 rounded bg-light">
                  <h5 className="text-primary mb-3">
                    <FaMoneyBillWave className="me-2" />
                    Thanh toán qua MoMo
                  </h5>
                  <Button 
                    variant="danger" 
                    className="w-100 py-3 fw-bold"
                    onClick={handlePaymentMomo}
                  >
                    Thanh toán ngay với MoMo
                  </Button>
                </div>

                {/* Upload Proof Section */}
                <Card className="border-primary">
                  <Card.Header className="bg-primary text-white">
                    <FaUpload className="me-2" />
                    Xác nhận thanh toán
                  </Card.Header>
                  <Card.Body>
                    <Alert variant="warning" className="mb-4">
                      <strong>Lưu ý:</strong> Vui lòng chuyển khoản{' '}
                      <strong>{formatCurrencyVND(data.deposit_price || 0)}</strong> và tải lên ảnh xác nhận để hoàn tất đặt lịch!
                    </Alert>

                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label className="fw-bold">Ảnh chuyển khoản</Form.Label>
                      <Form.Control 
                        type="file" 
                        onChange={handleFileChange} 
                        accept="image/*"
                      />
                      <Form.Text className="text-muted">
                        Vui lòng tải lên ảnh chụp màn hình hoặc biên lai chuyển khoản
                      </Form.Text>
                    </Form.Group>

                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="w-100 py-3 fw-bold"
                      onClick={handlePaymentCard}
                      disabled={!selectedFile || isLoading}
                    >
                      {isLoading ? 'Đang xử lý...' : 'XÁC NHẬN THANH TOÁN'}
                    </Button>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Col>

          {/* Order Summary Section */}
          <Col lg={4}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Thông tin đơn hàng</h5>
              </Card.Header>
              <Card.Body>
                {isLoading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <h6 className="text-primary">Thông tin khách hàng</h6>
                      <p className="mb-1">
                        <strong>Tên:</strong> {data.name_user_booking_field || '--'}
                      </p>
                      <p className="mb-1">
                        <strong>SĐT:</strong> {data.phone || '--'}
                      </p>
                      <p className="mb-0">
                        <strong>Mã đơn:</strong> #{data.order_code || '--'}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h6 className="text-primary">Chi tiết đặt sân</h6>
                      <ListGroup variant="flush">
                        {data?.booking_details?.map((item, index) => (
                          <ListGroup.Item key={index} className="px-0">
                            <div className="d-flex justify-content-between">
                              <span>
                                <strong>Sân {item.sub_field_id}</strong>
                              </span>
                              <span className="text-primary">
                                {formatCurrencyVND(item.total_price)}
                              </span>
                            </div>
                            <div className="text-muted small">
                              {item.date} | {item.start_time} - {item.end_time}
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>

                    <div className="border-top pt-3">
                      <div className="d-flex justify-content-between mb-2">
                        <span>Tổng giờ:</span>
                        <span>
                          <strong>{data.total_hours || 0} giờ</strong>
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Tổng tiền:</span>
                        <span className="text-primary fw-bold">
                          {formatCurrencyVND(data.total_price || 0)}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Cần cọc trước:</span>
                        <span className="text-danger fw-bold">
                          {formatCurrencyVND(data.deposit_price || 0)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* QR Code Modal */}
      <Modal 
        show={showQRModal} 
        onHide={() => setShowQRModal(false)} 
        centered
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Quét mã QR để thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <Image src={QRCodeImage} fluid className="mb-3" />
          <p className="text-muted">
            Sử dụng ứng dụng ngân hàng hoặc MoMo để quét mã
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowQRModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
