import React, { useState } from "react";
import {
  FiClock,
  FiFile,
  FiDownload,
  FiTrash2,
  FiAlertCircle,
  FiTrash,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useHistory } from "../context/HistoryContext";
import { format } from "date-fns";
import { BrowserRouter as Router, Route } from "react-router-dom";

function History() {
  const { darkMode } = useTheme();
  const { history, deleteFromHistory, clearHistory } = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const handleDelete = (id) => {
    deleteFromHistory(id);
    setShowDeleteModal(false);
  };

  const handleClearHistory = () => {
    clearHistory();
    setShowClearModal(false);
  };

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleDownload = (pdfData, fileName) => {
    // Convert base64 to blob
    const byteCharacters = atob(pdfData.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Create and trigger download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-[#1a1f2e]" : "bg-gray-100"
      }`}
    >
      <div
        className={`absolute inset-0 -z-10 h-full w-full ${
          darkMode ? "bg-slate-950" : "bg-white"
        } bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]`}
      ></div>

      <div className="max-w-7xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-0">
              <FiClock
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <h1
                className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Conversion History
              </h1>
            </div>
            {history.length > 0 && (
              <button
                onClick={() => setShowClearModal(true)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 group relative overflow-hidden shadow hover:shadow-md ${
                  darkMode
                    ? "bg-red-900/40 hover:bg-red-900/60 text-red-400 border border-red-500/30 hover:border-red-500/50"
                    : "bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 hover:border-red-300"
                }`}
              >
                <span className="absolute top-0 left-0 -translate-x-[60%] translate-y-[-55%] rotate-[-45deg] w-[200%] h-[200%] bg-white/10 opacity-0 group-hover:opacity-100 transition-transform duration-500 group-hover:translate-x-[-20%] group-hover:translate-y-[-20%] will-change-transform z-0"></span>
                <FiTrash className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                <span className="relative z-10">Clear History</span>
              </button>
            )}
          </div>

          <div
            className={`rounded-2xl transition-all duration-300 border shadow-lg hover:shadow-xl ${
              darkMode
                ? "bg-[#1f2433]/70 border-gray-700/50 backdrop-blur-md"
                : "bg-white/70 border-gray-200 backdrop-blur-md"
            } p-4 sm:p-6`}
          >
            {history.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-xl transition-all duration-300 border ${
                      darkMode
                        ? "bg-[#1a1f2e]/60 border-gray-700/40 hover:bg-[#2a303c]/70 hover:border-gray-600/60"
                        : "bg-gray-50/70 border-gray-200/80 hover:bg-white/90 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-0 flex-grow w-full sm:w-auto min-w-0">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex-shrink-0 flex items-center justify-center transition-colors duration-300 ${
                          darkMode ? "bg-blue-500/10" : "bg-blue-100"
                        }`}
                      >
                        <FiFile
                          className={`w-5 h-5 transition-colors duration-300 ${
                            darkMode ? "text-blue-400" : "text-blue-600"
                          }`}
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3
                          className={`font-medium text-sm sm:text-base break-words transition-colors duration-300 ${
                            darkMode ? "text-gray-100" : "text-gray-800"
                          }`}
                        >
                          {item.fileName}
                        </h3>
                        <div
                          className={`text-xs sm:text-sm transition-colors duration-300 ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <span className="block sm:inline">
                            {format(new Date(item.date), "MMM d, yyyy h:mm a")}
                          </span>
                          <span className="hidden sm:inline mx-1 sm:mx-2">
                            •
                          </span>
                          <span className="block sm:inline">
                            {formatFileSize(item.originalSize)} →{" "}
                            {formatFileSize(item.convertedSize)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 self-end sm:self-center flex-shrink-0 mt-2 sm:mt-0">
                      <button
                        onClick={() =>
                          handleDownload(item.pdfData, item.convertedFileName)
                        }
                        className={`p-2 rounded-lg transition-all duration-300 group relative overflow-hidden border ${
                          darkMode
                            ? "bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 hover:text-blue-300 border-blue-500/20 hover:border-blue-500/40"
                            : "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200/80 hover:border-blue-300"
                        }`}
                        aria-label="Download converted file"
                      >
                        <span className="absolute top-0 left-0 -translate-x-[60%] translate-y-[-55%] rotate-[-45deg] w-[200%] h-[200%] bg-white/10 opacity-0 group-hover:opacity-100 transition-transform duration-500 group-hover:translate-x-[-20%] group-hover:translate-y-[-20%] will-change-transform z-0"></span>
                        <FiDownload className="w-5 h-5 relative z-10" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(item)}
                        className={`p-2 rounded-lg transition-all duration-300 group relative overflow-hidden border ${
                          darkMode
                            ? "bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-red-300 border-red-500/20 hover:border-red-500/40"
                            : "bg-red-50 hover:bg-red-100 text-red-700 border-red-200/80 hover:border-red-300"
                        }`}
                        aria-label="Delete file"
                      >
                        <span className="absolute top-0 left-0 -translate-x-[60%] translate-y-[-55%] rotate-[-45deg] w-[200%] h-[200%] bg-white/10 opacity-0 group-hover:opacity-100 transition-transform duration-500 group-hover:translate-x-[-20%] group-hover:translate-y-[-20%] will-change-transform z-0"></span>
                        <FiTrash2 className="w-5 h-5 relative z-10" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 sm:py-16">
                <FiClock
                  className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 transition-colors duration-300 ${
                    darkMode ? "text-gray-600" : "text-gray-400"
                  }`}
                />
                <h3
                  className={`text-base sm:text-lg font-medium mb-2 transition-colors duration-300 ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  No Conversion History
                </h3>
                <p
                  className={`text-sm transition-colors duration-300 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Your converted files will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
            onClick={() => setShowDeleteModal(false)}
          />
          <div
            className={`relative rounded-2xl shadow-xl transition-all duration-300 transform border animate-modal-pop ${
              darkMode
                ? "bg-[#1f2433] border-gray-700"
                : "bg-white border-gray-200"
            } p-5 sm:p-6 max-w-sm sm:max-w-md w-full`}
          >
            <div className="flex items-start mb-4">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 flex items-center justify-center mr-3 sm:mr-4 transition-colors duration-300 ${
                  darkMode ? "bg-red-500/10" : "bg-red-100"
                }`}
              >
                <FiAlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
              </div>
              <div className="flex-grow">
                <h3
                  className={`text-base sm:text-lg font-semibold mb-1 sm:mb-2 transition-colors duration-300 ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Delete File
                </h3>
                <p
                  className={`text-xs sm:text-sm transition-colors duration-300 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Are you sure you want to delete "
                  <span className="font-medium break-all">
                    {selectedItem?.fileName}
                  </span>
                  "? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 sm:space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 border ${
                  darkMode
                    ? "bg-gray-700/50 hover:bg-gray-600/70 text-gray-300 border-gray-600/80 hover:border-gray-500"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200 hover:border-gray-300"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedItem.id)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 border shadow-sm hover:shadow ${
                  darkMode
                    ? "bg-red-800 hover:bg-red-700 text-white border-red-700/50 hover:border-red-600"
                    : "bg-red-600 hover:bg-red-700 text-white border-red-700/50 hover:border-red-600"
                }`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showClearModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
            onClick={() => setShowClearModal(false)}
          />
          <div
            className={`relative rounded-2xl shadow-xl transition-all duration-300 transform border animate-modal-pop ${
              darkMode
                ? "bg-[#1f2433] border-gray-700"
                : "bg-white border-gray-200"
            } p-5 sm:p-6 max-w-sm sm:max-w-md w-full`}
          >
            <div className="flex items-start mb-4">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 flex items-center justify-center mr-3 sm:mr-4 transition-colors duration-300 ${
                  darkMode ? "bg-red-500/10" : "bg-red-100"
                }`}
              >
                <FiAlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
              </div>
              <div className="flex-grow">
                <h3
                  className={`text-base sm:text-lg font-semibold mb-1 sm:mb-2 transition-colors duration-300 ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Clear All History
                </h3>
                <p
                  className={`text-xs sm:text-sm transition-colors duration-300 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Are you sure you want to clear all conversion history? This
                  action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 sm:space-x-3">
              <button
                onClick={() => setShowClearModal(false)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 border ${
                  darkMode
                    ? "bg-gray-700/50 hover:bg-gray-600/70 text-gray-300 border-gray-600/80 hover:border-gray-500"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200 hover:border-gray-300"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleClearHistory}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 border shadow-sm hover:shadow ${
                  darkMode
                    ? "bg-red-800 hover:bg-red-700 text-white border-red-700/50 hover:border-red-600"
                    : "bg-red-600 hover:bg-red-700 text-white border-red-700/50 hover:border-red-600"
                }`}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;
