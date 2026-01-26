import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { List, Map, Plus } from 'lucide-react';
import { CollectionDetailHeader } from '@/components/collections/CollectionDetailHeader';
import { PlaceCard } from '@/components/collections/PlaceCard';
import { CollectionMap } from '@/components/collections/CollectionMap';
import { AddPlaceForm } from '@/components/collections/AddPlaceForm';
import { BottomNav } from '@/components/timeline/BottomNav';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { mockCollectionWithPlaces, Place } from '@/data/mockPlaces';
import { cn } from '@/lib/utils';

type ViewMode = 'list' | 'map';

const CollectionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const collection = id ? mockCollectionWithPlaces[id] : null;

  if (!collection) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-lg font-medium mb-2">Collection not found</h2>
          <Button variant="outline" onClick={() => navigate('/collections')}>
            Back to Collections
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    toast.success(`Share link copied for "${collection.title}"`);
  };

  const handleEdit = () => {
    toast.info(`Editing "${collection.title}" - Coming soon!`);
  };

  const handleManageCollaborators = () => {
    toast.info(`Managing collaborators - Coming soon!`);
  };

  const handleDelete = () => {
    toast.error(`Delete "${collection.title}" - Coming soon!`);
  };

  const handleAddPlace = () => {
    setIsAddPlaceOpen(true);
  };

  const handleAddPlaceSubmit = (data: {
    name: string;
    address: string;
    city: string;
    cuisine: string;
    rating: 'loved' | 'ok' | 'not_for_me';
    photo: string | null;
    notes: string;
  }) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.success(`"${data.name}" added to collection!`);
      setIsAddPlaceOpen(false);
      setIsSubmitting(false);
    }, 500);
  };

  const handlePlaceClick = (place: Place) => {
    setSelectedPlaceId(place.id);
    toast.info(`Opening "${place.name}" - Coming soon!`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <CollectionDetailHeader
        collection={collection}
        onShare={handleShare}
        onEdit={handleEdit}
        onManageCollaborators={handleManageCollaborators}
        onDelete={handleDelete}
      />

      {/* View mode toggle */}
      <div className="sticky top-[89px] z-10 bg-background/80 backdrop-blur-sm border-b border-border/30">
        <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors',
                viewMode === 'list'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <List className="w-4 h-4" />
              List
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors',
                viewMode === 'map'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Map className="w-4 h-4" />
              Map
            </button>
          </div>

          <Button
            size="sm"
            className="rounded-full"
            onClick={handleAddPlace}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Place
          </Button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-md mx-auto">
        {viewMode === 'list' ? (
          <div className="px-4 py-4 space-y-3">
            {collection.places.map((place, index) => (
              <div
                key={place.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <PlaceCard
                  place={place}
                  onClick={() => handlePlaceClick(place)}
                  isSelected={selectedPlaceId === place.id}
                />
              </div>
            ))}

            {collection.places.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Map className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-serif text-lg font-medium mb-2">No places yet</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-[240px]">
                  Start adding your favorite spots to this collection
                </p>
                <Button onClick={handleAddPlace} className="rounded-full">
                  Add First Place
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="h-[calc(100vh-180px)]">
            <CollectionMap
              places={collection.places}
              selectedPlaceId={selectedPlaceId}
              onPlaceSelect={handlePlaceClick}
            />
          </div>
        )}
      </main>

      <BottomNav />

      {/* Add Place Sheet */}
      <Sheet open={isAddPlaceOpen} onOpenChange={setIsAddPlaceOpen}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl">
          <SheetHeader className="pb-4">
            <SheetTitle className="font-serif text-xl">Add New Place</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(100%-60px)] pb-safe">
            <AddPlaceForm
              onSubmit={handleAddPlaceSubmit}
              onCancel={() => setIsAddPlaceOpen(false)}
              isSubmitting={isSubmitting}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CollectionDetail;
