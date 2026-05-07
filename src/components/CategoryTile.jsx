import { useLanguage } from '../context/LanguageContext';

export default function CategoryTile({ category }) {
  const { language, t } = useLanguage();
  const labelKey = category.id;

  return (
    <button
      className="card-interactive flex flex-col items-center justify-center gap-2
                 p-4 aspect-square min-w-0
                 transition-all duration-200"
      style={{ backgroundColor: category.color + '40' }}
      id={`category-${category.id}`}
    >
      {/* Category Icon */}
      <span className="text-3xl" role="img" aria-label={t(labelKey)}>
        {category.icon}
      </span>

      {/* Bilingual Label */}
      <div className="flex flex-col items-center gap-0.5 lang-transition">
        {/* Primary: Regional script (Hindi) or English depending on active lang */}
        <span
          key={`primary-${language}`}
          className="text-xs font-semibold text-charcoal text-center leading-tight lang-fade-enter"
        >
          {language === 'hi'
            ? t(labelKey) /* Hindi primary */
            : t(labelKey) /* English primary */
          }
        </span>

        {/* Secondary: Opposite language in smaller text */}
        <span
          key={`secondary-${language}`}
          className="text-[10px] text-grey-medium text-center leading-tight lang-fade-enter"
        >
          {language === 'hi'
            ? /* Show English as secondary */ (() => {
                const enLabels = {
                  clothing: 'Clothing',
                  footwear: 'Footwear',
                  electronics: 'Electronics',
                  homeDecor: 'Home & Decor',
                  beauty: 'Beauty',
                  grocery: 'Grocery',
                  sports: 'Sports',
                  books: 'Books',
                };
                return enLabels[labelKey] || labelKey;
              })()
            : /* Show Hindi as secondary */ (() => {
                const hiLabels = {
                  clothing: 'कपड़े',
                  footwear: 'जूते',
                  electronics: 'इलेक्ट्रॉनिक्स',
                  homeDecor: 'घर की सजावट',
                  beauty: 'ब्यूटी',
                  grocery: 'किराना',
                  sports: 'खेल',
                  books: 'किताबें',
                };
                return hiLabels[labelKey] || '';
              })()
          }
        </span>
      </div>
    </button>
  );
}
