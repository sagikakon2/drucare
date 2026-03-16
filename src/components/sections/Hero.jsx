import { motion } from 'framer-motion';
import { ArrowLeft, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import { Spotlight } from '@/components/effects/Spotlight';
import { ShimmerButton } from '@/components/effects/ShimmerButton';
import { FlowingBackground } from '@/components/effects/FlowingBackground';
import { GradientMesh } from '@/components/effects/GradientMesh';

const scrollTo = (href) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

const badges = [
  { icon: Leaf, text: '100% טבעי' },
  { icon: ShieldCheck, text: 'מיוצר בישראל' },
  { icon: Sparkles, text: 'תוצאות מוכחות' },
];

export const Hero = () => (
  <section className="relative flex items-center overflow-hidden bg-bg pt-20 md:min-h-screen">
    <GradientMesh colors={['#2E7D32', '#7CB342', '#C9A96E', '#E8F5E9']} speed={30} />
    <Spotlight fill="#2E7D32" />
    <FlowingBackground
      text="NATURAL HORSE CARE"
      speed={60}
      fontSize="clamp(4rem, 12vw, 11rem)"
      opacity={0.025}
      fontFamily="'Rubik', sans-serif"
    />

    <div className="max-w-6xl mx-auto px-5 md:px-8 w-full py-12 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col gap-6 order-1"
        >
          <span className="text-primary text-sm font-semibold tracking-[0.15em] uppercase">
            Natural Horse Care — בריאות מהטבע
          </span>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-text"
            style={{ letterSpacing: '0.04em' }}
          >
            משחת הפלא
            <br />
            <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
              לטיפוח וטיפול טבעי
            </span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed max-w-lg text-text-muted">
            משחה ייחודית מ-100% מרכיבים טבעיים לטיפוח, שיקום והגנה על עור הסוס.
            מטפלת בגירודים, פצעים, פטריות, יובש ומצמיחה שיער מחדש.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-1">
            {badges.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="liquid-glass-light inline-flex items-center gap-2 bg-white/80 text-primary text-sm font-medium px-4 py-2 rounded-full"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {text}
                </span>
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <ShimmerButton
              href="https://app.shopix.global/user/drucare/category/-Nn_99HJ3c89138AhEIt/product/-NnA2laDq3QFY8sXf4ke"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-8 py-3.5 text-base font-semibold min-h-[48px] text-white"
              background="linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
            >
              להזמנה עכשיו
              <ArrowLeft className="w-4 h-4" />
            </ShimmerButton>
            <button
              onClick={() => scrollTo('#about')}
              className="liquid-glass-light bg-white/70 rounded-full px-8 py-3.5 text-base font-medium cursor-pointer transition-all min-h-[48px] text-text hover:text-primary"
            >
              <span className="relative z-10">למידע נוסף</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative order-2"
        >
          <div className="relative group">
            <div className="absolute -inset-6 bg-gradient-to-bl from-primary/20 via-secondary/10 to-gold/15 rounded-[2rem] blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700 animate-hero-glow" />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <video
                src="/videos/hero-mobile.mp4"
                poster="/images/product-jar.jpeg"
                autoPlay
                muted
                loop
                playsInline
                className="w-full object-cover"
                style={{ aspectRatio: '4/5', maxHeight: '580px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-4 -start-4 md:-start-8 z-20"
            >
              <div className="liquid-glass-light bg-white/92 backdrop-blur-md rounded-2xl shadow-xl p-4 md:p-5">
                <span className="relative z-10 block">
                  <p className="text-xs text-text-muted font-medium">תוצאות תוך</p>
                  <p className="text-3xl font-bold text-primary">7-14 <span className="text-lg">ימים</span></p>
                  <p className="text-xs text-text-muted">שימוש 1-3 פעמים בשבוע</p>
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -top-3 -end-3 md:-end-6 z-20"
            >
              <div className="bg-primary text-white rounded-2xl shadow-lg px-4 py-3 text-center">
                <p className="text-2xl font-bold">100%</p>
                <p className="text-xs opacity-80">טבעי</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
