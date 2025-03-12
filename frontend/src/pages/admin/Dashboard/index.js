import React from "react";
import DataTable from "../../../components/Table";
// import { Link } from "react-router-dom";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Table,
//   Badge,
//   InputGroup,
//   FormControl,
//   Button,
//   Nav,
// } from "react-bootstrap";
// import { FaSearch, FaUsers, FaChartBar } from "react-icons/fa";

// const customers = [
//   {
//     name: "Jane Cooper",
//     company: "Microsoft",
//     phone: "(225) 555-0118",
//     email: "jane@microsoft.com",
//     country: "United States",
//     status: "Active",
//   },
//   {
//     name: "Floyd Miles",
//     company: "Yahoo",
//     phone: "(205) 555-0100",
//     email: "floyd@yahoo.com",
//     country: "Kiribati",
//     status: "Inactive",
//   },
//   {
//     name: "Ronald Richards",
//     company: "Adobe",
//     phone: "(302) 555-0107",
//     email: "ronald@adobe.com",
//     country: "Israel",
//     status: "Inactive",
//   },
//   {
//     name: "Marvin McKinney",
//     company: "Tesla",
//     phone: "(252) 555-0126",
//     email: "marvin@tesla.com",
//     country: "Iran",
//     status: "Active",
//   },
// ];

// function Dashboard() {
//   return (
//     <Container fluid>
//       <Row>
//         {/* Sidebar */}
//         <Col md={2} className="bg-dark text-white p-3 min-vh-100">
//           <h4>Dashboard</h4>
//           <Nav defaultActiveKey="/dashboard" className="flex-column">
//             <Nav.Link as={Link} to="/dashboard" className="text-white">
//               Bảng điều khiển
//             </Nav.Link>
//             <Nav.Link as={Link} to="/product" className="text-white">
//               Quản lý sân
//             </Nav.Link>
//             <Nav.Link as={Link} to="/customers" className="text-white active">
//               Quản lý người dùng
//             </Nav.Link>
//             <Nav.Link as={Link} to="/income" className="text-white">
//               Đăng xuất
//             </Nav.Link>
//           </Nav>
//         </Col>

//         {/* Main Content */}
//         <Col md={10} className="p-4">
//           <h3>Hello Evano 👋</h3>

//           {/* Cards */}
//           <Row>
//             <Col md={4}>
//               <Card className="p-3">
//                 <FaUsers size={30} className="text-success" />
//                 <h5>Total Customers</h5>
//                 <h3>5,423</h3>
//                 <small className="text-success">+16% this month</small>
//               </Card>
//             </Col>
//             <Col md={4}>
//               <Card className="p-3">
//                 <FaChartBar size={30} className="text-danger" />
//                 <h5>Members</h5>
//                 <h3>1,893</h3>
//                 <small className="text-danger">-1% this month</small>
//               </Card>
//             </Col>
//           </Row>

//           {/* Search & Table */}
//           <Card className="mt-4 p-3">
//             <div className="d-flex justify-content-between">
//               <h5>All Customers</h5>
//               <InputGroup className="w-25">
//                 <FormControl placeholder="Search" />
//                 <Button variant="outline-secondary">
//                   <FaSearch />
//                 </Button>
//               </InputGroup>
//             </div>

//             <Table striped bordered hover className="mt-3">
//               <thead>
//                 <tr>
//                   <th>Customer Name</th>
//                   <th>Company</th>
//                   <th>Phone Number</th>
//                   <th>Email</th>
//                   <th>Country</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {customers.map((customer, index) => (
//                   <tr key={index}>
//                     <td>{customer.name}</td>
//                     <td>{customer.company}</td>
//                     <td>{customer.phone}</td>
//                     <td>{customer.email}</td>
//                     <td>{customer.country}</td>
//                     <td>
//                       <Badge
//                         bg={customer.status === "Active" ? "success" : "danger"}
//                       >
//                         {customer.status}
//                       </Badge>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

function Dashboard() {
  return (
    <>
      <DataTable />
    </>
  );
}

export default Dashboard;
