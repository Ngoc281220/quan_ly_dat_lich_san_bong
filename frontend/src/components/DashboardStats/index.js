import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Briefcase, User, BarChart, HelpCircle } from "react-feather";
import { dashboard } from "../../services/admin/dboard";

const DashboardStats = () => {
  const [countUser, setCountUser] = useState(0);
  const [countField, setCountField] = useState(0);
  const [countPost, setCountPost] = useState(0);
  const [countCategory, setCountCategory] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dashboard();
        setCountUser(data.countUser);
        setCountField(data.countField);
        setCountPost(data.countPost);
        setCountCategory(data.countCategory);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchData();
  }, []);

  // Mảng các thông tin stats sẽ được hiển thị
  const stats = [
    { value: countUser, label: "Người dùng", icon: <User color="#009688" />, color: "#009688" },
    { value: countField, label: "Sân thể thao", icon: <Briefcase color="#E91E63" />, color: "#E91E63" },
    { value: countPost, label: "Bài đăng", icon: <BarChart color="#FF5722" />, color: "#FF5722" },
    { value: countCategory, label: "Danh mục", icon: <HelpCircle color="#00BCD4" />, color: "#00BCD4" },
  ];

  return (
    <Row className="g-3">
      {stats.map((stat, index) => (
        <Col key={index} md={3} sm={6}>
          <Card className="p-3 shadow-sm border-0">
            <div className="d-flex align-items-center">
              <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: stat.color }}>
                {stat.value}
              </div>
              <div className="ms-auto" style={{ fontSize: "1.5rem" }}>
                {stat.icon}
              </div>
            </div>
            <small className="text-muted">{stat.label}</small>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardStats;
