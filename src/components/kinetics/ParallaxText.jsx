import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const ParallaxText = ({
  children,
  baseVelocity = 3,
  fontSize = 'clamp(2rem, 6vw, 5rem)',
  className = '',
}) => {
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !innerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(innerRef.current, {
        x: () => `${baseVelocity * 100}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    });

    return () => ctx.revert();
  }, [baseVelocity]);

  const repeatedText = typeof children === 'string'
    ? Array.from({ length: 8 }, () => children).join(' \u00A0\u00A0\u2022\u00A0\u00A0 ')
    : children;

  return (
    <div ref={containerRef} className="overflow-hidden py-4">
      <div
        ref={innerRef}
        className={`whitespace-nowrap font-black uppercase tracking-wider ${className}`}
        style={{ fontSize }}
      >
        {repeatedText}
      </div>
    </div>
  );
};
