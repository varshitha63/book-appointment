import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const user = localStorage.getItem("user");

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <NavLink to="/" className="flex flex-col">
              <div className="flex items-center space-x-2">
                <Stethoscope className="h-7 w-7 text-emerald-600" />
                <span className="text-2xl font-extrabold text-slate-900 tracking-tighter">OroGlee</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold ml-9 -mt-1">Find Your Perfect Dentist</span>
            </NavLink>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-6">
            <div className="hidden md:flex items-center space-x-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                Admin
              </NavLink>
            </div>
            <button 
              onClick={handleProfileClick}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-sm active:scale-95"
            >
              {user ? "Profile" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
