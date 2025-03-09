import { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import OffCanvasRegister from "../../../../components/register";
import OffCanvasLoign from "../../../../components/login";

function AccountHeader() {
  const [isShow, setIsShow] = useState(false);
  return (
    <Container fluid className="bg-header-ac">
      <Card className="text-white bg-transparent border-0 mt-3">
        <Card.Body>
          <Card.Title>ALoBO - Đặt lịch online sân thể thao</Card.Title>
          <Card.Text>Tạo tài khoản để dễ dàng quản lý lịch đặt</Card.Text>
          <div className="d-flex justify-content-end">
            <Button variant="light" className="me-2" onClick={() => setIsShow(true)}>
              Đăng nhập
            </Button>
            <Button variant="outline-light" onClick={() => setIsShow(true)}>
              Đăng ký
            </Button>
          </div>
        </Card.Body>
      </Card>
      <OffCanvasRegister isShow={isShow} handleClose={() => setIsShow(false)} />
      <OffCanvasLoign isShow={isShow} handleClose={() => setIsShow(false)} />
    </Container>
  );
}

export default AccountHeader;
