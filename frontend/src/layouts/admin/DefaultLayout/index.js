import Header from "./Header";
import AdminSidebar from "./Sidebar";
import "../../../assets/styles/adminForm.scss";

function DefaultLayoutAdmin({ children }) {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Nội dung chính */}
      <div className="admin-main">
        <Header />
        <div className="admin-content">
          <div className="p-3 shadow-lg bg-white rounded-lg">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayoutAdmin;
