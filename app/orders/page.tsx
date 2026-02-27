"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, FileText, ChevronRight, Clock, 
  Shirt, Loader2, Filter, AlertCircle, RefreshCcw
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
        throw new Error("Gagal memuat daftar pesanan.");
      }

      const data = await res.json();
      setOrders(data.data || []);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan sistem");
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
      "placed": "Menunggu Bayar",
      "paid": "Sudah Dibayar",
      "inProgress": "Sedang Dicuci",
      "outForDelivery": "Dlm Pengantaran",
      "delivered": "Selesai",
      "cancelled": "Dibatalkan"
    };
    return map[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      "placed": "text-amber-700 bg-amber-50 border-amber-200",
      "paid": "text-indigo-700 bg-indigo-50 border-indigo-200",
      "inProgress": "text-blue-700 bg-blue-50 border-blue-200",
      "outForDelivery": "text-teal-700 bg-teal-50 border-teal-200",
      "delivered": "text-green-700 bg-green-50 border-green-200",
      "cancelled": "text-red-700 bg-red-50 border-red-200"
    };
    return colors[status] || "text-gray-700 bg-gray-50 border-gray-200";
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
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button 
              onClick={() => router.push("/dashboard")}
              className="p-2 -ml-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-extrabold flex-1 text-gray-900">
              Semua Pesanan
            </h1>
            <button onClick={fetchOrders} className="p-2 -mr-2 text-blue-600 hover:bg-blue-50 transition-colors rounded-full" title="Refresh">
              <RefreshCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setFilterMode("all")}
            className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
              filterMode === "all" ? "bg-gray-900 text-white shadow-md" : "bg-white text-gray-500 border border-gray-200/80 hover:bg-gray-50"
            }`}
          >
            Semua
          </button>
          <button 
            onClick={() => setFilterMode("active")}
            className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all flex items-center gap-1.5 ${
              filterMode === "active" ? "bg-blue-600 text-white shadow-md shadow-blue-500/30" : "bg-white text-gray-500 border border-gray-200/80 hover:bg-gray-50"
            }`}
          >
            Aktif Diproses
          </button>
          <button 
            onClick={() => setFilterMode("history")}
            className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
              filterMode === "history" ? "bg-green-600 text-white shadow-md shadow-green-500/30" : "bg-white text-gray-500 border border-gray-200/80 hover:bg-gray-50"
            }`}
          >
            Riwayat Selesai
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium mb-6 flex items-start gap-3">
             <AlertCircle className="w-5 h-5 mt-0.5" /> {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-500 font-medium">Memuat data pesanan...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.reverse().map((order) => (
              <Link href={`/order/${order._id}`} key={order._id} className="block group">
                <div className="bg-white border border-gray-100 hover:border-blue-300 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                  
                  {order.status !== "delivered" && order.status !== "cancelled" && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-400 to-indigo-600"></div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <p className={`text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md mb-2.5 inline-block uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </p>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-1">{order.laundry?.laundryName || "Laundry Mitra"}</h3>
                    </div>
                    <span className="text-xs font-bold text-gray-500 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100 tracking-wider">
                      #{order._id.substring(order._id.length - 6).toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 mb-4 bg-gray-50/50 p-3 rounded-xl border border-gray-100/50">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold">{new Date(order.createdAt).toLocaleDateString('id-ID', {day: '2-digit', month: 'short', year: 'numeric'})}</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200"></div>
                    <div className="flex items-center gap-1.5">
                      <Shirt className="w-4 h-4 text-blue-500" />
                      <span className="font-extrabold text-blue-700">{formatIDR(order.totalAmount)}</span>
                    </div>
                  </div>
                  
                  <div className="pt-3 flex justify-between items-center border-t border-gray-50">
                    <span className="text-xs font-semibold text-gray-500">
                      {order.cartItems?.length || 0} layanan dipesan
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      Lihat Rincian <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white border-2 border-gray-100 border-dashed rounded-3xl p-12 text-center mt-8">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Kosong</h3>
            <p className="text-gray-500 font-medium max-w-sm mx-auto mb-6">
              {filterMode === "all" 
                ? "Anda belum pernah memesan laundry. Yuk, coba pesan sekarang!" 
                : "Tidak ada pesanan yang sesuai dengan filter ini."}
            </p>
            {filterMode === "all" ? (
              <Link href="/dashboard" className="px-6 py-2.5 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-colors inline-block">
                Cari Laundry Terdekat
              </Link>
            ) : (
              <button onClick={() => setFilterMode("all")} className="text-blue-600 font-bold hover:underline">
                Hapus Filter
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
