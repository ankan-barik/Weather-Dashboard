import { useEffect, useRef } from 'react';
import './MapSection.css';

const MapSection = ({ city, coordinates }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Make sure coordinates are available and Leaflet is loaded
    if (!coordinates || !window.L) {
      return;
    }

    // Initialize map if it doesn't exist yet
    if (!mapRef.current) {
      mapRef.current = window.L.map(mapContainerRef.current).setView(
        [coordinates.lat, coordinates.lon], 
        10
      );
      
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
      
      // Add marker
      markerRef.current = window.L.marker([coordinates.lat, coordinates.lon])
        .addTo(mapRef.current)
        .bindPopup(`<b>${city}</b><br>Weather location`)
        .openPopup();
    } else {
      // Update existing map and marker
      mapRef.current.setView([coordinates.lat, coordinates.lon], 10);
      
      if (markerRef.current) {
        markerRef.current.setLatLng([coordinates.lat, coordinates.lon])
          .bindPopup(`<b>${city}</b><br>Weather location`)
          .openPopup();
      } else {
        markerRef.current = window.L.marker([coordinates.lat, coordinates.lon])
          .addTo(mapRef.current)
          .bindPopup(`<b>${city}</b><br>Weather location`)
          .openPopup();
      }
    }

    // Trigger a resize event to ensure the map renders correctly
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 100);

    // Cleanup function
    return () => {
      // Only remove map when component is unmounted
      // We're not removing it on each render to prevent flickering
    };
  }, [city, coordinates]);

  // If no coordinates are available, show a message
  if (!coordinates) {
    return (
      <div className="map-section card">
        <h3 className="map-title">Location Map</h3>
        <div className="map-placeholder">
          <p>Search for a city to view its location on the map</p>
        </div>
      </div>
    );
  }

  return (
    <div className="map-section card">
      <h3 className="map-title">Location Map</h3>
      <div ref={mapContainerRef} className="map-container"></div>
    </div>
  );
};

export default MapSection;