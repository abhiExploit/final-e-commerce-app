import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ReturnReasonPicker from '../components/ReturnReasonPicker';
import RefundPathVisualizer from '../components/RefundPathVisualizer';
import { orders } from '../data/orders';

export default function ReturnPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [selectedReason, setSelectedReason] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const order = orders.find((o) => o.id === id);
  if (!order) {
    return (
      <div className="page-container flex items-center justify-center">
        <p className="text-grey-medium">Order not found</p>
      </div>
    );
  }

  const hasRefund = order.refund !== null;

  const handleSubmit = () => {
    if (selectedReason) setIsSubmitted(true);
  };

  return (
    <div className="page-container space-y-5" id="return-page">
      {/* Back + Title */}
      <div className="flex items-center gap-3 animate-fade-in">
        <button onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center hover:bg-grey-light transition-colors active:scale-95">
          <ArrowLeft size={18} className="text-charcoal" />
        </button>
        <h1 className="text-lg font-bold text-charcoal lang-transition">
          <span key={language} className="lang-fade-enter">
            {hasRefund ? t('refundStatus') : t('returnOrder')}
          </span>
        </h1>
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

      {/* If already returned: show refund path */}
      {hasRefund ? (
        <div className="card p-5 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <RefundPathVisualizer
            currentStep={order.refund.refundStep}
            estimatedDate={order.refund.estimatedDate}
          />
          <div className="mt-4 pt-4 border-t border-grey-light/50 flex items-center justify-between">
            <span className="text-xs text-grey-medium">{language === 'hi' ? 'रिफंड राशि' : 'Refund Amount'}</span>
            <span className="text-base font-bold text-forest-600">₹{order.refund.amount.toLocaleString()}</span>
          </div>
        </div>
      ) : isSubmitted ? (
        /* Success State */
        <div className="card p-8 flex flex-col items-center gap-4 animate-scale-in text-center">
          <div className="w-16 h-16 rounded-full bg-forest-500/10 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-forest-500" />
          </div>
          <h2 className="text-lg font-bold text-charcoal lang-transition">{t('returnSubmitted')}</h2>
          <p className="text-sm text-grey-medium max-w-[250px]">
            {language === 'hi'
              ? 'आपकी वापसी अनुरोध सबमिट हो गई है। हम 24 घंटे में संपर्क करेंगे।'
              : 'Your return request has been submitted. We will contact you within 24 hours.'}
          </p>
          <button onClick={() => navigate('/orders')} className="btn-primary text-sm mt-2">
            {language === 'hi' ? 'ऑर्डर पर वापस जाएं' : 'Back to Orders'}
          </button>
        </div>
      ) : (
        /* Return Flow */
        <>
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <ReturnReasonPicker selectedReason={selectedReason} onSelect={setSelectedReason} />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedReason}
            className={`w-full btn-primary text-sm py-3.5 animate-slide-up ${
              !selectedReason ? 'opacity-40 cursor-not-allowed' : ''
            }`}
            style={{ animationDelay: '200ms' }}
            id="submit-return-btn">
            {t('submitReturn')}
          </button>
        </>
      )}
    </div>
  );
}
