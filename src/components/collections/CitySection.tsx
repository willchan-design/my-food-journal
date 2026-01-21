import { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { Collection } from '@/data/mockCollections';
import CollectionCard from './CollectionCard';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface CitySectionProps {
  city: string;
  collections: Collection[];
  onCollectionClick: (collection: Collection) => void;
}

const CitySection = ({ city, collections, onCollectionClick }: CitySectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-6">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 group">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-heading font-semibold text-foreground">
            {city}
          </span>
          <span className="text-muted-foreground text-sm">
            ({collections.length})
          </span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-muted-foreground transition-transform duration-200
            ${isOpen ? 'rotate-0' : '-rotate-90'}`}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-3 mt-2">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            onClick={() => onCollectionClick(collection)}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CitySection;
