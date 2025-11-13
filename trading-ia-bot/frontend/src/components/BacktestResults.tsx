import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BacktestResultsProps {
  results?: BacktestResult;
  onSave?: () => void;
  onBack?: () => void;
}

interface BacktestResult {
  totalReturnPct: number;
  sharpeRatio: number;
  maxDrawdownPct: number;
  winRatePct: number;
  profitFactor: number;
  totalTrades: number;
  equityCurve: number[];
  trades: Array<{
    entryDate: string;
    exitDate: string;
    entryPrice: number;
    exitPrice: number;
    profit: number;
    returnPct: number;
  }>;
}

export const BacktestResults: React.FC<BacktestResultsProps> = ({ results, onSave, onBack }) => {
  const [botName, setBotName] = useState('Mi Bot');

  const defaultResults: BacktestResult = {
    totalReturnPct: 25.50,
    sharpeRatio: 1.82,
    maxDrawdownPct: -12.30,
    winRatePct: 62.50,
    profitFactor: 2.15,
    totalTrades: 40,
    equityCurve: [
      10000, 10150, 10320, 10280, 10450, 10320, 10680, 10750, 10920,
      10850, 11100, 11050, 11280, 11350, 11520, 11450, 11750, 11820,
      11950, 12100, 12250, 12320, 12480, 12550
    ],
    trades: []
  };

  const data = results || defaultResults;

  const chartData = {
    labels: Array.from({ length: data.equityCurve.length }, (_, i) => `${i}`),
    datasets: [
      {
        label: 'Equity Curve',
        data: data.equityCurve,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#9CA3AF',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#FFF',
        bodyColor: '#9CA3AF',
        borderColor: '#4B5563',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: { color: 'rgba(75, 85, 99, 0.2)' },
        ticks: { color: '#9CA3AF' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#9CA3AF' }
      }
    }
  };

  const getMetricColor = (value: number, type: string) => {
    if (type === 'return') return value > 0 ? 'text-green-400' : 'text-red-400';
    if (type === 'sharpe') return value > 1 ? 'text-green-400' : 'text-yellow-400';
    if (type === 'drawdown') return value > -20 ? 'text-yellow-400' : 'text-red-400';
    if (type === 'winrate') return value > 50 ? 'text-green-400' : 'text-yellow-400';
    return 'text-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          📊 Resultados del Backtest
        </h1>
        <p className="text-gray-400">
          Análisis detallado de la simulación de tu estrategia
        </p>
      </div>

      {/* Name Input */}
      <div className="mb-8 max-w-2xl">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Nombre del Bot
        </label>
        <input
          type="text"
          value={botName}
          onChange={(e) => setBotName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Ingresa un nombre..."
        />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {/* Total Return */}
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Retorno Total</span>
            <span className="text-lg">📈</span>
          </div>
          <div className={`text-3xl font-bold ${getMetricColor(data.totalReturnPct, 'return')}`}>
            {data.totalReturnPct > 0 ? '+' : ''}{data.totalReturnPct.toFixed(2)}%
          </div>
          <div className="text-xs text-gray-500 mt-2">De $10,000 a ${(10000 * (1 + data.totalReturnPct / 100)).toFixed(0)}</div>
        </div>

        {/* Sharpe Ratio */}
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Ratio de Sharpe</span>
            <span className="text-lg">📊</span>
          </div>
          <div className={`text-3xl font-bold ${getMetricColor(data.sharpeRatio, 'sharpe')}`}>
            {data.sharpeRatio.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500 mt-2">Retorno ajustado por riesgo</div>
        </div>

        {/* Max Drawdown */}
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Max Drawdown</span>
            <span className="text-lg">⚠️</span>
          </div>
          <div className={`text-3xl font-bold ${getMetricColor(data.maxDrawdownPct, 'drawdown')}`}>
            {data.maxDrawdownPct.toFixed(2)}%
          </div>
          <div className="text-xs text-gray-500 mt-2">Máxima pérdida desde pico</div>
        </div>

        {/* Win Rate */}
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Tasa Ganadora</span>
            <span className="text-lg">✅</span>
          </div>
          <div className={`text-3xl font-bold ${getMetricColor(data.winRatePct, 'winrate')}`}>
            {data.winRatePct.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500 mt-2">Trades ganadores</div>
        </div>

        {/* Profit Factor */}
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Profit Factor</span>
            <span className="text-lg">💰</span>
          </div>
          <div className="text-3xl font-bold text-blue-400">
            {data.profitFactor.toFixed(2)}x
          </div>
          <div className="text-xs text-gray-500 mt-2">Ganancias / Pérdidas</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-8 mb-12">
        <h2 className="text-xl font-bold text-white mb-6">📈 Curva de Equidad</h2>
        <div style={{ height: '400px' }}>
          <Line data={chartData} options={chartOptions as any} />
        </div>
      </div>

      {/* Trade Details */}
      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-8 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            📋 Detalles de Operaciones ({data.totalTrades})
          </h2>
          <span className="text-sm text-gray-400">
            {data.trades.length} trades mostrados
          </span>
        </div>

        {data.trades.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400">Entrada</th>
                  <th className="text-right py-3 px-4 text-gray-400">Precio Entrada</th>
                  <th className="text-left py-3 px-4 text-gray-400">Salida</th>
                  <th className="text-right py-3 px-4 text-gray-400">Precio Salida</th>
                  <th className="text-right py-3 px-4 text-gray-400">Ganancias</th>
                </tr>
              </thead>
              <tbody>
                {data.trades.slice(0, 10).map((trade, idx) => (
                  <tr key={idx} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors">
                    <td className="py-3 px-4 text-gray-300">{trade.entryDate}</td>
                    <td className="text-right py-3 px-4 text-gray-300">${trade.entryPrice.toFixed(5)}</td>
                    <td className="py-3 px-4 text-gray-300">{trade.exitDate}</td>
                    <td className="text-right py-3 px-4 text-gray-300">${trade.exitPrice.toFixed(5)}</td>
                    <td className={`text-right py-3 px-4 font-medium ${trade.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.profit > 0 ? '+' : ''}{trade.profit.toFixed(2)} ({trade.returnPct > 0 ? '+' : ''}{trade.returnPct.toFixed(2)}%)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            No hay datos de operaciones
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition-colors"
        >
          ← Atrás
        </button>
        <button
          onClick={onSave}
          className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium transition-all"
        >
          💾 Guardar Bot ({botName})
        </button>
      </div>
    </div>
  );
};

export default BacktestResults;
