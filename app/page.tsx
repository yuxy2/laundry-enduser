"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Truck, ShieldCheck, Shirt, Clock, Sparkles, Star, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setIsLoggedIn(true);
    }
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen selection:bg-blue-300 selection:text-blue-900 overflow-x-hidden">
      {/* Background Ambient Layers */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-cyan-400/20 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
                <Shirt className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600">
                E-laundry
              </span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
              <div className="hidden md:flex gap-6 mr-4">
                <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Layanan</Link>
                <Link href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Cara Kerja</Link>
              </div>
              
              {isLoggedIn ? (
                <Link href="/dashboard" className="text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 px-4 py-2 rounded-full hover:bg-slate-100 transition-all">
                    Masuk
                  </Link>
                  <Link href="/register" className="text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5">
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pb-36 overflow-hidden min-h-[90vh] flex flex-col justify-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 border border-blue-100 backdrop-blur-sm mb-8 animate-[fade-in-up_1s_ease-out]">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-xs font-semibold text-blue-800 uppercase tracking-wider">Aplikasi Laundry #1 di Indonesia</span>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tighter text-slate-900 sm:text-6xl md:text-7xl lg:text-[5rem] max-w-4xl mx-auto leading-[1.1] mb-2 animate-[fade-in-up_1s_ease-out_0.2s_both]">
             Ucapkan Selamat Tinggal pada <br className="hidden sm:block"/>
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
                Cucian Menumpuk
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-4 bg-blue-200/40 -z-10 rounded-full blur-sm"></div>
            </span>
          </h1>
          
          <p className="mt-8 text-lg sm:text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed animate-[fade-in-up_1s_ease-out_0.4s_both]">
            Platform laundry on-demand premium. Pesan layanan antar-jemput, pantau cucian secara real-time, dan nikmati waktu luang Anda.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 animate-[fade-in-up_1s_ease-out_0.6s_both]">
            <Link
              href="/register"
              className="group relative inline-flex justify-center items-center gap-2 py-4 px-10 text-base font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-all duration-300 shadow-xl shadow-slate-900/20 hover:shadow-slate-900/30 hover:-translate-y-1 w-full sm:w-auto"
            >
              Mulai Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="group inline-flex justify-center items-center gap-2 py-4 px-10 text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-full transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto hover:-translate-y-1"
            >
              Jelajahi Fitur
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="mt-20 pt-10 border-t border-slate-200/60 flex flex-wrap justify-center gap-10 sm:gap-20 animate-[fade-in-up_1s_ease-out_0.8s_both]">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-slate-900">10rb+</div>
              <div className="text-sm font-medium text-slate-500 mt-1">Pengguna Aktif</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-slate-900">500+</div>
              <div className="text-sm font-medium text-slate-500 mt-1">Mitra Laundry</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-slate-900">4.9/5</div>
              <div className="flex gap-1 text-yellow-400 mt-1">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">Keunggulan Kami</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">Layanan Bintang Lima Untuk Pakaian Anda</h3>
            <p className="text-lg text-slate-600">Teknologi modern berpadu dengan ketelitian, menghadirkan pengalaman mencuci yang belum pernah Anda rasakan sebelumnya.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            <FeatureCard 
              icon={<MapPin className="w-6 h-6" />}
              color="blue"
              title="Akses Mitra Terdekat"
              desc="Algoritma cerdas kami menghubungkan Anda dengan mitra laundry terbaik dalam radius terdekat di kota Anda."
            />
            <FeatureCard 
              icon={<Truck className="w-6 h-6" />}
              color="indigo"
              title="Antar Jemput Gratis"
              desc="Kurir profesional kami siap menjemput cucian kotor dan mengantar kembali pakaian bersih langsung ke depan pintu Anda."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-6 h-6" />}
              color="cyan"
              title="Garansi Kualitas"
              desc="Setiap pakaian diperlakukan dengan standar pencucian tertinggi. Kami menggaransi kebersihan dan keharuman setiap helai."
            />
            <FeatureCard 
              icon={<Clock className="w-6 h-6" />}
              color="purple"
              title="Tracking Real-time"
              desc="Pantau status pakaian Anda dari mulai penjemputan, proses pencucian, hingga diantar kembali melalui dashboard interaktif."
            />
            <FeatureCard 
              icon={<Sparkles className="w-6 h-6" />}
              color="orange"
              title="Layanan Ekstra Cepat"
              desc="Butuh mendesak? Tersedia opsi Express 12 jam selesai dengan kualitas yang sama-sama memukau."
            />
            <FeatureCard 
              icon={<Shirt className="w-6 h-6" />}
              color="rose"
              title="Perlakuan Khusus"
              desc="Pembersihan noda membandel, dry cleaning, hingga perawatan khusus untuk kebaya, jas, dan gaun premium Anda."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
             <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">Simpel & Praktis</h2>
             <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Bagaimana E-laundry Bekerja?</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
             {/* Decorative line connecting steps */}
             <div className="hidden md:block absolute top-12 left-20 right-20 h-0.5 bg-gradient-to-r from-blue-100 via-indigo-200 to-blue-100 -z-10"></div>
             
             <div className="relative text-center group">
               <div className="w-24 h-24 mx-auto bg-white rounded-3xl shadow-xl shadow-blue-900/5 flex items-center justify-center border border-slate-100 mb-8 group-hover:-translate-y-2 transition-transform duration-300">
                  <span className="text-3xl font-black text-blue-600">1</span>
               </div>
               <h4 className="text-xl font-bold text-slate-900 mb-4">Pesan Layanan</h4>
               <p className="text-slate-600 leading-relaxed">Pilih layanan yang Anda butuhkan, tentukan jadwal penjemputan, dan atur lokasi Anda melalui aplikasi.</p>
             </div>
             
             <div className="relative text-center group">
               <div className="w-24 h-24 mx-auto bg-white rounded-3xl shadow-xl shadow-indigo-900/5 flex items-center justify-center border border-slate-100 mb-8 group-hover:-translate-y-2 transition-transform duration-300">
                  <Truck className="w-10 h-10 text-indigo-600" />
               </div>
               <h4 className="text-xl font-bold text-slate-900 mb-4">Kami Jemput & Cuci</h4>
               <p className="text-slate-600 leading-relaxed">Kurir kami akan mengambil cucian, dan mitra profesional kami akan mencucinya dengan standar tinggi.</p>
             </div>
             
             <div className="relative text-center group">
               <div className="w-24 h-24 mx-auto bg-white rounded-3xl shadow-xl shadow-cyan-900/5 flex items-center justify-center border border-slate-100 mb-8 group-hover:-translate-y-2 transition-transform duration-300">
                  <CheckCircle2 className="w-10 h-10 text-cyan-600" />
               </div>
               <h4 className="text-xl font-bold text-slate-900 mb-4">Siap Dipakai</h4>
               <p className="text-slate-600 leading-relaxed">Pakaian bersih, wangi, dan rapi diantar kembali ke pintu Anda, siap untuk langsung digunakan.</p>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 px-6 py-16 sm:px-12 sm:py-20 text-center shadow-2xl">
            {/* CTA Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full blur-[100px] opacity-40 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-full blur-[100px] opacity-30 -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                Siap untuk hidup yang lebih mudah?
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10">
                Bergabunglah dengan ribuan pengguna lainnya yang telah mempercayakan urusan pakaian mereka kepada E-laundry. Daftar sekarang dan nikmati diskon 20% untuk pesanan pertama!
              </p>
              <Link
                href="/register"
                className="inline-flex justify-center items-center gap-2 py-4 px-10 text-lg font-bold text-slate-900 bg-white hover:bg-slate-50 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Daftar Gratis Sekarang
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white border-t border-slate-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Shirt className="w-6 h-6 text-blue-600" />
                <span className="font-bold text-xl text-slate-900 tracking-tight">E-laundry</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Revolusi cara Anda mencuci. Kami membawa layanan prima langsung ke genggaman Anda.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Layanan</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Cuci Komplit</Link></li>
                <li><Link href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Setrika Saja</Link></li>
                <li><Link href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Express 12 Jam</Link></li>
                <li><Link href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Dry Cleaning</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Perusahaan</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Tentang Kami</Link></li>
                <li><Link href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Karir</Link></li>
                <li><Link href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Mitra Laundry</Link></li>
                <li><Link href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Bantuan & Legal</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Pusat Bantuan</Link></li>
                <li><Link href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Syarat & Ketentuan</Link></li>
                <li><Link href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Kebijakan Privasi</Link></li>
                <li><Link href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Kontak</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">© {new Date().getFullYear()} E-laundry Inc. Hak Cipta Dilindungi.</p>
            <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
                 <span className="text-xs font-bold">FB</span>
               </div>
               <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
                 <span className="text-xs font-bold">IG</span>
               </div>
               <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
                 <span className="text-xs font-bold">TW</span>
               </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Reusable Feature Card Component
function FeatureCard({ icon, color, title, desc }: { icon: React.ReactNode, color: string, title: string, desc: string }) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    cyan: "bg-cyan-50 text-cyan-600 border-cyan-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-slate-200 transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden">
      {/* Decorative gradient blob inside card */}
      <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-300 blur-2xl \${colorMap[color].split(' ')[0]}`}></div>
      
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border \${colorMap[color]} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{desc}</p>
    </div>
  );
}
