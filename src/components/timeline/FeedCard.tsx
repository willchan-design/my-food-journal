import { MapPin, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RatingBadge } from './RatingBadge';
import type { CheckIn, Rating } from '@/data/mockCheckins';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FeedCardProps {
  checkin: CheckIn;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
}

const ratingBorderColors: Record<Rating, string> = {
  loved: 'border-l-rating-loved',
  ok: 'border-l-rating-ok',
  not: 'border-l-rating-not',
};

export const FeedCard = ({ checkin, onEdit, onDelete, onClick }: FeedCardProps) => {
  const time = checkin.timestamp.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div
      className={cn(
        'group relative bg-card rounded-xl border-l-4 shadow-soft transition-all duration-200',
        'hover:shadow-soft-lg hover:-translate-y-0.5 cursor-pointer',
        'animate-fade-in',
        ratingBorderColors[checkin.rating]
      )}
      onClick={() => onClick?.(checkin.id)}
    >
      {/* Content */}
      <div className="p-4">
        {/* Header: Title + Menu */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-lg font-medium text-foreground leading-tight truncate">
              {checkin.restaurantName}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-sm truncate">{checkin.location}</span>
            </div>
          </div>
          
          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem onClick={() => onEdit?.(checkin.id)}>
                編集
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(checkin.id)}
                className="text-destructive focus:text-destructive"
              >
                削除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Dishes */}
        {checkin.dishes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {checkin.dishes.map((dish, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full"
              >
                {dish}
              </span>
            ))}
          </div>
        )}

        {/* Note */}
        {checkin.note && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {checkin.note}
          </p>
        )}

        {/* Photos */}
        {checkin.photos && checkin.photos.length > 0 && (
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1 -mx-1 px-1">
            {checkin.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
            ))}
          </div>
        )}

        {/* Footer: Rating + Time */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <RatingBadge rating={checkin.rating} />
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
      </div>
    </div>
  );
};
