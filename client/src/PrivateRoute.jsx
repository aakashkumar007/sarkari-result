// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Check if token exists in localStorage to confirm user is authenticated
  const token = localStorage.getItem('token');
  
  if (!token) {
    // If no token, redirect to SignIn page
    return <Navigate to="/signin" />;
  }

  // If token exists, render the child components (Outlet is used for nested routes)
  return <Outlet />;
};

export default PrivateRoute;
