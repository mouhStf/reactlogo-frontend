import { useEffect} from 'react';
import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router';
import { useAuth } from './hooks/useAuth';
import { LoginPage } from './pages/Login';
import { DashboardPage } from './pages/Dashboard';
import { HomePage } from './pages/Home';
import { Navbar } from './Navbar';
import { SignupPage } from './pages/Signup';
import { Shop } from './pages/Shop';
import { Product } from './pages/Product';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import Aos from 'aos';
import "aos/dist/aos.css";
import { Search } from './pages/Search';

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
      { 
        path: 'shop',
        children: [
          {path: '', element: <Shop/>, },
          {path: 'produit', element: <Product/>, },
        ],
      },
      { 
        path: 'blog',
        children: [
          {path: '', element: <Blog/>, },
          {path: ':id', element: <BlogPost/>, },
          {path: 'search',
            children: [
              {path: '', element: <Search/>, },
            ]
          },
        ],
      },
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

  useEffect(() => { 
    Aos.init({
      duration: 1200,
      once: true,
      easing: 'ease'
    });
    authenticate(); 
  }, []);

  return (
    <div className="min-h-screen font-serif">
      <Navbar/>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}

export default function App() {
  return <RouterProvider router={router}/>
}
