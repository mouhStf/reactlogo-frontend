import { useCallback, useState } from "react";
import { apiFetch } from '../utils/api';
import { User } from "../types";

export function useAccount() {

  const [user, setUser] = useState<User>(null);

  const fetchDashboard = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    await apiFetch<User>(
      '/api/dashboard',
      { headers: { 'Authorization': token }}
    ).then(data => {
      setUser(data)
    }).catch(err => {
      throw new Error(err.message || 'Failed to fetch dashboard data');
    });
  }, []);

  const uploadAvatar = useCallback(async (image) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const formData = new FormData();
    formData.append('avatar', image);
    apiFetch<any>('/api/upload-avatar', {
      method: 'POST',
      headers: { 'Authorization': token },
      body: formData,
    }).catch(err => {
        throw new Error(err.message || 'Upload failed');
      });
  }, []);

  return {user, fetchDashboard, uploadAvatar};
}
