import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem('token'); // Verificar si el token existe

  // Si no hay token, redirigir a la página de login
  return token ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
