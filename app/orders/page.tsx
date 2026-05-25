"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, ChevronRight, Clock,
  Sparkles, Loader2, RefreshCcw, Zap
} from "lucide-react";

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterMode, setFilterMode] = useState("all");
  const [mounted, setMounted] = useState(false);

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
        throw new Error("Gagal memperoleh data pesanan.");
      }

      const data = await res.json();
      setOrders(data.data || []);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchOrders();
  }, [router]);

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

  const filteredOrders = orders.filter((order) => {
    if (filterMode === "active") return order.status !== "delivered" && order.status !== "cancelled";
    if (filterMode === "history") return order.status === "delivered" || order.status === "cancelled";
    return true;
  });

  const filters = [
    { key: "all", label: "Semua" },
    { key: "active", label: "Aktif" },
    { key: "history", label: "Selesai" },
  ];

  return (
    <div className="min-h-screen bg-white text-foreground font-sans pb-20 relative">
      
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-peach-border bg-peach-light/95 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button onClick={() => router.push("/dashboard")} className="p-2 -ml-2 text-foreground/70 hover:text-accent transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <h1 className="text-lg font-display font-bold flex-1 text-left">Riwayat Pesanan</h1>
            <button onClick={fetchOrders} className="p-2 -mr-2 text-foreground/60 hover:text-accent transition-colors hover:rotate-180 duration-500" title="Refresh">
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className={`max-w-4xl mx-auto px-6 lg:px-8 py-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilterMode(f.key)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
                filterMode === f.key
                  ? "bg-accent text-white shadow-sm"
                  : "bg-peach-light text-foreground/70 hover:text-accent hover:bg-peach-dark"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold mb-6 flex items-center gap-3">
            <span>⚠</span> {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-4 mt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-44 rounded-2xl"></div>
            ))}
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.reverse().map((order, idx) => (
              <div
                onClick={() => router.push(`/order/${order._id}`)}
                key={order._id}
                className="bg-white border border-peach-border rounded-2xl p-6 cursor-pointer hover:border-accent hover:shadow-md transition-all duration-300 group text-left"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start mb-5 gap-4">
                  <div className="flex-1">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${getStatusColor(order.status)} inline-block mb-3`}>
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

                <div className="flex items-center gap-6 text-xs text-foreground/70 mb-5 py-4 border-y border-peach-border">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent/80" />
                    <span className="font-semibold">{new Date(order.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent/80" />
                    <span className="text-foreground font-extrabold">{formatIDR(order.totalAmount)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground/50 font-bold">
                    {order.cartItems?.length || 0} Layanan
                  </span>
                  <div className="flex items-center gap-1 text-sm font-bold text-accent group-hover:translate-x-1 transition-all">
                    Lihat Detail <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-peach-light border border-peach-border rounded-3xl p-16 text-center mt-4 relative overflow-hidden">
            <div className="relative z-10 space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 mx-auto flex items-center justify-center text-accent">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-display font-extrabold mb-1">Belum Ada Pesanan</h3>
              <p className="text-foreground/60 text-sm max-w-sm mx-auto font-medium">
                {filterMode === "all"
                  ? "Belum ada riwayat layanan terdaftar dalam akun ini."
                  : "Tidak ada pesanan yang sesuai dengan filter ini."}
              </p>
              {filterMode === "all" ? (
                <button onClick={() => router.push("/dashboard")} className="btn-primary !text-sm">
                  Mulai Pesan
                </button>
              ) : (
                <button onClick={() => setFilterMode("all")} className="text-accent text-sm font-bold hover:text-[#D85530] transition-colors">
                  Reset Filter
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
