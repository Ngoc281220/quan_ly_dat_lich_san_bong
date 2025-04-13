import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Form, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { login } from "../../services/website/auth";
import useAuthStore from "../../store";
import { showToast } from "../common";
import "../../assets/styles/RegisterForm.scss";
import { PERMISSION } from "../../const";
import OffCanvasRegister from "../register";


function OffCanvasLoign({ isShow, handleClose }) {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [show, setShow] = useState(isShow);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showLoading, setShowLoading] = useState(false);
  const [isShowRegister, setIsShowRegister] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email";
    }
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      //   console.log("Đăng ký thành công", formData);
    }
    setShowLoading(true);
    try {
      const { data } = await login(formData);
      if (data) {
        const { user, access_token } = data;
        setUser(user, access_token);
        showToast("🚀 Đăng nhập thành công!", "success");
        setTimeout(() => {
          if (user && user.role === PERMISSION.ROLE_ADMIN) {
            navigate("/admin/dashboard");
          }
          else {
            navigate("/");
          }
        }, 2000);
      }
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      }
    } finally {
      setShowLoading(false);
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
            <h2 className="text-header fs-3">Đăng nhập</h2>
            <p className="text-title">ALOBO - Đặt lịch online sân thể thao</p>
            <Form.Group className="mt-5">
              <Form.Label className="lable-color">Email</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                name="email"
                placeholder="Nhập email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label className="lable-color">Mật khẩu</Form.Label>
              <Form.Control
                size="lg"
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type="submit"
              size="lg"
              className="w-100 mt-4 py-2 btn-regsiter"
            >
              {showLoading ? (
                <>
                  <Spinner animation="border" size="md" className="me-2" />
                </>
              ) : (
                "Đăng nhập"
              )}
            </Button>
            <p className="mt-4 text-center">
              Bạn chưa có tài khoản?{" "}
              <a className="text-login" onClick={() => setIsShowRegister(true)}>
                Đăng ký ngay
              </a>
            </p>
          </Form>
        </div>
        <OffCanvasRegister isShow={isShowRegister} handleClose={() => setIsShowRegister(false)} />
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default OffCanvasLoign;
