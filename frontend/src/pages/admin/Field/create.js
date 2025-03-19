import { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import CommonInput from "../../../components/input";
import { getListCategory, createField } from "../../../services/admin/fields";
import { showToast } from "../../../components/common";

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
  const [errors, setErrors] = useState({});
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
          formDataToSend.append("images[]", item);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
    try {
      await createField(formDataToSend);
      showToast("🚀 Thêm sân thành công!", "success");
      setTimeout(() => {
        // navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
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
              error={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
            <CommonInput
              type="select"
              label="Loại sân"
              onChange={handleChange("category_id")}
              options={categoryFields}
              error={!!errors.category_id}
            />
            <Form.Control.Feedback type="invalid">
              {errors.category_id}
            </Form.Control.Feedback>
            <CommonInput
              type="text"
              label="Địa chỉ"
              value={formData.location}
              onChange={handleChange("location")}
              error={!!errors.location}
            />
            <Form.Control.Feedback type="invalid">
              {errors.location}
            </Form.Control.Feedback>
            <CommonInput
              type="text"
              label="Giá thuê theo giời"
              value={formData.price}
              onChange={handleChange("price")}
              error={!!errors.price}
            />
            
            <Form.Control.Feedback type="invalid">
              {errors.price[0]}
            </Form.Control.Feedback>
            <CommonInput
              type="text"
              label="Số điện thoại liên hệ"
              value={formData.contact_phone}
              onChange={handleChange("contact_phone")}
              error={!!errors.contact_phone}
              max={10}
            />
            <Form.Control.Feedback type="invalid">
              {errors.contact_phone}
            </Form.Control.Feedback>
            <CommonInput
              type="text"
              label="Mô tả"
              value={formData.description}
              onChange={handleChange("description")}
              error={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
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
