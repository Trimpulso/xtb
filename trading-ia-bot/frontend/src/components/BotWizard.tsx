import React, { useState } from 'react';

interface BotWizardProps {
  onBack?: () => void;
  onGenerate?: (bot: BotData) => void;
}

interface BotData {
  indicators: string[];
  symbol: string;
  timeframe: string;
  strategyType: string;
}

const indicatorsList = ['ADX', 'RSI', 'MFI', 'MA', 'EMA', 'MACD', 'Bollinger', 'CCI', 'Stochastic', 'ATR'];
const symbolsList = ['EURUSD', 'GBPUSD', 'XAUUSD', 'SPY', 'AAPL', 'MSFT', 'GOOGL', 'AMZN'];
const timeframesList = ['M1', 'M5', 'M15', 'M30', 'H1', 'H4', 'D1', 'W1'];
const strategiesList = ['Tendencia', 'Reversión', 'Breakout', 'Scalping', 'Arbitraje'];

export const BotWizard: React.FC<BotWizardProps> = ({ onBack, onGenerate }) => {
  const [step, setStep] = useState(1);
  const [botData, setBotData] = useState<BotData>({
    indicators: [],
    symbol: '',
    timeframe: '',
    strategyType: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleIndicatorToggle = (indicator: string) => {
    setBotData(prev => ({
      ...prev,
      indicators: prev.indicators.includes(indicator)
        ? prev.indicators.filter(i => i !== indicator)
        : [...prev.indicators, indicator]
    }));
  };

  const handleNext = () => {
    setErrors([]);
    
    if (step === 1 && botData.indicators.length === 0) {
      setErrors(['Selecciona al menos un indicador']);
      return;
    }
    if (step === 2 && !botData.symbol) {
      setErrors(['Selecciona un símbolo']);
      return;
    }
    if (step === 3 && !botData.timeframe) {
      setErrors(['Selecciona un timeframe']);
      return;
    }
    if (step === 4 && !botData.strategyType) {
      setErrors(['Selecciona una estrategia']);
      return;
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      onGenerate?.(botData);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
        >
          <span className="text-lg">←</span>
          Atrás
        </button>
        <h1 className="text-3xl font-bold text-white">Asistente de Bot</h1>
        <div className="text-white font-semibold">Paso {step}/4</div>
      </div>

      {/* Progress bar */}
      <div className="mb-8 bg-gray-800 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full transition-all duration-300"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto">
        {/* Step 1: Indicadores */}
        {step === 1 && (
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              📊 Selecciona Indicadores Técnicos
            </h2>
            <p className="text-gray-400 mb-6">
              Elige al menos un indicador para tu estrategia
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {indicatorsList.map(indicator => (
                <button
                  key={indicator}
                  onClick={() => handleIndicatorToggle(indicator)}
                  className={`
                    p-4 rounded-lg border-2 transition-all font-medium
                    ${botData.indicators.includes(indicator)
                      ? 'border-blue-500 bg-blue-500/20 text-blue-200'
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                    }
                  `}
                >
                  {indicator}
                  {botData.indicators.includes(indicator) && (
                    <span className="text-lg ml-2 inline">✅</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Símbolo */}
        {step === 2 && (
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              💱 Selecciona Símbolo de Trading
            </h2>
            <p className="text-gray-400 mb-6">
              Elige el símbolo donde aplicarás tu estrategia
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {symbolsList.map(symbol => (
                <button
                  key={symbol}
                  onClick={() => setBotData({ ...botData, symbol })}
                  className={`
                    p-4 rounded-lg border-2 transition-all font-medium
                    ${botData.symbol === symbol
                      ? 'border-green-500 bg-green-500/20 text-green-200'
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                    }
                  `}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Timeframe */}
        {step === 3 && (
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              ⏱️ Selecciona Timeframe
            </h2>
            <p className="text-gray-400 mb-6">
              Elige el período de operación del bot
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {timeframesList.map(timeframe => (
                <button
                  key={timeframe}
                  onClick={() => setBotData({ ...botData, timeframe })}
                  className={`
                    p-4 rounded-lg border-2 transition-all font-medium
                    ${botData.timeframe === timeframe
                      ? 'border-purple-500 bg-purple-500/20 text-purple-200'
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                    }
                  `}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Estrategia */}
        {step === 4 && (
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              🎯 Selecciona Tipo de Estrategia
            </h2>
            <p className="text-gray-400 mb-6">
              Elige el tipo de estrategia de trading
            </p>
            <div className="space-y-3">
              {strategiesList.map(strategy => (
                <button
                  key={strategy}
                  onClick={() => setBotData({ ...botData, strategyType: strategy })}
                  className={`
                    w-full p-4 rounded-lg border-2 transition-all font-medium text-left
                    ${botData.strategyType === strategy
                      ? 'border-orange-500 bg-orange-500/20 text-orange-200'
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                    }
                  `}
                >
                  {strategy}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <div className="mt-6 p-4 rounded-lg bg-red-500/20 border border-red-500 text-red-200">
            {errors.map((error, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-lg">❌</span>
                {error}
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex gap-4 justify-between">
          <button
            onClick={handlePrevious}
            disabled={step === 1}
            className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Anterior
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium flex items-center gap-2 transition-all"
          >
            <span className="text-lg">✨</span>
            {step === 4 ? 'Generar Bot' : 'Siguiente →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotWizard;
