import { useState } from 'react';
import { toast } from 'sonner';
import { mockCollections, groupCollectionsByCity, Collection } from '@/data/mockCollections';
import CollectionsHeader from '@/components/collections/CollectionsHeader';
import CitySection from '@/components/collections/CitySection';
import BottomNav from '@/components/timeline/BottomNav';

const Collections = () => {
  const [activeTab, setActiveTab] = useState<'created' | 'saved'>('created');

  const groupedCollections = groupCollectionsByCity(mockCollections);

  const handleCollectionClick = (collection: Collection) => {
    toast.success(`Opening "${collection.title}"`, {
      description: `${collection.placeCount} places`,
    });
  };

  const handleNewClick = () => {
    toast.info('Create new collection');
  };

  const handleAddClick = () => {
    toast.info('Quick add');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <CollectionsHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onNewClick={handleNewClick}
      />

      <div className="px-5 pt-4">
        {activeTab === 'created' ? (
          Object.entries(groupedCollections).map(([city, collections]) => (
            <CitySection
              key={city}
              city={city}
              collections={collections}
              onCollectionClick={handleCollectionClick}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2">
              No saved collections yet
            </h3>
            <p className="text-muted-foreground text-sm max-w-[240px]">
              Collections you save from other users will appear here
            </p>
          </div>
        )}
      </div>

      <BottomNav activeTab="library" onAddClick={handleAddClick} />
    </div>
  );
};

export default Collections;
