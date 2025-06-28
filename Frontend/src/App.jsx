import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { HistoryProvider } from './context/HistoryContext';
import Layout from './components/Layout';
import Home from './components/Home';
import History from './components/History';

function App() {
  return (
    <ThemeProvider>
      <HistoryProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </Layout>
        </Router>
      </HistoryProvider>
    </ThemeProvider>
  );
}

export default App;
