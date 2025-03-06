import { FaCalendarCheck, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { Navbar, Nav } from "react-bootstrap";
function Footer() {
  return (
    <Navbar
      fixed="bottom"
      bg="success"
      variant="dark"
      className="justify-content-around footer"
    >
      <Nav.Link href="#home" className="text-white">
        <FaMapMarkerAlt /> Trang chủ
      </Nav.Link>
      <Nav.Link href="#highlight" className="text-white">
        <FaCalendarCheck /> Nổi bật
      </Nav.Link>
      <Nav.Link href="#account" className="text-white">
        <FaUser /> Tài khoản
      </Nav.Link>
    </Navbar>
  );
}
export default Footer;
