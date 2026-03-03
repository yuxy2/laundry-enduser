"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Loader2, Shirt, ArrowRight } from "lucide-react";

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

      // Save token to localStorage for now (You might want to set cookie via API later)
      const token = data.token || (data.data && data.data.token);
      const user = data.user || (data.data && data.data.user);
      
      console.log("API Response Token:", token); // <-- Add for debugging
      console.log("API Response User:", user);   // <-- Add for debugging
      
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
    <div className="min-h-screen flex text-gray-800 font-sans selection:bg-blue-200">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-24 bg-white relative z-10 w-full lg:max-w-xl xl:max-w-2xl">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Shirt className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
              E-laundry
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight lg:text-4xl">
            Selamat datang kembali!
          </h1>
          <p className="mt-3 text-base text-gray-500 mb-8 font-medium">
            Masuk ke akun Anda untuk melacak cucian atau membuat pesanan baru.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-red-50/80 border border-red-100 text-red-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1 text-sm">
                <label className="font-semibold text-gray-700">Password</label>
                <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Lupa password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-600/25 mt-2 overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:scale-105 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {loading ? "Memproses..." : "Masuk Sekarang"}
                {!loading && <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500 font-medium">
            Belum punya akun?{" "}
            <Link href="/register" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
              Daftar disini
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image/Gradient banner */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-blue-50 to-indigo-100 items-center justify-center p-12 overflow-hidden">
        {/* Soft decorative blur circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10 max-w-lg text-center bg-white/40 backdrop-blur-xl p-10 rounded-[2rem] border border-white/50 shadow-2xl">
          <div className="inline-flex p-4 rounded-2xl bg-white/60 shadow-inner mb-6">
            <Shirt className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Cucian Beres, <br/>Hari Lebih Tenang</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Temukan mitra laundry terbaik di sekitar Anda, nikmati layanan antar jemput, dan pantau proses cucian langsung dari saku Anda.
          </p>
        </div>
      </div>
    </div>
  );
}
