"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Search, MapPin, Star, Filter, Loader2, Shirt, Sparkles
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
  const [mounted, setMounted] = useState(false);

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
    setMounted(true);
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
    <div className="min-h-screen bg-background text-foreground font-sans pb-20 relative">
      <div className="glow-orb glow-teal w-[400px] h-[400px] -top-40 right-0 animate-pulse-glow fixed opacity-30"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10" style={{ background: 'rgba(10, 14, 26, 0.8)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 text-foreground/70 hover:text-accent transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <form onSubmit={handleSearch} className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/60">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full !pl-11 !pr-4 !py-2.5 !rounded-xl !text-sm"
                placeholder="Cari kota... (Misal: Yogyakarta)"
                required
              />
            </form>
          </div>
        </div>
      </header>

      <main className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-display font-bold">
            Mitra di <span className="text-accent">&quot;{city}&quot;</span>
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-sm font-medium text-foreground/70 hover:text-accent hover:bg-accent/5 transition-all border border-white/10">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-400 text-sm font-light mb-6 flex items-center gap-3">
            <span>⚠</span> {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 animate-pulse-glow">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
            <p className="text-foreground/60 font-medium">Mencari mitra laundry...</p>
          </div>
        ) : laundries.length > 0 ? (
          <div className="space-y-4">
            {laundries.map((laundry, idx) => (
              <Link href={`/partner/${laundry._id}`} key={laundry._id} className="block group">
                <div className="glass-card !rounded-2xl overflow-hidden flex flex-col sm:flex-row" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <div className="w-full sm:w-52 h-48 sm:h-auto relative flex-shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/partner-laundry.png"
                      alt={`E-Laundry Hub ${laundry.city || ""}`}
                      className="w-full h-full object-cover !rounded-none group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 glass-card !rounded-lg px-2.5 py-1 text-xs font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-accent4 fill-accent4" /> {laundry.rating?.toFixed(1) || "5.0"}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-display font-semibold group-hover:text-accent transition-colors">{`E-Laundry Hub ${laundry.city || ""}`}</h3>
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-lg border border-emerald-400/20">Buka</span>
                      </div>

                      <p className="text-foreground/60 text-sm mb-4 line-clamp-2 leading-relaxed font-light">
                        {laundry.description || "Layanan laundry profesional dengan kualitas terjamin."}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {(laundry.facilities || ["Antar/Jemput", "Setrika Uap"]).slice(0, 3).map((fac: string, fidx: number) => (
                          <span key={fidx} className="text-[10px] font-medium text-foreground/60 bg-white/10 px-2.5 py-1 rounded-lg">
                            {fac}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-1.5 text-foreground/60 text-sm">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span className="font-medium">{laundry.city} · Indonesia</span>
                      </div>
                      <span className="text-sm font-semibold text-accent bg-accent/10 px-4 py-2 rounded-xl group-hover:bg-accent group-hover:text-background transition-colors">
                        Lihat Detail
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="glass-card !rounded-3xl p-12 text-center mt-8 relative overflow-hidden">
            <div className="glow-orb glow-violet w-[200px] h-[200px] top-0 left-1/2 -translate-x-1/2 animate-pulse-glow"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-accent2/10 flex items-center justify-center mx-auto mb-4">
                <Shirt className="w-10 h-10 text-accent2/40" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">Tidak Ditemukan</h3>
              <p className="text-foreground/60 font-light max-w-sm mx-auto">
                Maaf, mitra E-Laundry belum tersedia di kota &quot;{city}&quot;. Coba cari di kota lain.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center animate-pulse-glow">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
