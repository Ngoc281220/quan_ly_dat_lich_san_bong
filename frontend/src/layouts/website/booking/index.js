import React, { useState, useEffect } from "react";
import { Container, Button, Table, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowLeft } from "react-icons/fa";
import { getSchedule } from "../../../services/website/booking";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import { formatDateCurrent } from "../../../components/common";

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
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [nameField, setNameField] = useState(null);
  const [generalPrice, setGeneralPrice] = useState(null);
  const [location, setLocation] = useState(null);
  const [listBooing, setListBooking] = useState([]);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  const loadData = async () => {
    const { data } = await getSchedule(
      id,
      selectedDate.toISOString().split("T")[0]
    );
    if (data.length > 0) {
      setCourts(data);
      setNameField(data[0].name_field);
      setGeneralPrice(data[0].price);
      setLocation(data[0].location);
    }
  };

  const toggleSlot = (subFieldId, time, pricePerHour) => {
    const slot = `${subFieldId}-${time}`;
    let updatedSlots = selectedSlots.includes(slot)
      ? selectedSlots.filter((s) => s !== slot)
      : [...selectedSlots, slot];

    setSelectedSlots(updatedSlots);
    calculateTotal(updatedSlots, pricePerHour);
  };

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Tính tổng giờ của mỗi sân

  const calculateTotalHours = (start_time, end_time) => {
    const startMinutes = timeToMinutes(start_time);
    const endMinutes = timeToMinutes(end_time);
    return (endMinutes - startMinutes) / 60;
  };

  const calculateTotal = (selectedSlots, pricePerHour) => {
    if (selectedSlots.length === 0) {
      setTotalHours(0);
      setTotalPrice(0);
      return;
    }

    const courtsMap = {};
    selectedSlots.forEach((slot) => {
      const [courtId, time] = slot.split("-");
      if (!courtsMap[courtId]) courtsMap[courtId] = new Set();
      courtsMap[courtId].add(time);
    });

    let totalHours = 0;
    Object.values(courtsMap).forEach((timeSet) => {
      const timesArray = [...timeSet].sort();
      const startTime = timesArray[0];
      const endTime = timesArray[timesArray.length - 1];

      const timeToMinutes = (time) => {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
      };

      totalHours += (timeToMinutes(endTime) - timeToMinutes(startTime)) / 60;
    });

    setTotalHours(totalHours);
    setTotalPrice(totalHours * pricePerHour);
  };

  const handleBooking = () => {
    if (selectedSlots.length === 0) {
      alert("Vui lòng chọn ít nhất một khung giờ!");
      return;
    }

    const bookingData = {};
    selectedSlots.forEach((slot) => {
      const [subFieldId, time] = slot.split("-");
      if (!bookingData[subFieldId]) bookingData[subFieldId] = [];
      bookingData[subFieldId].push(time);
    });

    const formattedBookings = Object.entries(bookingData).map(
      ([subFieldId, times]) => {
        times.sort();
        const start_time = times[0];
        const end_time = times[times.length - 1];
        const total_hours = calculateTotalHours(start_time, end_time);

        return {
          sub_field_id: parseInt(subFieldId),
          date: selectedDate.toISOString().split("T")[0],
          start_time,
          end_time,
          total_hours, // Tổng giờ tính toán
        };
      }
    );
    setShow(true);
    setListBooking(formattedBookings);
    console.log("xxx", formattedBookings);
    // const response = await bookCourt(formattedBookings);
    // if (response.success) {
    //   alert("Đặt sân thành công!");
    // } else {
    //   alert(response.message);
    // }
  };

  return (
    <Container fluid className="mt-3 px-0">
      <div className="bg-success booking-header">
        <div className="d-flex justify-content-between align-items-center mb-3 h-100-px py-3 pe-5">
          <Button variant="outline-success">
            <FaArrowLeft color="white" />
          </Button>
          <h4 className="text-center flex-grow-1 text-white">Đặt lịch</h4>
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            dateFormat="dd/MM/yyyy"
            className="form-control w-auto"
          />
        </div>
      </div>
      <Table bordered className="text-center booking-table">
        <thead>
          <tr>
            <th></th>
            {times.map((time) => (
              <th className="fs-13" key={time}>
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {courts.map((item, idx) => (
            <tr key={idx}>
              <td>{item.sub_field_name}</td>
              {times.map((time) => {
                const slot = `${item.sub_field_id}-${time}`;
                return (
                  <td
                    key={slot}
                    className={
                      selectedSlots.includes(slot) ? "bg-warning" : "bg-light"
                    }
                    onClick={() =>
                      toggleSlot(item.sub_field_id, time, item.price)
                    }
                  ></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="booking-footer py-5 bg-success">
        <div className="summary p-2">
          <h4>Tổng giờ: {totalHours}h</h4>
          <h4>Tổng tiền: {totalPrice.toLocaleString()} VNĐ</h4>
        </div>
        <Button
          variant="warning"
          size="lg"
          className="w-100"
          // onClick={handleBooking}
          onClick={handleBooking}
        >
          TIẾP THEO
        </Button>
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="top"
        className="full-height-offcanvas bg-success"
      >
        <div className="text-start px-2 py-2">
          <Button variant="link" onClick={handleClose} className="p-0 border-0">
            <FaArrowLeft color="white" />
          </Button>
        </div>
        <Offcanvas.Body>
          <h4 className="text-center text-white fw-bold mb-0 py-1">
            Đặt lịch ngày trực quan
          </h4>
          <Card>
            <Card.Header>Thông tin đặt lịch</Card.Header>
            <Card.Body>
              <Card.Text className="py-1 mb-0">Tên sân: {nameField}</Card.Text>
              <Card.Text className="mb-0">Địa chỉ: {location}</Card.Text>
              <Card.Text className="py-1 mb-0">
                Ngày: {formatDateCurrent()}
              </Card.Text>
              {listBooing.length > 0 ? (
                listBooing.map((item, idx) => (
                  <tr key={idx}>
                    <td>{`Sân-${item.sub_field_id}: `}</td> 
                    {/* Ngày đặt */}
                    <td className="px-2">
                      {item.start_time} - {item.end_time} |
                    </td>
                    <td>
                        {(item.total_hours * generalPrice).toLocaleString()} VNĐ
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    
                  </td>
                </tr>
              )}

              <Card.Text className="py-1 mb-0">Tổng giờ: {totalHours}h</Card.Text>
              <Card.Text className="py-1 mb-0">Tổng tiền: {totalPrice.toLocaleString()} VNĐ</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}

export default BookingLayout;
