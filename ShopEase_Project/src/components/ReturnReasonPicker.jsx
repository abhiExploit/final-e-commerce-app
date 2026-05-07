import {
  Ruler,
  AlertTriangle,
  FileX,
  RefreshCw,
  XCircle,
  Clock,
  PackageX,
  MoreHorizontal,
  Check,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { returnReasons } from '../data/orders';

const iconMap = {
  Ruler,
  AlertTriangle,
  FileX,
  RefreshCw,
  XCircle,
  Clock,
  PackageX,
  MoreHorizontal,
};

export default function ReturnReasonPicker({ selectedReason, onSelect }) {
  const { t } = useLanguage();

  return (
    <div className="space-y-3" id="return-reason-picker">
      <h3 className="section-title lang-transition">
        <span className="lang-fade-enter">{t('selectReason')}</span>
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {returnReasons.map((reason, index) => {
          const Icon = iconMap[reason.icon] || MoreHorizontal;
          const isSelected = selectedReason === reason.key;

          return (
            <button
              key={reason.key}
              onClick={() => onSelect(reason.key)}
              className={`
                stagger-item card relative p-4 flex flex-col items-center gap-2.5
                transition-all duration-200
                ${
                  isSelected
                    ? 'border-2 border-forest-500 bg-forest-500/5 shadow-md'
                    : 'border border-grey-light hover:border-forest-300 hover:bg-surface'
                }
                active:scale-[0.96]
              `}
              id={`reason-${reason.key}`}
            >
              {/* Selected Check */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-forest-500 flex items-center justify-center animate-scale-in">
                  <Check size={12} className="text-white" />
                </div>
              )}

              <div
                className={`
                  w-10 h-10 rounded-xl flex items-center justify-center
                  transition-colors duration-200
                  ${isSelected ? 'bg-forest-500/15 text-forest-600' : 'bg-surface text-grey-medium'}
                `}
              >
                <Icon size={20} />
              </div>

              <span
                className={`
                  text-xs font-medium text-center leading-tight lang-transition
                  ${isSelected ? 'text-forest-600 font-semibold' : 'text-charcoal'}
                `}
              >
                {t(reason.key)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
