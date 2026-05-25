"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, User, Mail, MapPin, Phone, LogOut,
  Settings, Shield, Sparkles, Loader2, ChevronRight, Shirt
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

    const fetchProfile = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://laundry-app-one-theta.vercel.app";
        const res = await fetch(`${apiUrl}/api/my/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const uProfile = data.data || data;
          setUserData(uProfile);
          localStorage.setItem("userData", JSON.stringify(uProfile));
        }
      } catch (e) { /* ignore */ }
      setLoading(false);
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    router.push("/login");
  };

  const infoItems = [
    { icon: Mail, label: "Email", value: userData?.email || "Tidak tersedia", color: "bg-[#E96A44]/10 text-[#E96A44]" },
    { icon: Phone, label: "Telepon", value: userData?.phone || "Tidak tersedia", color: "bg-[#F5B842]/10 text-[#F5B842]" },
    { icon: MapPin, label: `Alamat (${userData?.city || "Kota"})`, value: userData?.addressLine1 || "Belum ditambahkan", color: "bg-[#1E70D6]/10 text-[#1E70D6]" },
  ];

  return (
    <div className="min-h-screen bg-white text-foreground font-sans pb-20 flex flex-col relative">
      
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-peach-border bg-peach-light/95 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button onClick={() => router.push("/dashboard")} className="p-2 -ml-2 text-foreground/70 hover:text-accent transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <h1 className="text-lg font-display font-bold flex-1 text-left">Profil Saya</h1>
          </div>
        </div>
      </header>
 
      <main className={`max-w-3xl mx-auto px-6 lg:px-8 py-10 flex-1 w-full text-left ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
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
            <section className="bg-white border border-peach-border rounded-3xl p-8 sm:p-12 mb-8 relative overflow-hidden shadow-2xs">
              <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
                <div className="w-24 h-24 rounded-3xl bg-accent flex items-center justify-center shrink-0 shadow-md text-white">
                  {userData?.name?.charAt(0).toUpperCase() ? (
                    <span className="text-4xl font-display font-extrabold">{userData.name.charAt(0).toUpperCase()}</span>
                  ) : (
                    <User className="w-10 h-10" />
                  )}
                </div>

                <div className="text-center sm:text-left">
                  <span className="text-xs font-bold text-accent tracking-wider uppercase mb-1.5 block">Akun Personal</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold mb-1.5 text-foreground leading-tight">{userData?.name || "Pengguna"}</h2>
                  <p className="text-sm text-foreground/60 flex items-center justify-center sm:justify-start gap-2 font-semibold">
                    Role: <span className="text-accent font-bold capitalize">{userData?.role || "Customer"}</span>
                  </p>
                </div>
              </div>
            </section>

            {/* Membership Info Card */}
            {userData?.isMember && (
              <section className="bg-gradient-to-br from-peach-light to-white border border-peach-border rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden shadow-2xs">
                <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-accent/5 rounded-full blur-lg pointer-events-none"></div>
                <div className="flex items-center gap-3 mb-6 text-foreground font-display font-extrabold text-base">
                  <Sparkles className="w-5 h-5 text-accent" />
                  Membership Bulanan
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs text-foreground/40 font-bold uppercase tracking-wider">Tipe Member</p>
                    <p className="font-display font-extrabold text-lg text-accent uppercase tracking-wide">
                      {userData.memberType === "premium" ? "Premium Plan" : "Regular Plan"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-foreground/40 font-bold uppercase tracking-wider">Masa Berlaku</p>
                    <p className="font-semibold text-sm text-foreground/80">
                      Hingga {new Date(userData.memberExpiresAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="sm:col-span-2 space-y-2.5">
                    <div className="flex justify-between text-xs font-bold text-foreground/75">
                      <span>Sisa Kuota Cuci Bulanan:</span>
                      <span className="text-accent">{userData.quotaRemaining?.toFixed(1) || "0.0"} / 70.0 Kg</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-peach-dark rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, ((userData.quotaRemaining || 0) / 70) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Info Cards */}
            <h3 className="text-sm font-display font-bold text-foreground/60 mb-4 px-1 uppercase tracking-wider">Informasi Kontak</h3>
            <section className="space-y-3 mb-8">
              {infoItems.map((item, idx) => (
                <div key={idx} className="bg-white border border-peach-border rounded-2xl p-5 flex items-start gap-4 shadow-2xs">
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-sm text-foreground/75 font-semibold truncate">{item.value}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* Settings */}
            <h3 className="text-sm font-display font-bold text-foreground/60 mb-4 px-1 uppercase tracking-wider">Pengaturan</h3>
            <section className="bg-white border border-peach-border rounded-2xl overflow-hidden mb-8 shadow-2xs">
              {[
                { icon: Shield, label: "Ubah Kata Sandi" },
                { icon: Settings, label: "Preferensi Notifikasi" },
              ].map((item, idx) => (
                <button key={idx} className={`w-full text-left p-5 flex items-center justify-between hover:bg-peach-light/50 transition-colors group ${idx !== 1 ? 'border-b border-peach-border' : ''}`}>
                  <div className="flex items-center gap-4">
                    <item.icon className="w-5 h-5 text-foreground/50 group-hover:text-accent transition-colors" />
                    <span className="text-sm font-bold text-foreground/70 group-hover:text-foreground transition-colors">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-foreground/70 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </section>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full p-5 rounded-2xl bg-red-50 border border-red-200 flex justify-center items-center gap-3 text-red-600 text-sm font-bold hover:bg-red-100/50 transition-all shadow-2xs"
            >
              <LogOut className="w-4 h-4" /> Keluar dari Akun
            </button>
          </>
        )}
      </main>

      <footer className="py-8 pb-12 text-center border-t border-peach-border mt-auto bg-peach-light/30">
        <Shirt className="w-5 h-5 mx-auto mb-2 text-accent/30" />
        <p className="text-xs text-foreground/60 font-bold tracking-wider">E-LAUNDRY • v2.0</p>
      </footer>
    </div>
  );
}
