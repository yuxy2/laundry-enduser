"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Phone, Loader2, Sparkles, ArrowLeft, Eye, EyeOff, Shirt } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer"
  });

  useEffect(() => {
    setMounted(true);
  }, []);

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
        throw new Error(data.message || "Gagal mendaftarkan akun. Silakan coba lagi.");
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

  const inputFields = [
    { label: "Nama Lengkap", name: "name", type: "text", icon: User, placeholder: "Budi Santoso" },
    { label: "Email", name: "email", type: "email", icon: Mail, placeholder: "nama@email.com" },
    { label: "Nomor Telepon", name: "phone", type: "tel", icon: Phone, placeholder: "08123456789" },
  ];

  return (
    <div className="min-h-screen flex bg-white text-foreground font-sans relative overflow-hidden">
      
      {/* Left side - Form */}
      <div className={`flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-20 relative z-10 w-full lg:max-w-xl xl:max-w-2xl py-12 overflow-y-auto text-left ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="w-full max-w-md mx-auto my-auto">
          {/* Back */}
          <Link href="/" className="inline-flex items-center gap-2 text-foreground/60 hover:text-accent transition-colors text-xs font-bold uppercase tracking-wider mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white">
              <Shirt className="w-5 h-5" />
            </div>
            <span className="text-xl font-display font-extrabold tracking-tight">
              E-<span className="text-accent">Laundry</span>
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-display font-extrabold mb-3 text-foreground leading-tight">
            Buat Akun <span className="text-accent">Baru</span>
          </h1>
          <p className="text-foreground/60 mb-10 font-semibold text-sm">
            Bergabung untuk menikmati layanan perawatan busana terbaik.
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-4 rounded-2xl border border-red-200 bg-red-50 text-red-700 text-sm font-semibold flex items-start gap-3">
                <span className="text-red-700 mt-0.5">⚠</span>
                {error}
              </div>
            )}

            {inputFields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="text-xs font-bold text-foreground/60 uppercase tracking-wider">{field.label}</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/50 group-focus-within:text-accent transition-colors">
                    <field.icon className="h-5 w-5" />
                  </div>
                  <input
                    type={field.type}
                    name={field.name}
                    required
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    className="w-full !pl-12 !pr-4 !border-peach-border"
                    placeholder={field.placeholder}
                  />
                </div>
              </div>
            ))}

            {/* Password Fields */}
            {["password", "confirmPassword"].map((fieldName) => (
              <div key={fieldName} className="space-y-2">
                <label className="text-xs font-bold text-foreground/60 uppercase tracking-wider">
                  {fieldName === "password" ? "Kata Sandi" : "Konfirmasi Kata Sandi"}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/50 group-focus-within:text-accent transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name={fieldName}
                    required
                    value={(formData as any)[fieldName]}
                    onChange={handleChange}
                    className="w-full !pl-12 !pr-12 !border-peach-border"
                    placeholder="••••••••"
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-foreground/50 hover:text-accent transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary !mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Buat Akun Baru
                </span>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-foreground/60 font-semibold">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-accent hover:text-[#D85530] transition-colors font-bold">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center bg-peach-dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/neat_wash_cta_woman.png"
          alt="Premium garment experience"
          className="absolute w-full h-full object-cover opacity-60 !rounded-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>

        <div className={`relative z-10 max-w-sm text-center ${mounted ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <div className="w-20 h-20 rounded-3xl bg-accent text-white mx-auto mb-8 flex items-center justify-center shadow-md animate-float">
            <Shirt className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-extrabold text-foreground mb-4 leading-tight">
            Akses Eksklusif <span className="text-accent">Penatu Prioritas</span>
          </h2>
          <p className="text-foreground/75 font-semibold text-sm leading-relaxed">
            Nikmati keleluasaan layanan antar jemput prioritas, penawaran harga eksklusif, dan preferensi perawatan kustom.
          </p>
        </div>
      </div>
    </div>
  );
}
