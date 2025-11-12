// components/LatencyTrendChart.tsx
'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { LatencyPoint } from '../utils/latencyData';

interface LatencyTrendChartProps {
  history: LatencyPoint[];
}

const formatTime = (ts: number) => {
  const d = new Date(ts);
  return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
};

const LatencyTrendChart: React.FC<LatencyTrendChartProps> = ({ history }) => (
  <div style={{ width: '100%', height: 260, background: 'rgba(255,255,255,0.75)', borderRadius: '12px', padding: '18px' }}>
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={history}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="ts"
          minTickGap={28}
          tickFormatter={formatTime}
          fontSize={12}
        />
        <YAxis domain={['dataMin - 10', 'dataMax + 10']} fontSize={12} />
        <Tooltip
          formatter={(value:number) => `${value} ms`}
          labelFormatter={(ts: number) => (new Date(ts)).toLocaleString()}
        />
        <Line
          type="monotone"
          dataKey="ms"
          stroke="#44a2f7"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default LatencyTrendChart;
