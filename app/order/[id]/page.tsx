"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, MapPin, Receipt, Clock, CheckCircle2,
  Package, Truck, User, Loader2, AlertCircle, Sparkles
} from "lucide-react";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchOrderDetails = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) { router.push("/login"); return; }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://laundry-app-one-theta.vercel.app";
        const res = await fetch(`${apiUrl}/api/order`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Gagal mengambil data pesanan");
        const data = await res.json();
        const foundOrder = (data.data || []).find((o: any) => o._id === id);
        if (!foundOrder) throw new Error("Pesanan tidak ditemukan");
        setOrder(foundOrder);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, router]);

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

  const statusSteps = ["placed", "paid", "inProgress", "outForDelivery", "delivered"];
  const currentStepIndex = statusSteps.indexOf(order?.status);

  const stepIcons = [
    { icon: Receipt, label: "Masuk" },
    { icon: CheckCircle2, label: "Lunas" },
    { icon: Sparkles, label: "Proses" },
    { icon: Truck, label: "Antar" },
    { icon: Package, label: "Selesai" }
  ];

  const stepColors = [
    { active: "from-amber-400 to-amber-500", text: "text-amber-400" },
    { active: "from-blue-400 to-blue-500", text: "text-blue-400" },
    { active: "from-accent to-accent-hover", text: "text-accent" },
    { active: "from-accent2 to-purple-500", text: "text-accent2" },
    { active: "from-emerald-400 to-emerald-500", text: "text-emerald-400" },
  ];

  if (error || (!loading && !order)) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 mb-6 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-400/60" />
        </div>
        <h2 className="text-2xl font-display font-bold mb-3">Tidak Ditemukan</h2>
        <p className="text-foreground/60 mb-8 font-light max-w-sm">{error || "Data pesanan tidak ditemukan"}</p>
        <button onClick={() => router.push("/dashboard")} className="btn-outline !text-sm">Kembali</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-20 relative">
      <div className="glow-orb glow-teal w-[400px] h-[400px] -top-40 right-0 animate-pulse-glow fixed opacity-20"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10" style={{ background: 'rgba(10, 14, 26, 0.8)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button onClick={() => router.back()} className="p-2 -ml-2 text-foreground/70 hover:text-accent transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <h1 className="text-lg font-display font-semibold flex-1">Detail Pesanan</h1>
          </div>
        </div>
      </header>

      <main className={`max-w-3xl mx-auto px-6 lg:px-8 py-8 space-y-6 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        {loading ? (
          <div className="space-y-6">
            <div className="skeleton h-72 rounded-3xl"></div>
            <div className="skeleton h-28 rounded-2xl"></div>
            <div className="skeleton h-52 rounded-2xl"></div>
          </div>
        ) : (
          <>
            {/* Status Tracker */}
            <section className="glass-card !rounded-3xl p-8 sm:p-10 relative overflow-hidden">
              <div className="glow-orb glow-teal w-[200px] h-[200px] -top-20 -right-20 animate-pulse-glow"></div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 relative z-10">
                <div>
                  <p className="text-xs text-foreground/60 mb-2 font-medium">ID Pesanan</p>
                  <h2 className="text-xl sm:text-2xl font-display font-bold">
                    #{order._id.substring(order._id.length - 8).toUpperCase()}
                  </h2>
                </div>
                <span className={`text-[11px] font-semibold px-4 py-1.5 rounded-full border ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>

              {/* Progress Steps */}
              <div className="relative mb-8 z-10 py-4">
                {/* Track */}
                <div className="absolute top-1/2 left-8 right-8 h-1 bg-white/10 -translate-y-1/2 rounded-full z-0"></div>
                <div
                  className="absolute top-1/2 left-8 h-1 bg-gradient-to-r from-accent to-accent2 -translate-y-1/2 rounded-full z-0 transition-all duration-1000"
                  style={{ width: `${Math.max(0, currentStepIndex * 25)}%` }}
                ></div>

                <div className="relative z-10 flex justify-between px-2">
                  {stepIcons.map((step, index) => {
                    const isActive = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    return (
                      <div key={index} className="flex flex-col items-center gap-3">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-500 ${
                          isActive
                            ? `bg-gradient-to-br ${stepColors[index].active} text-background shadow-lg`
                            : "bg-white/10 text-foreground/75"
                        } ${isCurrent ? "scale-110 ring-4 ring-white/5" : ""}`}>
                          <step.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-medium ${isActive ? stepColors[index].text : "text-foreground/75"}`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date */}
              <div className="glass-card !rounded-2xl p-4 flex items-center justify-between text-sm relative z-10">
                <div className="flex items-center gap-3 text-foreground/60">
                  <Clock className="w-4 h-4 text-accent/50" />
                  <span className="text-xs">Tanggal Pesanan</span>
                </div>
                <span className="font-display font-semibold text-sm">
                  {new Date(order.createdAt).toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB
                </span>
              </div>
            </section>

            {/* Mitra Detail */}
            <section className="glass-card !rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 group cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/partner-laundry.png"
                alt="mitra"
                className="w-20 h-20 object-cover !rounded-2xl group-hover:scale-105 transition-transform duration-500 shrink-0"
              />
              <div className="flex-1">
                <p className="text-xs text-accent font-semibold tracking-wider uppercase mb-1">Mitra Laundry</p>
                <h3 className="text-lg font-display font-semibold group-hover:text-accent transition-colors">{`E-Laundry Hub ${order.laundry?.city || ""}`}</h3>
                <p className="text-xs text-foreground/60 flex items-center gap-2 mt-1">
                  <MapPin className="w-3 h-3 text-accent/50" /> {order.laundry?.city}
                </p>
              </div>
            </section>

            {/* Delivery Info */}
            <section className="glass-card !rounded-2xl p-6 sm:p-8">
              <h3 className="text-sm font-display font-semibold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent2/10 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-accent2" />
                </div>
                Detail Pengiriman
              </h3>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-accent font-semibold tracking-wider uppercase mb-1">Penerima</p>
                    <p className="font-display font-semibold mb-0.5">{order.deliveryDetails?.name || "-"}</p>
                    <p className="text-xs text-foreground/60">{order.deliveryDetails?.email || "-"}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent3/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-accent3" />
                  </div>
                  <div>
                    <p className="text-xs text-accent3 font-semibold tracking-wider uppercase mb-1">Alamat ({order.deliveryDetails?.city || "Kota"})</p>
                    <p className="text-sm text-foreground/75 font-light leading-relaxed">
                      {order.deliveryDetails?.addressLine1 || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Items */}
            <section className="glass-card !rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-sm font-display font-semibold flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent4/10 flex items-center justify-center">
                    <Package className="w-4 h-4 text-accent4" />
                  </div>
                  Item Pesanan
                </h3>
              </div>

              <div className="p-4">
                {order.cartItems.map((item: any, idx: number) => (
                  <div key={item.serviceId} className={`flex justify-between items-center py-4 px-2 ${idx !== order.cartItems.length - 1 ? 'border-b border-white/10' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-sm font-bold text-accent shrink-0">
                        {item.quantity}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground/80">{item.name}</h4>
                        <p className="text-xs text-foreground/75 mt-0.5">Unit</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                  <p className="text-xs text-foreground/60 mb-1">Total Pembayaran</p>
                  <p className="text-xs text-foreground/75 font-light max-w-xs">Termasuk biaya layanan dan pengiriman.</p>
                </div>
                <div className="text-3xl font-display font-bold text-gradient">
                  {formatIDR(order.totalAmount)}
                </div>
              </div>
            </section>

            {/* Payment Warning */}
            {order.status === "placed" && (
              <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/15 flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-300/70 font-light leading-relaxed">
                  Pesanan ini belum dibayar dan dapat kedaluwarsa. Harap segera selesaikan pembayaran.
                </p>
              </div>
            )}

            {/* Back */}
            <div className="pt-6 flex justify-center">
              <button onClick={() => router.push("/dashboard")} className="btn-outline !text-sm group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Kembali ke Dashboard
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
