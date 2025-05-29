import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import * as api from '../services/api';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const login = async (credentials) => {
    try {
      const response = await api.login(credentials);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.register(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      context.logout();
    } catch (error) {
      throw error;
    }
  };

  return {
    ...context,
    login,
    register,
    logout
  };
};

export default useAuth;