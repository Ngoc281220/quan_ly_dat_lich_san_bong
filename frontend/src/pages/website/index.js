import React from "react";
import { Container, Table, Badge, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const timeSlots = [
  "5:00", "5:30", "6:00", "6:30", "7:00", "7:30", "8:00", "8:30", "9:00", "9:30",
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"
];

const courts = ["Pickleball 1", "Pickleball 2", "Pickleball 3", "Pickleball 4", "Pickleball 5"];

const bookedSlots = {
  "Pickleball 3": ["18:00", "18:30", "19:00", "19:30", "20:00"],
  "Pickleball 4": ["17:30", "18:00", "18:30", "19:00", "19:30"],
};

const lockedSlots = {
  "Pickleball 1": ["16:00", "16:30", "17:00"],
};

const BookingSchedule = () => {
  return (
    <Container fluid className="p-3 bg-light">
      <h4 className="text-center bg-success text-white py-2">Đặt lịch ngày trực quan</h4>
      <div className="d-flex justify-content-between align-items-center my-2">
        <div>
          <Badge bg="light" className="text-dark border mx-1">Trống</Badge>
          <Badge bg="danger" className="mx-1">Đã đặt</Badge>
          <Badge bg="secondary" className="mx-1">Khóa</Badge>
        </div>
        <Button variant="link" className="text-success">Xem sân & bảng giá</Button>
      </div>
      <Table bordered responsive>
        <thead>
          <tr>
            <th></th>
            {timeSlots.map((time, index) => (
              <th key={index} className="text-center">{time}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {courts.map((court, index) => (
            <tr key={index}>
              <td>{court}</td>
              {timeSlots.map((time, i) => {
                let bgColor = "white";
                if (bookedSlots[court]?.includes(time)) bgColor = "#ff6b6b";
                if (lockedSlots[court]?.includes(time)) bgColor = "#6c757d";
                return (
                  <td key={i} style={{ backgroundColor: bgColor, width: "35px" }}></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BookingSchedule;
