"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { 
  ArrowLeft, MapPin, Star, Clock, CheckCircle2, 
  Minus, Plus, Loader2, Info, Diamond, ChevronRight
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

  // Cart state: { serviceId: { quantity, data } }
  const [cart, setCart] = useState<Record<string, { quantity: number; data: any }>>({});
  
  // Checkout Modal state
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  // Delivery Form State
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    email: "",
    addressLine1: "",
    city: ""
  });

  useEffect(() => {
    // Load User Data from local storage to pre-fill delivery
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
      } catch (e) {
        // ignore
      }
    }

    const fetchLaundryDetail = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://laundry-app-one-theta.vercel.app";
        const res = await fetch(`${apiUrl}/api/laundry/${id}`);
        
        if (!res.ok) {
          throw new Error("Gagal mengambil rincian kurasi laundry");
        }
        
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
        newCart[service._id] = {
          quantity: newQty,
          data: service
        };
      }
      return newCart;
    });
  };

  const getCartTotal = () => {
    return Object.values(cart).reduce((total, item) => {
      return total + (item.quantity * item.data.price);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((count, item) => count + item.quantity, 0);
  };

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

      const payload = {
        laundryId: id,
        deliveryDetails,
        cartItems
      };

      const res = await fetch(`${apiUrl}/api/order/checkout/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal memproses otorisasi pembayaran");
      }

      if (data.data && (data.data.token || data.data.url)) {
        const snapToken = data.data.token || (data.data.url ? data.data.url.split('/').pop() : "");
        
        if (window.snap) {
          window.snap.pay(snapToken, {
            onSuccess: function (result: any) {
              setCart({});
              setShowCheckout(false);
              router.push("/orders?status=success");
            },
            onPending: function (result: any) {
              setCart({});
              setShowCheckout(false);
              router.push("/orders?status=pending");
            },
            onError: function (result: any) {
              setCheckoutError("Pembayaran gagal. Silakan coba lagi.");
            },
            onClose: function () {
              setCheckoutError("Selesaikan pembayaran untuk memproses pesanan layanan ini.");
            }
          });
        } else if (data.data.url) {
          // Fallback if snap is not loaded
          window.location.href = data.data.url;
        }
      } else {
        throw new Error("URL Pembayaran tidak diterbitkan");
      }

    } catch (err: any) {
      setCheckoutError(err.message || "Terjadi kesalahan enkripsi saat pemrosesan");
    } finally {
      setCheckoutLoading(false);
    }
  };

  // removed initial loading

  if (error || (!loading && !laundry)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center border-t border-white/5 selection:bg-gold selection:text-background">
        <Diamond className="w-12 h-12 text-gray-600 mb-6" />
        <h2 className="text-2xl font-serif text-white mb-4 tracking-wide">Direktori Kosong</h2>
        <p className="text-gray-400 mb-8 font-light max-w-sm">{error || "Mitra kurasi ini mungkin sedang menangguhkan pelayanan sementara waktu."}</p>
        <button onClick={() => router.back()} className="px-8 py-3 bg-panel border border-border-dark text-white text-xs uppercase tracking-widest hover:border-gold hover:text-gold transition-colors">
          Kembali ke Akses
        </button>
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
      <div className="min-h-screen bg-background text-foreground font-sans pb-32 selection:bg-gold selection:text-background relative">
        <button 
          onClick={() => router.back()}
          className="absolute top-8 left-6 sm:left-12 flex items-center gap-2 text-gold hover:text-white transition-colors text-xs tracking-widest uppercase z-50"
        >
          <ArrowLeft className="w-4 h-4" />
          KEMBALI
        </button>
        {loading ? (
          <div className="animate-pulse w-full">
            <div className="h-72 sm:h-96 w-full bg-panel border-b border-border-dark"></div>
            <main className="max-w-4xl mx-auto px-6 sm:px-12 pt-8 sm:pt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2">
                  <div className="h-6 bg-white/5 w-40 mb-8"></div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-panel border border-border-dark p-6 h-24"></div>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-1 space-y-8">
                  <div className="bg-panel border border-border-dark p-6 sm:p-8 h-64"></div>
                </div>
              </div>
            </main>
          </div>
        ) : (
          <>
      {/* Header with Background Image */}
      <div className="relative h-72 sm:h-96 w-full bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={laundry.imageUrl || "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1200&h=600&fit=crop"} 
          alt={laundry.laundryName}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>

        <div className="absolute bottom-10 left-6 sm:left-12 right-6 sm:right-12 z-10">
          <div className="max-w-4xl mx-auto flex flex-col justify-end">
            <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-gold block"></span>
              MITRA LISENSI
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight mb-6 leading-tight">
              {laundry.laundryName}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-light text-gray-300">
              <span className="flex items-center gap-2 text-gold">
                <Star className="w-4 h-4 fill-current" /> {laundry.rating?.toFixed(1) || "5.0"}
              </span>
              <span className="text-gray-600">|</span>
              <span className="flex items-center gap-2 uppercase tracking-widest">
                <MapPin className="w-4 h-4 text-gold" /> {laundry.city}
              </span>
              <span className="text-gray-600">|</span>
              <span className="flex items-center gap-2 uppercase tracking-widest">
                <Clock className="w-4 h-4 text-gold" /> Est. {laundry.estimatedDeliveryTime} Mnt
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 sm:px-12 pt-8 sm:pt-12 relative z-20">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Services Column */}
          <div className="md:col-span-2">
            <h2 className="text-sm font-serif text-white uppercase tracking-widest mb-8 border-b border-white/5 pb-4">
              Katalog Layanan
            </h2>
            
            <div className="space-y-4">
              {(laundry.services || []).map((service: any) => {
                const qty = cart[service._id]?.quantity || 0;
                return (
                  <div key={service._id} className={`bg-panel border p-6 flex justify-between items-center transition-all ${qty > 0 ? 'border-gold' : 'border-border-dark hover:border-gray-500'}`}>
                    <div className="flex-1 pr-6">
                      <h4 className="font-serif text-white text-lg mb-2 tracking-wide">{service.name}</h4>
                      <div className="flex items-baseline gap-2">
                        <span className="text-gold font-light tracking-wider">{formatIDR(service.price)}</span>
                        <span className="text-gray-500 text-[10px] uppercase tracking-widest">/ {service.name.toLowerCase().includes("kilo") ? "Kilo" : "Pcs"}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 bg-background border border-border-dark rounded-none p-1">
                      {qty > 0 ? (
                        <>
                          <button 
                            onClick={() => updateCart(service, -1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gold hover:bg-white/5 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-light text-white">{qty}</span>
                          <button 
                            onClick={() => updateCart(service, 1)}
                            className="w-8 h-8 flex items-center justify-center text-gold hover:text-white bg-gold/10 hover:bg-gold transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => updateCart(service, 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gold hover:bg-white/5 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {(!laundry.services || laundry.services.length === 0) && (
                <div className="text-center p-12 bg-panel border border-border-dark">
                  <p className="text-gray-500 font-light text-sm tracking-wide">Belum ada katalog layanan yang diterbitkan.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="md:col-span-1 space-y-8">
            {/* Info Card */}
            <div className="bg-panel border border-border-dark p-6 sm:p-8">
              <Diamond className="w-6 h-6 text-gold mb-6" />
              <h3 className="font-serif text-white mb-4 text-base tracking-wide">Kualifikasi Mitra</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed mb-8">
                {laundry.description || "Entitas manajemen busana dengan standard privasi premium, menggunakan mesin mutakhir untuk penanganan khusus jenis bahan Anda."}
              </p>
              
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-4">Metode & Fasilitas</h4>
                {(laundry.facilities || ["Premium Care", "Antar Jemput"]).map((fac: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span className="text-xs font-light text-gray-300 tracking-wide">{fac}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Checkout Bar */}
      {getCartItemCount() > 0 && !showCheckout && (
        <div className="fixed bottom-0 left-0 w-full bg-panel border-t border-gold/30 p-4 sm:p-6 z-40 animate-in slide-in-from-bottom-full pb-safe">
          <div className="max-w-4xl mx-auto px-6 sm:px-12 flex justify-between items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Akumulasi Biaya ({getCartItemCount()} item)</span>
              <span className="text-xl sm:text-2xl font-serif text-white tracking-wider text-gold">
                {formatIDR(getCartTotal())}
              </span>
            </div>
            <button 
              onClick={() => setShowCheckout(true)}
              className="flex items-center justify-center gap-3 bg-gold hover:bg-gold-hover text-background font-bold py-4 px-8 uppercase tracking-widest text-[10px] sm:text-xs transition-all flex-shrink-0"
            >
              Lanjutkan Pemesanan
            </button>
          </div>
        </div>
      )}

      {/* Checkout Modal Overlay */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 bg-black/80 backdrop-blur-md">
          <div className="absolute inset-0 transition-opacity" onClick={() => setShowCheckout(false)}></div>
          
          <div className="relative bg-panel border border-border-dark w-full max-w-xl h-full sm:h-auto sm:max-h-[90vh] flex flex-col animate-in fade-in slide-in-from-bottom-12">
            
            <div className="flex justify-between items-center p-6 border-b border-border-dark shrink-0">
              <h2 className="text-xl font-serif text-white tracking-wide">Surat Jalan Pribadi</h2>
              <button onClick={() => setShowCheckout(false)} className="text-gray-500 hover:text-white transition-colors">
                <Minus className="w-6 h-6 rotate-45" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto flex-1 custom-scrollbar">
              <p className="text-xs font-light tracking-wide text-gray-400 mb-8">
                Mohon otorisasi detail penjemputan alamat untuk tim khusus pengantaran kami.
              </p>

              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-6">
                {checkoutError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 font-light text-xs tracking-wide">
                    {checkoutError}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Nama Entitas / Klien</label>
                  <input 
                    type="text" required
                    value={deliveryDetails.name} onChange={e => setDeliveryDetails({...deliveryDetails, name: e.target.value})}
                    className="w-full px-4 py-3 bg-background border border-border-dark font-light focus:outline-none focus:border-gold transition-colors text-white text-sm rounded-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email Surat Tagihan</label>
                  <input 
                    type="email" required
                    value={deliveryDetails.email} onChange={e => setDeliveryDetails({...deliveryDetails, email: e.target.value})}
                    className="w-full px-4 py-3 bg-background border border-border-dark font-light focus:outline-none focus:border-gold transition-colors text-white text-sm rounded-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Wilayah Operasional (Kota)</label>
                  <input 
                    type="text" required
                    value={deliveryDetails.city} onChange={e => setDeliveryDetails({...deliveryDetails, city: e.target.value})}
                    className="w-full px-4 py-3 bg-background border border-border-dark font-light focus:outline-none focus:border-gold transition-colors text-white text-sm rounded-none" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Alamat Penjemputan Spesifik</label>
                  <textarea 
                    required rows={3}
                    value={deliveryDetails.addressLine1} onChange={e => setDeliveryDetails({...deliveryDetails, addressLine1: e.target.value})}
                    className="w-full px-4 py-3 bg-background border border-border-dark font-light focus:outline-none focus:border-gold transition-colors text-white text-sm rounded-none resize-none" 
                    placeholder="Nama properti, Distrik, Panduan spesifik..."
                  ></textarea>
                </div>
              </form>
            </div>
            
            {/* Action Bar */}
            <div className="p-6 bg-background border-t border-border-dark shrink-0">
               <div className="flex justify-between items-center mb-6">
                 <div>
                   <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Tagihan Pra-Pajak</p>
                 </div>
                 <div className="text-xl font-serif text-gold">
                    {formatIDR(getCartTotal())}
                 </div>
              </div>
              <button 
                form="checkout-form"
                type="submit"
                disabled={checkoutLoading}
                className="w-full flex items-center justify-center gap-3 py-4 bg-gold hover:bg-gold-hover text-background font-bold tracking-widest uppercase text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkoutLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : "Konfirmasi Pembayaran Khusus"}
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
