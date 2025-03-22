import React, { useState } from "react";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";

const users = [
  {
    name: "Abram Schleifer",
    position: "Sales Assistant",
    office: "Edinburgh",
    age: 57,
    startDate: "25 Apr, 2027",
    salary: "$89,500",
  },
  {
    name: "Charlotte Anderson",
    position: "Marketing Manager",
    office: "London",
    age: 42,
    startDate: "12 Mar, 2025",
    salary: "$105,000",
  },
  {
    name: "Ethan Brown",
    position: "Software Engineer",
    office: "San Francisco",
    age: 30,
    startDate: "01 Jan, 2024",
    salary: "$120,000",
  },
  {
    name: "Isabella Davis",
    position: "UI/UX Designer",
    office: "Austin",
    age: 29,
    startDate: "18 Jul, 2025",
    salary: "$92,000",
  },
  {
    name: "John Smith",
    position: "DevOps Engineer",
    office: "Seattle",
    age: 35,
    startDate: "03 Oct, 2026",
    salary: "$110,000",
  },
  {
    name: "Jane Doe",
    position: "HR Manager",
    office: "New York",
    age: 40,
    startDate: "15 Feb, 2023",
    salary: "$95,000",
  },
];

const DataTable = ({ columns, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const displayedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="data-table-container">
      <h2>Data Tables</h2>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Position</th>
              <th>Office</th>
              <th>Age</th>
              <th>Start Date</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.position}</td>
                <td>{user.office}</td>
                <td>{user.age}</td>
                <td>{user.startDate}</td>
                <td>{user.salary}</td>

                <td>
                  <button className="btn btn-outline-primary btn-sm mx-1">
                    <Eye />
                  </button>
                  <button className="btn btn-outline-warning btn-sm mx-1">
                    <Pencil />
                  </button>
                  <button className="btn btn-outline-danger btn-sm mx-1">
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="pagination text-end">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
