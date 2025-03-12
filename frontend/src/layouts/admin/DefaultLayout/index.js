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
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayoutAdmin;
