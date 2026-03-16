import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'מה תדירות ואופן השימוש?',
    a: 'מומלץ להשתמש 1-3 פעמים בשבוע. יש לנקות את האזור, למרוח שכבה דקה של המשחה ולעסות בעדינות. השימוש הקבוע מביא לתוצאות הטובות ביותר.',
  },
  {
    q: 'איך משחת הפלא עובדת?',
    a: 'המשחה מכילה פורמולה ייחודית של חמאות, שמנים אתריים ותמציות טבעיות הפועלות בסינרגיה. המרכיבים מחדירים לחות, משקמים רקמות, מחטאים ומגנים על העור מפני גורמים חיצוניים כמו זבובים ויבחושים.',
  },
  {
    q: 'האם יש מגבלה בחשיפה לשמש לאחר המריחה?',
    a: 'לא! המשחה בטוחה לחלוטין לשימוש חיצוני בשמש. המשחה מכילה מסנן קרינה טבעי ואין צורך להימנע מחשיפה לשמש.',
  },
  {
    q: 'האם ניתן למרוח על פצעים פתוחים?',
    a: 'כן, המשחה בטוחה למריחה על פצעים פתוחים. הרכיבים האנטי-בקטריאליים והאנטי-דלקתיים מסייעים בריפוי ומניעת זיהום.',
  },
  {
    q: 'איך לנקות ולשטוף לפני המריחה?',
    a: 'מומלץ לשטוף את האזור במים פושרים ולנגב בעדינות. ניתן להשתמש בשמפו עדין אם האזור מלוכלך מאוד. לאחר ייבוש, למרוח את המשחה.',
  },
  {
    q: 'מה המחיר ומה הכמות?',
    a: 'המשחה מגיעה באריזה של 1000ml. לפרטים ומחירים, צרו קשר דרך וואטסאפ או טופס ההזמנה באתר.',
  },
  {
    q: 'האם המשחה מתאימה גם לכלבים?',
    a: 'בהחלט! המשחה מתאימה לסוסים, כלבים ובעלי חיים נוספים. המרכיבים הטבעיים בטוחים לשימוש על כל סוגי בעלי החיים.',
  },
  {
    q: 'מה עושים במקרה של פציעה חמורה?',
    a: 'המשחה מסייעת בשיקום פצעים ומזרזת הגלדה, אך במקרה של פציעה חמורה או מצב שלא משתפר תוך מספר ימים — מומלץ לפנות לווטרינר. ניתן להמשיך להשתמש במשחה במקביל לטיפול וטרינרי.',
  },
  {
    q: 'כמה זמן לוקח המשלוח?',
    a: 'המשלוח מתבצע בדואר רשום או שליח עד הבית. זמן אספקה ממוצע 3-5 ימי עסקים לכל רחבי הארץ. במקרים דחופים ניתן לתאם איסוף עצמי.',
  },
  {
    q: 'מה תוקף המשחה ואיך לאחסן?',
    a: 'תוקף המשחה 12 חודשים מיום הייצור. יש לאחסן במקום יבש, מוצל, בטמפרטורת חדר. אין צורך בקירור. לסגור היטב אחרי כל שימוש.',
  },
  {
    q: 'האם יש מדיניות החזרות?',
    a: 'אם המוצר לא עמד בציפיות — ניתן לפנות אלינו תוך 14 ימים מקבלת המשלוח. אנחנו מאמינים במוצר ועומדים מאחורי כל צנצנת.',
  },
];

const AccordionItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card rounded-2xl border border-primary/5 overflow-hidden hover-card">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-start text-base font-semibold text-text hover:text-primary cursor-pointer transition-colors"
        style={{ color: open ? 'var(--color-primary)' : undefined }}
      >
        {question}
        <ChevronDown
          className={`w-4 h-4 shrink-0 translate-y-0.5 text-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-200"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm text-text-muted leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export const FAQ = () => (
  <section id="faq" className="bg-bg relative" style={{ paddingBlock: 'var(--section-py)' }}>
    <div className="max-w-3xl mx-auto px-5 md:px-8">
        <div className="text-center" style={{ marginBottom: 'var(--heading-mb)' }}>
          <span className="text-primary text-sm font-semibold tracking-[0.15em] uppercase block mb-1">
            יש שאלות?
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-text" style={{ letterSpacing: '0.04em' }}>
            שאלות נפוצות
          </h2>
        </div>

      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <AccordionItem key={i} question={faq.q} answer={faq.a} />
        ))}
      </div>
    </div>
  </section>
);
