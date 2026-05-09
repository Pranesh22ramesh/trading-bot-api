import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet + React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const SchoolMap = ({ schools, userLocation }) => {
  const center = userLocation ? [userLocation.latitude, userLocation.longitude] : [28.6139, 77.2090];

  return (
    <div className="glass p-2 shadow-2xl overflow-hidden fade-in">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {schools.map((school) => (
          <Marker key={school.id} position={[school.latitude, school.longitude]}>
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-indigo-400">{school.name}</h3>
                <p className="text-xs text-slate-300 mb-2">{school.address}</p>
                <div className="text-[10px] bg-slate-700 px-2 py-1 rounded inline-block">
                   {school.distance_km} km away
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]}>
             <Popup>You are here</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default SchoolMap;
