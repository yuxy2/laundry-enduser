"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, MapPin, Star, Clock, CheckCircle2, 
  Minus, Plus, ShoppingBag, Loader2, Info
} from "lucide-react";

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
          throw new Error("Gagal mengambil detail laundry");
        }
        
        const data = await res.json();
        setLaundry(data.data || data); 
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan sistem");
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
        throw new Error(data.message || "Gagal memproses checkout");
      }

      if (data.data && data.data.url) {
        // Redirect to Midtrans URL
        window.location.href = data.data.url;
      } else {
        throw new Error("URL Pembayaran tidak ditemukan");
      }

    } catch (err: any) {
      setCheckoutError(err.message || "Terjadi kesalahan sistem saat checkout");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !laundry) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <Info className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Toko Tidak Ditemukan</h2>
        <p className="text-gray-500 mb-6">{error || "Mitra laundry ini mungkin sedang tutup atau tidak tersedia."}</p>
        <button onClick={() => router.back()} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-lg">Kembali</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-32">
      {/* Header with Background Image */}
      <div className="relative h-64 sm:h-80 w-full bg-gray-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={laundry.imageUrl || "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1200&h=600&fit=crop"} 
          alt={laundry.laundryName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
        
        <button 
          onClick={() => router.back()}
          className="absolute top-6 left-4 sm:left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors z-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="absolute bottom-6 left-4 sm:left-6 right-4 sm:right-6">
          <div className="flex justify-between items-end">
            <div className="text-white">
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
                {laundry.laundryName}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base font-medium">
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-current" /> {laundry.rating?.toFixed(1) || "5.0"}
                </span>
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                <span className="flex items-center gap-1 opacity-90">
                  <MapPin className="w-4 h-4" /> {laundry.city}
                </span>
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                <span className="flex items-center gap-1 opacity-90">
                  <Clock className="w-4 h-4" /> Est. {laundry.estimatedDeliveryTime} menit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 -mt-4 relative z-20">
        {/* Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-3 text-lg">Informasi Tambahan</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {laundry.description || "Kami adalah penyedia layanan laundry terpercaya yang mengutamakan keberhasilan mencuci dengan standard mesin modern. Menyediakan fasilitas antar-jemput ke lokasi Anda langsung."}
          </p>
          <div className="flex flex-wrap gap-2">
            {(laundry.facilities || []).map((fac: string, i: number) => (
              <span key={i} className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> {fac}
              </span>
            ))}
          </div>
        </div>

        {/* Services List */}
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-4 px-2">Pilih Layanan</h2>
          <div className="space-y-4">
            {(laundry.services || []).map((service: any) => {
              const qty = cart[service._id]?.quantity || 0;
              return (
                <div key={service._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition-all hover:border-blue-200">
                  <div className="flex-1 pr-4">
                    <h4 className="font-bold text-gray-900 text-lg mb-1">{service.name}</h4>
                    <span className="text-blue-600 font-extrabold">{formatIDR(service.price)}</span>
                    <span className="text-gray-400 text-sm font-medium ml-1">/ {service.name.toLowerCase().includes("kilo") ? "kg" : "pcs"}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {qty > 0 ? (
                      <>
                        <button 
                          onClick={() => updateCart(service, -1)}
                          className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center hover:bg-blue-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center font-bold">{qty}</span>
                        <button 
                          onClick={() => updateCart(service, 1)}
                          className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 shadow-md shadow-blue-500/30 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => updateCart(service, 1)}
                        className="px-4 py-2 border rounded-xl text-sm font-bold text-blue-600 border-blue-200 hover:bg-blue-50 transition-colors"
                      >
                        Tambah
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            
            {(!laundry.services || laundry.services.length === 0) && (
              <div className="text-center p-8 bg-white border border-gray-100 rounded-2xl">
                <p className="text-gray-500 font-medium">Mitra belum menambahkan layanan jasanya.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Checkout Bar */}
      {getCartItemCount() > 0 && !showCheckout && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 sm:p-6 z-40 animate-in slide-in-from-bottom-full pb-safe">
          <div className="max-w-3xl mx-auto flex justify-between items-center gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Total Pesanan ({getCartItemCount()} item)</span>
              <span className="text-xl sm:text-2xl font-extrabold text-blue-600">
                {formatIDR(getCartTotal())}
              </span>
            </div>
            <button 
              onClick={() => setShowCheckout(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30"
            >
              <ShoppingBag className="w-5 h-5" /> Lanjut Pesan
            </button>
          </div>
        </div>
      )}

      {/* Checkout Modal Overlay */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowCheckout(false)}></div>
          
          <div className="relative bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 animate-in slide-in-from-bottom-8 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Detail Pengiriman</h2>
            <p className="text-sm font-medium text-gray-500 mb-6 border-b border-gray-100 pb-4">
              Konfirmasi alamat jemput/antar untuk Mitra Laundry.
            </p>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              {checkoutError && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                  {checkoutError}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Nama Penerima</label>
                <input 
                  type="text" required
                  value={deliveryDetails.name} onChange={e => setDeliveryDetails({...deliveryDetails, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-colors text-gray-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email (Untuk Bukti Pesanan)</label>
                <input 
                  type="email" required
                  value={deliveryDetails.email} onChange={e => setDeliveryDetails({...deliveryDetails, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-colors text-gray-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Kota</label>
                <input 
                  type="text" required
                  value={deliveryDetails.city} onChange={e => setDeliveryDetails({...deliveryDetails, city: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-colors text-gray-900" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Alamat Lengkap</label>
                <textarea 
                  required rows={3}
                  value={deliveryDetails.addressLine1} onChange={e => setDeliveryDetails({...deliveryDetails, addressLine1: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-colors text-gray-900" 
                  placeholder="Nama jalan, Nomor rumah, RT/RW, Patokan..."
                ></textarea>
              </div>

              {/* Rincian Harga Akhir */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-end">
                 <div>
                   <p className="text-sm font-semibold text-gray-500 mb-1">Total Tagihan Sementara</p>
                   <p className="text-xs text-gray-400">Belum termasuk biaya antar jemput tambahan (jika ada)</p>
                 </div>
                 <div className="text-2xl font-extrabold text-blue-600">
                    {formatIDR(getCartTotal())}
                 </div>
              </div>

              <div className="pt-6 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 py-3.5 px-4 font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={checkoutLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all disabled:opacity-70"
                >
                  {checkoutLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : "Bayar Sekarang"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
