
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Train } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-rail-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Train size={24} />
            <span className="text-xl font-bold">Train Seat Navigator</span>
          </Link>

          <nav>
            <ul className="flex space-x-4 items-center">
              <li>
                <Link to="/" className="hover:text-rail-secondary transition-colors">
                  Home
                </Link>
              </li>
              
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/dashboard" className="hover:text-rail-secondary transition-colors">
                      Book Seats
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-bookings" className="hover:text-rail-secondary transition-colors">
                      My Bookings
                    </Link>
                  </li>
                  <li className="ml-4">
                    <span className="mr-2">Hello, {user?.username}</span>
                    <Button 
                      variant="destructive" 
                      onClick={handleLogout}
                      size="sm"
                    >
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">
                      <Button variant="outline" className="bg-white text-rail-primary">
                        Login
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup">
                      <Button className="bg-rail-secondary text-white hover:bg-rail-secondary/90">
                        Sign Up
                      </Button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
