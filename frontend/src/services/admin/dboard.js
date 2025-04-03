import api from "../../config/api";

export async function dashboard() {
    return await api.get('admin/dashboard');
}

export async function getRevenueByMonth(month, year) {
    return await api.get(`/admin/dashboard/revenue?month=${month}&year=${year}`);
}