import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  signup: async (data: any) => {
    try {
      console.log('Sending signup request to:', `${API_URL}/auth/signup`);
      console.log('Signup data:', data);
      const response = await api.post('/auth/signup', data);
      console.log('Signup response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      throw error;
    }
  },
  signin: async (data: any) => {
    const response = await api.post('/auth/signin', data);
    return response.data;
  },
};

export const experts = {
  getAll: async () => {
    const response = await api.get('/expert');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/expert/${id}`);
    return response.data;
  },
  updateProfile: async (id: string, data: any) => {
    const response = await api.put(`/expert/${id}`, data);
    return response.data;
  },
  getConsultation: async (id: string, question: string) => {
    const response = await api.post(`/expert/${id}/consult`, { question });
    return response.data;
  },
};

export default api; 