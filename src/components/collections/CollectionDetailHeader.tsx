import { ArrowLeft, Share2, MoreHorizontal, Pencil, UserPlus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CollaboratorAvatars } from './CollaboratorAvatars';
import { CollectionWithPlaces } from '@/data/mockPlaces';

interface CollectionDetailHeaderProps {
  collection: CollectionWithPlaces;
  onShare?: () => void;
  onEdit?: () => void;
  onManageCollaborators?: () => void;
  onDelete?: () => void;
}

export const CollectionDetailHeader = ({
  collection,
  onShare,
  onEdit,
  onManageCollaborators,
  onDelete,
}: CollectionDetailHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-md mx-auto px-4 py-3">
        {/* Top row: back, title, actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 -ml-2"
            onClick={() => navigate('/collections')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex-1 min-w-0">
            <h1 className="font-serif text-lg font-semibold leading-tight line-clamp-1">
              {collection.title}
            </h1>
            <p className="text-xs text-muted-foreground">
              {collection.places.length} places · {collection.city}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={onShare}
          >
            <Share2 className="w-5 h-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 -mr-2">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={onEdit}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              {collection.is_collaborative && (
                <DropdownMenuItem onClick={onManageCollaborators}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Manage Collaborators
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={onDelete}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Collaborators row */}
        {collection.is_collaborative && collection.collaborators.length > 0 && (
          <div className="mt-2 pt-2 border-t border-border/30">
            <CollaboratorAvatars collaborators={collection.collaborators} />
          </div>
        )}
      </div>
    </header>
  );
};
