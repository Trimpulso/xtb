import React, { createContext, useContext, useState, ReactNode } from 'react';

// ═════════════════════════════════════════════════════════════════════════════
// TIPOS
// ═════════════════════════════════════════════════════════════════════════════

export interface BacktestResult {
  total_return: number;
  sharpe_ratio: number;
  max_drawdown: number;
  win_rate: number;
  profit_factor: number;
  trades_count: number;
  trades: Array<{
    entry_date: string;
    entry_price: number;
    exit_date: string;
    exit_price: number;
    profit: number;
  }>;
  equity_curve: number[];
  dates: string[];
}

export interface Bot {
  id: number;
  name: string;
  indicators: string[];
  symbol: string;
  timeframe: string;
  strategy: string;
  code: string;
  created_at: string;
  status: boolean;
}

export interface AppContextType {
  // Datos generales
  generatedCode: string | null;
  setGeneratedCode: (code: string | null) => void;
  
  // Backtest
  backtestResult: BacktestResult | null;
  setBacktestResult: (result: BacktestResult | null) => void;
  
  // Bots
  savedBots: Bot[];
  setSavedBots: (bots: Bot[]) => void;
  addBot: (bot: Bot) => void;
  removeBot: (botId: number) => void;
  
  // Loading states
  isLoadingGenerate: boolean;
  setIsLoadingGenerate: (loading: boolean) => void;
  
  isLoadingBacktest: boolean;
  setIsLoadingBacktest: (loading: boolean) => void;
  
  // Errores
  error: string | null;
  setError: (error: string | null) => void;
  
  // Success message
  success: string | null;
  setSuccess: (success: string | null) => void;
}

// ═════════════════════════════════════════════════════════════════════════════
// CONTEXTO
// ═════════════════════════════════════════════════════════════════════════════

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [backtestResult, setBacktestResult] = useState<BacktestResult | null>(null);
  const [savedBots, setSavedBots] = useState<Bot[]>([]);
  const [isLoadingGenerate, setIsLoadingGenerate] = useState(false);
  const [isLoadingBacktest, setIsLoadingBacktest] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const addBot = (bot: Bot) => {
    setSavedBots(prev => [...prev, bot]);
  };

  const removeBot = (botId: number) => {
    setSavedBots(prev => prev.filter(bot => bot.id !== botId));
  };

  const value: AppContextType = {
    generatedCode,
    setGeneratedCode,
    backtestResult,
    setBacktestResult,
    savedBots,
    setSavedBots,
    addBot,
    removeBot,
    isLoadingGenerate,
    setIsLoadingGenerate,
    isLoadingBacktest,
    setIsLoadingBacktest,
    error,
    setError,
    success,
    setSuccess,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ═════════════════════════════════════════════════════════════════════════════
// HOOK PERSONALIZADO
// ═════════════════════════════════════════════════════════════════════════════

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within AppContextProvider');
  }
  return context;
};
