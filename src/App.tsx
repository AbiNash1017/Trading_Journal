import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { TradingJournal } from './components/TradingJournal';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen bg-gradient-to-b from-black via-blue-950 to-blue-900 p-4 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/journal" element={<TradingJournal />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;