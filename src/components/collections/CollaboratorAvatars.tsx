import { Collaborator } from '@/data/mockCollections';

interface CollaboratorAvatarsProps {
  collaborators: Collaborator[];
  maxDisplay?: number;
}

export const CollaboratorAvatars = ({ 
  collaborators, 
  maxDisplay = 4 
}: CollaboratorAvatarsProps) => {
  if (collaborators.length === 0) return null;

  const displayedCollaborators = collaborators.slice(0, maxDisplay);
  const remainingCount = collaborators.length - maxDisplay;

  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {displayedCollaborators.map((collaborator) => (
          <img
            key={collaborator.id}
            src={collaborator.avatar}
            alt={collaborator.name}
            className="w-7 h-7 rounded-full border-2 border-background object-cover"
            title={collaborator.name}
          />
        ))}
      </div>
      {remainingCount > 0 && (
        <span className="ml-2 text-xs text-muted-foreground">
          +{remainingCount}
        </span>
      )}
    </div>
  );
};
