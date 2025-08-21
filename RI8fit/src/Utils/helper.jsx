import AsyncStorage from '@react-native-async-storage/async-storage';

export const IS_AUTHENTICATED = 'isAuthenticated';
export const USER_DATA = 'user';
export const AUTH_DETAILS = 'auth-details';
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const EXPIRY_TIME = 'expiryTime';
export const USER_TYPE = 'userType';

// Save data
export const setItem = async (key, value) => {
  try {
    const storeValue =
      typeof value === 'object' ? JSON.stringify(value) : value;
    await AsyncStorage.setItem(key, storeValue);
  } catch (e) {
    console.error('Error saving item:', e);
  }
};

// Get data
export const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? value : null;
  } catch (e) {
    console.error('Error getting item:', e);
    return null;
  }
};

// Clear all auth-related data
export const clearLocalStorage = async () => {
  try {
    await AsyncStorage.multiRemove([
      EXPIRY_TIME,
      REFRESH_TOKEN,
      ACCESS_TOKEN,
      AUTH_DETAILS,
      USER_DATA,
      IS_AUTHENTICATED,
      USER_TYPE,
    ]);
  } catch (e) {
    console.error('Error clearing storage:', e);
  }
};

// Get user data
export const getUserData = async () => {
  try {
    const data = await AsyncStorage.getItem(USER_DATA);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

// Get full token details
export const tokenData = async () => {
  try {
    const data = await AsyncStorage.getItem(AUTH_DETAILS);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};
