import { useEffect, useState, useCallback } from 'react';
import {
  Container,
  Navbar,
  Form,
  FormControl,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { debounce } from 'lodash';
import { loadCategory } from '../../../../services/website/header';
import CommonCard from '../../../../components/card';
import { search, searchCategory } from '../../../../services/website/home';

function HeaderMap() {
  const [category, setCategory] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [keyword, setKeyWord] = useState('');

  const loadData = async () => {
    try {
      const data = await loadCategory();
      setCategory(data);
    } catch (error) {
      console.error('Lỗi load danh mục sân', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Debounce search để tránh gọi API liên tục
  const debouncedSearch = useCallback(
    debounce(async (value) => {
      if (value.trim() !== '') {
        const { data } = await search(value);
        setCardData(data);
      } else {
        setCardData([]);
      }
    }, 300),
    [],
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setKeyWord(value);
    setShowResult(value.trim() !== '');
    debouncedSearch(value);
  };

  const handleButton = async (e) => {
    setKeyWord("");
    const val = e.target.textContent.trim();
    setKeyWord(val);
    const { data } = await searchCategory(val);
    setCardData(data);
    setShowResult(true);
  };

  return (
    <Navbar expand="lg" className="header-navbar">
      <Container fluid className="header-container">
        {/* Ô tìm kiếm */}
        <Form className="search-form">
          <FormControl
            type="search"
            placeholder="Tìm kiếm sân quanh đây"
            className="search-input"
            value={keyword}
            onChange={handleSearch}
          />
        </Form>

        {/* Các button filter */}
        <div className="filter-buttons mt-2">
          {category.map((item, index) => (
            <Button
              key={index}
              variant="outline-primary"
              className="filter-button me-2 mb-2"
              onClick={handleButton}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </Container>

      {/* Hiển thị kết quả */}
      {showResult && (
        <div className="map_search p-3">
          {cardData.length === 0 ? (
            <div className="text-center fs-5 py-5">Không có dữ liệu</div>
          ) : (
            <Row>
              {cardData.map((data, index) => (
                <Col key={index} className="mb-3">
                  <CommonCard {...data} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}
    </Navbar>
  );
}

export default HeaderMap;
