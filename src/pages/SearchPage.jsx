import { useState } from 'react';
import { Clock, X, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const recentSearchesData = [
  { en: 'Cotton Kurta', hi: 'कॉटन कुर्ता' },
  { en: 'Wireless Earbuds', hi: 'वायरलेस इयरबड्स' },
  { en: 'Running Shoes', hi: 'रनिंग शूज़' },
  { en: 'Face Serum', hi: 'फेस सीरम' },
];

const trendingSearches = [
  { en: 'Summer Collection', hi: 'समर कलेक्शन' },
  { en: 'Smart Watch', hi: 'स्मार्ट वॉच' },
  { en: 'Yoga Mat', hi: 'योगा मैट' },
  { en: 'Books', hi: 'किताबें' },
];

export default function SearchPage() {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const filteredProducts = query.length > 0
    ? products.filter(
        (p) =>
          p.name.en.toLowerCase().includes(query.toLowerCase()) ||
          p.name.hi.includes(query) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="page-container space-y-5" id="search-page">
      {/* Search Bar */}
      <div className="animate-fade-in">
        <SearchBar autoFocus />
      </div>

      {/* Search Results or Suggestions */}
      {query.length > 0 ? (
        <section className="space-y-3 animate-fade-in">
          <p className="text-sm text-grey-medium">
            {filteredProducts.length} {language === 'hi' ? 'परिणाम' : 'results'}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <span className="text-4xl mb-3 block">🔍</span>
              <p className="text-grey-medium text-sm">
                {language === 'hi' ? 'कुछ नहीं मिला' : 'No products found'}
              </p>
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Recent Searches */}
          <section className="space-y-3 animate-slide-up">
            <div className="flex items-center justify-between">
              <h2 className="section-title mb-0 lang-transition">
                <span key={language} className="lang-fade-enter">
                  {t('recentSearches')}
                </span>
              </h2>
              <button className="text-xs text-grey-medium hover:text-charcoal transition-colors">
                {language === 'hi' ? 'साफ करें' : 'Clear'}
              </button>
            </div>

            <div className="space-y-1">
              {recentSearchesData.map((item, index) => (
                <button
                  key={index}
                  className="stagger-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                           hover:bg-surface transition-colors duration-150 text-left"
                  onClick={() => setQuery(item.en)}
                >
                  <Clock size={14} className="text-grey-medium flex-shrink-0" />
                  <span className="text-sm text-charcoal flex-1 lang-transition">
                    {item[language] || item.en}
                  </span>
                  <X size={14} className="text-grey-light hover:text-grey-medium transition-colors" />
                </button>
              ))}
            </div>
          </section>

          {/* Trending Searches */}
          <section className="space-y-3 animate-slide-up" style={{ animationDelay: '150ms' }}>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-forest-500" />
              <h2 className="section-title mb-0">
                {language === 'hi' ? 'ट्रेंडिंग सर्च' : 'Trending Searches'}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(item.en)}
                  className="stagger-item px-4 py-2 rounded-full bg-surface border border-grey-light
                           text-sm text-charcoal font-medium
                           hover:border-forest-300 hover:bg-forest-500/5
                           transition-all duration-200 active:scale-95"
                >
                  {item[language] || item.en}
                </button>
              ))}
            </div>
          </section>

          {/* All Products */}
          <section className="space-y-3 animate-slide-up" style={{ animationDelay: '250ms' }}>
            <h2 className="section-title lang-transition">
              {language === 'hi' ? 'सभी प्रोडक्ट' : 'All Products'}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
