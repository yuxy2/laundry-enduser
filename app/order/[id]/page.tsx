"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, MapPin, Receipt, Clock, CheckCircle2, 
  Package, Truck, Shirt, Loader2, Home, AlertCircle, User
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
        // Fetch all user orders, then find the one matching the current ID
        const res = await fetch(`${apiUrl}/api/order`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
          throw new Error("Gagal mengambil data pesanan");
        }

        const data = await res.json();
        const foundOrder = (data.data || []).find((o: any) => o._id === id);

        if (!foundOrder) {
          throw new Error("Pesanan tidak ditemukan");
        }

        setOrder(foundOrder);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan sistem");
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
      "placed": "Menunggu Pembayaran / Dibuat",
      "paid": "Sudah Dibayar (Menunggu Pick-Up)",
      "inProgress": "Sedang Dicuci (Proses)",
      "outForDelivery": "Dalam Pengantaran Kurir",
      "delivered": "Selesai",
      "cancelled": "Dibatalkan"
    };
    return map[status] || status;
  };

  // Helper for progress bar
  const statusSteps = ["placed", "paid", "inProgress", "outForDelivery", "delivered"];
  const currentStepIndex = statusSteps.indexOf(order?.status);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Ups, Gagal Memuat</h2>
        <p className="text-gray-500 mb-6">{error}</p>
        <Link href="/dashboard" className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-lg">Kembali ke Beranda</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-10">
      {/* Header Mobile / Desktop */}
      <header className="bg-blue-600 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button 
              onClick={() => router.back()}
              className="p-2 -ml-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-extrabold flex-1">
              Validasi Pesanan
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Status Tracker Card */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-400 to-indigo-600"></div>
          
          <div className="flex justify-between items-start mb-6 border-b border-gray-50 pb-4">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">ID TAGIHAN</p>
              <h2 className="text-lg font-extrabold text-blue-700 tracking-tight">#{order._id.substring(order._id.length - 8).toUpperCase()}</h2>
            </div>
            {order.status !== "paid" && order.status !== "delivered" && order.status !== "inProgress" && order.status !== "outForDelivery" ? (
             <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-md uppercase">Belum Lunas</span>
            ) : (
             <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-md shadow-sm border border-green-100 flex items-center gap-1">
               <CheckCircle2 className="w-3.5 h-3.5" /> Lunas
             </span>
            )}
          </div>

          <h3 className="text-base font-extrabold text-gray-900 mb-6 flex items-center gap-2">
            Status: <span className="text-blue-600">{getStatusText(order.status)}</span>
          </h3>

          {/* Progress Visualizer */}
          <div className="relative mb-6">
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-100 -translate-y-1/2 rounded-full z-0"></div>
            <div 
              className="absolute top-1/2 left-4 h-1 bg-blue-500 -translate-y-1/2 rounded-full z-0 transition-all duration-1000"
              style={{ width: `${Math.max(0, currentStepIndex * 25)}%` }}
            ></div>
            
            <div className="relative z-10 flex justify-between">
              {[
                { icon: Receipt, label: "Dibuat" },
                { icon: CheckCircle2, label: "Lunas" },
                { icon: Shirt, label: "Proses" },
                { icon: Truck, label: "Antar" },
                { icon: Package, label: "Selesai" }
              ].map((step, index) => {
                const isActive = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                return (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isActive 
                        ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/40" 
                        : "bg-white border-gray-200 text-gray-300"
                    } ${isCurrent ? "ring-4 ring-blue-100" : ""}`}>
                      <step.icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] sm:text-xs font-bold ${isActive ? "text-gray-900" : "text-gray-400"}`}>
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4 flex gap-3 text-sm">
            <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <p className="text-blue-800 font-medium">
              Tanggal Pesanan: <strong className="font-extrabold">{new Date(order.createdAt).toLocaleString('id-ID', {day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'})} WIB</strong>
            </p>
          </div>
        </section>

        {/* Mitra / Laundry Detail */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 group cursor-pointer hover:border-blue-200 transition-colors">
          <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shadow-sm flex-shrink-0">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={order.laundry?.imageUrl || "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=100&h=100&fit=crop"} alt="mitra" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Dicuci oleh</p>
            <h3 className="text-lg font-bold text-gray-900">{order.laundry?.laundryName || "Mitra Laundry"}</h3>
            <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5" /> {order.laundry?.city}
            </p>
          </div>
        </section>

        {/* Delivery Details */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-50">Pengantaran</h3>
          
          <div className="space-y-3 relative">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                 <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Penerima</p>
                <p className="text-sm font-bold text-gray-900">{order.deliveryDetails?.name || "-"}</p>
                <p className="text-xs font-medium text-gray-500">{order.deliveryDetails?.email || "-"}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                 <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Alamat Lengkap</p>
                <p className="text-sm font-bold text-gray-900">{order.deliveryDetails?.city || "-"}</p>
                <p className="text-sm font-medium text-gray-600 leading-relaxed mt-1">
                  {order.deliveryDetails?.addressLine1 || "-"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Keranjang & Items */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 pb-4">
            <h3 className="text-base font-extrabold text-gray-900">Ringkasan Layanan</h3>
          </div>
          
          <div className="bg-gray-50/50 p-6 space-y-4">
            {order.cartItems.map((item: any) => (
              <div key={item.serviceId} className="flex justify-between items-start border-b border-gray-200/60 pb-4 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-sm font-medium text-gray-500 mt-1">Qty: <span className="font-bold text-gray-700">{item.quantity}</span> x Pcs/Kg</p>
                </div>
                {/* As backend drops price per item in cart items array dynamically, we don't have item price. Total handles it */}
              </div>
            ))}
          </div>

          <div className="p-6 bg-white border-t border-gray-100 flex justify-between items-end">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-0.5">Total Tagihan Final</p>
              <p className="text-xs text-gray-400">Termasuk pajak & biaya admin</p>
            </div>
            <div className="text-2xl font-extrabold text-blue-600">
              {formatIDR(order.totalAmount)}
            </div>
          </div>
        </section>
        
        {order.status === "placed" && (
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/60 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
               <p className="text-sm text-amber-800 font-medium">
                 Link pembayaran mungkin kedaluwarsa jika Anda belum membayar. Silakan hubungi admin jika gagal bayar.
               </p>
            </div>
        )}

        <div className="pt-4 pb-8 flex justify-center">
            <Link href="/dashboard" className="text-sm font-bold text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
              Kembali ke Dashboard Utama <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
        </div>
      </main>
    </div>
  );
}
