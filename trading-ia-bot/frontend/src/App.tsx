import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { Dashboard } from './components/Dashboard';
import { BotWizard } from './components/BotWizard';
import { CodeEditor } from './components/CodeEditor';
import { BacktestResults } from './components/BacktestResults';
import { BotList } from './components/BotList';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [backtestResults, setBacktestResults] = useState<any>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleGenerateBot = async (botData: any) => {
    // TODO: Integrar con API
    console.log('Generando bot con datos:', botData);
    setCurrentPage('code-editor');
  };

  const handleBacktest = async () => {
    // TODO: Integrar con API
    console.log('Ejecutando backtest');
    setCurrentPage('backtest-results');
  };

  const handleSaveBot = async (botName: string) => {
    // TODO: Integrar con API
    console.log('Guardando bot:', botName);
    setCurrentPage('bot-list');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard onNavigate={handleNavigate} />} />
        <Route 
          path="/wizard" 
          element={<BotWizard onBack={() => handleNavigate('dashboard')} onGenerate={handleGenerateBot} />} 
        />
        <Route 
          path="/editor" 
          element={<CodeEditor code={generatedCode || ''} onBacktest={handleBacktest} onSave={handleSaveBot} />} 
        />
        <Route 
          path="/results" 
          element={<BacktestResults results={backtestResults} onBack={() => handleNavigate('editor')} onSave={handleSaveBot} />} 
        />
        <Route 
          path="/bots" 
          element={<BotList onBack={() => handleNavigate('dashboard')} />} 
        />
      </Routes>
    </Router>
  );
}
