import { useCallback, useEffect, useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { SparklesCore } from '@/components/effects/SparklesCore';

const TESTIMONIALS = [
  {
    quote: 'משחת הקסם, בזכות המוצר הזה, לא היססתי והבאתי סוס מגורד. אני והסוס פשוט זכינו.',
    name: 'גלעד דחנר',
    context: 'סוס ערבי — גרדת חמורה',
    rating: 5,
  },
  {
    quote: 'הלוואי וכל בעלי הסוסים היו מכירים את המוצר הנפלא הזה. עוד לא ראיתי טיפול שמביא תוצאות כאלה, בזמן כל כך קצר. הסוסה שלי עברה שיקום מלא בפחות מחודשיים. ממש קסם.',
    name: 'אופיר בריגה',
    context: 'סוסה — שיקום עור מלא',
    rating: 5,
  },
  {
    quote: 'המוצר הכי טוב לשיקום פצעים וגרדות שהכרתי. ממליץ בחום לכל מי שמחפש פתרון טבעי ואמיתי.',
    name: 'אבי בוקרא',
    context: 'חוות סוסים — פצעים וגרדות',
    rating: 5,
  },
  {
    quote: 'המלצה חמה מניסיון — קרם מדהים, עוזר באמת לסוסים עם גירוד, קרחות, זיהומי עור, נגד מעופפים עוקצניים ומרפא את העור. אני משתמש בו גם על סוסים שלא מגרדים. קרם מעולה.',
    name: 'אלון עובדיה',
    context: 'מגדל סוסים — שימוש יומיומי',
    rating: 5,
  },
  {
    quote: 'אחרי שבועיים של שימוש קבוע ראינו שיפור דרמטי. הפרווה התחילה לצמוח מחדש באזורים שהיו קרחים לחלוטין. ממליצה על זה בעיניים עצומות.',
    name: 'שירן לוי',
    context: 'סוס פוני — קרחות והצמחת שיער',
    rating: 5,
  },
  {
    quote: 'השתמשתי גם על הכלב שלי שסבל מיובש קשה ופצעים מגירוד. תוך שבוע העור נרגע לחלוטין. מוצר מעולה גם לכלבים!',
    name: 'רועי כהן',
    context: 'כלב רועים — יובש וגירוד',
    rating: 5,
  },
];

const getInitials = (name) => {
  const parts = name.split(' ');
  return parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : name.slice(0, 2);
};

export const Testimonials = () => {
  const trackRef = useRef(null);
  const intervalRef = useRef(null);
  const [index, setIndex] = useState(0);

  const count = TESTIMONIALS.length;

  const scrollToIndex = useCallback((i) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[i];
    if (!slide) return;
    const trackRect = track.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    const offset = slideRect.left - trackRect.left + track.scrollLeft - (trackRect.width - slideRect.width) / 2;
    track.scrollTo({ left: offset, behavior: 'smooth' });
    setIndex(i);
  }, []);

  const scrollPrev = useCallback(() => {
    setIndex((prev) => {
      const next = (prev - 1 + count) % count;
      scrollToIndex(next);
      return next;
    });
  }, [count, scrollToIndex]);

  const scrollNext = useCallback(() => {
    setIndex((prev) => {
      const next = (prev + 1) % count;
      scrollToIndex(next);
      return next;
    });
  }, [count, scrollToIndex]);

  useEffect(() => {
    intervalRef.current = setInterval(scrollNext, 6000);
    return () => clearInterval(intervalRef.current);
  }, [scrollNext]);

  const stopAutoplay = () => clearInterval(intervalRef.current);

  return (
    <section id="testimonials" className="bg-text relative overflow-hidden" style={{ paddingBlock: 'var(--section-py)' }}>
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <SparklesCore
          particleColor="#C9A96E"
          particleDensity={18}
          minSize={0.3}
          maxSize={0.9}
          speed={0.12}
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center" style={{ marginBottom: 'var(--heading-mb)' }}>
          <span className="text-gold text-sm font-semibold tracking-[0.15em] uppercase block mb-1">
            מה אומרים עלינו
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white" style={{ letterSpacing: '0.04em' }}>
            לקוחות ממליצים
          </h2>
        </div>

        <div className="relative">
          <div
            ref={trackRef}
            className="flex items-stretch gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
            style={{ scrollPaddingInline: '5%' }}
            onPointerDown={stopAutoplay}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="testimonial-slide min-w-0 shrink-0 snap-center"
              >
                <div
                  className="h-full p-6 md:p-8 rounded-2xl flex flex-col gap-4 hover-card"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <Quote className="w-8 h-8 text-gold/30" />
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`w-4 h-4 ${
                            j < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-base leading-relaxed text-white/85 flex-1">
                    &quot;{t.quote}&quot;
                  </p>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-secondary flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {getInitials(t.name)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white">{t.name}</p>
                      <p className="text-xs text-white/50">{t.context}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={scrollPrev}
            className="absolute top-1/2 -translate-y-1/2 end-full me-2 hidden lg:flex w-10 h-10 items-center justify-center rounded-full cursor-pointer bg-white/5 text-white/60 hover-circle-light"
            aria-label="הקודם"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 -translate-y-1/2 start-full ms-2 hidden lg:flex w-10 h-10 items-center justify-center rounded-full cursor-pointer bg-white/5 text-white/60 hover-circle-light"
            aria-label="הבא"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
