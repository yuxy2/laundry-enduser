"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Phone, Loader2, Diamond, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Kata Sandi dan Konfirmasi tidak cocok.");
      setLoading(false);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://laundry-app-one-theta.vercel.app";
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengaktifkan layanan akun. Silakan coba lagi.");
      }

      const token = data.token || (data.data && data.data.token);
      const user = data.user || (data.data && data.data.user);

      if (token) {
        localStorage.setItem("userToken", token);
        localStorage.setItem("userData", JSON.stringify(user));
        router.push("/dashboard");
      } else {
        router.push("/login?message=registration_success");
      }
      
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan pada server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground font-sans selection:bg-gold selection:text-background border-t border-white/5">
      
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-24 relative z-10 w-full lg:max-w-xl xl:max-w-2xl py-12 overflow-y-auto border-r border-white/5">
        <div className="w-full max-w-md mx-auto my-auto">
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
            Pendaftaran Klien
          </h1>
          <p className="text-gray-400 mb-8 font-light text-sm md:text-base">
            Bergabunglah dalam standar perawatan busana tiada banding. Lengkapi formulir di bawah ini untuk memulai.
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-light">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-semibold text-gray-500">Nama Lengkap</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-gold transition-colors">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-panel border border-border-dark text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors font-light text-sm"
                  placeholder="Budi Santoso"
                />
              </div>
            </div>

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
              <label className="text-xs uppercase tracking-widest font-semibold text-gray-500">Nomor Telepon</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-gold transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-panel border border-border-dark text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors font-light text-sm"
                  placeholder="08123456789"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-semibold text-gray-500">Kata Sandi</label>
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
                  minLength={6}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-semibold text-gray-500">Konfirmasi Kata Sandi</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-gold transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-panel border border-border-dark text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors font-light text-sm"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-gold-hover text-background py-4 flex items-center justify-center uppercase tracking-widest text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Aktifkan Profil Klien"
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-xs text-gray-500 tracking-wide">
            Sudah memiliki portofolio?{" "}
            <Link href="/login" className="text-gold hover:text-white transition-colors uppercase font-bold">
              Portal Otorisasi
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image/Gradient banner */}
      <div className="hidden lg:flex flex-1 relative bg-black items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80" 
          alt="Luxury fashion aesthetic"
          className="absolute w-full h-full object-cover opacity-50 grayscale-[30%] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/20"></div>
        
        <div className="relative z-10 max-w-sm text-center">
          <Diamond className="w-10 h-10 text-gold mx-auto mb-6" />
          <h2 className="text-3xl font-serif text-white mb-4">Privilese Sepenuhnya</h2>
          <div className="w-12 h-[1px] bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 font-light text-sm leading-relaxed">
            Rasakan keleluasaan dalam penanganan armada layanan antar jemput prioritas, penawaran harga ekslusif, dan opsi preferensi cuci kering rahasia.
          </p>
        </div>
      </div>
    </div>
  );
}
