// import {
//   FaTachometerAlt, // Bảng điều khiển
//   FaFutbol, // Quản lý sân thể thao
//   FaUsers, // Quản lý người dùng
//   FaNewspaper, // Quản lý bài viết
//   FaTags,
//   FaCalendarAlt 
// } from 'react-icons/fa';

// import { NavLink } from 'react-router-dom';

// const menuItems = [
//   {
//     name: 'Bảng điều khiển',
//     icon: <FaTachometerAlt />,
//     path: '/admin/dashboard',
//   },
//   { name: 'Quản lý danh mục sân', icon: <FaTags />, path: '/admin/categories' },
//   { name: 'Quản lý sân thể thao', icon: <FaFutbol />, path: '/admin/fields' },
//   { name: 'Quản lý người dùng', icon: <FaUsers />, path: '/admin/user' },
//   { name: 'Quản lý đặt sân', icon: <FaCalendarAlt />, path: '/admin/booking-field' },
//   { name: 'Quản lý bài viết', icon: <FaNewspaper />, path: '/admin/posts' },
// ];
// function AdminSidebar() {
//   return (
//     <div
//       className={`bg-gray-900 text-white min-h-screen p-4 transition-all admin-sidebar`}
//     >
//       {/* Logo */}
//       <h2 className="text-xl font-bold text-center transition-opacity">
//         Admin
//       </h2>

//       {/* Navigation */}
//       <nav className="mt-6 space-y-3">
//         {menuItems.map((item) => (
//           <NavLink
//             key={item.name}
//             to={item.path}
//             className="d-block p-3 rounded-lg transition text-white text-decoration-none"
//           >
//             <span className="text-xl ">{item.icon}</span>
//             <span className="mx-3 transition-all ">{item.name}</span>
//           </NavLink>
//         ))}
//       </nav>
//     </div>
//   );
// }

// export default AdminSidebar;

import {
  FaTachometerAlt,
  FaFutbol,
  FaUsers,
  FaNewspaper,
  FaTags,
  FaCalendarAlt,
  FaChevronRight
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../../../../assets/styles/AdminSidebar.scss'; // Create this CSS file

const menuItems = [
  {
    name: 'Bảng điều khiển',
    icon: <FaTachometerAlt />,
    path: '/admin/dashboard',
  },
  { 
    name: 'Quản lý danh mục sân', 
    icon: <FaTags />, 
    path: '/admin/categories' 
  },
  { 
    name: 'Quản lý sân thể thao', 
    icon: <FaFutbol />, 
    path: '/admin/fields' 
  },
  { 
    name: 'Quản lý người dùng', 
    icon: <FaUsers />, 
    path: '/admin/user' 
  },
  { 
    name: 'Quản lý đặt sân', 
    icon: <FaCalendarAlt />, 
    path: '/admin/booking-field' 
  },
  { 
    name: 'Quản lý bài viết', 
    icon: <FaNewspaper />, 
    path: '/admin/posts' 
  },
];

function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      {/* Logo Section */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">Quản trị hệ thống</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `menu-item ${isActive ? 'active' : ''}`
            }
          >
            <div className="menu-icon">
              {item.icon}
            </div>
            <span className="menu-text">{item.name}</span>
            <div className="menu-arrow">
              <FaChevronRight size={12} />
            </div>
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            <img 
              src="https://ui-avatars.com/api/?name=Admin&background=4e73df&color=fff" 
              alt="Admin" 
            />
          </div>
          <div className="user-details">
            <span className="user-name">Quản trị viên</span>
            <span className="user-role">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;