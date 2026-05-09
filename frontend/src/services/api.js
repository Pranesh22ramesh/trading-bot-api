import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to headers if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const schoolService = {
  getSchools: (lat, lon, search = '', maxDist = '') => 
    api.get(`/listSchools?latitude=${lat}&longitude=${lon}&search=${search}&max_distance=${maxDist}`),
  
  getSchool: (id) => api.get(`/school/${id}`),
  
  addSchool: (data) => api.post('/addSchool', data),
  
  updateSchool: (id, data) => api.put(`/school/${id}`, data),
  
  deleteSchool: (id) => api.delete(`/school/${id}`),
};

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (email, password) => api.post('/auth/register', { email, password }),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default api;
