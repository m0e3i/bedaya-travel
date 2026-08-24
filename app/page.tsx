'use client';
import { useState } from 'react';
import Image from "next/image";
import { SignInButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const whatsappNumber = "201222370381"; // رقم الواتساب المحدث الخاص بك
  const { isSignedIn, user } = useUser();
  
  // حالات تخزين بيانات نموذج الحجز السريع
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('شرم الشيخ');

  // قائمة الرحلات المحجوزة للمستخدم (محاكاة أو تجريبية تظهر في قسم رحلاتي)
  const [myBookedTrips, setMyBookedTrips] = useState([
    {
      id: 1,
      title: "رحلة شرم الشيخ - 4 أيام / 3 ليالي",
      date: "15 سبتمبر 2026",
      status: "مؤكدة ومدفوعة",
      image: "/images/destinations/sharm-night.jpg"
    }
  ]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `مرحباً، أريد حجز رحلة ودفع قيمتها عبر موقع بداية ترافيل.\nالاسم: ${clientName}\nرقم الهاتف: ${clientPhone}\nالوجهة أو العرض المطلوب: ${selectedDestination}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    // إضافة الرحلة تلقائياً لقسم "رحلاتي" كتجربة تفاعلية فورية
    setMyBookedTrips(prev => [
      ...prev,
      {
        id: Date.now(),
        title: selectedDestination,
        date: "قريباً في 2026",
        status: "قيد التأكيد والدفع",
        image: "/images/destinations/sharm-night.jpg"
      }
    ]);
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

  // قسم عروض الرحلات المميزة (مرتبة حسب الصورة المرسلة: الأقصر، الغردقة، شرم الشيخ)
  const featuredTrips = [
    {
      title: "سحر الأقصر وأسوان - 4 أيام",
      image: "/images/destinations/luxor-aswan-nile.jpg",
      price: "15,500 ج.م",
      duration: "4 أيام / 3 ليالي",
      features: ["مرشد سياحي مرافق", "جميع تذاكر المزارات", "الإقامة بفندق نيلي"],
      message: "مرحباً، أريد حجز وعرض رحلة الأقصر وأسوان (4 أيام)."
    },
    {
      title: "عطلة الغردقة الفاخرة - 5 أيام / 4 ليالي",
      image: "/images/destinations/hurghada-beach.jpg",
      price: "14,000 ج.م",
      duration: "5 أيام / 4 ليالي",
      features: ["إقامة شاملة All Inclusive", "فندق 4 نجوم على البحر", "دخول الغواصة المائية"],
      message: "مرحباً، أريد حجز وعرض عطلة الغردقة الفاخرة (5 أيام / 4 ليالي)."
    },
    {
      title: "رحلة شرم الشيخ - 4 أيام / 3 ليالي",
      image: "/images/destinations/sharm-night.jpg",
      price: "3,500 ج.م",
      duration: "4 أيام / 3 ليالي",
      features: ["شامل الإفطار والعشاء", "الانتقالات حديثة", "رحلة بحرية مجانية"],
      message: "مرحباً، أريد حجز وعرض رحلة شرم الشيخ (4 أيام / 3 ليالي)."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#172126] font-sans relative" dir="rtl">
      {/* Navbar */}
      <header className="bg-[#073B4C] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold tracking-wider flex items-center gap-2" dir="ltr">
            <span className="text-[#19B5A5]">BEDAYA</span>
            <span className="text-white">TRAVEL</span>
          </div>
          <nav className="hidden md:flex gap-6 lg:gap-8 font-medium text-sm lg:text-base">
            <a href="#" className="hover:text-[#19B5A5] transition">الرئيسية</a>
            <a href="#trips" className="hover:text-[#19B5A5] transition">العروض</a>
            <a href="#my-trips" className="hover:text-[#19B5A5] transition text-[#19B5A5] font-bold">رحلاتي ✈️</a>
            <a href="#destinations" className="hover:text-[#19B5A5] transition">الوجهات</a>
            <a href="#about" className="hover:text-[#19B5A5] transition">من نحن</a>
            <a href="#payment-booking" className="hover:text-[#19B5A5] transition">الدفع والحجز</a>
          </nav>
          
          <div className="flex items-center gap-2 sm:gap-3">
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className="bg-slate-800 hover:bg-slate-700 text-white border border-[#19B5A5] px-3 sm:px-4 py-2 rounded-full font-semibold transition text-xs sm:text-sm">
                  تسجيل الدخول
                </button>
              </SignInButton>
            ) : (
              <span className="text-xs sm:text-sm bg-[#19B5A5]/20 text-[#19B5A5] px-3 py-1 rounded-full font-bold">
                أهلاً، {user?.firstName || 'مسافر'}
              </span>
            )}

            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("مرحباً، أريد حجز رحلة عبر موقع بداية ترافيل.")}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#19B5A5] text-white px-3 sm:px-5 py-2 rounded-full font-semibold hover:bg-[#148f83] transition shadow text-center text-xs sm:text-sm"
            >
              احجز الآن
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-[#006B7A] text-white py-16 sm:py-24 px-4 sm:px-6 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto z-10 relative">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            رحلتك تبدأ هنا مع <span className="text-[#FF7A59]">بداية ترافيل</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-200 mb-8 leading-relaxed">
            استكشف أجمل الوجهات السياحية وعروض الأسعار الحصرية في مصر بأسهل طرق الدفع والحجز.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="#trips" className="bg-[#FF7A59] hover:bg-[#e06545] text-white px-6 sm:px-8 py-3 rounded-full font-bold text-base sm:text-lg transition shadow-lg">
              استعرض العروض 🌟
            </a>
            <a href="#my-trips" className="bg-white text-[#006B7A] hover:bg-gray-100 px-6 sm:px-8 py-3 rounded-full font-bold text-base sm:text-lg transition shadow-lg">
              عرض رحلاتي ✈️
            </a>
          </div>
        </div>
      </section>

      {/* Featured Trips (قسم العروض المميزة بالترتيب المطلوب) */}
      <section id="trips" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#073B4C] mb-3">عروض الرحلات المميزة 🌟</h2>
          <p className="text-gray-600 text-sm sm:text-base">اختر رحلتك القادمة من أفضل العروض المصممة خصيصاً لراحتك وميزانيتك.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTrips.map((trip, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="h-48 sm:h-52 relative w-full overflow-hidden">
                  <img 
                    src={trip.image} 
                    alt={trip.title} 
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-4 right-4 bg-[#FF7A59] text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow">
                    {trip.duration}
                  </span>
                </div>
                <div className="p-5 sm:p-6 text-right">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 text-[#073B4C]">{trip.title}</h3>
                  <ul className="text-gray-600 text-xs sm:text-sm mb-6 space-y-2">
                    {trip.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-[#19B5A5]">✓</span> {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="px-5 sm:px-6 pb-6 pt-0 flex items-center justify-between border-t border-gray-100 mt-4 pt-4">
                <div>
                  <span className="text-xs text-gray-500 block">يبدأ من</span>
                  <span className="text-lg sm:text-xl font-extrabold text-[#006B7A]">{trip.price}</span>
                </div>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(trip.message)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#073B4C] hover:bg-[#006B7A] text-white px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition shadow"
                >
                  احجز العرض الآن
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* My Trips Section (قسم رحلاتي - الجديد) */}
      <section id="my-trips" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto bg-white rounded-3xl my-8 shadow-sm border border-gray-200">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#073B4C] mb-2">رحلاتي المسجلة ✈️</h2>
          <p className="text-gray-600 text-sm sm:text-base">هنا تجد كافة الرحلات والحجوزات التي قمت بها معنا بكل سهولة.</p>
        </div>

        {myBookedTrips.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-4">ليس لديك أي رحلات مسجلة حتى الآن.</p>
            <a href="#trips" className="bg-[#19B5A5] text-white px-6 py-3 rounded-xl font-bold text-sm inline-block">
              تصفح العروض واحجز رحلتك الأولى
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBookedTrips.map((myTrip) => (
              <div key={myTrip.id} className="bg-[#F7F3EA] rounded-2xl p-5 border border-gray-200 shadow flex flex-col justify-between">
                <div>
                  <div className="h-36 relative w-full overflow-hidden rounded-xl mb-4">
                    <img src={myTrip.image} alt={myTrip.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-lg text-[#073B4C] mb-2">{myTrip.title}</h3>
                  <p className="text-xs text-gray-600 mb-1">📅 موعد الرحلة: {myTrip.date}</p>
                  <p className="text-xs font-semibold text-[#19B5A5] mb-4">📌 الحالة: {myTrip.status}</p>
                </div>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`مرحباً، أود الاستفسار وتأكيد تفاصيل حجز رحلتي: ${myTrip.title}`)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#073B4C] text-white text-center py-2 rounded-xl text-xs sm:text-sm font-bold hover:bg-[#006B7A] transition"
                >
                  متابعة تفاصيل الحجز عبر واتساب
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto bg-white/50 rounded-3xl my-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-[#073B4C]">
          أشهر الوجهات السياحية 🏝️
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {destinations.map((dest, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100 text-right">
              <div className="h-44 sm:h-48 relative w-full overflow-hidden">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2">{dest.name}</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed">{dest.desc}</p>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`مرحباً، أود الاستفسار عن الرحلات المتاحة والدفع إلى ${dest.name}.`)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#006B7A] font-bold hover:underline text-xs sm:text-sm inline-block"
                >
                  عرض رحلات وجهة {dest.name} ←
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment & Booking Section (قسم الدفع والحجز المتكامل) */}
      <section id="payment-booking" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="bg-[#073B4C] text-white p-6 sm:p-10 rounded-3xl shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">حجز سريع وطرق الدفع الآمنة 💳</h2>
            <p className="text-gray-200 text-sm sm:text-base">سجل بياناتك لاختيار العرض أو الوجهة، وسنتواصل معك فوراً لتأكيد الدفع وإتمام الحجز.</p>
          </div>

          {/* معلومات الدفع المبسطة */}
          <div className="bg-[#006B7A]/60 p-4 sm:p-6 rounded-2xl mb-8 border border-[#19B5A5]/30">
            <h3 className="font-bold text-base sm:text-lg mb-2 text-[#19B5A5]">طرق الدفع المتاحة:</h3>
            <ul className="text-xs sm:text-sm text-gray-200 space-y-1">
              <li>• التحويل اللحظي عبر المحافظ الإلكترونية (فودافون كاش، إنستاباي).</li>
              <li>• التحويل البنكي المباشر لحساب الشركة.</li>
              <li>• الدفع النقدي في مقر الشركة أو عبر مندوبنا المعتمد.</li>
            </ul>
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
                className="w-full px-4 py-3 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#19B5A5] text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">رقم الهاتف (واتساب للتواصل وتأكيد الدفع)</label>
              <input 
                type="tel" 
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="اكتب رقم هاتفك..." 
                className="w-full px-4 py-3 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#19B5A5] text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">اختر العرض أو الوجهة المطلوبة</label>
              <select 
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#19B5A5] text-sm sm:text-base"
              >
                <option value="سحر الأقصر وأسوان - 4 أيام">سحر الأقصر وأسوان - 4 أيام (15,500 ج.م)</option>
                <option value="عطلة الغردقة الفاخرة - 5 أيام">عطلة الغردقة الفاخرة - 5 أيام (14,000 ج.م)</option>
                <option value="رحلة شرم الشيخ - 4 أيام">رحلة شرم الشيخ - 4 أيام (3,500 ج.م)</option>
                <option value="شرم الشيخ (وجهة عامة)">شرم الشيخ (وجهة عامة)</option>
                <option value="الغردقة (وجهة عامة)">الغردقة (وجهة عامة)</option>
                <option value="مرسى علم (وجهة عامة)">مرسى علم (وجهة عامة)</option>
                <option value="مرسى مطروح (وجهة عامة)">مرسى مطروح (وجهة عامة)</option>
                <option value="العين السخنة (وجهة عامة)">العين السخنة (وجهة عامة)</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="w-full bg-[#19B5A5] hover:bg-[#148f83] text-white py-4 rounded-xl font-bold text-base sm:text-lg transition shadow-lg"
            >
              تأكيد الطلب وبدء الدفع عبر واتساب وإضافتها لـ "رحلاتي" 🚀
            </button>
          </form>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-md border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#073B4C] mb-4">لماذا تختار "بداية ترافيل"؟ ✈️</h2>
          <p className="text-gray-600 leading-relaxed text-base sm:text-lg mb-8 max-w-3xl mx-auto">
            نحن لسنا مجرد شركة سياحية، بل شريكك الموثوق لتخطيط أجمل عطلات العمر في أروع السواحل والمعالم التاريخية بمصر بأسعار تنافسية وطرق دفع سهلة وآمنة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-right">
            <div className="bg-[#F7F3EA] p-5 sm:p-6 rounded-2xl">
              <h3 className="font-bold text-base sm:text-lg text-[#073B4C] mb-2">⭐ أسعار منافسة</h3>
              <p className="text-gray-600 text-xs sm:text-sm">نقدم أفضل العروض والخصومات طوال العام لتناسب ميزانيتك.</p>
            </div>
            <div className="bg-[#F7F3EA] p-5 sm:p-6 rounded-2xl">
              <h3 className="font-bold text-base sm:text-lg text-[#073B4C] mb-2">🛡️ حجز ودفع آمن</h3>
              <p className="text-gray-600 text-xs sm:text-sm">طرق دفع متعددة وموثوقة مع تأكيد سريع وفوري للحجوزات.</p>
            </div>
            <div className="bg-[#F7F3EA] p-5 sm:p-6 rounded-2xl">
              <h3 className="font-bold text-base sm:text-lg text-[#073B4C] mb-2">💬 دعم على مدار الساعة</h3>
              <p className="text-gray-600 text-xs sm:text-sm">فريق خدمة عملاء جاهز للإجابة على استفساراتك في أي وقت.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("مرحباً، أريد الاستفسار عن تفاصيل العروض والرحلات والدفع في بداية ترافيل.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-[#25D366] text-white p-3 sm:p-4 rounded-full shadow-2xl hover:bg-[#20ba5a] transition duration-300 z-50 flex items-center justify-center text-2xl sm:text-3xl animate-bounce"
        title="تواصل معنا عبر واتساب"
      >
        💬
      </a>

      {/* Footer */}
      <footer className="bg-[#073B4C] text-white py-8 text-center text-sm">
        <p>© 2026 Bedaya Travel. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}