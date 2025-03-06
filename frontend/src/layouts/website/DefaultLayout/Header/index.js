import { FaSearch } from "react-icons/fa";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
function Header() {
  return (
    <Navbar bg="success" variant="dark" expand="lg" className="px-3 header">
      <Navbar.Brand href="#home">Nguyen Van Ngoc</Navbar.Brand>
      <Form className="d-flex mx-auto" style={{ width: "50%" }}>
        <FormControl type="search" placeholder="Tìm kiếm" className="mr-2" />
        <FaSearch
          className="text-white"
          style={{ marginLeft: "10px", cursor: "pointer" }}
        />
      </Form>
      <Nav>
        <Nav.Link href="#filter">
          <FaSearch />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Header;
