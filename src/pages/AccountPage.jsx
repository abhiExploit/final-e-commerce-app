import { User, MapPin, CreditCard, Bell, Globe, HelpCircle, Info, LogOut, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AccountPage() {
  const { language, toggleLanguage, t } = useLanguage();

  const menuItems = [
    { icon: MapPin, label: 'savedAddresses', color: 'text-blue-500' },
    { icon: CreditCard, label: 'paymentMethods', color: 'text-purple-500' },
    { icon: Bell, label: 'notifications', color: 'text-amber-500' },
    { icon: Globe, label: 'language', color: 'text-forest-500', action: toggleLanguage, extra: language === 'en' ? 'English' : 'हिंदी' },
    { icon: HelpCircle, label: 'helpSupport', color: 'text-teal-500' },
    { icon: Info, label: 'aboutUs', color: 'text-grey-medium' },
  ];

  return (
    <div className="page-container space-y-5" id="account-page">
      {/* Title */}
      <h1 className="text-xl font-bold text-charcoal lang-transition animate-fade-in">
        <span key={language} className="lang-fade-enter">{t('myAccount')}</span>
      </h1>

      {/* Profile Card */}
      <div className="card p-5 flex items-center gap-4 animate-slide-up">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-forest-400 to-forest-600 flex items-center justify-center shadow-lg shadow-forest-500/20">
          <User size={24} className="text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-base font-bold text-charcoal">Abhilash S.A</h2>
          <p className="text-xs text-grey-medium">abhilash6480@gmail.com</p>
          <p className="text-[10px] text-grey-medium mt-0.5">{t('memberSince')} Jan 2004</p>
        </div>
        <ChevronRight size={18} className="text-grey-light" />
      </div>

      {/* Menu Items */}
      <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '100ms' }}>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={item.action}
              className={`w-full flex items-center gap-3.5 px-5 py-4 hover:bg-surface transition-colors text-left ${
                index < menuItems.length - 1 ? 'border-b border-grey-light/50' : ''
              }`}
              id={`menu-${item.label}`}>
              <div className={`w-9 h-9 rounded-xl bg-surface flex items-center justify-center`}>
                <Icon size={18} className={item.color} />
              </div>
              <span className="flex-1 text-sm font-medium text-charcoal lang-transition">
                {t(item.label)}
              </span>
              {item.extra && (
                <span className="text-xs text-grey-medium mr-1">{item.extra}</span>
              )}
              <ChevronRight size={16} className="text-grey-light" />
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <button className="w-full card p-4 flex items-center justify-center gap-2 text-red-500 font-semibold text-sm hover:bg-red-50 transition-colors animate-slide-up"
        style={{ animationDelay: '200ms' }} id="logout-btn">
        <LogOut size={16} />
        {t('logout')}
      </button>
    </div>
  );
}
