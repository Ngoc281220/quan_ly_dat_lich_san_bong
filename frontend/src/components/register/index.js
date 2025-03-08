import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Form, Button } from "react-bootstrap";
import "../../assets/styles/RegisterForm.scss";

function OffCanvasRegister({ isShow, handleClose }) {
  const [show, setShow] = useState(isShow);
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.email) {
        newErrors.email = "Vui lòng nhập email";
    }
    if (!formData.full_name) {
        newErrors.full_name = "Vui lòng nhập họ tên";
    }
    if (!formData.phone) {
        newErrors.phone = "Vui lòng số điện thoại";
    }
    if (!formData.password) {
        newErrors.password = "Vui lòng nhập mật khẩu";
    }
    if (!formData.confirm_password) {
        newErrors.confirm_password = "Vui lòng xác nhận mật khẩu";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Đăng ký thành công", formData);
    }
  };
  useEffect(() => {
    setShow(isShow);
  }, [isShow]);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      backdrop="static"
      placement="end"
      className="w-100 bg-success p-5"
    >
      <Offcanvas.Body>
        <div className="register-container ">
          <div className="text-end">
            <Button
              type="button"
              className="btn-close btn"
              variant="link"
              aria-label="Close"
              onClick={handleClose}
            />
          </div>
          <Form onSubmit={handleSubmit} className="register-form">
            <h2 className="text-header fs-3">Đăng ký</h2>
            <p className="text-title">ALOBO - Đặt lịch online sân thể thao</p>
            <Form.Group className="mt-5">
              <Form.Label className="lable-color">Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label className="lable-color">Tên đầy đủ</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                isInvalid={!!errors.full_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.full_name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label className="lable-color">Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
                maxLength={12}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label className="lable-color">Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label className="lable-color">Nhập lại mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                isInvalid={!!errors.confirm_password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirm_password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-100 mt-4 py-2 btn-regsiter">
              Đăng ký
            </Button>
            <p className="mt-4 text-center">
              Bạn đã có tài khoản? <a href="/login" className="text-login">Đăng nhập</a>
            </p>
          </Form>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default OffCanvasRegister;
