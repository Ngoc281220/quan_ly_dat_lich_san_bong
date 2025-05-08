import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { updateField, getFieldById } from '../../../services/admin/fields';
import { showToast } from '../../../components/common';

const UpdateFieldForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [fieldData, setFieldData] = useState({
    name: '',
    category_id: '',
    location: '',
    price: '',
    contact_phone: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getFieldById(id);
      if (data) {
        setFieldData({
          name: data.name || '',
          category_id: data.category_id || '',
          location: data.location || '',
          price: data.price || '',
          contact_phone: data.contact_phone || '',
        });
        setCategories(data.categories || []);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFieldData({ ...fieldData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateField(id, fieldData);
      if (data) {
        showToast('Cập Sân thành công!');
        setTimeout(() => {
            navigate('/admin/fields');
        }, 2000);
      }
    } catch (error) {
      showToast('Có lỗi xảy ra', 'error');
    }
  };

  return (
    <Card
      className="p-4 mt-4 shadow rounded-4"
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      <h4 className="text-center mb-4 fw-bold">Cập nhật thông tin sân</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Tên sân</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={fieldData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Danh mục</Form.Label>
          <Form.Select
            name="category_id"
            value={fieldData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Địa điểm</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={fieldData.location}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Giá thuê (VNĐ)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={fieldData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                name="contact_phone"
                value={fieldData.contact_phone}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button variant="primary" type="submit">
            Cập nhật
          </Button>{' '}
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Quay lại
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default UpdateFieldForm;
