import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Place } from '@/data/mockPlaces';
import { cn } from '@/lib/utils';

// Fix default marker icon issue with Leaflet + bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icons by rating
const createCustomIcon = (rating: Place['rating']) => {
  const colors = {
    loved: '#E88B8B',
    ok: '#E8C76B',
    not_for_me: '#A0A0A0',
  };

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${colors[rating]};
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      "></div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

interface FitBoundsProps {
  places: Place[];
}

const FitBounds = ({ places }: FitBoundsProps) => {
  const map = useMap();

  useEffect(() => {
    if (places.length > 0) {
      const bounds = L.latLngBounds(places.map(p => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [places, map]);

  return null;
};

interface CollectionMapProps {
  places: Place[];
  selectedPlaceId?: string | null;
  onPlaceSelect?: (place: Place) => void;
  className?: string;
}

export const CollectionMap = ({
  places,
  selectedPlaceId,
  onPlaceSelect,
  className,
}: CollectionMapProps) => {
  const mapRef = useRef<L.Map | null>(null);

  // Calculate center from places
  const center: [number, number] = places.length > 0
    ? [
        places.reduce((sum, p) => sum + p.lat, 0) / places.length,
        places.reduce((sum, p) => sum + p.lng, 0) / places.length,
      ]
    : [35.6762, 139.6503]; // Default to Tokyo

  return (
    <div className={cn('w-full h-full rounded-xl overflow-hidden', className)}>
      <MapContainer
        center={center}
        zoom={13}
        className="w-full h-full"
        ref={mapRef}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds places={places} />
        
        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={createCustomIcon(place.rating)}
            eventHandlers={{
              click: () => onPlaceSelect?.(place),
            }}
          >
            <Popup>
              <div className="font-sans">
                <p className="font-medium text-sm">{place.name}</p>
                <p className="text-xs text-gray-500">{place.cuisine}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
