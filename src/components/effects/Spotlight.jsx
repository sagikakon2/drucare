import { useRef, useEffect } from 'react';

export const Spotlight = ({ className = '', fill }) => {
  const spotRef = useRef(null);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;

    const handleMouse = (e) => {
      const el = spotRef.current;
      if (!el) return;
      const container = el.parentElement;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      el.style.left = `${((e.clientX - rect.left) / rect.width) * 100}%`;
      el.style.top = `${((e.clientY - rect.top) / rect.height) * 100}%`;
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div
        ref={spotRef}
        className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full opacity-15 blur-[100px] transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle, ${fill}40, transparent 70%)`,
          left: '50%',
          top: '30%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};
