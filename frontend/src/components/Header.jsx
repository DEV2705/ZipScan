import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-white/10 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link
          to="/"
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
        >
          <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-xl font-bold text-white">CN</span>
          </div>
          <span className="text-xl font-bold text-white">CodeNest</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
          <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
          <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
          <Link to="/faculty-dashboard" className="text-gray-300 hover:text-white transition-colors">Faculty</Link>
          <Link to="/student-dashboard" className="text-gray-300 hover:text-white transition-colors">Student</Link>
        </nav>

        {/* Conditional User Info and Login/Logout */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile"> {/* 👈 Made the user info clickable */}
                <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                  <User className="w-4 h-4 text-gray-300" />
                  <span className="text-sm text-white font-medium">
                    {user?.first_name} {user?.last_name}
                  </span>
                  <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full capitalize font-medium">
                    {user?.role}
                  </span>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <button className="px-6 py-2 text-gray-300 hover:text-white font-medium transition duration-200">
                  Sign In
                </button>
              </Link>
              <Link to="/register">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition duration-200">
                  Get Started
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
