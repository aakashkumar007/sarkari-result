import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie to access cookies

const PrivateRoute = () => {
  // Check if token exists in cookies to confirm user is authenticated
  const token = Cookies.get('token'); // Get the token from cookies
  if (!token) {
    // If no token, redirect to SignIn page
    return <Navigate to="/signin" />;
  }

  // If token exists, render the child components (Outlet is used for nested routes)
  return <Outlet />;
};

export default PrivateRoute;
