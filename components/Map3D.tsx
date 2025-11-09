import React, { useState } from 'react';
import Map, { Marker, MapRef } from 'react-map-gl';
import type { MapEvent } from 'react-map-gl';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const Map3D: React.FC = () => {
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 20,
    zoom: 1.5,
    pitch: 45,
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
      {loading && <p>Loading map...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        onLoad={handleLoad}
        onError={handleError}
      >
        <Marker longitude={-74.006} latitude={40.7128} color="red" />
        {/* Add more markers here */}
      </Map>
    </div>
  );
};

export default Map3D;
