import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  MapPin, 
  MessageSquare, 
  Share2, 
  Edit, 
  Trash2, 
  ExternalLink,
  Navigation,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { BottomNav } from '@/components/timeline/BottomNav';
import { mockCollectionWithPlaces, Place } from '@/data/mockPlaces';
import { cn } from '@/lib/utils';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ratingStyles = {
  loved: 'bg-rating-loved/10 text-rating-loved border-rating-loved/20',
  ok: 'bg-rating-ok/10 text-rating-ok border-rating-ok/20',
  not_for_me: 'bg-rating-bad/10 text-rating-bad border-rating-bad/20',
};

const ratingLabels = {
  loved: 'Loved it',
  ok: 'It was ok',
  not_for_me: 'Not for me',
};

const ratingIcons = {
  loved: '❤️',
  ok: '👍',
  not_for_me: '👎',
};

// Custom marker icons
const createMarkerIcon = (rating: 'loved' | 'ok' | 'not_for_me') => {
  const colors = {
    loved: '#f87171',
    ok: '#fbbf24',
    not_for_me: '#9ca3af',
  };

  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 32px;
      height: 32px;
      background-color: ${colors[rating]};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    "></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const PlaceDetail = () => {
  const { collectionId, placeId } = useParams<{ collectionId: string; placeId: string }>();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Find the place
  const collection = collectionId ? mockCollectionWithPlaces[collectionId] : null;
  const place = collection?.places.find(p => p.id === placeId);

  if (!collection || !place) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-lg font-medium mb-2">Place not found</h2>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleEdit = () => {
    toast.info('Edit place - Coming soon!');
  };

  const handleDelete = () => {
    setDeleteDialogOpen(false);
    toast.success(`"${place.name}" deleted from collection`);
    navigate(`/collections/${collectionId}`);
  };

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
    window.open(url, '_blank');
  };

  const handleOpenInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;
    window.open(url, '_blank');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border/30">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/collections/${collectionId}`)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Edit className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Place
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive focus:text-destructive"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Place
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        {/* Hero Photo */}
        {place.photo ? (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={place.photo}
              alt={place.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video w-full bg-muted flex items-center justify-center">
            <MapPin className="w-12 h-12 text-muted-foreground" />
          </div>
        )}

        {/* Content */}
        <div className="px-4 py-6 space-y-6">
          {/* Title and Rating */}
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h1 className="font-serif text-2xl font-semibold">{place.name}</h1>
              <span
                className={cn(
                  'text-sm px-3 py-1 rounded-full border flex-shrink-0',
                  ratingStyles[place.rating]
                )}
              >
                {ratingIcons[place.rating]} {ratingLabels[place.rating]}
              </span>
            </div>
            <p className="text-muted-foreground">{place.cuisine}</p>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleGetDirections}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Directions
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleOpenInMaps}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in Maps
            </Button>
          </div>

          {/* Address Card */}
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1">Address</h3>
                <p className="text-sm text-muted-foreground">{place.address}</p>
                <p className="text-sm text-muted-foreground">{place.city}</p>
              </div>
            </div>
          </Card>

          {/* Notes */}
          {place.notes && (
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Notes</h3>
                  <p className="text-sm text-muted-foreground">{place.notes}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Map */}
          <Card className="overflow-hidden">
            <div className="h-48">
              <MapContainer
                center={[place.lat, place.lng]}
                zoom={15}
                scrollWheelZoom={false}
                className="h-full w-full"
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[place.lat, place.lng]}
                  icon={createMarkerIcon(place.rating)}
                >
                  <Popup>
                    <strong>{place.name}</strong>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            <button 
              className="w-full p-3 text-sm text-primary hover:bg-muted/50 transition-colors border-t border-border/30 flex items-center justify-center gap-2"
              onClick={handleOpenInMaps}
            >
              <ExternalLink className="w-4 h-4" />
              View larger map
            </button>
          </Card>

          {/* Added by */}
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={place.addedBy.avatar} alt={place.addedBy.name} />
                <AvatarFallback>{place.addedBy.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">Added by {place.addedBy.name}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {formatDate(place.addedAt)}
                </div>
              </div>
            </div>
          </Card>

          {/* Collection info */}
          <div className="text-center text-sm text-muted-foreground">
            Part of <button 
              className="text-primary hover:underline"
              onClick={() => navigate(`/collections/${collectionId}`)}
            >
              {collection.title}
            </button>
          </div>
        </div>
      </main>

      <BottomNav />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Place</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove "{place.name}" from this collection? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlaceDetail;
