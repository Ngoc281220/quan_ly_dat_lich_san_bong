import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';
import { getSchedule } from '../../../services/website/booking';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import { formatDateCurrent } from '../../../components/common';
import Form from 'react-bootstrap/Form';
import { showToast } from '../../../components/common';
import { bookingsField } from '../../../services/website/booking';
import { useNavigate } from 'react-router-dom';
import '../../../assets/styles/BookingLayout.scss';

const times = [
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
];
const TodayOrFuture = (date) => {
  if (!date) return - 1 // tức là ngày chọn bé hơn ngày hiện tại;

  const inputDate = new Date(date);
  const today = new Date();

  // Reset giờ phút giây để chỉ so sánh ngày
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  if (inputDate > today) return 1 // Ngày chọn lớn hơn ngày hiện tại
  return 0 // Ngày chọn bằng ngày hiện tại;
};

const IsPast = (time, now, status) => {
    if (status == 0 && time < now) {
      return true;
    } else if (status < 0) {
      return true;
    } else if (status == 1) {
      return false;
    } {
      return false;
    }
}

function BookingLayout() {
  const navigate = useNavigate();
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
  const [listBooking, setListBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [userIn, setUserIn] = useState({
    name: '',
    phone: '',
    note: '',
  });

  const handleClose = () => setShow(false);

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const { data } = await getSchedule(
        id,
        selectedDate.toISOString().split('T')[0],
      );
      if (data.length > 0) {
        setCourts(data);
        setNameField(data[0].name_field);
        setGeneralPrice(data[0].price);
        setLocation(data[0].location);
      }
    } finally {
      setIsLoading(false);
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
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

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
      const [courtId, time] = slot.split('-');
      if (!courtsMap[courtId]) courtsMap[courtId] = new Set();
      courtsMap[courtId].add(time);
    });

    let totalHours = 0;
    Object.values(courtsMap).forEach((timeSet) => {
      const timesArray = [...timeSet].sort();
      const startTime = timesArray[0];
      const endTime = timesArray[timesArray.length - 1];
      totalHours += (timeToMinutes(endTime) - timeToMinutes(startTime)) / 60;
    });

    setTotalHours(totalHours);
    setTotalPrice(totalHours * pricePerHour);
  };

  const handleBooking = () => {
    if (selectedSlots.length === 0) {
      showToast('Vui lòng chọn ít nhất một khung giờ!', 'warning');
      return;
    }

    const bookingData = {};
    selectedSlots.forEach((slot) => {
      const [subFieldId, time] = slot.split('-');
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
          date: selectedDate.toISOString().split('T')[0],
          start_time,
          end_time,
          total_hours,
        };
      },
    );
    setShow(true);
    setListBooking(formattedBookings);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserIn((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const paymentConfirmation = async () => {
    const phone = userIn.phone.trim();
    if (phone === null || phone === '') {
      showToast('Vui lòng nhập số điện thoại', 'warning');
      return;
    }
    try {
      const params = {
        listBooking,
        userIn,
        totalPrice,
        totalHours,
        idField: id,
      };

      const { data } = await bookingsField(params);
      if (data) {
        navigate(`/payment/${data.order_code}`);
      }
    } catch (error) {
      showToast('Có lỗi xảy ra khi đặt sân', 'error');
    }
  };

  const lastDateRef = useRef(null);

  const handleDate = async (date) => {
    if (date && date !== lastDateRef.current) {
      lastDateRef.current = date;
      setSelectedDate(date);
    }
  };

  return (
    <div className="booking-layout">
      {/* Header Section */}
      <div className="booking-header bg-primary text-white py-3 shadow-sm">
        <Container fluid>
          <div className="d-flex align-items-center">
            <Button
              variant="link"
              className="text-white p-0 me-3"
              onClick={() => navigate('/')}
            >
              <FaArrowLeft size={20} />
            </Button>
            <h4 className="mb-0 flex-grow-1 text-center">
              Đặt lịch sân thể thao
            </h4>
            <div>
              <DatePicker
                selected={selectedDate}
                onChange={handleDate}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                popperPlacement="bottom-end"
              />
              {/* <FaCalendarAlt className="date-picker-icon" /> */}
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="mt-5 pt-5 hg" fluid>
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : courts.length > 0 ? (
          <>
            {/* Schedule Table */}
            <div className="table-responsive border rounded shadow-sm">
              <Table bordered className="mb-0 schedule-table">
                <thead className="table-light">
                  <tr>
                    <th className="text-nowrap align-middle tr-w">Sân</th>
                    {times.map((time) => (
                      <th key={time} className="fs-12">
                        {`${time.split(':')[0]} : ${time.split(':')[1]}`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {courts.map((item, idx) => (
                    <tr key={idx}>
                      <td className="text-nowrap fw-bold">
                        {item.sub_field_name}
                      </td>
                      {times.map((time) => {
                        const slot = `${item.sub_field_id}-${time}`;
                        const now = new Date().toTimeString().slice(0, 5);
                        // let isPast = time < now;
                        let isPast = IsPast(time, now, TodayOrFuture(selectedDate));
                        const isBooked = item.time_slots.some(
                          (slot) =>
                            time >= slot.start_time && time < slot.end_time,
                        );
                      
                        return (
                          <td
                            key={slot}
                            className={`time-slot ${
                              isBooked
                                ? 'booked'
                                : isPast
                                  ? 'past'
                                  : selectedSlots.includes(slot)
                                    ? 'selected'
                                    : 'available'
                            }`}
                            onClick={
                              isPast || isBooked
                                ? undefined
                                : () =>
                                    toggleSlot(
                                      item.sub_field_id,
                                      time,
                                      item.price,
                                    )
                            }
                          ></td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {/* Summary & Action */}
            <div className="booking-summary bg-light p-3 rounded shadow-sm mt-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">Tổng giờ:</h5>
                <h5 className="mb-0 fw-bold">{totalHours}h</h5>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Tổng tiền:</h5>
                <h5 className="mb-0 fw-bold text-primary">
                  {totalPrice.toLocaleString()} VNĐ
                </h5>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="w-100 mt-3 fw-bold"
                onClick={handleBooking}
                disabled={selectedSlots.length === 0}
              >
                TIẾP THEO
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <h5>Không có dữ liệu sân bóng cho ngày này</h5>
            <p>Vui lòng chọn ngày khác</p>
          </div>
        )}
      </Container>

      {/* Booking Offcanvas */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        className="booking-offcanvas"
      >
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title className="fw-bold">
            Xác nhận đặt lịch
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-light fw-bold py-3">
              Thông tin đặt lịch
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <p className="mb-1">
                  <strong>Tên sân:</strong> {nameField}
                </p>
                <p className="mb-1">
                  <strong>Địa chỉ:</strong> {location}
                </p>
                <p className="mb-3">
                  <strong>Ngày:</strong> {formatDateCurrent(selectedDate)}
                </p>

                <div className="booking-details mb-3">
                  {listBooking.map((item, idx) => (
                    <div
                      key={idx}
                      className="d-flex justify-content-between mb-2"
                    >
                      <span>Sân {item.sub_field_id}:</span>
                      <span>
                        {item.start_time} - {item.end_time} |{' '}
                        <strong>
                          {(item.total_hours * generalPrice).toLocaleString()}{' '}
                          VNĐ
                        </strong>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between border-top pt-2">
                  <strong>Tổng giờ:</strong>
                  <strong>{totalHours}h</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Tổng tiền:</strong>
                  <strong className="text-primary">
                    {totalPrice.toLocaleString()} VNĐ
                  </strong>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">TÊN CỦA BẠN</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={userIn.name}
                  placeholder="Nhập họ tên"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">SỐ ĐIỆN THOẠI</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  onChange={handleChange}
                  value={userIn.phone}
                  maxLength={10}
                  placeholder="Nhập số điện thoại"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">GHI CHÚ CHO CHỦ SÂN</Form.Label>
                <Form.Control
                  as="textarea"
                  name="note"
                  onChange={handleChange}
                  value={userIn.note}
                  rows={3}
                  placeholder="Nhập ghi chú (nếu có)"
                />
              </Form.Group>

              <Button
                variant="primary"
                onClick={paymentConfirmation}
                className="w-100 fw-bold py-2"
              >
                XÁC NHẬN & THANH TOÁN
              </Button>
            </Card.Body>
          </Card>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default BookingLayout;
