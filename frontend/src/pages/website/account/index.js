import { Container, Card, Button } from "react-bootstrap";

function AccountPage() {
  return (
    <Container fluid className="flex-grow-1 text-center py-3 bg-success h-100">
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
            <br /> Địa chỉ: 449 Lê Văn Việt quận 9 (bên trong trường Đào tạo bồi
            dưỡng Nghiệp vụ Kiểm sát)
          </Card.Text>
          <Button variant="danger" size="sm">
            Hủy do quá giờ thanh toán
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AccountPage;
