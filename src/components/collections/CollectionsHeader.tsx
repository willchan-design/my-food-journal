import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CollectionsHeaderProps {
  onCreateNew?: () => void;
}

export const CollectionsHeader = ({ onCreateNew }: CollectionsHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 glass">
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-medium">Collections</h1>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={onCreateNew}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};
