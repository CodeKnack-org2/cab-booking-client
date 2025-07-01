import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  verifyToken: () => api.post('/auth/verify'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
};

// User API
export const userAPI = {
  getProfile: (userId) => api.get(`/user/profile/${userId}`),
  updateProfile: (userId, data) => api.put(`/user/profile/${userId}`, data),
  getRideHistory: (userId) => api.get(`/user/ride-history/${userId}`),
};

// Booking API
export const bookingAPI = {
  create: (bookingData) => api.post('/bookings', bookingData),
  getUserBookings: () => api.get('/bookings/user'),
  getDriverBookings: () => api.get('/bookings/driver'),
  acceptBooking: (bookingId) => api.post(`/bookings/${bookingId}/accept`),
  startTrip: (bookingId) => api.post(`/bookings/${bookingId}/start`),
  completeTrip: (bookingId) => api.post(`/bookings/${bookingId}/complete`),
  cancelBooking: (bookingId) => api.post(`/bookings/${bookingId}/cancel`),
};

// Cab API
export const cabAPI = {
  create: (cabData) => api.post('/cabs', cabData),
  getAvailableCabs: () => api.get('/cabs/available'),
  getCabDetails: (cabId) => api.get(`/cabs/${cabId}`),
  getDriverCabs: (driverId) => api.get(`/cabs/driver/${driverId}`),
  updateStatus: (cabId, status) => api.put(`/cabs/${cabId}/status`, { status }),
};

// Driver API
export const driverAPI = {
  toggleAvailability: (driverId, isAvailable) => 
    api.put(`/driver/availability/${driverId}`, { isAvailable }),
  getCurrentTrip: (driverId) => api.get(`/driver/current-trip/${driverId}`),
  getEarnings: (driverId) => api.get(`/driver/earnings/${driverId}`),
};

// Payment API
export const paymentAPI = {
  createPayment: (paymentData) => api.post('/payments', paymentData),
  getPaymentHistory: () => api.get('/payments'),
  processPayment: (paymentId) => api.post(`/payments/${paymentId}/process`),
};

// Notification API
export const notificationAPI = {
  getNotifications: () => api.get('/notifications'),
  markAsRead: (notificationId) => api.put(`/notifications/${notificationId}/read`),
  deleteNotification: (notificationId) => api.delete(`/notifications/${notificationId}`),
};

export default api; 