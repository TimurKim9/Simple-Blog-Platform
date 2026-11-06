
import { createContext, useContext, useEffect, useState } from 'react';
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from '../api/articles';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem('token')
  );
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function checkUser() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getCurrentUser(token);
        setUser(data.user);
      } catch (error) {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, [token]);


  function saveUser(data) {
    localStorage.setItem('token', data.user.token);
    setToken(data.user.token);
    setUser(data.user);
  }

  async function login(email, password) {
    const data = await loginUser(email, password);
    saveUser(data);
    return data;
  }

  async function register(username, email, password) {
    const data = await registerUser(username, email, password);
    saveUser(data);
    return data;
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
