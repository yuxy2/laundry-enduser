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
      "placed": "text-amber-400 bg-amber-400/10 border-amber-400/20",
      "paid": "text-blue-400 bg-blue-400/10 border-blue-400/20",
      "inProgress": "text-accent bg-accent/10 border-accent/20",
      "outForDelivery": "text-accent2 bg-accent2/10 border-accent2/20",
      "delivered": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      "cancelled": "text-red-400 bg-red-400/10 border-red-400/20"
    };
    return map[status] || "text-foreground/70 bg-white/10 border-white/10";
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
    <div className="min-h-screen bg-background text-foreground font-sans pb-20 relative">
      <div className="glow-orb glow-violet w-[400px] h-[400px] -top-40 right-0 animate-pulse-glow fixed opacity-30"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10" style={{ background: 'rgba(10, 14, 26, 0.8)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button onClick={() => router.push("/dashboard")} className="p-2 -ml-2 text-foreground/70 hover:text-accent transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <h1 className="text-lg font-display font-semibold flex-1">Riwayat Pesanan</h1>
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
              className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all whitespace-nowrap ${
                filterMode === f.key
                  ? "bg-gradient-to-r from-accent to-accent-hover text-background"
                  : "bg-white/10 text-foreground/70 hover:text-foreground hover:bg-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-400 text-sm font-light mb-6 flex items-center gap-3">
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
                className="glass-card !rounded-2xl p-6 cursor-pointer group"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start mb-5 gap-4">
                  <div className="flex-1">
                    <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${getStatusColor(order.status)} inline-block mb-3`}>
                      {getStatusText(order.status)}
                    </span>
                    <h3 className="text-lg font-display font-semibold group-hover:text-accent transition-colors">
                      {`E-Laundry Hub ${order.laundry?.city || ""}`}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-foreground/75 bg-white/10 px-3 py-1.5 rounded-lg">
                    #{order._id.substring(order._id.length - 8).toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-6 text-xs text-foreground/70 mb-5 py-4 border-y border-white/10">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-accent/50" />
                    <span>{new Date(order.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-accent/50" />
                    <span className="text-foreground font-semibold">{formatIDR(order.totalAmount)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground/75">
                    {order.cartItems?.length || 0} Layanan
                  </span>
                  <div className="flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                    Lihat Detail <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card !rounded-2xl p-16 text-center mt-4 relative overflow-hidden">
            <div className="glow-orb glow-teal w-[200px] h-[200px] top-0 right-0 animate-pulse-glow"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-accent2/10 mx-auto mb-5 flex items-center justify-center">
                <Zap className="w-8 h-8 text-accent2/40" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Belum Ada Pesanan</h3>
              <p className="text-foreground/60 text-sm max-w-sm mx-auto mb-8 font-light">
                {filterMode === "all"
                  ? "Belum ada riwayat layanan terdaftar dalam akun ini."
                  : "Tidak ada pesanan yang sesuai dengan filter ini."}
              </p>
              {filterMode === "all" ? (
                <button onClick={() => router.push("/dashboard")} className="btn-primary !text-sm">
                  Mulai Pesan
                </button>
              ) : (
                <button onClick={() => setFilterMode("all")} className="text-accent text-sm font-medium hover:text-accent-hover transition-colors">
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
