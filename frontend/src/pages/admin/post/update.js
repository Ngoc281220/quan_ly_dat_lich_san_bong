import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { getPostByID, updatePostByID } from '../../../services/admin/post';
import { showToast } from '../../../components/common';

const UpdatePostForm = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updatePostByID(id, formData);
      if (data) {
        showToast('Cập nhât bài viết thành công!');
        setTimeout(() => {
          navigate('/admin/posts');
        }, 2000);
      }
    } catch (error) {
      showToast('Có lỗi xảy ra', 'error');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await getPostByID(id);
        setFormData(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [id]);
  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        <h3 className="text-center mb-3">Tạo bài viết</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData?.title || ''}
              onChange={handleChange}
              placeholder="Nhập tiêu đề bài viết"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tóm tắt</Form.Label>
            <Form.Control
              type="text"
              name="excerpt"
              value={formData?.excerpt || ''}
              onChange={handleChange}
              placeholder="Nhập tóm tắt bài viết"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nội dung</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="content"
              value={formData?.content || ''}
              onChange={handleChange}
              placeholder="Nhập nội dung bài viết"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ngày đăng</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData?.date || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bình luận</Form.Label>
            <Form.Control
              type="text"
              name="comments"
              value={formData?.comments || ''}
              onChange={handleChange}
              placeholder="Nhập số lượng bình luận"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Cập nhật
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default UpdatePostForm;
