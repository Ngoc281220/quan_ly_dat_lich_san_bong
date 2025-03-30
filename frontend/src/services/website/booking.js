import api from "../../config/api";

export async function getSchedule(id, date) {
    return await api.get(`/web/bookings/get-schedule?field_id=${id}&date=${date}`);
}

export async function bookingsField(params) {
    return await api.post('/web/bookings/field', params);
}