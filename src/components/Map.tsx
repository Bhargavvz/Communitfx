import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface Location {
  lat: number;
  lng: number;
}

interface Issue {
  id: string;
  title: string;
  description: string;
  location: Location;
  status: string;
}

interface IssueMapProps {
  issues: Issue[];
}

export default function IssueMap({ issues }: IssueMapProps) {
  const center: Location = issues[0]?.location || { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco

  return (
    <MapContainer
      center={[17.45563956150916, 78.66645358023057]}
      zoom={13}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {issues.map((issue) => (
        <Marker
          key={issue.id}
          position={[issue.location.lat, issue.location.lng]}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-lg">{issue.title}</h3>
              <p className="text-gray-600">{issue.description}</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${
                issue.status === 'solved' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {issue.status}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}