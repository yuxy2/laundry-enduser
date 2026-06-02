"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  Shirt, 
  Shield, 
  Star, 
  Clock, 
  Check, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Heart, 
  User, 
  Droplets, 
  Scissors, 
  ArrowRight,
  Sparkle
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [subscribing, setSubscribing] = useState<string | null>(null);
  const [subError, setSubError] = useState("");

  const handleSubscribe = async (planType: "regular" | "premium") => {
    setSubError("");
    const token = localStorage.getItem("userToken");
    if (!token) {
      router.push(`/login?redirect=/`);
      return;
    }

    setSubscribing(planType);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://laundry-app-one-theta.vercel.app";
      const res = await fetch(`${apiUrl}/api/order/membership/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ planType })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal memproses langganan");

      if (data.data && data.data.url) {
        window.location.href = data.data.url;
      } else {
        throw new Error("URL Pembayaran tidak ditemukan");
      }
    } catch (err: any) {
      setSubError(err.message || "Terjadi kesalahan saat memproses langganan");
      alert(err.message || "Terjadi kesalahan saat memproses langganan");
    } finally {
      setSubscribing(null);
    }
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-background text-foreground font-sans min-h-screen overflow-x-hidden">
      
      {/* ═══════════ NAVIGATION ═══════════ */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-peach-light/95 backdrop-blur-md py-3 shadow-sm border-b border-peach-border" : "bg-peach-light py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Shirt className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-display font-extrabold tracking-tight text-foreground">
                E-<span className="text-accent">Laundry</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-foreground/80">
              <Link href="#" className="hover:text-accent transition-colors duration-300">Beranda</Link>
              <Link href="#about" className="hover:text-accent transition-colors duration-300">Tentang Kami</Link>
              <Link href="#services" className="hover:text-accent transition-colors duration-300">Layanan</Link>
              <Link href="#timeline" className="hover:text-accent transition-colors duration-300">Linimasa</Link>
              <Link href="#pricing" className="hover:text-accent transition-colors duration-300 flex items-center gap-1">
                Keranjang<span className="text-xs bg-accent/10 text-accent px-1.5 py-0.5 rounded-full font-bold">0</span>
              </Link>
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="#contacts" className="btn-primary">
                Hubungi Kami
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground/80 hover:text-accent transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-peach-light border-t border-peach-border px-6 py-6 space-y-4 animate-fade-in">
            <Link 
              href="#" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold hover:text-accent transition-colors"
            >
              Beranda
            </Link>
            <Link 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold hover:text-accent transition-colors"
            >
              Tentang Kami
            </Link>
            <Link 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold hover:text-accent transition-colors"
            >
              Layanan
            </Link>
            <Link 
              href="#timeline" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold hover:text-accent transition-colors"
            >
              Linimasa
            </Link>
            <Link 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold hover:text-accent transition-colors"
            >
              Keranjang (0)
            </Link>
            <div className="pt-2">
              <Link 
                href="#contacts" 
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full text-center"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="bg-peach-light pt-32 pb-24 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-white/40 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/40 rounded-full blur-xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-1 gap-12 text-center relative z-10">
          <div className={`max-w-3xl mx-auto ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-tight tracking-tight mb-6">
              Kualitas Perawatan Busana<br />Terbaik di Setiap Langkah
            </h1>
            <p className="text-foreground/75 text-sm sm:text-base font-medium leading-relaxed mb-10 max-w-xl mx-auto">
              Menghubungkan kenyamanan gaya hidup urban Anda dengan jaringan UMKM laundry kiloan terstandarisasi dan ramah lingkungan.
            </p>

            <div className="flex justify-center items-center gap-4 mb-16">
              <Link href="/register" className="btn-primary">
                Mulai Sekarang
              </Link>
              <Link href="#contacts" className="btn-outline">
                Hubungi Kami
              </Link>
            </div>
          </div>

          {/* Hero Stack Display Container */}
          <div className="relative max-w-lg mx-auto w-full aspect-[4/3] flex items-center justify-center mt-6">
            
            {/* Social Links on the Left */}
            <div className="absolute left-[-2rem] sm:left-[-4rem] top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
              <Link href="#" className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-accent hover:text-white transition-colors duration-300 shadow-sm text-xs font-bold">X</Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-accent hover:text-white transition-colors duration-300 shadow-sm text-xs font-bold">FB</Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-accent hover:text-white transition-colors duration-300 shadow-sm text-xs font-bold">IG</Link>
            </div>

            {/* Central Stack Image */}
            <div className="relative w-[280px] sm:w-[360px] aspect-square rounded-full overflow-visible z-10 animate-float">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/neat_wash_hero_laundry.png" 
                alt="NeatWash Laundry Stack" 
                className="w-full h-full object-cover rounded-full shadow-lg border-4 border-white"
              />

              {/* Decorative Sun Icon */}
              <div className="absolute -top-10 -left-10 w-16 h-16 text-accent/20 animate-spin" style={{ animationDuration: '20s' }}>
                <Sparkle className="w-full h-full fill-accent/10" />
              </div>
            </div>

            {/* FLOATING CARDS (Desktop Absolute layout, hidden on mobile/responsive grid instead) */}
            {/* Top-Left Card */}
            <div className="hidden lg:flex absolute top-[10%] left-[-110px] w-[200px] bg-white rounded-2xl p-4 shadow-md items-start gap-3 border border-peach-border text-left z-20">
              <div className="p-2 rounded-xl bg-peach-dark text-accent shrink-0">
                <Shirt className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground leading-snug">Pakaian lembut, harum, dan segar kembali</p>
              </div>
            </div>

            {/* Bottom-Left Card */}
            <div className="hidden lg:flex absolute bottom-[25%] left-[-110px] w-[200px] bg-white rounded-2xl p-4 shadow-md items-start gap-3 border border-peach-border text-left z-20">
              <div className="p-2 rounded-xl bg-peach-dark text-accent shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground leading-snug">Warna dan serat kain terjaga sempurna</p>
              </div>
            </div>

            {/* Top-Right Card */}
            <div className="hidden lg:flex absolute top-[10%] right-[-110px] w-[200px] bg-white rounded-2xl p-4 shadow-md items-start gap-3 border border-peach-border text-left z-20">
              <div className="p-2 rounded-xl bg-peach-dark text-accent shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground leading-snug">Pencucian kering profesional higienis</p>
              </div>
            </div>

            {/* Bottom-Right Card */}
            <div className="hidden lg:flex absolute bottom-[25%] right-[-110px] w-[200px] bg-white rounded-2xl p-4 shadow-md items-start gap-3 border border-peach-border text-left z-20">
              <div className="p-2 rounded-xl bg-peach-dark text-accent shrink-0">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground leading-snug">Bahan halus dirawat oleh ahlinya</p>
              </div>
            </div>

            {/* Bottom Reception Pill */}
            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 bg-white rounded-full py-2.5 px-6 shadow-md border border-peach-border flex items-center gap-2 z-20 shrink-0">
              <Clock className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold text-foreground whitespace-nowrap">Layanan Antar Jemput Siap Sedia</span>
            </div>
          </div>

          {/* Floating Cards Mobile Layout (Visible only on mobile/tablet) */}
          <div className="grid grid-cols-2 gap-4 mt-12 max-w-md mx-auto lg:hidden">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-peach-border flex flex-col items-center text-center gap-2">
              <div className="p-2 rounded-xl bg-peach-dark text-accent shrink-0">
                <Shirt className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-foreground leading-snug">Pakaian lembut, harum, & segar kembali</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-peach-border flex flex-col items-center text-center gap-2">
              <div className="p-2 rounded-xl bg-peach-dark text-accent shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-foreground leading-snug">Pencucian kering profesional higienis</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-peach-border flex flex-col items-center text-center gap-2">
              <div className="p-2 rounded-xl bg-peach-dark text-accent shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-foreground leading-snug">Warna & serat kain terjaga sempurna</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-peach-border flex flex-col items-center text-center gap-2">
              <div className="p-2 rounded-xl bg-peach-dark text-accent shrink-0">
                <Droplets className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-foreground leading-snug">Bahan halus dirawat oleh ahlinya</p>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════ ABOUT US SECTION ═══════════ */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight mb-6">
              Layanan Binatu yang<br />Melampaui Ekspektasi Anda
            </h2>
            <p className="text-foreground/70 text-sm leading-relaxed mb-10 max-w-lg">
              Kami hadir untuk mendigitalisasi industri binatu kiloan konvensional, meningkatkan efisiensi waktu harian Anda, serta mendukung pertumbuhan ekonomi jaringan UMKM laundry mitra lokal secara berkelanjutan.
            </p>

            {/* Stats badge */}
            <div className="inline-flex items-center gap-4 bg-peach-light rounded-2xl py-4 px-6 border border-peach-border shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-display font-black leading-none text-foreground">800+</p>
                <p className="text-xs text-foreground/75 font-semibold">Pelanggan Setia per bulan</p>
              </div>
            </div>
          </div>

          {/* Right Column Grid Images */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left Image (Vertical) */}
            <div className="row-span-2 relative h-[320px] sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/neat_wash_about_laundry_flower.png" 
                alt="Luxury Garment Care Flower" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Top Right Image */}
            <div className="relative h-[152px] sm:h-[192px] w-full rounded-2xl overflow-hidden shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/neat_wash_about_drawer.png" 
                alt="Laundry Closet Organization" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Right Image */}
            <div className="relative h-[152px] sm:h-[192px] w-full rounded-2xl overflow-hidden shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/neat_wash_about_washing_machine.png" 
                alt="Washing Machine Cleaning" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════ SERVICES SECTION ═══════════ */}
      <section id="services" className="py-24 bg-white border-t border-peach-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                Layanan Binatu Profesional<br />Tersaji Sempurna
              </h2>
            </div>
            <div>
              <Link href="#services" className="btn-primary">
                Jelajahi Semua Layanan
              </Link>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Service 1: Quick Wash */}
            <div className="flex flex-col">
              {/* Colored Rect Box */}
              <div className="bg-[#E96A44] w-full aspect-[4/3] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Shirt className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-lg font-display font-bold mb-3">Cuci Cepat (Quick Wash)</h3>
              <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed">
                Pencucian cepat dan bersih menggunakan formula detergen eco-friendly yang menjaga serat pakaian sehari-hari Anda tetap segar.
              </p>
            </div>

            {/* Service 2: Fresh Press */}
            <div className="flex flex-col">
              {/* Colored Rect Box */}
              <div className="bg-[#F5B842] w-full aspect-[4/3] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                {/* Custom styled Iron representation */}
                <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 18h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3l-2.5-3H6.5L4 6H2v10a2 2 0 0 0 2 2Z" />
                  <path d="M12 12h.01" />
                  <path d="M16 12h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-display font-bold mb-3">Setrika Uap (Fresh Press)</h3>
              <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed">
                Penyetrikaan uap presisi tinggi untuk menghilangkan kerutan secara instan, menghasilkan lipatan pakaian rapi dan bebas kuman.
              </p>
            </div>

            {/* Service 3: Stain Removal */}
            <div className="flex flex-col">
              {/* Colored Rect Box */}
              <div className="bg-[#1E70D6] w-full aspect-[4/3] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Droplets className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-lg font-display font-bold mb-3">Pembersihan Noda (Stain Removal)</h3>
              <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed">
                Penanganan intensif untuk noda membandel pada bahan kain khusus secara hati-hati agar warna kain tetap berkilau dan tidak pudar.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════ TIMELINE SECTION ═══════════ */}
      <section id="timeline" className="py-24 bg-white border-t border-peach-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Dari Langkah Sederhana<br />Menuju Standar Terbaik
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start relative">
            
            {/* Left side Timeline Column */}
            <div className="space-y-12 relative z-10">
              
              {/* Timeline Entry: 2018 (Left aspect) */}
              <div className="space-y-6">
                <span className="inline-block bg-peach-light border border-peach-border text-foreground font-bold px-4 py-1.5 rounded-full text-xs">
                  2018
                </span>
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/neat_wash_timeline_woman.png" 
                    alt="Timeline 2018 - Dry Cleaning Staff" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-foreground/50">2011</span>
                  <h4 className="text-lg font-display font-bold">Ekspansi & Manajemen Kemitraan</h4>
                  <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed">
                    Meluncurkan integrasi platform manajemen pesanan dan POS kasir untuk membantu pertumbuhan mitra UMKM lokal.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link href="#about" className="btn-primary">
                  Pelajari Selengkapnya Tentang Kami
                </Link>
              </div>
            </div>

            {/* Right side Timeline Column */}
            <div className="space-y-12">
              
              {/* Timeline Entry: 2010 */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 items-center">
                <div className="sm:col-span-3 space-y-4">
                  <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="/neat_wash_timeline_rack.png" 
                      alt="Timeline 2010 - Foundation" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-base">Pendirian Outlet Pertama & Pelayanan Lokal</h5>
                  </div>
                </div>
                <div className="space-y-3 flex sm:flex-col items-start justify-between sm:justify-start">
                  <span className="bg-peach-light border border-peach-border text-foreground font-bold px-3 py-1 rounded-full text-xs">
                    2010
                  </span>
                  <span className="text-sm font-bold text-foreground/45">2004</span>
                </div>
              </div>

              {/* Timeline Entry: 2019 */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 items-center">
                <div className="sm:col-span-3 space-y-4">
                  <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="/neat_wash_timeline_laundromat.png" 
                      alt="Timeline 2019 - Service Innovation" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-base">Inovasi Layanan & Keanggotaan Berkelanjutan</h5>
                  </div>
                </div>
                <div className="space-y-3 flex sm:flex-col items-start justify-between sm:justify-start">
                  <span className="bg-peach-light border border-peach-border text-foreground font-bold px-3 py-1 rounded-full text-xs">
                    2019
                  </span>
                  <span className="text-sm font-bold text-foreground/45">Kini</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS SECTION ═══════════ */}
      <section className="py-24 bg-white border-t border-peach-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Alur Mudah untuk Pakaian<br />Bersih Sempurna Setiap Saat
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Step 1 */}
            <div className="bg-peach-light rounded-2xl p-8 border border-peach-border relative overflow-hidden">
              <span className="absolute right-4 top-2 text-7xl font-display font-black text-foreground/5 pointer-events-none select-none">1</span>
              <span className="text-xs font-bold text-accent/80 tracking-wider uppercase">Pickup Service</span>
              <h4 className="text-lg font-display font-bold mt-4 mb-2">1. Booking Pickup</h4>
              <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed">
                Jadwalkan penjemputan pakaian Anda secara online dengan mudah.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-peach-light rounded-2xl p-8 border border-peach-border relative overflow-hidden">
              <span className="absolute right-4 top-2 text-7xl font-display font-black text-foreground/5 pointer-events-none select-none">2</span>
              <span className="text-xs font-bold text-accent/80 tracking-wider uppercase">Sorting Clothes</span>
              <h4 className="text-lg font-display font-bold mt-4 mb-2">2. Sorting & Inspection</h4>
              <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed">
                Penyortiran kain berdasarkan bahan, warna, dan kebutuhan noda khusus.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-peach-light rounded-2xl p-8 border border-peach-border relative overflow-hidden">
              <span className="absolute right-4 top-2 text-7xl font-display font-black text-foreground/5 pointer-events-none select-none">3</span>
              <span className="text-xs font-bold text-accent/80 tracking-wider uppercase">Deep Cleaning</span>
              <h4 className="text-lg font-display font-bold mt-4 mb-2">3. Professional Care</h4>
              <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed">
                Proses pencucian dan penyucian mendalam menggunakan detergen ramah lingkungan.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-peach-light rounded-2xl p-8 border border-peach-border relative overflow-hidden">
              <span className="absolute right-4 top-2 text-7xl font-display font-black text-foreground/5 pointer-events-none select-none">4</span>
              <span className="text-xs font-bold text-accent/80 tracking-wider uppercase">Iron & Delivery</span>
              <h4 className="text-lg font-display font-bold mt-4 mb-2">4. Quality Packing</h4>
              <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed">
                Penyetrikaan uap premium, lipatan rapi, dan pengiriman aman kembali.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════ PROMO BANNER CALL TO ACTION ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-accent rounded-3xl grid lg:grid-cols-2 items-center overflow-hidden relative shadow-md">
            
            {/* Decorative Vector details */}
            <div className="absolute top-[-30px] left-[-30px] w-20 h-20 bg-white/10 rounded-full blur-lg"></div>

            {/* Content Column */}
            <div className="p-8 sm:p-16 space-y-6 text-white relative z-10 text-left">
              <h3 className="text-3xl sm:text-4xl font-display font-black leading-tight">
                Bebaskan Hari Anda dari<br />Beban Cucian Bersama E-Laundry!
              </h3>
              <p className="text-white/80 text-sm leading-relaxed max-w-md font-medium">
                Kami menjemput pakaian kotor Anda dan mengembalikannya bersih wangi sempurna.
              </p>
            </div>

            {/* Image Column */}
            <div className="relative h-[280px] lg:h-[400px] w-full bg-[#E55F38]/20 flex items-end justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/neat_wash_cta_woman.png" 
                alt="NeatWash Smiling Customer holding Laundry" 
                className="h-[95%] w-auto object-contain object-bottom select-none"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS SECTION ═══════════ */}
      <section className="py-24 bg-white border-t border-peach-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Pakaian Bersih, Pelanggan Puas:<br />Kata Mereka Tentang Kami
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Feature Customer */}
            <div className="lg:col-span-5 bg-peach-light rounded-3xl p-8 border border-peach-border flex flex-col items-center text-center space-y-6 shadow-sm">
              <div className="w-[180px] aspect-square rounded-full overflow-hidden border-4 border-white shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/neat_wash_customer_portrait.png" 
                  alt="Customer Review Portrait" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-foreground/80 font-medium italic text-sm leading-relaxed">
                "Layanan penjemputannya sangat cepat, pakaian dikembalikan dengan kemasan rapi dan wangi eksklusif tahan lama. Jasa laundry terbaik di kota!"
              </p>
              <div>
                <h4 className="font-display font-bold text-base text-foreground">Robert Chen</h4>
                <p className="text-xs text-foreground/50 font-bold">Pelanggan Terverifikasi</p>
              </div>
            </div>

            {/* Right Testimonial Grid */}
            <div className="lg:col-span-7 grid gap-6">
              
              {/* Testimonial 1 */}
              <div className="bg-white border border-peach-border rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-peach-dark flex items-center justify-center font-bold text-xs text-accent">
                      AM
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm">Amanda Miller</h4>
                      <p className="text-[10px] text-foreground/50">Jakarta</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#F5B842] fill-[#F5B842]" />
                    ))}
                  </div>
                </div>
                <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed">
                  "Layanan laundry terbaik yang pernah saya coba. Sangat profesional, kemasan sangat rapi dan wangi eksklusif tahan lama!"
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white border border-peach-border rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-peach-dark flex items-center justify-center font-bold text-xs text-accent">
                      KW
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm">Kevin Wilson</h4>
                      <p className="text-[10px] text-foreground/50">Tangerang</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#F5B842] fill-[#F5B842]" />
                    ))}
                  </div>
                </div>
                <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed">
                  "Proses setrika sangat halus. Jas katun saya kembali rapi sempurna tanpa kerutan. Benar-benar kualitas premium."
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ═══════════ PRICING SECTION ═══════════ */}
      <section id="pricing" className="py-24 bg-white border-t border-peach-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Pilihan Paket Langganan & Layanan Kiloan
            </h2>
            <p className="text-foreground/60 text-sm mt-3 max-w-xl mx-auto font-medium">
              Bayar sekali di awal bulan untuk kuota praktis, atau gunakan layanan reguler bayar setelah ditimbang.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            
            {/* Regular Member */}
            <div className="bg-peach-light border border-peach-border rounded-3xl p-8 flex flex-col justify-between shadow-sm relative text-left">
              <div className="space-y-6">
                <div>
                  <h4 className="font-display font-extrabold text-lg">Regular Member</h4>
                  <p className="text-xs text-foreground/60">Solusi hemat untuk kebutuhan cuci bulanan Anda</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-display font-black">Rp 560.000</span>
                  <span className="text-foreground/50 text-xs font-semibold">/ bulan</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span>Kuota Bulanan: 70 Kg</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span>Cuci Regular + Setrika Lipat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span>Gratis Penjemputan & Pengantaran</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span>Estimasi Selesai 3 Hari</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <button 
                  onClick={() => handleSubscribe("regular")}
                  disabled={subscribing !== null}
                  className="btn-primary w-full text-center disabled:opacity-50"
                >
                  {subscribing === "regular" ? "Memproses..." : "Gabung Member"}
                </button>
              </div>
            </div>

            {/* Premium Member */}
            <div className="bg-peach-light border border-peach-border rounded-3xl p-8 flex flex-col justify-between shadow-sm relative text-left">
              <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase">
                Paling Populer
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-display font-extrabold text-lg">Premium Member</h4>
                  <p className="text-xs text-foreground/60">Perawatan eksklusif untuk pakaian premium Anda</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-display font-black">Rp 840.000</span>
                  <span className="text-foreground/50 text-xs font-semibold">/ bulan</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span>Kuota Bulanan: 70 Kg</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span>Cuci Kering Eksklusif + Setrika Uap</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span>Prioritas Antar Jemput Kilat (1-2 Hari)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span>Parfum Premium & Anti Bakteri</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <button 
                  onClick={() => handleSubscribe("premium")}
                  disabled={subscribing !== null}
                  className="btn-primary w-full text-center disabled:opacity-50"
                >
                  {subscribing === "premium" ? "Memproses..." : "Gabung Member Premium"}
                </button>
              </div>
            </div>

          </div>

          <div className="inline-block bg-peach-light border border-peach-border rounded-2xl p-5 max-w-xl mx-auto text-center">
            <p className="text-sm font-semibold text-foreground/80">
              Bukan Member? Anda tetap bisa menggunakan layanan reguler kiloan dengan tarif mulai dari <span className="text-accent font-bold">Rp 9.000 / Kg</span>.
            </p>
            <p className="text-xs text-foreground/50 mt-1 font-medium">
              Metode pembayaran: <strong>Timbang Dulu, Bayar Kemudian</strong> (setelah kurir mengonfirmasi berat cucian).
            </p>
          </div>

        </div>
      </section>

      {/* ═══════════ FAQ SECTION ═══════════ */}
      <section className="py-24 bg-white border-t border-peach-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column Image */}
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/neat_wash_folded_towels.png" 
              alt="Folded Fluffy Towels Care" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column content / Accordion list */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                Optimalkan Pengalaman Perawatan<br />Pakaian Anda Bersama Kami
              </h2>
            </div>
            
            <div className="space-y-4">
              
              {/* FAQ Item 1 */}
              <div className="bg-peach-light border border-peach-border rounded-2xl p-6">
                <h4 className="font-display font-bold text-sm sm:text-base mb-2">Berapa lama proses pencucian standar?</h4>
                <p className="text-foreground/75 text-xs sm:text-sm leading-relaxed">
                  Layanan cuci reguler memakan waktu 2-3 hari. Kami juga memiliki paket Kilat 24 Jam untuk kebutuhan darurat.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-peach-light border border-peach-border rounded-2xl p-6">
                <h4 className="font-display font-bold text-sm sm:text-base mb-2">Apakah ada layanan antar-jemput gratis?</h4>
                <p className="text-foreground/75 text-xs sm:text-sm leading-relaxed">
                  Ya, gratis biaya antar-jemput untuk radius 5km dari outlet terdekat E-Laundry dengan minimal order tertentu.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-peach-light border border-peach-border rounded-2xl p-6">
                <h4 className="font-display font-bold text-sm sm:text-base mb-2">Bagaimana cara mendaftar langganan bulanan?</h4>
                <p className="text-foreground/75 text-xs sm:text-sm leading-relaxed">
                  Anda dapat menekan tombol "Get Started" di atas untuk mendaftar akun dan memilih paket berlangganan bulanan E-Laundry.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer id="contacts" className="bg-peach-light pt-24 pb-12 border-t border-peach-border relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1 Logo & Description */}
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                  <Shirt className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-display font-extrabold tracking-tight text-foreground">
                  E-<span className="text-accent">Laundry</span>
                </span>
              </Link>
              <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed max-w-xs">
                Kesempurnaan perawatan busana terbaik dalam setiap helaian kain, menghadirkan kesegaran abadi.
              </p>
              <div className="flex gap-3">
                {["IG", "FB", "TW", "LI"].map((social) => (
                  <div key={social} className="w-8 h-8 rounded-full border border-peach-border bg-white flex items-center justify-center hover:bg-accent hover:text-white transition-all cursor-pointer font-bold text-[10px]">
                    {social}
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2 Services */}
            <div>
              <h4 className="text-sm font-display font-bold text-foreground mb-6 uppercase tracking-wider">Layanan</h4>
              <ul className="space-y-3 text-xs sm:text-sm text-foreground/70">
                <li><Link href="#services" className="hover:text-accent transition-colors">Cuci Cepat (Quick Wash)</Link></li>
                <li><Link href="#services" className="hover:text-accent transition-colors">Setrika Uap (Fresh Press)</Link></li>
                <li><Link href="#services" className="hover:text-accent transition-colors">Pembersihan Noda</Link></li>
                <li><Link href="#services" className="hover:text-accent transition-colors">Cuci Kering Eksklusif</Link></li>
              </ul>
            </div>

            {/* Column 3 Company */}
            <div>
              <h4 className="text-sm font-display font-bold text-foreground mb-6 uppercase tracking-wider">Perusahaan</h4>
              <ul className="space-y-3 text-xs sm:text-sm text-foreground/70">
                <li><Link href="#about" className="hover:text-accent transition-colors">Tentang Kami</Link></li>
                <li><Link href="#timeline" className="hover:text-accent transition-colors">Sejarah Kami</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Testimoni</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Karir</Link></li>
              </ul>
            </div>

            {/* Column 4 Contact Details */}
            <div>
              <h4 className="text-sm font-display font-bold text-foreground mb-6 uppercase tracking-wider">Hubungi Kami</h4>
              <ul className="space-y-4 text-xs sm:text-sm text-foreground/70">
                <li className="flex gap-3 items-start">
                  <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>+62 811 2345 6789</span>
                </li>
                <li className="flex gap-3 items-start">
                  <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>support@e-laundry.com</span>
                </li>
                <li className="flex gap-3 items-start">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Grand Indonesia East Mall, Lantai 5, Jakarta, Indonesia</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright bar */}
          <div className="border-t border-peach-border pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-foreground/60 font-semibold gap-4">
            <p>© {new Date().getFullYear()} E-Laundry. All rights reserved.</p>
            <p>Dibuat dengan <Heart className="w-3 h-3 text-accent inline fill-accent" /> di Indonesia</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
