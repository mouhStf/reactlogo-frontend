import { useEffect, useState } from "react";
import { useAccount } from "../hooks/useAccount";
import { API_BASE_URL } from "../utils/api";

export function DashboardPage() {

  const {user, fetchDashboard, uploadAvatar} = useAccount();

  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    fetchDashboard().catch (err => {
      setError(err.message);
    })
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAvatarUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }
    setUploadStatus('Uploading...');

    try {
      await uploadAvatar(selectedFile);
      setUploadStatus('Upload successful!');
      fetchDashboard(); // Refresh user data to show new avatar
    } catch (err) {
      setUploadStatus(`Error: ${err.message}`);
    }
  };

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!user) return <p className="text-center">Loading dashboard...</p>;

  const avatarUrl = user.avatarURL ? `${API_BASE_URL}${user.avatarUrl}` : 'https://placehold.co/128x128/E0E0E0/BDBDBD?text=No+Avatar';

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="flex items-center space-x-6">
        <img src={avatarUrl} alt="User Avatar" className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200" />
        <div>
          <p className="text-xl text-gray-800"><span className="font-semibold">{user.prenom} {user.nom}</span></p>
          <p className="text-gray-500">Email: {user.email}</p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t">
        <h2 className="text-xl font-semibold mb-4">Upload New Avatar</h2>
        <form onSubmit={handleAvatarUpload}>
          <input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
          <button type="submit" className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Upload</button>
        </form>
        {uploadStatus && <p className="mt-4 text-sm">{uploadStatus}</p>}
      </div>
    </div>
  );
}
