import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaHome, FaMap, FaFileAlt, FaUser } from "react-icons/fa";
import useAuthStore from "../../../../store";
import { useState, useEffect } from "react";

const menuItems = [
  { path: "/", icon: <FaHome size={24} />, label: "Trang chủ" },
  { path: "/map", icon: <FaMap size={24} />, label: "Bản đồ" },
  { path: "/posts", icon: <FaFileAlt size={24} />, label: "Bài viết" },
  { path: "/account", icon: <FaUser size={24} />, label: "Tài khoản" },
];

function Footer() {
  const { setLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const handleNavigate = (e, path) => {
    e.preventDefault();
    setActivePath(path);
    setTimeout(() => {
      navigate(path);
      setLoading(true);
    }, 800);
  };

  return (
    <footer className="footer bg-success text-white py-3 fixed-bottom">
      <Container fluid>
        <Row className="text-center">
          {menuItems.map(({ path, icon, label }) => (
            <Col key={path}>
              <Link
                to={path}
                onClick={(e) => handleNavigate(e, path)}
                className="text-decoration-none text-white"
              >
                {React.cloneElement(icon, {
                  color: activePath === path ? "#FFC107" : "white",
                })}
                <div
                  className="mt-1"
                  style={{ color: activePath === path ? "#FFC107" : "white" }}
                >
                  {label}
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
