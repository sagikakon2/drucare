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
  {
    quote: 'עברנו לגור בעוטף והסוס האהוב שלי שמעולם לא סבל מגרדות קיבל טפיל שגרם לו לאבד שיער וגרדות נוראיות. השתמשתי עם מלא מוצרים לנסות להרגיע לו את העור והגירוד המטריד. ואז הגעתי למשחה של קרן שמיד גרמה לשינוי וצמיחה של השיער. מעל הכל עזרה בתסכול והגירוד הבלתי פוסק של הסוס. כמו כן עזרה לכלב שנעקץ מזבובים בקצה האוזניים. למחרת כבר נוצר גלד חדש. מומלץ בענק. איזה כייף שיש לנו מוצר כזה בארץ. ועוד תוצרת ישראלית.',
    name: 'רקפת',
    context: 'סוס — טפיל וגרדות, כלב — עקיצות זבובים',
    rating: 5,
  },
  {
    quote: 'המוצר הזה עשה שינוי מטורף לסוס שלי, המוצר היחיד שעזר לבעיות עור חוזרות לסוס שלי.',
    name: 'ליאל',
    context: 'סוס — בעיות עור חוזרות',
    rating: 5,
  },
  {
    quote: 'משתמשת במשחה של קרן שנים לא מחליפה את הקסם הזה שזה עושה.',
    name: 'יובל',
    context: 'שימוש קבוע במשחה',
    rating: 5,
  },
];

const getInitials = (name) => {
  const parts = name.split(' ');
  return parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : name.slice(0, 2);
};

export const Testimonials = () => {
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const intervalRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const count = TESTIMONIALS.length;

  const computeClosest = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const children = Array.from(el.children);
    if (!children.length) return;
    const trackRect = el.getBoundingClientRect();
    const center = trackRect.left + trackRect.width / 2;
    let closest = 0;
    let minDist = Infinity;
    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect();
      const dist = Math.abs(rect.left + rect.width / 2 - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    }
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(computeClosest);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    computeClosest();
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [computeClosest]);

  const scrollToIndex = useCallback((i) => {
    const el = trackRef.current;
    if (!el) return;
    const child = el.children[i];
    if (!child) return;
    child.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
    setActiveIndex(i);
  }, []);

  const scrollByPage = useCallback((dir) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }, []);

  const scrollPrev = useCallback(() => scrollByPage(1), [scrollByPage]);
  const scrollNext = useCallback(() => scrollByPage(-1), [scrollByPage]);

  const autoNext = useCallback(() => {
    setActiveIndex((prev) => {
      const next = (prev + 1) % count;
      scrollToIndex(next);
      return next;
    });
  }, [count, scrollToIndex]);

  useEffect(() => {
    intervalRef.current = setInterval(autoNext, 6000);
    return () => clearInterval(intervalRef.current);
  }, [autoNext]);

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

        <div className="flex items-center gap-3">
          <button
            onClick={() => { stopAutoplay(); scrollPrev(); }}
            className="shrink-0 hidden lg:flex w-11 h-11 items-center justify-center rounded-full cursor-pointer bg-white/5 text-white/60 hover-circle-light"
            aria-label="הקודם"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="min-w-0 flex-1">
            <div
              ref={trackRef}
              className="flex items-stretch gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-2"
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
          </div>

          <button
            onClick={() => { stopAutoplay(); scrollNext(); }}
            className="shrink-0 hidden lg:flex w-11 h-11 items-center justify-center rounded-full cursor-pointer bg-white/5 text-white/60 hover-circle-light"
            aria-label="הבא"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="flex lg:hidden items-center justify-center gap-1.5 mt-5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { stopAutoplay(); scrollToIndex(i); }}
              className="cursor-pointer rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 24 : 8,
                height: 8,
                background: i === activeIndex
                  ? 'linear-gradient(135deg, var(--color-gold), var(--color-secondary))'
                  : 'rgba(255,255,255,0.2)',
              }}
              aria-label={`המלצה ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
