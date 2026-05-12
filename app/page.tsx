"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Droplets, Wind, Shirt, Scissors, Phone, Mail, MapPin, ChevronRight, Sparkles, ArrowRight, Star } from "lucide-react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

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
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? "py-3" : "py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-background" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-foreground">
                E-Laundry
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/60">
              <Link href="#services" className="hover:text-accent transition-colors duration-300 relative group">
                Layanan
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
              <Link href="#experience" className="hover:text-accent transition-colors duration-300 relative group">
                Pengalaman
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
              <Link href="#contacts" className="hover:text-accent transition-colors duration-300 relative group">
                Kontak
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login" className="hidden sm:inline-flex text-sm font-medium text-foreground/60 hover:text-accent transition-colors">
                Masuk
              </Link>
              <Link href="/register" className="btn-primary !py-3 !px-6 !text-[12px]">
                Mulai Sekarang
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <main className="relative min-h-screen flex items-center aurora-bg">
        {/* Floating Glow Orbs */}
        <div className="glow-orb glow-teal w-[500px] h-[500px] -top-20 -left-40 animate-pulse-glow"></div>
        <div className="glow-orb glow-violet w-[400px] h-[400px] top-40 right-0 animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        <div className="glow-orb glow-pink w-[300px] h-[300px] bottom-20 left-1/3 animate-pulse-glow" style={{ animationDelay: '4s' }}></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10 pt-32 pb-20">
          <div className={`max-w-2xl ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs font-semibold tracking-wide uppercase">
                #1 Perawatan Busana Premium
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black leading-[1.05] mb-8">
              Perawatan{" "}
              <span className="text-gradient">Sempurna</span>
              <br />
              Tanpa Kompromi
            </h1>

            <p className="text-foreground/75 text-lg sm:text-xl font-light leading-relaxed mb-12 max-w-lg">
              Proses yang disempurnakan secara cermat untuk kualitas tanpa banding,
              disesuaikan untuk gaya hidup modern Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="btn-primary !text-sm">
                <Sparkles className="w-4 h-4" />
                Jadwalkan Penjemputan
              </Link>
              <Link href="#contacts" className="btn-outline !text-sm">
                Hubungi Kami
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-8 mt-14 pt-8 border-t border-white/10">
              <div>
                <p className="text-3xl font-display font-bold text-accent">50K+</p>
                <p className="text-xs text-foreground/70 mt-1">Pakaian Dikurasi</p>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <p className="text-3xl font-display font-bold text-accent2">4.9</p>
                <p className="text-xs text-foreground/70 mt-1 flex items-center gap-1"><Star className="w-3 h-3 text-accent4 fill-accent4" /> Rating</p>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <p className="text-3xl font-display font-bold text-accent3">100+</p>
                <p className="text-xs text-foreground/70 mt-1">Mitra Terpilih</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className={`relative w-full aspect-square max-h-[600px] ${mounted ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-4 rounded-3xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero-laundry.png"
                alt="Premium laundry service"
                className="w-full h-full object-cover !rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 left-8 glass-card !rounded-2xl px-6 py-4 animate-float z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-background" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-display font-semibold">Est. 2026</p>
                  <p className="text-foreground/70 text-xs">Keunggulan Teknis</p>
                </div>
              </div>
            </div>

            {/* Decorative ring */}
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border border-accent/20 animate-pulse-glow"></div>
          </div>
        </div>
      </main>

      {/* ═══════════ SERVICES SECTION ═══════════ */}
      <section id="services" className="py-32 relative aurora-bg">
        <div className="glow-orb glow-violet w-[400px] h-[400px] top-20 right-20 animate-pulse-glow"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent2/10 border border-accent2/20 mb-6">
              <span className="text-accent2 text-xs font-semibold tracking-wide uppercase">Portofolio Kami</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Layanan <span className="text-gradient">Khusus</span>
            </h2>
            <p className="text-foreground/70 max-w-md mx-auto text-base font-light">
              Berbagai layanan premium yang dirancang khusus untuk kebutuhan perawatan busana Anda
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={<Wind className="w-6 h-6" />}
              title="Cuci Kering"
              desc="Protokol perawatan ahli untuk kain rumit dan berharga, dengan teknik ramah lingkungan berkualitas."
              color="from-accent to-accent-hover"
              delay={0}
            />
            <ServiceCard
              icon={<Droplets className="w-6 h-6" />}
              title="Cuci Reguler"
              desc="Pakaian harian dicuci sempurna, dirawat lembut, dan dilipat atau disetrika dengan kehati-hatian."
              color="from-accent2 to-purple-600"
              delay={1}
            />
            <ServiceCard
              icon={<Shirt className="w-6 h-6" />}
              title="Setrika & Lipat"
              desc="Penguapan dan penyetrikaan tanpa cacat. Menjadikan pakaian Anda tampil sempurna."
              color="from-accent3 to-pink-600"
              delay={2}
            />
            <ServiceCard
              icon={<Scissors className="w-6 h-6" />}
              title="Penjahitan Kustom"
              desc="Perubahan, perbaikan ukuran, hingga modifikasi khusus oleh penjahit ahli profesional."
              color="from-accent4 to-amber-600"
              delay={3}
            />
          </div>
        </div>
      </section>

      {/* ═══════════ EXPERIENCE SECTION ═══════════ */}
      <section id="experience" className="py-32 relative overflow-hidden">
        <div className="glow-orb glow-teal w-[500px] h-[500px] -bottom-40 -left-40 animate-pulse-glow"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent3/10 border border-accent3/20 mb-6">
              <span className="text-accent3 text-xs font-semibold tracking-wide uppercase">Cara Kerja</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Pengalaman <span className="text-gradient">Mulus</span>
            </h2>
            <p className="text-foreground/70 text-lg leading-relaxed mb-16 max-w-md font-light">
              Proses eksklusif dan teliti demi kepuasan tanpa batas. Kami mengurus busana Anda dari awal hingga akhir.
            </p>

            <div className="space-y-8">
              <Step
                number="01"
                title="Penjemputan"
                desc="Pengambilan aman dan eksklusif di lokasi dan waktu yang Anda tentukan."
                color="text-accent"
                bgColor="bg-accent/10"
              />
              <Step
                number="02"
                title="Pengerjaan"
                desc="Pembersihan tingkat ahli dan penanganan rumit oleh pengrajin pencucian terlatih."
                color="text-accent2"
                bgColor="bg-accent2/10"
              />
              <Step
                number="03"
                title="Pengantaran"
                desc="Garmen dikembalikan dengan sangat aman, terbungkus rapi, siap pakai."
                color="text-accent3"
                bgColor="bg-accent3/10"
              />
            </div>
          </div>

          <div className="relative h-[600px] lg:h-[700px] w-full rounded-3xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/experience-laundry.png"
              alt="Premium garment care"
              className="w-full h-full object-cover !rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>

            {/* Floating stat */}
            <div className="absolute bottom-8 left-8 right-8 glass-card !rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground/70 text-xs uppercase tracking-wider mb-1">Waktu Proses</p>
                  <p className="text-2xl font-display font-bold text-accent">24 - 48 Jam</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA SECTION ═══════════ */}
      <section className="py-32 relative aurora-bg">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="glass-card !rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="glow-orb glow-teal w-[300px] h-[300px] -top-20 -right-20 animate-pulse-glow"></div>
            <div className="glow-orb glow-violet w-[200px] h-[200px] -bottom-10 -left-10 animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent2 mx-auto mb-8 flex items-center justify-center animate-float">
                <Sparkles className="w-8 h-8 text-background" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Layanan <span className="text-gradient">Pramutamu</span> Pribadi
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto text-lg mb-12 font-light">
                Bagi pemegang akun yang memerlukan manajemen gaya dari berbagai arah, pramutamu berdedikasi kami senantiasa hadir.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register" className="btn-primary !text-sm">
                  Ajukan Layanan
                </Link>
                <Link href="#contacts" className="btn-outline !text-sm">
                  Layanan Korporat
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer id="contacts" className="pt-24 pb-12 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent2 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 text-background" />
                </div>
                <span className="text-xl font-display font-bold text-foreground">E-Laundry</span>
              </Link>
              <p className="text-foreground/60 text-sm leading-relaxed mb-8 max-w-xs font-light">
                Kesempurnaan mutlak dalam tiap helaian perawatan busana.
                Membina lemari paling indah sejak 2026.
              </p>
              <div className="flex gap-3">
                {["IG", "IN", "TW"].map((social) => (
                  <div key={social} className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all cursor-pointer group">
                    <span className="text-[10px] font-semibold text-foreground/70 group-hover:text-accent transition-colors">{social}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-display font-semibold text-foreground mb-6">Layanan</h4>
              <ul className="space-y-3 text-sm font-light text-foreground/70">
                <li><Link href="#" className="hover:text-accent transition-colors">Cuci Kering Eksklusif</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Perawatan Harian</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Setrika & Press Panas</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Penjahitan Kustom</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-display font-semibold text-foreground mb-6">Perusahaan</h4>
              <ul className="space-y-3 text-sm font-light text-foreground/70">
                <li><Link href="#" className="hover:text-accent transition-colors">Tentang Kami</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Ketentuan Layanan</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Kebijakan Privasi</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Karir</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-display font-semibold text-foreground mb-6">Kontak</h4>
              <ul className="space-y-4 text-sm font-light text-foreground/70">
                <li className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <span className="pt-1">+62 811 2345 6789</span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-accent2/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-accent2" />
                  </div>
                  <span className="pt-1">concierge@elaundry.com</span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-accent3/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-accent3" />
                  </div>
                  <span className="pt-1">Pacific Century Place<br />Jakarta, Indonesia</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-foreground/75 font-light">
            <p>© {new Date().getFullYear()} E-Laundry. Hak cipta dilindungi.</p>
            <p className="mt-2 sm:mt-0">Dibuat dengan <span className="text-accent3">♥</span> di Indonesia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ═══════════ SERVICE CARD COMPONENT ═══════════ */
function ServiceCard({
  icon,
  title,
  desc,
  color,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
  delay: number;
}) {
  return (
    <div
      className="glass-card !rounded-2xl p-8 group relative overflow-hidden"
      style={{ animationDelay: `${delay * 0.15}s` }}
    >
      {/* Hover glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 text-background group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-lg font-display font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-foreground/70 leading-relaxed text-sm font-light">{desc}</p>
    </div>
  );
}

/* ═══════════ STEP COMPONENT ═══════════ */
function Step({
  number,
  title,
  desc,
  color,
  bgColor,
}: {
  number: string;
  title: string;
  desc: string;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="flex gap-6 group">
      <div className={`w-14 h-14 rounded-2xl ${bgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
        <span className={`text-lg font-display font-bold ${color}`}>{number}</span>
      </div>
      <div className="pt-1 flex-1">
        <h3 className="text-lg font-display font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-foreground/70 font-light text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
