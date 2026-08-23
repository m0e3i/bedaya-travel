'use client';
import { useState } from 'react';
import Image from "next/image";

export default function Home() {
  const whatsappNumber = "201012794265"; // رقم الواتساب الخاص بك
  
  // حالات تخزين بيانات نموذج الحجز السريع
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('شرم الشيخ');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `مرحباً، أريد حجز رحلة عبر موقع بداية ترافيل.\nالاسم: ${clientName}\nرقم الهاتف: ${clientPhone}\nالوجهة المطلوبة: ${selectedDestination}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  
  // بيانات الوجهات السياحية الأساسية
  const destinations = [
    { name: "مرسى علم", image: "/images/destinations/marsa-alam.jpg", desc: "استمتع بأروع العطلات والرحلات البحرية والترفيهية." },
    { name: "الغردقة", image: "/images/destinations/hurghada-beach.jpg", desc: "استمتع بأروع العطلات والرحلات البحرية والترفيهية." },
    { name: "شرم الشيخ", image: "/images/destinations/sharm-night.jpg", desc: "استمتع بأروع العطلات والرحلات البحرية والترفيهية." },
    { name: "العين السخنة", image: "/images/destinations/sokhna-resort.jpg", desc: "استمتع بأروع العطلات والرحلات البحرية والترفيهية." },
    { name: "الأقصر وأسوان", image: "/images/destinations/luxor-aswan-nile.jpg", desc: "استمتع بأروع العطلات والرحلات البحرية والترفيهية." },
    { name: "مرسى مطروح", image: "/images/destinations/matrouh-ageeba.jpg", desc: "استمتع بأروع العطلات والرحلات البحرية والترفيهية." },
  ];

  // عروض الرحلات المميزة بأسعارها الحقيقية
  const featuredTrips = [
    {
      title: "رحلة شرم الشيخ - 4 أيام / 3 ليالي",
      image: "/images/destinations/sharm-night.jpg",
      price: "3,500 ج.م",
      duration: "4 أيام / 3 ليالي",
      features: ["شامل الإفطار والعشاء", "الانتقالات حديثة", "رحلة بحرية مجانية"],
      message: "مرحباً، أريد حجز رحلة شرم الشيخ (4 أيام / 3 ليالي)."
    },
    {
      title: "عطلة الغردقة الفاخرة - 5 أيام / 4 ليالي",
      image: "/images/destinations/hurghada-beach.jpg",
      price: "4,800 ج.م",
      duration: "5 أيام / 4 ليالي",
      features: ["إقامة شاملة All Inclusive", "فندق 4 نجوم على البحر", "دخول الغواصة المائية"],
      message: "مرحباً، أريد حجز عطلة الغردقة الفاخرة (5 أيام / 4 ليالي)."
    },
    {
      title: "سحر الأقصر وأسوان - 4 أيام",
      image: "/images/destinations/luxor-aswan-nile.jpg",
      price: "5,200 ج.م",
      duration: "4 أيام / 3 ليالي",
      features: ["مرشد سياحي مرافق", "جميع تذاكر المزارات", "الإقامة بفندق نيلي"],
      message: "مرحباً، أريد حجز رحلة الأقصر وأسوان (4 أيام)."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#172126] font-sans relative" dir="rtl">
      {/* Navbar */}
      <header className="bg-[#073B4C] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-wider flex items-center gap-2" dir="ltr">
            <span className="text-[#19B5A5]">BEDAYA</span>
            <span className="text-white">TRAVEL</span>
          </div>
          <nav className="hidden md:flex gap-8 font-medium">
            <a href="#" className="hover:text-[#19B5A5] transition">الرئيسية</a>
            <a href="#trips" className="hover:text-[#19B5A5] transition">الرحلات</a>
            <a href="#destinations" className="hover:text-[#19B5A5] transition">الوجهات</a>
            <a href="#about" className="hover:text-[#19B5A5] transition">من نحن</a>
            <a href="#booking" className="hover:text-[#19B5A5] transition">حجز سريع</a>
          </nav>
          <a 
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("مرحباً، أريد حجز رحلة عبر موقع بداية ترافيل.")}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#19B5A5] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#148f83] transition shadow text-center"
          >
            احجز رحلتك الآن
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-[#006B7A] text-white py-24 px-6 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto z-10 relative">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            رحلتك تبدأ هنا مع <span className="text-[#FF7A59]">بداية ترافيل</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            استكشف أجمل الوجهات السياحية في مصر: شرم الشيخ، الغردقة، مرسى علم، والأقصر وأسوان بأفضل الأسعار.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="#trips" className="bg-[#FF7A59] hover:bg-[#e06545] text-white px-8 py-3 rounded-full font-bold text-lg transition shadow-lg">
              استعرض الرحلات
            </a>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("مرحباً، أود الاستفسار عن الرحلات المتاحة.")}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-white hover:bg-white hover:text-[#006B7A] px-8 py-3 rounded-full font-bold text-lg transition inline-flex items-center justify-center"
            >
              تواصل عبر واتساب
            </a>
          </div>
        </div>
      </section>

      {/* Featured Trips Section */}
      <section id="trips" className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#073B4C] mb-3">عروض الرحلات المميزة 🌟</h2>
          <p className="text-gray-600">اختر رحلتك القادمة واستمتع بأفضل العروض الحصرية بأسعار تنافسية.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTrips.map((trip, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="h-52 relative w-full overflow-hidden">
                  <img 
                    src={trip.image} 
                    alt={trip.title} 
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-4 right-4 bg-[#FF7A59] text-white text-sm font-bold px-3 py-1 rounded-full shadow">
                    {trip.duration}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#073B4C]">{trip.title}</h3>
                  <ul className="text-gray-600 text-sm mb-6 space-y-2">
                    {trip.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-[#19B5A5]">✓</span> {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-gray-100 mt-4 pt-4">
                <div>
                  <span className="text-xs text-gray-500 block">يبدأ من</span>
                  <span className="text-xl font-extrabold text-[#006B7A]">{trip.price}</span>
                </div>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(trip.message)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#073B4C] hover:bg-[#006B7A] text-white px-4 py-2 rounded-xl font-bold text-sm transition shadow"
                >
                  احجز الآن
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-16 px-6 max-w-7xl mx-auto bg-white/50 rounded-3xl my-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#073B4C]">
          أشهر الوجهات السياحية 🏝️
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100 text-right">
              <div className="h-48 relative w-full overflow-hidden">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{dest.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{dest.desc}</p>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`مرحباً، أود الاستفسار عن الرحلات المتاحة إلى ${dest.name}.`)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#006B7A] font-bold hover:underline inline-block"
                >
                  عرض الرحلات المتاحة ←
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 px-6 max-w-5xl mx-auto text-center">
        <div className="bg-white p-10 rounded-3xl shadow-md border border-gray-100">
          <h2 className="text-3xl font-bold text-[#073B4C] mb-4">لماذا تختار "بداية ترافيل"؟ ✈️</h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-8 max-w-3xl mx-auto">
            نحن لسنا مجرد شركة سياحية، بل شريكك الموثوق لتخطيط أجمل عطلات العمر في أروع السواحل والمعالم التاريخية بمصر. نهدف لتقديم تجربة سفر فخمة، مريحة، وبأسعار تنافسية تلبي تطلعاتك وتفوق توقعاتك.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
            <div className="bg-[#F7F3EA] p-6 rounded-2xl">
              <h3 className="font-bold text-lg text-[#073B4C] mb-2">⭐ أسعار منافسة</h3>
              <p className="text-gray-600 text-sm">نقدم أفضل العروض والخصومات طوال العام لتناسب ميزانيتك.</p>
            </div>
            <div className="bg-[#F7F3EA] p-6 rounded-2xl">
              <h3 className="font-bold text-lg text-[#073B4C] mb-2">🛡️ حجز آمن وموثوق</h3>
              <p className="text-gray-600 text-sm">متابعة دقيقة وتأكيد سريع لجميع حجوزات الفنادق والانتقالات.</p>
            </div>
            <div className="bg-[#F7F3EA] p-6 rounded-2xl">
              <h3 className="font-bold text-lg text-[#073B4C] mb-2">💬 دعم على مدار الساعة</h3>
              <p className="text-gray-600 text-sm">فريق خدمة عملاء جاهز للإجابة على استفساراتك في أي وقت.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Booking Form Section */}
      <section id="booking" className="py-16 px-6 max-w-3xl mx-auto">
        <div className="bg-[#073B4C] text-white p-10 rounded-3xl shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">احجز رحلتك فوراً 📝</h2>
            <p className="text-gray-200">سجل بياناتك وسنتواصل معك عبر الواتساب لتأكيد الحجز فوراً.</p>
          </div>
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">الاسم الكامل</label>
              <input 
                type="text" 
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="اكتب اسمك هنا..." 
                className="w-full px-4 py-3 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#19B5A5]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">رقم الهاتف (واتساب)</label>
              <input 
                type="tel" 
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="اكتب رقم هاتفك..." 
                className="w-full px-4 py-3 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#19B5A5]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">اختر الوجهة المطلوبة</label>
              <select 
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#19B5A5]"
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
              className="w-full bg-[#19B5A5] hover:bg-[#148f83] text-white py-4 rounded-xl font-bold text-lg transition shadow-lg"
            >
              إرسال طلب الحجز عبر واتساب 🚀
            </button>
          </form>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("مرحباً، أريد الاستفسار عن تفاصيل الرحلات المتاحة في بداية ترافيل.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20ba5a] transition duration-300 z-50 flex items-center justify-center text-3xl animate-bounce"
        title="تواصل معنا عبر واتساب"
      >
        💬
      </a>

      {/* Footer */}
      <footer className="bg-[#073B4C] text-white py-8 text-center">
        <p>© 2026 Bedaya Travel. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}