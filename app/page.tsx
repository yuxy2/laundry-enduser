"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Truck, ShieldCheck, Shirt } from "lucide-react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="bg-white text-gray-800 font-sans min-h-screen selection:bg-blue-200">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
                <Shirt className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
                WashEase
              </span>
            </div>
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <Link href="/dashboard" className="text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-5 py-2.5 rounded-full transition-all shadow-md">
                  Ke Dashboard Saya
                </Link>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors">
                    Masuk
                  </Link>
                  <Link href="/register" className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-full transition-all shadow-md shadow-blue-500/20">
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          
          {/* Background effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-70"></div>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
              Cucian Beres, <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Waktu Tersisa Lebih Banyak
              </span>
            </h1>
            <p className="mt-6 text-lg tracking-tight text-gray-600 sm:text-xl">
              Platform laundry on-demand terbaik. Temukan mitra terdekat, pesan layanan antar-jemput, dan pantau cucian Anda secara real-time.
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <Link
                href="/register"
                className="group relative inline-flex justify-center items-center gap-2 py-3.5 px-8 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-xl shadow-blue-600/30 hover:scale-105"
              >
                Mulai Sekarang
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="inline-flex justify-center items-center py-3.5 px-8 text-sm font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full transition-colors"
              >
                Pilih Layanan
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Kenapa Memilih Kami?</h2>
            <p className="mt-4 text-lg text-gray-600">Layanan yang didesain untuk kenyamanan maksimal Anda.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mitra Terdekat</h3>
              <p className="text-gray-600">Temukan puluhan mitra laundry terpercaya di sekitar lokasi Anda dengan mudah.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Antar Jemput</h3>
              <p className="text-gray-600">Tidak perlu keluar rumah. Kurir mitra kami siap menjemput dan mengantar cucian Anda.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kualitas Terjamin</h3>
              <p className="text-gray-600">Setiap mitra telah melewati uji kualitas standard tinggi untuk hasil cucian terbaik.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Shirt className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-gray-900">WashEase Inc.</span>
          </div>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} WashEase. Hak Cipta Dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
