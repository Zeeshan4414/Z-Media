// import React, { createContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const loadAuthData = async () => {
//       try {
//         const storedToken = await AsyncStorage.getItem('token');
//         if (storedToken) {
//           setIsAuthenticated(true);
//           setToken(storedToken);
//         } else {
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         console.error("Failed to load auth data:", error);
//         setIsAuthenticated(false);
//       }
//     };
//     loadAuthData();
//   }, []);

//   const login = async (userData, authToken) => {
//     setUser(userData);
//     setToken(authToken);
//     setIsAuthenticated(true);
//     await AsyncStorage.setItem('token', authToken);
//   };

//   const logout = async () => {
//     setUser(null);
//     setToken(null);
//     setIsAuthenticated(false);
//     await AsyncStorage.removeItem('token');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setIsAuthenticated(true);
          setToken(storedToken);
          // Optionally, you can fetch user data here if needed
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Failed to load auth data:", error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const login = useCallback(async (userData, authToken) => {
    try {
      await AsyncStorage.setItem('token', authToken);
      setUser(userData);
      setToken(authToken);
      setIsAuthenticated(true);
      console.log('Login successful, token stored:', authToken);
    } catch (error) {
      console.error('Failed to login:', error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('token');
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      console.log('Logout successful, token removed');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated , user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};