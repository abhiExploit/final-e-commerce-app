import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 glass border-b border-grey-light/50">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo & Greeting */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-forest-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-grey-medium lang-transition">
              <span key={language} className="lang-fade-enter">
                {t('greeting')} 👋
              </span>
            </span>
            <span className="text-sm font-bold text-charcoal -mt-0.5">{t('appName')}</span>
          </div>
        </div>

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                     bg-surface border border-grey-light
                     transition-all duration-200 hover:bg-grey-light/70
                     active:scale-95"
          aria-label="Toggle language"
          id="language-toggle"
        >
          <Globe size={16} className="text-forest-500" />
          <span className="text-xs font-semibold text-charcoal lang-transition">
            <span key={language} className="lang-fade-enter">
              {t('switchLang')}
            </span>
          </span>
          <ChevronDown size={12} className="text-grey-medium" />
        </button>
      </div>
    </header>
  );
}
