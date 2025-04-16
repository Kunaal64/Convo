import React, { createContext, useContext, useState, useEffect } from 'react';

const HistoryContext = createContext();
const STORAGE_KEY = 'conversionHistory';

export function useHistory() {
  return useContext(HistoryContext);
}

export function HistoryProvider({ children }) {
  const [conversionHistory, setConversionHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem(STORAGE_KEY);
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error('Error loading history from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversionHistory));
    } catch (error) {
      console.error('Error saving history to localStorage:', error);
    }
  }, [conversionHistory]);

  const addToHistory = (fileData) => {
    const newEntry = {
      id: Date.now(),
      fileName: fileData.originalName,
      convertedFileName: fileData.convertedName,
      originalSize: fileData.originalSize,
      convertedSize: fileData.convertedSize,
      date: new Date().toISOString(),
      pdfData: fileData.pdfData
    };

    setConversionHistory(prev => [newEntry, ...prev]);
  };

  const deleteFromHistory = (id) => {
    setConversionHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    setConversionHistory([]);
  };

  return (
    <HistoryContext.Provider value={{
      history: conversionHistory,
      addToHistory,
      deleteFromHistory,
      clearHistory
    }}>
      {children}
    </HistoryContext.Provider>
  );
} 