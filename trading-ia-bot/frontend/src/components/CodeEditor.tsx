import React, { useState } from 'react';

interface CodeEditorProps {
  code: string;
  onBacktest?: () => void;
  onSave?: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onBacktest, onSave }) => {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBacktest = async () => {
    setIsLoading(true);
    try {
      onBacktest?.();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(code)}`);
    element.setAttribute('download', 'bot.mq5');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          📝 Editor de Código MQL5
        </h1>
        <p className="text-gray-400">
          Tu Expert Advisor generado con IA. Revísalo y simúlalo antes de usar.
        </p>
      </div>

      {/* Code Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Code Panel */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
            {/* Toolbar */}
            <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">MQL5 Expert Advisor</span>
                <span className="text-gray-600 text-xs">
                  {code.length} caracteres
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${copied
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                    }
                  `}
                >
                  <span className="text-lg">📋</span>
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors"
                >
                  <span className="text-lg">⬇️</span>
                  Descargar
                </button>
              </div>
            </div>

            {/* Code Display */}
            <div className="bg-gray-900 p-6 font-mono text-sm overflow-x-auto max-h-[600px] overflow-y-auto">
              <pre className="text-gray-300 whitespace-pre-wrap break-words">
                <code>{code}</code>
              </pre>
            </div>

            {/* Footer */}
            <div className="bg-gray-800 border-t border-gray-700 px-6 py-3 text-right text-xs text-gray-500">
              Líneas: {code.split('\n').length}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Info Card */}
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">ℹ️ Información</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-400">Estado:</span>
                <span className="text-green-400 ml-2">✓ Listo</span>
              </div>
              <div>
                <span className="text-gray-400">Lenguaje:</span>
                <span className="text-blue-400 ml-2">MQL5</span>
              </div>
              <div>
                <span className="text-gray-400">Versión:</span>
                <span className="text-purple-400 ml-2">1.0</span>
              </div>
              <div className="pt-3 border-t border-gray-700">
                <p className="text-gray-400 text-xs">
                  Este código fue generado con Inteligencia Artificial y está listo para compilar en MetaEditor.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleBacktest}
              disabled={isLoading}
              className={`
                w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all
                ${isLoading
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                }
              `}
            >
              <PlayIcon className="w-5 h-5" />
              {isLoading ? 'Backtesting...' : 'Ejecutar Backtest'}
            </button>

            <button
              onClick={onSave}
              className="w-full py-3 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              💾 Guardar Bot
            </button>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <h4 className="text-blue-300 font-semibold mb-3 text-sm">💡 Consejos</h4>
            <ul className="text-xs text-blue-200 space-y-2">
              <li>✓ Revisa el código antes de usar</li>
              <li>✓ Compila en MetaEditor 5</li>
              <li>✓ Prueba con cuenta demo</li>
              <li>✓ Ajusta los parámetros según necesites</li>
            </ul>
          </div>

          {/* Warning */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
            <h4 className="text-yellow-300 font-semibold mb-3 text-sm">⚠️ Aviso</h4>
            <p className="text-xs text-yellow-200">
              El trading automático conlleva riesgos. Siempre prueba en demo y utiliza risk management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
