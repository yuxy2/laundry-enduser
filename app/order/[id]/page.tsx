"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, MapPin, Receipt, Clock, CheckCircle2, 
  Package, Truck, User, Loader2, AlertCircle, Diamond
} from "lucide-react";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
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
          throw new Error("Gagal mengurai database order");
        }

        const data = await res.json();
        const foundOrder = (data.data || []).find((o: any) => o._id === id);

        if (!foundOrder) {
          throw new Error("Catatan layanan tidak terdeteksi");
        }

        setOrder(foundOrder);
      } catch (err: any) {
        setError(err.message || "Interupsi sistem server");
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
      "placed": "Menunggu Otorisasi Dana",
      "paid": "Otorisasi Pembayaran Selesai",
      "inProgress": "Perawatan & Pencucian Aktif",
      "outForDelivery": "Armada Ekspedisi Bergerak",
      "delivered": "Selesai",
      "cancelled": "Dibatalkan / Void"
    };
    return map[status] || status;
  };

  // Helper for progress bar
  const statusSteps = ["placed", "paid", "inProgress", "outForDelivery", "delivered"];
  const currentStepIndex = statusSteps.indexOf(order?.status);

  if (error || (!loading && !order)) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans pb-20 selection:bg-gold selection:text-background flex flex-col items-center justify-center p-6 text-center">
        <Diamond className="w-12 h-12 text-gray-500 mb-6" />
        <h2 className="text-2xl font-serif text-white mb-2">Akses Tertolak</h2>
        <p className="text-gray-400 font-light mb-8 max-w-sm">{error || "Data pesanan tidak ditemukan"}</p>
        <button onClick={() => router.push("/dashboard")} className="px-8 py-3 bg-panel border border-border-dark text-white text-xs uppercase tracking-widest hover:border-gold transition-colors">Kembali ke Utama</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-20 selection:bg-gold selection:text-background">
      {/* Header */}
      <header className="bg-panel border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 h-20">
            <button 
              onClick={() => router.back()}
              className="p-2 -ml-2 text-gold hover:text-white transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-sm font-serif uppercase tracking-[0.2em] text-white flex-1 relative top-px">
              Bukti Validasi Inspeksi
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 lg:px-8 py-10 space-y-12">
        {loading ? (
          <div className="space-y-12 animate-pulse w-full">
            <div className="bg-panel border border-border-dark h-80"></div>
            <div className="bg-panel border border-border-dark h-32"></div>
            <div className="bg-panel border border-border-dark h-64"></div>
          </div>
        ) : (
          <>
        {/* Status Tracker Card */}
        <section className="bg-panel border border-border-dark p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl opacity-50"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/5 pb-8 relative z-10">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-2">LEMBAR REFERENSI</p>
              <h2 className="text-xl sm:text-2xl font-serif text-white tracking-wide">#{order._id.substring(order._id.length - 8).toUpperCase()}</h2>
            </div>
            {order.status !== "paid" && order.status !== "delivered" && order.status !== "inProgress" && order.status !== "outForDelivery" ? (
             <span className="text-[10px] font-bold text-red-400 bg-red-400/10 border border-red-500/20 px-4 py-2 uppercase tracking-widest">Aksi Diperlukan</span>
            ) : (
             <span className="text-[10px] font-bold text-gold bg-gold/5 border border-gold/30 px-4 py-2 uppercase tracking-widest flex items-center gap-2">
               Lunas Terverifikasi <CheckCircle2 className="w-3.5 h-3.5" />
             </span>
            )}
          </div>

          <h3 className="text-sm font-bold text-gray-300 mb-10 flex items-center gap-3 uppercase tracking-widest relative z-10">
            Keadaan: <span className="text-gold border border-gold/50 px-3 py-1 bg-gold/10 font-serif normal-case tracking-normal">{getStatusText(order.status)}</span>
          </h3>

          {/* Progress Visualizer */}
          <div className="relative mb-12 z-10 pt-4 pb-2">
            <div className="absolute top-1/2 left-6 right-6 h-[1px] bg-border-dark -translate-y-1/2 z-0"></div>
            <div 
              className="absolute top-1/2 left-6 h-[1px] bg-gold -translate-y-1/2 z-0 transition-all duration-1000"
              style={{ width: `${Math.max(0, currentStepIndex * 25)}%` }}
            ></div>
            
            <div className="relative z-10 flex justify-between px-2">
              {[
                { icon: Receipt, label: "Masuk" },
                { icon: CheckCircle2, label: "Lunas" },
                { icon: Diamond, label: "Kurasi" },
                { icon: Truck, label: "Jemput" },
                { icon: Package, label: "Penyerahan" }
              ].map((step, index) => {
                const isActive = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                return (
                  <div key={index} className="flex flex-col items-center gap-4 bg-panel">
                    <div className={`w-10 h-10 flex items-center justify-center border transition-all duration-500 bg-panel ${
                      isActive 
                        ? "border-gold text-gold" 
                        : "border-border-dark text-gray-600"
                    } ${isCurrent ? "shadow-[0_0_15px_rgba(203,168,113,0.3)] bg-gold/10" : ""}`}>
                      <step.icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${isActive ? "text-gray-300" : "text-gray-600"}`}>
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="bg-background border border-white/5 p-5 flex items-center justify-between gap-4 text-sm mt-4 relative z-10">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-gray-500 shrink-0" />
              <p className="text-gray-400 font-light text-xs tracking-widest uppercase">
                Masuk Jurnal
              </p>
            </div>
            <p className="text-white font-serif tracking-wider">
              {new Date(order.createdAt).toLocaleString('id-ID', {day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'})} WIB
            </p>
          </div>
        </section>

        {/* Mitra / Laundry Detail */}
        <section className="bg-panel rounded-none border border-border-dark p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 relative group overflow-hidden">
           {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={order.laundry?.imageUrl || "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=100&h=100&fit=crop"} alt="mitra" className="w-20 h-20 object-cover opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500 border border-border-dark shrink-0" />
          
          <div className="flex-1">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">Penanggung Jawab Kurasi</p>
            <h3 className="text-xl font-serif text-white tracking-wide mb-2 group-hover:text-gold transition-colors">{order.laundry?.laundryName || "Mitra Anonim"}</h3>
            <p className="text-xs text-gray-400 font-light flex items-center gap-2 uppercase tracking-widest">
              <MapPin className="w-3 h-3 text-gold" /> {order.laundry?.city}
            </p>
          </div>
        </section>

        {/* Delivery Details */}
        <section className="bg-panel border border-border-dark p-8 sm:p-10 relative">
          <h3 className="text-sm font-serif text-white uppercase tracking-widest mb-8 border-b border-white/5 pb-4 flex items-center gap-3">
             <span className="w-8 h-[1px] bg-gold block"></span>
             Logistik & Destinasi
          </h3>
          
          <div className="space-y-8 relative">
            <div className="flex gap-5">
              <div className="w-8 h-8 bg-background border border-border-dark flex items-center justify-center text-gray-400 shrink-0 mt-1">
                 <User className="w-3 h-3" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Pemegang Akun Klien</p>
                <p className="text-base font-serif text-white mb-1 tracking-wide">{order.deliveryDetails?.name || "-"}</p>
                <p className="text-xs font-light text-gray-500">{order.deliveryDetails?.email || "-"}</p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-8 h-8 bg-background border border-border-dark flex items-center justify-center text-gray-400 shrink-0 mt-1">
                 <MapPin className="w-3 h-3" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Titik Koordinat ({order.deliveryDetails?.city || "Kota Tidak Diketahui"})</p>
                <p className="text-sm font-light text-gray-300 leading-relaxed border-l-[1px] border-border-dark pl-4 italic">
                  "{order.deliveryDetails?.addressLine1 || "-"}"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Keranjang & Items */}
        <section className="bg-panel border border-border-dark overflow-hidden">
          <div className="p-8 sm:p-10 border-b border-white/5">
            <h3 className="text-sm font-serif text-white uppercase tracking-widest">Tindakan Kepemilikan</h3>
          </div>
          
          <div className="bg-background/50 px-8 py-2">
            {order.cartItems.map((item: any, idx: number) => (
              <div key={item.serviceId} className={`flex justify-between items-center py-6 ${idx !== order.cartItems.length - 1 ? 'border-b border-border-dark' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 border border-gold/30 bg-gold/5 flex items-center justify-center text-[10px] font-mono text-gold shrink-0">
                    {item.quantity}
                  </div>
                  <div>
                    <h4 className="font-serif text-gray-200 tracking-wide">{item.name}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1 font-light">Unit Pengukuran</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 sm:p-10 bg-panel border-t border-border-dark flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">Nilai Eksekusi Akhir</p>
              <p className="text-[10px] uppercase font-light text-gray-400 tracking-widest max-w-xs leading-relaxed">Penyetoran mencakup keseluruhan beban armada jemput silang dan asuransi pemeliharaan parsial.</p>
            </div>
            <div className="text-3xl font-serif text-gold tracking-wider">
              {formatIDR(order.totalAmount)}
            </div>
          </div>
        </section>
        
        {order.status === "placed" && (
            <div className="p-6 bg-red-500/5 border border-red-500/20 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
               <p className="text-xs font-light tracking-wide text-red-300 leading-relaxed">
                 Otorisasi dana tagihan ini masih terpendam dan dapat kedaluwarsa sewaktu-waktu. Harap segera lanjutkan prosedur penyelesaian lewat email atau pusat pelaporan kami.
               </p>
            </div>
        )}

        <div className="pt-8 pb-12 flex justify-center">
            <button onClick={() => router.push("/dashboard")} className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-gold flex items-center gap-3 transition-colors">
              Kembali <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
        </div>
          </>
        )}
      </main>
    </div>
  );
}
