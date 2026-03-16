import { useState } from 'react';
import { ArrowLeft, Loader2, Phone, Mail, MessageCircle, CheckCircle2 } from 'lucide-react';
import { ShimmerButton } from '@/components/effects/ShimmerButton';
import { base44 } from '@/api/base44Client';

const validate = (data) => {
  const errors = {};
  if (!data.name.trim()) errors.name = 'שם הוא שדה חובה';
  if (!/^[\d\-+() ]{7,15}$/.test(data.phone)) errors.phone = 'מספר טלפון לא תקין';
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'כתובת אימייל לא תקינה';
  return errors;
};

export const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setIsSubmitting(true);
    try {
      await base44.entities.ContactLead.create({
        name: form.name,
        phone: form.phone,
        email: form.email || '',
        message: form.message || '',
      });
    } catch {
      const text = `שם: ${form.name}\nטלפון: ${form.phone}\n${form.email ? `אימייל: ${form.email}\n` : ''}${form.message ? `הודעה: ${form.message}` : ''}`;
      window.open(`https://wa.me/972545661535?text=${encodeURIComponent(text)}`, '_blank');
    }
    setIsSubmitting(false);
    setSubmitted(true);
    setForm({ name: '', phone: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputClass =
    'w-full rounded-xl px-4 py-3 text-base transition-colors duration-200 ease-out outline-none bg-white border border-black/10 text-text placeholder:text-text-muted/50 focus:border-primary';

  return (
    <section id="contact" className="bg-bg-alt relative" style={{ paddingBlock: 'var(--section-py)' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="gradient-blob w-80 h-80 bg-primary/6 -top-20 -end-20" />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
          <div className="text-center" style={{ marginBottom: 'var(--heading-mb)' }}>
            <span className="text-primary text-sm font-semibold tracking-[0.15em] uppercase block mb-1">
              צרו קשר
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-text" style={{ letterSpacing: '0.04em' }}>
              מוכנים לטפל בסוס שלכם?
            </h2>
            <p className="text-lg text-text-muted mt-4 max-w-2xl mx-auto">
              השאירו פרטים ונחזור אליכם עם כל המידע על המוצרים שלנו,
              או פנו אלינו ישירות בוואטסאפ — אנחנו תמיד זמינים!
            </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          <div className="flex flex-col gap-5 order-2 md:order-1">
            <div className="flex flex-col gap-5">
              <a
                href="tel:0545661535"
                className="flex items-center gap-4 group cursor-pointer p-4 rounded-xl hover:bg-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover-icon-pop">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-muted">טלפון</p>
                  <p className="font-medium text-text group-hover:text-primary transition-colors" dir="ltr">054-566-1535</p>
                </div>
              </a>

              <a
                href="mailto:keren.druker@gmail.com"
                className="flex items-center gap-4 group cursor-pointer p-4 rounded-xl hover:bg-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover-icon-pop">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-muted">אימייל</p>
                  <p className="font-medium text-text group-hover:text-primary transition-colors">keren.druker@gmail.com</p>
                </div>
              </a>

              <a
                href="https://wa.me/972545661535?text=היי, אשמח לשמוע פרטים על המוצרים"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group cursor-pointer p-4 rounded-xl hover:bg-[#25D366]/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center hover-icon-pop" style={{ '--hover-bg': 'rgba(37,211,102,0.2)' }}>
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <p className="text-sm text-text-muted">וואטסאפ</p>
                  <p className="font-medium text-text group-hover:text-[#25D366] transition-colors">שלחו הודעה עכשיו</p>
                </div>
              </a>
            </div>

            <ShimmerButton
              href="https://app.shopix.global/user/drucare/category/-Nn_99HJ3c89138AhEIt/product/-NnA2laDq3QFY8sXf4ke"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-8 py-3.5 text-base font-semibold min-h-[48px] text-white w-fit mt-2"
              background="linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
            >
              לחנות המוצרים
              <ArrowLeft className="w-4 h-4" />
            </ShimmerButton>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-card border border-primary/5 shadow-sm order-1 md:order-2">
            <h3 className="text-xl font-bold text-text mb-6">השאירו פרטים</h3>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8">
                <CheckCircle2 className="w-12 h-12 text-primary" />
                <p className="text-lg font-bold text-text">ההודעה נשלחה בהצלחה!</p>
                <p className="text-text-muted text-sm">נחזור אליכם בהקדם.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text">
                    שם מלא <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="הכניסו את שמכם"
                    className={inputClass}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text">
                    טלפון <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="050-0000000"
                    className={inputClass}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text">אימייל</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="email@example.com"
                    className={inputClass}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text">הודעה</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    placeholder="ספרו לנו על בעל החיים שלכם..."
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <ShimmerButton
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full min-h-[48px] text-base font-semibold text-white mt-2 w-full flex items-center justify-center gap-2 disabled:opacity-50"
                  background="linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      שליחה
                      <ArrowLeft className="w-4 h-4" />
                    </>
                  )}
                </ShimmerButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
