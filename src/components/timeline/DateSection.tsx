import { cn } from '@/lib/utils';

interface DateSectionProps {
  date: string;
  isSpecial?: boolean;
}

export const DateSection = ({ date, isSpecial }: DateSectionProps) => {
  const isToday = date === 'Today';
  const isYesterday = date === 'Yesterday';
  
  return (
    <div className="flex items-center gap-3 py-4">
      {/* Decorative dot */}
      <div
        className={cn(
          'w-2 h-2 rounded-full',
          isToday || isYesterday ? 'bg-date-accent' : 'bg-timeline-line'
        )}
      />
      
      {/* Date label */}
      <span
        className={cn(
          'text-sm font-medium',
          isToday || isYesterday
            ? 'text-date-accent'
            : 'text-muted-foreground'
        )}
      >
        {date}
      </span>
      
      {/* Line */}
      <div className="flex-1 h-px bg-timeline-line" />
    </div>
  );
};
