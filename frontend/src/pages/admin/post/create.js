import React, { useState } from "react";
import { Container, Form, Button, Card, Image } from "react-bootstrap";
import { createPost } from '../../../services/admin/post';

const CreatePostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    excerpt: "",
    content: "",
    date: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('xx', reader.result);
        setFormData({ ...formData, image_url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
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
            {formData.image_url && (
              <div className="mt-3 text-center">
                <Image src={formData.image_url} alt="Preview" fluid rounded />
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