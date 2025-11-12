// components/SidePanel.tsx
'use client';
import React , {useState} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Legend from './Legend';

const SidePanel: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
const [visibleProviders, setVisibleProviders] = useState<string[]>(["AWS", "GCP", "Azure"]);
  return (
    <aside style={{
      width: 240,
      backgroundColor: '#f7f9fc',
      borderRadius: 15,
      boxShadow: '0 7px 18px rgb(26 29 44 / 15%)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 32,
      overflowY: 'auto',
      minHeight: '95vh',
    }}>
      <Legend/>
      {pathname === '/' ? (
        <button
          style={{
            position:'absolute',
            width: '15%',
            top:'40%',
            left:'1%',
            padding: '5px 0',
            fontWeight: 700,
            borderRadius: 10,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#2854d8',
            color: 'white',
            fontSize: 16,
          }}
          onClick={() => router.push('/trends')}
        >
          View Historical Latency
        </button>
      ) : (
        <button
          style={{
            position:'absolute',
            width: '15%',
            top:'40%',
            left:'1%',
            padding: '5px 0',
            fontWeight: 700,
            borderRadius: 10,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#2854d8',
            color: 'white',
            fontSize: 16,
          }}
          onClick={() => router.push('/')}
        >
          Go Back to Home
        </button>
      )}
       <div style={{ position: 'absolute', top: 300, left: 10, zIndex: 29, display: 'flex', gap: 8 }}>
        {["AWS", "GCP", "Azure"].map(p => (
          <button key={p}
            style={{
              background: visibleProviders.includes(p) ? "#244bd8" : "#eee",
              color: visibleProviders.includes(p) ? "#fff" : "#244bd8",
              borderRadius: 8, border: "none", padding: "7px 16px", fontWeight: 500, cursor: "pointer"
            }}
            onClick={() => setVisibleProviders(
              visibleProviders.includes(p)
                ? visibleProviders.filter(x => x !== p)
                : [...visibleProviders, p]
            )}>
            {p}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default SidePanel;
