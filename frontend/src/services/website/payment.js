import api from "../../config/api";

export async function paymentMomo(params) {
    return await api.post('/web/payment/momo', params);
}

export async function saveInfoPaymentMo(params) {
    return await api.post('/web/payment/save-momo', params);
}