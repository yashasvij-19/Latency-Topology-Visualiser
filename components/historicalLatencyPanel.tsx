'use client';
import React, { useState, useMemo } from 'react';
import { servers, getLatencyHistory, getLatencyStats } from '../utils/latencyData';
import LatencyTrendChart from './latencyTrendChart';

const TIME_RANGES = [
  { label: '1 hour', hours: 1 },
  { label: '24 hours', hours: 24 },
  { label: '7 days', hours: 168 },
  { label: '30 days', hours: 720 }
];

const pairList: [string, string][] = [];
servers.forEach((a,i) => servers.slice(i+1).forEach(b => pairList.push([a,b])));

const HistoricalLatencyPanel: React.FC = () => {
  const [pair, setPair] = useState<[string, string]>(['Binance', 'OKX']);
  const [rangeIdx, setRangeIdx] = useState(1);

  const rawHistory = getLatencyHistory(pair[0], pair[1]) || [];
  const cutTs = Date.now() - (TIME_RANGES[rangeIdx].hours * 3600 * 1000);
  const history = rawHistory.filter(p => p.ts >= cutTs);
  const stats = useMemo(() => {
    const numbers = history.map(p => p.ms);
    if (!numbers.length) return null;
    const sorted = [...numbers].sort((a,b)=>a-b);
    return {
      min: sorted[0],
      max: sorted[sorted.length-1],
      avg: Math.round(numbers.reduce((s,v)=>s+v,0)/numbers.length)
    };
  }, [history]);

  return (
    <div style={{ margin: '30px auto', maxWidth: 670, background: 'rgba(244,247,255,0.95)', border: '1px solid #dde4f5', borderRadius: 12, padding: '20px 26px 10px' }}>
      <h2 style={{ marginTop: 0, marginBottom: 12, letterSpacing: '0.06em', fontWeight: 700, color: '#254068' }}>
        Historical Latency Trends
      </h2>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
        <span>Exchange Pair:</span>
        <select
          value={pair.join('~')}
          onChange={e => {
            const [a,b] = e.target.value.split('~');
            setPair([a,b]);
          }}
          style={{ fontSize: '1rem', padding: '5px 14px', borderRadius: 8, minWidth: 110, border: '1px solid #dde4f5', background:'#fff'}}
        >
          {pairList.map(([a, b]) => (
            <option key={a+b} value={`${a}~${b}`}>{a} ↔ {b}</option>
          ))}
        </select>
        <span style={{ marginLeft: 18, fontSize: 15 }}>Time Range:</span>
        {TIME_RANGES.map((t, idx) => (
          <button
            key={t.label}
            onClick={() => setRangeIdx(idx)}
            style={{
              background: idx === rangeIdx ? '#254068' : '#fff',
              color: idx === rangeIdx ? '#fff' : '#254068',
              padding: '5px 16px',
              border: '1px solid #cbd2ea',
              borderRadius: 7,
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              marginRight: 7
            }}
          >{t.label}</button>
        ))}
      </div>
      <div style={{ marginBottom: 10 }}>
        <strong>Stats:</strong>
        {stats
          ? <span style={{ marginLeft: 11, fontSize: 14 }}>
              Min: {stats.min} ms | Max: {stats.max} ms | Average: {stats.avg} ms
            </span>
          : <span style={{ marginLeft: 11 }}>No data for period.</span>
        }
      </div>
      <LatencyTrendChart history={history} />
    </div>
  );
};

export default HistoricalLatencyPanel;
