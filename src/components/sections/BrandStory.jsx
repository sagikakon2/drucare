import { motion } from 'framer-motion';
import { Heart, Award, Beaker, MapPin } from 'lucide-react';
import { SparklesCore } from '@/components/effects/SparklesCore';

const MILESTONES = [
  {
    icon: Heart,
    title: 'אהבה לבעלי חיים',
    text: 'קרן דרוקר, מטפלת ומגדלת סוסים מנוסה, ראתה את הסבל של סוסיה מבעיות עור — גירודים, יובש, פצעים ורגישות לזבובים ויבחושים.',
  },
  {
    icon: Beaker,
    title: 'לימודים ומחקר',
    text: 'לאחר ניסיון כושל עם משחות וקרמים רפואיים, קרן למדה ארומתרפיה ורקחות טבעית כדי לפתח פתרון שהוא גם יעיל וגם בטוח.',
  },
  {
    icon: Award,
    title: 'שנה וחצי של פיתוח',
    text: 'ניסויים בשילובי חמאות, שמנים צמחיים ושמנים אתריים עד שנמצאה הפורמולה המושלמת — שינוי מדהים בריפוי נגעים וגירודים.',
  },
  {
    icon: MapPin,
    title: 'ייצור מקומי מורשה',
    text: 'כיום המשחה מיוצרת במפעל קוסמטיקה אורגנית מורשה בישראל, בפיקוח קפדני ומרכיבים איכותיים וטהורים.',
  },
];

export const BrandStory = () => (
  <section
    className="relative overflow-hidden"
    style={{
      paddingBlock: 'var(--section-py)',
      backgroundImage: 'url(/images/hero-ranch.jpeg)',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(160deg, rgba(45,59,45,0.88) 0%, rgba(46,125,50,0.75) 100%)',
      }}
    />

    <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
      <div className="text-center max-w-2xl mx-auto" style={{ marginBottom: 'var(--heading-mb)' }}>
        <span className="text-gold text-sm font-semibold tracking-[0.15em] uppercase block mb-1">
          הסיפור שלנו
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3" style={{ letterSpacing: '0.04em' }}>
          מאהבה לסוסים —{' '}
          <span className="bg-gradient-to-l from-gold to-secondary bg-clip-text text-transparent">
            נולדה משחת הפלא
          </span>
        </h2>
        <p className="text-lg text-white/70 leading-relaxed">
          הסיפור של Natural Horse Care מתחיל מחוות סוסים קטנה בישראל,
          מתוך הצורך האמיתי למצוא פתרון טבעי שעובד — באמת.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {MILESTONES.map(({ icon: Icon, title, text }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative group h-full"
          >
            <div
              className="flex gap-5 p-6 rounded-2xl h-full hover-card"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-white/10 flex items-center justify-center hover-icon-pop"
                style={{ '--hover-bg': 'rgba(255,255,255,0.2)' }}>
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="text-white/60 leading-relaxed text-sm">{text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="mt-8 lg:mt-10 p-5 md:p-7 rounded-3xl text-center max-w-3xl mx-auto relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <SparklesCore
            particleColor="#C9A96E"
            particleDensity={20}
            minSize={0.4}
            maxSize={1}
            speed={0.15}
          />
        </div>
        <div className="absolute top-4 end-6 text-white/8 text-8xl font-serif leading-none select-none" aria-hidden>&ldquo;</div>
        <p className="text-white/90 leading-relaxed text-lg md:text-xl italic relative z-10">
          &ldquo;הסוסים שלי סבלו מבעיות עור שונות — חלקם היו יבשים ומגרדים, חלקם רגישים לזבובים ויבחושים.
          אף משחה רפואית לא עזרה באמת. החלטתי ללמוד ארומתרפיה ורקחות טבעית
          ולפתח בעצמי פתרון שיהיה גם יעיל וגם בטוח. אחרי שנה וחצי של ניסויים — הצלחתי.&rdquo;
        </p>
        <div className="mt-6 relative z-10">
          <div className="w-12 h-0.5 bg-gradient-to-l from-gold to-secondary mx-auto mb-4" />
          <p className="font-bold text-gold text-base">קרן דרוקר</p>
          <p className="text-white/50 text-sm">מייסדת DruCare, מטפלת ומגדלת סוסים</p>
        </div>
      </div>
    </div>
  </section>
);
