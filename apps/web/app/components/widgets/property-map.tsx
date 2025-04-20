'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

interface Property {
  id: string;
  title: string;
  price: number;
  location: {
    lat: number;
    lng: number;
  };
}

export function PropertyMapWidget() {
  const [properties, setProperties] = useState<Property[]>([
    // Sample data - replace with actual API call
    {
      id: '1',
      title: 'Modern Apartment',
      price: 500000,
      location: { lat: 51.505, lng: -0.09 }
    },
    {
      id: '2',
      title: 'Luxury Villa',
      price: 1200000,
      location: { lat: 51.51, lng: -0.1 }
    }
  ]);

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border border-gray-200">
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
    </div>
  );
} 