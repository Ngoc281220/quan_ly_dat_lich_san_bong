import { Container, Row, Col } from "react-bootstrap";
import CommonCard from "../../../components/card";
const cardData = [
  {
    image: "https://rozaco.vn/wp-content/uploads/2022/03/phan-boi-chau-800x378.jpg",
    title: "CLB Cầu Lông TPT Sport - Làng đại học",
    location: "D. Tôn Thất Tùng, Dĩ An, Bình Dương",
    distance: "1.8km",
    time: "06:00 - 22:00",
    phone: "0374857068",
    rating: "5",
    tags: ["Đơn ngày"],
  },
  {
    image: "https://rozaco.vn/wp-content/uploads/2022/03/phan-boi-chau-800x378.jpg",
    title: "NESTWORLD BADMINTON - PICKLEBALL",
    location: "16 Đ. Số 385, Hiệp Phú, Thủ Đức, TP HCM",
    distance: "2.4km",
    time: "05:00 - 22:00",
    phone: "0886264644",
    tags: ["Đơn ngày", "Xé vé"],
  },
  {
    image: "https://img.thegioithethao.vn/media/san-bong-ro/nghe-an/vinh/san-bong-ro-nha-thi-dau-dai-hoc-vinh/san-bong-ro-nha-thi-dau-dai-hoc-vinh-4.webp",
    title: "CLB Cầu Lông TPT Sport - Làng đại học",
    location: "D. Tôn Thất Tùng, Dĩ An, Bình Dương",
    distance: "1.8km",
    time: "06:00 - 22:00",
    phone: "0374857068",
    rating: "5",
    tags: ["Đơn ngày"],
  },
  {
    image: "https://rozaco.vn/wp-content/uploads/2022/03/phan-boi-chau-800x378.jpg",
    title: "NESTWORLD BADMINTON - PICKLEBALL",
    location: "16 Đ. Số 385, Hiệp Phú, Thủ Đức, TP HCM",
    distance: "2.4km",
    time: "05:00 - 22:00",
    phone: "0886264644",
    tags: ["Đơn ngày", "Xé vé"],
  },
  {
    image: "https://img.thegioithethao.vn/media/san-bong-ro/nghe-an/vinh/san-bong-ro-nha-thi-dau-dai-hoc-vinh/san-bong-ro-nha-thi-dau-dai-hoc-vinh-4.webp",
    title: "CLB Cầu Lông TPT Sport - Làng đại học",
    location: "D. Tôn Thất Tùng, Dĩ An, Bình Dương",
    distance: "1.8km",
    time: "06:00 - 22:00",
    phone: "0374857068",
    rating: "5",
    tags: ["Đơn ngày"],
  },
  {
    image: "https://rozaco.vn/wp-content/uploads/2022/03/phan-boi-chau-800x378.jpg",
    title: "NESTWORLD BADMINTON - PICKLEBALL",
    location: "16 Đ. Số 385, Hiệp Phú, Thủ Đức, TP HCM",
    distance: "2.4km",
    time: "05:00 - 22:00",
    phone: "0886264644",
    tags: ["Đơn ngày", "Xé vé"],
  },
  {
    image: "https://rozaco.vn/wp-content/uploads/2022/03/phan-boi-chau-800x378.jpg",
    title: "NESTWORLD BADMINTON - PICKLEBALL",
    location: "16 Đ. Số 385, Hiệp Phú, Thủ Đức, TP HCM",
    distance: "2.4km",
    time: "05:00 - 22:00",
    phone: "0886264644",
    tags: ["Đơn ngày", "Xé vé"],
  },
  {
    image: "https://img.thegioithethao.vn/media/san-bong-ro/nghe-an/vinh/san-bong-ro-nha-thi-dau-dai-hoc-vinh/san-bong-ro-nha-thi-dau-dai-hoc-vinh-4.webp",
    title: "CLB Cầu Lông TPT Sport - Làng đại học",
    location: "D. Tôn Thất Tùng, Dĩ An, Bình Dương",
    distance: "1.8km",
    time: "06:00 - 22:00",
    phone: "0374857068",
    rating: "5",
    tags: ["Đơn ngày"],
  },
  {
    image: "https://rozaco.vn/wp-content/uploads/2022/03/phan-boi-chau-800x378.jpg",
    title: "NESTWORLD BADMINTON - PICKLEBALL",
    location: "16 Đ. Số 385, Hiệp Phú, Thủ Đức, TP HCM",
    distance: "2.4km",
    time: "05:00 - 22:00",
    phone: "0886264644",
    tags: ["Đơn ngày", "Xé vé"],
  },
];

function Home() {
  return (
    <Container fluid className="p-auto">
      <Row>
        {cardData.map((data, index) => (
          <Col key={index} md={6}>
            <CommonCard {...data} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
