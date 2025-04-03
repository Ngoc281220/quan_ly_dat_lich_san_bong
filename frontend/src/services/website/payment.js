import api from "../../config/api";

export async function paymentMomo(params) {
    return await api.post('/web/payment/momo', params);
}