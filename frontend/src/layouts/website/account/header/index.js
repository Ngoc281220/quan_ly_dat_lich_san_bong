import { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import OffCanvasRegister from '../../../../components/register';
import OffCanvasLoign from '../../../../components/login';
import useAuthStore from '../../../../store';
import Dropdown from 'react-bootstrap/Dropdown';
import ChangePassword from '../../../../components/ChangePassword';
import "animate.css";

function AccountHeader() {
  const { user, logout } = useAuthStore();
  const [isShow, setIsShow] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isShowPass, setShowPass] = useState(false);
  const handleShowPass = () => setShowPass(true);
  const handleClosePass = () => setShowPass(false);
  return (
    <Container fluid className="bg-header-ac">
      <Card className="text-white bg-transparent border-0 mt-3">
        <Card.Body>
          <Card.Title>ALoBO - Đặt lịch online sân thể thao</Card.Title>
          <Card.Text>Tạo tài khoản để dễ dàng quản lý lịch đặt</Card.Text>
          <div className="d-flex justify-content-end postion">
            {user ? (
              // <Button variant="danger" onClick={logout}>
              //   Hiển thị menu
              // </Button>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-user-menu"
                  className="rounded-pill px-4 py-2 shadow-sm fw-semibold text-dark border"
                >
                  👤 Tài khoản
                </Dropdown.Toggle>

                <Dropdown.Menu className="my-2 shadow border-0 rounded-3 animate__animated animate__fadeIn pd-p">
                  {/* <Dropdown.Item href="#/profile" className="py-2">
                    📝 Chỉnh sửa thông tin cá nhân
                  </Dropdown.Item> */}
                  <Dropdown.Item onClick={handleShowPass}  className="py-2">
                    🔒 Thay đổi mật khẩu
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={logout}
                    className="py-2 text-danger fw-semibold"
                  >
                    🚪 Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Button
                  variant="light"
                  className="me-2"
                  onClick={() => setIsLogin(true)}
                >
                  Đăng nhập
                </Button>
                <Button variant="outline-light" onClick={() => setIsShow(true)}>
                  Đăng ký
                </Button>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
      <OffCanvasRegister isShow={isShow} handleClose={() => setIsShow(false)} />
      <OffCanvasLoign isShow={isLogin} handleClose={() => setIsLogin(false)} />
      <ChangePassword show={isShowPass} onHide={handleClosePass} onShow={handleShowPass} />
    </Container>
  );
}

export default AccountHeader;
