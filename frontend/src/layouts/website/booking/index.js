import React, { useState, useEffect } from "react";
import { Container, Button, Table, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowLeft } from "react-icons/fa";
import { getSchedule } from "../../../services/website/booking";

const times = [
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
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

function BookingLayout() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [courts, setCourts] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const toggleSlot = (subFieldId, time, pricePerHour) => {
    const slot = `${subFieldId}-${time}`;
    let updatedSlots = [...selectedSlots];

    if (updatedSlots.includes(slot)) {
      updatedSlots = updatedSlots.filter((s) => s !== slot);
    } else {
      updatedSlots.push(slot);
    }

    setSelectedSlots(updatedSlots);
    calculateTotal(updatedSlots, pricePerHour);
  };

  const calculateTotal = (selectedSlots, pricePerHour) => {
    if (selectedSlots.length === 0) {
      setTotalHours(0);
      setTotalPrice(0);
      return;
    }

    // Tạo một đối tượng lưu thời gian theo từng sân
    const courtsMap = {};

    selectedSlots.forEach((slot) => {
      const [courtId, time] = slot.split("-");
      if (!courtsMap[courtId]) {
        courtsMap[courtId] = new Set();
      }
      courtsMap[courtId].add(time);
    });

    let totalHours = 0;

    // Lặp qua từng sân và tính tổng giờ
    Object.values(courtsMap).forEach((timeSet) => {
      const times = [...timeSet];

      // Sắp xếp thời gian theo thứ tự
      times.sort((a, b) => {
        const [ha, ma] = a.split(":").map(Number);
        const [hb, mb] = b.split(":").map(Number);
        return ha * 60 + ma - (hb * 60 + mb);
      });

      // Lấy thời gian đầu và cuối
      const startTime = times[0];
      const endTime = times[times.length - 1];

      // Hàm chuyển thời gian thành phút
      const timeToMinutes = (time) => {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
      };

      const totalMinutes = timeToMinutes(endTime) - timeToMinutes(startTime);
      totalHours += totalMinutes / 60; // Chuyển thành giờ và cộng vào tổng
    });

    setTotalHours(totalHours);
    setTotalPrice(totalHours * pricePerHour);
  };

  const { id } = useParams();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const loadData = async () => {
    const { data } = await getSchedule(id, date);
    setCourts(data);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container fluid className="mt-3 px-0">
      <div className="bg-success booking-header">
        <div className="d-flex justify-content-between align-items-center mb-3 h-100-px py-3 pe-5">
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
          {courts.map((item, idx) => (
            <tr key={idx}>
              <td className="fs-12 px-3">{item.sub_field_name}</td>
              {times.map((time) => {
                const slot = `${item.sub_field_id}-${time}`;
                const isSelected = selectedSlots.includes(slot);
                return (
                  <td
                    key={slot}
                    className={isSelected ? "bg-warning" : "bg-light"}
                    onClick={() =>
                      toggleSlot(item.sub_field_id, time, item.price)
                    }
                    style={{ cursor: "pointer" }}
                  ></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="booking-footer py-5 bg-success">
        <div className="summary p-2">
          <h4 className="fs-5">Tổng giờ: {totalHours}h</h4>
          <h4 className="fs-5">Tổng tiền: {totalPrice.toLocaleString()} VNĐ</h4>
        </div>
        <Button variant="warning" size="lg" className="w-100">
          TIẾP THEO
        </Button>
      </div>
    </Container>
  );
}

export default BookingLayout;
