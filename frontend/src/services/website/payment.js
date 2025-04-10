import api from '../../config/api';
import axios from 'axios';
let API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

export async function paymentMomo(params) {
  return await api.post('/web/payment/momo', params);
}

export async function saveInfoPaymentMo(params) {
  return await api.post('/web/payment/save-momo', params);
}

export async function paymentCard(params) {
  return axios.post(`${API_URL}/web/payment/card`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
