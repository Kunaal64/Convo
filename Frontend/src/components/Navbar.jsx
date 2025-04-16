import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiClock,
  FiSettings,
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinkClasses = (path) =>
    `flex items-center space-x-2 px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
      isActive(path)
        ? darkMode
          ? "bg-blue-500/10 text-blue-400"
          : "bg-blue-50 text-blue-600"
        : darkMode
        ? "text-gray-400 hover:text-white hover:bg-gray-800"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    }`;

  const mobileNavLinkClasses = (path) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
      isActive(path)
        ? darkMode
          ? "bg-blue-500/10 text-blue-400"
          : "bg-blue-50 text-blue-600"
        : darkMode
        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        darkMode
          ? "bg-[#1f2433]/80 border-gray-800 backdrop-blur-lg"
          : "bg-white/80 border-gray-200 backdrop-blur-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-indigo-500/30 group-hover:scale-105">
                  <div className="w-6 h-6 text-white/90 relative">
                    <svg
                      viewBox="0 0 24 24"
                      className="absolute inset-0"
                      fill="currentColor"
                    >
                      <path d="M21.17 2.06A13.1 13.1 0 0019 1.87a12.94 12.94 0 00-7 2.05 12.94 12.94 0 00-7-2.05c-.74 0-1.47.06-2.17.19C1.7 2.21 1 3.06 1 4.04v13.92c0 .81.5 1.53 1.25 1.8.32.12.66.17 1 .17.7 0 1.38-.21 1.96-.61.86-.59 2.54-1.44 4.79-1.44 2.24 0 3.93.85 4.79 1.44.58.4 1.26.61 1.96.61.34 0 .68-.05 1-.17.75-.27 1.25-1 1.25-1.8V4.04c0-.98-.7-1.83-1.83-1.98zM11 14.915c-.66-.32-1.6-.66-3-.66-1.4 0-2.34.34-3 .66V4.495c.66-.32 1.6-.66 3-.66 1.4 0 2.34.34 3 .66v10.42zm9 0c-.66-.32-1.6-.66-3-.66-1.4 0-2.34.34-3 .66V4.495c.66-.32 1.6-.66 3-.66 1.4 0 2.34.34 3 .66v10.42z" />
                    </svg>
                  </div>
                </div>
                <div
                  className={`absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full ring-2 transition-all duration-300 ${
                    darkMode ? "ring-gray-900" : "ring-white"
                  }`}
                ></div>
              </div>
              <div className="flex items-baseline">
                <span
                  className={`font-bold text-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent transition-all duration-300 group-hover:opacity-90`}
                >
                  Convo
                </span>
                <span
                  className={`hidden sm:block text-xs ml-1.5 font-medium tracking-wider uppercase transition-colors duration-300 ${
                    darkMode ? "text-indigo-400/80" : "text-indigo-600/80"
                  }`}
                >
                  DOC to PDF
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className={navLinkClasses("/")}>
              <FiHome className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link to="/history" className={navLinkClasses("/history")}>
              <FiClock className="w-5 h-5" />
              <span>History</span>
            </Link>
            <button
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ml-4 ${
                darkMode
                  ? "text-yellow-400 hover:text-yellow-300 hover:bg-gray-800"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
              }`}
              onClick={toggleTheme}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <FiSun className="w-6 h-6" />
              ) : (
                <FiMoon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="-mr-2 flex md:hidden items-center space-x-2">
            <button
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                darkMode
                  ? "text-yellow-400 hover:text-yellow-300 hover:bg-gray-800"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
              }`}
              onClick={toggleTheme}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <FiSun className="w-6 h-6" />
              ) : (
                <FiMoon className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md transition-all duration-300 ${
                darkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500`}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden border-t ${
          darkMode ? "border-gray-700/50" : "border-gray-200"
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className={mobileNavLinkClasses("/")}>
            <FiHome className="w-5 h-5 mr-3" /> Home
          </Link>
          <Link to="/history" className={mobileNavLinkClasses("/history")}>
            <FiClock className="w-5 h-5 mr-3" /> History
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
