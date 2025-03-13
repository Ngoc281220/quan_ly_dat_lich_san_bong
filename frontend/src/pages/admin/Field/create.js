import { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { Row, Col } from "react-bootstrap";
import CommonInput from "../../../components/input";
import { getListCategory } from "../../../services/admin/fields";

function CreateFields() {
  const [categoryFields, setCategoryFields] = useState([]);

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
  return (
    <div>
      <Row>
        <Col className="mx-auto" md={8}>
          <h3 className="py-3 text-center">Thêm sân</h3>
          <Form className="p-4 br-radius">
            <CommonInput type="text" label="Mã sân" />
            <CommonInput type="text" label="Tên sân" />
            <CommonInput
              type="select"
              label="Loại sân"
              options={categoryFields}
            />
            <CommonInput type="text" label="Địa chỉ" />
            <CommonInput type="text" label="Giá thuê theo giời" />
            <CommonInput type="text" label="Số điện thoại liên hệ" />
            <CommonInput type="textarea" label="Mô tả" />
            <CommonInput type="file" label="Hình ảnh" />
            <Button variant="primary" className="my-3 w-100">Thêm</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default CreateFields;
