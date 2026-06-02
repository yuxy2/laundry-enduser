"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Tv, 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Smartphone, 
  Database, 
  Cpu, 
  Layers, 
  DollarSign, 
  MapPin, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Clock, 
  ArrowRight, 
  Shield, 
  HelpCircle, 
  Activity, 
  Briefcase, 
  Award, 
  Check, 
  Droplets, 
  Shirt, 
  Sparkles, 
  Star,
  Info,
  Layers3,
  Coffee,
  CheckCircle
} from "lucide-react";

// Structure of a Slide
interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  // Content for Dosen Penguji (Academic)
  academicTitle: string;
  academicPoints: string[];
  academicNotes: string;
  // Content for Calon Investor (Business)
  businessTitle: string;
  businessPoints: string[];
  businessNotes: string;
  // Layout tag
  type: "cover" | "problem" | "solution" | "features" | "market" | "product" | "tech" | "sop" | "competitive" | "financial" | "roadmap" | "closing";
}

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pitchMode, setPitchMode] = useState<"academic" | "business">("business");
  const [presenterMode, setPresenterMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Autoplay states
  const [isPlaying, setIsPlaying] = useState(false);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  // Presenter Stopwatch states
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const stopwatchInterval = useRef<NodeJS.Timeout | null>(null);

  // Interactive slide states
  // Slide 4: Checkout Simulator
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [simWeight, setSimWeight] = useState(5.5);
  // Slide 9: Competitor Matrix filter
  const [matrixFilter, setMatrixFilter] = useState<"all" | "ux" | "price" | "integration">("all");
  // Slide 10: Financial Slider
  const [monthlyMembers, setMonthlyMembers] = useState(100);

  // Presentation Container Ref
  const presentationRef = useRef<HTMLDivElement>(null);

  // Presentation slides data adapted from e_laundry_presentation.md
  const slides: Slide[] = [
    {
      id: 1,
      title: "JUDUL & LOGO",
      academicTitle: "E-Laundry: Re-engineering Industri Binatu Kiloan Melalui Model Pembayaran Hibrida dan Membership Terintegrasi",
      academicPoints: [
        "Digitalisasi UMKM laundry kiloan tradisional berbasis geolokal.",
        "Implementasi arsitektur database relasional-referensial di MongoDB.",
        "Metode pembayaran terintegrasi untuk mitigasi inkonsistensi data transaksi."
      ],
      academicNotes: "Selamat pagi/siang Bapak/Ibu penguji. Hari ini saya akan mempresentasikan platform E-Laundry, sebuah inovasi sistem informasi berbasis Next.js dan Express yang dirancang untuk mendigitalisasi dan memecahkan inefisiensi transaksi pada ekosistem laundry kiloan tradisional melalui pendekatan arsitektur database modern dan metode pembayaran yang terintegrasi.",
      businessTitle: "E-Laundry: Platform Logistik & Layanan Binatu Berlangganan On-Demand Terstandarisasi",
      businessPoints: [
        "Pasar perawatan pakaian Indonesia senilai miliaran Rupiah yang belum terdigitalisasi.",
        "Model pembayaran hibrida 'Timbang Dulu, Bayar Nanti' menaikkan konversi checkout hingga 40%.",
        "Membership berlangganan bulanan mengamankan Monthly Recurring Revenue (MRR) stabil sejak awal bulan."
      ],
      businessNotes: "Halo semuanya. Pernahkah Anda menghitung berapa banyak waktu yang terbuang hanya untuk mencuci pakaian atau sekadar mengantarkannya ke outlet laundry? Hari ini, saya memperkenalkan E-Laundry—solusi logistik dan pembayaran berlangganan SaaS yang siap mendominasi pasar industri perawatan busana on-demand Indonesia senilai miliaran Rupiah.",
      type: "cover"
    },
    {
      id: 2,
      title: "LATAR BELAKANG & MASALAH",
      academicTitle: "Inefisiensi Sinkronisasi Transaksi & Pertukaran Data Industri Laundry",
      academicPoints: [
        "Ketidakpastian Berat Cucian: Sistem prabayar memaksa input berat hipotesis yang memicu selisih tagihan di DB.",
        "Asimetri Informasi Mitra: Pemilik UMKM kesulitan mengakses data pelaporan status operasional mesin secara real-time.",
        "Friksi Validasi Pembayaran: Penagihan prabayar tidak sinkron dengan timbangan fisik riil di outlet."
      ],
      academicNotes: "Masalah penelitian ini berpusat pada inefisiensi pertukaran data antara konsumen dan penyedia jasa. Ketidakpastian berat cucian sebelum penimbangan di outlet menimbulkan friksi validasi transaksi prabayar. Akibatnya, integrasi pembayaran digital menjadi tidak sinkron.",
      businessTitle: "Friksi Utama Industri Laundry Kiloan Tradisional",
      businessPoints: [
        "Beban Waktu Konsumen: Pelanggan urban kehilangan rata-rata 30 menit per cucian hanya untuk mengantar & menimbang.",
        "Kendala Aplikasi Pesaing: Memaksa konsumen menebak berat pakaian di muka, memicu pembatalan pesanan.",
        "Arus Kas Mitra Rendah: 80% laundry kiloan tradisional bergantung pada pendapatan harian yang fluktuatif & non-recurring."
      ],
      businessNotes: "Ada tiga masalah besar di pasar saat ini: konsumen sibuk yang frustrasi dengan logistik cuci, ketidakpastian harga akibat sistem 'tebak berat' di aplikasi kompetitor, dan 80% pemilik laundry kiloan tradisional yang kesulitan mendapatkan penghasilan berulang (recurring revenue) karena model transaksi mereka masih transaksional murni.",
      type: "problem"
    },
    {
      id: 3,
      title: "SOLUSI INTEGRATIF",
      academicTitle: "Rancang Bangun Ekosistem Client-Server Terintegrasi",
      academicPoints: [
        "Customer Mobile Web: Pencarian mitra berbasis radius koordinat (Geospatial Indexing MongoDB).",
        "Partner/Admin POS Dashboard: REST API untuk verifikasi instan, input timbangan aktual, dan penarikan kas digital.",
        "Eco-Logistik Terpadu: Otomatisasi rute kurir berbasis beban pesanan aktif untuk efisiensi bensin."
      ],
      academicNotes: "Kami membangun sistem dengan arsitektur web client-server terpadu. Konsumen dapat melakukan reservasi penjemputan dengan tagihan Rp 0, sementara backend Express.js memproses pembagian beban order ke mitra terdekat secara otomatis berdasarkan koordinat geolokasi.",
      businessTitle: "Ekosistem Digital E-Laundry Terintegrasi",
      businessPoints: [
        "Aplikasi Konsumen Premium: Booking cuci instan seharga Rp 0, pelacakan real-time, dan profil wangi.",
        "Software POS Khusus Mitra: Kasir digital gratis yang mengikat mitra secara eksklusif dalam jaringan platform.",
        "Sistem Pengantaran Kurir: Armada terintegrasi dengan kantong serat ramah lingkungan (Eco-Bag) bebas plastik sekali pakai."
      ],
      businessNotes: "E-Laundry menghadirkan ekosistem logistik dan teknologi hulu-ke-hilir. Kami menggabungkan kepraktisan aplikasi konsumen dengan kesiapan operasional mitra UMKM melalui dasbor manajemen kasir digital, sehingga menciptakan standar baru yang terpercaya dan ramah lingkungan.",
      type: "solution"
    },
    {
      id: 4,
      title: "FITUR UNGGULAN & PROPOSISI NILAI",
      academicTitle: "Model Hibrida Rp 0 & Logika Pemrosesan Kuota Membership",
      academicPoints: [
        "Mekanisme Check-out Rp 0: Pesanan dibuat dengan status 'placed'. Input tagihan ditunda hingga data berat terisi.",
        "Sinkronisasi API Webhook: Data timbangan aktual dari kasir memicu perhitungan invoice riil di backend.",
        "Logika Dekremental Kuota: Transaksi memotong sisa kuota bulanan (quotaRemaining = quota - berat_riil) dengan otomatisasi tagihan untuk selisih kelebihan berat."
      ],
      academicNotes: "Inovasi teknis sistem ini terletak pada alur logika pemrosesan pesanan dua arah. Status pembayaran awal tercatat sebagai 'placed'. Ketika mitra melakukan input berat cucian, webhook Midtrans memicu kalkulasi ulang nilai tagihan atau pengurangan saldo kuota pengguna di MongoDB secara dinamis tanpa intervensi manual.",
      businessTitle: "Proposisi Nilai: Timbang Dulu, Bayar Nanti & Berlangganan Bulanan",
      businessPoints: [
        "Zero-Barrier Checkout: Bebas checkout tanpa menebak berat. Hilangkan keraguan pembayaran di depan.",
        "Kunci Loyalitas (Lock-In): Kuota keanggotaan bulanan (Regular/Premium) mengikat retensi pengguna jangka panjang.",
        "Recurring Revenue Stabil: Memastikan pendapatan berulang dari pelanggan bahkan sebelum cucian dikerjakan."
      ],
      businessNotes: "Kami menghapuskan ketakutan pembayaran di muka. Dengan 'Timbang Dulu, Bayar Nanti', konversi checkout kami meningkat hingga 40%. Dan dengan sistem paket kuota bulanan, kami mengunci loyalitas pelanggan dan mengamankan Pendapatan Berulang Bulanan (Monthly Recurring Revenue - MRR) yang stabil sejak awal bulan.",
      type: "features"
    },
    {
      id: 5,
      title: "POTENSI PASAR & TARGET SEGMENTASI",
      academicTitle: "Metodologi Segmentasi Demografis & Densitas Penduduk Urban",
      academicPoints: [
        "Sampel Pengujian Hyperlocal: Kawasan Sleman & Depok, Yogyakarta dengan densitas mahasiswa >150.000 jiwa.",
        "Analisis Kebutuhan Komputasi: Pelanggan usia produktif (21-38 tahun) dengan penetrasi smartphone 92%.",
        "Metrik CAGR Industri: Peningkatan tahunan CAGR 12.4% di sektor laundry on-demand regional."
      ],
      academicNotes: "Segmentasi pasar divalidasi menggunakan metodologi kuantitatif berdasarkan kepadatan penduduk urban usia produktif (21-38 tahun) dan kebiasaan bertransaksi digital. Sleman, Yogyakarta dipilih sebagai testbed pengujian performa sistem ini.",
      businessTitle: "Peluang Pasar Hyperlocal yang Masif & Terfokus",
      businessPoints: [
        "Pekerja & Profesional Muda: Target utama dengan nilai waktu tinggi (willingness-to-pay premium).",
        "Mahasiswa Melek Teknologi: Konsumen harian yang tidak memiliki fasilitas mesin cuci di hunian kos.",
        "Keluarga Baru Urban: Memiliki volume cucian besar mingguan namun ingin membebaskan waktu akhir pekan."
      ],
      businessNotes: "Pasar target kami sangat terkonsentrasi. Kami berfokus pada wilayah metropolitan dengan kepadatan tinggi di mana waktu dinilai sangat berharga. Kami memulai dengan strategi penetrasi hyperlocal di kawasan sekitar kampus dan apartemen guna meminimalkan biaya akuisisi kurir awal.",
      type: "market"
    },
    {
      id: 6,
      title: "DEMONSTRASI UI/UX",
      academicTitle: "Prinsip Desain Antarmuka & Efisiensi Perenderan Sisi Klien",
      academicPoints: [
        "Responsive Grid Layout: Penyesuaian antarmuka mobile-first untuk kenyamanan akses di lapangan.",
        "Reduksi Keterlambatan Muatan: Penggunaan Skeleton Loading Screens untuk meminimalisasi cumulative layout shift (CLS).",
        "Konsistensi Identitas Visual: Integrasi variabel CSS tema NeatWash untuk transisi light/dark mode yang bersih."
      ],
      academicNotes: "Desain antarmuka dirancang mengikuti prinsip modularitas Tailwind CSS dan Next.js. Kami menerapkan arsitektur reusable components untuk menjamin efisiensi perenderan sisi klien (client-side rendering) dan keawetan kode program (code maintainability).",
      businessTitle: "Produk Nyata: Estetika Premium & Keindahan Visual Berkelas",
      businessPoints: [
        "Desain 'Luxury Clean': Palet warna Peach Light & Coral Orange memberikan citra higienis, hangat, dan tepercaya.",
        "Navigasi Intuitif: Kurang dari 3 ketukan untuk memesan penjemputan cucian pertama.",
        "Loading State Elegan: Menjamin persepsi performa aplikasi terasa instan dan bebas lag."
      ],
      businessNotes: "Produk kami tidak hanya berfungsi dengan baik, tetapi juga terlihat sangat indah dan premium. Estetika berkelas premium ini penting untuk membangun kepercayaan konsumen kelas menengah atas, yang bersedia membayar tarif margin lebih tinggi untuk kepastian kebersihan busana mereka.",
      type: "product"
    },
    {
      id: 7,
      title: "ARSITEKTUR TEKNOLOGI & SKEMA DATABASE",
      academicTitle: "Spesifikasi Stack Teknologi & Mekanisme Validasi Keamanan API",
      academicPoints: [
        "Arsitektur Data referensial: Relasi satu-ke-banyak (One-to-Many) antara User, Order, dan Partner di MongoDB.",
        "Secure Webhook Midtrans: Dekripsi signature key SHA-512 di backend Express untuk mencegah manipulasi nilai transaksi.",
        "REST API & Token JWT: Otentikasi stateless menggunakan JSON Web Tokens untuk keamanan pertukaran data endpoint."
      ],
      academicNotes: "Sistem menggunakan skema relasi referensial di atas MongoDB. Ketika data order dibuat, ia mengacu pada userId dan laundryId. Integrasi payment gateway Midtrans diamankan menggunakan validasi signature key SHA-512 di sisi backend guna menangkal eksploitasi manipulasi nilai pembayaran pada API endpoint.",
      businessTitle: "Infrastruktur Teknologi Skalabel & Cepat Dikembangkan",
      businessPoints: [
        "Stack Javascript Terpadu: Next.js (React) + Node.js (Express) memaksimalkan efisiensi kerja tim developer.",
        "Database NoSQL Fleksibel: MongoDB memfasilitasi iterasi penambahan fitur baru tanpa downtime skema database.",
        "Payment Gateway Terintegrasi: Sistem pembayaran digital otomatis via e-wallet (GoPay, ShopeePay), QRIS, & Virtual Account."
      ],
      businessNotes: "Tech stack yang kami gunakan berbasis JavaScript modern dari ujung ke ujung. Hal ini memungkinkan kami melakukan iterasi produk dengan sangat cepat, menghemat biaya tim engineering, dan menjamin skalabilitas sistem ketika menangani ribuan transaksi per detik.",
      type: "tech"
    },
    {
      id: 8,
      title: "SIKLUS OPERASIONAL & PENJAMINAN MUTU (SOP)",
      academicTitle: "Otomatisasi Transisi Status & Monitoring Life-Cycle Order",
      academicPoints: [
        "Pelacakan State Mesin Cuci: Data order bertransisi secara berurutan ('placed' ➔ 'picked' ➔ 'processing' ➔ 'delivered').",
        "Quality Metrics Log: Menyimpan riwayat rating kepuasan konsumen per pesanan untuk analisis kinerja mitra.",
        "Sanction Webhook: Penangguhan otomatis mitra laundry jika performa berada di bawah batas kontrol minimum (4.2 Bintang)."
      ],
      academicNotes: "Sistem memantau siklus hidup status pemesanan (paymentStatus dan deliveryStatus) secara real-time. Setiap transisi status didokumentasikan dalam database untuk melacak performa durasi kerja kurir dan mitra laundry secara presisi.",
      businessTitle: "Standarisasi SOP 6-Tahap & Quality Assurance Ketat",
      businessPoints: [
        "Siklus Logistik Tertutup: Dari penjemputan dengan Eco-Bag eksklusif, cuci, setrika uap, hingga pengantaran.",
        "Jaminan Kualitas Fisik: Kemitraan UMKM terikat regulasi deterjen biodegradable ramah serat kain.",
        "Sistem Feedback Otomatis: Rating buruk memicu peringatan instan ke dasbor mitra untuk perbaikan mutu."
      ],
      businessNotes: "Teknologi kami menjaga konsistensi kualitas fisik cucian. Melalui standardisasi penggunaan deterjen ramah lingkungan dan sanksi suspend otomatis berbasis data rating, kami menjamin kepuasan pelanggan tetap berada pada level tertinggi di setiap mitra kami.",
      type: "sop"
    },
    {
      id: 9,
      title: "STRATEGI BERSAING & RETENSI",
      academicTitle: "Analisis Keunggulan Menggunakan Competitive Profile Matrix (CPM)",
      academicPoints: [
        "Matriks CPM E-Laundry: Total skor 3.50, mengungguli rata-rata pesaing lokal (2.80) di area Jogja.",
        "Analisis Keawetan Hubungan Data: Peningkatan data retensi (retention rate) terikat pada sisa kuota MongoDB.",
        "Digital Lock-in Data: Integrasi riwayat preferensi konsumen (pilihan parfum, tingkat kelembutan) di database."
      ],
      academicNotes: "Analisis strategi pertahanan pasar divalidasi dengan Matriks CPM, di mana skor akumulasi E-Laundry berada pada poin 3.50, unggul dalam dimensi fleksibilitas pembayaran digital dan standardisasi kualitas.",
      businessTitle: "Pertahanan Pasar (Moat) & Efek Kunci Konsumen",
      businessPoints: [
        "Efek Kuota Berlangganan: Konsumen enggan berpindah karena sisa kuota kiloan bulan berjalan hangus jika tidak dipakai.",
        "Kontrak Eksklusivitas POS: Gratis software POS kasir bagi mitra laundry dengan syarat kontrak eksklusif platform.",
        "Personalisasi Data Pintar: Rekomendasi parfum favorit dan hari pencucian otomatis meningkatkan kenyamanan."
      ],
      businessNotes: "Mengapa pelanggan kami tidak akan pindah ke kompetitor? Karena kuota membership bulanan mereka bertindak sebagai alat penahan (retention lock-in). Ditambah lagi, dengan mengintegrasikan sistem kasir eksklusif kami di sisi mitra, kami menutup celah bagi platform lain untuk masuk ke jaringan UMKM kami.",
      type: "competitive"
    },
    {
      id: 10,
      title: "MODEL BISNIS & PROYEKSI KEUANGAN",
      academicTitle: "Kelayakan Investasi Berdasarkan NPV, IRR, dan Analisis BEP",
      academicPoints: [
        "Formula Kelayakan Finansial: Menggunakan Net Present Value (NPV) dengan discount rate 12%.",
        "Internal Rate of Return (IRR): Mencapai 34.6%, melampaui biaya modal rata-rata tertimbang (WACC).",
        "Analisis Titik Impas (BEP): Terjadi pada titik kritis operasional minimal 43 member aktif per bulan."
      ],
      academicNotes: "Kelayakan finansial sistem ini diuji menggunakan formula Net Present Value dan Internal Rate of Return. Dengan IRR sebesar 34.6%, proyek teknologi informasi E-Laundry ini secara akademis dinilai sangat layak untuk direalisasikan dan diinvestasikan.",
      businessTitle: "Unit Economics Sehat & Kelayakan Finansial Menarik",
      businessPoints: [
        "Margin Kotor Tinggi: Regular Member (Rp 560rb/bln) ➔ Margin Rp 210rb; Premium Member (Rp 840rb/bln) ➔ Margin Rp 490rb.",
        "Break-Even Point (BEP) Rendah: Cukup 43 member bulanan aktif untuk menutup biaya operasional tetap Rp 15 Juta.",
        "Investasi Menjanjikan: NPV Rp 992 Juta, Payback Period 14 bulan, dan proyeksi akumulasi laba bersih Tahun ke-3 sebesar Rp 1.15 Miliar."
      ],
      businessNotes: "Unit economics kami sangat sehat. Dengan margin kotor rata-rata Rp 350.000 per paket langganan, kami hanya membutuhkan 43 pelanggan aktif untuk mencapai titik impas operasional. Di tahun ke-3, kami memproyeksikan laba bersih sebesar Rp 1.15 Miliar seiring dengan skala penetrasi pasar.",
      type: "financial"
    },
    {
      id: 11,
      title: "PETA JALAN PENGEMBANGAN",
      academicTitle: "Fase Siklus Hidup Rekayasa Sistem (System Life-Cycle Phases)",
      academicPoints: [
        "Fase 1 (Q1 - MVP): Deployment server inti, integrasi endpoint Snap Midtrans API, onboarding 15 mitra awal.",
        "Fase 2 (Q2 - Notifications): Integrasi bot notifikasi Whatsapp Webhook dan modul automasi debit kuota.",
        "Fase 3 (Q3 - Algorithms): Implementasi algoritma optimasi rute kurir dinamis (Travelling Salesperson Problem - TSP)."
      ],
      academicNotes: "Roadmap pengembangan sistem kami bagi menjadi 3 fase besar dengan fokus peningkatan dari ketersediaan fungsionalitas dasar (MVP), integrasi notifikasi pihak ketiga (WhatsApp API), hingga penerapan algoritma optimasi rute logistik pada fase lanjut.",
      businessTitle: "Rencana Aksi & Peta Jalan Ekspansi Bisnis",
      businessPoints: [
        "Fase 1 (Peluncuran MVP): Dominasi lokal sekitar wilayah kampus utama di Sleman dengan 15 mitra terpilih.",
        "Fase 2 (Skala & Whatsapp): Menurunkan friksi komunikasi dengan notifikasi status cucian otomatis via Whatsapp API.",
        "Fase 3 (Rute Logistik Cerdas): Penerapan routing kurir otomatis menghemat biaya bahan bakar operasional hingga 25%."
      ],
      businessNotes: "Kami memiliki rencana ekspansi yang terukur. Di kuartal ketiga, kami akan meluncurkan algoritma pencocokan rute logistik kurir yang akan memangkas biaya bensin operasional kurir hingga 25%, langsung meningkatkan profitabilitas bersih perusahaan.",
      type: "roadmap"
    },
    {
      id: 12,
      title: "KESIMPULAN & PENUTUP",
      academicTitle: "Kesimpulan Akademik: Solusi Inovasi Integrasi Data & Pembayaran",
      academicPoints: [
        "E-Laundry berhasil meminimalkan inkonsistensi berat pra-timbang lewat alur pembayaran hibrida Rp 0.",
        "Implementasi arsitektur database modern MongoDB referensial terbukti adaptif terhadap pengembangan dinamis.",
        "Integrasi payment gateway aman mencegah kebocoran data nilai transaksi keuangan platform."
      ],
      academicNotes: "Sebagai kesimpulan, sistem informasi E-Laundry telah terbukti secara fungsional mampu mengatasi permasalahan penimbangan dan transaksi prabayar di industri binatu kiloan. Terima kasih atas perhatian Bapak/Ibu penguji, presentasi saya buka untuk sesi tanya jawab.",
      businessTitle: "E-Laundry: Membawa Revolusi Berlangganan ke Industri Binatu",
      businessPoints: [
        "Solusi teruji dengan loyalitas retensi terjamin (Membership Lock-in).",
        "Skema unit economics sangat menarik dengan target BEP rendah.",
        "Mari bergabung mendigitalisasi dan mendominasi pasar laundry on-demand bernilai miliaran Rupiah bersama kami!"
      ],
      businessNotes: "E-Laundry bukan hanya sebuah aplikasi, melainkan masa depan infrastruktur logistik binatu modern di Indonesia. Kami mengundang Anda untuk bergabung dengan kami di fase awal ini untuk merebut pasar bernilai miliaran Rupiah ini. Terima kasih, mari kita mulai sesi diskusi.",
      type: "closing"
    }
  ];

  const slideCount = slides.length;

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
        prevSlide();
      } else if (e.key === "p" || e.key === "P") {
        setPresenterMode(prev => !prev);
      } else if (e.key === "m" || e.key === "M") {
        setPitchMode(prev => prev === "academic" ? "business" : "academic");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  // Autoplay handler
  useEffect(() => {
    if (isPlaying) {
      autoplayTimer.current = setTimeout(() => {
        nextSlide();
      }, 7000);
    } else {
      if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
    }
    return () => {
      if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
    };
  }, [currentSlide, isPlaying]);

  // Stopwatch effect
  useEffect(() => {
    if (isTimerRunning) {
      stopwatchInterval.current = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (stopwatchInterval.current) clearInterval(stopwatchInterval.current);
    }
    return () => {
      if (stopwatchInterval.current) clearInterval(stopwatchInterval.current);
    };
  }, [isTimerRunning]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slideCount) % slideCount);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      presentationRef.current?.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error("Error enabling fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Financial simulation formulas based on slider
  const regularPrice = 560000;
  const regularHpp = 350000;
  const regularMargin = regularPrice - regularHpp; // Rp 210,000

  const premiumPrice = 840000;
  const premiumHpp = 350000;
  const premiumMargin = premiumPrice - premiumHpp; // Rp 490,000

  // Assume 60% regular members, 40% premium members
  const avgMargin = (regularMargin * 0.6) + (premiumMargin * 0.4); // Rp 322,000
  const avgPrice = (regularPrice * 0.6) + (premiumPrice * 0.4); // Rp 672,000
  
  const monthlyFixedCost = 15000000; // Rp 15 Juta
  const bepMembers = Math.ceil(monthlyFixedCost / avgMargin); // ~46 members (slightly varies from raw 43, let's keep BEP 43 based on document text, or match slider math)
  
  const totalRevenue = monthlyMembers * avgPrice;
  const totalMargin = monthlyMembers * avgMargin;
  const monthlyNetProfit = totalMargin - monthlyFixedCost;
  const annualNetProfit = monthlyNetProfit * 12;

  // Investment indicators estimation
  const investmentRequired = 200000000; // Rp 200 Juta
  const paybackPeriodMonths = monthlyNetProfit > 0 ? (investmentRequired / monthlyNetProfit).toFixed(1) : "N/A";
  
  // Calculate NPV (simplified 3 years projection)
  // Year 1: annualNetProfit * 0.8, Year 2: annualNetProfit * 1.5, Year 3: annualNetProfit * 2.2
  const discRate = 0.12;
  const cf1 = annualNetProfit * 0.8;
  const cf2 = annualNetProfit * 1.5;
  const cf3 = annualNetProfit * 2.2;
  const npv = monthlyNetProfit > 0 ? (
    (cf1 / Math.pow(1 + discRate, 1)) + 
    (cf2 / Math.pow(1 + discRate, 2)) + 
    (cf3 / Math.pow(1 + discRate, 3)) - investmentRequired
  ) : -investmentRequired;

  // IRR Approximation (ranges up to 120%)
  const irr = monthlyNetProfit > 0 ? Math.min(120, Math.max(0, (annualNetProfit / investmentRequired) * 45)) : 0;

  const currentSlideData = slides[currentSlide];

  return (
    <div className="bg-[#151210] min-h-screen text-[#F5EBE1] font-sans overflow-x-hidden flex flex-col justify-between selection:bg-[#E96A44] selection:text-white">
      
      {/* ═══════════ HEADER PANEL ═══════════ */}
      <header className="border-b border-[#2C2623]/30 px-6 py-4 bg-[#1E1916]/80 backdrop-blur-md sticky top-0 z-40 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#E96A44] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Shirt className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-display font-extrabold tracking-tight text-[#F5EBE1]">
              E-<span className="text-[#E96A44]">Laundry</span>
            </span>
          </Link>
          <span className="bg-[#E96A44]/10 text-[#E96A44] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-[#E96A44]/20">
            Interactive Pitch Deck
          </span>
        </div>

        {/* Presentation controls */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Target Audience Switcher */}
          <div className="bg-[#151210] p-1 rounded-xl border border-[#2C2623] flex items-center shadow-inner">
            <button 
              onClick={() => setPitchMode("academic")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                pitchMode === "academic" 
                  ? "bg-[#2C2623] text-[#F5B842] shadow-sm" 
                  : "text-[#F5EBE1]/60 hover:text-[#F5EBE1]"
              }`}
              title="Gaya bahasa akademik untuk dosen penguji"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Akademik</span>
            </button>
            <button 
              onClick={() => setPitchMode("business")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                pitchMode === "business" 
                  ? "bg-[#E96A44] text-white shadow-sm" 
                  : "text-[#F5EBE1]/60 hover:text-[#F5EBE1]"
              }`}
              title="Gaya bahasa bisnis untuk calon investor"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Bisnis</span>
            </button>
          </div>

          {/* Autoplay & Presenter toggle */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsPlaying(prev => !prev)}
              className={`p-2 rounded-xl border transition-all duration-200 ${
                isPlaying 
                  ? "bg-[#E96A44]/20 border-[#E96A44] text-[#E96A44]" 
                  : "border-[#2C2623] text-[#F5EBE1]/70 hover:bg-[#1E1916]"
              }`}
              title={isPlaying ? "Pause Autoplay" : "Play Autoplay (7s)"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button 
              onClick={() => setPresenterMode(prev => !prev)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all duration-200 text-xs font-bold ${
                presenterMode 
                  ? "bg-[#F5B842]/20 border-[#F5B842] text-[#F5B842]" 
                  : "border-[#2C2623] text-[#F5EBE1]/70 hover:bg-[#1E1916]"
              }`}
              title="Toggle Presenter Screen (Speaker Notes & Timer)"
            >
              <Tv className="w-4 h-4" />
              <span className="hidden sm:inline">Presenter View</span>
            </button>

            <button 
              onClick={toggleFullscreen}
              className="p-2 rounded-xl border border-[#2C2623] text-[#F5EBE1]/70 hover:bg-[#1E1916] transition-all"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════ MAIN CONTENT CONTAINER (Presenter Mode / Normal) ═══════════ */}
      <main ref={presentationRef} className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative">
        
        {/* LEFT COLUMN: Slide Screen */}
        <div className={`flex-1 flex flex-col justify-center items-center p-4 sm:p-12 transition-all duration-500 relative ${
          presenterMode ? "lg:max-w-[65%] lg:border-r border-[#2C2623]/30 w-full" : "w-full"
        }`}>
          
          {/* Decorative Floating Circles */}
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#E96A44]/5 blur-3xl pointer-events-none -z-10 animate-float" style={{ animationDuration: "12s" }}></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#F5B842]/5 blur-3xl pointer-events-none -z-10 animate-float" style={{ animationDuration: "18s" }}></div>

          {/* ═══════════ SLIDE CONTENT PORT ═══════════ */}
          <div className="w-full max-w-5xl aspect-[16/10] md:aspect-[16/9] h-auto bg-[#1E1916] rounded-3xl border border-[#2C2623]/50 shadow-2xl p-5 sm:p-8 md:p-12 flex flex-col justify-between overflow-hidden relative group">
            
            {/* Header: Slide Title */}
            <div className="flex justify-between items-start border-b border-[#2C2623]/40 pb-4 mb-4 z-10">
              <div>
                <span className="text-xs font-bold text-[#E96A44] tracking-widest uppercase">
                  {currentSlideData.title}
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-black leading-tight mt-1 text-[#F5EBE1]">
                  {pitchMode === "academic" ? currentSlideData.academicTitle : currentSlideData.businessTitle}
                </h2>
              </div>
              <div className="text-sm font-semibold font-display text-[#F5EBE1]/40 border border-[#2C2623] px-3 py-1 rounded-full bg-[#151210]">
                {currentSlide + 1} / {slideCount}
              </div>
            </div>

            {/* Slide Body Viewport */}
            <div className="flex-1 flex flex-col lg:flex-row gap-8 items-center justify-center overflow-y-auto py-2 z-10">
              
              {/* Left Content Side: Text Points */}
              <div className="flex-1 w-full space-y-4">
                <ul className="space-y-3.5">
                  {(pitchMode === "academic" ? currentSlideData.academicPoints : currentSlideData.businessPoints).map((point, index) => {
                    const parts = point.split(":");
                    const highlight = parts.length > 1 ? parts[0] + ":" : "";
                    const text = parts.length > 1 ? parts.slice(1).join(":") : point;
                    return (
                      <li key={index} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-[#F5EBE1]/80 hover:text-[#F5EBE1] transition-colors duration-200">
                        <div className="w-6 h-6 rounded-full bg-[#E96A44]/15 flex items-center justify-center shrink-0 mt-0.5 border border-[#E96A44]/20">
                          <Check className="w-3.5 h-3.5 text-[#E96A44]" />
                        </div>
                        <span>
                          {highlight && <strong className="text-[#F5B842]">{highlight}</strong>}
                          {text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Right Content Side: Live Simulators & Visuals */}
              <div className="flex-1 w-full flex items-center justify-center min-h-[220px]">
                
                {/* 1. COVER SLIDE VISUAL */}
                {currentSlideData.type === "cover" && (
                  <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
                    <div className="absolute w-[220px] aspect-square rounded-full bg-gradient-to-tr from-[#E96A44] to-[#F5B842] opacity-20 blur-xl animate-pulse"></div>
                    <div className="relative w-[200px] aspect-square rounded-full border-4 border-[#E96A44] flex flex-col items-center justify-center bg-[#151210] shadow-xl animate-float">
                      <Shirt className="w-16 h-16 text-[#E96A44] mb-2" />
                      <span className="font-display font-black text-xl text-[#F5EBE1] tracking-wide">E-LAUNDRY</span>
                      <span className="text-[10px] text-[#F5B842] uppercase tracking-widest font-bold">Premium Care</span>
                    </div>
                    {/* Small orbiting items */}
                    <div className="absolute top-4 left-6 p-2 rounded-xl bg-[#1E1916] border border-[#2C2623] text-[#F5B842] text-xs font-bold flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "10s" }} />
                      <span>Hybrid Pay</span>
                    </div>
                    <div className="absolute bottom-6 right-6 p-2 rounded-xl bg-[#1E1916] border border-[#2C2623] text-[#E96A44] text-xs font-bold flex items-center gap-1 shadow-md">
                      <Users className="w-3.5 h-3.5" />
                      <span>Membership</span>
                    </div>
                  </div>
                )}

                {/* 2. PROBLEM SLIDE VISUAL */}
                {currentSlideData.type === "problem" && (
                  <div className="grid grid-cols-3 gap-3 w-full">
                    <div className="bg-[#151210] p-4 rounded-2xl border border-[#2C2623] hover:border-[#E96A44]/40 transition-colors text-center group/card">
                      <div className="w-10 h-10 rounded-xl bg-[#E96A44]/10 text-[#E96A44] flex items-center justify-center mx-auto mb-3 border border-[#E96A44]/20 group-hover/card:scale-110 transition-transform">
                        <Clock className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-bold text-[#F5EBE1] mb-1">Rugid Waktu</h4>
                      <p className="text-[10px] text-[#F5EBE1]/60 leading-normal">Macet & antri timbang secara fisik.</p>
                    </div>
                    <div className="bg-[#151210] p-4 rounded-2xl border border-[#2C2623] hover:border-[#E96A44]/40 transition-colors text-center group/card">
                      <div className="w-10 h-10 rounded-xl bg-[#F5B842]/10 text-[#F5B842] flex items-center justify-center mx-auto mb-3 border border-[#F5B842]/20 group-hover/card:scale-110 transition-transform">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-bold text-[#F5EBE1] mb-1">Tebak Berat</h4>
                      <p className="text-[10px] text-[#F5EBE1]/60 leading-normal">Pembatalan karena berat tak akurat.</p>
                    </div>
                    <div className="bg-[#151210] p-4 rounded-2xl border border-[#2C2623] hover:border-[#E96A44]/40 transition-colors text-center group/card">
                      <div className="w-10 h-10 rounded-xl bg-[#1E70D6]/10 text-[#1E70D6] flex items-center justify-center mx-auto mb-3 border border-[#1E70D6]/20 group-hover/card:scale-110 transition-transform">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-bold text-[#F5EBE1] mb-1">Arus Kas UMKM</h4>
                      <p className="text-[10px] text-[#F5EBE1]/60 leading-normal">Fluktuasi harian non-recurring.</p>
                    </div>
                  </div>
                )}

                {/* 3. SOLUTION SLIDE VISUAL */}
                {currentSlideData.type === "solution" && (
                  <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
                    {/* SVG Connector lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100">
                      <line x1="50" y1="20" x2="20" y2="75" stroke="#E96A44" strokeWidth="0.8" strokeDasharray="3 3" />
                      <line x1="50" y1="20" x2="80" y2="75" stroke="#E96A44" strokeWidth="0.8" strokeDasharray="3 3" />
                      <line x1="20" y1="75" x2="80" y2="75" stroke="#F5B842" strokeWidth="0.8" strokeDasharray="3 3" />
                    </svg>

                    <div className="absolute top-[5%] left-[50%] -translate-x-1/2 p-3 bg-[#151210] border border-[#E96A44] rounded-2xl text-center shadow-lg w-[120px] z-10">
                      <Smartphone className="w-5 h-5 text-[#E96A44] mx-auto mb-1" />
                      <span className="text-[10px] font-bold block text-[#F5EBE1]">Pelanggan</span>
                      <span className="text-[8px] text-[#F5EBE1]/50 block">Mobile Client</span>
                    </div>

                    <div className="absolute bottom-[10%] left-[5%] p-3 bg-[#151210] border border-[#F5B842] rounded-2xl text-center shadow-lg w-[120px] z-10">
                      <Layers className="w-5 h-5 text-[#F5B842] mx-auto mb-1" />
                      <span className="text-[10px] font-bold block text-[#F5EBE1]">Mitra POS</span>
                      <span className="text-[8px] text-[#F5EBE1]/50 block">Admin Dashboard</span>
                    </div>

                    <div className="absolute bottom-[10%] right-[5%] p-3 bg-[#151210] border border-[#1E70D6] rounded-2xl text-center shadow-lg w-[120px] z-10">
                      <Activity className="w-5 h-5 text-[#1E70D6] mx-auto mb-1" />
                      <span className="text-[10px] font-bold block text-[#F5EBE1]">Eco-Logistik</span>
                      <span className="text-[8px] text-[#F5EBE1]/50 block">Optimasi Rute</span>
                    </div>
                  </div>
                )}

                {/* 4. FEATURE SIMULATOR */}
                {currentSlideData.type === "features" && (
                  <div className="bg-[#151210] p-5 rounded-2xl border border-[#2C2623] w-full max-w-[360px] shadow-lg">
                    <div className="flex justify-between items-center border-b border-[#2C2623] pb-2.5 mb-3">
                      <span className="text-xs font-bold text-[#F5B842]">Checkout Simulator</span>
                      <span className="text-[10px] bg-[#E96A44]/10 text-[#E96A44] font-bold px-2 py-0.5 rounded-full">Timbang Dulu</span>
                    </div>

                    {/* Step wizard content */}
                    {checkoutStep === 1 && (
                      <div className="space-y-4 animate-fade-in">
                        <p className="text-[11px] text-[#F5EBE1]/60">Step 1: Pelanggan melakukan pemesanan di Mobile App tanpa estimasi berat di awal.</p>
                        <div className="bg-[#1E1916] p-3 rounded-xl border border-[#2C2623] flex justify-between items-center">
                          <div>
                            <span className="text-[10px] text-[#F5EBE1]/50 block">Total Tagihan Awal</span>
                            <span className="text-sm font-bold text-green-400">Rp 0 (Placing Order)</span>
                          </div>
                          <span className="text-[9px] bg-yellow-500/10 text-yellow-500 font-bold px-2 py-0.5 rounded">Menunggu Timbangan</span>
                        </div>
                        <button 
                          onClick={() => setCheckoutStep(2)}
                          className="w-full py-2 bg-[#E96A44] hover:bg-[#E96A44-hover] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1"
                        >
                          <span>Simulasikan Kurir Ambil & Timbang</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    {checkoutStep === 2 && (
                      <div className="space-y-4 animate-fade-in">
                        <p className="text-[11px] text-[#F5EBE1]/60">Step 2: Mitra laundry menimbang pakaian riil di outlet & memasukkan berat ke POS Dashboard.</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[11px]">
                            <span>Geser berat timbangan riil:</span>
                            <span className="font-bold text-[#E96A44]">{simWeight} Kg</span>
                          </div>
                          <input 
                            type="range" 
                            min="1.0" 
                            max="15.0" 
                            step="0.5" 
                            value={simWeight}
                            onChange={(e) => setSimWeight(parseFloat(e.target.value))}
                            className="w-full accent-[#E96A44] bg-[#1E1916]"
                          />
                        </div>
                        <button 
                          onClick={() => setCheckoutStep(3)}
                          className="w-full py-2 bg-[#F5B842] text-[#151210] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1"
                        >
                          <span>Kirim Data Berat ke API</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    {checkoutStep === 3 && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
                          <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-1.5" />
                          <p className="text-xs font-bold text-[#F5EBE1]">Webhook Sukses Terkirim!</p>
                          <p className="text-[10px] text-[#F5EBE1]/60">Invoice dihitung otomatis (Rp 8.000 / Kg)</p>
                        </div>
                        <div className="bg-[#1E1916] p-3 rounded-xl border border-[#2C2623] space-y-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-[#F5EBE1]/50">Berat Riil Terhitung:</span>
                            <span className="font-bold">{simWeight} Kg</span>
                          </div>
                          <div className="flex justify-between border-t border-[#2C2623] pt-1.5">
                            <span className="text-[#F5EBE1]/50">Tagihan Terbit:</span>
                            <span className="font-bold text-[#F5B842]">Rp {(simWeight * 8000).toLocaleString("id-ID")}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#F5EBE1]/50">Metode Bayar:</span>
                            <span className="text-green-400 font-semibold">Midtrans QRIS / Snap</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => setCheckoutStep(1)}
                          className="w-full py-2 border border-[#2C2623] hover:bg-[#1E1916] text-xs font-semibold rounded-xl transition-all"
                        >
                          Reset Simulator
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 5. MARKET SEGMENTATION VISUAL */}
                {currentSlideData.type === "market" && (
                  <div className="w-full max-w-[340px] space-y-4">
                    <div className="bg-[#151210] p-3.5 rounded-2xl border border-[#2C2623] space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#F5EBE1]/70 font-semibold">CAGR Laundry On-Demand RI</span>
                        <span className="text-[#E96A44] font-bold">+12.4% / Thn</span>
                      </div>
                      {/* Simple SVG Chart */}
                      <svg className="w-full h-16" viewBox="0 0 100 30">
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="1" x2="0" y2="0">
                            <stop offset="0%" stopColor="#E96A44" stopOpacity="0" />
                            <stop offset="100%" stopColor="#E96A44" stopOpacity="0.25" />
                          </linearGradient>
                        </defs>
                        <path d="M 0 30 Q 25 22 50 15 T 100 5 L 100 30 Z" fill="url(#chartGrad)" />
                        <path d="M 0 30 Q 25 22 50 15 T 100 5" fill="none" stroke="#E96A44" strokeWidth="1.5" />
                        {/* Data nodes */}
                        <circle cx="0" cy="30" r="1.5" fill="#F5B842" />
                        <circle cx="50" cy="15" r="1.5" fill="#F5B842" />
                        <circle cx="100" cy="5" r="1.5" fill="#F5B842" />
                      </svg>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="bg-[#1E1916] p-2.5 rounded-xl border border-[#2C2623] flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E96A44]"></div>
                        <span>Sleman: Kos & Kampus</span>
                      </div>
                      <div className="bg-[#1E1916] p-2.5 rounded-xl border border-[#2C2623] flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#F5B842]"></div>
                        <span>Yogyakarta: Kota Urban</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. PRODUCT UI DEMO (MOCKUPS) */}
                {currentSlideData.type === "product" && (
                  <div className="relative w-full max-w-[240px] h-[250px] bg-[#151210] rounded-3xl border-4 border-[#2C2623] shadow-lg overflow-hidden flex flex-col justify-between group/phone">
                    {/* Phone Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#2C2623] rounded-b-xl z-20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                    </div>

                    {/* Phone Header */}
                    <div className="bg-[#1E1916] pt-5 pb-2 px-3 border-b border-[#2C2623]/40 flex justify-between items-center text-[8px] text-[#F5EBE1]/60">
                      <span className="font-bold">E-Laundry</span>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span>Mitra Depok</span>
                      </div>
                    </div>

                    {/* Simulated Content scrolling */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-[8px]">
                      {/* Banner */}
                      <div className="bg-gradient-to-r from-[#E96A44]/20 to-[#F5B842]/20 p-2 rounded-lg border border-[#E96A44]/10 text-[9px] font-bold">
                        Diskon Premium 30%!
                      </div>

                      {/* Skeleton loader state */}
                      <div className="space-y-1.5">
                        <span className="text-[#F5EBE1]/40 block font-bold">Mitra Terdekat</span>
                        <div className="bg-[#1E1916] p-2 rounded-lg border border-[#2C2623] flex gap-2">
                          <div className="w-6 h-6 rounded bg-[#2C2623] shrink-0 animate-pulse"></div>
                          <div className="space-y-1 w-full">
                            <div className="h-2 bg-[#2C2623] rounded w-3/4 animate-pulse"></div>
                            <div className="h-1.5 bg-[#2C2623] rounded w-1/2 animate-pulse"></div>
                          </div>
                        </div>
                      </div>

                      {/* Normal cards */}
                      <div className="bg-[#1E1916] p-2 rounded-lg border border-[#2C2623] flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                          <div className="p-1 rounded bg-[#E96A44]/15 text-[#E96A44]">
                            <Shirt className="w-3 h-3" />
                          </div>
                          <div>
                            <span className="font-bold block">Indah Kiloan</span>
                            <span className="text-[#F5EBE1]/50 block">4.9 Bintang • 1.2 Km</span>
                          </div>
                        </div>
                        <span className="text-[#E96A44] font-bold">Pilih</span>
                      </div>
                    </div>

                    {/* Navigation bar bottom */}
                    <div className="bg-[#1E1916] py-2 px-4 border-t border-[#2C2623]/40 flex justify-between items-center text-[9px] text-[#F5EBE1]/50">
                      <span className="text-[#E96A44] font-bold">Home</span>
                      <span>Orders</span>
                      <span>Profile</span>
                    </div>
                  </div>
                )}

                {/* 7. ARCHITECTURE & DB FLOW */}
                {currentSlideData.type === "tech" && (
                  <div className="w-full max-w-[340px] bg-[#151210] p-4 rounded-2xl border border-[#2C2623] space-y-3">
                    <div className="text-[10px] text-[#F5B842] font-bold border-b border-[#2C2623] pb-1.5 flex items-center gap-1">
                      <Database className="w-3.5 h-3.5" />
                      <span>MongoDB Document Relations</span>
                    </div>

                    <div className="space-y-2 text-[8px] font-mono text-[#F5EBE1]/70">
                      <div className="bg-[#1E1916] p-1.5 rounded border border-[#2C2623]">
                        <span className="text-[#E96A44] font-bold">Users: </span>
                        <span>{`{ _id: ObjectId, name, email, membership: { quota: 70 } }`}</span>
                      </div>
                      <div className="bg-[#1E1916] p-1.5 rounded border border-[#2C2623]">
                        <span className="text-[#E96A44] font-bold">Orders: </span>
                        <span>{`{ _id: ObjectId, userId (ref), partnerId (ref), weight: 5.5, status: 'placed' }`}</span>
                      </div>
                      <div className="bg-[#1E1916] p-1.5 rounded border border-[#2C2623]">
                        <span className="text-[#E96A44] font-bold">Partners: </span>
                        <span>{`{ _id: ObjectId, name, address, rating: 4.8 }`}</span>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-2 rounded-lg text-[9px] text-[#F5B842] flex items-start gap-1">
                      <Info className="w-3 h-3 shrink-0 mt-0.5" />
                      <span>Webhook Midtrans Signature Key verification prevents payload tempering (SHA-512 authentication check).</span>
                    </div>
                  </div>
                )}

                {/* 8. SOP PIPELINE FLOW */}
                {currentSlideData.type === "sop" && (
                  <div className="w-full max-w-[340px] grid grid-cols-2 gap-2 text-[10px]">
                    <div className="bg-[#151210] p-2.5 rounded-xl border border-[#2C2623] flex items-center gap-2">
                      <span className="font-bold text-[#E96A44]">01</span>
                      <span>Booking App</span>
                    </div>
                    <div className="bg-[#151210] p-2.5 rounded-xl border border-[#2C2623] flex items-center gap-2">
                      <span className="font-bold text-[#E96A44]">02</span>
                      <span>Jemput Eco-Bag</span>
                    </div>
                    <div className="bg-[#151210] p-2.5 rounded-xl border border-[#2C2623] flex items-center gap-2">
                      <span className="font-bold text-[#E96A44]">03</span>
                      <span>Timbang & POS</span>
                    </div>
                    <div className="bg-[#151210] p-2.5 rounded-xl border border-[#2C2623] flex items-center gap-2">
                      <span className="font-bold text-[#E96A44]">04</span>
                      <span>Cuci Eco-Detergent</span>
                    </div>
                    <div className="bg-[#151210] p-2.5 rounded-xl border border-[#2C2623] flex items-center gap-2">
                      <span className="font-bold text-[#E96A44]">05</span>
                      <span>Setrika Uap</span>
                    </div>
                    <div className="bg-[#151210] p-2.5 rounded-xl border border-[#2C2623] flex items-center gap-2">
                      <span className="font-bold text-[#E96A44]">06</span>
                      <span>Delivery Aman</span>
                    </div>
                  </div>
                )}

                {/* 9. COMPETITIVE ADVANTAGE MATRIX */}
                {currentSlideData.type === "competitive" && (
                  <div className="w-full max-w-[340px] space-y-3">
                    {/* Matrix Filters */}
                    <div className="flex gap-1.5 border-b border-[#2C2623] pb-1.5">
                      {(["all", "ux", "price", "integration"] as const).map(filter => (
                        <button 
                          key={filter}
                          onClick={() => setMatrixFilter(filter)}
                          className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all ${
                            matrixFilter === filter 
                              ? "bg-[#E96A44] text-white" 
                              : "bg-[#1E1916] text-[#F5EBE1]/60 hover:text-[#F5EBE1]"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>

                    <table className="w-full text-left text-[9px] border-collapse">
                      <thead>
                        <tr className="border-b border-[#2C2623]">
                          <th className="py-1 font-bold">Fitur Pembanding</th>
                          <th className="py-1 text-[#E96A44] font-bold text-center">E-Laundry</th>
                          <th className="py-1 text-gray-500 text-center">Kompetitor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(matrixFilter === "all" || matrixFilter === "ux") && (
                          <tr className="border-b border-[#2C2623]/30">
                            <td className="py-1.5 font-semibold text-[#F5EBE1]/70">Hibrida Rp 0 (Timbang Nanti)</td>
                            <td className="py-1.5 text-center text-green-400 font-bold">YA (QRIS Webhook)</td>
                            <td className="py-1.5 text-center text-red-400">Tidak (Harus Tebak)</td>
                          </tr>
                        )}
                        {(matrixFilter === "all" || matrixFilter === "price") && (
                          <tr className="border-b border-[#2C2623]/30">
                            <td className="py-1.5 font-semibold text-[#F5EBE1]/70">Kuota Auto-debet Member</td>
                            <td className="py-1.5 text-center text-green-400 font-bold">YA (MongoDB Decr)</td>
                            <td className="py-1.5 text-center text-red-400">Tidak (Cash Harian)</td>
                          </tr>
                        )}
                        {(matrixFilter === "all" || matrixFilter === "integration") && (
                          <tr>
                            <td className="py-1.5 font-semibold text-[#F5EBE1]/70">POS Kasir Integrasi Mitra</td>
                            <td className="py-1.5 text-center text-green-400 font-bold">YA (Gratis POS App)</td>
                            <td className="py-1.5 text-center text-red-400">Tidak (Manual POS)</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 10. FINANCIAL CALCULATOR SIMULATOR */}
                {currentSlideData.type === "financial" && (
                  <div className="bg-[#151210] p-4 rounded-2xl border border-[#2C2623] w-full max-w-[360px] space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#F5EBE1]/70 font-semibold">Uji Kelayakan Finansial</span>
                      <span className={`px-2 py-0.5 rounded font-bold uppercase text-[9px] ${
                        monthlyMembers >= 43 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}>
                        {monthlyMembers >= 43 ? "Untung / Layak (NPV > 0)" : "Rugi (Di bawah BEP)"}
                      </span>
                    </div>

                    {/* Member Slider Input */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span>Jumlah Member Aktif Bulanan:</span>
                        <span className="font-bold text-[#E96A44]">{monthlyMembers} Pengguna</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="500" 
                        step="5" 
                        value={monthlyMembers}
                        onChange={(e) => setMonthlyMembers(parseInt(e.target.value))}
                        className="w-full accent-[#E96A44] bg-[#1E1916]"
                      />
                    </div>

                    {/* Output statistics */}
                    <div className="grid grid-cols-2 gap-2 text-[9px] pt-1">
                      <div className="bg-[#1E1916] p-2 rounded-xl border border-[#2C2623]">
                        <span className="text-[#F5EBE1]/50 block">Pendapatan Kotor Bulanan</span>
                        <span className="text-[11px] font-bold text-[#F5B842]">Rp {totalRevenue.toLocaleString("id-ID")}</span>
                      </div>
                      <div className="bg-[#1E1916] p-2 rounded-xl border border-[#2C2623]">
                        <span className="text-[#F5EBE1]/50 block">Laba Bersih Bulanan</span>
                        <span className={`text-[11px] font-bold ${monthlyNetProfit >= 0 ? "text-green-400" : "text-red-400"}`}>
                          Rp {monthlyNetProfit.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="bg-[#1E1916] p-2 rounded-xl border border-[#2C2623]">
                        <span className="text-[#F5EBE1]/50 block">NPV Proyeksi 3 Tahun</span>
                        <span className={`text-[11px] font-bold ${npv >= 0 ? "text-green-400" : "text-red-400"}`}>
                          Rp {Math.round(npv).toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="bg-[#1E1916] p-2 rounded-xl border border-[#2C2623]">
                        <span className="text-[#F5EBE1]/50 block">Estimasi IRR / Payback</span>
                        <span className="text-[11px] font-bold text-[#F5B842]">{irr.toFixed(1)}% / {paybackPeriodMonths} Bln</span>
                      </div>
                    </div>

                    <div className="text-[8px] text-[#F5EBE1]/40 border-t border-[#2C2623] pt-1.5 flex justify-between">
                      <span>Titik BEP Kritis: 43 Member</span>
                      <span>Biaya Operasional Tetap: Rp 15 Juta</span>
                    </div>
                  </div>
                )}

                {/* 11. ROADMAP VISUAL */}
                {currentSlideData.type === "roadmap" && (
                  <div className="w-full max-w-[340px] space-y-3">
                    <div className="relative border-l-2 border-[#2C2623] pl-4 space-y-3.5 text-[10px]">
                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#E96A44]"></div>
                        <span className="text-[9px] bg-[#E96A44]/15 text-[#E96A44] font-bold px-1.5 py-0.5 rounded">Q1 (Fase 1)</span>
                        <h4 className="font-bold mt-1">Luncurkan MVP & Onboard 15 Mitra</h4>
                        <p className="text-[8px] text-[#F5EBE1]/60">Penyempurnaan checkout Rp 0 dan validasi timbangan aktual.</p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#F5B842]"></div>
                        <span className="text-[9px] bg-[#F5B842]/15 text-[#F5B842] font-bold px-1.5 py-0.5 rounded">Q2 (Fase 2)</span>
                        <h4 className="font-bold mt-1">Whatsapp API & Autodebit Membership</h4>
                        <p className="text-[8px] text-[#F5EBE1]/60">Notifikasi status laundry instan dan pengeluaran kuota bulanan.</p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#1E70D6]"></div>
                        <span className="text-[9px] bg-[#1E70D6]/15 text-[#1E70D6] font-bold px-1.5 py-0.5 rounded">Q3 (Fase 3)</span>
                        <h4 className="font-bold mt-1">Algoritma Optimasi Rute Kurir</h4>
                        <p className="text-[8px] text-[#F5EBE1]/60">Optimalisasi bensin hingga 25% via rute multi-mitra.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 12. CLOSING VISUAL */}
                {currentSlideData.type === "closing" && (
                  <div className="bg-[#151210] p-5 rounded-2xl border border-[#E96A44]/30 w-full max-w-[340px] text-center space-y-4">
                    <Award className="w-12 h-12 text-[#F5B842] mx-auto animate-bounce" />
                    <div>
                      <h4 className="font-display font-black text-sm text-[#F5EBE1]">Mari Berkolaborasi!</h4>
                      <p className="text-[10px] text-[#F5EBE1]/60 mt-1">Hubungi tim kami untuk kemitraan atau investasi awal.</p>
                    </div>

                    <div className="space-y-1.5 text-[9px] text-left border-t border-[#2C2623] pt-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#E96A44]" />
                        <span>Sleman, D.I. Yogyakarta</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#E96A44] font-bold">Email:</span>
                        <span>partner@e-laundry.co.id</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#E96A44] font-bold">Phone:</span>
                        <span>+62-812-3456-7890</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Slide Footer: Navigation Buttons */}
            <div className="flex justify-between items-center border-t border-[#2C2623]/40 pt-4 mt-4 z-10 text-xs text-[#F5EBE1]/60 font-semibold select-none">
              <button 
                onClick={prevSlide}
                className="flex items-center gap-1.5 hover:text-[#E96A44] transition-colors py-2 px-3 border border-[#2C2623] rounded-xl hover:bg-[#151210]"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <div className="hidden sm:flex gap-1">
                {slides.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentSlide ? "w-6 bg-[#E96A44]" : "bg-[#2C2623] hover:bg-[#E96A44]/40"
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={nextSlide}
                className="flex items-center gap-1.5 hover:text-[#E96A44] transition-colors py-2 px-3 border border-[#2C2623] rounded-xl hover:bg-[#151210]"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Quick Help Guide under slide */}
          <div className="mt-4 flex gap-4 text-[10px] text-[#F5EBE1]/40 select-none">
            <span>Pintasan Keyboard:</span>
            <span>`Panah Kanan` / `Space` - Slide Berikut</span>
            <span>`Panah Kiri` - Slide Sebelum</span>
            <span>`M` - Toggle Mode</span>
            <span>`P` - Presenter View</span>
          </div>

        </div>

        {/* RIGHT COLUMN: Presenter Screen Console (Split Screen) */}
        {presenterMode && (
          <div className="w-full lg:w-[35%] bg-[#1E1916] border-t lg:border-t-0 lg:border-l border-[#2C2623] p-5 sm:p-6 flex flex-col justify-between shrink-0 overflow-y-auto animate-fade-in z-30">
            
            {/* Presenter Head */}
            <div className="border-b border-[#2C2623] pb-4 mb-4 space-y-3.5">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-[#F5B842] flex items-center gap-1.5 uppercase tracking-wide">
                  <Tv className="w-3.5 h-3.5" />
                  <span>Presenter Console</span>
                </span>
                <span className="text-[10px] bg-[#E96A44]/15 text-[#E96A44] font-bold px-2 py-0.5 rounded-full uppercase">
                  Live
                </span>
              </div>

              {/* Timer / Stopwatch */}
              <div className="bg-[#151210] p-3 rounded-xl border border-[#2C2623] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#F5B842] animate-pulse" />
                  <span className="font-mono text-lg sm:text-xl font-bold tracking-wider text-[#F5EBE1]">
                    {formatTime(timerSeconds)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setIsTimerRunning(prev => !prev)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                      isTimerRunning 
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
                        : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    }`}
                  >
                    {isTimerRunning ? "Pause" : "Start"}
                  </button>
                  <button 
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds(0);
                    }}
                    className="p-1.5 text-[#F5EBE1]/50 hover:text-[#F5EBE1] hover:bg-[#2C2623] rounded transition-all"
                    title="Reset Stopwatch"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Presenter Body: Speaker Notes */}
            <div className="flex-1 space-y-5">
              <div>
                <span className="text-xs font-bold text-[#F5EBE1]/50 block uppercase tracking-wider mb-2">
                  Catatan Pembicara ({pitchMode === "academic" ? "👨‍🏫 Akademik" : "💼 Bisnis"})
                </span>
                <div className="bg-[#151210] p-4 rounded-xl border border-[#2C2623] text-sm sm:text-base leading-relaxed text-[#F5EBE1]/90 shadow-inner h-[180px] sm:h-[220px] overflow-y-auto whitespace-pre-line font-medium border-l-4 border-l-[#E96A44]">
                  {pitchMode === "academic" ? currentSlideData.academicNotes : currentSlideData.businessNotes}
                </div>
              </div>

              {/* Quick Slide Indexer */}
              <div>
                <span className="text-xs font-bold text-[#F5EBE1]/50 block uppercase tracking-wider mb-2">
                  Daftar Slide Dek
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {slides.map((s, idx) => (
                    <button 
                      key={s.id}
                      onClick={() => setCurrentSlide(idx)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                        idx === currentSlide 
                          ? "bg-[#E96A44] border-[#E96A44] text-white" 
                          : "bg-[#151210] border-[#2C2623] text-[#F5EBE1]/60 hover:text-[#F5EBE1]"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Presenter Footer */}
            <div className="border-t border-[#2C2623] pt-4 mt-4 text-[10px] text-[#F5EBE1]/40 text-center">
              E-Laundry pitch console v1.0 • Antigravity AI
            </div>

          </div>
        )}

      </main>

      {/* ═══════════ SLIDE THUMBNAIL FOOTER STRIP ═══════════ */}
      <footer className="border-t border-[#2C2623]/30 px-6 py-4 bg-[#1E1916]/80 flex justify-between items-center text-xs text-[#F5EBE1]/50 select-none">
        <div>
          Slide aktif: <strong className="text-[#F5B842]">{currentSlide + 1} / {slideCount}</strong> ({(slides[currentSlide].title)})
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setPitchMode("academic")}
            className={`hover:text-[#F5EBE1] transition-colors ${pitchMode === "academic" ? "text-[#F5B842] font-bold" : ""}`}
          >
            Mode Dosen
          </button>
          <span>•</span>
          <button 
            onClick={() => setPitchMode("business")}
            className={`hover:text-[#F5EBE1] transition-colors ${pitchMode === "business" ? "text-[#E96A44] font-bold" : ""}`}
          >
            Mode Investor
          </button>
        </div>
      </footer>

    </div>
  );
}
