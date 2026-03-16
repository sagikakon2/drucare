import { Droplets, Sprout, Bug, Scissors, CircleDot } from 'lucide-react';
import { ThreeDCard } from '@/components/effects/ThreeDCard';
import { BorderBeam } from '@/components/effects/BorderBeam';
import { DecorativeShapes } from '@/components/effects/DecorativeShapes';

const BENEFITS = [
  {
    icon: Droplets,
    title: 'יובש בעור',
    desc: 'מחדירה לחות עמוקה לעור ומונעת תחושת יובש מציקה. הסוס חווה הקלה מידית.',
  },
  {
    icon: Sprout,
    title: 'הצמחת שיער',
    desc: 'מעודדת שיקום רקמת העור וצמיחה מחודשת של שיער באזורים שנפגעו מקרחות.',
  },
  {
    icon: Bug,
    title: 'גרדת ועקיצות',
    desc: 'מטפלת בגורמים לגרדת, מונעת החמרה ומרחיקה זבובים ויבחושים מהאזור המטופל.',
  },
  {
    icon: Scissors,
    title: 'פצעים ושיקום',
    desc: 'מטפלת בפצעים פתוחים וישנים, מזרזת הגלדה ושיקום מלא של רקמת העור הפגועה.',
  },
  {
    icon: CircleDot,
    title: 'פטריות',
    desc: 'הפורמולה מכילה שמנים אתריים אנטי-פטרייתיים ואנטי-ספטיים — הפטריות לא חוזרות.',
  },
];

export const Benefits = () => (
  <section id="benefits" className="bg-bg-alt relative overflow-hidden" style={{ paddingBlock: 'var(--section-py)' }}>
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="gradient-blob w-80 h-80 bg-secondary/6 top-20 -start-20" />
      <DecorativeShapes
        shapes={['leaf', 'petal', 'dot']}
        palette={[
          { r: 46, g: 125, b: 50 },
          { r: 124, g: 179, b: 66 },
          { r: 201, g: 169, b: 110 },
        ]}
        count={10}
        speed="slow"
        rotation
      />
    </div>

    <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center" style={{ marginBottom: 'var(--heading-mb)' }}>
          <span className="text-primary text-sm font-semibold tracking-[0.15em] uppercase block mb-1">
            למה משחת הפלא
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-text" style={{ letterSpacing: '0.04em' }}>
            פתרון טבעי ל-5 בעיות עור נפוצות
          </h2>
          <p className="text-lg text-text-muted mt-4 max-w-2xl mx-auto">
            משחה אחת שמטפלת במגוון רחב של בעיות עור אצל סוסים, כלבים ובעלי חיים נוספים
          </p>
        </div>

      <div className="flex flex-wrap justify-center items-stretch gap-6">
        {BENEFITS.map((b) => (
          <ThreeDCard key={b.title} intensity={5} className="group w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-primary/5 shadow-sm hover:shadow-xl transition-shadow duration-300 relative overflow-hidden h-full">
              <BorderBeam size={300} duration={12} colorFrom="#2E7D32" colorTo="#7CB342" bgClass="bg-card" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-text mb-3">{b.title}</h3>
                <p className="text-text-muted leading-relaxed">{b.desc}</p>
              </div>
            </div>
          </ThreeDCard>
        ))}
      </div>
    </div>
  </section>
);
