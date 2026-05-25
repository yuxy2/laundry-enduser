"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowLeft, MapPin, Star, Clock, CheckCircle2,
  Minus, Plus, Loader2, Sparkles, X, ShoppingBag
} from "lucide-react";

declare global {
  interface Window {
    snap: any;
  }
}

export default function PartnerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const [laundry, setLaundry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  const [cart, setCart] = useState<Record<string, { quantity: number; data: any }>>({});
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const [userProfile, setUserProfile] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<"payLater" | "quota">("payLater");

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    email: "",
    addressLine1: "",
    city: ""
  });

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setDeliveryDetails(prev => ({
          ...prev,
          name: user.name || "",
          email: user.email || "",
          city: user.city || "",
          addressLine1: user.addressLine1 || ""
        }));
      } catch (e) { /* ignore */ }
    }

    const fetchUserProfile = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) return;
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://laundry-app-one-theta.vercel.app";
        const res = await fetch(`${apiUrl}/api/my/user`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          const p = data.data || data;
          setUserProfile(p);
          localStorage.setItem("userData", JSON.stringify(p));
          if (p.isMember && p.quotaRemaining > 0) {
            setPaymentMethod("quota");
          }
        }
      } catch (e) { /* ignore */ }
    };
    fetchUserProfile();

    const fetchLaundryDetail = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://laundry-app-one-theta.vercel.app";
        const res = await fetch(`${apiUrl}/api/laundry/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data laundry");
        const data = await res.json();
        setLaundry(data.data || data);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan koneksi");
      } finally {
        setLoading(false);
      }
    };

    fetchLaundryDetail();
  }, [id]);

  const toggleService = (service: any) => {
    setCart(prev => {
      if (prev[service._id]) {
        return {};
      }
      return {
        [service._id]: { quantity: 1, data: service }
      };
    });
  };

  const getCartTotal = () => Object.values(cart).reduce((total, item) => total + (item.quantity * item.data.price), 0);
  const getCartItemCount = () => Object.values(cart).reduce((count, item) => count + item.quantity, 0);

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount || 0);
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError("");

    const token = localStorage.getItem("userToken");
    if (!token || token === "undefined") {
      router.push(`/login?redirect=/partner/${id}`);
      return;
    }

    setCheckoutLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://laundry-app-one-theta.vercel.app";
      const cartItems = Object.values(cart).map(item => ({
        serviceId: item.data._id,
        name: item.data.name,
        quantity: item.quantity.toString()
      }));

      const payload = { laundryId: id, deliveryDetails, cartItems, paymentMethod };

      const res = await fetch(`${apiUrl}/api/order/checkout/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal memproses pembayaran");

      if (data.data && data.data.orderId && !data.data.url) {
        // Deferred payment (payLater or quota checkout)
        setCart({});
        setShowCheckout(false);
        router.push("/orders?status=success");
      } else if (data.data && (data.data.token || data.data.url)) {
        const snapToken = data.data.token || (data.data.url ? data.data.url.split('/').pop() : "");
        if (window.snap) {
          window.snap.pay(snapToken, {
            onSuccess: function () { setCart({}); setShowCheckout(false); router.push("/orders?status=success"); },
            onPending: function () { setCart({}); setShowCheckout(false); router.push("/orders?status=pending"); },
            onError: function () { setCheckoutError("Pembayaran gagal. Silakan coba lagi."); },
            onClose: function () { setCheckoutError("Selesaikan pembayaran untuk memproses pesanan."); }
          });
        } else if (data.data.url) {
          window.location.href = data.data.url;
        }
      } else {
        throw new Error("Gagal membuat pesanan");
      }
    } catch (err: any) {
      setCheckoutError(err.message || "Terjadi kesalahan saat pemrosesan");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (error || (!loading && !laundry)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-peach-light border border-peach-border mb-6 flex items-center justify-center text-accent">
          <Sparkles className="w-8 h-8 animate-pulse-glow" />
        </div>
        <h2 className="text-2xl font-display font-extrabold mb-3">Tidak Tersedia</h2>
        <p className="text-foreground/60 mb-8 font-semibold max-w-sm">{error || "Mitra ini sedang tidak aktif."}</p>
        <button onClick={() => router.back()} className="btn-outline !text-sm">Kembali</button>
      </div>
    );
  }

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_URL || "https://app.sandbox.midtrans.com/snap/snap.js"}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""}
        strategy="lazyOnload"
      />
      <div className={`min-h-screen bg-white text-foreground font-sans pb-32 relative ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 sm:left-10 z-50 w-10 h-10 rounded-xl bg-white/80 border border-peach-border backdrop-blur-md flex items-center justify-center text-foreground/70 hover:text-accent hover:bg-peach-light transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {loading ? (
          <div className="animate-pulse w-full">
            <div className="h-72 sm:h-96 w-full skeleton !rounded-none"></div>
            <main className="max-w-4xl mx-auto px-6 sm:px-12 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-4">
                  <div className="skeleton h-8 w-40 rounded-xl mb-6"></div>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="skeleton h-24 rounded-2xl"></div>
                  ))}
                </div>
                <div className="skeleton h-64 rounded-2xl"></div>
              </div>
            </main>
          </div>
        ) : (
          <>
            {/* Hero Banner */}
            <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-peach-dark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/partner-laundry.png"
                alt={`E-Laundry Hub ${laundry.city || ""}`}
                className="w-full h-full object-cover !rounded-none opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>

              <div className="absolute bottom-8 left-6 sm:left-12 right-6 sm:right-12 z-10 text-left">
                <div className="max-w-4xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4 backdrop-blur-xs">
                    <Sparkles className="w-3 h-3 text-accent" />
                    <span className="text-accent text-[11px] font-bold tracking-wide uppercase">Mitra Resmi E-Laundry</span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-display font-extrabold mb-5 text-foreground leading-tight">
                    {`E-Laundry Hub ${laundry.city || ""}`}
                  </h1>
                  <div className="flex flex-wrap items-center gap-5 text-sm text-foreground/75 font-semibold">
                    <span className="flex items-center gap-2 text-[#F5B842]">
                      <Star className="w-4 h-4 fill-current" /> {laundry.rating?.toFixed(1) || "5.0"}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-peach-border"></span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" /> {laundry.city}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-peach-border"></span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" /> Est. {laundry.estimatedDeliveryTime} Mnt
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <main className="max-w-4xl mx-auto px-6 sm:px-12 pt-10 relative z-20 text-left">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Services */}
                <div className="md:col-span-2">
                  <h2 className="text-lg font-display font-bold mb-6 flex items-center gap-3 text-foreground">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    Katalog Layanan
                  </h2>

                  <div className="space-y-3">
                    {(laundry.services || []).map((service: any) => {
                      const qty = cart[service._id]?.quantity || 0;
                      return (
                        <div 
                          key={service._id} 
                          onClick={() => toggleService(service)}
                          className={`bg-white border rounded-2xl p-5 flex justify-between items-center cursor-pointer transition-all duration-300 ${
                            qty > 0 
                              ? 'border-accent bg-peach-light/20 shadow-sm shadow-accent/5' 
                              : 'border-peach-border hover:border-accent hover:shadow-2xs'
                          }`}
                        >
                          <div className="flex-1 pr-6 min-w-0">
                            <h4 className="font-display font-bold text-base text-foreground mb-1 truncate">{service.name}</h4>
                            <div className="flex items-baseline gap-2">
                              <span className="text-accent font-extrabold text-base">{formatIDR(service.price)}</span>
                              <span className="text-foreground/50 text-xs font-semibold">/ {service.name.toLowerCase().includes("kilo") ? "Kg" : "Pcs"}</span>
                            </div>
                          </div>

                          <div className="shrink-0">
                            {qty > 0 ? (
                              <div className="flex items-center gap-1.5 px-4 py-2 bg-accent text-white text-xs font-bold rounded-xl shadow-xs transition">
                                <CheckCircle2 className="w-4 h-4 text-white" />
                                <span>Terpilih</span>
                              </div>
                            ) : (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleService(service);
                                }}
                                className="px-4 py-2 bg-peach-light hover:bg-peach-dark text-foreground/75 hover:text-accent border border-peach-border text-xs font-bold rounded-xl transition"
                              >
                                Pilih Layanan
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {(!laundry.services || laundry.services.length === 0) && (
                      <div className="text-center p-12 bg-peach-light border border-peach-border rounded-2xl">
                        <p className="text-foreground/50 text-sm font-semibold">Belum ada katalog layanan.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="bg-peach-light border border-peach-border rounded-2xl p-6 shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center mb-5">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-base text-foreground mb-3">Kualifikasi Mitra</h3>
                    <p className="text-foreground/60 text-xs sm:text-sm leading-relaxed mb-6 font-semibold">
                      Layanan manajemen busana dengan standar kualitas premium E-Laundry.
                    </p>

                    <h4 className="text-[11px] font-bold text-foreground/50 uppercase tracking-wider mb-4">Fasilitas</h4>
                    <div className="space-y-3">
                      {(laundry.facilities || ["Premium Care", "Antar Jemput"]).map((fac: string, i: number) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                          <span className="text-xs text-foreground/75 font-semibold">{fac}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </main>

            {/* Floating Checkout Bar */}
            {getCartItemCount() > 0 && !showCheckout && (
              <div className="fixed bottom-0 left-0 w-full z-45 border-t border-peach-border bg-peach-light/95 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 sm:px-12 py-4 flex justify-between items-center gap-6">
                  <div className="text-left">
                    <span className="text-xs text-foreground/50 mb-1 block font-bold">Layanan Terpilih: <strong className="text-foreground">{Object.values(cart)[0]?.data.name}</strong></span>
                    <span className="text-lg sm:text-xl font-display font-black text-accent">
                      {formatIDR(Object.values(cart)[0]?.data.price || 0)}
                      <span className="text-foreground/50 text-xs font-semibold"> / {Object.values(cart)[0]?.data.name.toLowerCase().includes("kilo") ? "Kg" : "Pcs"}</span>
                    </span>
                  </div>
                  <button onClick={() => setShowCheckout(true)} className="btn-primary !text-sm">
                    <ShoppingBag className="w-4 h-4" />
                    Lanjutkan ke Checkout
                  </button>
                </div>
              </div>
            )}

            {/* Checkout Modal */}
            {showCheckout && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setShowCheckout(false)}></div>

                <div className="relative w-full max-w-xl h-full sm:h-auto sm:max-h-[90vh] bg-white border border-peach-border sm:rounded-3xl flex flex-col animate-scale-in text-left">
                  {/* Header */}
                  <div className="flex justify-between items-center p-6 border-b border-peach-border shrink-0">
                    <h2 className="text-xl font-display font-extrabold text-foreground flex items-center gap-3">
                      <ShoppingBag className="w-5 h-5 text-accent" />
                      Checkout Detail
                    </h2>
                    <button onClick={() => setShowCheckout(false)} className="w-8 h-8 rounded-lg bg-peach-light border border-peach-border flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-peach-dark transition-all">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Form */}
                  <div className="p-6 overflow-y-auto flex-1 space-y-5">
                    <p className="text-xs sm:text-sm text-foreground/60 font-semibold leading-relaxed">
                      Lengkapi detail pengantaran untuk memproses pesanan perawatan busana Anda.
                    </p>

                    <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                      {checkoutError && (
                        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
                          {checkoutError}
                        </div>
                      )}

                      {[
                        { label: "Nama Lengkap", key: "name", type: "text" },
                        { label: "Email", key: "email", type: "email" },
                        { label: "Kota", key: "city", type: "text" },
                      ].map((field) => (
                        <div key={field.key} className="space-y-2">
                          <label className="text-xs font-bold text-foreground/60 uppercase tracking-wider">{field.label}</label>
                          <input
                            type={field.type} required
                            value={(deliveryDetails as any)[field.key]}
                            onChange={e => setDeliveryDetails({ ...deliveryDetails, [field.key]: e.target.value })}
                            className="w-full !rounded-xl !text-sm !border-peach-border"
                          />
                        </div>
                      ))}

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground/60 uppercase tracking-wider">Alamat Lengkap</label>
                        <textarea
                          required rows={3}
                          value={deliveryDetails.addressLine1}
                          onChange={e => setDeliveryDetails({ ...deliveryDetails, addressLine1: e.target.value })}
                          className="w-full !rounded-xl !text-sm resize-none !border-peach-border"
                          placeholder="Nama jalan, perumahan, nomor rumah, detail patokan..."
                        ></textarea>
                      </div>

                      {/* Payment Method Selector */}
                      <div className="space-y-3 pt-2">
                        <label className="text-xs font-bold text-foreground/60 uppercase tracking-wider block">Metode Pembayaran</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Pay Later Option */}
                          <label className={`flex flex-col p-4 border rounded-2xl cursor-pointer transition-all ${
                            paymentMethod === "payLater" 
                              ? "border-accent bg-peach-light/50" 
                              : "border-peach-border hover:border-accent/40"
                          }`}>
                            <div className="flex items-center gap-2 mb-1">
                              <input 
                                type="radio" 
                                name="paymentMethod" 
                                value="payLater"
                                checked={paymentMethod === "payLater"}
                                onChange={() => setPaymentMethod("payLater")}
                                className="text-accent focus:ring-accent border-peach-border"
                              />
                              <span className="text-xs font-bold text-foreground">Timbang Dulu, Bayar Nanti</span>
                            </div>
                            <span className="text-[10px] text-foreground/60 pl-5">
                              Pakaian dijemput & ditimbang dulu. Pembayaran dilakukan via aplikasi setelah berat diketahui.
                            </span>
                          </label>

                          {/* Quota Option */}
                          <label className={`flex flex-col p-4 border rounded-2xl cursor-pointer transition-all ${
                            paymentMethod === "quota"
                              ? "border-accent bg-peach-light/50"
                              : "border-peach-border hover:border-accent/40"
                          } ${(!userProfile?.isMember || userProfile?.quotaRemaining <= 0) ? "opacity-60 cursor-not-allowed" : ""}`}>
                            <div className="flex items-center gap-2 mb-1">
                              <input 
                                type="radio" 
                                name="paymentMethod" 
                                value="quota"
                                disabled={!userProfile?.isMember || userProfile?.quotaRemaining <= 0}
                                checked={paymentMethod === "quota"}
                                onChange={() => setPaymentMethod("quota")}
                                className="text-accent focus:ring-accent border-peach-border disabled:opacity-50"
                              />
                              <span className="text-xs font-bold text-foreground">Potong Kuota Member</span>
                            </div>
                            <span className="text-[10px] text-foreground/60 pl-5">
                              {userProfile?.isMember 
                                ? `Menggunakan kuota bulanan Anda. (Sisa: ${userProfile.quotaRemaining} Kg)`
                                : "Khusus member. Gabung paket membership untuk menikmati bayar pakai kuota."
                              }
                            </span>
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Action Bar */}
                  <div className="p-6 border-t border-peach-border shrink-0 bg-peach-light/30 space-y-3">
                    <div className="flex justify-between items-center text-xs font-semibold text-foreground/60">
                      <span>Tarif Layanan</span>
                      <span className="font-bold text-foreground">
                        {formatIDR(Object.values(cart)[0]?.data.price || 0)} / {Object.values(cart)[0]?.data.name.toLowerCase().includes("kilo") ? "Kg" : "Pcs"}
                      </span>
                    </div>
                    {laundry && laundry.deliveryPrice > 0 && (
                      <div className="flex justify-between items-center text-xs font-semibold text-foreground/60">
                        <span>Ongkos Kirim (Antar Jemput)</span>
                        <span className="font-bold text-foreground">{formatIDR(laundry.deliveryPrice)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center border-t border-peach-border/60 pt-3 mb-2">
                      <div className="text-left">
                        <span className="text-sm font-bold text-foreground/75">Total Bayar Sekarang</span>
                        <p className="text-[10px] text-foreground/50 font-medium">
                          {paymentMethod === "quota" 
                            ? "Dipotong kuota member bulanan" 
                            : "Dibayar setelah pakaian selesai ditimbang"
                          }
                        </p>
                      </div>
                      <span className="text-xl font-display font-black text-emerald-500">Rp 0</span>
                    </div>
                    <button
                      form="checkout-form"
                      type="submit"
                      disabled={checkoutLoading}
                      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {checkoutLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (
                        <span className="flex items-center justify-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          {paymentMethod === "payLater" || paymentMethod === "quota"
                            ? "Konfirmasi & Pesan Penjemputan"
                            : "Lanjutkan Pembayaran"
                          }
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
