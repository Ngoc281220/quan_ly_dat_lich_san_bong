import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Image } from 'react-bootstrap';
import { createPost } from '../../../services/admin/post';
import { showToast } from '../../../components/common';

const CreatePostForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    excerpt: '',
    content: '',
    date: '',
    comments: '',
  });
  const [preview, setPreview] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));

      // Hiển thị ảnh xem trước
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('excerpt', formData.excerpt);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('comments', formData.comments);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      const { data } = await createPost(formDataToSend);
      if (data) {
        showToast("Thêm mới bài viết thành công!");
        setTimeout(() => {
          navigate('/admin/posts');
        }, 2000);
      }
    } catch (error) {
      showToast("Có lỗi xảy ra");
    }
  };

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
              value={formData.title}
              onChange={handleChange}
              placeholder="Nhập tiêu đề bài viết"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hình ảnh</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview && (
              <div className="mt-3 text-center">
                <Image src={preview} alt="Preview" fluid rounded />
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tóm tắt</Form.Label>
            <Form.Control
              type="text"
              name="excerpt"
              value={formData.excerpt}
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
              value={formData.content}
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
              value={formData.date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bình luận</Form.Label>
            <Form.Control
              type="text"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Nhập số lượng bình luận"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Đăng bài
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default CreatePostForm;
