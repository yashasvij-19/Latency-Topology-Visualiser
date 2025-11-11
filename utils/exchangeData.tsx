export interface Exchange {
  name: string;
  longitude: number;
  latitude: number;
  cloud: 'AWS' | 'GCP' | 'Azure';
}

export const exchanges: Exchange[] = [
  { name: 'Binance', longitude: 139.6917, latitude: 35.6895, cloud: 'AWS' },
  { name: 'OKX', longitude: 98.58, latitude: 39.83, cloud: 'Azure' },
  { name: 'Deribit', longitude: 114.170949, latitude: 22.307137, cloud: 'GCP' },
  { name: 'Bybit', longitude:  103.8198, latitude: 1.3521, cloud: 'AWS' },       
  { name: 'Bitstamp', longitude: -0.457114, latitude: 51.520485, cloud: 'GCP' },    
  { name: 'Kraken', longitude: -122.4194, latitude: 37.77, cloud: 'AWS' },     
  { name: 'Huobi', longitude: 116.4074, latitude: 39.9042, cloud: 'Azure' }, 
];
