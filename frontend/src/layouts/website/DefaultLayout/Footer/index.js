import { Container, Row, Col } from "react-bootstrap";
import { FaHome, FaMap, FaFileAlt, FaUser } from "react-icons/fa";
function Footer() {
  return (
    <footer className="footer bg-success text-white py-3 fixed-bottom">
      <Container fluid>
        <Row className="text-center">
          <Col>
            <FaHome size={24} color="#FFC107" />
            <div className="mt-1">Trang chủ</div>
          </Col>
          <Col>
            <FaMap size={24} color="white" />
            <div className="mt-1">Bản đồ</div>
          </Col>
          <Col>
            <FaFileAlt size={24} color="white" />
            <div className="mt-1">Nổi bật</div>
          </Col>
          <Col>
            <FaUser size={24} color="white" />
            <div className="mt-1">Tài khoản</div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
export default Footer;
