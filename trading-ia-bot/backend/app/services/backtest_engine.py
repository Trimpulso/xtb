import asyncio
from datetime import datetime, timedelta
import numpy as np
import pandas as pd
import yfinance as yf
from typing import Dict, List, Tuple


class BacktestEngine:
    """
    Motor de simulación de backtests usando datos históricos de yfinance.
    Calcula métricas financieras: Sharpe Ratio, Drawdown, Win Rate, etc.
    """
    
    def __init__(self, initial_capital: float = 10000.0, commission: float = 0.0001):
        """
        Inicializa el motor de backtest.
        
        Args:
            initial_capital: Capital inicial en USD (default: $10,000)
            commission: Comisión por operación en porcentaje (default: 0.01%)
        """
        self.initial_capital = initial_capital
        self.commission = commission
    
    
    async def download_price_data(
        self, 
        symbol: str, 
        timeframe: str = "H1", 
        years: int = 5
    ) -> pd.DataFrame:
        """
        Descarga datos históricos de yfinance.
        
        Args:
            symbol: Símbolo del activo (EURUSD, XAUUSD, SPY, etc.)
            timeframe: Temporalidad (D1, H1, H4, M15, etc.)
            years: Años de datos históricos a descargar
            
        Returns:
            DataFrame con OHLCV data
        """
        try:
            # Calcular fecha inicial
            end_date = datetime.now()
            start_date = end_date - timedelta(days=365 * years)
            
            # Descargar datos
            # yfinance automáticamente convierte el intervalo
            interval = self._timeframe_to_yfinance_interval(timeframe)
            
            df = yf.download(
                symbol,
                start=start_date,
                end=end_date,
                interval=interval,
                progress=False
            )
            
            if df.empty:
                raise ValueError(f"No hay datos disponibles para {symbol}")
            
            return df
            
        except Exception as e:
            print(f"Error descargando datos de {symbol}: {e}")
            raise


    async def run_backtest(
        self,
        symbol: str,
        timeframe: str,
        years: int = 5,
        strategy_signals: List[Dict] = None  # [{'date': timestamp, 'type': 'BUY'|'SELL', 'price': float}]
    ) -> Dict:
        """
        Ejecuta una simulación de backtest usando señales de estrategia.
        
        Args:
            symbol: Símbolo del activo
            timeframe: Temporalidad
            years: Años de datos
            strategy_signals: Lista de señales de trading (puede ser None para prueba)
            
        Returns:
            Diccionario con resultados del backtest
        """
        try:
            # 1. Descargar datos
            df = await self.download_price_data(symbol, timeframe, years)
            
            # 2. Generar señales si no se proporcionan (modo demo)
            if strategy_signals is None:
                strategy_signals = self._generate_demo_signals(df)
            
            # 3. Simular operaciones
            trades = []
            equity_curve = [self.initial_capital]
            current_cash = self.initial_capital
            position = None
            
            for idx, signal in enumerate(strategy_signals):
                if signal['type'] == 'BUY' and position is None:
                    # Abrir posición LONG
                    entry_price = signal['price']
                    position = {
                        'entry_price': entry_price,
                        'entry_date': signal['date'],
                        'type': 'LONG',
                        'size': current_cash * 0.95 / entry_price  # 95% del capital
                    }
                    
                elif signal['type'] == 'SELL' and position is not None:
                    # Cerrar posición
                    exit_price = signal['price']
                    profit = (exit_price - position['entry_price']) * position['size']
                    commission_cost = position['size'] * exit_price * self.commission * 2  # Entrada + Salida
                    net_profit = profit - commission_cost
                    
                    trades.append({
                        'entry_date': position['entry_date'],
                        'exit_date': signal['date'],
                        'entry_price': position['entry_price'],
                        'exit_price': exit_price,
                        'size': position['size'],
                        'profit': net_profit,
                        'return_pct': (net_profit / (position['entry_price'] * position['size'])) * 100 if net_profit else 0
                    })
                    
                    current_cash += net_profit
                    position = None
                
                # Actualizar equity curve
                if position is not None:
                    # Marcar a mercado si hay posición abierta
                    unrealized_pnl = (signal['price'] - position['entry_price']) * position['size']
                    equity_curve.append(current_cash + unrealized_pnl)
                else:
                    equity_curve.append(current_cash)
            
            # 4. Calcular métricas
            metrics = self._calculate_metrics(trades, equity_curve)
            
            return {
                "status": "success",
                "symbol": symbol,
                "timeframe": timeframe,
                "period_years": years,
                "initial_capital": self.initial_capital,
                "final_capital": equity_curve[-1] if equity_curve else self.initial_capital,
                "total_trades": len(trades),
                "trades": trades,
                "equity_curve": equity_curve,
                **metrics  # Metrices de rentabilidad
            }
            
        except Exception as e:
            return {
                "status": "error",
                "message": str(e)
            }


    def _calculate_metrics(self, trades: List[Dict], equity_curve: List[float]) -> Dict:
        """
        Calcula métricas financieras del backtest.
        
        Returns:
            Dict con: total_return_pct, sharpe_ratio, max_drawdown_pct, win_rate_pct, profit_factor
        """
        equity_array = np.array(equity_curve)
        
        # 1. Retorno Total %
        total_return_pct = ((equity_curve[-1] - self.initial_capital) / self.initial_capital * 100) if equity_curve else 0
        
        # 2. Sharpe Ratio (retorno anualizado / volatilidad)
        if len(equity_array) > 1:
            returns = np.diff(equity_array) / equity_array[:-1]
            sharpe_ratio = np.mean(returns) / np.std(returns) * np.sqrt(252) if np.std(returns) > 0 else 0
        else:
            sharpe_ratio = 0
        
        # 3. Máximo Drawdown %
        running_max = np.maximum.accumulate(equity_array)
        drawdown = (equity_array - running_max) / running_max * 100
        max_drawdown_pct = np.min(drawdown) if len(drawdown) > 0 else 0
        
        # 4. Win Rate % y Profit Factor
        if trades:
            winning_trades = [t for t in trades if t['profit'] > 0]
            losing_trades = [t for t in trades if t['profit'] < 0]
            
            win_rate_pct = (len(winning_trades) / len(trades) * 100) if trades else 0
            
            total_profit = sum(t['profit'] for t in winning_trades)
            total_loss = abs(sum(t['profit'] for t in losing_trades))
            profit_factor = total_profit / total_loss if total_loss > 0 else (total_profit if total_profit > 0 else 0)
        else:
            win_rate_pct = 0
            profit_factor = 0
        
        return {
            "total_return_pct": round(total_return_pct, 2),
            "sharpe_ratio": round(sharpe_ratio, 2),
            "max_drawdown_pct": round(max_drawdown_pct, 2),
            "win_rate_pct": round(win_rate_pct, 2),
            "profit_factor": round(profit_factor, 2)
        }


    def _generate_demo_signals(self, df: pd.DataFrame, trades_count: int = 50) -> List[Dict]:
        """
        Genera señales de trading demo (alternadas BUY/SELL)
        para demostración cuando no hay estrategia real.
        """
        signals = []
        prices = df['Close'].values
        dates = df.index
        
        # Generar trades aleatorios distribuidos
        trade_indices = np.random.choice(len(df), size=min(trades_count, len(df)), replace=False)
        trade_indices.sort()
        
        is_buy = True
        for idx in trade_indices:
            signals.append({
                'date': dates[idx],
                'type': 'BUY' if is_buy else 'SELL',
                'price': float(prices[idx])
            })
            is_buy = not is_buy
        
        return signals


    def _timeframe_to_yfinance_interval(self, timeframe: str) -> str:
        """
        Convierte timeframes MT5 a formato yfinance.
        """
        mapping = {
            'M1': '1m',
            'M5': '5m',
            'M15': '15m',
            'M30': '30m',
            'H1': '1h',
            'H4': '4h',
            'D1': '1d',
            'W1': '1wk',
            'MN': '1mo'
        }
        return mapping.get(timeframe, '1d')


# Funciones auxiliares para uso en rutas

async def run_backtest_async(
    symbol: str,
    timeframe: str = "H1",
    period_years: int = 5,
    initial_capital: float = 10000.0,
    commission: float = 0.0001
) -> Dict:
    """
    Función helper para ejecutar backtest desde rutas FastAPI.
    """
    engine = BacktestEngine(initial_capital, commission)
    result = await engine.run_backtest(symbol, timeframe, period_years)
    return result


# --- Ejemplo de uso (NO para archivo principal) ---
if __name__ == '__main__':
    
    async def main():
        print("Iniciando backtest demo...")
        
        engine = BacktestEngine(initial_capital=10000)
        
        result = await engine.run_backtest(
            symbol="EURUSD",
            timeframe="H1",
            years=2
        )
        
        print("\n--- RESULTADOS BACKTEST ---\n")
        print(f"Status: {result['status']}")
        print(f"Symbol: {result['symbol']}")
        print(f"Total Return: {result['total_return_pct']}%")
        print(f"Sharpe Ratio: {result['sharpe_ratio']}")
        print(f"Max Drawdown: {result['max_drawdown_pct']}%")
        print(f"Win Rate: {result['win_rate_pct']}%")
        print(f"Total Trades: {result['total_trades']}")
        print(f"Profit Factor: {result['profit_factor']}")
        print(f"\nEquity Curve (primeros 10 valores): {result['equity_curve'][:10]}")
    
    # asyncio.run(main())
