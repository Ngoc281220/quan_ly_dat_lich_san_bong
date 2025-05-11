import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { showToast } from '../../../components/common';
import {
  findCategory,
  updateCategoryById,
} from '../../../services/admin/categories';

export default function UpdateCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', description: '' });
  const [errors, setErrors] = useState({});

  const loadData = async () => {
    const { data } = await findCategory(id);
    setForm(data);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCategoryById(form, id);
      showToast('🚀 Cập nhật danh mục thành công!', 'success');
      setTimeout(() => {
        navigate('/admin/categories');
      }, 2000);
    } catch (error) {
      if (error?.errors) {
        setErrors(error?.errors);
      } else {
        showToast('❌ Có lỗi xảy ra!', 'error');
      }
    }
  };

  return (
    <Container className="pt-4 pb-5">
      <Row>
        <Col className="mx-auto" md={8}>
          <h3 className="py-3 text-center">Thêm Danh Mục</h3>
          <Form onSubmit={handleSubmit} className="p-4 br-radius">
            <Form.Group className="mb-3">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nhập tên danh mục"
                required
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Nhập mô tả"
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Lưu
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
