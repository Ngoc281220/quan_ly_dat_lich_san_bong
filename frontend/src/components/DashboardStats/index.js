import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Briefcase, User, BarChart, HelpCircle } from "react-feather";

const stats = [
  { value: 278, label: "New Projects", icon: <Briefcase color="#E91E63" />, color: "#E91E63" },
  { value: 156, label: "New Clients", icon: <User color="#009688" />, color: "#009688" },
  { value: "64.89 %", label: "Conversion Rate", icon: <BarChart color="#FF5722" />, color: "#FF5722" },
  { value: 423, label: "Support Tickets", icon: <HelpCircle color="#00BCD4" />, color: "#00BCD4" },
];

const DashboardStats = () => {
  return (
    <Row className="g-3">
      {stats.map((stat, index) => (
        <Col key={index} md={3} sm={6}>
          <Card className="p-3 shadow-sm border-0">
            <div className="d-flex align-items-center">
              <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: stat.color }}>
                {stat.value}
              </div>
              <div className="ms-auto" style={{ fontSize: "1.5rem" }}>{stat.icon}</div>
            </div>
            <small className="text-muted">{stat.label}</small>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardStats;
