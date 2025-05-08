import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getUserById, updateUserByID } from '../../../services/admin/user';
import { showToast } from '../../../components/common';

const EditUserForm = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: '',
    name: '',
    phone: '',
    date_of_birth: '',
    address: '',
    gender: '',
  });
  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await getUserById(id);
        setForm(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateUserByID(id, form);
      if (data) {
        showToast('Cập nhât người dùng  thành công!');
        setTimeout(() => {
          navigate('/admin/user');
        }, 2000);
      }
    } catch (error) {
      showToast('Có lỗi xảy ra', 'error');
    }
  };

  return (
    <Card className="p-4">
      <h3>Cập nhật thông tin người dùng</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Ngày sinh</Form.Label>
          <Form.Control
            type="date"
            name="date_of_birth"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Lưu
        </Button>
      </Form>
    </Card>
  );
};

export default EditUserForm;
