import { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import CommonInput from "../../../components/input";
import { getListCategory, createField } from "../../../services/admin/fields";

function CreateFields() {
  const [categoryFields, setCategoryFields] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category_id: null,
    location: "",
    price: "",
    contact_phone: "",
    description: "",
    images: [], // Chọn nhiều ảnh
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
    const selectedFiles = Array.from(event.target.files); // Chuyển FileList thành mảng
    setFormData({ ...formData, images: selectedFiles });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        
        formData.images.forEach((item, index) => {
          formDataToSend.append("images[]", item)
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
    try {
      console.log("Kết quả:", formDataToSend);
      const data = await createField(formDataToSend);
      console.log("Kết quả:", data);
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  return (
    <div>
      <Row>
        <Col className="mx-auto" md={8}>
          <h3 className="py-3 text-center">Thêm sân</h3>
          <Form className="p-4 br-radius" onSubmit={handleSubmit}>
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

            {/* Input chọn nhiều ảnh */}
            <Form.Group className="my-2">
              <Form.Label className="text-gray-700">Hình ảnh</Form.Label>
              <Form.Control type="file" multiple onChange={handleFileChange} />
            </Form.Group>

            {/* Hiển thị danh sách ảnh đã chọn */}
            {formData.images.length > 0 && (
              <div className="mt-3">
                <h5>Hình ảnh đã chọn:</h5>
                <div className="d-flex flex-wrap gap-2">
                  {formData.images.map((file, index) => (
                    <div key={index} className="border p-2">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        width="100"
                        height="100"
                      />
                      <p className="text-center small">{file.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
