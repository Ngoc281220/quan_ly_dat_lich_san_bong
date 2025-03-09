import React, { useState } from "react";
import { Container, Button, Table, Badge } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowLeft } from "react-icons/fa";

const times = [
  "6:00",
  "6:30",
  "7:00",
  "7:30",
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];
const courts = ["A", "B", "C", "D", "E", "F"];

function BookingLayout() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);

  const toggleSlot = (court, time) => {
    const slot = `${court}-${time}`;
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  return (
    <Container fluid className="mt-3 px-0">
      <div className="bg-success booking-header">
        <div className="d-flex justify-content-between align-items-center mb-3 h-100-px py-3  pe-5">
          <Button variant="outline-success">
            <FaArrowLeft color="white" />
          </Button>
          <h4 className="text-center flex-grow-1 text-white">
            Đặt lịch ngày trực quan
          </h4>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            className="form-control w-auto"
          />
        </div>
        <div className="d-flex justify-content-start mb-2 py-4 px-2">
          <Badge bg="light" className="text-dark border me-2">
            Trống
          </Badge>
          <Badge bg="danger" className="me-2">
            Đã đặt
          </Badge>
          <Badge bg="secondary">Khóa</Badge>
        </div>
      </div>
      <Table bordered className="text-center booking-table">
        <thead>
          <tr>
            <th></th>
            {times.map((time) => (
              <th key={time}>{time}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {courts.map((court) => (
            <tr key={court}>
              <td>{court}</td>
              {times.map((time) => {
                const slot = `${court}-${time}`;
                const isSelected = selectedSlots.includes(slot);
                return (
                  <td
                    key={slot}
                    className={isSelected ? "bg-warning" : "bg-light"}
                    onClick={() => toggleSlot(court, time)}
                    style={{ cursor: "pointer" }}
                  ></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="booking-footer py-5 bg-success">
        <Button variant="warning" size="lg" className="w-100">
          TIẾP THEO
        </Button>
      </div>
    </Container>
  );
}

export default BookingLayout;
