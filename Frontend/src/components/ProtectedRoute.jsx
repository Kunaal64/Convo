import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

export function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    return <div>Loading...</div>; // Or a nice loading spinner
  }

  if (!isSignedIn) {
    // Redirect to the home page if not signed in
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
