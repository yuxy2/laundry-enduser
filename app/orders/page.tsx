"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, FileText, ChevronRight, Clock, 
  Diamond, Loader2, RefreshCcw
} from "lucide-react";

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterMode, setFilterMode] = useState("all"); // 'all', 'active', 'history'

  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("userToken");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://laundry-app-one-theta.vercel.app";
      const res = await fetch(`${apiUrl}/api/order`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        throw new Error("Gagal memperoleh arsip pesanan.");
      }

      const data = await res.json();
      setOrders(data.data || []);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan sinkronisasi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [router]);

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount || 0);
  };

  const getStatusText = (status: string) => {
    const map: any = {
      "placed": "Menunggu Otorisasi",
      "paid": "Otorisasi Sukses",
      "inProgress": "Perawatan Aktif",
      "outForDelivery": "Armada Berangkat",
      "delivered": "Selesai",
      "cancelled": "Dibatalkan / Void"
    };
    return map[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      "placed": "text-orange-500 border-orange-500/30 bg-orange-500/10",
      "paid": "text-blue-400 border-blue-400/30 bg-blue-400/10",
      "inProgress": "text-yellow-500 border-yellow-500/30 bg-yellow-500/10",
      "outForDelivery": "text-teal-400 border-teal-400/30 bg-teal-400/10",
      "delivered": "text-green-500 border-green-500/30 bg-green-500/10",
      "cancelled": "text-red-500 border-red-500/30 bg-red-500/10"
    };
    return colors[status] || "text-gray-400 border-gray-400/30 bg-gray-400/10";
  };

  // Filter Logic
  const filteredOrders = orders.filter((order) => {
    if (filterMode === "active") {
      return order.status !== "delivered" && order.status !== "cancelled";
    }
    if (filterMode === "history") {
      return order.status === "delivered" || order.status === "cancelled";
    }
    return true; // "all"
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-20 selection:bg-gold selection:text-background">
      {/* Header */}
      <header className="bg-panel border-b border-border-dark sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 h-20">
            <button 
              onClick={() => router.push("/dashboard")}
              className="p-2 -ml-2 text-gold hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-serif tracking-widest uppercase text-white flex-1">
              Arsip Layanan
            </h1>
            <button onClick={fetchOrders} className="p-2 -mr-2 text-gray-500 hover:text-gold transition-colors" title="Sinkronisasi Ulang">
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-10">

        {/* Filters */}
        <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide border-b border-white/5">
          <button 
            onClick={() => setFilterMode("all")}
            className={`px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold transition-all rounded-none border ${
              filterMode === "all" ? "bg-gold border-gold text-background" : "bg-transparent border-border-dark text-gray-500 hover:border-gray-500 hover:text-white"
            }`}
          >
            Keseluruhan
          </button>
          <button 
            onClick={() => setFilterMode("active")}
            className={`px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold transition-all rounded-none border ${
              filterMode === "active" ? "bg-gold border-gold text-background" : "bg-transparent border-border-dark text-gray-500 hover:border-gray-500 hover:text-white"
            }`}
          >
            Aktivitas Terkini
          </button>
          <button 
            onClick={() => setFilterMode("history")}
            className={`px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold transition-all rounded-none border ${
              filterMode === "history" ? "bg-gold border-gold text-background" : "bg-transparent border-border-dark text-gray-500 hover:border-gray-500 hover:text-white"
            }`}
          >
            Histori Selesai
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-light mb-8 flex items-start gap-3">
             <Diamond className="w-4 h-4 mt-0.5 shrink-0" /> {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-6 animate-pulse mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-panel border border-border-dark p-6 sm:p-8 h-48"></div>
            ))}
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.reverse().map((order) => (
              <div onClick={() => router.push(`/order/${order._id}`)} key={order._id} className="block group cursor-pointer">
                <div className="bg-panel border border-border-dark p-6 sm:p-8 hover:border-gold transition-all relative">
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
                    <div className="flex-1">
                      <p className={`text-[9px] font-bold px-3 py-1 mb-4 inline-block uppercase tracking-[0.2em] border ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </p>
                      <h3 className="text-xl font-serif text-white tracking-wide group-hover:text-gold transition-colors">{order.laundry?.laundryName || "Entitas Anonim"}</h3>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase bg-background px-3 py-1.5 border border-white/5">
                      REF / {order._id.substring(order._id.length - 8).toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-xs text-gray-400 mb-8 border-y border-white/5 py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      <span className="font-light">{new Date(order.createdAt).toLocaleDateString('id-ID', {day: '2-digit', month: 'long', year: 'numeric'})}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Diamond className="w-3.5 h-3.5 text-gold" />
                      <span className="font-serif text-white">{formatIDR(order.totalAmount)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-light text-gray-500 tracking-widest uppercase">
                      Kuantitas: {order.cartItems?.length || 0} Layanan
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gold uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                      Inspeksi Nota <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-panel border border-border-dark p-16 text-center mt-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gold/5 opacity-0 hover:opacity-100 transition-opacity blur-2xl"></div>
            <Diamond className="w-10 h-10 text-gray-600 mx-auto mb-6" />
            <h3 className="text-xl font-serif text-white mb-4">Arsip Absen</h3>
            <p className="text-gray-400 font-light text-sm max-w-sm mx-auto mb-10 tracking-wide">
              {filterMode === "all" 
                ? "Belum ada riwayat layanan pemeliharaan terdaftar dalam akun ini." 
                : "Tidak ada data armada atau operasional relevan dengan filter yang diaplikasikan."}
            </p>
            {filterMode === "all" ? (
              <button onClick={() => router.push("/dashboard")} className="px-8 py-4 bg-gold hover:bg-gold-hover text-background text-[10px] uppercase font-bold tracking-[0.2em] transition-colors inline-block relative z-10">
                Eksplorasi Kurasi
              </button>
            ) : (
              <button onClick={() => setFilterMode("all")} className="text-gold text-[10px] uppercase font-bold tracking-[0.2em] hover:text-white transition-colors">
                Kembalikan Filter
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
