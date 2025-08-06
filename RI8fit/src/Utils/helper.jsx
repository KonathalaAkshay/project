export const IS_AUTHENTICATED = "isAutenticated";
export const USER_DATA = "user";
export const AUTH_DETAILS = "auth-details"
export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";
export const EXPIRY_TIME = "expiryTime";
export const USER_TYPE="userType";

export const setItem = (key, value) => {
    localStorage.setItem(key, value)
}

export const getItem = (key) => {
    return localStorage.getItem(key)
}
export const clearLocalStorage = () => {
    localStorage.removeItem(EXPIRY_TIME);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(AUTH_DETAILS);
    localStorage.removeItem(USER_DATA);
    localStorage.removeItem(IS_AUTHENTICATED);
    localStorage.removeItem(USER_TYPE);
}
export const getUserData = () => {
    const data = localStorage.getItem(USER_DATA);
    return data && JSON.parse(data);
}
export const tokenData = () => {
    const data = localStorage.getItem(AUTH_DETAILS);
    return data && JSON.parse(data);
}

// export const setItem = (key, value) => {
//   if (typeof value === 'object') {
//     localStorage.setItem(key, JSON.stringify(value));
//   } else {
//     localStorage.setItem(key, value);
//   }
// };
