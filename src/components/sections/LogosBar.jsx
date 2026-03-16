import { Leaf, Shield, Factory, Award, Sun, Recycle } from 'lucide-react';

const BADGES = [
  { icon: Leaf, text: '100% טבעי' },
  { icon: Shield, text: 'ללא כימיקלים' },
  { icon: Factory, text: 'מפעל אורגני מורשה' },
  { icon: Award, text: 'מיוצר בישראל' },
  { icon: Sun, text: 'בטוח בשמש' },
  { icon: Recycle, text: 'ידידותי לסביבה' },
];

export const LogosBar = () => (
  <div className="bg-bg-alt" style={{ paddingBlock: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
    <div className="max-w-6xl mx-auto px-5 md:px-8">
        <p className="text-center text-xs tracking-[0.15em] uppercase text-text-muted font-semibold mb-3">
          אישורים ותקנים
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {BADGES.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-primary/10 bg-card/80 hover-badge"
            >
              <Icon className="w-4.5 h-4.5 text-primary" />
              <span className="text-sm font-medium text-text">{text}</span>
            </div>
          ))}
        </div>
    </div>
  </div>
);
