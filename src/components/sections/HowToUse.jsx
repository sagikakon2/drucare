import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Droplets,
  Bug,
  Scissors,
  CircleDot,
  Sparkles,
  Shield,
  AlertCircle,
  Camera,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const TREATMENTS = [
  {
    icon: AlertCircle,
    title: 'שימוש ראשוני',
    subtitle: 'שבועיים ראשונים',
    steps: [
      'קלחו את הסוס ויבשו היטב',
      'מרחו את המשחה על האזורים הבעייתיים',
      'עסו בעדינות עד שהמשחה נספגת בעור לחלוטין',
      'חזרו 3-4 פעמים בשבוע',
    ],
    tip: 'אין צורך בכפפות. אם אין אפשרות לקלח — הברישו היטב, נקו עם סמרטוט לח ומרחו.',
  },
  {
    icon: Droplets,
    title: 'עור יבש ומגורה',
    subtitle: 'גירודים, יובש, שפשופים',
    steps: [
      'נקו את האזור המגורה בעדינות עם מים ויבשו היטב',
      'מרחו שכבת משחה דקה על האזור היבש והמגורה',
      'עסו בעדינות עד לספיגה מלאה',
      'חזרו 2-4 פעמים בשבוע עד לשיפור במצב העור',
    ],
  },
  {
    icon: CircleDot,
    title: 'פטריות',
    subtitle: 'זיהומי עור פטרייתיים',
    steps: [
      'נקו את האזור המושפע עם מים וסבון עדין, יבשו היטב',
      'מרחו כמות נדיבה של המשחה על האזור המושפע',
      'עסו בעדינות עד לספיגה מלאה',
      'חזרו פעמיים ביום עד שהפטריה נעלמת לחלוטין',
    ],
  },
  {
    icon: Scissors,
    title: 'פצעים ושיקום',
    subtitle: 'כוויות, חתכים, פצעים עמוקים',
    steps: [
      'נקו את הפצע עם מים, יבשו בעדינות. רצוי לשים פולידין לפני המריחה',
      'מרחו כמות נדיבה על האזור הפצוע תוך שמירה על סטריליות',
      'עסו בעדינות עד לספיגה מלאה',
      'חזרו פעמיים ביום — בבוקר ובערב — עד להחלמה מלאה',
    ],
  },
  {
    icon: Sparkles,
    title: 'הצמחת שיער',
    subtitle: 'זנב ורעמה',
    steps: [
      'שטפו את הזנב והרעמה היטב ויבשו לחלוטין',
      'הברישו וסרקו כדי להבטיח שהשיער מסודר',
      'מרחו פס דק של המשחה לאורך הרעמה והזנב',
      'עסו בעדינות לתוך השערות עד לספיגה מלאה',
    ],
    tip: 'שימוש קבוע ישפר את הצמיחה, הבריאות והמראה הטבעי של השערות.',
  },
  {
    icon: Bug,
    title: 'הרחקת זבובים ומעופפים',
    subtitle: 'הגנה מפני חרקים',
    steps: [
      'מרחו כמות מועטה על הפנים, הרגליים והבטן',
      'עסו בעדינות עד לספיגה מלאה',
      'חזרו על הפעולה לפי הצורך, במיוחד כשיש ריבוי זבובים',
    ],
  },
  {
    icon: Shield,
    title: 'תחזוקה שוטפת',
    subtitle: 'לאחר השבועיים הראשונים',
    steps: [
      'מרחו 2-4 פעמים בשבוע על האזורים הנדרשים',
      'המשיכו בשימוש קבוע לתחזוקה ומניעה',
    ],
    tip: 'חשוב לצלם את הסוס לפני הטיפול ולאחר 2-3 שבועות למעקב.',
  },
];

const TreatmentSelector = ({ treatments, activeIndex, onSelect }) => {
  const scrollRef = useRef(null);
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollPos = Math.abs(el.scrollLeft);
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollStart(scrollPos > 2);
    setCanScrollEnd(scrollPos < maxScroll - 2);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const isRtl = getComputedStyle(el).direction === 'rtl';
    const amount = 220 * (isRtl ? -1 : 1) * dir;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => scroll(-1)}
        disabled={!canScrollStart}
        className={`hidden md:flex shrink-0 w-8 h-8 rounded-full items-center justify-center transition-all duration-200 cursor-pointer border ${
          canScrollStart
            ? 'bg-card border-primary/12 text-text-muted hover:bg-primary/8 hover:text-primary hover:border-primary/25'
            : 'bg-transparent border-transparent text-transparent pointer-events-none'
        }`}
        aria-label="גלול לתחילה"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="relative flex-1 min-w-0">
        {canScrollStart && (
          <div
            className="absolute start-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
            style={{
              background:
                'linear-gradient(to left, transparent, var(--color-bg-alt))',
            }}
          />
        )}
        {canScrollEnd && (
          <div
            className="absolute end-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--color-bg-alt))',
            }}
          />
        )}

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide px-1 py-1"
        >
          {treatments.map((t, i) => {
            const Icon = t.icon;
            const isActive = i === activeIndex;
            return (
              <button
                key={t.title}
                onClick={() => onSelect(i)}
                className={`shrink-0 flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300 cursor-pointer backdrop-blur-md ${
                  isActive
                    ? 'bg-white/70 border border-primary/25 shadow-[0_2px_10px_rgba(46,125,50,0.1)]'
                    : 'bg-white/40 border border-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_1px_3px_rgba(0,0,0,0.04)] hover:bg-white/60'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isActive ? 'bg-primary/12' : 'bg-primary/6'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors duration-300 ${
                      isActive ? 'text-primary' : 'text-primary/50'
                    }`}
                  />
                </div>
                <span
                  className={`text-xs font-semibold whitespace-nowrap transition-colors duration-300 ${
                    isActive ? 'text-primary' : 'text-text'
                  }`}
                >
                  {t.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => scroll(1)}
        disabled={!canScrollEnd}
        className={`hidden md:flex shrink-0 w-8 h-8 rounded-full items-center justify-center transition-all duration-200 cursor-pointer border ${
          canScrollEnd
            ? 'bg-card border-primary/12 text-text-muted hover:bg-primary/8 hover:text-primary hover:border-primary/25'
            : 'bg-transparent border-transparent text-transparent pointer-events-none'
        }`}
        aria-label="גלול להמשך"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
    </div>
  );
};

const StepItem = ({ step, index, totalSteps }) => (
  <motion.div
    initial={{ opacity: 0, x: 12 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: 0.08 + index * 0.07 }}
    className="flex items-start gap-4"
  >
    <div className="relative shrink-0">
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-cta-text bg-gradient-to-br from-primary to-secondary">
        {index + 1}
      </div>
      {index < totalSteps - 1 && (
        <div className="absolute top-10 start-1/2 -translate-x-1/2 w-px h-4 bg-primary/15" />
      )}
    </div>
    <p className="text-base text-text leading-relaxed pt-2">{step}</p>
  </motion.div>
);

const DetailPanel = ({ treatment }) => {
  const { icon: Icon, title, subtitle, steps, tip } = treatment;

  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="rounded-2xl bg-card border border-primary/8 overflow-hidden shadow-sm"
    >
      <div className="h-1.5 w-full bg-gradient-to-l from-primary to-secondary" />

      <div className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6 md:gap-10">
          <div className="sm:w-2/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/15">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text">{title}</h3>
                <p className="text-sm text-text-muted">{subtitle}</p>
              </div>
            </div>

            {tip && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10"
              >
                <p className="text-sm text-text-muted leading-relaxed">
                  <span className="font-semibold text-primary">
                    💡 טיפ:{' '}
                  </span>
                  {tip}
                </p>
              </motion.div>
            )}
          </div>

          <div className="flex-1 space-y-5">
            {steps.map((step, i) => (
              <StepItem key={i} step={step} index={i} totalSteps={steps.length} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const HowToUse = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="instructions"
      className="bg-bg-alt relative"
      style={{ paddingBlock: 'var(--section-py)' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="gradient-blob w-80 h-80 bg-primary/5 top-10 -end-20" />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        <div
          className="text-center"
          style={{ marginBottom: 'var(--heading-mb)' }}
        >
          <span className="text-primary text-sm font-semibold tracking-[0.15em] uppercase block mb-1">
            הוראות שימוש
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-text"
            style={{ letterSpacing: '0.04em' }}
          >
            כל בעיה — והטיפול שלה
          </h2>
          <p className="text-lg text-text-muted mt-4 max-w-2xl mx-auto">
            בחרו את סוג הטיפול לקבלת הנחיות מפורטות
          </p>
        </div>

        <div className="space-y-6">
          <TreatmentSelector
            treatments={TREATMENTS}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />

          <AnimatePresence mode="wait">
            <DetailPanel
              key={activeIndex}
              treatment={TREATMENTS[activeIndex]}
            />
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/5 border border-primary/10">
            <Camera className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-text">
              חשוב לצלם לפני הטיפול ואחרי 2-3 שבועות למעקב
            </span>
          </div>
          <p className="text-xs text-text-muted max-w-lg text-center">
            במקרה של תסמינים לא רגילים או אם לא חלה הטבה תוך מספר ימים — יש
            להפסיק את השימוש ולהתייעץ עם וטרינר.
          </p>
        </div>
      </div>
    </section>
  );
};
