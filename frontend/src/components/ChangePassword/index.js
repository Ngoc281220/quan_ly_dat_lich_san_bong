import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// Component thay đổi mật khẩu
export default function ChangePassword({ show, onHide, onShow }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      alert('Password changed successfully!');
      // Gọi API hoặc làm các hành động khác ở đây
      onHide();
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <Offcanvas show={show} onHide={onHide} backdrop="static"
    placement="end"
    className="w-100 bg-success p-5">
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

// // Component cha quản lý việc mở/đóng Offcanvas
// function App() {
//   const [show, setShow] = useState(false);

//   const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);

//   return (
//     <div>
//       <Button variant="primary" onClick={handleShow}>
//         Change Password
//       </Button>
//       <ChangePassword show={show} onHide={handleClose} onShow={handleShow} />
//     </div>
//   );
// }

// export default App;
