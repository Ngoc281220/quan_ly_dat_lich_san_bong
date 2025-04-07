import { Card, Container, Row, Col, Image, Button } from "react-bootstrap";
import { Bell, Trash } from "lucide-react";
const user = {
  name: "Nguyen X",
  avatar: "https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg",
  address: "D. Tôn Thất Tùng, Đông Hòa, Dĩ An, Bình Dương",
  bookings: [
    {
      club: "CLB Cầu Lông TPT Sport - Làng đại học",
      details: "6h30 - 7h, B: 6h30 - 7h | Ngày 28/03/2025",
      address: "D. Tôn Thất Tùng, Đông Hòa, Dĩ An, Bình Dương",
      status: "Hủy do quá giờ thanh toán",
    },
    {
      club: "CLB Pickleball Hoàng Thành Trung",
      details: "Pickleball 1: 5h - 6h, Pickleball 2: 5h - 6h | Ngày 24/03/2025",
      address: "449 Lê Văn Việt quận 9",
      status: "Hủy do quá giờ thanh toán",
    },
  ],
};

function AccountPage() {
  return (
    <Container className="mt-4">
      <Card className="p-4 bg-success text-white">
        <Row className="align-items-center">
          <Col xs={2} className="text-center">
            <Image src={user.avatar} roundedCircle width={80} height={80} />
          </Col>
          <Col xs={8}>
            <h4>{user.name}</h4>
            <p>{user.address}</p>
          </Col>
          <Col xs={2} className="text-end">
            <Bell size={24} />
          </Col>
        </Row>
      </Card>
      <h5 className="mt-4">Lịch đã đặt</h5>
      {user.bookings.map((booking, index) => (
        <Card key={index} className="mt-3 p-3">
          <h6 className="text-success">{booking.club}</h6>
          <p>
            <strong>Chi tiết:</strong> {booking.details}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {booking.address}
          </p>
          <div className="text-end text-danger">
            <Button variant="outline-danger" size="sm">
              {booking.status} <Trash size={16} />
            </Button>
          </div>
        </Card>
      ))}
    </Container>
  );
}

export default AccountPage;
