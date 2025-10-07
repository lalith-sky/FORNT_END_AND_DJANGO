import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import axios from "axios";
import MenuBar from "./MenuBar";
import "../style/Heatmap.css";

// Component to render the heatmap layer
function HeatmapLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    // Remove any previous heat layer before adding
    let heatLayer = null;
    if (map && points.length > 0) {
      heatLayer = L.heatLayer(
        points.map((p) => [p.lat, p.lng, p.intensity || 1]),
        { radius: 30, blur: 25, maxZoom: 17 }
      ).addTo(map);
    }
    return () => {
      if (heatLayer) {
        map.removeLayer(heatLayer);
      }
    };
  }, [map, points]);

  return null;
}

export default function Heatmap({ onLogout, onNav }) {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/heatmap-data/")
      .then((response) => {
        setPoints(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching heatmap data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading heatmap data...</div>;

  // Default map center (set with your main region)
  const mapCenter = points.length > 0
    ? [points[0].lat, points[0].lng] // Center at first point if available
    : [12.9716, 77.5946];            // Fallback (Bangalore coords)

  return (
    <>
      <MenuBar onLogout={onLogout} onNav={onNav} />
      <div className="heatmap-container">
        <h1 className="heatmap-title">🗺️ Heatmap Visualization</h1>
        <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={true}
          style={{ height: "500px", width: "100%" }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <HeatmapLayer points={points} />
        </MapContainer>
      </div>
    </>
  );
}
