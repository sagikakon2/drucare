import { useState, useCallback, useEffect } from 'react';
import { SplashLoader } from '@/components/SplashLoader';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { WhatsAppFAB } from '@/components/ui/WhatsAppFAB';
import { FloatingOrderButton } from '@/components/ui/FloatingOrderButton';
import { NavigationBar } from '@/components/sections/NavigationBar';
import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { ParallaxText } from '@/components/kinetics/ParallaxText';
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { AboutProduct } from '@/components/sections/AboutProduct';
import { BrandStory } from '@/components/sections/BrandStory';
import { HowToUse } from '@/components/sections/HowToUse';
import { Testimonials } from '@/components/sections/Testimonials';
import { VideoReels } from '@/components/sections/VideoReels';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';
import { LogosBar } from '@/components/sections/LogosBar';
import { Ingredients } from '@/components/sections/Ingredients';
import { Footer } from '@/components/sections/Footer';

const SectionDivider = ({ from = 'bg', to = 'bg-alt' }) => (
  <div
    className="h-8 md:h-14 pointer-events-none"
    style={{
      background: `linear-gradient(to bottom, var(--color-${from}), var(--color-${to}))`,
    }}
  />
);


const App = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fallback = document.getElementById('splash-fallback');
    if (fallback) fallback.remove();
  }, []);

  const handleReady = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setReady(true);
  }, []);

  return (
    <>
      {!ready && <SplashLoader onReady={handleReady} />}
      <div
        style={{
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.4s ease-out 0.1s',
          visibility: ready ? 'visible' : 'hidden',
          backgroundColor: 'var(--color-text)',
        }}
      >
        <ScrollProgress />
        <NavigationBar />
        <main>
          <Hero />
          <div className="py-3 md:py-5 overflow-hidden bg-bg">
            <ParallaxText baseVelocity={-2} fontSize="clamp(1.5rem, 4vw, 3rem)" className="text-primary/35">
              טיפוח טבעי
            </ParallaxText>
            <ParallaxText baseVelocity={3} fontSize="clamp(1.2rem, 3vw, 2.5rem)" className="text-secondary/30">
              NATURAL HORSE CARE
            </ParallaxText>
          </div>
          <SectionDivider from="bg" to="bg-alt" />
          <Benefits />
          <SectionDivider from="bg-alt" to="bg" />
          <BeforeAfter />
          <VideoReels />
          <SectionDivider from="bg" to="bg-alt" />
          <LogosBar />
          <AboutProduct />
          <SectionDivider from="bg-alt" to="bg" />
          <Ingredients />
          <BrandStory />
          <HowToUse />
          <Testimonials />
          <FAQ />
          <SectionDivider from="bg" to="bg-alt" />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFAB />
        <FloatingOrderButton />
      </div>
    </>
  );
};

export default App;
