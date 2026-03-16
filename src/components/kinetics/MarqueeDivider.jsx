import Marquee from 'react-fast-marquee';

const ITEMS = [
  'טיפוח טבעי',
  'שיקום העור',
  'הצמחת שיער',
  'טיפול בגרדת',
  'ריפוי פצעים',
  '100% טבעי',
  'מיוצר בישראל',
  'ללא כימיקלים',
];

export const MarqueeDivider = () => (
  <div className="py-6 bg-bg overflow-hidden" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
    <Marquee speed={45} gradient={false} autoFill>
      {ITEMS.map((item, i) => (
        <span
          key={i}
          dir="rtl"
          className="text-primary/15 text-sm font-bold tracking-[0.25em] uppercase mx-8"
        >
          {item}
        </span>
      ))}
    </Marquee>
  </div>
);
