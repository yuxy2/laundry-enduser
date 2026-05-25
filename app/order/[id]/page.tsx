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
  const [payLoading, setPayLoading] = useState(false);

  const handlePayCharge = async () => {
    setPayLoading(true);
    const token = localStorage.getItem("userToken");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://laundry-app-one-theta.vercel.app";
      const res = await fetch(`${apiUrl}/api/order/${id}/pay-charge`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal memproses pembayaran");
      if (data.data && data.data.url) {
        window.location.href = data.data.url;
      } else {
        throw new Error("URL Pembayaran tidak ditemukan");
      }
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan koneksi");
    } finally {
      setPayLoading(false);
    }
  };

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
      "placed": "text-amber-700 bg-amber-50 border-amber-200",
      "paid": "text-blue-700 bg-blue-50 border-blue-200",
      "inProgress": "text-[#E96A44] bg-[#E96A44]/10 border-[#E96A44]/20",
      "outForDelivery": "text-purple-700 bg-purple-50 border-purple-200",
      "delivered": "text-emerald-700 bg-emerald-50 border-emerald-200",
      "cancelled": "text-red-700 bg-red-50 border-red-200"
    };
    return map[status] || "text-foreground/75 bg-peach-dark/30 border-peach-border";
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
    { active: "from-amber-500 to-amber-600", text: "text-amber-700" },
    { active: "from-blue-500 to-blue-600", text: "text-blue-700" },
    { active: "from-accent to-[#D85530]", text: "text-accent" },
    { active: "from-purple-500 to-purple-600", text: "text-purple-700" },
    { active: "from-emerald-500 to-emerald-600", text: "text-emerald-700" },
  ];

  if (error || (!loading && !order)) {
    return (
      <div className="min-h-screen bg-white text-foreground font-sans flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 mb-6 flex items-center justify-center border border-red-200">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-display font-bold mb-3">Tidak Ditemukan</h2>
        <p className="text-foreground/60 mb-8 font-medium max-w-sm">{error || "Data pesanan tidak ditemukan"}</p>
        <button onClick={() => router.push("/dashboard")} className="btn-outline !text-sm">Kembali</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-foreground font-sans pb-20 relative">
      
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-peach-border bg-peach-light/95 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button onClick={() => router.back()} className="p-2 -ml-2 text-foreground/70 hover:text-accent transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <h1 className="text-lg font-display font-bold flex-1 text-left">Detail Pesanan</h1>
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
            <section className="bg-white border border-peach-border rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xs text-left">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 relative z-10">
                <div>
                  <p className="text-xs text-foreground/50 mb-1.5 font-bold">ID Pesanan</p>
                  <h2 className="text-xl sm:text-2xl font-display font-extrabold text-foreground">
                    #{order._id.substring(order._id.length - 8).toUpperCase()}
                  </h2>
                </div>
                <span className={`text-[11px] font-bold px-4 py-1.5 rounded-full border ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>

              {/* Progress Steps */}
              <div className="relative mb-8 z-10 py-4">
                {/* Track */}
                <div className="absolute top-1/2 left-8 right-8 h-1 bg-peach-dark -translate-y-1/2 rounded-full z-0"></div>
                <div
                  className="absolute top-1/2 left-8 h-1 bg-accent -translate-y-1/2 rounded-full z-0 transition-all duration-1000"
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
                            ? `bg-gradient-to-br ${stepColors[index].active} text-white shadow-sm`
                            : "bg-peach-light text-foreground/50 border border-peach-border"
                        } ${isCurrent ? "scale-110 ring-4 ring-accent/15" : ""}`}>
                          <step.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-bold ${isActive ? stepColors[index].text : "text-foreground/50"}`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date */}
              <div className="bg-peach-light border border-peach-border rounded-2xl p-4 flex items-center justify-between text-sm relative z-10">
                <div className="flex items-center gap-3 text-foreground/60">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-xs font-bold">Tanggal Pesanan</span>
                </div>
                <span className="font-display font-bold text-sm text-foreground">
                  {new Date(order.createdAt).toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB
                </span>
              </div>
            </section>

            {/* Mitra Detail */}
            <section className="bg-white border border-peach-border rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 group cursor-pointer text-left hover:border-accent transition-all duration-300 shadow-2xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/partner-laundry.png"
                alt="mitra"
                className="w-20 h-20 object-cover rounded-2xl transition-transform duration-500 shrink-0 bg-peach-dark"
              />
              <div className="flex-1">
                <p className="text-xs text-accent font-bold tracking-wider uppercase mb-1">Mitra Laundry</p>
                <h3 className="text-lg font-display font-extrabold text-foreground group-hover:text-accent transition-colors leading-tight">
                  {`E-Laundry Hub ${order.laundry?.city || ""}`}
                </h3>
                <p className="text-xs text-foreground/60 flex items-center gap-2 mt-1.5 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-accent" /> {order.laundry?.city}
                </p>
              </div>
            </section>

            {/* Delivery Info */}
            <section className="bg-white border border-peach-border rounded-2xl p-6 sm:p-8 text-left shadow-2xs">
              <h3 className="text-sm font-display font-bold mb-6 flex items-center gap-3 text-foreground">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Truck className="w-4 h-4" />
                </div>
                Detail Pengiriman
              </h3>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-peach-light border border-peach-border flex items-center justify-center shrink-0 text-accent">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 font-bold uppercase tracking-wider mb-1">Penerima</p>
                    <p className="font-display font-bold text-base mb-0.5 text-foreground">{order.deliveryDetails?.name || "-"}</p>
                    <p className="text-xs text-foreground/60 font-semibold">{order.deliveryDetails?.email || "-"}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-peach-light border border-peach-border flex items-center justify-center shrink-0 text-accent">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 font-bold uppercase tracking-wider mb-1">Alamat ({order.deliveryDetails?.city || "Kota"})</p>
                    <p className="text-sm text-foreground/75 font-semibold leading-relaxed">
                      {order.deliveryDetails?.addressLine1 || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Items */}
            <section className="bg-white border border-peach-border rounded-2xl overflow-hidden shadow-2xs text-left">
              <div className="p-6 border-b border-peach-border">
                <h3 className="text-sm font-display font-bold flex items-center gap-3 text-foreground">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <Package className="w-4 h-4" />
                  </div>
                  Item Pesanan
                </h3>
              </div>

              <div className="p-4">
                {order.cartItems.map((item: any, idx: number) => (
                  <div key={item.serviceId} className={`flex justify-between items-center py-4 px-2 ${idx !== order.cartItems.length - 1 ? 'border-b border-peach-border' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-peach-light border border-peach-border flex items-center justify-center text-sm font-bold text-accent shrink-0">
                        {item.quantity}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground/80 text-sm">{item.name}</h4>
                        <p className="text-xs text-foreground/50 font-semibold mt-0.5">Unit</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 bg-peach-light/20 border-t border-peach-border space-y-2 text-xs font-semibold text-foreground/80">
                <div className="flex justify-between">
                  <span className="text-foreground/50">Metode Pembayaran:</span>
                  <span>
                    {order.paymentMethod === "quota" ? "Potong Kuota Member" : "Timbang Dulu, Bayar Nanti"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/50">Status Timbang:</span>
                  <span>{order.isWeighed ? `Sudah Ditimbang (${order.weight} Kg)` : "Menunggu Kurir"}</span>
                </div>
              </div>

              <div className="p-6 border-t border-peach-border flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-peach-light/30">
                <div>
                  <p className="text-xs text-foreground/50 font-bold mb-1">Total Pembayaran</p>
                  <p className="text-xs text-foreground/60 font-semibold max-w-xs">Termasuk biaya layanan dan pengiriman.</p>
                </div>
                <div className="text-3xl font-display font-black text-accent">
                  {formatIDR(order.totalAmount)}
                </div>
              </div>
            </section>

            {/* Payment Warning & Actions */}
            {!order.isWeighed && order.status !== "cancelled" && (
              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-4 text-left">
                <Clock className="w-5 h-5 text-blue-700 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <p className="text-sm text-blue-800 font-bold leading-relaxed">
                    Menunggu Penimbangan Pakaian
                  </p>
                  <p className="text-xs text-blue-700 font-semibold mt-1 leading-relaxed">
                    Kurir kami sedang menuju ke lokasi Anda untuk menjemput dan menimbang cucian Anda. Berat pakaian akan diperbarui di sini setelah selesai ditimbang.
                  </p>
                </div>
              </div>
            )}

            {order.isWeighed && order.status === "placed" && (
              <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 space-y-4 text-left">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-amber-800 font-bold leading-relaxed">
                      Menunggu Pembayaran Cucian
                    </p>
                    <p className="text-xs text-amber-700 font-semibold mt-1 leading-relaxed">
                      Pakaian Anda telah selesai ditimbang ({order.weight} Kg). Silakan selesaikan pembayaran sebesar <strong className="text-accent">{formatIDR(order.totalAmount)}</strong> untuk memproses cucian Anda.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handlePayCharge}
                  disabled={payLoading}
                  className="w-full btn-primary !text-sm flex items-center justify-center gap-2"
                >
                  {payLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Bayar Sekarang
                    </>
                  )}
                </button>
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
