"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, User, Mail, MapPin, Phone, LogOut, 
  Settings, Shield, Diamond, Loader2
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Authentication Check
    const token = localStorage.getItem("userToken");
    const storedUser = localStorage.getItem("userData");

    if (!token) {
      router.push("/login");
      return;
    }

    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (e) {
        console.error("Gagal membaca profil");
      }
    }
    
    // Simulate slight loading for premium effect
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    router.push("/login"); 
  };

  // Remove top loading return

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-20 selection:bg-gold selection:text-background flex flex-col">
      {/* Header */}
      <header className="bg-panel border-b border-border-dark sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 h-20">
            <button 
              onClick={() => router.push("/dashboard")}
              className="p-2 -ml-2 text-gold hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-serif tracking-widest uppercase text-white flex-1">
              Kredensial Klien
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 lg:px-8 py-10 flex-1 w-full">
        {loading ? (
          <div className="animate-pulse space-y-10 w-full">
            <div className="bg-panel border border-border-dark h-48"></div>
            <div className="space-y-4">
              <div className="h-4 bg-white/5 w-40 mb-6"></div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-panel border border-border-dark h-20"></div>
              ))}
            </div>
          </div>
        ) : (
          <>
        {/* Profile Card */}
        <section className="bg-panel border border-border-dark p-8 sm:p-12 mb-10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl opacity-50"></div>
          
          <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
            <div className="w-28 h-28 border border-gold flex items-center justify-center bg-background shrink-0">
               {userData?.name?.charAt(0).toUpperCase() ? (
                 <span className="text-5xl font-serif text-gold">{userData.name.charAt(0).toUpperCase()}</span>
               ) : (
                 <User className="w-10 h-10 text-gold" />
               )}
            </div>
            
            <div className="text-center sm:text-left">
              <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em] mb-2 block">Identitas Personal</span>
              <h2 className="text-3xl font-serif text-white tracking-wide mb-2">{userData?.name || "Klien Premium"}</h2>
              <p className="text-sm font-light text-gray-400 flex items-center justify-center sm:justify-start gap-2">
                Hak Akses: <span className="uppercase tracking-widest text-white">{userData?.role || "GUEST"}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Data Formulir */}
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 px-1 flex items-center gap-3">
           <span className="w-6 h-[1px] bg-border-dark block"></span>
           Entitas Kontak & Demografi
        </h3>

        <section className="space-y-4 mb-12">
          
          <div className="bg-panel border border-border-dark p-6 flex items-start gap-4 transition-colors hover:border-white/20">
            <div className="w-8 h-8 rounded-none bg-background border border-border-dark flex items-center justify-center text-gray-400 shrink-0">
               <Mail className="w-4 h-4" />
            </div>
            <div className="flex-1 border-l border-border-dark pl-5">
              <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-1">Email Resmi</p>
              <p className="text-base font-light text-white tracking-wide">{userData?.email || "Tidak ditautkan"}</p>
            </div>
          </div>

          <div className="bg-panel border border-border-dark p-6 flex items-start gap-4 transition-colors hover:border-white/20">
            <div className="w-8 h-8 rounded-none bg-background border border-border-dark flex items-center justify-center text-gray-400 shrink-0">
               <Phone className="w-4 h-4" />
            </div>
            <div className="flex-1 border-l border-border-dark pl-5">
              <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-1">Narahubung (Telepon)</p>
              <p className="text-base font-light text-white tracking-wide">{userData?.phone || "Nomor Privat"}</p>
            </div>
          </div>

          <div className="bg-panel border border-border-dark p-6 flex items-start gap-4 transition-colors hover:border-white/20">
            <div className="w-8 h-8 rounded-none bg-background border border-border-dark flex items-center justify-center text-gray-400 shrink-0">
               <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1 border-l border-border-dark pl-5">
              <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Dominasi Wilayah ({userData?.city || "Kota Tidak Diketahui"})</p>
              <p className="text-sm font-light text-gray-300 leading-relaxed italic">
                {userData?.addressLine1 ? `"${userData.addressLine1}"` : "Informasi titik alamat lengkap belum didistribusikan ke dalam database prioritas."}
              </p>
            </div>
          </div>
          
        </section>

        {/* Sekuriti / Preferensi */}
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 px-1 flex items-center gap-3">
           <span className="w-6 h-[1px] bg-border-dark block"></span>
           Otorisasi & Keamanan
        </h3>

        <section className="bg-panel border border-border-dark overflow-hidden mb-12">
           <button className="w-full text-left p-6 flex items-center justify-between border-b border-border-dark hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-4">
                 <Shield className="w-5 h-5 text-gray-500 group-hover:text-gold transition-colors" />
                 <span className="text-sm font-light text-white tracking-wide">Pembaruan Kode Enkripsi (Katasandi)</span>
              </div>
              <ArrowLeft className="w-4 h-4 text-gray-600 rotate-180" />
           </button>
           <button className="w-full text-left p-6 flex items-center justify-between hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-4">
                 <Settings className="w-5 h-5 text-gray-500 group-hover:text-gold transition-colors" />
                 <span className="text-sm font-light text-white tracking-wide">Preferensi Notifikasi Terbatas</span>
              </div>
              <ArrowLeft className="w-4 h-4 text-gray-600 rotate-180" />
           </button>
        </section>

        <button 
           onClick={handleLogout}
           className="w-full p-5 bg-red-900/20 border border-red-900/50 flex justify-center items-center gap-3 text-red-500 uppercase tracking-widest text-[10px] font-bold hover:bg-red-900/40 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Tutup Sesi Portal Personal
        </button>
          </>
        )}
      </main>

      <footer className="py-8 pb-32 text-center text-gray-600 border-t border-white/5 mt-auto">
         <Diamond className="w-4 h-4 mx-auto mb-3 opacity-50" />
         <p className="text-[10px] uppercase tracking-widest">E-LAUNDRY CLIENT PORTAL • VER 1.0</p>
      </footer>
    </div>
  );
}
