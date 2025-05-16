import api from "../../config/api";


export async function listAllBooking(search)  {
    return await api.get(`admin/booking?search=${search}`);
}

export async function updatePaymentById(id) {
    return await api.get(`admin/booking/${id}`);
}

export async function cancelPaymentById(id) {
    return await api.post(`admin/booking/${id}`);
}