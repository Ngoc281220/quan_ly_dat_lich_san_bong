import { useState } from 'react';
import QRCodeImage from '../../../assets/image/QRCODE.png';
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
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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
            <Button variant="warning" size="lg" className="custom-button w-100">
              XÁC NHẬN ĐẶT
            </Button>
          </div>
        </Col>

        {/* Thông tin đơn hàng & Thanh toán */}
        <Col md={4}>
          <Card className="p-3 custom-card">
            <p>
              <strong>Tên:</strong> Nguyen Van Ngoc
            </p>
            <p>
              <strong>SDT:</strong> 0821113345
            </p>
            <p>
              <strong>Mã đơn:</strong> #7314
            </p>
            <p>
              <strong>Chi tiết đơn:</strong>
            </p>
            <ul>
              <li>D: 11h30 - 12h00</li>
              <li>E: 11h30 - 12h00</li>
            </ul>
            <p>
              <strong>Tổng đơn:</strong> 40.000 đ
            </p>
            <p>
              <strong>Cần cọc:</strong> 20.000 đ
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
