import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Flower2, Droplets, Leaf, Sun, Shield, HeartPulse } from 'lucide-react';
import { DecorativeShapes } from '@/components/effects/DecorativeShapes';

const INGREDIENTS = [
  {
    icon: Flower2,
    name: 'שמן לבנדר',
    role: 'מרגיע, אנטי-דלקתי ואנטי-בקטריאלי',
    detail: 'שמן אתרי ממשפחת השפתניים המסייע בהרגעת דלקות, הפחתת כאבים ומניעת זיהומים בקטריאליים בעור.',
    color: '#9C7CDB',
  },
  {
    icon: Droplets,
    name: 'חמאת שיאה',
    role: 'לחות עמוקה ושיקום רקמות',
    detail: 'עשירה בוויטמינים A ו-E, חודרת לשכבות העמוקות של העור ומספקת לחות ממושכת ושיקום מואץ.',
    color: '#C9A96E',
  },
  {
    icon: Leaf,
    name: 'שמן עץ התה',
    role: 'אנטי-פטרייתי ואנטי-ספטי טבעי',
    detail: 'ידוע בסגולותיו החיטוייות, נלחם בפטריות ובקטריות ומונע חזרה של זיהומי עור.',
    color: '#2E7D32',
  },
  {
    icon: Sun,
    name: 'שמן קוקוס',
    role: 'הגנה מהשמש ולחות',
    detail: 'מספק שכבת הגנה טבעית מפני קרינת UV, מונע התייבשות ושומר על גמישות העור.',
    color: '#F9A825',
  },
  {
    icon: Shield,
    name: 'שמן רוזמרין',
    role: 'מעודד צמיחת שיער ומחזור דם',
    detail: 'ממריץ את זרימת הדם באזור המטופל, מעודד צמיחת שיער ומסייע בחידוש רקמות.',
    color: '#7CB342',
  },
  {
    icon: HeartPulse,
    name: 'ויטמין E',
    role: 'נוגד חמצון וחידוש תאים',
    detail: 'נוגד חמצון עוצמתי המגן על תאי העור מפני נזקי רדיקלים חופשיים ומאיץ ריפוי.',
    color: '#E57373',
  },
];

const IngredientCard = ({ ingredient, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { icon: Icon, name, role, detail, color } = ingredient;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.25,
        delay: index * 0.03,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative"
    >
      <div className="relative rounded-2xl p-6 md:p-7 bg-card border border-primary/5 hover-card h-full overflow-hidden">
        <div
          className="absolute -top-12 -end-12 w-32 h-32 rounded-full hover-reveal blur-2xl"
          style={{ background: color, '--hover-opacity': 0.07 }}
        />

        <div className="flex items-start gap-4">
          <motion.div
            className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${color}18, ${color}28)`,
              border: `1px solid ${color}20`,
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Icon className="w-7 h-7" style={{ color }} />
          </motion.div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-text mb-1">{name}</h3>
            <p className="text-sm font-semibold mb-2" style={{ color }}>
              {role}
            </p>
            <p className="text-sm text-text-muted leading-relaxed">{detail}</p>
          </div>
        </div>

        <div
          className="absolute bottom-0 inset-x-0 h-1 hover-reveal"
          style={{
            background: `linear-gradient(to right, transparent, ${color}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
};

export const Ingredients = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section ref={sectionRef} className="bg-bg relative overflow-hidden" style={{ paddingBlock: 'var(--section-py)' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="gradient-blob w-[400px] h-[400px] bg-primary/5 top-0 -end-40" />
        <div className="gradient-blob w-[300px] h-[300px] bg-gold/6 bottom-10 -start-32" />
        <DecorativeShapes
          shapes={['leaf', 'petal', 'dot']}
          palette={[
            { r: 46, g: 125, b: 50 },
            { r: 124, g: 179, b: 66 },
            { r: 201, g: 169, b: 110 },
          ]}
          count={8}
          speed="slow"
          rotation
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
          <div className="text-center" style={{ marginBottom: 'var(--heading-mb)' }}>
            <span className="text-primary text-sm font-semibold tracking-[0.15em] uppercase block mb-1">
              מה בפנים
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-text mb-2" style={{ letterSpacing: '0.04em' }}>
              הכוח של{' '}
              <span className="bg-gradient-to-l from-primary via-secondary to-[#C9A96E] bg-clip-text text-transparent">
                הטבע
              </span>
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
              פורמולה סינרגטית של חמאות, שמנים צמחיים ותמציות שמנים אתריים —
              כל מרכיב נבחר בקפידה לפעולה משולבת שמשקמת, מגנה ומרפאה
            </p>
          </div>

        <motion.div
          className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(46,125,50,0.04) 0%, transparent 70%)',
          }}
          animate={isInView ? { scale: [0.8, 1.1, 1], opacity: [0, 0.6, 0.4] } : {}}
          transition={{ duration: 2, ease: 'easeOut' }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {INGREDIENTS.map((ingredient, i) => (
            <IngredientCard key={ingredient.name} ingredient={ingredient} index={i} />
          ))}
        </div>

        <motion.div
          className="mt-3 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/5 border border-primary/10">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-text">
              100% מרכיבים טבעיים — ללא כימיקלים, SLS ופראבנים
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
