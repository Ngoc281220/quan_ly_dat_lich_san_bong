import {
  FaTachometerAlt, // Bảng điều khiển
  FaFutbol, // Quản lý sân thể thao
  FaUserCircle, // User Profile
  FaUsers, // Quản lý người dùng
  FaNewspaper, // Quản lý bài viết
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Bảng điều khiển",
    icon: <FaTachometerAlt />,
    path: "/admin/dashboard",
  },
  { name: "Quản lý sân thể thao", icon: <FaFutbol />, path: "/admin/fields" },
  // { name: "User Profile", icon: <FaUserCircle />, path: "/profile" },
  { name: "Quản lý người dùng", icon: <FaUsers />, path: "/admin/user" },
  { name: "Quản lý bài viết", icon: <FaNewspaper />, path: "/admin/posts" },
];
function AdminSidebar() {
  return (
    <div
      className={`bg-gray-900 text-white min-h-screen p-4 transition-all admin-sidebar`}
    >
      {/* Logo */}
      <h2 className="text-xl font-bold text-center transition-opacity">
        Admin
      </h2>

      {/* Navigation */}
      <nav className="mt-6 space-y-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className="d-block p-3 rounded-lg transition text-white text-decoration-none"
          >
            <span className="text-xl ">{item.icon}</span>
            <span className="mx-3 transition-all ">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default AdminSidebar;
