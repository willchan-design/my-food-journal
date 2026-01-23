import { Clock, FolderHeart, User, Plus, MoreHorizontal } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 glass border-t border-border/50">
      <div className="max-w-md mx-auto px-4 flex items-center justify-around">
        <NavItem
          icon={<Clock className="w-5 h-5" />}
          label={t('nav.timeline')}
          isActive={isActive('/')}
          onClick={() => navigate('/')}
        />
        <NavItem
          icon={<FolderHeart className="w-5 h-5" />}
          label={t('nav.collections')}
          isActive={isActive('/collections')}
          onClick={() => navigate('/collections')}
        />
        
        {/* Center Add Button */}
        <button className="relative -mt-6 flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-soft-lg transition-transform hover:scale-105 active:scale-95">
          <Plus className="w-6 h-6" />
        </button>
        
        <NavItem
          icon={<User className="w-5 h-5" />}
          label={t('nav.profile')}
          onClick={() => {}}
        />
        <NavItem
          icon={<MoreHorizontal className="w-5 h-5" />}
          label={t('nav.explore')}
          onClick={() => {}}
        />
      </div>
      {/* Safe area padding for notched devices */}
      <div className="h-safe-area-inset-bottom" />
    </nav>
  );
};
