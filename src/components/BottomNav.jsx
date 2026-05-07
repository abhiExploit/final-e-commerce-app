import { NavLink } from 'react-router-dom';
import { Home, Search, Package, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const navItems = [
  { to: '/', icon: Home, labelKey: 'home' },
  { to: '/search', icon: Search, labelKey: 'search' },
  { to: '/orders', icon: Package, labelKey: 'orders' },
  { to: '/account', icon: User, labelKey: 'account' },
];

export default function BottomNav() {
  const { t } = useLanguage();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-grey-light/50"
      style={{ height: 'var(--bottom-nav-height)' }}
      id="bottom-navigation"
    >
      <div className="max-w-md mx-auto h-full flex items-center justify-around px-2">
        {navItems.map(({ to, icon: Icon, labelKey }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-2xl
               transition-all duration-200 min-w-[60px]
               ${
                 isActive
                   ? 'text-forest-500'
                   : 'text-grey-medium hover:text-charcoal'
               }`
            }
            id={`nav-${labelKey}`}
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className="transition-all duration-200"
                  />
                  {isActive && (
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-forest-500 animate-scale-in" />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium transition-all duration-200 lang-transition ${
                    isActive ? 'font-semibold' : ''
                  }`}
                >
                  {t(labelKey)}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Safe area spacer for iPhone */}
      <div className="h-safe-area-inset-bottom" />
    </nav>
  );
}
