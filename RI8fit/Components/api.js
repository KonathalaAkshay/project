import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api.com',
  headers: {
    'Content-Type': 'application/json',
    'Authorization':'Bearer ${token}'
  },
});

export default api;

