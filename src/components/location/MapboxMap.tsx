import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapboxMapProps {
  center?: [number, number];
  onReady?: (map: mapboxgl.Map) => void;
  token?: string | null;
}

const MapboxMap: React.FC<MapboxMapProps> = ({ center = [30, 15], onReady, token }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!token) {
        setError("Mapbox token missing. Enter your Mapbox public token above.");
        return;
      }
      mapboxgl.accessToken = token;
      if (!mapContainer.current) return;
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center,
        zoom: 10,
        pitch: 30,
      });
      mapRef.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");
      onReady?.(mapRef.current);
    })();
    return () => {
      mounted = false;
      mapRef.current?.remove();
    };
  }, [center, onReady, token]);

  if (error) {
    return (
      <div className="p-4 border rounded-md bg-secondary/50 text-sm text-muted-foreground">
        {error}
      </div>
    );
  }

  return <div ref={mapContainer} className="w-full h-80 rounded-lg overflow-hidden" />;
};

export default MapboxMap;
