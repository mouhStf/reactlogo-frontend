import { useEffect} from 'react';
import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router';
import { useAuth } from './hooks/useAuth';
import { LoginPage } from './pages/Login';
import { DashboardPage } from './pages/Dashboard';
import { HomePage } from './pages/Home';
import { Navbar } from './Navbar';
import { SignupPage } from './pages/Signup';


async function protectedLoader() {
  const isLoggedIn = localStorage.getItem('token');
  if (isLoggedIn) {
    throw redirect('/dashboard');
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    children: [
      { path: '', element: <HomePage/>, },
      { path: 'signup', element: <SignupPage/> },
      { path: 'login', element: <LoginPage/>, loader: protectedLoader },
      { path: 'dashboard', element: <DashboardPage/>,
        loader: async () => {
          const isLoggedIn = localStorage.getItem('token');
          if (!isLoggedIn) {
            throw redirect('/login');
          }
          return null;
        }
      }
    ],
  }
])



function Root() {
  const {authenticate} = useAuth();

  useEffect(() => { authenticate(); }, []);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Navbar/>
      <main className="p-4 md:p-8">
        <Outlet/>
      </main>
    </div>
  );
}

export default function App() {
  return <RouterProvider router={router}/>
}
