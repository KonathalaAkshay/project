import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev-backend.invotrx.com',
});


export default api;
