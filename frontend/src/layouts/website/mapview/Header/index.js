import { Container, Navbar, Form, FormControl, Nav, Button } from "react-bootstrap";
import { FaSearch, FaHome, FaMap, FaStar, FaUser } from "react-icons/fa";
function HeaderMap() {
  return (
    <>
      <Navbar bg="light" expand="lg" className="p-3">
        <Container>
          <Form className="d-flex flex-grow-1">
            <FormControl
              type="search"
              placeholder="Tìm kiếm sân quanh đây"
              className="me-2"
            />
            <Button variant="outline-success">
              <FaSearch />
            </Button>
          </Form>
        </Container>
      </Navbar>
      <Container className="filter-container">
        {[
          "Sân pickleball",
          "Sân cầu lông",
          "Sân bóng đá",
          "Sân tennis",
          "Sân bóng chuyền",
        ].map((item, index) => (
          <Button key={index} variant="outline-primary" className="m-1">
            {item}
          </Button>
        ))}
      </Container>
    </>
  );
}

export default HeaderMap;
