import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { detaiField } from "../../../services/admin/fields";
import { Container, Card, Button } from "react-bootstrap";

const FieldDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [field, setField] = useState(null);

  useEffect(() => {
    const fetchFieldDetail = async () => {
      try {
        const response = await detaiField(id);
        setField(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sân:", error);
      }
    };

    fetchFieldDetail();
  }, [id]);

  if (!field) return <p className="text-center mt-4">Đang tải...</p>;

  return (
    <Container>
      <h2 className="my-4 text-center">{field.name}</h2>

      <Card>
        <Card.Body>
          <Card.Text><strong>Loại sân:</strong> {field.category}</Card.Text>
          <Card.Text><strong>Giá thuê:</strong> {field.price}</Card.Text>
          <Card.Text><strong>Địa chỉ:</strong> {field.location}</Card.Text>
          <Card.Text>
            <strong>Thời gian mở cửa:</strong> {field.open_time} - {field.close_time}
          </Card.Text>
          <Card.Text>
            <strong>Trạng thái:</strong> <span className={`badge ${field.status === "active" ? "bg-success" : "bg-secondary"}`}>{field.status === "active" ? "Hoạt động" : "Không hoạt động"}</span>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Hiển thị hình ảnh */}
      <div className="d-flex flex-wrap mt-4">
        {field.images.length > 0 ? (
          field.images.map((img, index) => (
            <img key={index} src={img} alt={`Sân ${field.name}`} className="img-thumbnail m-2" style={{ width: "200px", height: "150px" }} />
          ))
        ) : (
          <p>Không có hình ảnh</p>
        )}
      </div>

      <div className="mt-4">
        <Button href="/admin/fields" variant="primary">Quay lại</Button>
      </div>
    </Container>
  );
};

export default FieldDetail;
