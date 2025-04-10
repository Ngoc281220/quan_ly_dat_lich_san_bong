import { useState, useEffect } from 'react';
import QRCodeImage from '../../../assets/image/QRCODE.png';
import { useParams } from 'react-router-dom';
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
} from 'react-bootstrap';

export default function PaymentPage() {
  const { order_code } = useParams();
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState({});

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const loadData = async () => {
    try {
      const { data } = await getBookingByOrderCode(order_code);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
  }, [order_code]);

  const handlePaymentMomo = async () => {
    try {
      const total_price = data.total_price;
      const order_code = data.order_code;
      const response = await paymentMomo({ total_price, order_code });
      if (response.data && response.data.payUrl) {
        // Chuyển hướng người dùng đến trang thanh toán Momo
        window.location.href = response.data.payUrl;
      } else {
        console.log('Không có URL thanh toán từ Momo');
      }
      console.log('respone', response);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentCard = async () => {
    try {
      const formData = new FormData();
      formData.append('image_payment', selectedFile);
      formData.append('order_code', data.order_code);
      formData.append('amount', data.total_price);
      const respone = await paymentCard(formData);
      if (respone.data) {
        showToast('Thanh toán thành công');
      }
      else
      {
        showToast('Thanh toán thất bại');
      }
    } catch (error) {
      showToast('Thanh toán thất bại');
    }
  };
  return (
    <Container fluid className="bg-green text-white min-vh-100 p-4">
      <Row>
        {/* Thông tin tài khoản ngân hàng */}
        <Col md={8}>
          <Card className="p-3 custom-card">
            <div className="d-flex justify-content-between">
              <div>
                <h5 className="text-warning">1. Tài khoản ngân hàng</h5>
                <p>
                  <strong>Tên tài khoản:</strong> Truong Hai Trieu
                </p>
                <p>
                  <strong>Số tài khoản:</strong> 8844472165
                </p>
                <p>
                  <strong>Ngân hàng:</strong> BIDV
                </p>
              </div>
              <div>
                <h5 className="text-warning text-end">Thanh toán</h5>
                <div className="d-flex justify-content-end my-3">
                  {/* Thanh toán bằng MoMo */}
                  <div className="text-center mt-3">
                    <Button
                      variant="danger"
                      size="lg"
                      className="custom-button mx-3 fs-14"
                      onClick={handlePaymentMomo}
                    >
                      Thanh toán MoMo
                    </Button>
                  </div>
                  <Image
                    src={QRCodeImage}
                    width={100}
                    height={100}
                    className="qr-image"
                    onClick={() => setShowQRModal(true)}
                  />
                </div>
              </div>
            </div>
            <div className="alert alert-warning text-dark custom-alert">
              Vui lòng chuyển khoản <strong>20.000 đ</strong> và gửi ảnh vào ô
              bên dưới để hoàn tất đặt lịch!
            </div>
            <p>
              Đơn của bạn còn được giữ chỗ trong{' '}
              <strong className="text-danger">04:57</strong>
            </p>
          </Card>

          {/* Khu vực tải ảnh */}
          <Row className="mt-3">
            <Col md={6} className="d-flex justify-content-center">
              <Card className="p-3 text-center w-100 custom-upload-card">
                <Form.Group>
                  <Form.Label className="text-muted">
                    Nhấn vào để tải hình thanh toán (*)
                  </Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
              </Card>
            </Col>
          </Row>
          <div className="text-center mt-4">
            <Button
              variant="warning"
              size="lg"
              onClick={handlePaymentCard}
              className="custom-button w-100"
            >
              XÁC NHẬN ĐẶT
            </Button>
          </div>
        </Col>

        {/* Thông tin đơn hàng & Thanh toán */}
        <Col md={4}>
          <Card className="p-3 custom-card">
            <p>
              <strong>Tên:</strong> {data.name_user_booking_field}
            </p>
            <p>
              <strong>SDT:</strong> {data.phone}
            </p>
            <p>
              <strong>Mã đơn:</strong> #{data.order_code}
            </p>
            <p>
              <strong>Chi tiết đơn:</strong>
            </p>
            <ul>
              {data &&
                data.booking_details &&
                data.booking_details.map((item, index) => {
                  return (
                    <li key={index}>
                      {`Sân: ${item.sub_field_id}, Thời gian: ${item.start_time} - ${item.end_time}, Ngày đặt: ${item.date}`}
                    </li>
                  );
                })}
            </ul>
            <p>
              <strong>Tổng giờ:</strong> {data.total_hours}
            </p>
            <p>
              <strong>Tổng đơn:</strong> {formatCurrencyVND(data.total_price)}
            </p>
            <p>
              <strong>Cần cọc:</strong> {formatCurrencyVND(data.deposit_price)}
            </p>
          </Card>
        </Col>
      </Row>

      {/* Nút xác nhận */}

      {/* Modal hiển thị QR Code lớn */}
      <Modal show={showQRModal} onHide={() => setShowQRModal(false)} centered>
        <Modal.Body className="text-center">
          <h5>Quét mã QR để thanh toán</h5>
          <Image src={QRCodeImage} width={200} height={200} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowQRModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
