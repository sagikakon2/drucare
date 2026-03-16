export const GradientMesh = ({ colors, speed = 15, className = '' }) => (
  <div
    className={`absolute inset-0 overflow-hidden -z-10 ${className}`}
    style={{
      background: `
        radial-gradient(ellipse 80% 60% at 20% 30%, ${colors[0]}30 0%, transparent 70%),
        radial-gradient(ellipse 60% 80% at 80% 20%, ${colors[1]}25 0%, transparent 70%),
        radial-gradient(ellipse 70% 50% at 50% 80%, ${colors[2] || colors[0]}20 0%, transparent 70%)
        ${colors[3] ? `, radial-gradient(ellipse 50% 70% at 70% 60%, ${colors[3]}15 0%, transparent 70%)` : ''}
      `,
      animation: `gradient-mesh-shift ${speed}s ease-in-out infinite alternate`,
      willChange: 'transform',
    }}
  />
);
