'use client';
import React from 'react';

export default function ControlPanel({
  showRealtime, setShowRealtime,
  showHistorical, setShowHistorical,
  showRegions, setShowRegions,
  searchTerm, setSearchTerm,
  onSearch
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  return (
   <form
  className="panel-bottom"
  onSubmit={handleSubmit}
  style={{
    width: '100%',
    maxWidth: 740,
    margin: '20px auto 0 auto',
    padding: '10px 15px',
    background: '#f7faff',
    borderRadius: 12,
    boxShadow: '0 2px 8px #ccd9ee40',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    zIndex: 29,
    flexWrap: 'wrap'
  }}
>
      <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 500 }}>
        <input type="checkbox" checked={showRealtime} onChange={()=>setShowRealtime(v=>!v)} />
        Real-time
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 500 }}>
        <input type="checkbox" checked={showHistorical} onChange={()=>setShowHistorical(v=>!v)} />
        Historical
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 500 }}>
        <input type="checkbox" checked={showRegions} onChange={()=>setShowRegions(v=>!v)} />
        Regions
      </label>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 0 }}>
        <input
          placeholder="Search exchange/region"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            padding: '8px 10px',
            borderRadius: '8px 0 0 8px',
            border: '1px solid #abc',
            borderRight: 'none',
            fontSize: 15,
            width: '100%'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 18px',
            borderRadius: '0 8px 8px 0',
            border: '1px solid #abc',
            background: '#244bd8',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 15,
            borderLeft: 'none'
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
}
