const Legend: React.FC = () => (
  <div className="legend-overlay">
    <h3>Cloud Providers</h3>
    <div className="legend-marker">
      <span className="legend-color-dot" style={{ background: "red" }} /> AWS
    </div>
    <div className="legend-marker">
      <span className="legend-color-dot" style={{ background: "green" }} /> GCP
    </div>
    <div className="legend-marker">
      <span className="legend-color-dot" style={{ background: "blue" }} /> Azure
    </div>
  </div>
);

export default Legend;