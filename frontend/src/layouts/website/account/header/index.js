import { Container, Card, Button } from "react-bootstrap";

function AccountHeader() {
  return (
    <Container fluid className="bg-header-ac">
      <Card className="text-white bg-transparent border-0 mt-3">
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

export default AccountHeader;
