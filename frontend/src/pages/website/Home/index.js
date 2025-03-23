import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CommonCard from "../../../components/card";
import { loadListField } from "../../../services/website/home";

function Home() {
  const [cardData, setCardData] = useState([]);

  const loadData = async () => {
    const { data } = await loadListField();
    setCardData([...data]); // ✅ Đúng: Cập nhật với `data`
  };

  useEffect(() => {
    loadData();
  }, []); // ✅ Đúng: Chỉ chạy 1 lần khi component mount

  return (
    <Container fluid className="p-auto">
      <Row>
        {cardData.length > 0 ? (
          cardData.map((data, index) => (
            <Col key={index} md={6}>
              <CommonCard {...data} />
            </Col>
          ))
        ) : (
          <p>KHÔNG CÓ DỮ LIỆU</p>
        )}
      </Row>
    </Container>
  );
}

export default Home;
