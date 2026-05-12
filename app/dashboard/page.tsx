"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut, User, MapPin, Search, Star, Clock,
  ChevronRight, FileText, Home, Sparkles, Zap
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const [activeOrders, setActiveOrders] = useState<any[]>([]);
  const [recommendedPartners, setRecommendedPartners] = useState<any[]>([]);
  const [searchCity, setSearchCity] = useState("Yogyakarta");

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("userToken");
    const storedUser = localStorage.getItem("userData");

    if (!token) {
      router.push("/login");
      return;
    } else {
      if (storedUser) {
        try {
          setUserData(JSON.parse(storedUser));
        } catch (e) {
          console.error("Gagal membaca data user");
        }
      }
    }

    const fetchDashboardData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://laundry-app-one-theta.vercel.app";
        const [ordersRes, laundriesRes] = await Promise.all([
          fetch(`${apiUrl}/api/order`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(`${apiUrl}/api/laundry/search/${searchCity}`)
        ]);

        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          const active = (ordersData.data || []).filter(
            (o: any) => o.status !== "delivered" && o.status !== "cancelled"
          );
          setActiveOrders(active);
        }

        if (laundriesRes.ok) {
          const laundriesData = await laundriesRes.json();
          setRecommendedPartners(laundriesData.data?.data || []);
        }
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router, searchCity]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    router.push("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCity.trim() !== "") {
      router.push(`/search?city=${encodeURIComponent(searchCity)}`);
    }
  };

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount || 0);
  };

  const getStatusText = (status: string) => {
    const map: any = {
      "placed": "Menunggu Pembayaran",
      "paid": "Pembayaran Sukses",
      "inProgress": "Sedang Diproses",
      "outForDelivery": "Dalam Pengantaran",
      "delivered": "Selesai",
      "cancelled": "Dibatalkan"
    };
    return map[status] || status;
  };

  const getStatusColor = (status: string) => {
    const map: any = {
      "placed": "text-amber-400 bg-amber-400/10 border-amber-400/20",
      "paid": "text-blue-400 bg-blue-400/10 border-blue-400/20",
      "inProgress": "text-accent bg-accent/10 border-accent/20",
      "outForDelivery": "text-accent2 bg-accent2/10 border-accent2/20",
      "delivered": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      "cancelled": "text-red-400 bg-red-400/10 border-red-400/20"
    };
    return map[status] || "text-foreground/70 bg-white/10 border-white/10";
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 18) return "Selamat Siang";
    return "Selamat Malam";
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0 text-foreground font-sans relative">
      {/* Background Glow */}
      <div className="glow-orb glow-teal w-[400px] h-[400px] -top-40 right-20 animate-pulse-glow fixed opacity-50"></div>

      {/* ═══ Top Header ═══ */}
      <header className="sticky top-0 z-40 border-b border-white/10" style={{ background: 'rgba(10, 14, 26, 0.8)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button onClick={() => router.push("/dashboard")} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent2 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-background" />
              </div>
              <span className="text-lg font-display font-bold hidden sm:block">E-Laundry</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-sm font-display font-semibold">{userData?.name || "Pengguna"}</span>
                <span className="text-xs text-foreground/60">{userData?.email || ""}</span>
              </div>
              <button
                onClick={() => router.push("/profile")}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent2/20 border border-white/10 flex items-center justify-center text-accent font-display text-lg overflow-hidden hover:border-accent/30 transition-all"
              >
                {userData?.name?.charAt(0).toUpperCase() || <User className="w-4 h-4 text-accent" />}
              </button>
              <button
                onClick={handleLogout}
                className="w-10 h-10 rounded-xl border border-white/10 text-foreground/60 hover:text-red-400 hover:border-red-400/30 flex items-center justify-center transition-all hidden sm:flex"
                title="Keluar"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className={`max-w-7xl mx-auto px-6 lg:px-8 py-10 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* ═══ Welcome ═══ */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-accent text-sm font-medium mb-2">{greeting()} 👋</p>
            <h1 className="text-3xl sm:text-4xl font-display font-bold">
              {userData?.name?.split(' ')[0] || "Pengguna"}
            </h1>
            <p className="text-foreground/60 text-sm mt-2 font-light">Kelola semua aktivitas laundry Anda di sini</p>
          </div>
        </div>

        {/* ═══ Main Grid ═══ */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Left Column */}
          <div className="xl:col-span-2 space-y-8">
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-display font-semibold flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-accent" />
                  </div>
                  Pesanan Aktif
                </h2>
                <button onClick={() => router.push("/orders")} className="text-sm font-medium text-accent hover:text-accent-hover transition-colors flex items-center gap-1">
                  Lihat Semua <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="skeleton h-44 rounded-2xl"></div>
                  ))}
                </div>
              ) : activeOrders.length > 0 ? (
                <div className="space-y-4">
                  {activeOrders.map((order, idx) => (
                    <div onClick={() => router.push(`/order/${order._id}`)} key={order._id} className="glass-card !rounded-2xl p-6 cursor-pointer group" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
                        <div>
                          <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${getStatusColor(order.status)} inline-block mb-3`}>
                            {getStatusText(order.status)}
                          </span>
                          <h3 className="text-lg font-display font-semibold group-hover:text-accent transition-colors">{`E-Laundry Hub ${order.laundry?.city || ""}`}</h3>
                        </div>
                        <span className="text-xs font-mono text-foreground/75 bg-white/10 px-3 py-1.5 rounded-lg">
                          #{order._id.substring(order._id.length - 8).toUpperCase()}
                        </span>
                      </div>

                      <div className="flex items-center gap-6 text-xs text-foreground/70 mb-5">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-accent/60" />
                          <span>{new Date(order.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-accent/60" />
                          <span className="text-foreground font-semibold">{formatIDR(order.totalAmount)}</span>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-between items-center border-t border-white/10">
                        <span className="text-xs text-foreground/75">Durasi: {order.laundry?.estimatedDeliveryTime || "48"} Jam</span>
                        <span className="text-xs text-accent font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Detail <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card !rounded-2xl p-12 text-center relative overflow-hidden">
                  <div className="glow-orb glow-teal w-[200px] h-[200px] -top-20 -right-20 animate-pulse-glow"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 mx-auto mb-5 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-accent/40" />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-2">Belum Ada Pesanan</h3>
                    <p className="text-foreground/60 text-sm mb-8 font-light">Mulai dengan menjadwalkan layanan laundry pertama Anda.</p>
                    <button onClick={() => router.push(`/search?city=${searchCity}`)} className="btn-primary !text-sm">
                      <Sparkles className="w-4 h-4" />
                      Jadwalkan Layanan
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right Column */}
          <div className="xl:col-span-1 space-y-6">
            {/* Search */}
            <div className="glass-card !rounded-2xl p-6">
              <h3 className="text-sm font-display font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                Cari Lokasi
              </h3>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full !pl-4 !pr-10 !rounded-xl !text-sm"
                  placeholder="Masukkan nama kota..."
                  required
                />
                <button type="submit" className="absolute inset-y-0 right-0 pr-3 text-foreground/60 hover:text-accent transition-colors">
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Partners */}
            <section>
              <h2 className="text-sm font-display font-semibold mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-accent4" />
                Mitra di {searchCity}
              </h2>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="skeleton h-24 rounded-2xl"></div>
                  ))}
                </div>
              ) : recommendedPartners.length > 0 ? (
                <div className="space-y-3">
                  {recommendedPartners.map((partner) => (
                    <div onClick={() => router.push(`/partner/${partner._id}`)} key={partner._id} className="glass-card !rounded-2xl overflow-hidden cursor-pointer group flex h-24">
                      <div className="w-24 relative flex-shrink-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/partner-laundry.png"
                          alt={`E-Laundry Hub ${partner.city || ""}`}
                          className="w-full h-full object-cover !rounded-none opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                        />
                      </div>
                      <div className="p-4 flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="font-display font-semibold text-sm group-hover:text-accent transition-colors truncate">{`E-Laundry Hub ${partner.city || ""}`}</h3>
                          <div className="flex items-center gap-3 mt-1 text-xs text-foreground/60">
                            <div className="flex items-center gap-1 text-accent4">
                              <Star className="w-3 h-3 fill-current" />
                              <span>{partner.rating?.toFixed(1) || "5.0"}</span>
                            </div>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {partner.city}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-md self-start">Aktif</span>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => router.push(`/search?city=${searchCity}`)} className="w-full glass-card !rounded-2xl py-4 text-center text-sm font-medium text-foreground/60 hover:text-accent transition-colors">
                    Lihat Semua Mitra →
                  </button>
                </div>
              ) : (
                <div className="glass-card !rounded-2xl p-6 text-center text-sm text-foreground/75 font-light">
                  Belum ada mitra di area ini.
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* ═══ Mobile Bottom Nav ═══ */}
      <div className="md:hidden fixed bottom-0 w-full z-50 border-t border-white/10" style={{ background: 'rgba(10, 14, 26, 0.9)', backdropFilter: 'blur(20px)' }}>
        <div className="px-6 py-3 flex justify-between items-center">
          <button onClick={() => router.push("/dashboard")} className="flex flex-col items-center gap-1.5 text-accent">
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Beranda</span>
          </button>
          <button onClick={() => router.push("/orders")} className="flex flex-col items-center gap-1.5 text-foreground/60 hover:text-foreground transition-colors">
            <FileText className="w-5 h-5" />
            <span className="text-[10px] font-light">Pesanan</span>
          </button>
          <button onClick={() => router.push("/search?city=Yogyakarta")} className="flex justify-center items-center w-14 h-14 bg-gradient-to-br from-accent to-accent2 rounded-2xl transform -translate-y-4 shadow-lg shadow-accent/20">
            <Sparkles className="w-6 h-6 text-background" />
          </button>
          <button onClick={() => router.push("/profile")} className="flex flex-col items-center gap-1.5 text-foreground/60 hover:text-foreground transition-colors">
            <User className="w-5 h-5" />
            <span className="text-[10px] font-light">Profil</span>
          </button>
          <button onClick={handleLogout} className="flex flex-col items-center gap-1.5 text-foreground/60 hover:text-red-400 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] font-light">Keluar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
