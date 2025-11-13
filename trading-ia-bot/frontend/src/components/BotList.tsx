import React, { useState } from 'react';
import { TrashIcon, EyeIcon, PencilIcon } from 'react-icons/hi';

interface BotListProps {
  onBack?: () => void;
  onEdit?: (botId: number) => void;
  onDelete?: (botId: number) => void;
}

interface Bot {
  id: number;
  name: string;
  symbol: string;
  timeframe: string;
  strategyType: string;
  indicators: string[];
  createdAt: string;
  status: 'active' | 'inactive';
}

export const BotList: React.FC<BotListProps> = ({ onBack, onEdit, onDelete }) => {
  const [bots] = useState<Bot[]>([
    {
      id: 1,
      name: 'RSI Tendencia EURUSD',
      symbol: 'EURUSD',
      timeframe: 'H1',
      strategyType: 'Tendencia',
      indicators: ['RSI', 'ADX'],
      createdAt: '2023-01-15 10:30',
      status: 'active'
    },
    {
      id: 2,
      name: 'MACD Breakout',
      symbol: 'XAUUSD',
      timeframe: 'D1',
      strategyType: 'Breakout',
      indicators: ['MACD', 'MA'],
      createdAt: '2023-01-14 15:45',
      status: 'active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');

  const filteredBots = bots
    .filter(bot => 
      bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.symbol.includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              📚 Mis Bots
            </h1>
            <p className="text-gray-400">
              Administra tus estrategias de trading automatizadas
            </p>
          </div>
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium transition-colors"
          >
            ← Atrás
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Nombre o símbolo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Ordenar por
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="date">Más reciente</option>
              <option value="name">Por nombre (A-Z)</option>
            </select>
          </div>

          {/* Stats */}
          <div className="flex items-end">
            <div className="w-full px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-center font-medium">
              {filteredBots.length} bot{filteredBots.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Bots Table */}
      {filteredBots.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800/50 border border-gray-700 rounded-xl">
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Nombre</th>
                <th className="px-6 py-4 text-center text-gray-300 font-semibold">Símbolo</th>
                <th className="px-6 py-4 text-center text-gray-300 font-semibold">Timeframe</th>
                <th className="px-6 py-4 text-center text-gray-300 font-semibold">Estrategia</th>
                <th className="px-6 py-4 text-center text-gray-300 font-semibold">Indicadores</th>
                <th className="px-6 py-4 text-center text-gray-300 font-semibold">Fecha</th>
                <th className="px-6 py-4 text-center text-gray-300 font-semibold">Estado</th>
                <th className="px-6 py-4 text-center text-gray-300 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredBots.map((bot, idx) => (
                <tr
                  key={bot.id}
                  className={`
                    border border-gray-700 transition-colors
                    ${idx % 2 === 0 ? 'bg-gray-900/20' : 'bg-gray-800/20'}
                    hover:bg-gray-800/50
                  `}
                >
                  <td className="px-6 py-4 text-white font-medium">{bot.name}</td>
                  <td className="px-6 py-4 text-center text-gray-300">{bot.symbol}</td>
                  <td className="px-6 py-4 text-center text-gray-300">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium">
                      {bot.timeframe}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-300">{bot.strategyType}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {bot.indicators.map((indicator, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded bg-gray-700 text-gray-300 text-xs"
                        >
                          {indicator}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-400 text-sm">
                    {bot.createdAt}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-medium">
                      {bot.status === 'active' ? '✓ Activo' : '⊘ Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit?.(bot.id)}
                        className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 transition-colors"
                        title="Ver"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit?.(bot.id)}
                        className="p-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 transition-colors"
                        title="Editar"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete?.(bot.id)}
                        className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors"
                        title="Eliminar"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-12 text-center">
          <div className="text-gray-400 mb-4 text-lg">📭 No hay bots</div>
          <p className="text-gray-500 mb-6">
            Crea tu primer bot para comenzar a automatizar tus estrategias
          </p>
          <button
            onClick={onBack}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            Crear Bot
          </button>
        </div>
      )}

      {/* Summary */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Bots', value: bots.length, icon: '🤖' },
          { label: 'Activos', value: bots.filter(b => b.status === 'active').length, icon: '✓' },
          { label: 'Símbolos Únicos', value: new Set(bots.map(b => b.symbol)).size, icon: '💱' },
          { label: 'Estrategias', value: new Set(bots.map(b => b.strategyType)).size, icon: '🎯' }
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4 text-center hover:bg-gray-800 transition-colors"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BotList;
