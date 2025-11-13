import React, { useState } from 'react';
import { ChevronRightIcon, PlusCircleIcon, HistoryIcon, ListIcon } from 'react-icons/hi';

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (cardName: string) => {
    setSelectedCard(cardName);
    onNavigate?.(cardName);
  };

  const cards = [
    {
      id: 'create',
      title: '✨ Crear Bot',
      description: 'Genera un Expert Advisor MQL5 con IA',
      color: 'from-blue-500 to-cyan-500',
      icon: '🤖',
      stats: '+100 bots generados'
    },
    {
      id: 'backtest',
      title: '📊 Ejecutar Backtest',
      description: 'Simula estrategia en datos históricos',
      color: 'from-purple-500 to-pink-500',
      icon: '📈',
      stats: 'Resultados realistas'
    },
    {
      id: 'history',
      title: '📚 Mis Bots',
      description: 'Administra tus bots guardados',
      color: 'from-green-500 to-emerald-500',
      icon: '💾',
      stats: '0 bots guardados'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">
          🚀 Trading IA Bot Generator
        </h1>
        <p className="text-gray-400 text-lg">
          Genera estrategias de trading automatizadas con Inteligencia Artificial
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`
              group relative overflow-hidden rounded-xl cursor-pointer
              transform transition-all duration-300 hover:scale-105
              ${selectedCard === card.id ? 'ring-2 ring-yellow-400' : ''}
            `}
          >
            {/* Background gradient */}
            <div className={`
              absolute inset-0 bg-gradient-to-br ${card.color}
              opacity-80 group-hover:opacity-100 transition-opacity
            `} />

            {/* Content */}
            <div className="relative p-8 text-white">
              <div className="text-5xl mb-4">{card.icon}</div>
              
              <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
              <p className="text-white/90 mb-4">{card.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/75">{card.stats}</span>
                <ChevronRightIcon className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Bots Generados', value: '0', icon: '🤖' },
          { label: 'Backtests', value: '0', icon: '📊' },
          { label: 'Bots Guardados', value: '0', icon: '💾' },
          { label: 'Retorno Promedio', value: '0%', icon: '📈' }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4 text-center hover:bg-gray-800 transition-colors"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>💡 Selecciona una opción para comenzar</p>
      </div>
    </div>
  );
};

export default Dashboard;
