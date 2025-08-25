import axios from 'axios';
import qs from 'qs';

const axio = axios.create({
  baseURL: 'https://dev-backend.invotrx.com',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  transformRequest: [(data, headers) => {
    return qs.stringify(data);
  }],
});

export default axio;
