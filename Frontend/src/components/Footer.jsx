import React from 'react';
import { FiGithub } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer className={`py-12 transition-all duration-300 border-t relative overflow-hidden ${
      darkMode ? 'bg-[#1a1f2e] border-gray-800/50' : 'bg-gray-50 border-gray-200/80'
    }`}>
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10 opacity-50">
         <div className={`absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full ${darkMode ? 'bg-[radial-gradient(circle_farthest-side,rgba(109,40,217,0.08),rgba(255,255,255,0))]' : 'bg-[radial-gradient(circle_farthest-side,rgba(109,40,217,0.04),rgba(255,255,255,0))]'}`}></div>
        <div className={`absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full ${darkMode ? 'bg-[radial-gradient(circle_farthest-side,rgba(37,99,235,0.06),rgba(255,255,255,0))]' : 'bg-[radial-gradient(circle_farthest-side,rgba(37,99,235,0.03),rgba(255,255,255,0))]'}`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
          <div className="flex flex-col space-y-4 text-center md:text-left items-center md:items-start">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3 group">
               <div className="relative">
                 <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:shadow-indigo-500/20 group-hover:scale-105">
                   <div className="w-5 h-5 sm:w-6 sm:h-6 text-white/90 relative">
                    <svg
                      viewBox="0 0 24 24"
                      className="absolute inset-0"
                      fill="currentColor"
                    >
                      <path d="M21.17 2.06A13.1 13.1 0 0019 1.87a12.94 12.94 0 00-7 2.05 12.94 12.94 0 00-7-2.05c-.74 0-1.47.06-2.17.19C1.7 2.21 1 3.06 1 4.04v13.92c0 .81.5 1.53 1.25 1.8.32.12.66.17 1 .17.7 0 1.38-.21 1.96-.61.86-.59 2.54-1.44 4.79-1.44 2.24 0 3.93.85 4.79 1.44.58.4 1.26.61 1.96.61.34 0 .68-.05 1-.17.75-.27 1.25-1 1.25-1.8V4.04c0-.98-.7-1.83-1.83-1.98zM11 14.915c-.66-.32-1.6-.66-3-.66-1.4 0-2.34.34-3 .66V4.495c.66-.32 1.6-.66 3-.66 1.4 0 2.34.34 3 .66v10.42zm9 0c-.66-.32-1.6-.66-3-.66-1.4 0-2.34.34-3 .66V4.495c.66-.32 1.6-.66 3-.66 1.4 0 2.34.34 3 .66v10.42z" />
                    </svg>
                  </div>
                </div>
                 <div className={`absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full ring-2 transition-all duration-300 ${darkMode ? 'ring-gray-900' : 'ring-white'}`}></div>
              </div>
              <div className="flex items-baseline">
                <span className={`font-bold text-2xl sm:text-3xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent transition-all duration-300 group-hover:opacity-90`}>
                  Convo
                </span>
                <span className={`text-xs sm:text-sm ml-2 mt-1 font-medium tracking-wider uppercase transition-colors duration-300 ${darkMode ? 'text-indigo-400/80' : 'text-indigo-600/80'}`}>
                  DOC to PDF
                </span>
              </div>
            </div>
            {/* Description */}
            <p className={`text-sm sm:text-base max-w-md leading-relaxed transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              A modern and efficient tool to convert Word documents to PDF format online. 
              No installation required, completely free to use.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <h3 className={`font-semibold text-lg sm:text-xl transition-colors duration-300 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Connect With Us
            </h3>
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* GitHub Link */}
              <a
                href="https://github.com/Kunaal64"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 sm:p-2.5 rounded-lg transition-all duration-300 group relative overflow-hidden border ${
                  darkMode 
                    ? 'bg-gray-800/50 hover:bg-gray-700/70 text-gray-400 hover:text-gray-200 border-gray-700/80 hover:border-gray-600' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 border-gray-200 hover:border-gray-300'
                }`}
                aria-label="GitHub Profile"
              >
                <span className="absolute top-0 left-0 -translate-x-[60%] translate-y-[-55%] rotate-[-45deg] w-[200%] h-[200%] bg-white/10 opacity-0 group-hover:opacity-100 transition-transform duration-500 group-hover:translate-x-[-20%] group-hover:translate-y-[-20%] will-change-transform z-0"></span>
                <FiGithub className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
              </a>
              {/* LinkedIn Link */}
              <a
                href="https://www.linkedin.com/in/kunal-sharma-4a0179271/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 sm:p-2.5 rounded-lg transition-all duration-300 group relative overflow-hidden border ${
                   darkMode 
                    ? 'bg-gray-800/50 hover:bg-gray-700/70 text-gray-400 hover:text-gray-200 border-gray-700/80 hover:border-gray-600' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 border-gray-200 hover:border-gray-300'
                }`}
                aria-label="LinkedIn Profile"
              >
                <span className="absolute top-0 left-0 -translate-x-[60%] translate-y-[-55%] rotate-[-45deg] w-[200%] h-[200%] bg-white/10 opacity-0 group-hover:opacity-100 transition-transform duration-500 group-hover:translate-x-[-20%] group-hover:translate-y-[-20%] will-change-transform z-0"></span>
                <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
