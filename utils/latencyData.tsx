import { exchanges } from "./exchangeData";

interface Latency {
  from: string;
  to: string;
  ms: number;
}

export const latencies = [
  { from: 'Binance', to: 'OKX', ms: 120 },
  { from: 'OKX', to: 'Kraken', ms: 220 },
  { from: 'Bybit', to: 'Bitstamp', ms: 60 },
  { from: 'Kraken', to: 'Deribit', ms: 320 },
  { from: 'Huobi', to: 'Binance', ms: 180 },
];


