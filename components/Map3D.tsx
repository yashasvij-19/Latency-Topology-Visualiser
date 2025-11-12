'use client';
import React, { useEffect, useState, useRef } from 'react';
import Map from 'react-map-gl/maplibre';
import { Marker } from 'react-map-gl/maplibre';
import { exchanges, Exchange } from '../utils/exchangeData';
import Legend from '../components/Legend';
import Modal from '../components/Modal';
import { latencies as initialLatencies } from '../utils/latencyData';
import { cloudRegions } from '../utils/cloudRegions';
import ControlPanel from './controlPanel';

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
  const [clickedRegion, setClickedRegion] = useState<any | null>(null);

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const handleThemeToggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Latency state for live updates
  const [latencies, setLatencies] = useState(initialLatencies);

  // Cloud region filter state
  const [visibleProviders, setVisibleProviders] = useState<string[]>(["AWS", "GCP", "Azure"]);

  // Interactive control states
  const [showRealtime, setShowRealtime] = useState(true);
  const [showHistorical, setShowHistorical] = useState(false);
  const [showRegions, setShowRegions] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Ref for Map instance
  const mapRef = useRef<any>(null);

  // Search handler: pans map to searched exchange or region
  const handleSearch = (term: string) => {
    const lowerTerm = term.trim().toLowerCase();
    if (!lowerTerm) return;

    const matchExchange = exchanges.find(ex => ex.name.toLowerCase().includes(lowerTerm));
    if (matchExchange) {
      setViewState(v => ({
        ...v,
        longitude: matchExchange.longitude,
        latitude: matchExchange.latitude,
        zoom: 2.5,
        transitionDuration: 800,
      }));
      return;
    }

    const matchRegion = cloudRegions.find(r =>
      r.name.toLowerCase().includes(lowerTerm) ||
      r.regionCode.toLowerCase().includes(lowerTerm)
    );
    if (matchRegion) {
      setViewState(v => ({
        ...v,
        longitude: matchRegion.longitude,
        latitude: matchRegion.latitude,
        zoom: 2.5,
        transitionDuration: 800,
      }));
    }
  };

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    document.body.classList.toggle('light', theme === 'light');
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatencies(prev =>
        prev.map(l => ({
          ...l,
          ms: Math.max(30, Math.round(l.ms + (Math.random() - 0.5) * 80))
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setError('Failed to load map');
    setLoading(false);
  };

  // Use window width to make map height adaptive (for mobile)
  const [windowWidth, setWindowWidth] = useState<number>(1200);
  useEffect(() => {
    const resize = () => setWindowWidth(window.innerWidth);
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  const mapHeight = windowWidth < 700 ? Math.max(320, Math.round(window.innerHeight * 0.38)) : 500;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: windowWidth < 650 ? 'column' : 'row',
        width: '100%',
        height: '100vh',
        minHeight: 0
      }}
    >
      {/* If using a sidebar, put it here as first child */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh'
      }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: mapHeight,
            minHeight: windowWidth < 700 ? 220 : 320,
            background: theme === 'dark' ? '#161825' : '#fff'
          }}
        >
          <button style={{
            position: 'absolute',
            top: 12, right: 24, zIndex: 30,
            padding: '8px 18px',
            background: theme === 'dark' ? '#292b38' : '#e7eaf6',
            color: theme === 'dark' ? '#fafafa' : '#222',
            border: 'none',
            borderRadius: '20px',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.09)',
          }} onClick={handleThemeToggle}>
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
            onClick={() => {
              setClickedMarker(null);
              setClickedRegion(null);
            }}
          >
            {/* Exchange markers (always shown) */}
            {exchanges.map(ex => (
              <Marker
                key={ex.name}
                longitude={ex.longitude}
                latitude={ex.latitude}
                color={
                  ex.cloud === 'AWS' ? 'red' :
                  ex.cloud === 'Azure' ? 'blue' : 'green'
                }
                onClick={e => {
                  e.originalEvent.stopPropagation();
                  setClickedMarker(ex);
                }}
              />
            ))}

            {/* Cloud provider region markers (Regions toggle) */}
            {showRegions && cloudRegions.filter(r => visibleProviders.includes(r.provider)).map(region => (
              <Marker
                key={region.regionCode}
                longitude={region.longitude}
                latitude={region.latitude}
                color={
                  region.provider === "AWS" ? "red" :
                  region.provider === "GCP" ? "green" : "blue"
                }
                onClick={e => {
                  e.originalEvent.stopPropagation();
                  setClickedRegion(region);
                }}
              >
                <div style={{
                  background: "rgba(255,255,255,0.98)",
                  borderRadius: "11px",
                  padding: "5px 11px",
                  boxShadow: "0 2px 10px rgba(40,60,120,0.11)",
                  fontWeight: 500,
                  fontSize: "0.93rem",
                  color: "#222",
                  marginTop: 2
                }}>
                  {region.name} ({region.regionCode})
                </div>
              </Marker>
            ))}
          </Map>

          {/* Marker modals */}
          {clickedMarker && (
            <Modal onClose={() => setClickedMarker(null)}>
              <strong>{clickedMarker.name}</strong><br />
              Cloud: {clickedMarker.cloud}<br />
              Lat: {clickedMarker.latitude}, Lon: {clickedMarker.longitude}
            </Modal>
          )}

          {clickedRegion && (
            <Modal onClose={() => setClickedRegion(null)}>
              <strong>{clickedRegion.provider} Region: {clickedRegion.name}</strong><br />
              Code: {clickedRegion.regionCode}<br />
              Lat: {clickedRegion.latitude}, Lon: {clickedRegion.longitude}<br />
              Server Count: {clickedRegion.servers}
            </Modal>
          )}

          {/* Real-time Latency Arcs (toggle) */}
          {showRealtime && (
            <svg style={{ position: 'absolute', pointerEvents: 'none', top: 0, left: 0, width: '100%', height: '100%', zIndex: 20 }}>
              {latencies.map((latency, i) => {
                const fromCoords = getCoords(latency.from);
                const toCoords = getCoords(latency.to);
                if (!fromCoords || !toCoords || !mapRef.current || typeof mapRef.current.project !== 'function') return null;
                const fromPoint = mapRef.current.project([fromCoords[0], fromCoords[1]]);
                const toPoint = mapRef.current.project([toCoords[0], toCoords[1]]);
                const cx = (fromPoint.x + toPoint.x) / 2;
                const cy = (fromPoint.y + toPoint.y) / 2 - 80;
                let strokeColor = '#34e47a'; // Green low latency
                if (latency.ms >= 150 && latency.ms < 300) strokeColor = '#ffdb38'; // Yellow medium
                else if (latency.ms >= 300) strokeColor = '#e94c4c'; // Red high

                const arcPath = `M${fromPoint.x},${fromPoint.y} Q${cx},${cy} ${toPoint.x},${toPoint.y}`;

                return (
                  <g key={i}>
                    <path d={arcPath} stroke={strokeColor} strokeWidth={3} className="pulsing-arc" fill="none" style={{ transition: 'stroke 0.3s ease' }} />
                    <text x={cx} y={cy - 14} fill={theme === 'dark' ? '#fff' : '#222'} fontSize="13" fontWeight="bold" textAnchor="middle">{latency.ms} ms</text>
                  </g>
                );
              })}
            </svg>
          )}

          {/* Historical overlay example */}
          {showHistorical && (
            <div style={{
              position: 'absolute',
              bottom: 10,
              right: 15,
              background: 'rgba(24,36,58,0.97)',
              color: '#fff',
              padding: '13px 18px',
              borderRadius: 8,
              fontWeight: 500,
              zIndex: 30
            }}>
              Historical layer is ON (demo)!
            </div>
          )}
        </div>
        {/* Responsive Control Panel always below map */}
        <ControlPanel
          showRealtime={showRealtime}
          setShowRealtime={setShowRealtime}
          showHistorical={showHistorical}
          setShowHistorical={setShowHistorical}
          showRegions={showRegions}
          setShowRegions={setShowRegions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
};

export default Map3D;
