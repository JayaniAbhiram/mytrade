import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE
});

export const tradeAPI = {
    createTrade: (data) => api.post('/trades', data),
    getAllTrades: (params) => api.get('/trades', { params }),
    deleteTrade: (id) => api.delete(`/trades/${id}`)
};

export const summaryAPI = {
    getSummary: () => api.get('/summary')
};

export const analyticsAPI = {
    getOverview: () => api.get('/analytics/overview'),
    getStocks: () => api.get('/analytics/stocks'),
    getMonthly: () => api.get('/analytics/monthly'),
    getDailyChart: () => api.get('/analytics/daily-chart')
};

export default api;
