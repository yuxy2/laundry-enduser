"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, User, Mail, MapPin, Phone, LogOut,
  Settings, Shield, Sparkles, Loader2, ChevronRight
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    router.push("/login");
  };

  const infoItems = [
    { icon: Mail, label: "Email", value: userData?.email || "Tidak tersedia", color: "from-accent to-accent-hover" },
    { icon: Phone, label: "Telepon", value: userData?.phone || "Tidak tersedia", color: "from-accent2 to-purple-600" },
    { icon: MapPin, label: `Alamat (${userData?.city || "Kota"})`, value: userData?.addressLine1 || "Belum ditambahkan", color: "from-accent3 to-pink-600" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-20 flex flex-col relative">
      <div className="glow-orb glow-teal w-[400px] h-[400px] -top-40 -left-20 animate-pulse-glow fixed opacity-30"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10" style={{ background: 'rgba(10, 14, 26, 0.8)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button onClick={() => router.push("/dashboard")} className="p-2 -ml-2 text-foreground/70 hover:text-accent transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <h1 className="text-lg font-display font-semibold flex-1">Profil Saya</h1>
          </div>
        </div>
      </header>

      <main className={`max-w-3xl mx-auto px-6 lg:px-8 py-10 flex-1 w-full ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        {loading ? (
          <div className="space-y-6">
            <div className="skeleton h-52 rounded-3xl"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton h-20 rounded-2xl"></div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Profile Card */}
            <section className="glass-card !rounded-3xl p-8 sm:p-12 mb-8 relative overflow-hidden">
              <div className="glow-orb glow-teal w-[200px] h-[200px] -top-10 -left-10 animate-pulse-glow"></div>

              <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent to-accent2 flex items-center justify-center shrink-0 shadow-lg shadow-accent/20">
                  {userData?.name?.charAt(0).toUpperCase() ? (
                    <span className="text-4xl font-display font-bold text-background">{userData.name.charAt(0).toUpperCase()}</span>
                  ) : (
                    <User className="w-10 h-10 text-background" />
                  )}
                </div>

                <div className="text-center sm:text-left">
                  <span className="text-xs font-semibold text-accent tracking-wider uppercase mb-2 block">Akun Personal</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">{userData?.name || "Pengguna"}</h2>
                  <p className="text-sm text-foreground/60 flex items-center justify-center sm:justify-start gap-2">
                    Role: <span className="text-accent font-semibold capitalize">{userData?.role || "Customer"}</span>
                  </p>
                </div>
              </div>
            </section>

            {/* Info Cards */}
            <h3 className="text-sm font-display font-semibold text-foreground/70 mb-4 px-1">Informasi Kontak</h3>
            <section className="space-y-3 mb-8">
              {infoItems.map((item, idx) => (
                <div key={idx} className="glass-card !rounded-2xl p-5 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0`}>
                    <item.icon className="w-5 h-5 text-background" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-sm text-foreground/70 font-light">{item.value}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* Settings */}
            <h3 className="text-sm font-display font-semibold text-foreground/70 mb-4 px-1">Pengaturan</h3>
            <section className="glass-card !rounded-2xl overflow-hidden mb-8">
              {[
                { icon: Shield, label: "Ubah Kata Sandi" },
                { icon: Settings, label: "Preferensi Notifikasi" },
              ].map((item, idx) => (
                <button key={idx} className={`w-full text-left p-5 flex items-center justify-between hover:bg-white/10 transition-colors group ${idx !== 1 ? 'border-b border-white/10' : ''}`}>
                  <div className="flex items-center gap-4">
                    <item.icon className="w-5 h-5 text-foreground/60 group-hover:text-accent transition-colors" />
                    <span className="text-sm text-foreground/70 group-hover:text-foreground transition-colors">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-foreground/75 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </section>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full p-5 rounded-2xl bg-red-500/5 border border-red-500/10 flex justify-center items-center gap-3 text-red-400 text-sm font-semibold hover:bg-red-500/10 hover:border-red-500/20 transition-all"
            >
              <LogOut className="w-4 h-4" /> Keluar dari Akun
            </button>
          </>
        )}
      </main>

      <footer className="py-8 pb-32 text-center border-t border-white/10 mt-auto">
        <Sparkles className="w-4 h-4 mx-auto mb-3 text-accent/30" />
        <p className="text-xs text-foreground/70 font-light">E-LAUNDRY • v2.0</p>
      </footer>
    </div>
  );
}
