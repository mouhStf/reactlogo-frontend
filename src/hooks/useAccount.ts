import { useCallback, useState } from "react";
import { apiFetch } from '../utils/api.ts';

export function useAccount() {

  const [user, setUser] = useState(null);

  const fetchDashboard = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await apiFetch(
      '/api/dashboard',
      { headers: { 'Authorization': token }}
    );

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
    const data = await response.json();
    setUser(data);
  }, []);

  const uploadAvatar = useCallback(async (image) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const formData = new FormData();
    formData.append('avatar', image);
    const resp = await apiFetch('/api/upload-avatar', {
      method: 'POST',
      headers: { 'Authorization': token },
      body: formData,
    });

    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({ message: 'Upload failed' }));
      throw new Error(errData.message || 'Upload failed');
    }
  }, []);

  return {user, fetchDashboard, uploadAvatar};
}
