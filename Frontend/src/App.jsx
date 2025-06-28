import React from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { HistoryProvider } from './context/HistoryContext';
import { useAuth } from '@clerk/clerk-react';
import Layout from './components/Layout';
import Home from './components/Home';
import History from './components/History';
import LandingPage from './components/LandingPage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';

function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    // Store the current location they were trying to go to when they were redirected
    return <Navigate to={`/signin?redirectUrl=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth();
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isSignedIn) {
    // Redirect to dashboard if user is already signed in
    return <Navigate to="/app" replace />;
  }

  return children;
}

function App() {
  return (
    <ThemeProvider>
      <HistoryProvider>
        <Routes>
          {/* Public routes - only accessible when not signed in */}
          <Route path="/" element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          } />
          <Route path="/signin" element={
            <PublicRoute>
              <SignInPage />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          } />
          
          {/* Protected routes */}
          <Route path="/app" element={
            <ProtectedRoute>
              <Layout>
                <Outlet />
              </Layout>
            </ProtectedRoute>
          }>
            <Route index element={<Home />} />
            <Route path="history" element={<History />} />
          </Route>
          
          {/* Catch all other routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HistoryProvider>
    </ThemeProvider>
  );
}

export default App;
