import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getProfile: () => api.get('/auth/profile'),
};

export const petAPI = {
    getAll: () => api.get('/api/pets'),
    getById: (id) => api.get(`/api/pets/${id}`),
    create: (data) => api.post('/api/pets', data),
    update: (id, data) => api.put(`/api/pets/${id}`, data),
    delete: (id) => api.delete(`/api/pets/${id}`),
    deleteAll: () => api.delete('/api/pets'),
    search: (name) => api.get(`/api/pets/search?name=${name}`),
    updateStatus: (id, status) => api.patch(`/api/pets/${id}/status`, { status }),
    uploadImage: (id, formData) => api.post(`/api/pets/${id}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
};

export default api;
