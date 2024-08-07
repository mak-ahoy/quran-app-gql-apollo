import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';


const ProtectedRoute = ({ element: Component}) => {
  const {user} = useAuth();
  
  console.log(user)

  return user.state !== false ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
