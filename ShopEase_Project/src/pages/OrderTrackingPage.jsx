import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, MessageCircle, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import OrderStepper from '../components/OrderStepper';
import { orders } from '../data/orders';

export default function OrderTrackingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="page-container flex items-center justify-center">
        <p className="text-grey-medium">Order not found</p>
      </div>
    );
  }

  return (
    <div className="page-container space-y-5" id="order-tracking-page">
      {/* Back + Title */}
      <div className="flex items-center gap-3 animate-fade-in">
        <button onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center hover:bg-grey-light transition-colors active:scale-95"
          id="tracking-back-btn">
          <ArrowLeft size={18} className="text-charcoal" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-charcoal lang-transition">
            <span key={language} className="lang-fade-enter">{t('orderTracking')}</span>
          </h1>
          <p className="text-[10px] text-grey-medium">{order.id}</p>
        </div>
      </div>

      {/* Product Summary */}
      <div className="card p-4 flex items-center gap-3 animate-slide-up">
        <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center text-2xl">
          {order.product.image}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-charcoal truncate lang-transition">
            {order.product.name[language] || order.product.name.en}
          </h3>
          <p className="text-xs text-grey-medium">₹{order.total.toLocaleString()}</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="card p-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <OrderStepper currentStep={order.trackingStep} />
        {order.estimatedDelivery && order.status !== 'delivered' && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-grey-light/50">
            <Clock size={14} className="text-forest-500" />
            <div>
              <p className="text-[10px] text-grey-medium">{t('estimatedDelivery')}</p>
              <p className="text-sm font-semibold text-charcoal">{order.estimatedDelivery}</p>
            </div>
          </div>
        )}
        {order.status === 'delivered' && order.deliveryDate && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-grey-light/50">
            <div className="w-6 h-6 rounded-full bg-forest-500 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <div>
              <p className="text-[10px] text-grey-medium">{language === 'hi' ? 'डिलीवर किया गया' : 'Delivered on'}</p>
              <p className="text-sm font-semibold text-charcoal">{order.deliveryDate}</p>
            </div>
          </div>
        )}
      </div>

      {/* Live Map Placeholder */}
      <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '200ms' }} id="live-map-placeholder">
        <div className="relative bg-gradient-to-br from-surface to-grey-light/50 h-48 flex flex-col items-center justify-center">
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-grey-medium/30" />
              ))}
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-forest-500/15 flex items-center justify-center">
              <MapPin size={24} className="text-forest-500" />
            </div>
            <span className="text-xs font-medium text-grey-medium">{t('liveTracking')}</span>
            {order.status === 'on_the_way' && (
              <div className="absolute top-1/3 left-1/3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-forest-500" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-forest-500 animate-ping" />
                </div>
              </div>
            )}
          </div>
        </div>
        {order.deliveryPartner && order.status !== 'delivered' && (
          <div className="p-4 flex items-center justify-between border-t border-grey-light/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest-500/10 flex items-center justify-center">
                <span className="text-sm font-bold text-forest-600">{order.deliveryPartner.charAt(0)}</span>
              </div>
              <div>
                <p className="text-xs text-grey-medium">{t('deliveryPartner')}</p>
                <p className="text-sm font-semibold text-charcoal">{order.deliveryPartner}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full bg-surface flex items-center justify-center hover:bg-grey-light transition-colors">
                <MessageCircle size={16} className="text-charcoal" />
              </button>
              <button className="w-9 h-9 rounded-full bg-forest-500 flex items-center justify-center hover:bg-forest-600 transition-colors">
                <Phone size={16} className="text-white" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FAB - Contact Driver */}
      {order.deliveryPartner && order.status === 'on_the_way' && (
        <button
          className="fixed bottom-24 right-4 z-30 w-14 h-14 rounded-full bg-forest-500 text-white shadow-xl shadow-forest-500/30 flex items-center justify-center hover:bg-forest-600 transition-all duration-200 active:scale-90 animate-scale-in"
          aria-label={t('contactDriver')}
          id="contact-driver-fab">
          <Phone size={22} />
        </button>
      )}
    </div>
  );
}
