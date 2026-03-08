"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Diamond, Droplets, Wind, Shirt, Scissors, Phone, Mail, MapPin } from "lucide-react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-background text-foreground font-sans min-h-screen selection:bg-gold selection:text-background overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 border-b border-white/5 ${scrolled ? "bg-background/95 backdrop-blur-md py-4 shadow-2xl shadow-black/50" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center text-xs font-medium tracking-widest text-gray-300">
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 hover:opacity-80 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon.svg" alt="E-Laundry Logo" className="w-6 h-6 object-contain" />
              <span className="text-xl font-serif tracking-widest text-white">E-LAUNDRY</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-10">
              <Link href="#services" className="hover:text-gold transition-colors hover:uppercase">Layanan</Link>
              <Link href="#experience" className="hover:text-gold transition-colors hover:uppercase">Pengalaman</Link>
              <Link href="#contacts" className="hover:text-gold transition-colors hover:uppercase">Kontak</Link>
            </div>
            
            <div className="hidden lg:flex items-center gap-6">
              <Link href="/login" className="hover:text-gold transition-colors">PORTAL PRIBADI</Link>
              <Link href="/register" className="bg-gold text-background hover:bg-gold-hover px-6 py-3 transition-colors uppercase tracking-widest text-[10px] font-bold">
                Pesan Layanan
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-40 pb-20 sm:pt-48 sm:pb-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-gold"></div>
              <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">Manajemen Pakaian Kustom</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-white leading-[1.1] mb-8">
              Perawatan Sempurna, <br />
              Privasi Mutlak
            </h1>
            
            <p className="text-gray-400 text-lg sm:text-xl font-light leading-relaxed mb-12 max-w-lg">
              Proses yang disempurnakan secara cermat untuk kualitas tanpa kompromi, disesuaikan untuk gaya hidup yang paling menuntut. Kami mengelola penampilam Anda dengan keanggunan, pelayanan prima, dan keahlian tertinggi.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href="/register"
                className="inline-flex justify-center items-center bg-gold hover:bg-gold-hover text-background px-8 py-4 uppercase tracking-widest text-xs font-bold transition-all"
              >
                Jadwalkan Penjemputan
              </Link>
              <Link
                href="#contacts"
                className="inline-flex justify-center items-center border border-gray-600 hover:border-gold hover:text-gold text-white px-8 py-4 uppercase tracking-widest text-xs font-bold transition-all"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
          
          <div className="relative w-full aspect-[4/5] lg:aspect-square max-h-[600px] ml-auto">
            <div className="absolute inset-0 bg-white shadow-2xl shadow-black">
              <img 
                src="https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=1000&auto=format&fit=crop" 
                alt="Crisp folded towels"
                className="w-full h-full object-cover grayscale-[20%] contrast-125"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-panel border-l-2 border-gold p-8 shadow-xl max-w-xs">
              <p className="text-gold text-xs uppercase tracking-widest mb-2 font-semibold">Est. 2026</p>
              <p className="text-white font-serif text-xl">Keunggulan Teknis</p>
            </div>
          </div>
        </div>
      </main>

      {/* Services Section */}
      <section id="services" className="py-32 bg-background relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24 flex flex-col items-center">
            <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-4">— Portofolio Kami</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Layanan Khusus</h2>
            <div className="w-16 h-[1px] bg-gold/50"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            <ServiceCard 
              icon={<Wind />}
              title="Cuci Kering (Dry Clean)"
              desc="Protokol perawatan ahli untuk kain rumit dan berharga, memanfaatkan teknik ramah lingkungan berkualitas tinggi."
            />
            <ServiceCard 
              icon={<Droplets />}
              title="Perawatan Cuci Reguler"
              desc="Pakaian harian dicuci dengan sempurna, dirawat secara lembut, dan dilipat atau disetrika dengan kehati-hatian."
            />
            <ServiceCard 
              icon={<Shirt />}
              title="Setrika & Lipat Utama"
              desc="Penguapan dan penyetrikaan tanpa cacat. Menjadikan pakaian Anda tampil sempurna dan siap untuk digunakan."
            />
            <ServiceCard 
              icon={<Scissors />}
              title="Penjahitan Kustom"
              desc="Perubahan, perbaikan ukuran, hingga modifikasi khusus yang dikerjakan oleh para penjahit ahli profesional kami."
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 bg-panel overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">Pengalaman Mulus <br/> Tak Terlupakan</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-16 max-w-md">
              Proses eksklusif dan teliti demi kepuasaan tanpa batas. Kami mengurus busana Anda sehingga tetap sepadan dengan gaya hidup premium Anda.
            </p>
            
            <div className="space-y-12">
              <Step 
                number="01"
                title="Penjemputan"
                desc="Pengambilan yang aman dan eksklusif di lokasi dan waktu yang Anda atur oleh agen penjemput kami yang profesional."
              />
              <Step 
                number="02"
                title="Pengerjaan"
                desc="Pembersihan tingkat ahli dan penanganan rumit oleh pengrajin pencucian kami yang terlatih dan bersertifikasi."
              />
              <Step 
                number="03"
                title="Pengantaran"
                desc="Garmen dikembalikan dengan sangat aman, terbungkus murni dan rapi, siap pakai untuk berbagai acara Anda."
              />
            </div>
          </div>
          
          <div className="relative h-[600px] lg:h-[800px] w-full bg-black">
             <img 
               src="https://images.unsplash.com/photo-1594938291221-94f18cbb5660?q=80&w=1000&auto=format&fit=crop" 
               alt="Tailored suit"
               className="w-full h-full object-cover opacity-80"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          </div>
          
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-background border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="bg-panel border border-border-dark p-12 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Layanan Pramutamu Pribadi</h2>
              <p className="text-gray-400 max-w-2xl text-lg mb-12">
                Bagi pemegang akun yang memerlukan manajemen gaya dari berbagai arah properti, pengurus pakaian harian penuh, hingga pindah keluar negeri, pramutamu berdedikasi kami senantiasa hadir.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  href="/register"
                  className="bg-gold hover:bg-gold-hover text-background px-8 py-4 uppercase tracking-widest text-xs font-bold transition-all"
                >
                  Ajukan Layanan
                </Link>
                <Link
                  href="/contact"
                  className="border border-gray-600 hover:border-gold hover:text-gold text-white px-8 py-4 uppercase tracking-widest text-xs font-bold transition-all"
                >
                  Layanan Bisnis / Korporat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacts" className="bg-background border-t border-white/5 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            
            <div>
              <Link href="/" className="flex items-center gap-3 mb-6 inline-flex hover:opacity-80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icon.svg" alt="E-Laundry Logo" className="w-6 h-6 object-contain" />
                <span className="text-xl font-serif tracking-widest text-white">E-LAUNDRY</span>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs font-light">
                Kesempurnaan mutlak dalam tiap helaian perawatan busana. Membina lemari paling indah di seluruh dunia sejak 2026.
              </p>
              <div className="flex gap-4 text-gold">
                <div className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-colors cursor-pointer">
                  <span className="text-[10px]">IG</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-colors cursor-pointer">
                  <span className="text-[10px]">IN</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-colors cursor-pointer">
                  <span className="text-[10px]">TW</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white text-xs tracking-widest uppercase font-bold mb-8">Disiplin Kerja</h4>
              <ul className="space-y-4 text-sm font-light text-gray-400">
                <li><Link href="#" className="hover:text-gold transition-colors">Cuci Kering Eksklusif</Link></li>
                <li><Link href="#" className="hover:text-gold transition-colors">Perawatan Harian</Link></li>
                <li><Link href="#" className="hover:text-gold transition-colors">Setrika & Press Panas</Link></li>
                <li><Link href="#" className="hover:text-gold transition-colors">Penjahitan Kustom</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white text-xs tracking-widest uppercase font-bold mb-8">Tata Kelola</h4>
              <ul className="space-y-4 text-sm font-light text-gray-400">
                <li><Link href="#" className="hover:text-gold transition-colors">Keistimewaan Klien</Link></li>
                <li><Link href="#" className="hover:text-gold transition-colors">Ketentuan Layanan Umum</Link></li>
                <li><Link href="#" className="hover:text-gold transition-colors">Kebijakan Privasi Penuh</Link></li>
                <li><Link href="#" className="hover:text-gold transition-colors">Aspek Hukum</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white text-xs tracking-widest uppercase font-bold mb-8">Penghubung</h4>
              <ul className="space-y-4 text-sm font-light text-gray-400">
                <li className="flex gap-3">
                  <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>+62 811 2345 6789</span>
                </li>
                <li className="flex gap-3">
                  <Mail className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>concierge@elaundry.com</span>
                </li>
                <li className="flex gap-3">
                  <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>Pacific Century Place<br/>Jakarta, Indonesia</span>
                </li>
              </ul>
            </div>
            
          </div>
          
          <div className="border-t border-white/5 pt-8 text-center text-xs text-gray-600 tracking-widest font-light uppercase">
            © {new Date().getFullYear()} GRUP E-LAUNDRY. HAK CIPTA DILINDUNGI PENUH.
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="group border-l border-white/5 pl-6 pt-2 hover:border-gold transition-colors duration-500">
      <div className="text-gold mb-6 transform group-hover:-translate-y-1 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-serif text-white mb-4 tracking-wide">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm font-light pr-4">{desc}</p>
    </div>
  );
}

function Step({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex gap-8 group">
      <div className="text-gold text-lg font-serif italic">{number}</div>
      <div className="border-t border-white/10 pt-2 flex-1 group-hover:border-gold transition-colors duration-500">
        <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-400 font-light text-sm">{desc}</p>
      </div>
    </div>
  );
}
