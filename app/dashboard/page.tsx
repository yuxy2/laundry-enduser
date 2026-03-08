"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  LogOut, User, MapPin, Search, Star, Clock, 
  ChevronRight, Diamond, FileText, Home
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // States for API data
  const [activeOrders, setActiveOrders] = useState<any[]>([]);
  const [recommendedPartners, setRecommendedPartners] = useState<any[]>([]);
  const [searchCity, setSearchCity] = useState("Yogyakarta");

  useEffect(() => {
    // Authentication Check
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

    // Fetch Dashboard Data from API
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

  // Removing top-level loading early return

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount || 0);
  };

  const getStatusText = (status: string) => {
    const map: any = {
      "placed": "Pesanan Diterima",
      "paid": "Otorisasi Pembayaran",
      "inProgress": "Perawatan Aktif",
      "outForDelivery": "Dlm Pengantaran",
      "delivered": "Selesai",
      "cancelled": "Dibatalkan"
    };
    return map[status] || status;
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 text-foreground font-sans selection:bg-gold selection:text-background">
      {/* Top Header */}
      <header className="bg-panel border-b border-white/5 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button onClick={() => router.push("/dashboard")} className="flex items-center gap-3 text-gold hover:text-white transition-colors">
              <Diamond className="w-5 h-5 fill-current" />
              <span className="text-lg font-serif tracking-widest text-white hidden sm:block">E-LAUNDRY</span>
            </button>
            
            <div className="flex items-center gap-5">
              <div className="flex flex-col items-end mr-2 hidden sm:flex">
                <span className="text-sm font-serif text-white tracking-wide">{userData?.name || "Klien Anonim"}</span>
                <span className="text-xs font-light tracking-wide text-gray-400">{userData?.email || "Privat"}</span>
              </div>
              <button onClick={() => router.push("/profile")} className="w-10 h-10 rounded-none bg-background border border-border-dark flex items-center justify-center text-gold font-serif text-lg overflow-hidden cursor-pointer hover:border-gold transition-all">
                {userData?.name?.charAt(0).toUpperCase() || <User className="w-4 h-4 text-gold" />}
              </button>
              <button 
                onClick={handleLogout}
                className="w-10 h-10 border border-white/5 bg-white/5 text-gray-400 hover:text-red-400 hover:border-red-900 flex items-center justify-center transition-colors hidden sm:flex"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Welcome Section */}
        <div className="mb-12 border-b border-white/5 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight mb-2">
              Salam hangat, {userData?.name?.split(' ')[0] || "Klien"}. 
            </h1>
            <p className="text-gray-400 font-light text-sm tracking-wide uppercase">Konsol Manajemen Perawatan Pribadi</p>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          
          {/* Left Column (Orders) */}
          <div className="xl:col-span-2 space-y-12">
            
            <section>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-lg font-serif text-white uppercase tracking-widest relative">
                  <span className="absolute -left-4 top-1 aspect-square w-1 bg-gold"></span>
                  Pesanan Berjalan
                </h2>
                <button onClick={() => router.push("/orders")} className="text-xs font-bold tracking-widest uppercase text-gold hover:text-white transition-all">
                  Riwayat Penuh
                </button>
              </div>
              
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-panel border border-border-dark p-6 h-48 mt-4"></div>
                  ))}
                </div>
              ) : activeOrders.length > 0 ? (
                <div className="space-y-4">
                  {activeOrders.map((order) => (
                    <div onClick={() => router.push(`/order/${order._id}`)} key={order._id} className="block group">
                      <div className="bg-panel border border-border-dark p-6 hover:border-gold transition-all relative overflow-hidden cursor-pointer mt-4">
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                          <div>
                            <p className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-2">
                              STAT: {getStatusText(order.status)}
                            </p>
                            <h3 className="text-xl font-serif text-white">{order.laundry?.laundryName || "Mitra Kurasi Privat"}</h3>
                          </div>
                          <span className="text-[10px] tracking-widest font-mono text-gray-500 bg-background px-3 py-1.5 border border-white/5">
                            ID/ {order._id.substring(order._id.length - 8).toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-6 text-xs text-gray-400 font-light mb-6">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-gold" />
                            <span>{new Date(order.createdAt).toLocaleDateString('id-ID', {day: '2-digit', month: 'long', year: 'numeric'})}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Diamond className="w-3.5 h-3.5 text-gold" />
                            <span className="text-white">{formatIDR(order.totalAmount)}</span>
                          </div>
                        </div>
                        
                        <div className="pt-5 flex justify-between items-center border-t border-white/5">
                          <span className="text-xs font-light text-gray-400 tracking-wide uppercase">Durasi: {order.laundry?.estimatedDeliveryTime || "Standar 48 Jam"}</span>
                          <span className="text-xs text-gold uppercase tracking-widest font-bold group-hover:text-white transition-colors flex items-center gap-1">
                            Rincian <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-panel border border-border-dark p-12 text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl opacity-50"></div>
                  <Diamond className="w-8 h-8 text-gold/30 mx-auto mb-4" />
                  <h3 className="text-xl font-serif text-white mb-2">Belum ada aktivitas</h3>
                  <p className="text-gray-400 font-light text-sm mb-8 tracking-wide">Lemari pelacakan Anda saat ini kosong.</p>
                  
                  <button onClick={() => router.push(`/search?city=${searchCity}`)} className="inline-flex justify-center items-center bg-gold hover:bg-gold-hover text-background px-6 py-3 uppercase tracking-widest text-[10px] font-bold transition-all relative z-10">
                    Jadwalkan Layanan
                  </button>
                </div>
              )}
            </section>

          </div>

          {/* Right Column (Recommendations) */}
          <div className="xl:col-span-1 space-y-10">
            
            {/* Search Box as part of the side column */}
            <div className="bg-panel border border-border-dark p-6">
              <h3 className="text-xs font-bold tracking-widest text-gold uppercase mb-5">Lokasi Layanan</h3>
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full pl-0 pr-10 py-2 bg-transparent border-b border-border-dark text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors font-light text-sm rounded-none"
                  placeholder="Wilayah kurasi (mis. Jakarta)"
                  required
                />
                <button type="submit" className="absolute inset-y-0 right-0 text-gray-500 hover:text-gold transition-colors">
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div>

            <section>
              <h2 className="text-sm font-serif text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-gold block"></span>
                Kurasi di {searchCity}
              </h2>
              
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-panel border border-border-dark h-28"></div>
                  ))}
                </div>
              ) : recommendedPartners.length > 0 ? (
                <div className="space-y-4">
                  {recommendedPartners.map((partner) => (
                    <div onClick={() => router.push(`/partner/${partner._id}`)} key={partner._id} className="block group cursor-pointer">
                      <div className="bg-panel border border-border-dark overflow-hidden transition-colors hover:border-gold flex h-28 relative">
                        <div className="w-24 relative flex-shrink-0 bg-background overflow-hidden border-r border-border-dark">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={partner.imageUrl || "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400&h=300&fit=crop"} 
                            alt={partner.laundryName}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                          />
                        </div>
                        <div className="p-4 flex flex-col justify-between flex-1 relative">
                          <div>
                            <h3 className="font-serif text-white group-hover:text-gold transition-colors text-sm tracking-wide line-clamp-1">{partner.laundryName}</h3>
                            <div className="flex items-center gap-3 mt-1.5 text-[10px] font-light">
                              <div className="flex items-center gap-1 text-gold">
                                <Star className="w-3 h-3 fill-current" />
                                <span>{partner.rating?.toFixed(1) || "5.0"}</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-500 uppercase tracking-widest">
                                <MapPin className="w-3 h-3 text-gray-600" />
                                <span className="line-clamp-1">{partner.city}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center w-full">
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white border border-white/20 px-2 py-0.5">Aktif</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => router.push(`/search?city=${searchCity}`)} className="block w-full text-center mt-6 py-4 border border-white/5 bg-white/5 text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 hover:text-white hover:border-gold transition-all">
                    Akses Direktori Lengkap
                  </button>
                </div>
              ) : (
                <div className="bg-panel border border-border-dark p-6 text-center text-xs text-gray-500 font-light tracking-wide">
                  Tidak ada armada tersedia di koridor wilayah ini.
                </div>
              )}
            </section>
          </div>
          
        </div>
      </main>

      {/* Mobile Bottom Navigation Placeholder */}
      <div className="md:hidden fixed bottom-0 w-full bg-panel border-t border-border-dark px-6 py-4 flex justify-between items-center z-50">
        <button onClick={() => router.push("/dashboard")} className="flex flex-col items-center gap-1.5 text-gold">
          <Home className="w-5 h-5" />
          <span className="text-[9px] tracking-widest uppercase font-bold">Utama</span>
        </button>
        <button onClick={() => router.push("/orders")} className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-white transition-colors">
          <FileText className="w-5 h-5" />
          <span className="text-[9px] tracking-widest uppercase font-light">Arsip</span>
        </button>
        <button className="flex justify-center items-center w-12 h-12 bg-gold text-background rounded-none border border-gold transform -translate-y-6 hover:bg-white transition-colors">
          <Diamond className="w-5 h-5 fill-current" />
        </button>
        <button onClick={() => router.push("/profile")} className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-white transition-colors">
          <User className="w-5 h-5" />
          <span className="text-[9px] tracking-widest uppercase font-light">Klien</span>
        </button>
        <button onClick={handleLogout} className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-red-400 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="text-[9px] tracking-widest uppercase font-light">Keluar</span>
        </button>
      </div>
    </div>
  );
}
