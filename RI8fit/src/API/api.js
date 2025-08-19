import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev-backend.invotrx.com/docs#',
});


export default api;
