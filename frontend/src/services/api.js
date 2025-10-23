import axios from 'axios';
import useAuthStore from '../stores/useAuthStore';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

// Interceptor untuk menambahkan Authorization header
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Interceptor untuk handle response error
api.interceptors.response.use(
    response => response,
    error => {
        // Jangan redirect jika sedang di halaman login/register
        if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
            // Token expired atau invalid
            useAuthStore.getState().clearAuth();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;