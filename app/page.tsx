import SidePanel from '../components/sidePanel';
import Map3D from '../components/Map3D';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SidePanel />
      <main style={{ flex: 1, position: 'relative' }}>
        <Map3D />
      </main>
    </div>
  );
}
