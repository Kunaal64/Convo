"use client";

import { redirect } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileUp, LogOut } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Redirect to home if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect('/');
    }
  }, [isLoaded, isSignedIn]);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleConvert = async () => {
    if (!file) return;
    
    setIsConverting(true);
    setProgress(0);
    
    // Simulate conversion progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    // In a real app, you would upload the file to your API here
    // and handle the conversion on the server
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    clearInterval(interval);
    setProgress(100);
    setIsConverting(false);
    
    // Reset after showing completion
    setTimeout(() => {
      setFile(null);
      setProgress(0);
    }, 2000);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </header>

        <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Convert Your Documents</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Upload a Word document to convert it to PDF
            </p>
          </div>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
            }`}
          >
            <input {...getInputProps()} />
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <FileUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {isDragActive ? 'Drop the file here' : 'Drag & drop a file here'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {file ? file.name : 'or click to browse (DOC, DOCX, max 10MB)'}
                </p>
              </div>
            </div>
          </div>

          {file && (
            <div className="mt-6 space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                >
                  Remove
                </Button>
              </div>

              {progress > 0 && (
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">
                    {progress < 100 ? 'Converting...' : 'Conversion complete!'}
                  </p>
                </div>
              )}

              <div className="mt-6">
                <Button
                  onClick={handleConvert}
                  disabled={isConverting || progress > 0}
                  className="w-full"
                  size="lg"
                >
                  {isConverting ? 'Converting...' : 'Convert to PDF'}
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
