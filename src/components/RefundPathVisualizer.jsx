import {
  RotateCcw,
  Warehouse,
  ClipboardCheck,
  ShieldCheck,
  Banknote,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { refundSteps } from '../data/orders';

const iconMap = {
  RotateCcw,
  Warehouse,
  ClipboardCheck,
  ShieldCheck,
  Banknote,
};

export default function RefundPathVisualizer({ currentStep = 0, estimatedDate }) {
  const { t } = useLanguage();

  return (
    <div className="space-y-4" id="refund-path-visualizer">
      <div className="flex items-center justify-between">
        <h3 className="section-title mb-0 lang-transition">
          <span className="lang-fade-enter">{t('refundStatus')}</span>
        </h3>
        {estimatedDate && (
          <span className="text-[10px] text-grey-medium">
            {t('refundEstimate')}: {estimatedDate}
          </span>
        )}
      </div>

      <div className="space-y-0">
        {refundSteps.map((step, index) => {
          const Icon = iconMap[step.icon] || RotateCcw;
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isPending = index > currentStep;
          const isLast = index === refundSteps.length - 1;

          return (
            <div key={step.key} className="flex items-start gap-3 stagger-item">
              {/* Icon + Connector */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-9 h-9 rounded-xl flex items-center justify-center
                    transition-all duration-500
                    ${
                      isCompleted
                        ? 'bg-forest-500 text-white'
                        : isActive
                        ? 'bg-forest-500 text-white shadow-lg shadow-forest-500/30 scale-105'
                        : 'bg-grey-light text-grey-medium'
                    }
                  `}
                >
                  <Icon size={16} />
                </div>

                {/* Vertical Connector */}
                {!isLast && (
                  <div
                    className={`
                      w-0.5 h-8 mt-1 rounded-full transition-colors duration-500
                      ${isCompleted ? 'bg-forest-500' : 'bg-grey-light'}
                    `}
                  />
                )}
              </div>

              {/* Label */}
              <div className="pt-2 pb-4">
                <span
                  className={`
                    text-sm font-medium lang-transition
                    ${
                      isCompleted || isActive
                        ? 'text-charcoal font-semibold'
                        : 'text-grey-medium'
                    }
                  `}
                >
                  {t(step.key)}
                </span>

                {isActive && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-soft" />
                    <span className="text-[10px] text-forest-600 font-medium">In Progress</span>
                  </div>
                )}

                {isCompleted && (
                  <span className="text-[10px] text-forest-500 font-medium">✓ Complete</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
