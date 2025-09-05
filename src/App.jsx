import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'http://localhost:8080';

// Main App Component
export default function App() {
  const [page, setPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Optional: Add token validation logic here
    }
  }, []);

  const navigate = (targetPage) => {
    setPage(targetPage);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setPage('home');
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Navbar isAuthenticated={isAuthenticated} navigate={navigate} onLogout={handleLogout} />
      <main className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {page === 'home' && <HomePage />}
          {page === 'login' && <LoginPage navigate={navigate} setIsAuthenticated={setIsAuthenticated} />}
          {page === 'signup' && <SignupPage navigate={navigate} />}
          {page === 'dashboard' && isAuthenticated && <DashboardPage />}
        </div>
      </main>
    </div>
  );
}

// --- Components ---

function Navbar({ isAuthenticated, navigate, onLogout }) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl text-indigo-600 cursor-pointer" onClick={() => navigate('home')}>
              GoReact
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('home')} className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Home</button>
            {isAuthenticated ? (
              <>
                <button onClick={() => navigate('dashboard')} className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</button>
                <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('login')} className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Login</button>
                <button onClick={() => navigate('signup')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium">Sign Up</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function HomePage() {
  const [media, setMedia] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/home`);
        if (!response.ok) throw new Error('Failed to fetch content');
        const data = await response.json();
        setMedia(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMedia();
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Platform</h1>
      <p className="text-lg text-gray-600 mb-8">Discover amazing content shared by our community.</p>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {media.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img src={item.url} alt={item.title} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/CCCCCC/FFFFFF?text=Error'; }} />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">{item.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoginPage({ navigate, setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`${API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                 const errData = await response.json().catch(() => ({ message: 'Login failed' }));
                 throw new Error(errData.message || 'Login failed');
            }
            const data = await response.json();
            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
            navigate('dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">Login</button>
                </form>
            </div>
        </div>
    );
}

function SignupPage({ navigate }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await fetch(`${API_BASE_URL}/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                 throw new Error(data.message || 'Signup failed');
            }
            setSuccess('Account created! Please log in.');
            setTimeout(() => navigate('login'), 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
                {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
                {success && <p className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

function DashboardPage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const fetchDashboard = useCallback(async () => {
        setError('');
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');
            const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
                headers: { 'Authorization': token },
            });
            if (!response.ok) throw new Error('Failed to fetch dashboard data');
            const data = await response.json();
            setUser(data);
        } catch (err) {
            setError(err.message);
        }
    }, []);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);
    
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
        const formData = new FormData();
        formData.append('avatar', selectedFile);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/upload-avatar`, {
                method: 'POST',
                headers: { 'Authorization': token },
                body: formData,
            });

            if (!response.ok) {
                 const errData = await response.json().catch(() => ({ message: 'Upload failed' }));
                throw new Error(errData.message || 'Upload failed');
            }
            setUploadStatus('Upload successful!');
            fetchDashboard(); // Refresh user data to show new avatar
        } catch (err) {
            setUploadStatus(`Error: ${err.message}`);
        }
    };

    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!user) return <p className="text-center">Loading dashboard...</p>;
    
    const avatarUrl = user.avatarUrl ? `${API_BASE_URL}${user.avatarUrl}` : 'https://placehold.co/128x128/E0E0E0/BDBDBD?text=No+Avatar';

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <div className="flex items-center space-x-6">
                <img src={avatarUrl} alt="User Avatar" className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200" />
                <div>
                    <p className="text-xl text-gray-800">Welcome, <span className="font-semibold">{user.email}</span>!</p>
                    <p className="text-gray-500">User ID: {user.id}</p>
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
