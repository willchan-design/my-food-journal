import { useState } from 'react';
import { TimelineHeader } from '@/components/timeline/TimelineHeader';
import { DateSection } from '@/components/timeline/DateSection';
import { FeedCard } from '@/components/timeline/FeedCard';
import { BottomNav } from '@/components/timeline/BottomNav';
import { CalendarView } from '@/components/timeline/CalendarView';
import { mockCheckins, groupCheckinsByDate } from '@/data/mockCheckins';
import { toast } from 'sonner';

const Timeline = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const groupedCheckins = groupCheckinsByDate(mockCheckins);
  
  // Get ordered date keys (Today, Yesterday, then by date descending)
  const dateOrder = Object.keys(groupedCheckins).sort((a, b) => {
    if (a === 'Today') return -1;
    if (b === 'Today') return 1;
    if (a === 'Yesterday') return -1;
    if (b === 'Yesterday') return 1;
    return new Date(b).getTime() - new Date(a).getTime();
  });

  const handleToggleView = () => {
    setViewMode(prev => prev === 'list' ? 'calendar' : 'list');
  };

  const handleCardClick = (id: string) => {
    toast.info('地点详情页即将推出');
  };

  const handleEdit = (id: string) => {
    toast.info(`编辑记录 ${id}`);
  };

  const handleDelete = (id: string) => {
    toast.error(`删除记录 ${id}`);
  };

  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      toast.info(`已选择 ${date.toLocaleDateString()}`);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <TimelineHeader viewMode={viewMode} onToggleView={handleToggleView} />
      
      {/* Content */}
      <main className="max-w-md mx-auto">
        {viewMode === 'list' ? (
          <div className="px-4">
            {dateOrder.map(date => (
              <div key={date}>
                <DateSection date={date} />
                <div className="space-y-3 ml-2.5 pl-4 border-l border-timeline-line">
                  {groupedCheckins[date].map(checkin => (
                    <FeedCard
                      key={checkin.id}
                      checkin={checkin}
                      onClick={handleCardClick}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <CalendarView
            checkins={mockCheckins}
            onSelectDate={handleSelectDate}
          />
        )}
      </main>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Timeline;
