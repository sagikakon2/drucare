export const ShimmerButton = ({
  children,
  className = '',
  shimmerColor = 'rgba(255,255,255,0.15)',
  background = 'var(--color-primary)',
  onClick,
  href,
  target,
  rel,
  type,
  disabled,
}) => {
  const Tag = href ? 'a' : 'button';
  const linkProps = href ? { href, target, rel } : { onClick, type, disabled };

  return (
    <Tag
      {...linkProps}
      className={`relative overflow-hidden cursor-pointer ${className}`}
      style={{ background }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(110deg, transparent 33%, ${shimmerColor} 50%, transparent 67%)`,
          animation: 'shimmer-slide 3s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </span>
    </Tag>
  );
};
