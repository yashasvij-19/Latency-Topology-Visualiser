'use client';
import React, { useState } from 'react';
import Map from 'react-map-gl/maplibre';
import { Marker, MapRef } from 'react-map-gl/maplibre';
import { exchanges, Exchange } from '../utils/exchangeData';
import Legend  from '../components/Legend';


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

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = (event: any) => {
    setError('Failed to load map');
    setLoading(false);
  };

  return (
    
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      {loading && <p>Loading map...</p> }
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Map
  {...viewState}
  onMove={evt => setViewState(evt.viewState)}
  mapStyle="https://demotiles.maplibre.org/style.json"                      // You may omit token as MapLibre is token-free
  style={{ width: '100%', height: '100%' }}
  onLoad={handleLoad}
  onError={handleError}
  projection = 'globe'
>
        <Marker longitude={-74.006} latitude={40.7128} color="red" />
        {/* Add more markers here */}
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
    />
  ))}
   <Legend />
      </Map>
    </div>
  );
};

export default Map3D;
