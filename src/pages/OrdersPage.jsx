import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { orders } from '../data/orders';

const statusColors = {
  delivered: 'bg-forest-500/10 text-forest-600',
  on_the_way: 'bg-blue-50 text-blue-600',
  packed: 'bg-amber-50 text-amber-600',
  ordered: 'bg-grey-light text-grey-medium',
  returned: 'bg-red-50 text-red-600',
};

const statusLabels = {
  delivered: { en: 'Delivered', hi: 'डिलीवर हो गया' },
  on_the_way: { en: 'On the Way', hi: 'रास्ते में' },
  packed: { en: 'Packed', hi: 'पैक किया' },
  ordered: { en: 'Ordered', hi: 'ऑर्डर किया' },
  returned: { en: 'Returned', hi: 'वापस किया' },
};

export default function OrdersPage() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="page-container space-y-5" id="orders-page">
      {/* Title */}
      <h1 className="text-xl font-bold text-charcoal lang-transition animate-fade-in">
        <span key={language} className="lang-fade-enter">
          {t('myOrders')}
        </span>
      </h1>

      {/* Order Cards */}
      <div className="space-y-3">
        {orders.map((order, index) => (
          <div
            key={order.id}
            className="card p-4 space-y-3 stagger-item"
          >
            {/* Order Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <p className="text-[10px] text-grey-medium font-medium">
                  {t('orderId')}: {order.id}
                </p>
                <p className="text-[10px] text-grey-medium">
                  {t('orderDate')}: {order.date}
                </p>
              </div>
              <span
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                  statusColors[order.status]
                }`}
              >
                {statusLabels[order.status]?.[language] || order.status}
              </span>
            </div>

            {/* Product Info */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center text-2xl flex-shrink-0">
                {order.product.image}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-charcoal truncate lang-transition">
                  {order.product.name[language] || order.product.name.en}
                </h3>
                <p className="text-xs text-grey-medium">
                  {language === 'hi' ? 'मात्रा' : 'Qty'}: {order.product.quantity} · {t('orderTotal')}: ₹{order.total.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-1">
              {/* Track Order */}
              {order.status !== 'returned' && (
                <button
                  onClick={() => navigate(`/orders/${order.id}/tracking`)}
                  className="flex-1 flex items-center justify-center gap-1.5
                           btn-primary text-xs py-2.5"
                  id={`track-${order.id}`}
                >
                  <MapPin size={14} />
                  {t('trackOrder')}
                </button>
              )}

              {/* Return / Exchange */}
              {(order.status === 'delivered' || order.status === 'returned') && (
                <button
                  onClick={() => navigate(`/orders/${order.id}/return`)}
                  className="flex-1 flex items-center justify-center gap-1.5
                           btn-secondary text-xs py-2.5"
                  id={`return-${order.id}`}
                >
                  <RotateCcw size={14} />
                  {order.status === 'returned'
                    ? t('refundStatus')
                    : t('returnExchange')}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
