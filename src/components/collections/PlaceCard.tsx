import { MapPin, MessageSquare } from 'lucide-react';
import { Place } from '@/data/mockPlaces';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface PlaceCardProps {
  place: Place;
  onClick?: () => void;
  isSelected?: boolean;
}

const ratingStyles = {
  loved: 'bg-rating-loved/10 text-rating-loved border-rating-loved/20',
  ok: 'bg-rating-ok/10 text-rating-ok border-rating-ok/20',
  not_for_me: 'bg-rating-bad/10 text-rating-bad border-rating-bad/20',
};

const ratingLabels = {
  loved: 'Loved it',
  ok: 'It was ok',
  not_for_me: 'Not for me',
};

export const PlaceCard = ({ place, onClick, isSelected }: PlaceCardProps) => {
  return (
    <Card
      className={cn(
        'p-3 cursor-pointer transition-all duration-200',
        'hover:shadow-soft',
        isSelected && 'ring-2 ring-primary shadow-soft'
      )}
      onClick={onClick}
    >
      <div className="flex gap-3">
        {/* Photo */}
        {place.photo && (
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={place.photo}
              alt={place.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-serif font-medium text-sm leading-tight line-clamp-1">
              {place.name}
            </h4>
            <span
              className={cn(
                'text-xs px-2 py-0.5 rounded-full border flex-shrink-0',
                ratingStyles[place.rating]
              )}
            >
              {ratingLabels[place.rating]}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{place.address}</span>
          </div>

          {place.notes && (
            <div className="flex items-start gap-1 text-xs text-muted-foreground mb-2">
              <MessageSquare className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{place.notes}</span>
            </div>
          )}

          {/* Added by */}
          <div className="flex items-center gap-1.5">
            <Avatar className="w-4 h-4">
              <AvatarImage src={place.addedBy.avatar} alt={place.addedBy.name} />
              <AvatarFallback className="text-[8px]">
                {place.addedBy.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {place.addedBy.name}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
