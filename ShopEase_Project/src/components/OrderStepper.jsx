import {
  ShoppingBag,
  Package,
  Truck,
  CheckCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  ShoppingBag,
  Package,
  Truck,
  CheckCircle,
};

const stepKeys = ['ordered', 'packed', 'onTheWay', 'delivered'];

export default function OrderStepper({ currentStep = 0 }) {
  const { t } = useLanguage();

  return (
    <div className="py-6" id="order-stepper">
      <div className="flex items-start justify-between relative">
        {/* Progress Line (Background) */}
        <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-grey-light z-0" />

        {/* Progress Line (Active) */}
        <div
          className="absolute top-5 left-[10%] h-0.5 bg-forest-500 z-0 transition-all duration-700 ease-out"
          style={{
            width: `${Math.min(currentStep / (stepKeys.length - 1), 1) * 80}%`,
          }}
        />

        {stepKeys.map((key, index) => {
          const icons = [ShoppingBag, Package, Truck, CheckCircle];
          const Icon = icons[index];
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div
              key={key}
              className="flex flex-col items-center z-10 flex-1"
            >
              {/* Icon Circle */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-500 ease-out
                  ${
                    isCompleted
                      ? 'bg-forest-500 text-white shadow-md shadow-forest-500/30'
                      : isActive
                      ? 'bg-forest-500 text-white shadow-lg shadow-forest-500/40 scale-110'
                      : 'bg-grey-light text-grey-medium'
                  }
                `}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              </div>

              {/* Label */}
              <span
                className={`
                  text-[10px] font-medium mt-2 text-center lang-transition max-w-[70px]
                  ${
                    isCompleted || isActive
                      ? 'text-forest-600 font-semibold'
                      : 'text-grey-medium'
                  }
                `}
              >
                {t(key)}
              </span>

              {/* Active Pulse */}
              {isActive && (
                <div className="w-2 h-2 rounded-full bg-forest-500 mt-1.5 animate-pulse-soft" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
