import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'https://swiftologistics-backend-production.up.railway.app';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('swifto_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  register:     (data) => api.post('/api/auth/register', data),
  login:        (data) => api.post('/api/auth/login', data),
  loginWithOTP: (data) => api.post('/api/auth/login-otp', data),
  getMe:        ()     => api.get('/api/auth/me'),
  sendOTP:      (data) => api.post('/api/auth/send-otp', data),
  verifyOTP:    (data) => api.post('/api/auth/verify-otp', data),
};

export const bookingAPI = {
  create:      (data)       => api.post('/api/bookings', data),
  getMyOrders: ()           => api.get('/api/bookings/my'),
  track:       (trackingId) => api.get(`/api/bookings/track/${trackingId}`),
};

export const driverAPI = {
  register: (data) => api.post('/api/drivers/register', data),
};

export const trackingAPI = {
  get: (trackingId) => api.get(`/api/tracking/${trackingId}`),
};

export default api;