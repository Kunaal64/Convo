import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { FiHome, FiClock, FiSun, FiMoon, FiMenu, FiX, FiLogIn, FiUserPlus, FiZap } from "react-icons/fi";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const { isLoaded, isSignedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    // Special handling for the dashboard/home route
    if (path === '/app' && location.pathname === '/app') return true;
    return location.pathname.startsWith(path) && path !== '/';
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinkClasses = (path) =>
    `flex items-center space-x-2 px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
      isActive(path)
        ? darkMode
          ? "bg-primary/10 text-primary-foreground"
          : "bg-primary/10 text-primary"
        : darkMode
        ? "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    }`;

  const mobileNavLinkClasses = (path) =>
    `block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
      isActive(path)
        ? darkMode
          ? "bg-primary/10 text-primary-foreground"
          : "bg-primary/10 text-primary"
        : darkMode
        ? "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    }`;

  // Render nothing if auth is still loading
  if (!isLoaded) return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-300 ${
      darkMode 
        ? "bg-[#1f2433]/80 border-gray-800 backdrop-blur-lg" 
        : "bg-white/80 border-gray-200 backdrop-blur-lg"
    }`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {isSignedIn ? (
            <Link to="/app" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-indigo-500/30 group-hover:scale-105">
                  <div className="w-6 h-6 text-white/90 relative">
                    <svg viewBox="0 0 24 24" className="absolute inset-0" fill="currentColor">
                      <path d="M21.17 2.06A13.1 13.1 0 0019 1.87a12.94 12.94 0 00-7 2.05 12.94 12.94 0 00-7-2.05c-.74 0-1.47.06-2.17.19C1.7 2.21 1 3.06 1 4.04v13.92c0 .81.5 1.53 1.25 1.8.32.12.66.17 1 .17.7 0 1.38-.21 1.96-.61.86-.59 2.54-1.44 4.79-1.44 2.24 0 3.93.85 4.79 1.44.58.4 1.26.61 1.96.61.34 0 .68-.05 1-.17.75-.27 1.25-1 1.25-1.8V4.04c0-.98-.7-1.83-1.83-1.98zM11 14.915c-.66-.32-1.6-.66-3-.66-1.4 0-2.34.34-3 .66V4.495c.66-.32 1.6-.66 3-.66 1.4 0 2.34.34 3 .66v10.42zm9 0c-.66-.32-1.6-.66-3-.66-1.4 0-2.34.34-3 .66V4.495c.66-.32 1.6-.66 3-.66 1.4 0 2.34.34 3 .66v10.42z" />
                    </svg>
                  </div>
                </div>
                <div className={`absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full ring-2 transition-all duration-300 ${
                  darkMode ? "ring-gray-900" : "ring-white"
                }`}></div>
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Convo
              </span>
            </Link>
          ) : (
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-indigo-500/30 group-hover:scale-105">
                  <div className="w-6 h-6 text-white/90 relative">
                    <svg viewBox="0 0 24 24" className="absolute inset-0" fill="currentColor">
                      <path d="M21.17 2.06A13.1 13.1 0 0019 1.87a12.94 12.94 0 00-7 2.05 12.94 12.94 0 00-7-2.05c-.74 0-1.47.06-2.17.19C1.7 2.21 1 3.06 1 4.04v13.92c0 .81.5 1.53 1.25 1.8.32.12.66.17 1 .17.7 0 1.38-.21 1.96-.61.86-.59 2.54-1.44 4.79-1.44 2.24 0 3.93.85 4.79 1.44.58.4 1.26.61 1.96.61.34 0 .68-.05 1-.17.75-.27 1.25-1 1.25-1.8V4.04c0-.98-.7-1.83-1.83-1.98zM11 14.915c-.66-.32-1.6-.66-3-.66-1.4 0-2.34.34-3 .66V4.495c.66-.32 1.6-.66 3-.66 1.4 0 2.34.34 3 .66v10.42zm9 0c-.66-.32-1.6-.66-3-.66-1.4 0-2.34.34-3 .66V4.495c.66-.32 1.6-.66 3-.66 1.4 0 2.34.34 3 .66v10.42z" />
                    </svg>
                  </div>
                </div>
                <div className={`absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full ring-2 transition-all duration-300 ${
                  darkMode ? "ring-gray-900" : "ring-white"
                }`}></div>
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Convo
              </span>
            </Link>
          )}
          
          {isSignedIn && (
            <nav className="hidden items-center space-x-4 text-sm font-medium md:flex">
              <Link to="/app" className={navLinkClasses("/app")}>
                <FiHome className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link to="/app/history" className={navLinkClasses("/app/history")}>
                <FiClock className="h-4 w-4" />
                <span>History</span>
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-foreground/60 transition-colors hover:text-foreground/80"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <FiSun className="h-5 w-5" />
            ) : (
              <FiMoon className="h-5 w-5" />
            )}
          </button>

          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                to="/signin"
                className="rounded-md px-4 py-2 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Sign Up
              </Link>
            </div>
          )}
          
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground/60 transition-colors hover:text-foreground/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Toggle menu</span>
              {isMobileMenuOpen ? (
                <FiX className="h-5 w-5" />
              ) : (
                <FiMenu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="space-y-1 px-2 pb-3 pt-2">
          {isSignedIn ? (
            <>
              <Link to="/app" className={mobileNavLinkClasses("/app")}>
                <FiHome className="mr-2 inline-block h-5 w-5" />
                Dashboard
              </Link>
              <Link to="/app/history" className={mobileNavLinkClasses("/app/history")}>
                <FiClock className="mr-2 inline-block h-5 w-5" />
                History
              </Link>
              <Link to="/app/aurora" className={mobileNavLinkClasses("/app/aurora")}>
                <FiZap className="mr-2 inline-block h-5 w-5" />
                Aurora Demo
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin" className={mobileNavLinkClasses("/signin")}>
                <FiLogIn className="mr-2 inline-block h-5 w-5" />
                Sign In
              </Link>
              <Link to="/signup" className={mobileNavLinkClasses("/signup")}>
                <FiUserPlus className="mr-2 inline-block h-5 w-5" />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
