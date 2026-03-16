import { useState, useRef, useCallback } from 'react';

export const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = 'לפני',
  afterLabel = 'אחרי',
  className = '',
}) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setPosition(x * 100);
  }, []);

  const onPointerDown = useCallback(() => { dragging.current = true; }, []);
  const onPointerUp = useCallback(() => { dragging.current = false; }, []);
  const onPointerMove = useCallback((e) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl select-none cursor-col-resize aspect-[4/3] ${className}`}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onPointerMove={onPointerMove}
      onClick={(e) => updatePosition(e.clientX)}
    >
      <img src={afterImage} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />

      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${containerRef.current?.offsetWidth || 9999}px`, maxWidth: 'none' }}
          loading="lazy"
        />
      </div>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4L3 10L7 16" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
            <path d="M13 4L17 10L13 16" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <span className="absolute top-4 start-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full z-20 backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="absolute top-4 end-4 bg-primary/80 text-white text-xs px-3 py-1.5 rounded-full z-20 backdrop-blur-sm">
        {afterLabel}
      </span>
    </div>
  );
};
