import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  FiUploadCloud,
  FiFile,
  FiLoader,
  FiCheck,
  FiX,
  FiDownload,
} from "react-icons/fi";
import { useHistory } from "../context/HistoryContext";
import { useTheme } from "../context/ThemeContext";
import { convertFile } from "../services/api";

function Home() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { addToHistory } = useHistory();
  const { darkMode } = useTheme();
// pp
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFile(acceptedFiles[0]);
      setStatus({ type: "", message: "" });
      setProgress(0);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
    maxSize: 10485760, // 10MB
  });

  const handleConvert = async () => {
    if (!file) return;

    setIsLoading(true);
    setStatus({ type: "", message: "" });
    setProgress(0);

    try {
      const blob = await convertFile(file, (progress) => {
        setProgress(progress);
      });

      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        const convertedFileName = file.name.replace(/\.[^/.]+$/, "") + ".pdf";

        // Add to conversion history with base64 data
        addToHistory({
          originalName: file.name,
          convertedName: convertedFileName,
          originalSize: file.size,
          convertedSize: blob.size,
          pdfData: base64data,
        });

        // Create temporary URL for immediate download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", convertedFileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      };

      setFile(null);
      setStatus({ type: "success", message: "File converted successfully!" });
    } catch (error) {
      console.error("Conversion error:", error);
      setStatus({
        type: "error",
        message: error.message || "Error converting file. Please try again.",
      });
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-[#1a1f2e] text-gray-300" : "bg-gray-100 text-gray-700"
      }`}
    >
      <div
        className={`absolute inset-0 -z-10 h-full w-full ${
          darkMode ? "bg-slate-950" : "bg-white"
        } bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]`}
      >
        <div
          className={`absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full ${
            darkMode ? "bg-fuchsia-400" : "bg-fuchsia-200"
          } opacity-20 blur-[100px]`}
        ></div>
      </div>

      <div className="max-w-3xl mx-auto pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center animate-fade-in">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent transition-colors duration-300 ${
              darkMode ? "" : ""
            }`}
          >
            Convert Word to PDF Online
          </h1>
          <p
            className={`text-base sm:text-lg mb-8 sm:mb-12 transition-colors duration-300 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Easily convert Word documents to PDF format online, without
            installing any software.
          </p>
        </div>

        <div
          className={`rounded-3xl p-5 sm:p-6 shadow-xl mb-8 animate-slide-in transition-all duration-300 max-w-2xl mx-auto border ${
            darkMode
              ? "bg-[#1f2433]/70 border-gray-700/50 backdrop-blur-md"
              : "bg-white/70 border-gray-200 backdrop-blur-md"
          }`}
        >
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 group relative overflow-hidden ${
              isDragActive
                ? darkMode
                  ? "border-blue-500 bg-blue-900/30"
                  : "border-blue-600 bg-blue-500/10"
                : darkMode
                ? "border-gray-600/50 hover:border-blue-500 bg-[#1a1f2e]/50 hover:bg-blue-900/20"
                : "border-gray-300/70 hover:border-blue-600 bg-gray-50/50 hover:bg-blue-50/70"
            }`}
          >
            <input {...getInputProps()} />
            <div
              className={`absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${
                darkMode
                  ? "bg-gradient-radial from-white/5 via-white/1 to-transparent"
                  : "bg-gradient-radial from-black/5 via-black/1 to-transparent"
              }`}
            ></div>

            <div className="relative z-10">
              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  darkMode
                    ? "bg-blue-500/10 group-hover:bg-blue-500/20"
                    : "bg-blue-100 group-hover:bg-blue-200/70"
                }`}
              >
                <FiUploadCloud
                  className={`w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 ${
                    darkMode
                      ? "text-blue-400 group-hover:text-blue-300"
                      : "text-blue-600 group-hover:text-blue-700"
                  } ${isDragActive ? "scale-110" : ""}`}
                />
              </div>
              <p
                className={`text-base sm:text-xl mb-1 sm:mb-2 font-medium transition-colors duration-300 ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {isDragActive
                  ? "Drop your file here"
                  : "Drag & drop your file here or click to browse"}
              </p>
              <p
                className={`text-xs sm:text-sm transition-colors duration-300 ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Supported formats: .doc, .docx
              </p>
            </div>
          </div>

          {file && (
            <div className="mt-4 sm:mt-6 animate-fade-in">
              <div
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-xl transition-all duration-300 border ${
                  darkMode
                    ? "bg-[#1a1f2e]/70 border-gray-700/50"
                    : "bg-gray-50/80 border-gray-200/80"
                }`}
              >
                <div className="flex items-center space-x-3 mb-2 sm:mb-0 flex-grow w-full sm:w-auto min-w-0">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                      darkMode ? "bg-blue-500/10" : "bg-blue-100"
                    }`}
                  >
                    <FiFile
                      className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <span
                      className={`block font-medium text-sm sm:text-base truncate transition-colors duration-300 ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {file.name}
                    </span>
                    <p
                      className={`text-xs sm:text-sm transition-colors duration-300 ${
                        darkMode ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className={`p-2 rounded-lg transition-all duration-300 self-end sm:self-center flex-shrink-0 ${
                    darkMode
                      ? "hover:bg-gray-700 text-gray-500 hover:text-red-400"
                      : "hover:bg-gray-200 text-gray-500 hover:text-red-500"
                  }`}
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {isLoading && progress > 0 && (
                <div className="mt-4">
                  <div
                    className={`h-2 rounded-full overflow-hidden transition-colors duration-300 ${
                      darkMode ? "bg-gray-700/50" : "bg-gray-200/80"
                    }`}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p
                    className={`text-xs sm:text-sm mt-2 text-center transition-colors duration-300 ${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Converting... {progress}%
                  </p>
                </div>
              )}

              <button
                onClick={handleConvert}
                disabled={isLoading}
                className={`w-full mt-4 font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-sm sm:text-base text-white transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden group shadow-lg hover:shadow-xl ${
                  isLoading
                    ? "bg-gradient-to-r from-gray-500 to-gray-600 opacity-70 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:scale-[0.98]"
                }`}
              >
                <span className="absolute top-0 left-0 -translate-x-[60%] translate-y-[-55%] rotate-[-45deg] w-[200%] h-[200%] bg-white/10 opacity-0 group-hover:opacity-100 transition-transform duration-500 group-hover:translate-x-[-20%] group-hover:translate-y-[-20%] will-change-transform"></span>
                {isLoading ? (
                  <>
                    <FiLoader className="w-5 h-5 animate-spin relative z-10" />
                    <span className="relative z-10">Converting...</span>
                  </>
                ) : (
                  <>
                    <FiDownload className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Convert to PDF</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {!file && (
          <div className="max-w-2xl mx-auto">
            <button
              className={`w-full font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-sm sm:text-base opacity-50 cursor-not-allowed transition-all duration-300 ${
                darkMode
                  ? "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-400"
                  : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-500"
              }`}
              disabled
            >
              <FiDownload className="w-5 h-5 mr-2" /> Convert to PDF
            </button>
          </div>
        )}

        {status.message && (
          <div className="max-w-2xl mx-auto">
            <div
              className={`mt-4 p-3 sm:p-4 rounded-xl text-sm sm:text-base animate-fade-in flex items-center justify-center space-x-2 transition-all duration-300 border ${
                status.type === "success"
                  ? darkMode
                    ? "bg-green-900/30 border-green-500/30 text-green-400"
                    : "bg-green-50 border-green-200 text-green-700"
                  : darkMode
                  ? "bg-red-900/30 border-red-500/30 text-red-400"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              {status.type === "success" ? (
                <FiCheck className="w-5 h-5 flex-shrink-0" />
              ) : (
                <FiX className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="flex-grow text-center">{status.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
