import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { changePass } from '../../services/website/auth';
import { showToast } from '../common';

// Component thay đổi mật khẩu
export default function ChangePassword({ show, onHide, onShow }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPassword === confirmPassword) {
        const params = {
          newPassword,
        };
        const data = await changePass(params);
        if (data) {
          showToast('Thay đổi mật khẩu thành công');
        }
        onHide();
      } else {
        showToast('Mật khẩu không khớp!', 'error');
      }
    } catch (error) {
      showToast('Lỗi hệ thống!', 'error');
    }
  };

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      backdrop="static"
      placement="end"
      className="w-100 bg-success p-5"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Thay đổi mật khẩu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formOldPassword" className="mb-3">
            <Form.Label>Mật khẩu cũ</Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu cũ"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formNewPassword" className="mb-3">
            <Form.Label>Mật khẩu mơi</Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Nhập lại mật khẩu</Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <Button variant="primary" type="submit">
            Cập nhật
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
