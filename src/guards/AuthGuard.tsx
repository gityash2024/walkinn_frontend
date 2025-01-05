// src/guards/AuthGuard.tsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const location = useLocation();
  const { token, role } = useSelector((state: RootState) => state.auth);

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based route protection
  const adminOnlyPaths = ['/users', '/analytics', '/pricing'];
  const agentOnlyPaths = ['/scanner', '/verification'];

  const isAdminRoute = adminOnlyPaths.some(path => location.pathname.startsWith(path));
  const isAgentRoute = agentOnlyPaths.some(path => location.pathname.startsWith(path));

  if (isAdminRoute && role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  if (isAgentRoute && !['agent', 'admin'].includes(role || '')) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;