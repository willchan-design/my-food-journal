import { Clock, Search, User, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      'flex flex-col items-center gap-0.5 py-2 px-4 transition-colors',
      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
    )}
  >
    {icon}
    <span className="text-xs">{label}</span>
  </button>
);

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 glass border-t border-border/50">
      <div className="max-w-md mx-auto px-4 flex items-center justify-around">
        <NavItem
          icon={<Clock className="w-5 h-5" />}
          label="Timeline"
          isActive
        />
        <NavItem
          icon={<Search className="w-5 h-5" />}
          label="Explore"
        />
        
        {/* Center Add Button */}
        <button className="relative -mt-6 flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-soft-lg transition-transform hover:scale-105 active:scale-95">
          <Plus className="w-6 h-6" />
        </button>
        
        <NavItem
          icon={<User className="w-5 h-5" />}
          label="Profile"
        />
        <NavItem
          icon={<div className="w-5 h-5 rounded bg-muted" />}
          label="More"
        />
      </div>
      {/* Safe area padding for notched devices */}
      <div className="h-safe-area-inset-bottom" />
    </nav>
  );
};
