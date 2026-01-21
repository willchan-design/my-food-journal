import { Clock, Search, User, BookOpen, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

type TabType = 'timeline' | 'explore' | 'library' | 'profile';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface BottomNavProps {
  activeTab?: TabType;
  onAddClick?: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      'flex flex-col items-center gap-0.5 py-2 px-3 transition-colors min-w-[56px]',
      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
    )}
  >
    {icon}
    <span className="text-xs">{label}</span>
  </button>
);

export const BottomNav = ({ activeTab = 'timeline', onAddClick }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 glass border-t border-border/50">
      <div className="max-w-md mx-auto px-2 flex items-center justify-around">
        <NavItem
          icon={<Clock className="w-5 h-5" />}
          label="Timeline"
          isActive={activeTab === 'timeline'}
        />
        <NavItem
          icon={<Compass className="w-5 h-5" />}
          label="Explore"
          isActive={activeTab === 'explore'}
        />
        
        {/* Center Add Button */}
        <button 
          onClick={onAddClick}
          className="relative -mt-6 flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-soft-lg transition-transform hover:scale-105 active:scale-95"
        >
          <User className="w-6 h-6" />
          <span className="absolute -bottom-5 text-xs text-primary font-medium">Stamp</span>
        </button>
        
        <NavItem
          icon={<BookOpen className="w-5 h-5" />}
          label="Library"
          isActive={activeTab === 'library'}
        />
        <NavItem
          icon={<User className="w-5 h-5" />}
          label="Profile"
          isActive={activeTab === 'profile'}
        />
      </div>
      {/* Safe area padding for notched devices */}
      <div className="h-6" />
    </nav>
  );
};

export default BottomNav;
