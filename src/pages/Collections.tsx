import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FolderPlus } from 'lucide-react';
import { CollectionsHeader } from '@/components/collections/CollectionsHeader';
import { CollectionCard } from '@/components/collections/CollectionCard';
import { BottomNav } from '@/components/timeline/BottomNav';
import { mockCollections, Collection } from '@/data/mockCollections';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'my' | 'subscribed' | 'collaborative';

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'my', label: 'My Collections' },
  { key: 'subscribed', label: 'Subscribed' },
  { key: 'collaborative', label: 'Collaborative' },
];

const Collections = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredCollections = mockCollections.filter((collection) => {
    switch (activeFilter) {
      case 'my':
        return !collection.is_subscribed;
      case 'subscribed':
        return collection.is_subscribed;
      case 'collaborative':
        return collection.is_collaborative;
      default:
        return true;
    }
  });

  const handleCreateNew = () => {
    toast.info('Create new collection coming soon!');
  };

  const handleCollectionClick = (collection: Collection) => {
    navigate(`/collections/${collection.id}`);
  };

  const handleShare = (collection: Collection) => {
    toast.success(`Share link copied for "${collection.title}"`);
  };

  const handleEdit = (collection: Collection) => {
    toast.info(`Editing "${collection.title}" - Coming soon!`);
  };

  const handleManageCollaborators = (collection: Collection) => {
    toast.info(`Managing collaborators for "${collection.title}" - Coming soon!`);
  };

  const handleDelete = (collection: Collection) => {
    toast.error(`Delete "${collection.title}" - Coming soon!`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <CollectionsHeader onCreateNew={handleCreateNew} />

      {/* Filter tabs */}
      <div className="sticky top-[72px] z-10 bg-background/80 backdrop-blur-sm">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors',
                  activeFilter === filter.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Collections list */}
      <main className="max-w-md mx-auto px-4 py-4">
        {filteredCollections.length > 0 ? (
          <div className="space-y-4">
            {filteredCollections.map((collection, index) => (
              <div
                key={collection.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CollectionCard
                  collection={collection}
                  onClick={() => handleCollectionClick(collection)}
                  onShare={() => handleShare(collection)}
                  onEdit={() => handleEdit(collection)}
                  onManageCollaborators={() => handleManageCollaborators(collection)}
                  onDelete={() => handleDelete(collection)}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FolderPlus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-lg font-medium mb-2">No collections yet</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-[240px]">
              Create your first collection to organize your favorite places
            </p>
            <Button onClick={handleCreateNew} className="rounded-full">
              Create Collection
            </Button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Collections;
