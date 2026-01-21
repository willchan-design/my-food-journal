import { Lock, Globe, Users } from 'lucide-react';
import { Collection } from '@/data/mockCollections';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

interface CollectionCardProps {
  collection: Collection;
  onClick?: () => void;
}

const CollectionCard = ({ collection, onClick }: CollectionCardProps) => {
  const {
    title,
    description,
    isPublic,
    hasCollaborators,
    placeCount,
    saveCount,
    updatedAt,
    collaborators,
  } = collection;

  const displayedCollaborators = collaborators.slice(0, 3);
  const extraCount = collaborators.length - 3;

  return (
    <div
      onClick={onClick}
      className="group relative bg-card rounded-2xl p-4 shadow-soft border border-border/50 
                 hover:shadow-soft-lg hover:border-primary/20 transition-all duration-300 cursor-pointer
                 active:scale-[0.98]"
    >
      {/* Left accent border for collections with collaborators */}
      {hasCollaborators && (
        <div className="absolute left-0 top-4 bottom-4 w-1 bg-primary/60 rounded-full" />
      )}

      <div className={hasCollaborators ? 'pl-3' : ''}>
        {/* Title Row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-heading font-semibold text-foreground text-base leading-tight line-clamp-1 flex-1">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {hasCollaborators && (
              <Users className="w-4 h-4 text-primary/70" />
            )}
            {isPublic ? (
              <Globe className="w-4 h-4 text-muted-foreground/70" />
            ) : (
              <Lock className="w-4 h-4 text-muted-foreground/70" />
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3">
            {description}
          </p>
        )}

        {/* Stats Row & Collaborators */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
            <span>{placeCount} places</span>
            {saveCount > 0 && (
              <>
                <span className="text-border">·</span>
                <span>{saveCount} saves</span>
              </>
            )}
            <span className="text-border">·</span>
            <span>{formatDistanceToNow(updatedAt, { addSuffix: true })}</span>
          </div>

          {/* Collaborator Avatars */}
          {collaborators.length > 0 && (
            <div className="flex items-center -space-x-2">
              {displayedCollaborators.map((collaborator) => (
                <Avatar
                  key={collaborator.id}
                  className="w-6 h-6 border-2 border-card ring-0"
                >
                  <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                  <AvatarFallback className="text-[10px] bg-muted">
                    {collaborator.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {extraCount > 0 && (
                <div className="w-6 h-6 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                  <span className="text-[10px] font-medium text-muted-foreground">
                    +{extraCount}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
