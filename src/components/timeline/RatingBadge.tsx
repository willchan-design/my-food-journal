import { Heart, Minus, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Rating } from '@/data/mockCheckins';

interface RatingBadgeProps {
  rating: Rating;
  className?: string;
}

const ratingConfig = {
  loved: {
    label: 'Loved it',
    icon: Heart,
    className: 'bg-rating-loved-bg text-rating-loved',
  },
  ok: {
    label: 'It was ok',
    icon: Minus,
    className: 'bg-rating-ok-bg text-rating-ok',
  },
  not: {
    label: 'Not for me',
    icon: ThumbsDown,
    className: 'bg-rating-not-bg text-rating-not',
  },
};

export const RatingBadge = ({ rating, className }: RatingBadgeProps) => {
  const config = ratingConfig[rating];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
        config.className,
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
};
