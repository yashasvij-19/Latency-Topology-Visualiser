import SidePanel from '../../components/sidePanel';
import HistoricalLatencyPanel from '../../components/historicalLatencyPanel';

export default function viewHistoricalLatency() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SidePanel />
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}>
        <HistoricalLatencyPanel />
      </main>
    </div>
  );
}
