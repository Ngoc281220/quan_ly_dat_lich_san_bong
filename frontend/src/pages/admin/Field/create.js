import { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import CommonInput from "../../../components/input";
import { getListCategory } from "../../../services/admin/fields";

function CreateFields() {
  const [categoryFields, setCategoryFields] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category_id: null,
    location: "",
    price: "",
    contact_phone: "",
    description: "",
    image: null,
  });
  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await getListCategory();
      setCategoryFields(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách loại sân:", error);
    }
  }, []);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      // Giả sử có API `createField` để gửi dữ liệu lên server
      const response = await fetch("/api/fields", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      console.log("Kết quả:", result);
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };
  return (
    <div>
      <Row>
        <Col className="mx-auto" md={8}>
          <h3 className="py-3 text-center">Thêm sân</h3>
          <Form className="p-4 br-radius">
            <CommonInput
              type="text"
              max={50}
              label="Tên sân"
              value={formData.name}
              onChange={handleChange("name")}
            />
            <CommonInput
              type="select"
              label="Loại sân"
              onChange={handleChange("category_id")}
              options={categoryFields}
            />
            <CommonInput
              type="text"
              label="Địa chỉ"
              value={formData.location}
              onChange={handleChange("location")}
            />
            <CommonInput
              type="text"
              label="Giá thuê theo giời"
              value={formData.price}
              onChange={handleChange("price")}
            />
            <CommonInput
              type="text"
              label="Số điện thoại liên hệ"
              value={formData.contact_phone}
              onChange={handleChange("contact_phone")}
            />
            <CommonInput
              type="textarea"
              label="Mô tả"
              value={formData.description}
              onChange={handleChange("description")}
            />
            <CommonInput
              type="file"
              label="Hình ảnh"
              onChange={handleFileChange}
            />
            <Button type="submit" variant="primary" className="my-3 w-100">
              Thêm
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default CreateFields;
