import React from 'react';
import { School, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { authService } from '../services/api';

const Navbar = ({ user, setUser, onAuthClick }) => {
  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <nav className="glass sticky top-4 mx-4 my-4 p-4 flex items-center justify-between z-50">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <School size={24} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          SchoolSphere
        </span>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-300">
              <UserIcon size={18} />
              <span>{user.email}</span>
            </div>
            <button onClick={handleLogout} className="btn btn-outline text-red-400 border-red-400/20 hover:bg-red-400/10">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <button onClick={onAuthClick} className="btn btn-primary">
            <LogIn size={18} />
            <span>Admin Login</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
