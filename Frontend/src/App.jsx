import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import { ThemeProvider } from './context/ThemeContext';
import { HistoryProvider } from './context/HistoryContext';
import Layout from './components/Layout';
import Home from './components/Home';
import History from './components/History';
import Profile from './components/Profile';
import { ProtectedRoute } from './components/ProtectedRoute';

// Get the Publishable Key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Component to handle the redirect after sign in/up
const ClerkProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();
  
  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      {children}
    </ClerkProvider>
  );
};

function App() {
  return (
    <Router>
      <ClerkProviderWithNavigate>
        <ThemeProvider>
          <HistoryProvider>
            <Routes>
              <Route path="/" element={
                <Layout>
                  <Home />
                </Layout>
              } />
              
              <Route path="/sign-in/*" element={
                <div className="flex items-center justify-center min-h-screen p-4">
                  <div className="w-full max-w-md">
                    <SignIn 
                      routing="path" 
                      path="/sign-in" 
                      signUpUrl="/sign-up"
                      afterSignInUrl="/profile"
                    />
                  </div>
                </div>
              } />
              
              <Route path="/sign-up/*" element={
                <div className="flex items-center justify-center min-h-screen p-4">
                  <div className="w-full max-w-md">
                    <SignUp 
                      routing="path" 
                      path="/sign-up" 
                      signInUrl="/sign-in"
                      afterSignUpUrl="/profile"
                    />
                  </div>
                </div>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/history" element={
                <ProtectedRoute>
                  <Layout>
                    <History />
                  </Layout>
                </ProtectedRoute>
              } />
            </Routes>
          </HistoryProvider>
        </ThemeProvider>
      </ClerkProviderWithNavigate>
    </Router>
  );
}

export default App;
