import { Map, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CollectionsHeaderProps {
  activeTab: 'created' | 'saved';
  onTabChange: (tab: 'created' | 'saved') => void;
  onNewClick: () => void;
}

const CollectionsHeader = ({ activeTab, onTabChange, onNewClick }: CollectionsHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/30">
      <div className="px-5 pt-6 pb-4">
        {/* Title Row */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-heading text-2xl font-bold text-foreground">
            My Collections
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-xl hover:bg-muted"
          >
            <Map className="w-5 h-5 text-foreground" />
          </Button>
        </div>

        {/* Tabs & New Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => onTabChange('created')}
              className={`relative pb-1 text-sm font-medium transition-colors
                ${activeTab === 'created' 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground/70'
                }`}
            >
              Created
              {activeTab === 'created' && (
                <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
            <button
              onClick={() => onTabChange('saved')}
              className={`relative pb-1 text-sm font-medium transition-colors
                ${activeTab === 'saved' 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground/70'
                }`}
            >
              Saved
              {activeTab === 'saved' && (
                <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onNewClick}
            className="text-primary hover:text-primary hover:bg-primary/5 gap-1 font-medium"
          >
            <Plus className="w-4 h-4" />
            New
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollectionsHeader;
