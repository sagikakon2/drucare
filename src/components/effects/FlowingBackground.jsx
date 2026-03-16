export const FlowingBackground = ({
  text,
  speed = 40,
  direction = 'left',
  fontSize = 'clamp(4rem, 10vw, 10rem)',
  fontFamily = 'inherit',
  opacity = 0.04,
  outlined = false,
  strokeColor = 'currentColor',
  repeat = 6,
  className = '',
}) => {
  const repeatedText = Array.from({ length: repeat }, () => text).join(' \u00A0\u00A0\u00A0 ');
  const animationName = direction === 'left' ? 'marquee-scroll' : 'marquee-scroll-reverse';

  const textStyle = {
    fontSize,
    fontFamily,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    ...(outlined
      ? { color: 'transparent', WebkitTextStroke: `1px ${strokeColor}` }
      : {}),
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <div className="absolute inset-0 flex items-center">
        <div
          className="flex w-max"
          style={{ animation: `${animationName} ${speed}s linear infinite`, willChange: 'transform' }}
        >
          <span className="shrink-0 font-black uppercase tracking-wider" style={textStyle}>
            {repeatedText}
          </span>
          <span className="shrink-0 font-black uppercase tracking-wider" style={textStyle} aria-hidden="true">
            {repeatedText}
          </span>
        </div>
      </div>
    </div>
  );
};
