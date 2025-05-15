// import Header from "./Header";
// import AdminSidebar from "./Sidebar";
// import "../../../assets/styles/adminForm.scss";

// function DefaultLayoutAdmin({ children }) {
//   return (
//     <div className="admin-layout">
//       {/* Sidebar */}
//       <AdminSidebar />

//       {/* Nội dung chính */}
//       <div className="admin-main">
//         <Header />
//         <div className="admin-content">
//           <div className="p-3 shadow-lg bg-white rounded-lg">{children}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DefaultLayoutAdmin;
import Header from "./Header";
import AdminSidebar from "./Sidebar";
import "../../../assets/styles/adminForm.scss";
// import "./AdminLayout.scss"; // Create this new SCSS file

function DefaultLayoutAdmin({ children }) {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Header */}
        <Header />
        
        {/* Content Container */}
        <main className="admin-content">
          <div className="content-container">
            {children}
          </div>
        </main>

        {/* Footer (optional) */}
        <footer className="admin-footer">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between">
              <div className="text-muted small">
                © {new Date().getFullYear()} Sport Field Booking System
              </div>
              <div className="text-muted small">
                Version 1.0.0
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default DefaultLayoutAdmin;
