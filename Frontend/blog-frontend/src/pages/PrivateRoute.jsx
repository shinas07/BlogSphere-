import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!Cookies.get('access_token');
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
