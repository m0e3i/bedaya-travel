import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header / Navbar */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-wider text-teal-400">BEDAYA TRAVEL</h1>
        
        {/* أزرار تسجيل الدخول وحساب المستخدم */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm transition">
                تسجيل الدخول
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        <nav className="hidden md:flex space-x-6 space-x-reverse text-sm">
          <a href="#" className="hover:text-teal-400 transition">الرئيسية</a>
          <a href="#destinations" className="hover:text-teal-400 transition">الوجهات</a>
          <a href="#trips" className="hover:text-teal-400 transition">الرحلات</a>
          <a href="#contact" className="hover:text-teal-400 transition">تواصل معنا</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            اكتشف جمال مصر معنا بأفضل الأسعار
          </h2>
          <p className="text-slate-300 text-lg">
            رحلات سياحية متكاملة ومصممة خصيصاً لتستمتع بكل لحظة في أجمل الأماكن الساحرة.
          </p>
          <div className="pt-4">
            <a 
              href="#trips" 
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
            >
              احجز رحلتك الآن
            </a>
          </div>

          {/* Trust Bar Section */}
          <div className="mt-12 py-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center justify-center space-y-2">
                <span className="text-2xl">⭐</span>
                <span className="text-white font-medium text-sm md:text-base">رحلات مختارة بعناية</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <span className="text-2xl">🛡️</span>
                <span className="text-white font-medium text-sm md:text-base">حجز موثوق</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <span className="text-2xl">💬</span>
                <span className="text-white font-medium text-sm md:text-base">دعم سريع</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <span className="text-2xl">🇪🇬</span>
                <span className="text-white font-medium text-sm md:text-base">وجهات داخل مصر</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-16 px-6 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-8 text-center text-teal-400">وجهاتنا المميزة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="h-40 bg-slate-700 rounded-lg mb-4 flex items-center justify-center text-slate-400">صورة شرم الشيخ</div>
            <h4 className="font-bold text-lg">شرم الشيخ</h4>
            <p className="text-slate-400 text-sm mt-1">استمتع بسحر البحر الأحمر والشعاب المرجانية.</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="h-40 bg-slate-700 rounded-lg mb-4 flex items-center justify-center text-slate-400">صورة الغردقة</div>
            <h4 className="font-bold text-lg">الغردقة</h4>
            <p className="text-slate-400 text-sm mt-1">رحلات سفاري وأنشطة بحرية لا تُنسى.</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="h-40 bg-slate-700 rounded-lg mb-4 flex items-center justify-center text-slate-400">صورة أسوان والأقصر</div>
            <h4 className="font-bold text-lg">الأقصر وأسوان</h4>
            <p className="text-slate-400 text-sm mt-1">عراقة التاريخ المصري القديم على ضفاف النيل.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-slate-800 text-slate-500 text-sm">
        <p>© 2026 Bedaya Travel. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}