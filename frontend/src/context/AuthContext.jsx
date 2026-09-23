import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../utils/apiClient';

const AuthContext = createContext(null);

const DEFAULT_GUEST_USER = {
  id: 'guest_user',
  name: 'Guest Trader',
  email: 'guest@foliolysis.in',
  handle: '@guest_sandbox',
  tier: 'Guest Sandbox',
  isGuest: true,
  role: 'Retail Algorithmic Trader',
  initialCapital: 1000000,
  defaultBenchmark: '^NSEI',
  defaultStopLoss: 2.5,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Synchronize authenticated session on initial mount
  const checkSession = useCallback(async () => {
    try {
      const data = await api.get('/api/auth/me', { bypassCache: true });
      if (data?.user) {
        setUser({
          ...data.user,
          isGuest: data.user.tier === 'Guest Sandbox',
        });
      } else {
        setUser(DEFAULT_GUEST_USER);
      }
    } catch (err) {
      // If 401 or offline, fallback to guest mode
      setUser(DEFAULT_GUEST_USER);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // Sign In with email and password
  const login = async (email, password) => {
    try {
      const data = await api.post('/api/auth/login', { email, password });
      if (data.success && data.user) {
        setUser({
          ...data.user,
          isGuest: false,
        });
        setIsAuthModalOpen(false);
        return { success: true, user: data.user };
      }
      throw new Error(data.error || 'Authentication failed');
    } catch (err) {
      return { success: false, error: err.message, details: err.details };
    }
  };

  // Register new account
  const register = async ({ name, email, password, tier = 'Pro Tier' }) => {
    try {
      const data = await api.post('/api/auth/register', { name, email, password, tier });
      if (data.success && data.user) {
        setUser({
          ...data.user,
          isGuest: false,
        });
        setIsAuthModalOpen(false);
        return { success: true, user: data.user };
      }
      throw new Error(data.error || 'Registration failed');
    } catch (err) {
      return { success: false, error: err.message, details: err.details };
    }
  };

  // Instant Guest Sandbox Mode
  const loginAsGuest = async () => {
    try {
      const data = await api.post('/api/auth/guest', {});
      if (data.success && data.user) {
        setUser({
          ...data.user,
          isGuest: true,
        });
      } else {
        setUser(DEFAULT_GUEST_USER);
      }
    } catch (err) {
      setUser(DEFAULT_GUEST_USER);
    } finally {
      setIsAuthModalOpen(false);
    }
  };

  // Sign Out
  const logout = async () => {
    try {
      await api.post('/api/auth/logout', {});
    } catch (err) {
      console.warn('Logout notice:', err.message);
    } finally {
      setUser(DEFAULT_GUEST_USER);
    }
  };

  // Compatibility helper for custom demo login
  const loginCustom = (customData) => {
    setUser({
      ...DEFAULT_GUEST_USER,
      ...customData,
      isGuest: false,
    });
    setIsAuthModalOpen(false);
  };

  const isGuest = !user || user.isGuest || user.tier === 'Guest Sandbox';

  const value = {
    user: user || DEFAULT_GUEST_USER,
    isGuest,
    isLoading,
    isAuthModalOpen,
    setIsAuthModalOpen,
    login,
    register,
    loginAsGuest,
    logout,
    loginCustom,
    checkSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
