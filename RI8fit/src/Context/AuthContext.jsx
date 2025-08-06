import React, { createContext, useContext, useState, useEffect } from 'react';
import { tokenData, clearLocalStorage } from '../Utils/helpers';

const AuthContext = createContext();

export const AuthProvider = ({ children, navigationRef }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkLogin = async () => {
    const token = await tokenData();
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const logout = async () => {
    await clearLocalStorage();
    setIsAuthenticated(false);
    if (navigationRef?.current) {
      navigationRef.current.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
