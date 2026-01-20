import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import type { CheckIn } from '@/data/mockCheckins';

interface CalendarViewProps {
  checkins: CheckIn[];
  onSelectDate: (date: Date | undefined) => void;
}

export const CalendarView = ({ checkins, onSelectDate }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  
  // Get dates that have checkins
  const datesWithCheckins = new Set(
    checkins.map(c => {
      const d = new Date(c.timestamp);
      d.setHours(0, 0, 0, 0);
      return d.toISOString();
    })
  );
  
  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  return (
    <div className="p-4 animate-fade-in">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        modifiers={{
          hasCheckin: (date) => {
            date.setHours(0, 0, 0, 0);
            return datesWithCheckins.has(date.toISOString());
          },
        }}
        modifiersStyles={{
          hasCheckin: {
            backgroundColor: 'hsl(var(--accent))',
            fontWeight: 500,
          },
        }}
        className="rounded-xl border bg-card p-3"
      />
      
      {/* Selected date info */}
      {selectedDate && (
        <div className="mt-4 p-4 bg-secondary rounded-xl">
          <p className="text-sm text-muted-foreground">
            {checkins.filter(c => {
              const d = new Date(c.timestamp);
              d.setHours(0, 0, 0, 0);
              const s = new Date(selectedDate);
              s.setHours(0, 0, 0, 0);
              return d.getTime() === s.getTime();
            }).length} check-in(s) on this day
          </p>
        </div>
      )}
    </div>
  );
};
