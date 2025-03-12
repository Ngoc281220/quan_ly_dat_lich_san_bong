import {
  FaHome,
  FaCalendar,
  FaTasks,
  FaUser,
  FaTable,
  FaEnvelope,
  FaChartBar,
} from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Bảng điều khiển", icon: <FaHome />, path: "/dashboard" },
  { name: "Calendar", icon: <FaCalendar />, path: "/calendar" },
  { name: "User Profile", icon: <FaUser />, path: "/profile" },
  { name: "Task", icon: <FaTasks />, path: "/tasks" },
  { name: "Tables", icon: <FaTable />, path: "/tables" },
  { name: "Email", icon: <FaEnvelope />, path: "/email" },
  { name: "Charts", icon: <FaChartBar />, path: "/charts" },
];

function AdminSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`bg-gray-900 text-white min-h-screen p-4 transition-all admin-sidebar`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <h2
        className="text-xl font-bold text-center transition-opacity"
      >
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
            <span
              className="mx-3 transition-all "
            >
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default AdminSidebar;
