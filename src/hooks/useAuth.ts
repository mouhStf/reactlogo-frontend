import { useCallback } from "react";
import { create } from "zustand";
import { apiFetch } from "../utils/api";
import { useNavigate } from "react-router";

type StoreState = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

export const useStore = create<StoreState>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
}));

export function useAuth() {

  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useStore((state) =>  state.setIsAuthenticated);
  const navigate = useNavigate();

  const authenticate = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []); 

  const logout = useCallback((path: string = '/login') => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate(path);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiFetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      json: { email, password },
    });

    if (!res.ok) throw new Error('Login failed');

    const data = await res.json();
    localStorage.setItem('token', data.token ?? 'dummy');
    setIsAuthenticated(true);
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const r = await apiFetch('/api/signup', {
      method: 'POST',
      json: { email, password },
    });
    const data = await r.json();
    if (!r.ok) {
      throw new Error(data.message || 'Signup failed');
    }
  }, []);

  return { authenticate, isAuthenticated, login, logout, signUp };
}
