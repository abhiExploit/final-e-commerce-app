import { ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SearchBar from '../components/SearchBar';
import CategoryTile from '../components/CategoryTile';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const trendingProducts = products.slice(0, 4);
  const dealProducts = products.filter((p) => p.badge?.includes('Off')).slice(0, 4);
  const newProducts = products.filter((p) => p.badge === 'New' || p.badge === 'Bestseller');

  return (
    <div className="page-container space-y-6" id="home-page">
      {/* Search Bar */}
      <div className="animate-fade-in">
        <SearchBar onFocus={() => navigate('/search')} />
      </div>

      {/* Hero Banner */}
      <div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-500 via-forest-600 to-forest-800
                    p-6 text-white animate-slide-up cursor-pointer"
        id="hero-banner"
      >
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-yellow-300" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
              {language === 'hi' ? 'विशेष ऑफर' : 'Special Offer'}
            </span>
          </div>

          <h2 className="text-2xl font-bold leading-tight lang-transition">
            <span key={language} className="lang-fade-enter">
              {t('heroBanner')}
            </span>
          </h2>

          <p className="text-sm text-white/80 lang-transition">
            <span key={`sub-${language}`} className="lang-fade-enter">
              {t('heroSubtitle')}
            </span>
          </p>

          <button className="flex items-center gap-2 bg-white text-forest-600 font-semibold text-sm px-5 py-2.5 rounded-full
                           hover:bg-white/90 transition-all duration-200 active:scale-95">
            {t('shopNow')}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Categories */}
      <section className="space-y-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-between">
          <h2 className="section-title mb-0 lang-transition">
            <span key={`cat-${language}`} className="lang-fade-enter">
              {t('categories')}
            </span>
          </h2>
          <button className="text-xs font-semibold text-forest-500 flex items-center gap-0.5 hover:text-forest-600 transition-colors">
            {t('viewAll')} <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {categories.map((cat) => (
            <CategoryTile key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="space-y-3 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-forest-500" />
            <h2 className="section-title mb-0 lang-transition">
              <span key={`trend-${language}`} className="lang-fade-enter">
                {t('trending')}
              </span>
            </h2>
          </div>
          <button className="text-xs font-semibold text-forest-500 flex items-center gap-0.5 hover:text-forest-600 transition-colors">
            {t('viewAll')} <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Deals of the Day */}
      {dealProducts.length > 0 && (
        <section className="space-y-3 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-amber-500" />
              <h2 className="section-title mb-0 lang-transition">
                <span key={`deal-${language}`} className="lang-fade-enter">
                  {t('deals')}
                </span>
              </h2>
            </div>
            <button className="text-xs font-semibold text-forest-500 flex items-center gap-0.5 hover:text-forest-600 transition-colors">
              {t('viewAll')} <ArrowRight size={12} />
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto scroll-snap-x pb-2 -mx-4 px-4">
            {dealProducts.map((product) => (
              <div key={product.id} className="min-w-[180px] flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <section className="space-y-3 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between">
            <h2 className="section-title mb-0 lang-transition">
              <span key={`new-${language}`} className="lang-fade-enter">
                {t('newArrivals')}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
