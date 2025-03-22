import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { detaiField } from "../../../services/admin/fields";
import { Container, Card, Button } from "react-bootstrap";
import { STATUS_FIELD } from "../../../const";

function statusField(status) {
  if (status === STATUS_FIELD.ACTIVE) {
    // return "Hoạt động";
    return (
      <Badge bg="success" title="Hoạt động">
        Hoạt động
      </Badge>
    );
  } else if (status === STATUS_FIELD.MAINTENANCE) {
    return (
      <Badge bg="warning" title="Đang bảo trì">
        Đang bảo trì
      </Badge>
    );
  } else {
    return (
      <Badge bg="secondary" title="Ngừng hoạt động">
        Ngừng hoạt động
      </Badge>
    );
  }
}
const FieldDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [field, setField] = useState(null);

  useEffect(() => {
    const fetchFieldDetail = async () => {
      try {
        const { data } = await detaiField(id);
        setField(data);
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
          <Card.Text>
            <strong>Loại sân:</strong> {field.category_name}
          </Card.Text>
          <Card.Text>
            <strong>Giá thuê:</strong> {field.price}
          </Card.Text>
          <Card.Text>
            <strong>Địa chỉ:</strong> {field.location}
          </Card.Text>
          <Card.Text>
            <strong>Thời gian mở cửa:</strong> {field.open_time} -{" "}
            {field.close_time}
          </Card.Text>
          <Card.Text>
            <strong>Trạng thái:</strong>{" "}
            {statusField(field.status)}
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Hiển thị hình ảnh */}
      <div className="d-flex flex-wrap mt-4">
        {field.image.length > 0 ? (
          field.image.map((img, index) => (
            <img
              key={index}
              src={img.path}
              alt={`Sân ${field.name}`}
              className="img-thumbnail m-2"
              style={{ width: "200px", height: "150px" }}
            />
          ))
        ) : (
          <p>Không có hình ảnh</p>
        )}
      </div>

      <div className="mt-4">
        <Button href="/admin/fields" variant="primary">
          Quay lại
        </Button>
      </div>
    </Container>
  );
};

export default FieldDetail;
