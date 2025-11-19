import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import useApi from '../configs/useApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState({});
  const { post } = useApi();


  useEffect(() => {
    const idToken = Cookies.get('idToken');
    const storedUserData = Cookies.get('userData');

    if (idToken) {
      setIsAuthenticated(true);
    }
 else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async ({ username, password }) => {
    try {
      const res = await post('/api/auth/login', { username, password });
      if (res && res.token) {
        Cookies.set('idToken', res.token);
        setIsAuthenticated(true);
        window.location.href = '/';
      } else {
        setIsAuthenticated(false);
        throw new Error('Invalid login response');
      }
    } catch (err) {
      setIsAuthenticated(false);
      throw err;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser({});
    Cookies.remove('idToken');
    Cookies.remove('userData');
    window.location.href = '/login';
  };

  // Function to update user information (called when user profile is updated)
  const updateUser = updatedUserData => {
    const newUserData = {
      ...user,
      ...updatedUserData,
    };

    setUser(newUserData);

    // Store the complete updated user data in cookies
    Cookies.set('userData', JSON.stringify(newUserData), { expires: 7 });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
