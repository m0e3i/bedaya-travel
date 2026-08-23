'use client';
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";

// ============ إعدادات عامة ============
const WHATSAPP_NUMBER = "201012794265";

const COLORS = {
  bg: "#F7F3EA",
  text: "#172126",
  navy: "#073B4C",
  teal: "#19B5A5",
  tealDark: "#148f83",
  orange: "#FF7A59",
  orangeDark: "#e06545",
  blue: "#006B7A",
  whatsapp: "#25D366",
  whatsappDark: "#20ba5a",
};

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ============ بيانات الوجهات ============
const destinations = [
  { name: "مرسى علم", image: "/images/destinations/marsa-alam.jpg", desc: "استمتع بأروع العطلات والرحلات البحرية والترفيهية." },
  { name: "الغردقة", image: "/images/destinations/hurghada-beach.jpg", desc: "استمتع بأروع العطلات والرحلات البحرية والترفيهية." },
  { name: "شرم الشيخ", image: "/images/destinations/sharm-night.jpg", desc: "استمتع بأروع العطلات والرحلات البحرية والترفيهية." },
  { name: "العين السخنة", image: "/images/destinations/sokhna-resort.jpg", desc: "استمتع بأروع العطلات والرحلات البحرية والترفيهية." },
  { name: "الأقصر وأسوان", image: "/images/destinations/luxor-aswan-nile.jpg", desc: "استمتع بأروع العطلات والرحلات البحرية والترفيهية." },
  { name: "مرسى مطروح", image: "/images/destinations/matrouh-ageeba.jpg", desc: "استمتع بأروع العطلات والرحلات البحرية والترفيهية." },
];

// ============ بيانات الرحلات المميزة ============
const featuredTrips = [
  {
    title: "رحلة شرم الشيخ - 4 أيام / 3 ليالي",
    image: "/images/destinations/sharm-night.jpg",
    price: "3,500 ج.م",
    duration: "4 أيام / 3 ليالي",
    features: ["شامل الإفطار والعشاء", "الانتقالات حديثة", "رحلة بحرية مجانية"],
    message: "مرحباً، أريد حجز رحلة شرم الشيخ (4 أيام / 3 ليالي).",
  },
  {
    title: "عطلة الغردقة الفاخرة - 5 أيام / 4 ليالي",
    image: "/images/destinations/hurghada-beach.jpg",
    price: "14,000 ج.م",
    duration: "5 أيام / 4 ليالي",
    features: ["إقامة شاملة All Inclusive", "فندق 4 نجوم على البحر", "دخول الغواصة المائية"],
    message: "مرحباً، أريد حجز عطلة الغردقة الفاخرة (5 أيام / 4 ليالي).",
  },
  {
    title: "سحر الأقصر وأسوان - 4 أيام",
    image: "/images/destinations/luxor-aswan-nile.jpg",
    price: "15,500 ج.م",
    duration: "4 أيام / 3 ليالي",
    features: ["مرشد سياحي مرافق", "جميع تذاكر المزارات", "الإقامة بفندق نيلي"],
    message: "مرحباً، أريد حجز رحلة الأقصر وأسوان (4 أيام).",
  },
];

// ============ آراء العملاء ============
const testimonials = [
  {
    name: "أحمد محمود",
    trip: "رحلة شرم الشيخ",
    text: "تجربة رائعة من الحجز لحد رجوعنا، كل حاجة كانت منظمة والفريق متعاون جداً.",
    rating: 5,
  },
  {
    name: "سارة عبد الله",
    trip: "عطلة الغردقة الفاخرة",
    text: "الفندق كان زي ما اتوصف بالظبط، والانتقالات كانت في المعاد من غير أي تأخير.",
    rating: 5,
  },
  {
    name: "محمد إبراهيم",
    trip: "رحلة الأقصر وأسوان",
    text: "المرشد السياحي كان محترف جداً وشرح تاريخي غني، تجربة تستاهل كل جنيه فيها.",
    rating: 5,
  },
];

// ============ Hook بسيط لظهور العناصر عند السكرول (بدون مكتبات خارجية) ============
function useInView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, isVisible } = useInView();
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  // حالات تخزين بيانات نموذج الحجز السريع
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('شرم الشيخ');
  const [phoneError, setPhoneError] = useState('');

  // حالة تغيير شكل الـ Header عند السكرول
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validateEgyptianPhone = (phone: string) => {
    // يقبل أرقام مصرية تبدأ بـ 01 ومكونة من 11 رقم، أو بصيغة دولية +20
    const cleaned = phone.replace(/\s|-/g, '');
    const pattern = /^(01[0125][0-9]{8}|(\+?20)1[0125][0-9]{8})$/;
    return pattern.test(cleaned);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEgyptianPhone(clientPhone)) {
      setPhoneError('من فضلك اكتب رقم هاتف مصري صحيح (مثال: 01012345678)');
      return;
    }
    setPhoneError('');

    const message = `مرحباً، أريد حجز رحلة عبر موقع بداية ترافيل.\nالاسم: ${clientName}\nرقم الهاتف: ${clientPhone}\nالوجهة المطلوبة: ${selectedDestination}`;
    window.open(buildWhatsAppUrl(message), '_blank');
  };

  return (
    <div
      className="min-h-screen font-[var(--font-cairo),sans-serif] relative"
      style={{ backgroundColor: COLORS.bg, color: COLORS.text }}
      dir="rtl"
    >
      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-lg py-2' : 'shadow-md py-4'
        }`}
        style={{ backgroundColor: COLORS.navy, color: 'white' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-wider flex items-center gap-2" dir="ltr">
            <span style={{ color: COLORS.teal }}>BEDAYA</span>
            <span className="text-white">TRAVEL</span>
          </div>
          <nav className="hidden md:flex gap-8 font-medium">
            <a href="#" className="hover:opacity-80 transition" style={{ color: 'inherit' }}>الرئيسية</a>
            <a href="#trips" className="hover:opacity-80 transition">الرحلات</a>
            <a href="#destinations" className="hover:opacity-80 transition">الوجهات</a>
            <a href="#about" className="hover:opacity-80 transition">من نحن</a>
            <a href="#testimonials" className="hover:opacity-80 transition">آراء العملاء</a>
            <a href="#booking" className="hover:opacity-80 transition">حجز سريع</a>
          </nav>
          <a
            href={buildWhatsAppUrl("مرحباً، أريد حجز رحلة عبر موقع بداية ترافيل.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full font-semibold transition shadow text-center hover:brightness-95"
            style={{ backgroundColor: COLORS.teal, color: 'white' }}
          >
            احجز رحلتك الآن
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative py-24 px-6 text-center overflow-hidden"
        style={{ backgroundColor: COLORS.blue, color: 'white' }}
      >
        <div className="max-w-4xl mx-auto z-10 relative">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight animate-[fadeIn_0.8s_ease-out]">
            رحلتك تبدأ هنا مع <span style={{ color: COLORS.orange }}>بداية ترافيل</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            استكشف أجمل الوجهات السياحية في مصر: شرم الشيخ، الغردقة، مرسى علم، والأقصر وأسوان بأفضل الأسعار.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="#trips"
              className="px-8 py-3 rounded-full font-bold text-lg transition shadow-lg hover:brightness-95"
              style={{ backgroundColor: COLORS.orange, color: 'white' }}
            >
              استعرض الرحلات
            </a>
            <a
              href={buildWhatsAppUrl("مرحباً، أود الاستفسار عن الرحلات المتاحة.")}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white hover:bg-white px-8 py-3 rounded-full font-bold text-lg transition inline-flex items-center justify-center"
              style={{ color: 'white' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.blue)}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
            >
              تواصل عبر واتساب
            </a>
          </div>
        </div>
      </section>

      {/* Featured Trips Section */}
      <section id="trips" className="py-16 px-6 max-w-7xl mx-auto">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ color: COLORS.navy }}>عروض الرحلات المميزة 🌟</h2>
            <p className="text-gray-600">اختر رحلتك القادمة واستمتع بأفضل العروض الحصرية بأسعار تنافسية.</p>
          </div>
        </FadeInSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTrips.map((trip, index) => (
            <FadeInSection key={index} delay={index * 120}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition border border-gray-100 flex flex-col justify-between h-full">
                <div>
                  <div className="h-52 relative w-full overflow-hidden">
                    <Image
                      src={trip.image}
                      alt={trip.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover hover:scale-105 transition duration-500"
                    />
                    <span
                      className="absolute top-4 right-4 text-white text-sm font-bold px-3 py-1 rounded-full shadow"
                      style={{ backgroundColor: COLORS.orange }}
                    >
                      {trip.duration}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.navy }}>{trip.title}</h3>
                    <ul className="text-gray-600 text-sm mb-6 space-y-2">
                      {trip.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span style={{ color: COLORS.teal }}>✓</span> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-4 flex items-center justify-between border-t border-gray-100 mt-4">
                  <div>
                    <span className="text-xs text-gray-500 block">يبدأ من</span>
                    <span className="text-xl font-extrabold" style={{ color: COLORS.blue }}>{trip.price}</span>
                  </div>
                  <a
                    href={buildWhatsAppUrl(trip.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white px-4 py-2 rounded-xl font-bold text-sm transition shadow hover:brightness-110"
                    style={{ backgroundColor: COLORS.navy }}
                  >
                    احجز الآن
                  </a>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-16 px-6 max-w-7xl mx-auto bg-white/50 rounded-3xl my-8">
        <FadeInSection>
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: COLORS.navy }}>
            أشهر الوجهات السياحية 🏝️
          </h2>
        </FadeInSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <FadeInSection key={index} delay={index * 80}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100 text-right h-full">
                <div className="h-48 relative w-full overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{dest.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{dest.desc}</p>
                  <a
                    href={buildWhatsAppUrl(`مرحباً، أود الاستفسار عن الرحلات المتاحة إلى ${dest.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:underline inline-block"
                    style={{ color: COLORS.blue }}
                  >
                    عرض الرحلات المتاحة ←
                  </a>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 px-6 max-w-5xl mx-auto text-center">
        <FadeInSection>
          <div className="bg-white p-10 rounded-3xl shadow-md border border-gray-100">
            <h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.navy }}>لماذا تختار "بداية ترافيل"؟ ✈️</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-8 max-w-3xl mx-auto">
              نحن لسنا مجرد شركة سياحية، بل شريكك الموثوق لتخطيط أجمل عطلات العمر في أروع السواحل والمعالم التاريخية بمصر. نهدف لتقديم تجربة سفر فخمة، مريحة، وبأسعار تنافسية تلبي تطلعاتك وتفوق توقعاتك.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
              <div className="p-6 rounded-2xl" style={{ backgroundColor: COLORS.bg }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: COLORS.navy }}>⭐ أسعار منافسة</h3>
                <p className="text-gray-600 text-sm">نقدم أفضل العروض والخصومات طوال العام لتناسب ميزانيتك.</p>
              </div>
              <div className="p-6 rounded-2xl" style={{ backgroundColor: COLORS.bg }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: COLORS.navy }}>🛡️ حجز آمن وموثوق</h3>
                <p className="text-gray-600 text-sm">متابعة دقيقة وتأكيد سريع لجميع حجوزات الفنادق والانتقالات.</p>
              </div>
              <div className="p-6 rounded-2xl" style={{ backgroundColor: COLORS.bg }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: COLORS.navy }}>💬 دعم على مدار الساعة</h3>
                <p className="text-gray-600 text-sm">فريق خدمة عملاء جاهز للإجابة على استفساراتك في أي وقت.</p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-6 max-w-7xl mx-auto">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ color: COLORS.navy }}>آراء عملائنا 💬</h2>
            <p className="text-gray-600">قصص حقيقية من عملاء استمتعوا برحلاتهم معنا.</p>
          </div>
        </FadeInSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <FadeInSection key={index} delay={index * 120}>
              <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 h-full flex flex-col justify-between">
                <div>
                  <div className="mb-3" style={{ color: COLORS.orange }}>
                    {"★".repeat(t.rating)}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">"{t.text}"</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-bold" style={{ color: COLORS.navy }}>{t.name}</p>
                  <p className="text-sm text-gray-500">{t.trip}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Quick Booking Form Section */}
      <section id="booking" className="py-16 px-6 max-w-3xl mx-auto">
        <FadeInSection>
          <div className="text-white p-10 rounded-3xl shadow-xl" style={{ backgroundColor: COLORS.navy }}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">احجز رحلتك فوراً 📝</h2>
              <p className="text-gray-200">سجل بياناتك وسنتواصل معك عبر الواتساب لتأكيد الحجز فوراً.</p>
            </div>
            <form onSubmit={handleBookingSubmit} className="space-y-6" noValidate>
              <div>
                <label className="block text-sm font-medium mb-2">الاسم الكامل</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="اكتب اسمك هنا..."
                  className="w-full px-4 py-3 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2"
                  style={{ boxShadow: 'none' }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${COLORS.teal}`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">رقم الهاتف (واتساب)</label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => {
                    setClientPhone(e.target.value);
                    if (phoneError) setPhoneError('');
                  }}
                  placeholder="مثال: 01012345678"
                  className="w-full px-4 py-3 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2"
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${COLORS.teal}`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                />
                {phoneError && (
                  <p className="text-sm mt-2" style={{ color: COLORS.orange }}>{phoneError}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">اختر الوجهة المطلوبة</label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2"
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${COLORS.teal}`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                >
                  <option value="شرم الشيخ">شرم الشيخ</option>
                  <option value="الغردقة">الغردقة</option>
                  <option value="مرسى علم">مرسى علم</option>
                  <option value="مرسى مطروح">مرسى مطروح</option>
                  <option value="الأقصر وأسوان">الأقصر وأسوان</option>
                  <option value="العين السخنة">العين السخنة</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full text-white py-4 rounded-xl font-bold text-lg transition shadow-lg hover:brightness-95"
                style={{ backgroundColor: COLORS.teal }}
              >
                إرسال طلب الحجز عبر واتساب 🚀
              </button>
            </form>
          </div>
        </FadeInSection>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href={buildWhatsAppUrl("مرحباً، أريد الاستفسار عن تفاصيل الرحلات المتاحة في بداية ترافيل.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 text-white p-4 rounded-full shadow-2xl transition duration-300 z-50 flex items-center justify-center text-3xl animate-bounce hover:brightness-95"
        style={{ backgroundColor: COLORS.whatsapp }}
        title="تواصل معنا عبر واتساب"
      >
        💬
      </a>

      {/* Footer */}
      <footer className="text-white py-8 text-center" style={{ backgroundColor: COLORS.navy }}>
        <p>© 2026 Bedaya Travel. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
