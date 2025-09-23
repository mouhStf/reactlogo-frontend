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
    await apiFetch<any>('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      json: { email, password },
    }).then(r => {
        localStorage.setItem('token', r.token ?? 'dummy');
        setIsAuthenticated(true);
      }).catch((e) => {
        throw new Error('Login failed');
      })
  }, []);

  const signUp = useCallback(async (
    prenom: string, nom: string, telephone: string, email: string, password: string
  ) => {
      await apiFetch<any>('/api/signup', {
        method: 'POST',
        json: { prenom, nom, telephone, email, password },
      }).catch(err => {
          throw new Error(err.message || 'Signup failed')
        })
    }, []);

  return { authenticate, isAuthenticated, login, logout, signUp };
}
