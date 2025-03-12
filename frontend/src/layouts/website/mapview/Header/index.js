import { Container, Navbar, Form, FormControl, Button } from "react-bootstrap";

function HeaderMap() {
  return (
    <Navbar expand="lg" className="header-navbar">
      <Container  fluid className="header-container">
        {/* Ô tìm kiếm */}
        <Form className="search-form">
          <FormControl type="search" placeholder="Tìm kiếm sân quanh đây" className="search-input" />
        </Form>

        {/* Các button filter */}
        <div className="filter-buttons">
          {[
            "Sân pickleball",
            "Sân cầu lông",
            "Sân bóng đá",
            "Sân tennis",
            "Sân bóng chuyền",
            "Sân bóng rổ",
            "Sân phức hợp",
            "Sân golf",
          ].map((item, index) => (
            <Button key={index} variant="outline-primary" className="filter-button">
              {item}
            </Button>
          ))}
        </div>
      </Container>
    </Navbar>
  );
}

export default HeaderMap;

