import { Calendar, List } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/LanguageToggle';

interface TimelineHeaderProps {
  viewMode: 'list' | 'calendar';
  onToggleView: () => void;
}

export const TimelineHeader = ({ viewMode, onToggleView }: TimelineHeaderProps) => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-10 glass">
      <div className="px-5 py-4 flex items-center justify-between">
        {/* Title */}
        <h1 className="font-serif text-2xl font-semibold text-foreground">
          {t('timeline.title')}
        </h1>
        
        <div className="flex items-center gap-1">
          <LanguageToggle />
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
      </div>
    </header>
  );
};
