import { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import OffCanvasRegister from '../../../../components/register';
import OffCanvasLoign from '../../../../components/login';
import useAuthStore from '../../../../store';

function AccountHeader() {
  const { user, logout } = useAuthStore();
  const [isShow, setIsShow] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <Container fluid className="bg-header-ac">
      <Card className="text-white bg-transparent border-0 mt-3">
        <Card.Body>
          <Card.Title>ALoBO - Đặt lịch online sân thể thao</Card.Title>
          <Card.Text>Tạo tài khoản để dễ dàng quản lý lịch đặt</Card.Text>
          <div className='d-flex justify-content-end'>
            {user ? (
              <Button variant="danger" onClick={logout}>
                Đăng xuất
              </Button>
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
    </Container>
  );
}

export default AccountHeader;
