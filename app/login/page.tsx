"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Loader2, Diamond, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://laundry-app-one-theta.vercel.app";
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Email atau password salah.");
      }

      const token = data.token || (data.data && data.data.token);
      const user = data.user || (data.data && data.data.user);
      
      if (token) {
        localStorage.setItem("userToken", token);
        localStorage.setItem("userData", JSON.stringify(user));
        router.push("/dashboard");
      } else {
        throw new Error("Token tidak ditemukan dari server.");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan pada server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground font-sans selection:bg-gold selection:text-background">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-24 relative z-10 w-full lg:max-w-xl xl:max-w-2xl border-r border-white/5">
        <div className="w-full max-w-md mx-auto">
          {/* Back Home */}
          <Link href="/" className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors text-xs tracking-widest uppercase mb-12">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Kembali ke Beranda
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 text-gold">
            <Diamond className="w-6 h-6 fill-current" />
            <span className="text-xl font-serif tracking-widest text-white">E-LAUNDRY</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-serif text-white mb-2">
            Portal Pribadi
          </h1>
          <p className="text-gray-400 mb-8 font-light text-sm md:text-base">
            Masuk dengan kredensial Anda untuk mengakses layanan manajerial pakaian eksklusif.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-light">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-semibold text-gray-500">Email Akses</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-gold transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-panel border border-border-dark text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors font-light text-sm"
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-widest font-semibold text-gray-500">Kata Sandi</label>
                <Link href="/forgot-password" className="text-xs text-gold hover:text-white transition-colors">
                  Lupa kata sandi?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-gold transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-panel border border-border-dark text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors font-light text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-gold-hover text-background py-4 flex items-center justify-center uppercase tracking-widest text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Otorisasi Masuk"
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-xs text-gray-500 tracking-wide">
            Belum menjadi klien?{" "}
            <Link href="/register" className="text-gold hover:text-white transition-colors uppercase font-bold">
              Daftar Layanan
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image/Gradient banner */}
      <div className="hidden lg:flex flex-1 relative bg-black items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80" 
          alt="Luxury clothes rack"
          className="absolute w-full h-full object-cover opacity-50 grayscale-[30%] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/20"></div>
        
        <div className="relative z-10 max-w-sm text-center">
          <Diamond className="w-10 h-10 text-gold mx-auto mb-6" />
          <h2 className="text-3xl font-serif text-white mb-4">Layanan Pramutamu Privat</h2>
          <div className="w-12 h-[1px] bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 font-light text-sm leading-relaxed">
            Akses ke riwayat layanan, jadwal penjemputan, dan preferensi penanganan pakaian kustom eksklusif khusus untuk akun Anda.
          </p>
        </div>
      </div>
    </div>
  );
}
