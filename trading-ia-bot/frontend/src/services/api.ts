/**
 * Cliente HTTP para comunicación con el backend
 * Wrapper de Axios con todos los endpoints de la API
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL } from '../config';

// ═════════════════════════════════════════════════════════════════════════════
// TIPOS
// ═════════════════════════════════════════════════════════════════════════════

export interface GenerateRequest {
  indicators: string[];
  symbol: string;
  timeframe: string;
  strategy_type: string;
}

export interface GenerateResponse {
  status: string;
  code: string;
  message: string;
  indicators: string[];
  symbol: string;
  timeframe: string;
  strategy_type: string;
}

export interface BacktestRequest {
  symbol: string;
  timeframe: string;
  period_years?: number;
  initial_capital?: number;
  commission?: number;
}

export interface BacktestResponse {
  status: string;
  symbol: string;
  timeframe: string;
  period_years: number;
  initial_capital: number;
  final_capital: number;
  total_return_pct: number;
  sharpe_ratio: number;
  max_drawdown_pct: number;
  win_rate_pct: number;
  profit_factor: number;
  total_trades: number;
  equity_curve: number[];
  trades: Array<{
    entry_date: string;
    exit_date: string;
    entry_price: number;
    exit_price: number;
    profit: number;
    return_pct: number;
  }>;
  message: string;
}

export interface BotCreateRequest {
  name: string;
  indicators: string[];
  symbol: string;
  timeframe: string;
  strategy_type: string;
  code: string;
  description?: string;
}

export interface BotResponse {
  id: number;
  name: string;
  indicators: string[];
  symbol: string;
  timeframe: string;
  strategy_type: string;
  code: string;
  description?: string;
  created_at: string;
  updated_at: string;
  status: string;
}

export interface ResultCreateRequest {
  bot_id?: number;
  bot_name: string;
  symbol: string;
  timeframe: string;
  period_years: number;
  initial_capital: number;
  final_capital: number;
  total_return_pct: number;
  sharpe_ratio: number;
  max_drawdown_pct: number;
  win_rate_pct: number;
  profit_factor: number;
  total_trades: number;
  equity_curve: number[];
  trades: any[];
  description?: string;
}

export interface ResultResponse {
  id: number;
  bot_id?: number;
  bot_name: string;
  symbol: string;
  timeframe: string;
  period_years: number;
  initial_capital: number;
  final_capital: number;
  total_return_pct: number;
  sharpe_ratio: number;
  max_drawdown_pct: number;
  win_rate_pct: number;
  profit_factor: number;
  total_trades: number;
  equity_curve: number[];
  trades: any[];
  description?: string;
  created_at: string;
  status: string;
}

// ═════════════════════════════════════════════════════════════════════════════
// API CLIENT
// ═════════════════════════════════════════════════════════════════════════════

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL) {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Interceptor para errores
    this.client.interceptors.response.use(
      (response: any) => response,
      (error: AxiosError) => this.handleError(error)
    );
  }

  private handleError(error: AxiosError) {
    if (error.response) {
      // Error del servidor
      const message = (error.response.data as any)?.detail || 'Error en la solicitud';
      console.error(`[${error.response.status}]`, message);
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Sin respuesta
      console.error('Sin respuesta del servidor');
      return Promise.reject(new Error('No hay respuesta del servidor'));
    } else {
      // Error en la solicitud
      console.error('Error:', error.message);
      return Promise.reject(error);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GENERACIÓN (Generate endpoints)
  // ═══════════════════════════════════════════════════════════════════════════

  async generateBot(request: GenerateRequest): Promise<GenerateResponse> {
    const response = await this.client.post<GenerateResponse>('/generate/bot', request);
    return response.data;
  }

  async refineBot(code: string, errorMessage: string): Promise<GenerateResponse> {
    const response = await this.client.post<GenerateResponse>('/generate/refine', {
      code,
      error_message: errorMessage
    });
    return response.data;
  }

  async getIndicators(): Promise<string[]> {
    const response = await this.client.get<{ indicators: string[] }>('/generate/indicators');
    return response.data.indicators;
  }

  async getStrategies(): Promise<string[]> {
    const response = await this.client.get<{ strategies: string[] }>('/generate/strategies');
    return response.data.strategies;
  }

  async getSymbols(): Promise<string[]> {
    const response = await this.client.get<{ symbols: string[] }>('/generate/symbols');
    return response.data.symbols;
  }

  async getTimeframes(): Promise<string[]> {
    const response = await this.client.get<{ timeframes: string[] }>('/generate/timeframes');
    return response.data.timeframes;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // BACKTEST (Backtest endpoints)
  // ═══════════════════════════════════════════════════════════════════════════

  async runBacktest(request: BacktestRequest): Promise<BacktestResponse> {
    const response = await this.client.post<BacktestResponse>('/backtest/run', request);
    return response.data;
  }

  async getBacktestDemo(): Promise<BacktestResponse> {
    const response = await this.client.get<BacktestResponse>('/backtest/demo');
    return response.data;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // BOTS (Bot CRUD endpoints)
  // ═══════════════════════════════════════════════════════════════════════════

  async listBots(): Promise<BotResponse[]> {
    const response = await this.client.get<BotResponse[]>('/bots/list');
    return response.data;
  }

  async createBot(request: BotCreateRequest): Promise<BotResponse> {
    const response = await this.client.post<BotResponse>('/bots/create', request);
    return response.data;
  }

  async getBot(botId: number): Promise<BotResponse> {
    const response = await this.client.get<BotResponse>(`/bots/${botId}`);
    return response.data;
  }

  async updateBot(botId: number, data: Partial<BotCreateRequest>): Promise<BotResponse> {
    const response = await this.client.put<BotResponse>(`/bots/${botId}`, data);
    return response.data;
  }

  async deleteBot(botId: number): Promise<{ status: string; message: string }> {
    const response = await this.client.delete<{ status: string; message: string }>(`/bots/${botId}`);
    return response.data;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS (Results management endpoints)
  // ═══════════════════════════════════════════════════════════════════════════

  async listResults(limit: number = 50, offset: number = 0, symbol?: string): Promise<ResultResponse[]> {
    const params: any = { limit, offset };
    if (symbol) params.symbol = symbol;
    const response = await this.client.get<ResultResponse[]>('/results/list', { params });
    return response.data;
  }

  async saveResult(request: ResultCreateRequest): Promise<ResultResponse> {
    const response = await this.client.post<ResultResponse>('/results/save', request);
    return response.data;
  }

  async getResult(resultId: number): Promise<ResultResponse> {
    const response = await this.client.get<ResultResponse>(`/results/${resultId}`);
    return response.data;
  }

  async deleteResult(resultId: number): Promise<{ status: string; message: string }> {
    const response = await this.client.delete<{ status: string; message: string }>(`/results/${resultId}`);
    return response.data;
  }

  async getResultStats(): Promise<{
    total_results: number;
    avg_return: number;
    avg_sharpe: number;
    best_result: any;
  }> {
    const response = await this.client.get('/results/stats/summary');
    return response.data;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HEALTH
  // ═══════════════════════════════════════════════════════════════════════════

  async checkHealth(): Promise<{ status: string }> {
    const response = await this.client.get<{ status: string }>('/generate/health');
    return response.data;
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// EXPORTAR INSTANCIA
// ═════════════════════════════════════════════════════════════════════════════

export const api = new ApiClient();

export default api;
