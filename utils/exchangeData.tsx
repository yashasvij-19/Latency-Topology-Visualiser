export interface Exchange {
  name: string;
  longitude: number;
  latitude: number;
  cloud: 'AWS' | 'GCP' | 'Azure';
}

export const exchanges: Exchange[] = [
  { name: 'Binance', longitude: 114.1694, latitude: 22.3193, cloud: 'AWS' },
  { name: 'OKX', longitude: 113.5439, latitude: 22.1987, cloud: 'Azure' },
  { name: 'Deribit', longitude: 4.8952, latitude: 52.3702, cloud: 'GCP' }
];
