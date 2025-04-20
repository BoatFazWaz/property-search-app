'use client';

import React, { useEffect, useState } from 'react';
// Import leaflet CSS and components here since this file is only loaded on the client
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface Property {
  id: string;
  title: string;
  price: number;
  location: {
    lat: number;
    lng: number;
  };
}

interface MapComponentProps {
  properties: Property[];
}

const MapComponent = ({ properties }: MapComponentProps) => {
  // Use this to ensure the component only renders on client-side
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Fix for default marker icons in react-leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
    
    // Flag that component is now mounted
    setIsMounted(true);
  }, []);

  // Don't render anything until after component mounts on client
  if (!isMounted) {
    return <div className="h-full w-full flex items-center justify-center bg-gray-100 p-4 rounded min-h-[400px]">Loading map...</div>;
  }

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: '100%', width: '100%', minHeight: '400px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={[property.location.lat, property.location.lng]}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{property.title}</h3>
              <p className="text-sm text-gray-600">
                ${property.price.toLocaleString()}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent; 