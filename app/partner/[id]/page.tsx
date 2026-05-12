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

  const updateCart = (service: any, delta: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      const currentQty = newCart[service._id]?.quantity || 0;
      const newQty = Math.max(0, currentQty + delta);
      if (newQty === 0) {
        delete newCart[service._id];
      } else {
        newCart[service._id] = { quantity: newQty, data: service };
      }
      return newCart;
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

      const payload = { laundryId: id, deliveryDetails, cartItems };

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

      if (data.data && (data.data.token || data.data.url)) {
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
        throw new Error("URL Pembayaran tidak diterbitkan");
      }
    } catch (err: any) {
      setCheckoutError(err.message || "Terjadi kesalahan saat pemrosesan");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (error || (!loading && !laundry)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-accent2/10 mb-6 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-accent2/40" />
        </div>
        <h2 className="text-2xl font-display font-bold mb-3">Tidak Tersedia</h2>
        <p className="text-foreground/60 mb-8 font-light max-w-sm">{error || "Mitra ini sedang tidak aktif."}</p>
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
      <div className={`min-h-screen bg-background text-foreground font-sans pb-32 relative ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 sm:left-10 z-50 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-foreground/60 hover:text-accent hover:bg-white/20 transition-all group"
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
            <div className="relative h-72 sm:h-96 w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/partner-laundry.png"
                alt={`E-Laundry Hub ${laundry.city || ""}`}
                className="w-full h-full object-cover !rounded-none opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>

              <div className="absolute bottom-8 left-6 sm:left-12 right-6 sm:right-12 z-10">
                <div className="max-w-4xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4">
                    <Sparkles className="w-3 h-3 text-accent" />
                    <span className="text-accent text-[11px] font-semibold tracking-wide uppercase">Mitra Resmi E-Laundry</span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-display font-bold mb-5">
                    {`E-Laundry Hub ${laundry.city || ""}`}
                  </h1>
                  <div className="flex flex-wrap items-center gap-5 text-sm text-foreground/75">
                    <span className="flex items-center gap-2 text-accent4">
                      <Star className="w-4 h-4 fill-current" /> {laundry.rating?.toFixed(1) || "5.0"}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" /> {laundry.city}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" /> Est. {laundry.estimatedDeliveryTime} Mnt
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <main className="max-w-4xl mx-auto px-6 sm:px-12 pt-10 relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Services */}
                <div className="md:col-span-2">
                  <h2 className="text-lg font-display font-semibold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4 text-accent" />
                    </div>
                    Katalog Layanan
                  </h2>

                  <div className="space-y-3">
                    {(laundry.services || []).map((service: any) => {
                      const qty = cart[service._id]?.quantity || 0;
                      return (
                        <div key={service._id} className={`glass-card !rounded-2xl p-5 flex justify-between items-center ${qty > 0 ? '!border-accent/30 shadow-accent/5 shadow-lg' : ''}`}>
                          <div className="flex-1 pr-6">
                            <h4 className="font-display font-semibold mb-1">{service.name}</h4>
                            <div className="flex items-baseline gap-2">
                              <span className="text-accent font-semibold">{formatIDR(service.price)}</span>
                              <span className="text-foreground/75 text-xs">/ {service.name.toLowerCase().includes("kilo") ? "Kg" : "Pcs"}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 bg-white/10 rounded-xl p-1">
                            {qty > 0 ? (
                              <>
                                <button onClick={() => updateCart(service, -1)} className="w-9 h-9 flex items-center justify-center rounded-lg text-foreground/70 hover:text-accent hover:bg-accent/10 transition-all">
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                                <button onClick={() => updateCart(service, 1)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-background transition-all">
                                  <Plus className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <button onClick={() => updateCart(service, 1)} className="w-9 h-9 flex items-center justify-center rounded-lg text-foreground/60 hover:text-accent hover:bg-accent/10 transition-all">
                                <Plus className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {(!laundry.services || laundry.services.length === 0) && (
                      <div className="text-center p-12 glass-card !rounded-2xl">
                        <p className="text-foreground/60 text-sm">Belum ada katalog layanan.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="glass-card !rounded-2xl p-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent2 flex items-center justify-center mb-5">
                      <Sparkles className="w-5 h-5 text-background" />
                    </div>
                    <h3 className="font-display font-semibold mb-3">Kualifikasi Mitra</h3>
                    <p className="text-foreground/60 text-sm leading-relaxed mb-6 font-light">
                      Layanan manajemen busana dengan standar kualitas premium E-Laundry.
                    </p>

                    <h4 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-4">Fasilitas</h4>
                    <div className="space-y-3">
                      {(laundry.facilities || ["Premium Care", "Antar Jemput"]).map((fac: string, i: number) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                          <span className="text-xs text-foreground/75">{fac}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </main>

            {/* Floating Checkout Bar */}
            {getCartItemCount() > 0 && !showCheckout && (
              <div className="fixed bottom-0 left-0 w-full z-40 border-t border-accent/20" style={{ background: 'rgba(10, 14, 26, 0.95)', backdropFilter: 'blur(20px)' }}>
                <div className="max-w-4xl mx-auto px-6 sm:px-12 py-4 flex justify-between items-center gap-6">
                  <div>
                    <span className="text-xs text-foreground/60 mb-1 block">{getCartItemCount()} item</span>
                    <span className="text-xl sm:text-2xl font-display font-bold text-accent">
                      {formatIDR(getCartTotal())}
                    </span>
                  </div>
                  <button onClick={() => setShowCheckout(true)} className="btn-primary !text-sm">
                    <ShoppingBag className="w-4 h-4" />
                    Checkout
                  </button>
                </div>
              </div>
            )}

            {/* Checkout Modal */}
            {showCheckout && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6">
                <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setShowCheckout(false)}></div>

                <div className="relative w-full max-w-xl h-full sm:h-auto sm:max-h-[90vh] glass-card !rounded-none sm:!rounded-3xl flex flex-col animate-scale-in">
                  {/* Header */}
                  <div className="flex justify-between items-center p-6 border-b border-white/10 shrink-0">
                    <h2 className="text-xl font-display font-bold flex items-center gap-3">
                      <ShoppingBag className="w-5 h-5 text-accent" />
                      Checkout
                    </h2>
                    <button onClick={() => setShowCheckout(false)} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-white/10 transition-all">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Form */}
                  <div className="p-6 overflow-y-auto flex-1">
                    <p className="text-sm text-foreground/60 mb-6 font-light">
                      Lengkapi detail pengiriman untuk memproses pesanan Anda.
                    </p>

                    <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                      {checkoutError && (
                        <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-400 text-sm font-light">
                          {checkoutError}
                        </div>
                      )}

                      {[
                        { label: "Nama Lengkap", key: "name", type: "text" },
                        { label: "Email", key: "email", type: "email" },
                        { label: "Kota", key: "city", type: "text" },
                      ].map((field) => (
                        <div key={field.key} className="space-y-2">
                          <label className="text-sm font-medium text-foreground/75">{field.label}</label>
                          <input
                            type={field.type} required
                            value={(deliveryDetails as any)[field.key]}
                            onChange={e => setDeliveryDetails({ ...deliveryDetails, [field.key]: e.target.value })}
                            className="w-full !rounded-xl !text-sm"
                          />
                        </div>
                      ))}

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground/75">Alamat Lengkap</label>
                        <textarea
                          required rows={3}
                          value={deliveryDetails.addressLine1}
                          onChange={e => setDeliveryDetails({ ...deliveryDetails, addressLine1: e.target.value })}
                          className="w-full !rounded-xl !text-sm resize-none"
                          placeholder="Nama properti, distrik, panduan..."
                        ></textarea>
                      </div>
                    </form>
                  </div>

                  {/* Action Bar */}
                  <div className="p-6 border-t border-white/10 shrink-0">
                    <div className="flex justify-between items-center mb-5">
                      <span className="text-sm text-foreground/60">Total</span>
                      <span className="text-xl font-display font-bold text-accent">{formatIDR(getCartTotal())}</span>
                    </div>
                    <button
                      form="checkout-form"
                      type="submit"
                      disabled={checkoutLoading}
                      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {checkoutLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Konfirmasi Pembayaran
                        </>
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
