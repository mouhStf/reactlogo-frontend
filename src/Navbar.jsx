import { NavLink, useNavigate } from "react-router";
import { useAuth } from "./hooks/useAuth";


export function Navbar() {

  const navigate = useNavigate();
  const {isAuthenticated, logout} = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink className="font-bold text-xl text-indigo-600 cursor-pointer" to='/'>GoReact</NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink to='/' className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Home</NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to='/dashboard' className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</NavLink>
                <button 
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => {logout(), navigate('/login')}}
                >Logout</button>
              </>
            ) : (
                <>
                  <NavLink to='/login' className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Login</NavLink>

                  <NavLink to='/signup' className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium">Sign Up</NavLink>
                </>
              )}
          </div>
        </div>
      </div>
    </nav>
  );
}

