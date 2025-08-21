import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev-backend.invotrx.com',
});

export default api;

// import axios from 'axios';
// import {
//   getItem,
//   setItem,
//   clearLocalStorage,
//   ACCESS_TOKEN,
//   REFRESH_TOKEN,
//   EXPIRY_TIME,
// } from './storage';

// const api = axios.create({
//   baseURL: 'https://dev-backend.invotrx.com',
//   timeout: 10000,
// });

// // ✅ Attach token before each request
// api.interceptors.request.use(async config => {
//   const token = getItem(ACCESS_TOKEN);
//   const expiryTime = getItem(EXPIRY_TIME);

//   // Check expiry
//   if (expiryTime && Date.now() > expiryTime) {
//     console.log('Access token expired, refreshing...');

//     try {
//       const refreshToken = getItem(REFRESH_TOKEN);
//       const response = await axios.post(
//         'https://your-api-url.com/auth/refresh',
//         null,
//         { params: { refresh_token: refreshToken } },
//       );

//       const {
//         accessToken,
//         refreshToken: newRefresh,
//         expiresIn,
//       } = response.data;

//       // Save new tokens
//       setItem(ACCESS_TOKEN, accessToken);
//       setItem(REFRESH_TOKEN, newRefresh);
//       setItem(EXPIRY_TIME, Date.now() + expiresIn * 1000);

//       config.headers.Authorization = `Bearer ${accessToken}`;
//     } catch (err) {
//       console.error('Refresh token failed', err);
//       clearLocalStorage();
//       window.location.href = '/login'; // logout user
//       return Promise.reject(err);
//     }
//   } else if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // ✅ Handle 401 responses
// api.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response?.status === 401) {
//       clearLocalStorage();
//       window.location.href = '/login'; // force logout
//     }
//     return Promise.reject(error);
//   },
// );

// export default api;
