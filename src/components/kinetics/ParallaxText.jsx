import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ParallaxText = ({
  children,
  baseVelocity = 3,
  fontSize = 'clamp(2rem, 6vw, 5rem)',
  className = '',
}) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, baseVelocity * 100]);

  const repeatedText = typeof children === 'string'
    ? Array.from({ length: 8 }, () => children).join(' \u00A0\u00A0\u2022\u00A0\u00A0 ')
    : children;

  return (
    <div ref={containerRef} className="overflow-hidden py-4">
      <motion.div
        style={{ x, fontSize }}
        className={`whitespace-nowrap font-black uppercase tracking-wider ${className}`}
      >
        {repeatedText}
      </motion.div>
    </div>
  );
};
