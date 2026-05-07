import { Search, Mic } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function SearchBar({ onFocus, autoFocus = false }) {
  const { t } = useLanguage();

  return (
    <div className="relative group" id="search-bar">
      <div
        className="flex items-center gap-3 bg-surface border border-grey-light rounded-full
                    px-4 py-3 transition-all duration-200
                    focus-within:border-forest-500 focus-within:ring-2 focus-within:ring-forest-100
                    focus-within:bg-white"
      >
        <Search
          size={18}
          className="text-grey-medium flex-shrink-0 transition-colors duration-200
                     group-focus-within:text-forest-500"
        />
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          className="flex-1 bg-transparent text-sm text-charcoal placeholder-grey-medium
                     outline-none lang-transition"
          onFocus={onFocus}
          autoFocus={autoFocus}
          id="search-input"
        />
        <button
          className="flex-shrink-0 w-8 h-8 rounded-full bg-forest-500/10
                     flex items-center justify-center
                     transition-all duration-200 hover:bg-forest-500/20
                     active:scale-90"
          aria-label={t('voiceSearch')}
          id="voice-search-btn"
        >
          <Mic size={16} className="text-forest-500" />
        </button>
      </div>
    </div>
  );
}
