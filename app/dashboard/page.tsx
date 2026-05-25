"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut, 
  User, 
  MapPin, 
  Search, 
  Star, 
  Clock,
  ChevronRight, 
  FileText, 
  Home, 
  Sparkles, 
  Zap, 
  Shirt, 
  Heart,
  TrendingUp,
  Package,
  CheckCircle2,
  Gift
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
        const [ordersRes, laundriesRes, userRes] = await Promise.all([
          fetch(`${apiUrl}/api/order`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(`${apiUrl}/api/laundry/search/${searchCity}`),
          fetch(`${apiUrl}/api/my/user`, {
            headers: { Authorization: `Bearer ${token}` }
          })
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

        if (userRes.ok) {
          const uData = await userRes.json();
          const uProfile = uData.data || uData;
          setUserData(uProfile);
          localStorage.setItem("userData", JSON.stringify(uProfile));
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
      "placed": "text-amber-700 bg-amber-50 border-amber-200",
      "paid": "text-blue-700 bg-blue-50 border-blue-200",
      "inProgress": "text-[#E96A44] bg-[#E96A44]/10 border-[#E96A44]/20",
      "outForDelivery": "text-purple-700 bg-purple-50 border-purple-200",
      "delivered": "text-emerald-700 bg-emerald-50 border-emerald-200",
      "cancelled": "text-red-700 bg-red-50 border-red-200"
    };
    return map[status] || "text-foreground/75 bg-peach-dark/30 border-peach-border";
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 18) return "Selamat Siang";
    return "Selamat Malam";
  };

  return (
    <div className="min-h-screen bg-white pb-24 md:pb-0 text-foreground font-sans relative">
      
      {/* ═══ Top Header ═══ */}
      <header className="sticky top-0 z-40 border-b border-peach-border bg-peach-light/95 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <button onClick={() => router.push("/dashboard")} className="flex items-center gap-2 group text-left">
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Shirt className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-extrabold tracking-tight text-foreground">
                E-<span className="text-accent">Laundry</span>
              </span>
            </button>

            {/* Right Header Navigation */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end mr-2 text-right">
                <span className="text-sm font-display font-bold text-foreground leading-tight">{userData?.name || "Pengguna"}</span>
                <span className="text-xs text-foreground/60 font-medium">{userData?.email || ""}</span>
              </div>
              
              <button
                onClick={() => router.push("/profile")}
                className="w-10 h-10 rounded-xl bg-peach-dark text-accent border border-peach-border flex items-center justify-center font-display font-bold text-base hover:bg-accent hover:text-white transition-all duration-300"
              >
                {userData?.name?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
              </button>

              <button
                onClick={handleLogout}
                className="w-10 h-10 rounded-xl border border-peach-border bg-white text-foreground/60 hover:text-red-500 hover:border-red-200 flex items-center justify-center transition-all hidden sm:flex shadow-sm"
                title="Keluar"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ Main Content Area ═══ */}
      <main className={`max-w-7xl mx-auto px-6 lg:px-8 py-10 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        
        {/* Welcome Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>{greeting()}, {userData?.name?.split(' ')[0] || "Pengguna"} 👋</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-foreground">
              Dashboard
            </h1>
            <p className="text-foreground/60 text-sm mt-1.5 font-medium">Kelola semua aktivitas perawatan busana E-Laundry Anda di sini</p>
          </div>
        </div>

        {/* Stats Grid to make dashboard look rich and not "polosan" */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-peach-light border border-peach-border rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#E96A44]/10 text-[#E96A44] flex items-center justify-center shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-foreground/50 font-bold">Pesanan Aktif</p>
              <p className="text-xl font-display font-black text-foreground">{activeOrders.length}</p>
            </div>
          </div>

          <div className="bg-peach-light border border-peach-border rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#F5B842]/10 text-[#F5B842] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-foreground/50 font-bold">Proses Cuci</p>
              <p className="text-xl font-display font-black text-foreground">
                {activeOrders.filter(o => o.status === "inProgress").length}
              </p>
            </div>
          </div>

          <div className="bg-peach-light border border-peach-border rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#1E70D6]/10 text-[#1E70D6] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-foreground/50 font-bold">Metode Pengiriman</p>
              <p className="text-xs font-display font-extrabold text-foreground leading-tight mt-1">Antar Jemput</p>
            </div>
          </div>

          <div className="bg-peach-light border border-peach-border rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-foreground/50 font-bold">Poin Loyalitas</p>
              <p className="text-xl font-display font-black text-foreground">120 Pts</p>
            </div>
          </div>
        </div>

        {/* ═══ Main Grid ═══ */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Left Column (Main Area) */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Promo banner to enrich dashboard design */}
            <div className="bg-gradient-to-r from-accent to-[#E85C33] rounded-3xl p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-sm relative overflow-hidden">
              <div className="absolute right-[-10px] bottom-[-20px] w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="space-y-2 z-10 text-left">
                <div className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase">
                  <Gift className="w-3.5 h-3.5" /> Promo Spesial
                </div>
                <h3 className="text-xl font-display font-black">Diskon 20% Perawatan Pertama!</h3>
                <p className="text-white/80 text-xs font-medium">Gunakan kode voucher <span className="font-bold underline">NEATNEW</span> untuk pesanan pertama Anda.</p>
              </div>
              <button 
                onClick={() => router.push(`/search?city=${searchCity}`)}
                className="bg-white text-accent font-bold text-xs py-3 px-5 rounded-full hover:bg-peach-light transition-all shadow-sm shrink-0 whitespace-nowrap"
              >
                Pesan Sekarang
              </button>
            </div>

            {/* Active Orders Section */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-display font-bold flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-accent" />
                  </div>
                  Pesanan Aktif
                </h2>
                <button 
                  onClick={() => router.push("/orders")} 
                  className="text-xs font-bold text-accent hover:text-[#D85530] transition-colors flex items-center gap-1"
                >
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
                    <div 
                      onClick={() => router.push(`/order/${order._id}`)} 
                      key={order._id} 
                      className="bg-white border border-peach-border rounded-2xl p-6 cursor-pointer hover:border-accent hover:shadow-md transition-all duration-300 group text-left relative overflow-hidden" 
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      {/* Top bar details */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
                        <div>
                          <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${getStatusColor(order.status)} inline-block mb-3 shadow-2xs`}>
                            {getStatusText(order.status)}
                          </span>
                          <h3 className="text-lg font-display font-extrabold text-foreground group-hover:text-accent transition-colors leading-tight">
                            {`E-Laundry Hub ${order.laundry?.city || ""}`}
                          </h3>
                        </div>
                        <span className="text-xs font-mono font-bold text-foreground/75 bg-peach-light border border-peach-border px-3 py-1.5 rounded-lg">
                          #{order._id.substring(order._id.length - 8).toUpperCase()}
                        </span>
                      </div>

                      {/* Visual progress bar inside order card to prevent it from looking plain */}
                      <div className="mb-6">
                        <div className="flex justify-between text-[10px] text-foreground/50 font-bold mb-2">
                          <span>Dipesan</span>
                          <span>Diproses</span>
                          <span>Dikirim</span>
                          <span>Selesai</span>
                        </div>
                        <div className="w-full h-2 bg-peach-light rounded-full overflow-hidden flex">
                          <div className={`h-full bg-accent rounded-full transition-all duration-500 ${
                            order.status === "placed" ? "w-1/4" :
                            order.status === "paid" ? "w-2/4" :
                            order.status === "inProgress" ? "w-3/4" :
                            order.status === "outForDelivery" ? "w-[90%]" :
                            order.status === "delivered" ? "w-full" : "w-[10%]"
                          }`}></div>
                        </div>
                      </div>

                      {/* Summary details */}
                      <div className="flex items-center gap-6 text-xs text-foreground/70 mb-5 border-t border-peach-border pt-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-accent/80" />
                          <span className="font-semibold">{new Date(order.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shirt className="w-4 h-4 text-accent/80" />
                          <span className="text-foreground font-extrabold">{formatIDR(order.totalAmount)}</span>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-between items-center border-t border-peach-border">
                        <span className="text-xs text-foreground/50 font-bold">Estimasi Selesai: {order.laundry?.estimatedDeliveryTime || "48"} Jam</span>
                        <span className="text-xs text-accent font-bold flex items-center gap-1 group-hover:translate-x-1 transition-all">
                          Detail Pesanan <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-peach-light border border-peach-border rounded-3xl p-12 text-center relative overflow-hidden shadow-sm">
                  <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-white/40 rounded-full blur-xl"></div>
                  <div className="relative z-10 space-y-5">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 mx-auto flex items-center justify-center text-accent">
                      <Shirt className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-extrabold mb-1">Belum Ada Pesanan Aktif</h3>
                      <p className="text-foreground/60 text-sm max-w-sm mx-auto font-medium">Mulai rasakan kemudahan mencuci pakaian dengan memesan layanan E-Laundry sekarang.</p>
                    </div>
                    <button 
                      onClick={() => router.push(`/search?city=${searchCity}`)} 
                      className="btn-primary"
                    >
                      Jadwalkan Layanan Baru
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="xl:col-span-1 space-y-6">
            
            {/* Membership Card */}
            <div className="bg-gradient-to-br from-peach-light to-white border border-peach-border rounded-3xl p-6 shadow-sm text-left relative overflow-hidden">
              <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-accent/5 rounded-full blur-lg pointer-events-none"></div>
              
              <h3 className="text-sm font-display font-bold mb-4 flex items-center gap-2 text-foreground">
                <Sparkles className="w-4 h-4 text-accent" />
                Status Membership
              </h3>

              {userData?.isMember ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white bg-accent px-3 py-1 rounded-full uppercase tracking-wider">
                      {userData.memberType === "premium" ? "Premium Member" : "Regular Member"}
                    </span>
                    <span className="text-[10px] text-foreground/50 font-bold">
                      Aktif s/d {new Date(userData.memberExpiresAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-foreground/75">
                      <span>Sisa Kuota Cuci:</span>
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

                  <p className="text-[10px] text-foreground/60 leading-relaxed font-medium">
                    Kuota Anda akan terpotong secara otomatis setelah pakaian dijemput dan ditimbang oleh kurir.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-foreground/60 font-semibold leading-relaxed">
                    Belum bergabung dengan program membership? Nikmati kuota cuci bulanan hingga 70 Kg dengan harga lebih hemat!
                  </p>
                  <button 
                    onClick={() => {
                      router.push("/");
                      setTimeout(() => {
                        const pricingSec = document.getElementById("pricing");
                        if (pricingSec) pricingSec.scrollIntoView({ behavior: "smooth" });
                      }, 300);
                    }}
                    className="w-full btn-outline !text-xs py-3 text-center"
                  >
                    Daftar Member Bulanan
                  </button>
                </div>
              )}
            </div>

            {/* Search Location Card */}
            <div className="bg-peach-light border border-peach-border rounded-3xl p-6 shadow-sm text-left">
              <h3 className="text-sm font-display font-bold mb-4 flex items-center gap-2 text-foreground">
                <MapPin className="w-4 h-4 text-accent" />
                Cari Lokasi Layanan
              </h3>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full !pl-4 !pr-12 !rounded-xl !text-sm !border-peach-border"
                  placeholder="Masukkan nama kota..."
                  required
                />
                <button 
                  type="submit" 
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-foreground/60 hover:text-accent transition-colors"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Partners List */}
            <section className="text-left">
              <h2 className="text-sm font-display font-bold mb-4 flex items-center gap-2 text-foreground">
                <Star className="w-4 h-4 text-[#F5B842]" />
                Mitra Terdekat di {searchCity}
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
                    <div 
                      onClick={() => router.push(`/partner/${partner._id}`)} 
                      key={partner._id} 
                      className="bg-white border border-peach-border rounded-2xl overflow-hidden cursor-pointer group flex h-24 hover:border-accent hover:shadow-xs transition-all duration-300"
                    >
                      <div className="w-24 relative flex-shrink-0 overflow-hidden bg-peach-dark">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/partner-laundry.png"
                          alt={`E-Laundry Hub ${partner.city || ""}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <h3 className="font-display font-extrabold text-sm text-foreground group-hover:text-accent transition-colors truncate">
                            {`E-Laundry Hub ${partner.city || ""}`}
                          </h3>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-foreground/60 font-semibold">
                            <div className="flex items-center gap-1 text-[#F5B842]">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span>{partner.rating?.toFixed(1) || "5.0"}</span>
                            </div>
                            <span className="flex items-center gap-1 truncate">
                              <MapPin className="w-3.5 h-3.5 shrink-0" />
                              {partner.city}
                            </span>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-white bg-accent px-2 py-0.5 rounded-md self-start uppercase tracking-wider">
                          Aktif
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    onClick={() => router.push(`/search?city=${searchCity}`)} 
                    className="w-full bg-peach-light border border-peach-border rounded-2xl py-4 text-center text-xs font-bold text-foreground/70 hover:text-accent hover:border-accent transition-all duration-300"
                  >
                    Lihat Semua Mitra →
                  </button>
                </div>
              ) : (
                <div className="bg-peach-light border border-peach-border rounded-2xl p-6 text-center text-xs text-foreground/60 font-bold">
                  Belum ada mitra di area ini.
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* ═══ Mobile Bottom Navigation Bar (Peach Light layout matching dashboard navbar) ═══ */}
      <div className="md:hidden fixed bottom-0 w-full z-50 border-t border-peach-border bg-peach-light/95 backdrop-blur-md">
        <div className="px-6 py-3 flex justify-between items-center">
          <button 
            onClick={() => router.push("/dashboard")} 
            className="flex flex-col items-center gap-1.5 text-accent"
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-bold">Beranda</span>
          </button>
          
          <button 
            onClick={() => router.push("/orders")} 
            className="flex flex-col items-center gap-1.5 text-foreground/60 hover:text-accent transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Pesanan</span>
          </button>
          
          <button 
            onClick={() => router.push(`/search?city=${searchCity}`)} 
            className="flex justify-center items-center w-12 h-12 bg-accent text-white rounded-full transform -translate-y-4 shadow-md shadow-accent/20 hover:scale-105 transition-transform"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => router.push("/profile")} 
            className="flex flex-col items-center gap-1.5 text-foreground/60 hover:text-accent transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Profil</span>
          </button>
          
          <button 
            onClick={handleLogout} 
            className="flex flex-col items-center gap-1.5 text-foreground/60 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Keluar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
