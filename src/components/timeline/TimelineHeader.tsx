import { Calendar, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimelineHeaderProps {
  viewMode: 'list' | 'calendar';
  onToggleView: () => void;
}

export const TimelineHeader = ({ viewMode, onToggleView }: TimelineHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 glass">
      <div className="px-5 py-4 flex items-center justify-between">
        {/* Title */}
        <h1 className="font-serif text-2xl font-semibold text-foreground">
          Timeline
        </h1>
        
        {/* View Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleView}
          className="w-9 h-9 rounded-lg hover:bg-secondary"
        >
          {viewMode === 'list' ? (
            <Calendar className="w-5 h-5 text-muted-foreground" />
          ) : (
            <List className="w-5 h-5 text-muted-foreground" />
          )}
        </Button>
      </div>
    </header>
  );
};
