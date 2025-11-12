// utils/latencyData.ts
import { exchanges } from "./exchangeData";

// --- TYPE DEFINITIONS ---
export interface Latency {
  from: string;
  to: string;
  ms: number;
}
export interface LatencyPoint {
  ts: number;
  ms: number;
}

// --- EXCHANGE LIST FOR UI/SELECTION ---
export const servers: string[] = [
  'Binance', 'OKX', 'Bybit', 'Kraken', 'Coinbase', 'Bitfinex', 'Bitstamp',
  'Deribit', 'Huobi', 'Gate.io', 'Gemini'
];

// --- SIMPLE LATENCIES FOR MAP ---
export const latencies: Latency[] = [
  { from: 'Binance', to: 'OKX', ms: 120 },
  { from: 'OKX', to: 'Kraken', ms: 220 },
  { from: 'Bybit', to: 'Bitstamp', ms: 60 },
  { from: 'Kraken', to: 'Deribit', ms: 320 },
  { from: 'Huobi', to: 'Binance', ms: 180 },
  { from: 'OKX', to: 'Bybit', ms: 90 },
  { from: 'Bitfinex', to: 'Coinbase', ms: 144 },
  { from: 'Bitstamp', to: 'Bitfinex', ms: 110 },
  { from: 'Deribit', to: 'Gemini', ms: 210 },
  { from: 'Gate.io', to: 'Binance', ms: 135 },
];

// --- HISTORICAL TIME-SERIES DATA ---
export const historicalLatencies: { pair: [string, string], history: LatencyPoint[] }[] = [
  {
    pair: ['Binance', 'OKX'],
    history: [
      { ts: 1660000000000, ms: 100 },
      { ts: 1660001000000, ms: 110 },
      // Add more points with realistic timestamps and ms values
    ]
  },
  // Add more pairs with histories
];

// --- HELPERS ---

// Returns time-series history for a given server pair
export function getLatencyHistory(server1: string, server2: string): LatencyPoint[] | null {
  const pair = historicalLatencies.find(
    p =>
      (p.pair[0] === server1 && p.pair[1] === server2) ||
      (p.pair[0] === server2 && p.pair[1] === server1)
  );
  return pair ? pair.history : null;
}

// Returns statistics for latency history: min, max, avg, median, p95, p99
export function getLatencyStats(server1: string, server2: string): {
  min: number, max: number, avg: number, median: number, p95: number, p99: number
} | null {
  const history: LatencyPoint[] | null = getLatencyHistory(server1, server2);
  if (!history || history.length === 0) return null;

  const latencies = history.map(p => p.ms).sort((a, b) => a - b);
  const min = latencies[0];
  const max = latencies[latencies.length - 1];
  const avg = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);
  const median = latencies[Math.floor(latencies.length / 2)];
  const p95 = latencies[Math.floor(latencies.length * 0.95)];
  const p99 = latencies[Math.floor(latencies.length * 0.99)];

  return { min, max, avg, median, p95, p99 };
}
