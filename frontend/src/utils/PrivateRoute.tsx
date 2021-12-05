import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute: React.FC = () => {
  const { user: userInfo } = useAuth();

  return userInfo ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
