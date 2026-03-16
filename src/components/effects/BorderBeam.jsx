import { useRef, useEffect, useState } from 'react';

export const BorderBeam = ({
  className = '',
  size = 200,
  duration = 8,
  colorFrom,
  colorTo,
  bgClass = 'bg-card',
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
          width: `${size}%`,
          height: `${size}%`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: `border-beam-spin ${duration}s linear infinite`,
          animationPlayState: visible ? 'running' : 'paused',
        }}
      />
      <div className={`absolute inset-[1.5px] rounded-[inherit] ${bgClass}`} />
    </div>
  );
};
