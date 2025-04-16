import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';

function Layout({ children }) {
  const { darkMode } = useTheme();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  return (
    <div 
      className={`min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
        darkMode ? 'bg-[#1a1f2e] text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: darkMode 
            ? 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.03), transparent 50%)'
            : 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.02), transparent 50%)',
          opacity: 0.8,
          transition: 'background-image 0.3s ease-in-out'
        }}
      />
      <Navbar />
      <main className="flex-grow relative">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout; 