export const MovingBorder = ({
  children,
  className = '',
  borderRadius = '20px',
  duration = 6,
  colorFrom,
  colorTo,
}) => (
  <div className={`relative p-[2px] overflow-hidden ${className}`} style={{ borderRadius }}>
    <div
      className="absolute inset-0"
      style={{
        background: `conic-gradient(from 0deg, ${colorFrom}, ${colorTo}, ${colorFrom})`,
        animation: `border-beam-spin ${duration}s linear infinite`,
        borderRadius,
      }}
    />
    <div className="relative w-full h-full" style={{ borderRadius: `calc(${borderRadius} - 2px)` }}>
      {children}
    </div>
  </div>
);
