import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#0b1120] text-white font-sans">
      {/* Header / Navbar */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-wider text-[#2dd4bf]">BEDAYA TRAVEL</h1>
        
        <nav className="hidden md:flex space-x-6 space-x-reverse text-sm">
          <a href="#" className="hover:text-[#2dd4bf] transition">الرئيسية</a>
          <a href="#destinations" className="hover:text-[#2dd4bf] transition">الوجهات</a>
          <a href="#trips" className="hover:text-[#2dd4bf] transition">الرحلات</a>
          <a href="#contact" className="hover:text-[#2dd4bf] transition">حجز سريع</a>
        </nav>

        {/* زر تسجيل الدخول */}
        <div className="flex items-center">
          <SignInButton mode="modal">
            <button className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-white px-4 py-2 rounded-lg text-sm transition font-medium">
              تسجيل الدخول
            </button>
          </SignInButton>
        </div>
      </header>

      {/* Hero / Offers Section */}
      <section id="trips" className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-[#2dd4bf]">عروض الرحلات المميزة</h2>
          <p className="text-slate-300">اختر رحلتك القادمة و استمتع بأفضل الأسعار مع بداية تراويل السياحية.</p>
        </div>

        {/* Trips Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Trip 1 */}
          <div className="bg-[#172033] rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
            <div className="h-48 bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
              شرم الشيخ والسلاحف
            </div>
            <div className="p-5 space-y-3">
              <h3 className="font-bold text-xl">رحلة شرم الشيخ - 4 أيام / 3 ليالي</h3>
              <p className="text-slate-400 text-sm">استمتع بسحر البحر الأحمر والشعاب المرجانية.</p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <span className="text-[#2dd4bf] font-bold text-lg">3,500 ج.م</span>
                <button className="bg-[#2dd4bf] text-slate-900 font-bold px-4 py-2 rounded-lg text-sm hover:bg-teal-400 transition">احجز الآن</button>
              </div>
            </div>
          </div>

          {/* Trip 2 */}
          <div className="bg-[#172033] rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              الغردقة و السفاري
            </div>
            <div className="p-5 space-y-3">
              <h3 className="font-bold text-xl">عطلة الغردقة الفاخرة - 5 أيام / 4 ليالي</h3>
              <p className="text-slate-400 text-sm">رحلات سفاري وأنشطة بحرية لا تُنسى.</p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <span className="text-[#2dd4bf] font-bold text-lg">14,000 ج.م</span>
                <button className="bg-[#2dd4bf] text-slate-900 font-bold px-4 py-2 rounded-lg text-sm hover:bg-teal-400 transition">احجز الآن</button>
              </div>
            </div>
          </div>

          {/* Trip 3 */}
          <div className="bg-[#172033] rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
            <div className="h-48 bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
              الأقصر وأسوان
            </div>
            <div className="p-5 space-y-3">
              <h3 className="font-bold text-xl">سحر الأقصر وأسوان - 4 أيام</h3>
              <p className="text-slate-400 text-sm">عراقة التاريخ المصري القديم على ضفاف النيل.</p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <span className="text-[#2dd4bf] font-bold text-lg">15,500 ج.م</span>
                <button className="bg-[#2dd4bf] text-slate-900 font-bold px-4 py-2 rounded-lg text-sm hover:bg-teal-400 transition">احجز الآن</button>
              </div>
            </div>
          </div>
        </div>

        {/* Destinations Section */}
        <div id="destinations" className="mb-20">
          <h3 className="text-2xl font-bold mb-8 text-center text-[#2dd4bf]">أشهر الوجهات السياحية 🌴</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#172033] rounded-xl p-4 border border-slate-800">
              <div className="h-40 bg-slate-800 rounded-lg mb-4 flex items-center justify-center text-slate-400 font-semibold">شرم الشيخ</div>
              <h4 className="font-bold text-lg">شرم الشيخ</h4>
              <p className="text-slate-400 text-sm mt-1">استمتع بسحر البحر الأحمر والرحلات البحرية وبيت دلافين.</p>
            </div>
            <div className="bg-[#172033] rounded-xl p-4 border border-slate-800">
              <div className="h-40 bg-slate-800 rounded-lg mb-4 flex items-center justify-center text-slate-400 font-semibold">الغردقة</div>
              <h4 className="font-bold text-lg">الغردقة</h4>
              <p className="text-slate-400 text-sm mt-1">استمتع بأروع الرحلات ورحلات السفاري في الصحراء.</p>
            </div>
            <div className="bg-[#172033] rounded-xl p-4 border border-slate-800">
              <div className="h-40 bg-slate-800 rounded-lg mb-4 flex items-center justify-center text-slate-400 font-semibold">الأقصر وأسوان</div>
              <h4 className="font-bold text-lg">الأقصر وأسوان</h4>
              <p className="text-slate-400 text-sm mt-1">استمتع بالتاريخ العريق ومعالم النيل الساحرة.</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-2 text-center text-[#2dd4bf]">لماذا تختار "بداية تراويل"؟ ✈️</h3>
          <p className="text-center text-slate-400 mb-10">نحن أقدم شركة سياحية، مع شركة الطود لتنظيم أفضل عطلات العمر في أروع الشواطئ والمعالم التاريخية.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#172033] p-6 rounded-xl border border-slate-800 text-center space-y-2">
              <span className="text-3xl">⭐</span>
              <h4 className="font-bold text-lg">أسعار منافسة</h4>
              <p className="text-slate-400 text-sm">نقدم أفضل العروض والخصومات طوال العام لتناسب ميزانيتك.</p>
            </div>
            <div className="bg-[#172033] p-6 rounded-xl border border-slate-800 text-center space-y-2">
              <span className="text-3xl">🛡️</span>
              <h4 className="font-bold text-lg">حجز آمن وموثوق</h4>
              <p className="text-slate-400 text-sm">منصة دقيقة ومثبتة، وتأكيد سريع لجميع حجوزات الفنادق والأنشطة.</p>
            </div>
            <div className="bg-[#172033] p-6 rounded-xl border border-slate-800 text-center space-y-2">
              <span className="text-3xl">💬</span>
              <h4 className="font-bold text-lg">دعم على مدار الساعة</h4>
              <p className="text-slate-400 text-sm">فريق خدمة عملاء جاهز للإجابة على أي استفسار وفي أي وقت.</p>
            </div>
          </div>
        </div>

        {/* Booking Form Section */}
        <div id="contact" className="max-w-3xl mx-auto bg-[#172033] p-8 rounded-2xl border border-slate-800 shadow-xl">
          <h3 className="text-2xl font-bold mb-2 text-center text-[#2dd4bf]">احجز رحلتك فوراً! 📝</h3>
          <p className="text-center text-slate-400 mb-6 text-sm">سجل بياناتك وسنتواصل معك فوراً لتأكيد الحجز الفوري فوراً.</p>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">الاسم الكامل</label>
              <input type="text" placeholder="اكتب اسمك هنا..." className="w-full bg-[#0b1120] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#2dd4bf]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">رقم الهاتف (واتساب)</label>
              <input type="text" placeholder="01xxxxxxxx" className="w-full bg-[#0b1120] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#2dd4bf]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">اختر الوجهة المطلوبة</label>
              <select className="w-full bg-[#0b1120] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#2dd4bf]">
                <option>شرم الشيخ</option>
                <option>الغردقة</option>
                <option>الأقصر وأسوان</option>
              </select>
            </div>
            <div className="pt-2">
              <button type="button" className="w-full bg-[#2dd4bf] hover:bg-[#14b8a6] text-slate-900 font-bold py-3 rounded-lg transition duration-300">
                إرسال طلب الحجز عبر واتساب 🚀
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-slate-800 text-slate-500 text-sm">
        <p>© 2026 Bedaya Travel. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}