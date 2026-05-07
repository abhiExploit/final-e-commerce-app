import { Star, ShoppingCart, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProductCard({ product }) {
  const { language, t } = useLanguage();
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="card-interactive overflow-hidden group" id={`product-${product.id}`}>
      {/* Image / Emoji Placeholder */}
      <div className="relative bg-surface p-6 flex items-center justify-center">
        <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
          {product.image}
        </span>

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-forest-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3.5 space-y-2">
        {/* Name */}
        <h3 className="text-sm font-semibold text-charcoal line-clamp-1 lang-transition">
          <span key={language} className="lang-fade-enter">
            {product.name[language] || product.name.en}
          </span>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5 bg-forest-500/10 px-1.5 py-0.5 rounded-md">
            <Star size={10} className="text-forest-500 fill-forest-500" />
            <span className="text-[10px] font-bold text-forest-700">{product.rating}</span>
          </div>
          <span className="text-[10px] text-grey-medium">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-charcoal">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-xs text-grey-medium line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span className="text-[10px] font-semibold text-forest-500">
                {discount}% off
              </span>
            </>
          )}
        </div>

        {/* Free Delivery Badge */}
        {product.freeDelivery && (
          <div className="flex items-center gap-1">
            <Truck size={11} className="text-forest-500" />
            <span className="text-[10px] font-medium text-forest-600">
              {t('freeDelivery')}
            </span>
          </div>
        )}

        {/* Add to Cart */}
        <button
          className="w-full btn-primary text-xs py-2.5 flex items-center justify-center gap-1.5 mt-1"
          id={`add-cart-${product.id}`}
        >
          <ShoppingCart size={14} />
          {t('addToCart')}
        </button>
      </div>
    </div>
  );
}
