import React from "react";
import LineChart from "../../../components/chart/Line";
import DashboardStats from "../../../components/DashboardStats";

function Dashboard() {
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
