import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/LanguageToggle';

interface CollectionsHeaderProps {
  onCreateNew?: () => void;
}

export const CollectionsHeader = ({ onCreateNew }: CollectionsHeaderProps) => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-10 glass">
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-medium">{t('collections.title')}</h1>
        <div className="flex items-center gap-1">
          <LanguageToggle />
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={onCreateNew}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
