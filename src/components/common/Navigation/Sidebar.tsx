import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';
import { RootState } from '@/store';
import logo from '@/assets/logo.svg';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userRole = useSelector((state: RootState) => state.auth.role) || 'user';

  const adminRoutes = [
    { path: '/', label: 'Dashboard' },
    { path: '/events', label: 'Events' },
    { path: '/agents', label: 'Agents' },
    { path: '/users', label: 'Users' },
    { path: '/tickets', label: 'Tickets' },
    { path: '/bookings', label: 'Bookings' },
    { path: '/payments', label: 'Payments' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/contact', label: 'Contact' },
  ];

  const userRoutes = [
    { path: '/', label: 'Dashboard' },
    { path: '/events', label: 'Events' },
    { path: '/tickets', label: 'My Tickets' },
    { path: '/bookings', label: 'My Bookings' },
  ];

  const agentRoutes = [
    { path: '/', label: 'Dashboard' },
    { path: '/scanner', label: 'Ticket Scanner' },
    { path: '/verification', label: 'Verify Tickets' },
    { path: '/events', label: 'Events' },
  ];

  const getRoutes = () => {
    switch (userRole) {
      case 'admin':
        return adminRoutes;
      case 'user':
        return userRoutes;
      case 'agent':
        return agentRoutes;
      default:
        return userRoutes;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isActiveRoute = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return path !== '/' && location.pathname.startsWith(path);
  };

  return (
    <aside className="bg-[#000000] text-white w-64 min-h-screen p-4 flex flex-col">
      <div className="mb-5 flex items-center space-x-2">
        <img src={logo} alt="WalkInn Logo" className="h-8 w-8" />
        <h2 className="text-xl font-bold text-[#ffffff]">WalkInn</h2>
      </div>
      <nav className="space-y-2 flex-grow">
        {getRoutes().map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={`block py-2 px-4 rounded transition-colors duration-200
              ${isActiveRoute(route.path)
                ? 'bg-primary text-[#ffffff]'
                : 'text-[#ffffff] hover:bg-[#ffffff]/10'
              }`}
          >
            {route.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto w-full py-2 px-4 bg-primary hover:bg-primary/90 rounded transition-colors duration-200 text-[#ffffff] text-center"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;