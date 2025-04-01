import React from "react";
import LineChart from "../../../components/chart/Line";
import DashboardStats from "../../../components/DashboardStats";

function Dashboard() {
  return (
    <>
      <div className="my-4">
        <DashboardStats/>
      </div>
      <LineChart />
    </>
  );
}

export default Dashboard;
