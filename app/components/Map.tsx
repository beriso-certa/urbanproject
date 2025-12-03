'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

// ✅ Dynamically import react-leaflet with SSR disabled
const ClientSideMap = dynamic(
  async () => {
    const mod = await import('react-leaflet');
    const { MapContainer, TileLayer, Marker, Popup } = mod;

    return function ClientMap({
      position,
      markerText,
    }: {
      position: [number, number];
      markerText: string;
    }) {
      return (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          className="rounded-lg z-0"
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <Marker position={position}>
            <Popup>
              <div className="text-center">
                <strong>Urban Film Production</strong>
                <br />
                {markerText}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      );
    };
  },
  {
    ssr: false,
    loading: () => <div className="h-[500px] w-full bg-gray-800 animate-pulse" />,
  }
);

interface MapProps {
  position?: [number, number];
  className?: string;
  markerText?: string;
}

const Map = ({
  position = [9.032, 38.7469],
  className = '',
  markerText = 'DM Geda Building, 7th Floor, Addis Ababa, Ethiopia',
}: MapProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`h-[500px] w-full bg-gray-800 ${className}`} />;
  }

  return (
    <div className={`h-[500px] w-full border-4 border-red-600 overflow-hidden ${className}`}>
      <ClientSideMap position={position} markerText={markerText} />
    </div>
  );
};

export default Map;
