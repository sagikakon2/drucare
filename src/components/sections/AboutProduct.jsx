import { motion } from 'framer-motion';
import { Check, Leaf, Sun, Shield, Recycle, Factory, Zap, ArrowLeft, ShoppingBag } from 'lucide-react';
import { NumberTicker } from '@/components/effects/NumberTicker';
import { ShimmerButton } from '@/components/effects/ShimmerButton';
import { BorderBeam } from '@/components/effects/BorderBeam';
import { CDN_IMAGES } from '@/cdn';

const FEATURES = [
  'טיפוח ושיקום העור',
  'מרגיעה את העור ומעניקה לחות',
  'מונעת גירודים ונשיכות עצמיות',
  'מרחיקה זבובים, יבחושים ומעופפים',
  'מצמיחה שיער מחדש',
  'מטפלת בפצעים פתוחים וישנים',
  'אנטי-פטרייתית ואנטי-בקטריאלית',
  'אנטי-דלקתית ומפחיתה נפיחות',
  'מעודדת חידוש תאים והגלדת פצעים',
  'בעלת מסנן קרינה — בטוחה בשמש',
];

const STATS = [
  { value: 100, suffix: '%', label: 'חומרים טבעיים' },
  { value: 1000, suffix: 'ml', label: 'תכולה' },
  { value: 3, suffix: '-1', label: 'פעמים בשבוע', prefix: '' },
];

const QUALITIES = [
  { icon: Leaf, text: 'מרכיבים טבעיים ואורגניים' },
  { icon: Sun, text: 'בטוחה בחשיפה לשמש' },
  { icon: Shield, text: 'ללא כימיקלים, SLS ופראבנים' },
  { icon: Recycle, text: 'ידידותית לסביבה ומתכלה' },
  { icon: Factory, text: 'מפעל קוסמטיקה אורגנית מורשה' },
  { icon: Zap, text: 'מותאמת לאקלים ישראלי' },
];

export const AboutProduct = () => (
  <section id="about" className="bg-bg-alt relative overflow-hidden" style={{ paddingBlock: 'var(--section-py)', isolation: 'isolate' }}>
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="gradient-blob w-[500px] h-[500px] bg-gold/8 top-20 -start-40" />
    </div>

    <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/15 via-secondary/8 to-gold/10 rounded-[2rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
            <img
              src={CDN_IMAGES.productJar}
              alt="משחת הפלא - Natural Horse Care"
              className="relative w-full max-w-md mx-auto rounded-3xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
              loading="lazy"
            />
            <div className="absolute -bottom-4 -end-4 bg-primary text-white rounded-2xl p-4 shadow-lg">
              <p className="text-2xl font-bold">100%</p>
              <p className="text-xs opacity-80">טבעי</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.03 }}
          className="flex flex-col gap-5"
        >
          <span className="text-primary text-sm font-semibold tracking-[0.15em] uppercase">
            אודות המשחה
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text" style={{ letterSpacing: '0.04em' }}>
            פורמולה ייחודית
            <br />
            <span className="text-primary">מ-100% מרכיבים טבעיים</span>
          </h2>
          <p className="text-text-muted leading-relaxed">
            Natural HorseCare הינה משחה ייחודית טבעית, עשויה מ-100% מרכיבים טבעיים —
            חמאות, שמנים צמחיים ותמציות שמנים אתריים להקלה, טיפול ושיקום מידי בעור
            יבש, סדוק, אדמומי, מגורה ופצוע. הפורמולה בעלת רכיבים סינרגטיים
            התורמים להקלה מידית, לשיקום מהיר, ולהגנה מפני גורמים חיצוניים.
          </p>
          <p className="text-text-muted leading-relaxed text-sm">
            ללא כימיקלים ותוספים כמו SLS ופראבנים. ידידותית לסביבה, מתכלה,
            לא מזיקה לסוס ולסביבה. מיוצרת במפעל קוסמטיקה אורגנית מורשה בישראל.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {FEATURES.slice(0, 8).map((f) => (
              <div key={f} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-text">{f}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-2">
            {QUALITIES.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 bg-primary/8 text-primary text-xs font-medium px-3 py-2 rounded-full hover-badge"
              >
                <Icon className="w-3.5 h-3.5" />
                {text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mt-10 md:mt-14 max-w-2xl mx-auto">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="text-center p-3 sm:p-5 md:p-6 rounded-2xl border border-primary/8 hover-card"
              style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <NumberTicker
                value={s.value}
                suffix={s.suffix}
                prefix={s.prefix}
                className="text-xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent inline-block"
              />
              <p className="text-xs sm:text-sm text-text-muted mt-1 sm:mt-2 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 md:mt-8 max-w-md mx-auto relative overflow-hidden rounded-2xl p-4 md:p-6 text-center border border-primary/10 bg-white"
          style={{
            boxShadow: '0 8px 32px rgba(46,125,50,0.08)',
          }}
        >
          <BorderBeam size={350} duration={12} colorFrom="#2E7D32" colorTo="#C9A96E" bgClass="bg-white" />
          <div className="relative z-10">
            <ShoppingBag className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-sm text-text-muted font-medium mb-1">צנצנת 1000ml</p>
            <p className="text-xs text-text-muted mb-4">לבדיקת מחיר עדכני ומבצעים</p>
            <ShimmerButton
              href="https://app.shopix.global/user/drucare"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full px-8 py-3 text-base font-semibold min-h-[48px] text-white"
              background="linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
            >
              לצפייה בחנות
              <ArrowLeft className="w-4 h-4" />
            </ShimmerButton>
          </div>
        </div>
    </div>
  </section>
);
