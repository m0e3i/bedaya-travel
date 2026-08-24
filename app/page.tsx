'use client';
import { useState } from 'react';
import Image from "next/image";
import { SignInButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const whatsappNumber = "201222370381"; // رقم الواتساب المحدث الخاص بك
  const { isSignedIn, user } = useUser();
  
  // جعل الوجهات السياحية هي القسم الافتراضي الذي يظهر فور فتح الموقع
  const [activeTab, setActiveTab] = useState('destinations');
  
  // حالات تخزين بيانات نموذج الحجز السريع
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('شرم الشيخ (وجهة سياحية)');

  // 1. قائمة الرحلات المسجلة (تبدأ فارغة تماماً ولا تظهر إلا عند حجز رحلة فعلية)
  const [myBookedTrips, setMyBookedTrips] = useState<any[]>([]);

  // 2. قائمة المدفوعات والفواتير المرتبطة بالعميل
  const [paymentsList, setPaymentsList] = useState<any[]>([]);

  // محاكاة حجز رحلة جديدة وإضافتها لـ "رحلاتي" و "المدفوعات"
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTripId = Date.now();
    
    const newTrip = {
      id: newTripId,
      title: selectedDestination,
      date: "قريباً (سبتمبر 2026)",
      status: "بانتظار الدفع",
      price: selectedDestination.includes("الأقصر") ? "15,500 ج.م" : selectedDestination.includes("الغردقة") ? "14,000 ج.م" : "3,500 ج.م",
      image: selectedDestination.includes("الأقصر") ? "/images/destinations/luxor-aswan-nile.jpg" : selectedDestination.includes("الغردقة") ? "/images/destinations/hurghada-beach.jpg" : "/images/destinations/sharm-night.jpg"
    };

    // إضافة الرحلة لرحلاتي
    setMyBookedTrips(prev => [...prev, newTrip]);

    // إضافة الفواتير لقسم المدفوعات
    setPaymentsList(prev => [...prev, {
      id: newTripId,
      tripTitle: selectedDestination,
      amount: newTrip.price,
      status: "غير مدفوعة (تتطلب الدفع الإلكتروني)"
    }]);

    // فتح واتساب للتواصل السريع أيضاً
    const message = `مرحباً، أريد تأكيد حجز رحلة: ${selectedDestination}.\nالاسم: ${clientName}\nرقم الهاتف: ${clientPhone}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    // تحويل المستخدم تلقائياً لقسم "رحلاتي" لرؤية رحلته الجديدة
    setActiveTab('my-trips');
  };

  // محاكاة الدفع عبر بوابة الدفع الإلكتروني (Paymob / Stripe)
  const handleOnlinePayment = (paymentId: number, tripTitle: string) => {
    alert(`جاري توجيهك إلى بوابة الدفع الآمنة لسداد قيمة رحلة: ${tripTitle}...`);
    
    // تحديث حالة المدفوعات والرحلة لتصبح "مدفوعة ومؤكدة"
    setPaymentsList(prev => prev.map(p => p.id === paymentId ? { ...p, status: "تم الدفع بنجاح ✅" } : p));
    setMyBookedTrips(prev => prev.map(t => t.id === paymentId ? { ...t, status: "مؤكدة ومدفوعة 🌟" } : t));
    
    setActiveTab('my-trips');
  };
  
  // بيانات الوجهات السياحية الأساسية
  const destinations = [
    { name: "شرم الشيخ", image: "/images/destinations/sharm-night.jpg", desc: "استمتع بأروع العطلات والرحلات البحرية والترفيهية." },
    { name: "الغردقة", image: "/images/destinations/hurghada-beach.jpg", desc: "استمتع بأروع العطلات والرحلات البحرية والترفيهية." },
    { name: "مرسى علم", image: "/images/destinations/marsa-alam.jpg", desc: "استمتع بأروع العطلات والرحلات البحرية والترفيهية." },
    { name: "العين السخنة", image: "/images/destinations/sokhna-resort.jpg", desc: "استمتع بأروع العطلات والرحلات البحرية والترفيهية." },
    { name: "الأقصر وأسوان", image: "/images/destinations/luxor-aswan-nile.jpg", desc: "استمتع بأروع العطلات والرحلات البحرية والترفيهية." },
    { name: "مرسى مطروح", image: "/images/destinations/matrouh-ageeba.jpg", desc: "استمتع بأروع العطلات والرحلات البحرية والترفيهية." },
  ];

  // قسم عروض الرحلات المميزة
  const featuredTrips = [
    {
      title: "رحلة شرم الشيخ - 4 أيام / 3 ليالي",
      image: "/images/destinations/sharm-night.jpg",
      price: "3,500 ج.م",
      duration: "4 أيام / 3 ليالي",
      features: ["شامل الإفطار والعشاء", "الانتقالات حديثة", "رحلة بحرية مجانية"],
    },
    {
      title: "عطلة الغردقة الفاخرة - 5 أيام / 4 ليالي",
      image: "/images/destinations/hurghada-beach.jpg",
      price: "14,000 ج.م",
      duration: "5 أيام / 4 ليالي",
      features: ["إقامة شاملة All Inclusive", "فندق 4 نجوم على البحر", "دخول الغواصة المائية"],
    },
    {
      title: "سحر الأقصر وأسوان - 4 أيام",
      image: "/images/destinations/luxor-aswan-nile.jpg",
      price: "15,500 ج.م",
      duration: "4 أيام / 3 ليالي",
      features: ["مرشد سياحي مرافق", "جميع تذاكر المزارات", "الإقامة بفندق نيلي"],
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#172126] font-sans relative" dir="rtl">
      {/* Navbar */}
      <header className="bg-[#073B4C] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold tracking-wider flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('destinations')} dir="ltr">
            <span className="text-[#19B5A5]">BEDAYA</span>
            <span className="text-white">TRAVEL</span>
          </div>
          
          <nav className="hidden md:flex gap-4 lg:gap-6 font-medium text-sm lg:text-base">
            <button onClick={() => setActiveTab('destinations')} className={`transition pb-1 ${activeTab === 'destinations' ? 'text-[#19B5A5] border-b-2 border-[#19B5A5] font-bold' : 'hover:text-[#19B5A5]'}`}>
              الوجهات السياحية
            </button>
            <button onClick={() => setActiveTab('trips')} className={`transition pb-1 ${activeTab === 'trips' ? 'text-[#19B5A5] border-b-2 border-[#19B5A5] font-bold' : 'hover:text-[#19B5A5]'}`}>
              عروض الرحلات المميزة
            </button>
            <button onClick={() => setActiveTab('my-trips')} className={`transition pb-1 ${activeTab === 'my-trips' ? 'text-[#19B5A5] border-b-2 border-[#19B5A5] font-bold' : 'hover:text-[#19B5A5]'}`}>
              رحلاتي ✈️
            </button>
            <button onClick={() => setActiveTab('payments')} className={`transition pb-1 ${activeTab === 'payments' ? 'text-[#19B5A5] border-b-2 border-[#19B5A5] font-bold' : 'hover:text-[#19B5A5]'}`}>
              المدفوعات 💳
            </button>
            <button onClick={() => setActiveTab('booking')} className={`transition pb-1 ${activeTab === 'booking' ? 'text-[#19B5A5] border-b-2 border-[#19B5A5] font-bold' : 'hover:text-[#19B5A5]'}`}>
              حجز سريع
            </button>
            <button onClick={() => setActiveTab('about')} className={`transition pb-1 ${activeTab === 'about' ? 'text-[#19B5A5] border-b-2 border-[#19B5A5] font-bold' : 'hover:text-[#19B5A5]'}`}>
              من نحن
            </button>
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
      <section className="relative bg-[#006B7A] text-white py-12 sm:py-16 px-4 sm:px-6 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto z-10 relative">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            رحلتك تبدأ هنا مع <span className="text-[#FF7A59]">بداية ترافيل</span>
          </h1>
          <p className="text-sm sm:text-lg text-gray-200 mb-6 leading-relaxed">
            استكشف أجمل الوجهات السياحية وعروض الأسعار الحصرية في مصر بأسهل طرق الدفع والحجز.
          </p>
          
          <div className="flex justify-center gap-3 flex-wrap">
            <button onClick={() => setActiveTab('destinations')} className={`px-5 py-2.5 rounded-full font-bold text-sm transition shadow ${activeTab === 'destinations' ? 'bg-[#FF7A59] text-white' : 'bg-white/20 hover:bg-white/30 text-white'}`}>
              🏝️ أشهر الوجهات السياحية
            </button>
            <button onClick={() => setActiveTab('trips')} className={`px-5 py-2.5 rounded-full font-bold text-sm transition shadow ${activeTab === 'trips' ? 'bg-[#FF7A59] text-white' : 'bg-white/20 hover:bg-white/30 text-white'}`}>
              🌟 عروض الرحلات المميزة
            </button>
            <button onClick={() => setActiveTab('my-trips')} className={`px-5 py-2.5 rounded-full font-bold text-sm transition shadow ${activeTab === 'my-trips' ? 'bg-[#FF7A59] text-white' : 'bg-white/20 hover:bg-white/30 text-white'}`}>
              ✈️ رحلاتي المسجلة
            </button>
            <button onClick={() => setActiveTab('payments')} className={`px-5 py-2.5 rounded-full font-bold text-sm transition shadow ${activeTab === 'payments' ? 'bg-[#FF7A59] text-white' : 'bg-white/20 hover:bg-white/30 text-white'}`}>
              💳 قسم المدفوعات
            </button>
          </div>
        </div>
      </section>

      {/* Main Dynamic Content Area */}
      <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto min-h-[500px]">
        
        {/* 1. قسم الوجهات السياحية (الافتراضي عند فتح الموقع) */}
        {activeTab === 'destinations' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#073B4C] mb-3">
                أشهر الوجهات السياحية 🏝️
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">استكشف أجمل المدن والمعالم السياحية في مصر واختر وجهتك المفضلة.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {destinations.map((dest, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100 text-right flex flex-col justify-between">
                  <div className="h-44 sm:h-48 relative w-full overflow-hidden">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                  </div>
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#073B4C]">{dest.name}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed">{dest.desc}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedDestination(`${dest.name} (وجهة سياحية)`);
                        setActiveTab('booking');
                      }}
                      className="bg-[#073B4C] hover:bg-[#006B7A] text-white w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow text-center"
                    >
                      احجز رحلة إلى {dest.name} ←
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. قسم عروض الرحلات المميزة */}
        {activeTab === 'trips' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#073B4C] mb-3">عروض الرحلات المميزة 🌟</h2>
              <p className="text-gray-600 text-sm sm:text-base">اختر رحلتك القادمة من أفضل العروض المصممة خصيصاً لراحتك وميزانيتك.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTrips.map((trip, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition border border-gray-100 flex flex-col justify-between">
                  <div>
                    <div className="h-48 sm:h-52 relative w-full overflow-hidden">
                      <img src={trip.image} alt={trip.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
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
                    <button 
                      onClick={() => {
                        setSelectedDestination(trip.title);
                        setActiveTab('booking');
                      }}
                      className="bg-[#073B4C] hover:bg-[#006B7A] text-white px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition shadow"
                    >
                      احجز العرض الآن
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. قسم رحلاتي */}
        {activeTab === 'my-trips' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-gray-200 animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#073B4C] mb-2">رحلاتي المسجلة ✈️</h2>
              <p className="text-gray-600 text-sm sm:text-base">هنا تجد كافة الرحلات والحجوزات التي قمت بها معنا بكل سهولة.</p>
            </div>

            {myBookedTrips.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="text-5xl mb-4">🧳</div>
                <p className="text-lg font-bold text-[#073B4C] mb-2">ليس لديك أي رحلات مسجلة حتى الآن.</p>
                <p className="text-sm text-gray-500 mb-6">عند حجز أي رحلة أو عرض معنا، ستظهر تفاصيلها وحالتها هنا مباشرة!</p>
                <button onClick={() => setActiveTab('destinations')} className="bg-[#19B5A5] hover:bg-[#148f83] text-white px-6 py-3 rounded-xl font-bold text-sm transition shadow">
                  تصفح الوجهات السياحية واحجز رحلتك الأولى 🌟
                </button>
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
                      <p className="text-xs font-bold text-[#19B5A5] mb-2">💰 التكلفة: {myTrip.price}</p>
                      <p className="text-xs font-semibold text-[#FF7A59] mb-4">📌 الحالة: {myTrip.status}</p>
                    </div>
                    <div className="space-y-2">
                      <button 
                        onClick={() => setActiveTab('payments')}
                        className="w-full bg-[#19B5A5] text-white text-center py-2 rounded-xl text-xs sm:text-sm font-bold hover:bg-[#148f83] transition"
                      >
                        الذهاب لقسم المدفوعات ودفع القيمة 💳
                      </button>
                      <a 
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`مرحباً، أود الاستفسار وتأكيد تفاصيل حجز رحلتي: ${myTrip.title}`)}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full bg-[#073B4C] text-white text-center py-2 rounded-xl text-xs sm:text-sm font-bold hover:bg-[#006B7A] transition"
                      >
                        متابعة الحجز عبر واتساب 💬
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. قسم المدفوعات وبوابة الدفع */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-gray-200 animate-fadeIn max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#073B4C] mb-2">قسم المدفوعات والفواتير 💳</h2>
              <p className="text-gray-600 text-sm sm:text-base">سدد قيمة رحلاتك بأمان تام عبر بوابة الدفع الإلكتروني المعتمدة.</p>
            </div>

            {paymentsList.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg font-medium mb-4">لا توجد فواتير أو مدفوعات معلقة حالياً.</p>
                <button onClick={() => setActiveTab('destinations')} className="bg-[#073B4C] text-white px-6 py-3 rounded-xl font-bold text-sm">
                  اختر وجهتك أو رحلتك لإنشاء فاتورة ودفعها
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {paymentsList.map((payment) => (
                  <div key={payment.id} className="bg-[#F7F3EA] p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 border border-gray-200">
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-[#073B4C]">{payment.tripTitle}</h3>
                      <p className="text-sm text-gray-600 mt-1">المبلغ المطلوب: <span className="font-extrabold text-[#006B7A]">{payment.amount}</span></p>
                      <p className="text-xs font-bold text-amber-600 mt-1">الحالة: {payment.status}</p>
                    </div>
                    
                    <div>
                      {payment.status.includes("تم الدفع") ? (
                        <span className="bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm inline-block shadow">
                          مدفوعة بنجاح ✔️
                        </span>
                      ) : (
                        <button 
                          onClick={() => handleOnlinePayment(payment.id, payment.tripTitle)}
                          className="bg-[#FF7A59] hover:bg-[#e06545] text-white px-6 py-3 rounded-xl font-bold text-sm transition shadow-lg flex items-center gap-2"
                        >
                          <span>الدفع عبر بوابة الدفع الإلكتروني</span>
                          <span>🔒</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 5. قسم الحجز السريع */}
        {activeTab === 'booking' && (
          <div className="max-w-3xl mx-auto animate-fadeIn">
            <div className="bg-[#073B4C] text-white p-6 sm:p-10 rounded-3xl shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">حجز سريع وإصدار الفاتورة 💳</h2>
                <p className="text-gray-200 text-sm sm:text-base">سجل بياناتك لإضافة الرحلة لقسم "رحلاتي" وقسم "المدفوعات" فوراً.</p>
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
                  <label className="block text-sm font-medium mb-2">رقم الهاتف (واتساب للتواصل وتأكيد الحجز)</label>
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
                    <option value="شرم الشيخ (وجهة سياحية)">شرم الشيخ (وجهة سياحية)</option>
                    <option value="الغردقة (وجهة سياحية)">الغردقة (وجهة سياحية)</option>
                    <option value="مرسى علم (وجهة سياحية)">مرسى علم (وجهة سياحية)</option>
                    <option value="العين السخنة (وجهة سياحية)">العين السخنة (وجهة سياحية)</option>
                    <option value="الأقصر وأسوان (وجهة سياحية)">الأقصر وأسوان (وجهة سياحية)</option>
                    <option value="مرسى مطروح (وجهة سياحية)">مرسى مطروح (وجهة سياحية)</option>
                    <option value="سحر الأقصر وأسوان - 4 أيام (عرض)">سحر الأقصر وأسوان - 4 أيام (عرض)</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-[#19B5A5] hover:bg-[#148f83] text-white py-4 rounded-xl font-bold text-base sm:text-lg transition shadow-lg"
                >
                  تأكيد الحجز وإضافتها لـ "رحلاتي" والمدفوعات 🚀
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 6. قسم من نحن */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto text-center bg-white p-6 sm:p-10 rounded-3xl shadow-md border border-gray-100 animate-fadeIn">
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
        )}

      </main>

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
      <footer className="bg-[#073B4C] text-white py-8 text-center text-sm mt-12">
        <p>© 2026 Bedaya Travel. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}