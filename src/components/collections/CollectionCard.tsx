import { MoreHorizontal, MapPin, Users, Bookmark, Lock, Globe, Share2, Pencil, UserPlus, Trash2 } from 'lucide-react';
import { Collection } from '@/data/mockCollections';
import { CollaboratorAvatars } from './CollaboratorAvatars';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface CollectionCardProps {
  collection: Collection;
  onClick?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
  onManageCollaborators?: () => void;
  onDelete?: () => void;
}

const backgroundColors = {
  collaborative: 'bg-blue-50/50 dark:bg-blue-950/20',
  public: 'bg-card',
  private: 'bg-muted/30',
};

const formatDate = (date: Date) => {
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const CollectionCard = ({
  collection,
  onClick,
  onShare,
  onEdit,
  onManageCollaborators,
  onDelete,
}: CollectionCardProps) => {
  const bgColor = collection.is_collaborative 
    ? backgroundColors.collaborative 
    : collection.visibility === 'private' 
      ? backgroundColors.private 
      : backgroundColors.public;

  return (
    <Card
      className={cn(
        'relative p-4 cursor-pointer transition-all duration-200',
        'hover:shadow-soft hover:-translate-y-0.5',
        'group',
        bgColor
      )}
      onClick={onClick}
    >
      {/* Header with title and menu */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-serif text-base font-medium leading-tight line-clamp-2 flex-1">
          {collection.title}
        </h3>
        <DropdownMenu>
          <DropdownMenuTrigger 
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 -mr-1 hover:bg-muted rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onShare?.(); }}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit?.(); }}>
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            {collection.is_collaborative && (
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onManageCollaborators?.(); }}>
                <UserPlus className="w-4 h-4 mr-2" />
                Manage Collaborators
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive"
              onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Description */}
      {collection.description && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {collection.description}
        </p>
      )}

      {/* Location and places count */}
      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          {collection.city}
        </span>
        <span>·</span>
        <span>{collection.places} places</span>
      </div>

      {/* Collaborators */}
      {collection.is_collaborative && collection.collaborators.length > 0 && (
        <div className="mb-3">
          <CollaboratorAvatars collaborators={collection.collaborators} />
        </div>
      )}

      {/* Footer with tags and saves */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {collection.is_collaborative && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-accent text-accent-foreground rounded-full">
              <Users className="w-3 h-3" />
              Collaborative
            </span>
          )}
          {collection.visibility === 'private' ? (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
              <Lock className="w-3 h-3" />
              Private
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full">
              <Globe className="w-3 h-3" />
              Public
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="flex items-center gap-1">
            <Bookmark className="w-3 h-3" />
            {collection.saves}
          </span>
          <span>{formatDate(collection.updated_at)}</span>
        </div>
      </div>
    </Card>
  );
};
