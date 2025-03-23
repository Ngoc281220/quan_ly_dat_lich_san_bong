import api from "../../config/api";

export async function getSchedule(id, date) {
    return await api.get(`/web/booking/get-schedule?field_id=${id}&date=${date}`);
}