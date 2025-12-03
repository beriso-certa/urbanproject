'use client';

import { LatLngExpression } from 'leaflet';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// This component will only be rendered on the client side
const ClientSideMap = dynamic(
  () => import('react-leaflet').then((mod) => {
    const { MapContainer, TileLayer, Marker, Popup } = mod;
    return function ClientMap({ position, markerText }: { position: LatLngExpression, markerText: string }) {
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
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              <div className="text-center">
                <strong>Urban Film Production</strong><br />
                {markerText}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      );
    };
  }),
  { 
    ssr: false,
    loading: () => <div className="h-[500px] w-full bg-gray-800" />
  }
);

interface MapProps {
  position: LatLngExpression;
  className?: string;
  markerText?: string;
}

const Map = ({ 
  position = [9.0320, 38.7469], 
  className = '', 
  markerText = 'DM Geda Building, 7th Floor, Addis Ababa, Ethiopia' 
}: MapProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className={`h-[500px] w-full bg-gray-800 ${className}`} />;
  }

  return (
    <div className={`h-[500px] w-full border-4 border-red-600 overflow-hidden ${className}`}>
      <ClientSideMap position={position} markerText={markerText} />
    </div>
  );
};

export default Map;