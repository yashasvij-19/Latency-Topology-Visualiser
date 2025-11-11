'use client';
import React, { useEffect,useState, useRef } from 'react';
import Map from 'react-map-gl/maplibre';
import { Marker } from 'react-map-gl/maplibre';
import { exchanges, Exchange } from '../utils/exchangeData';
import Legend from '../components/Legend';
import Modal from '../components/Modal';
import { latencies } from '../utils/latencyData';

const getCoords = (name: string): [number, number] | null => {
  const exchange = exchanges.find(e => e.name === name);
  return exchange ? [exchange.longitude, exchange.latitude] : null;
};

const Map3D: React.FC = () => {
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 0,
    pitch: 0,
    bearing: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [clickedMarker, setClickedMarker] = useState<Exchange | null>(null);

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const handleThemeToggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    document.body.classList.toggle('light', theme === 'light');
  }, [theme]);

  const mapRef = useRef<any>(null);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = (event: any) => {
    setError('Failed to load map');
    setLoading(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        background: theme === 'dark' ? '#161825' : '#fff',
        transition: 'background 0.2s',
      }}
    >
      {/* Theme toggle button */}
      <button
        style={{
          position: 'absolute',
          top: 12,
          right: 24,
          zIndex: 30,
          padding: '8px 18px',
          background: theme === 'dark' ? '#292b38' : '#e7eaf6',
          color: theme === 'dark' ? '#fafafa' : '#222',
          border: 'none',
          borderRadius: '20px',
          fontWeight: 600,
          fontSize: '0.95rem',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.09)',
        }}
        onClick={handleThemeToggle}
      >
        {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
      </button>

      {loading && <p>Loading map...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Map
        {...viewState}
        ref={mapRef}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="https://demotiles.maplibre.org/style.json"
        style={{ width: '100%', height: '100%' }}
        onLoad={handleLoad}
        onError={handleError}
        projection={'globe'}
        onClick={() => setClickedMarker(null)}
      >
        {exchanges.map((exchange: Exchange) => (
          <Marker
            key={exchange.name}
            longitude={exchange.longitude}
            latitude={exchange.latitude}
            color={
              exchange.cloud === 'AWS'
                ? 'orange'
                : exchange.cloud === 'Azure'
                ? 'blue'
                : 'green'
            }
            onClick={e => {
              e.originalEvent.stopPropagation();
              setClickedMarker(exchange);
            }}
          />
        ))}
        <Legend />
      </Map>

      {clickedMarker && (
        <Modal onClose={() => setClickedMarker(null)}>
          <div>
            <strong>{clickedMarker.name}</strong>
            <br />
            Cloud: {clickedMarker.cloud}
            <br />
            Lat: {clickedMarker.latitude}, Lon: {clickedMarker.longitude}
          </div>
        </Modal>
      )}

      {/* Latency arcs SVG overlay */}
      <svg
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 20,
        }}
      >
        {latencies.map((latency, i) => {
          const fromCoords = getCoords(latency.from);
          const toCoords = getCoords(latency.to);
          if (
            !fromCoords ||
            !toCoords ||
            !mapRef.current ||
            typeof mapRef.current.project !== 'function'
          )
            return null;

          // Project lon/lat to screen positions
          const fromPoint = mapRef.current.project([fromCoords[0], fromCoords[1]]);
          const toPoint = mapRef.current.project([toCoords[0], toCoords[1]]);

          // Calculate arc control point (elevate in screen space)
          const cx = (fromPoint.x + toPoint.x) / 2;
          const cy = (fromPoint.y + toPoint.y) / 2 - 80;

          // All arcs white in dark, black in light mode
          let strokeColor = 'red';

          const arcPath = `M${fromPoint.x},${fromPoint.y} Q${cx},${cy} ${toPoint.x},${toPoint.y}`;

          return (
            <path
              key={i}
              d={arcPath}
              stroke={strokeColor}
              strokeWidth={3}
              strokeOpacity={0.85}
              fill="none"
              style={{ transition: 'stroke 0.3s ease' }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default Map3D;
