"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LogOut, User, MapPin, Search, Star, Clock, 
  ChevronRight, Shirt, Loader2, Home, FileText
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // States for API data
  const [activeOrders, setActiveOrders] = useState<any[]>([]);
  const [recommendedPartners, setRecommendedPartners] = useState<any[]>([]);
  const [searchCity, setSearchCity] = useState("Jakarta"); // Default city for recommendations

  useEffect(() => {
    // Authentication Check
    const token = localStorage.getItem("userToken");
    const storedUser = localStorage.getItem("userData");

    if (!token) {
      router.push("/login"); // Redirect to login if no token
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
        
        // Parallel API Requests:
        // 1. Fetch Orders (Needs Auth)
        // 2. Fetch Laundries locally in Jakarta (Public API)
        const [ordersRes, laundriesRes] = await Promise.all([
          fetch(`${apiUrl}/api/order`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(`${apiUrl}/api/laundry/search/${searchCity}`)
        ]);

        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          // Filter out delivered or cancelled orders to show only "active"
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  // Format IDR currency helper
  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount || 0);
  };

  // Status text map
  const getStatusText = (status: string) => {
    const map: any = {
      "placed": "Pesanan Dibuat",
      "paid": "Sudah Dibayar",
      "inProgress": "Sedang Dicuci",
      "outForDelivery": "Dlm Pengantaran",
      "delivered": "Selesai",
      "cancelled": "Dibatalkan"
    };
    return map[status] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 text-gray-800 font-sans selection:bg-blue-200">
      {/* Top Header - Desktop & Mobile */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
                <Shirt className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600 hidden sm:block">
                WashEase
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end mr-2 hidden sm:flex">
                <span className="text-sm font-bold text-gray-900">{userData?.name || "Pelanggan"}</span>
                <span className="text-xs font-semibold text-gray-500">{userData?.email || ""}</span>
              </div>
              <Link href="/profile" className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                {userData?.name?.charAt(0).toUpperCase() || <User className="w-5 h-5 text-blue-600" />}
              </Link>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors hidden sm:flex"
                title="Keluar"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Halo, {userData?.name?.split(' ')[0] || "Teman"}! <span className="inline-block animate-bounce origin-bottom-right delay-1000">👋</span>
          </h1>
          <p className="mt-1.5 text-gray-500 font-medium text-lg">Mau cuci apa hari ini?</p>
        </div>

        {/* Search Bar Action */}
        <form onSubmit={handleSearch} className="relative mb-10 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors z-10">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="w-full pl-12 pr-24 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium shadow-sm hover:shadow-md text-base"
            placeholder="Cari Kota... (misal: Jakarta, Bandung)"
            required
          />
          <button type="submit" className="absolute inset-y-2 right-2 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm">
            Cari
          </button>
        </form>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Orders) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Active Orders */}
            <section>
              <div className="flex justify-between items-end mb-5">
                <h2 className="text-xl font-extrabold text-gray-900">Pesanan Aktif</h2>
                <Link href="/orders" className="text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline underline-offset-4 transition-all">
                  Lihat Semua
                </Link>
              </div>
              
              {activeOrders.length > 0 ? (
                <div className="space-y-4">
                  {activeOrders.map((order) => (
                    <Link href={`/order/${order._id}`} key={order._id}>
                      <div className="bg-white border hover:border-blue-300 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all relative overflow-hidden group cursor-pointer mt-4">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-400 to-indigo-600"></div>
                        
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md mb-2.5 inline-block uppercase tracking-wider">
                              {getStatusText(order.status)}
                            </p>
                            <h3 className="text-lg font-bold text-gray-900">{order.laundry?.laundryName || "Laundry Mitra"}</h3>
                          </div>
                          <span className="text-xs font-bold text-gray-500 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">
                            #{order._id.substring(order._id.length - 6).toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-5 text-sm text-gray-600 mb-5">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{new Date(order.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Shirt className="w-4 h-4 text-gray-400" />
                            <span className="font-bold text-gray-900">{formatIDR(order.totalAmount)}</span>
                          </div>
                        </div>
                        
                        <div className="pt-4 flex justify-between items-center border-t border-gray-100/80">
                          <span className="text-sm font-semibold text-gray-500">Estimasi Tiba: {order.laundry?.estimatedDeliveryTime || "1-2 Hari"}</span>
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <ChevronRight className="w-4 h-4 ml-0.5" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white border-2 border-gray-100 border-dashed rounded-3xl p-10 text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Belum ada pesanan aktif</h3>
                  <p className="text-gray-500 font-medium mb-6">Yuk cari mitra terdekat dan mulai mencuci bebas repot hari ini.</p>
                  <Link href={`/search?city=${searchCity}`} className="px-6 py-3 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-colors">
                    Mulai Pesan Layanan
                  </Link>
                </div>
              )}
            </section>

          </div>

          {/* Right Column (Recommendations) */}
          <div className="lg:col-span-1 space-y-8">
            <section>
              <h2 className="text-xl font-extrabold text-gray-900 mb-5">Mitra di {searchCity}</h2>
              
              {recommendedPartners.length > 0 ? (
                <div className="space-y-4">
                  {recommendedPartners.map((partner) => (
                    <Link href={`/partner/${partner._id}`} key={partner._id} className="block group">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-md transition-all flex h-28">
                        <div className="w-28 relative flex-shrink-0 bg-gray-200 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={partner.imageUrl || "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400&h=300&fit=crop"} 
                            alt={partner.laundryName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="p-3.5 flex flex-col justify-between flex-1 relative">
                          <div>
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{partner.laundryName}</h3>
                            <div className="flex items-center gap-3 mt-1.5 text-xs font-semibold">
                              <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded shadow-sm">
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <span>{partner.rating?.toFixed(1) || "5.0"}</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-500">
                                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                <span className="line-clamp-1">{partner.city}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center w-full">
                            <span className="text-[10px] font-extrabold uppercase tracking-wide text-green-600 bg-green-50 px-2.5 py-1 rounded-md">Buka</span>
                            <span className="text-xs font-bold text-blue-600 flex items-center gap-0.5">Pilih <ChevronRight className="w-3.5 h-3.5" /></span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <Link href={`/search?city=${searchCity}`} className="block w-full text-center mt-5 py-3.5 border-2 border-dashed border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                    Lihat Semua Mitra
                  </Link>
                </div>
              ) : (
                <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center text-sm text-gray-500 font-medium">
                  Tidak ada mitra laundry di kota ini. Coba ubah pencarian di atas.
                </div>
              )}

            </section>
          </div>
          
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center pb-safe z-50">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-blue-600">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">Beranda</span>
        </Link>
        <Link href="/orders" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
          <FileText className="w-6 h-6" />
          <span className="text-[10px] font-semibold">Pesanan</span>
        </Link>
        <button className="flex justify-center items-center w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full shadow-lg shadow-blue-500/30 transform -translate-y-6 hover:scale-105 transition-transform" aria-label="Buat Pesanan Baru">
          <Search className="w-6 h-6" />
        </button>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-semibold">Profil</span>
        </Link>
        <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-500 transition-colors">
          <LogOut className="w-6 h-6" />
          <span className="text-[10px] font-semibold">Keluar</span>
        </button>
      </div>
    </div>
  );
}
