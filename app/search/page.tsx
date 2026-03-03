"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, Search, MapPin, Star, Filter, Loader2, Shirt
} from "lucide-react";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCity = searchParams.get("city");
  const initialCity = rawCity || "Yogyakarta";

  const [city, setCity] = useState(initialCity);
  const [searchInput, setSearchInput] = useState(initialCity);
  const [laundries, setLaundries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLaundries = async (searchCity: string) => {
    setLoading(true);
    setError("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://laundry-app-one-theta.vercel.app";
      const res = await fetch(`${apiUrl}/api/laundry/search/${searchCity}`);
      
      if (!res.ok) {
        throw new Error("Gagal mengambil data mitra laundry");
      }
      
      const data = await res.json();
      setLaundries(data.data?.data || []);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaundries(city);
  }, [city]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      router.push(`/search?city=${encodeURIComponent(searchInput)}`);
      setCity(searchInput);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-20">
      {/* Header Mobile / Desktop */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button 
              onClick={() => router.back()}
              className="p-2 -ml-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <form onSubmit={handleSearch} className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100/70 border border-transparent focus:border-blue-500 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-sm"
                placeholder="Cari Kota... (Misal: Yogyakarta, Bandung)"
                required
              />
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-extrabold text-gray-900">
            Mitra Laundry di "{city}"
          </h1>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-500 font-medium">Mencari mitra terbaik...</p>
          </div>
        ) : laundries.length > 0 ? (
          <div className="space-y-4">
            {laundries.map((laundry) => (
              <Link href={`/partner/${laundry._id}`} key={laundry._id} className="block group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-md transition-all flex flex-col sm:flex-row">
                  <div className="w-full sm:w-48 h-48 sm:h-auto relative flex-shrink-0 bg-gray-200 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={laundry.imageUrl || "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&h=400&fit=crop"} 
                      alt={laundry.laundryName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-gray-900 shadow-sm flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {laundry.rating?.toFixed(1) || "5.0"}
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{laundry.laundryName}</h3>
                        <span className="text-xs font-extrabold uppercase tracking-wide text-green-600 bg-green-50 px-2.5 py-1 rounded-md border border-green-100">Buka</span>
                      </div>
                      
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {laundry.description || "Layanan laundry profesional dengan kualitas terjamin."}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(laundry.facilities || ["Antar/Jemput", "Setrika Uap"]).slice(0,3).map((fac: string, idx: number) => (
                          <span key={idx} className="text-[10px] font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                            {fac}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100/80">
                      <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-gray-700">{laundry.city} · {laundry.country || "Indonesia"}</span>
                      </div>
                      <span className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors cursor-pointer">
                        Lihat Detail
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white border-2 border-gray-100 border-dashed rounded-3xl p-12 text-center mt-8">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shirt className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ditemukan</h3>
            <p className="text-gray-500 font-medium max-w-sm mx-auto">
              Maaf, belum ada mitra laundry yang tersedia di kota "{city}". Silakan coba cari di kota lain.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
