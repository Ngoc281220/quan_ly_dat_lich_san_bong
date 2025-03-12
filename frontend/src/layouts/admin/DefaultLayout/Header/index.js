import { FaBell, FaSearch, FaUserCircle, FaMoon } from "react-icons/fa";

function Header() {
  return (
    <div className="admin-header">
      {/* Ô tìm kiếm */}
      <div className="search-box">
        <FaSearch />
        <input type="text" placeholder="Search..." />
      </div>

      {/* Nhóm icon bên phải */}
      <div className="icon-group">
        <FaMoon />
        <FaBell />
        <FaUserCircle className="text-2xl" />
      </div>
    </div>
  );
}

export default Header;
