import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import useAuthStore from '../../../../store';

function Header() {
  const { user, logout } = useAuthStore();
  return (
    <div className="admin-header">
      {/* Ô tìm kiếm */}
      <div className="search-box">
        <FaSearch />
        <input type="text" placeholder="Search..." />
      </div>

      {/* Nhóm icon bên phải */}
      <div className="icon-group">
        {/* <FaMoon />
        <FaBell /> */}
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="link"
            bsPrefix="p-0 border-0 bg-transparent"
          >
            <FaUserCircle className="text-2xl" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={logout} >Đăng xuất</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
