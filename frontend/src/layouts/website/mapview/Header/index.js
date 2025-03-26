import { useEffect, useState } from "react";
import { Container, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { loadCategory } from "../../../../services/website/header";

function HeaderMap() {
  const [category, setCategory] = useState([]);

  const loadData = async () => {
      try {
        const data = await loadCategory();
        setCategory(data);
      } catch (error) {
        console.error('Lỗi load danh mục sân', error);
      }
  }

  useEffect(() => {
    loadData();
  },[])

  return (
    <Navbar expand="lg" className="header-navbar">
      <Container  fluid className="header-container">
        {/* Ô tìm kiếm */}
        <Form className="search-form">
          <FormControl type="search" placeholder="Tìm kiếm sân quanh đây" className="search-input" />
        </Form>

        {/* Các button filter */}
        <div className="filter-buttons">
          {category.map((item, index) => (
            <Button key={index} variant="outline-primary" className="filter-button">
              {item.name}
            </Button>
          ))}
        </div>
      </Container>
    </Navbar>
  );
}

export default HeaderMap;

