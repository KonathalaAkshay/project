import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  tokenData,
  clearLocalStorage,
  setItem,
  getItem,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  EXPIRY_TIME,
} from '../Utils/helper';
import axio from '../API/axio';

const AuthContext = createContext();

export const AuthProvider = ({ children, navigationRef }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const logoutTimer = useRef(null); // store timeout ref

  const refreshAccessToken = async () => {
    try {
      const refresh_Token = await getItem(REFRESH_TOKEN);
      if (!refresh_Token) return false;

      const response = await fetch(
        'https://dev-backend.invotrx.com/auth/candidate/refresh_token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            refresh_token: refresh_Token,
          }).toString(),
        },
      );

      if (!response.ok) {
        // console.log('Refresh Token Failed:', refresh_Token);
        throw new Error('Failed to refresh');
      }

      const json = await response.json();

      const newAccessToken = json?.data?.access_token;

      if (newAccessToken) {
        const newExpiry = Date.now() + 15 * 60 * 1000;
        await setItem(ACCESS_TOKEN, newAccessToken);
        await setItem(EXPIRY_TIME, newExpiry.toString());
        await setItem(REFRESH_TOKEN, refresh_Token);

        scheduleTokenCheck(newExpiry);
        return true;
      }

      return false;
    } catch (e) {
      console.error('Error refreshing token:', e);
      return false;
    }
  };

  const scheduleTokenCheck = expiryTime => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }

    const timeLeft = expiryTime - Date.now();

    if (timeLeft > 0) {
      logoutTimer.current = setTimeout(async () => {
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          await logout();
        }
      }, timeLeft);
    } else {
      logout();
    }
  };

  const checkLogin = async () => {
    const tokenInfo = await tokenData();

    if (tokenInfo?.expiryTime && Date.now() >= tokenInfo.expiryTime) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        setIsAuthenticated(true);
      } else {
        await clearLocalStorage();
        setIsAuthenticated(false);
      }
    } else if (tokenInfo?.expiryTime) {
      setIsAuthenticated(true);
      scheduleTokenCheck(Number(tokenInfo.expiryTime));
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  };

  const logout = async () => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }
    await clearLocalStorage();
    setIsAuthenticated(false);
    if (navigationRef?.current) {
      navigationRef.current.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  useEffect(() => {
    checkLogin();
    return () => {
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
