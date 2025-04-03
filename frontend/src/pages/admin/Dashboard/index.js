import React from "react";
import { Navigate } from "react-router-dom";
import LineChart from "../../../components/chart/Line";
import DashboardStats from "../../../components/DashboardStats";
import { checkAdmin } from "../../../middleware";
import useAuthStore from "../../../store";

function Dashboard() {
  const {user} = useAuthStore();
  // const isAdmin = checkAdmin(user);
  // if (!isAdmin) {
  //   return <Navigate to="/404" replace />;
  // }
  return (
    <>
      <div className="my-4">
        <DashboardStats/>
      </div>
      <h3>Thống kê doanh thu</h3>
      <LineChart />
    </>
  );
}

export default Dashboard;
