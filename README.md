# Latency Topology Visualizer

This project is a Next.js-based web app for interactive, real-time visualization and exploration of global cryptocurrency exchange latency, with support for historical trends, cloud provider regions, and responsive control. It leverages Maplibre GL JS for 3D geospatial rendering, provides rich filtering, and is designed for clarity in trading infrastructure analysis.

## Getting Started

Prerequisites
Node.js v18+
npm (or yarn/pnpm/bun)

Installation and Local Development

Clone this repository to your local environment.
Install dependencies:

bash
npm install
Start the dev server:

bash
npm run dev
You may also use yarn dev, pnpm dev, or bun dev.
Open http://localhost:3000 in your browser to launch the application.
Editing and Hot Reload
Modify any component in the app/ or components/ directories.
All changes are reflected live via Next.js hot reloading.

## Project Structure
```
/app

  layout.tsx       # Global app frame and metadata
  page.tsx         # Home map view
  /trends/         # Historical latency trends subapp

/components

  Map3D.tsx        # Main 3D globe and data overlays
  ControlPanel.tsx # Interactive search and filter controls
  Legend.tsx       # Color/key display
  Modal.tsx
  ...
/utils
  exchangeData.ts  # Exchange server locations
  latencyData.ts   # Live/simulated latency values
  cloudRegions.ts  # Cloud region lookup

/styles
  globals.css      # Custom theming, responsive tweaks
```

## Features

3D Interactive Globe with real-time latency arcs (Maplibre GL JS, no map token required)
Animated Cloud Regions: AWS, GCP, Azure, with discrete color legend and marker overlays
Toggle Layers: Instantly control visibility of real-time, historical, and region layers
Search: Instantly pan to any region or exchange by name or code (mobile and desktop optimized)
Switchable Themes: Light and dark mode with one-click toggle
Responsive: Automatic re-layout for mobile and touch devices

## How Each UI Element Works

Side Panel: Shows cloud provider legend, navigation to trends view, provider toggles (does not filter latency directly)
Control Panel: Below map; toggles overlays for real-time data, historical annotations, and region clusters. The search bar pans the globe to typed locations.
Search: Accepts partial names/codes (for regions or exchanges), recenters globe, and does not filter out unselected nodes.
Historical View (/trends): Choose exchange pairs and period, see full latency stats and history as interactive charts (no map overlays).

# Assumptions and Implementation Notes

All network latency data is simulated/randomized for demonstration; historical stats are demo data and do not hit an API.
Maplibre GL is used exclusively for open, commercial-friendly mapping without Mapbox keys.
Cloud region overlays are static for demo; these could be dynamic in a real system.
"Historical" toggle on the globe is a placeholder (does not render historical arcs, by design—all trends are shown in /trends).



