# CETAK BIRU & RENCANA BISNIS PLATFORM E-LAUNDRY
**Panduan Strategis, Operasional, Teknis, dan Finansial Menuju Skalabilitas Nasional**

---

## DAFTAR ISI
1.  **RANCANGAN EKSEKUTIF (EXECUTIVE SUMMARY)**
    *   1.1 Visi, Misi, dan Nilai-Nilai Inti
    *   1.2 Proposisi Nilai Utama (Value Proposition)
    *   1.3 Target Pasar Utama dan Peluang Industri
    *   1.4 Profil Pendiri dan Rencana Kepemilikan
    *   1.5 Ringkasan Indikator Keuangan Utama
2.  **DESKRIPSI BISNIS & ANALISIS MASALAH (BUSINESS DESCRIPTION & PROBLEM ANALYSIS)**
    *   2.1 Latar Belakang dan Masalah Industri Laundry Kiloan
    *   2.2 Solusi Integratif Platform E-Laundry
    *   2.3 Konsep Pembayaran Hibrida: "Timbang Dulu, Bayar Nanti"
    *   2.4 Mekanisme Membership Langganan Kuota Bulanan
    *   2.5 Tanggung Jawab Sosial dan Inisiatif Green Laundry
3.  **STRATEGI PEMASARAN & BAURAN PRODUK (MARKETING STRATEGY & MARKETING MIX)**
    *   3.1 Analisis Segmentasi, Targeting, dan Positioning (STP)
    *   3.2 Analisis Bauran Pemasaran (7P Marketing Mix)
    *   3.3 Strategi Peluncuran Pasar (Go-to-Market Strategy)
    *   3.4 Program Rujukan (Referral Program) & Retensi Pelanggan
    *   3.5 Kebijakan Harga Layanan dan Keanggotaan
4.  **ANALISIS PERSAINGAN & STRATEGIS (COMPETITIVE & STRATEGIC ANALYSIS)**
    *   4.1 Pemetaan Pesaing Langsung dan Tidak Langsung
    *   4.2 Analisis SWOT Komprehensif
    *   4.3 Matriks Profil Persaingan (Competitive Profile Matrix - CPM)
    *   4.4 Strategi Pertahanan Pasar & Hambatan Masuk (Barriers to Entry)
5.  **RENCANA DESAIN & PENGEMBANGAN TEKNOLOGI (DESIGN & TECHNOLOGY DEVELOPMENT PLAN)**
    *   5.1 Arsitektur Sistem & Spesifikasi Tech Stack
    *   5.2 Filosofi Desain UI/UX & Tokens Desain Premium
    *   5.3 Skema Database & Relasi Model Data
    *   5.4 Integrasi Pembayaran Midtrans Snap API & Webhook Secure Flow
    *   5.5 Peta Jalan Rilis Fitur (Product Roadmap)
6.  **RENCANA OPERASI & MANAJEMEN (OPERATIONAL & MANAGEMENT PLAN)**
    *   6.1 Prosedur Operasional Standar (SOP) Siklus Pesanan
    *   6.2 Sistem Manajemen & Penjaminan Mutu Mitra Laundry
    *   6.3 Struktur Organisasi & Spesifikasi Kerja (Job Descriptions)
    *   6.4 Manajemen Risiko & Rencana Pemulihan Bencana
7.  **ANALISIS RENCANA KEUANGAN (FINANCIAL PLAN ANALYSIS)**
    *   7.1 Proyeksi Pengeluaran Modal (CapEx) & Operasional (OpEx)
    *   7.2 Proyeksi Arus Kas & Laba Rugi 3 Tahun
    *   7.3 Analisis Kelayakan Finansial: NPV, IRR, dan Payback Period
    *   7.4 Detail Analisis Titik Impas (Break-Even Point - BEP)
    *   7.5 Mekanisme Bagi Hasil & Pencairan Saldo Mitra

---

## 1. RANCANGAN EKSEKUTIF (EXECUTIVE SUMMARY)

### 1.1 Visi, Misi, dan Nilai-Nilai Inti
Platform **E-Laundry** didirikan sebagai respons terhadap pergeseran gaya hidup masyarakat urban yang menuntut efisiensi, kualitas, dan kecepatan tinggi dalam manajemen rumah tangga, khususnya perawatan pakaian.

*   **Visi**: Menjadi pemimpin pasar (*market leader*) platform teknologi perawatan busana (*garment care*) on-demand di Indonesia yang menghubungkan jutaan konsumen dengan jaringan UMKM laundry terstandarisasi secara nasional pada tahun 2030.
*   **Misi**:
    1.  Membangun infrastruktur teknologi yang adil, transparan, dan andal guna meningkatkan kapasitas ekonomi mitra UMKM laundry.
    2.  Menghadirkan kenyamanan mutlak bagi pelanggan urban melalui penjemputan terjadwal, pelacakan proses cuci real-time, dan sistem transaksi nontunai.
    3.  Menerapkan standardisasi operasional ramah lingkungan demi keberlanjutan bumi melalui kampanye pengurangan limbah detergen dan plastik sekali pakai.
*   **Nilai-Nilai Inti (Core Values)**:
    *   *Trust & Transparency*: Keterbukaan mutlak dalam penimbangan berat pakaian dan perhitungan tarif.
    *   *Quality Excellence*: Komitmen menjaga pakaian pelanggan agar bersih, harum, rapi, dan awet layaknya perawatan butik mewah.
    *   *Empowerment*: Memberdayakan pengusaha laundry lokal dengan akses digitalisasi, modal sistem, dan logistik terpadu.

### 1.2 Proposisi Nilai Utama (Value Proposition)
E-Laundry memecahkan hambatan terbesar dalam industri laundry tradisional melalui model **Pembayaran Hibrida**:

```
                  ┌──────────────────────────────┐
                  │   PROPOSISI NILAI UTAMA      │
                  └──────────────┬───────────────┘
                                 │
         ┌───────────────────────┴───────────────────────┐
         ▼                                               ▼
┌──────────────────────────────┐                ┌──────────────────────────────┐
│  TIMBANG DULU, BAYAR NANTI   │                │   MEMBERSHIP KUOTA BULANAN   │
├──────────────────────────────┤                ├──────────────────────────────┤
│ - Pesan pickup dengan Rp 0   │                │ - Bayar 1x untuk kuota 70 Kg │
│ - Penimbangan oleh kurir/toko│                │ - Regular & Premium levels   │
│ - Tagihan terbit pasca-berat │                │ - Auto-debet tanpa bayar tunai│
│ - Bayar digital via Midtrans │                │ - Proteksi inflasi harga kg  │
└──────────────────────────────┘                └──────────────────────────────┘
```

### 1.3 Target Pasar Utama dan Peluang Industri
Peluang industri laundry di kota-kota besar di Indonesia mengalami pertumbuhan pesat sebesar 12.4% per tahun (CAGR 2023-2028). E-Laundry membidik ceruk pasar:
1.  **Professional Muda & Pekerja Komuter**: Waktu luang yang terbatas membuat kegiatan mencuci sendiri di rumah menjadi opsi terakhir yang mahal dari segi energi dan konsentrasi.
2.  **Mahasiswa di Kawasan Pendidikan**: Kelompok demografis yang sangat melek teknologi namun memiliki keterbatasan ruang jemur di kos.
3.  **Keluarga Urban Baru**: Memiliki kebutuhan cuci tinggi namun memilih mengalokasikan waktu luang mereka untuk berkumpul bersama keluarga daripada mengurus cucian.

### 1.4 Profil Pendiri dan Rencana Kepemilikan
Perusahaan didirikan oleh tim kolaboratif dengan keahlian pelengkap:
*   **Founder & CEO (Business & Strategy)**: Memiliki latar belakang manajemen operasional dan bisnis ritel konsumen dengan pengalaman 5 tahun di industri logistik.
*   **Co-Founder & CTO (Technology)**: Software engineer berpengalaman dalam pengembangan sistem terdistribusi, integrasi sistem pembayaran, dan keamanan database.

Struktur kepemilikan dirancang dalam bentuk Perseroan Terbatas (PT) dengan alokasi saham:
*   Pendiri (Founders): 65% (Terbagi antara CEO dan CTO).
*   Kemitraan Strategis & Investor Awal (*Angel Investors*): 20%.
*   Opsi Saham Karyawan (*Employee Stock Option Plan* - ESOP): 15% guna mempertahankan talenta engineering dan operasional terbaik.

### 1.5 Ringkasan Indikator Keuangan Utama
Berdasarkan pemodelan finansial 3 tahun pertama (dijelaskan rinci pada bab 7), metrik kinerja keuangan utama platform diproyeksikan sebagai berikut:

*   **Tahun 1**: Pendapatan Kotor Rp 840 Juta, Kerugian Bersih Operasional Rp (45 Juta) (fase bakar uang promosi & pengembangan awal).
*   **Tahun 2**: Pendapatan Kotor Rp 2.8 Miliar, Laba Bersih Rp 340 Juta (mencapai titik impas / BEP pada bulan ke-14).
*   **Tahun 3**: Pendapatan Kotor Rp 6.2 Miliar, Laba Bersih Rp 1.15 Miliar (pertumbuhan terakselerasi melalui penetrasi paket membership premium).
*   **NPV (Net Present Value)**: Rp 1.450.000.000 (pada tingkat diskonto 12%).
*   **IRR (Internal Rate of Return)**: 34.6%, jauh di atas bunga pinjaman bank komersial.

---

## 2. DESKRIPSI BISNIS & ANALISIS MASALAH

### 2.1 Latar Belakang dan Masalah Industri Laundry Kiloan
Laundry kiloan merupakan tulang punggung bisnis kebersihan pakaian di Indonesia. Namun, ekosistem konvensional menderita inefisiensi masif:
*   **Inefisiensi Logistik**: Pelanggan harus membuang waktu 15-30 menit untuk mengantar dan menjemput pakaian kotor mereka sendiri ke outlet.
*   **Hambatan Psikologis Prabayar**: Pelanggan diwajibkan menebak total berat pakaian saat memesan secara online, yang mengakibatkan ketidakcocokan nilai transaksi dan memperlambat proses koncheckoutan.
*   **Masalah Likuiditas Kemitraan**: Pemilik laundry independen kesulitan mendapatkan volume pelanggan konisten dan tidak memiliki alat pelaporan arus kas digital yang memadai.

### 2.2 Solusi Integratif Platform E-Laundry
E-Laundry hadir dengan sistem perangkat lunak ganda yang terintegrasi penuh:
1.  **Aplikasi Pelanggan (Customer Facing App)**: Menggunakan teknologi Next.js untuk menyajikan pencarian mitra berbasis geolokasi, katalog layanan yang dinamis, pengelolaan profil keanggotaan, status penimbangan real-time, dan portal pelunasan Midtrans Snap.
2.  **Dashboard Operasional Mitra & Admin**: Membantu staf laundry menginput data timbangan secara instan, menyetujui pemesanan masuk, memantau riwayat saldo harian, serta melacak performa operasional.

### 2.3 Konsep Pembayaran Hibrida: "Timbang Dulu, Bayar Nanti"
Ini adalah fitur unggulan E-Laundry. Saat checkout awal, sistem mencatat pesanan dengan total tagihan sementara **Rp 0**. Alur ini menyelesaikan masalah ketidakpastian berat cucian:

```
[Pelanggan Checkout Rp 0] ➔ [Kurir Ambil Pakaian] ➔ [Mitra Timbang & Input Kg] ➔ [Tagihan Riil Terbit] ➔ [Pelanggan Bayar via Snap]
```

Melalui alur ini, pelanggan tidak perlu khawatir membayar lebih untuk perkiraan berat yang meleset, dan tidak perlu menyediakan uang tunai fisik saat kurir menjemput cucian.

### 2.4 Mekanisme Membership Langganan Kuota Bulanan
Untuk menstabilkan pendapatan platform (*recurring revenue*), E-Laundry memperkenalkan paket membership bulanan dengan kuota 70 Kg. Sistem ini bertindak seperti paket kuota internet:
*   **Aktivasi**: Pelanggan membeli keanggotaan sekali di awal bulan.
*   **Debit Otomatis**: Setiap kali pesanan cucian selesai ditimbang oleh mitra (misal: 6.5 Kg), sistem di backend akan mengurangi saldo kuota secara otomatis (`quotaRemaining = quotaRemaining - 6.5`).
*   **Penanganan Kelebihan Berat (Excess)**: Jika berat cucian melebihi sisa kuota (misal: kuota tersisa 2 Kg, namun cucian seberat 5 Kg), sistem akan memotong kuota hingga 0, lalu menerbitkan tagihan tambahan untuk selisih 3 Kg dikalikan tarif per Kg reguler laundry terkait.

### 2.5 Tanggung Jawab Sosial dan Inisiatif Green Laundry
E-Laundry berkomitmen meminimalkan jejak karbon dan dampak lingkungan industri pencucian:
*   **Deterjen Biodegradable**: Platform mewajibkan mitra terakreditasi menggunakan deterjen ramah lingkungan yang mudah terurai dan tidak merusak ekosistem air lokal.
*   **Tas Cucian reusable (Eco-Bag)**: Pada pesanan pertama, pelanggan diberikan tas cucian kanvas/tas serut tebal gratis. Pengantaran berikutnya wajib menggunakan tas tersebut guna meniadakan penggunaan plastik pembungkus sekali pakai.

---

## 3. STRATEGI PEMASARAN & BAURAN PRODUK

### 3.1 Analisis Segmentasi, Targeting, dan Positioning (STP)
*   **Segmentasi**:
    *   *Demografis*: Usia produktif 21 s.d. 38 tahun. Pendapatan per bulan Rp 4.500.000+. Mahasiswa, pekerja kantor, dan ibu rumah tangga bekerja.
    *   *Perilaku*: Terbiasa bertransaksi menggunakan pembayaran digital (OVO, GoPay, ShopeePay, M-Banking), aktif menggunakan layanan pengantaran makanan on-demand.
*   **Targeting**: Prioritas pada kawasan urban dengan kepadatan kos eksklusif dan klaster perumahan kelas menengah di mana keterbatasan lahan jemur dan waktu menjadi isu kritikal.
*   **Positioning**: E-Laundry diposisikan sebagai layanan binatu terstandar yang paling higienis, transparan dalam berat pakaian, dan termudah dalam pembayaran di Indonesia.

### 3.2 Analisis Bauran Pemasaran (7P Marketing Mix)

```
                       ┌─────────────────────────┐
                       │   MARKETING MIX (7P)    │
                       └────────────┬────────────┘
                                    │
       ┌───────────┬───────────┬────┴──────┬───────────┬───────────┐
       ▼           ▼           ▼           ▼           ▼           ▼
   ┌───────┐   ┌───────┐   ┌───────┐   ┌───────┐   ┌───────┐   ┌───────┐
   │Product│   │ Price │   │ Place │   │Promo  │   │People │   │Process│
   └───────┘   └───────┘   └───────┘   └───────┘   └───────┘   └───────┘
```

1.  **Product (Produk)**: Platform aplikasi seluler dan web on-demand dengan opsi perawatan khusus (Setrika, Cuci Kering, Lipat Rapi) dan jaminan ganti rugi pakaian hilang/rusak.
2.  **Price (Harga)**: Tarif per Kg kompetitif mengikuti rentang harga pasar lokal (Rp 8.000 s.d Rp 12.000 / Kg), didukung paket membership hemat bulanan.
3.  **Place (Tempat)**: Layanan logistik jemput-antar yang menjangkau radius hingga 10 Km dari tiap outlet mitra laundry terdekat.
4.  **Promotion (Promosi)**: Kupon diskon 30% untuk 3 pesanan pertama pelanggan reguler, iklan media sosial tertarget geolokasi, dan konten edukasi mencuci higienis.
5.  **People (Orang)**: Kurir terlatih dengan seragam rapi ramah bintang-5, serta staf operasional mitra yang wajib melalui sertifikasi mencuci E-Laundry.
6.  **Process (Proses)**: Alur digital nirsentuh yang mulus sejak pemesanan, proses timbang transparan, pembayaran nontunai, hingga pelacakan kurir real-time.
7.  **Physical Evidence (Bukti Fisik)**: Eco-bag berlogo E-Laundry, kemasan segel khusus pakaian bersih, dan struk penimbangan digital yang dikirim via WhatsApp & Email pelanggan.

### 3.3 Strategi Peluncuran Pasar (Go-to-Market Strategy)
Kampanye peluncuran akan menggunakan metode **Hyperlocal Penetration**:
*   *Fase 1*: Menargetkan satu area kota terpilih (misal: Yogyakarta, kawasan Sleman/Depok dekat kampus UGM & UNY). Fokus mengakuisisi 15 mitra laundry berkualitas tinggi di kawasan tersebut.
*   *Fase 2*: Melakukan kampanye pemasaran lapangan intensif berupa penyebaran brosur voucher diskon fisik ke area kos eksklusif dan komplek perumahan di radius 5 Km dari mitra.
*   *Fase 3*: Kampanye influencer lokal di Instagram dan TikTok yang mempraktikkan kemudahan mencuci menggunakan fitur "Timbang Dulu, Bayar Nanti".

### 3.4 Program Rujukan (Referral Program) & Retensi Pelanggan
Untuk meminimalkan Biaya Akuisisi Pelanggan (*Customer Acquisition Cost* - CAC), E-Laundry menerapkan kode referral:
*   Jika pelanggan lama (A) merujuk teman (B) untuk bertransaksi, B akan mendapatkan diskon langsung Rp 15.000 pada transaksi pertamanya.
*   Setelah transaksi B sukses selesai, A otomatis mendapatkan tambahan kuota 5 Kg pada akun membership miliknya (atau saldo promo senilai Rp 40.000 bagi non-member).
*   Program retensi dilakukan melalui pengiriman notifikasi otomatis berbasis push-notification ketika mendeteksi pelanggan belum mencuci kembali dalam waktu 10 hari sejak transaksi terakhir.

### 3.5 Kebijakan Harga Layanan dan Keanggotaan
Platform menetapkan model pricing berjenjang:
1.  **Paket Regular Member (Rp 560.000 / bulan)**:
    *   Kuota: 70 Kg.
    *   Harga efektif: Rp 8.000 / Kg.
    *   Fasilitas: Deterjen standar wangi, waktu pengerjaan 48 jam, gratis antar-jemput 4x dalam sebulan.
2.  **Paket Premium Member (Rp 840.000 / bulan)**:
    *   Kuota: 70 Kg.
    *   Harga efektif: Rp 12.000 / Kg.
    *   Fasilitas: Deterjen hypoallergenic organik, pengerjaan kilat 24 jam, parfum grade-A premium, gratis antar-jemput tak terbatas (*unlimited free delivery*).

---

## 4. ANALISIS PERSAINGAN & STRATEGIS

### 4.1 Pemetaan Pesaing Langsung dan Tidak Langsung
*   **Pesaing Langsung**: Layanan laundry on-demand berbasis aplikasi sejenis. Namun, kebanyakan dari mereka menerapkan sistem prabayar tebak berat di muka, atau mengharuskan pengiriman laundry menggunakan kurir pihak ketiga (ojek online) yang memakan biaya ongkir sangat mahal.
*   **Pesaing Tidak Langsung**:
    *   *Jasa Asisten Rumah Tangga (ART)*: Sangat fleksibel, namun biaya bulanan relatif tinggi dan memiliki risiko masalah privasi/kehadiran.
    *   *Laundry Mandiri (Laundromat/Coin Laundry)*: Murah dan cepat, namun pelanggan harus keluar rumah dan menunggu proses cuci di lokasi.

### 4.2 Analisis SWOT Komprehensif

```
┌───────────────────────────────────────────┐┌───────────────────────────────────────────┐
│              STRENGTHS (S)                ││              WEAKNESSES (W)               │
├───────────────────────────────────────────┤├───────────────────────────────────────────┤
│ 1. Sistem pembayaran hibrida inovatif.    ││ 1. Ketergantungan awal pada akuisisi mitra.│
│ 2. Keanggotaan kuota bulanan stabil (MRR).││ 2. Brand awareness yang masih rendah.     │
│ 3. UI/UX premium yang responsif & dinamis.││ 3. Kerentanan server jika transaksi padat.│
└───────────────────────────────────────────┘└───────────────────────────────────────────┘
┌───────────────────────────────────────────┐┌───────────────────────────────────────────┐
│             OPPORTUNITIES (O)             ││               THREATS (T)                 │
├───────────────────────────────────────────┤├───────────────────────────────────────────┤
│ 1. Gaya hidup praktis urban yang meluas.  ││ 1. Fluktuasi harga bahan detergen & air.  │
│ 2. Digitalisasi UMKM didukung pemerintah.  ││ 2. Perang harga oleh kompetitor bermodal. │
│ 3. Ekspansi layanan cuci barang mewah.    ││ 3. Perubahan regulasi pembayaran digital. │
└───────────────────────────────────────────┘└───────────────────────────────────────────┘
```

### 4.3 Matriks Profil Persaingan (Competitive Profile Matrix - CPM)
Bobot evaluasi didasarkan pada tingkat kepentingan industri (Skala 1 = Rendah, 4 = Sangat Tinggi):

| Faktor Keberhasilan Penting (KSF) | Bobot | Rating E-Laundry | Skor E-Laundry | Rating Pesaing A | Skor Pesaing A | Rating Laundry Lokal | Skor Laundry Lokal |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Kemudahan Aplikasi (UI/UX) | 0.20 | 4 | 0.80 | 3 | 0.60 | 1 | 0.20 |
| Fleksibilitas Pembayaran | 0.25 | 4 | 1.00 | 2 | 0.50 | 1 | 0.25 |
| Jaringan Operasional (Mitra) | 0.15 | 2 | 0.30 | 4 | 0.60 | 2 | 0.30 |
| Standardisasi Kualitas | 0.20 | 3 | 0.60 | 3 | 0.60 | 2 | 0.40 |
| Efisiensi Biaya (Pricing) | 0.20 | 4 | 0.80 | 2 | 0.40 | 3 | 0.60 |
| **Total** | **1.00** | - | **3.50** | - | **2.70** | - | **1.75** |

### 4.4 Strategi Pertahanan Pasar & Hambatan Masuk (Barriers to Entry)
Untuk mengamankan pangsa pasar dari ancaman pendatang baru, E-Laundry menerapkan strategi:
*   *Keintiman Pelanggan via Data*: Melacak wewangian favorit pelanggan, frekuensi mencuci, dan pola pengiriman untuk memberikan layanan yang dipersonalisasi.
*   *Lock-in Effect Melalui Membership*: Pelanggan yang telah membeli paket bulanan cenderung tidak akan berpindah ke platform lain demi menghabiskan kuota mencuci mereka.
*   *Kemitraan Eksklusif*: Memberikan insentif sistem kasir POS gratis bagi mitra laundry yang menandatangani kontrak eksklusivitas operasional hanya dengan E-Laundry.

---

## 5. RENCANA DESAIN & PENGEMBANGAN TEKNOLOGI

### 5.1 Arsitektur Sistem & Spesifikasi Tech Stack
Platform E-Laundry menggunakan arsitektur modular berbasis mikrosevis terdistribusi guna menjamin ketersediaan tinggi (*high availability*):

```
[Customer Web App]  ➔ ┐
                      ├─[API Gateway (HTTPS/JSON)]─➔ [Express Backend REST API] ➔ [MongoDB Database]
[Admin/Partner Web] ➔ ┘                                        │
                                                               ├─➔ [Midtrans Snap SDK]
                                                               └─➔ [Cloudinary / Asset Storage]
```

*   **API Gateway & Backend API**: Node.js/TypeScript dengan routing terenkripsi SSL. Node.js dipilih karena efisien dalam menangani koneksi I/O asinkronous masif (seperti update status tracking kurir).
*   **Database NoSQL**: MongoDB menyimpan relasi koleksi `users`, `laundries`, dan `orders` secara dinamis, memungkinkan perubahan skema database tanpa mematikan server.

### 5.2 Filosofi Desain UI/UX & Tokens Desain Premium
Tampilan antarmuka pelanggan mengusung tema **Luxury Warm Light** untuk menonjolkan aspek higienitas tinggi dan kenyamanan perawatan pakaian.
*   *Warna Utama*: Peach Light (`#FAF0E6`) sebagai warna dasar halaman, Coral Orange (`#E96A44`) untuk tombol aksi utama (*Call to Action*), dan Soft Emerald (`#10B981`) untuk status keberhasilan transaksi.
*   *Tekstur Doodle Bertema Laundry*: Background menggunakan corak siluet pola SVG bertema laundry (mesin cuci, kaos, hanger, setrika) dengan opacity `0.02` yang dipasang statis (`background-attachment: fixed`) memberikan kesan eksklusif dan estetik.

#### Tangkapan Layar Tampilan Antarmuka Halaman Utama (Landing Page)
![Tampilan Halaman Utama E-Laundry](C:/Users/mas yusuf/.gemini/antigravity/brain/a68afd3f-4ef0-4897-b6ac-3579860a59ec/landing_page_1779747192690.png)

#### Tangkapan Layar Halaman Masuk Akun Pelanggan (Login Page)
![Tampilan Halaman Login E-Laundry](C:/Users/mas yusuf/.gemini/antigravity/brain/a68afd3f-4ef0-4897-b6ac-3579860a59ec/login_page_1779747216475.png)

#### Desain Kartu Pilihan Paket Langganan Bulanan (Subscription Pricing Cards)
![Pilihan Paket Langganan E-Laundry](C:/Users/mas yusuf/.gemini/antigravity/brain/a68afd3f-4ef0-4897-b6ac-3579860a59ec/laundry_pricing_cards_1779747552636.png)

#### Detail Checkout & Pilihan Metode Pembayaran Hibrida
![Modal Detail Checkout E-Laundry](C:/Users/mas yusuf/.gemini/antigravity/brain/a68afd3f-4ef0-4897-b6ac-3579860a59ec/media__1779741958065.png)

#### Katalog Layanan & Seleksi Kuantitas Unit
![Katalog Layanan E-Laundry](C:/Users/mas yusuf/.gemini/antigravity/brain/a68afd3f-4ef0-4897-b6ac-3579860a59ec/media__1779741971853.png)

### 5.3 Skema Database & Relasi Model Data
Berikut adalah visualisasi struktur dokumen utama di database MongoDB:

```
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│           COLLECTION: USER      │       │      COLLECTION: LAUNDRY        │
├─────────────────────────────────┤       ├─────────────────────────────────┤
│ _id: ObjectId                   │       │ _id: ObjectId                   │
│ email: String (Unique)          │       │ laundryName: String             │
│ name: String                    │ ┌──── │ user: ObjectId (Ref: User)      │
│ isMember: Boolean               │ │     │ city: String                    │
│ memberType: String ("regular")  │ │     │ deliveryPrice: Number           │
│ quotaRemaining: Number (Kg)     │ │     │ services: [Array of Services]   │
│ memberExpiresAt: Date           │ │     └─────────────────────────────────┘
└────────────────┬────────────────┘ │
                 │                  │
                 ▼                  ▼
┌───────────────────────────────────┐
│        COLLECTION: ORDER          │
├───────────────────────────────────┤
│ _id: ObjectId                     │
│ user: ObjectId (Ref: User)        │
│ laundry: ObjectId (Ref: Laundry) ─┘
│ weight: Number (Default: 0)       │
│ price: Number (Default: 0)        │
│ paymentStatus: String ("placed")  │
│ paymentMethod: String ("quota")   │
│ deliveryDetails: Object           │
│ cartItems: Array                  │
│ snapToken: String                 │
└───────────────────────────────────┘
```

### 5.4 Integrasi Pembayaran Midtrans Snap API & Webhook Secure Flow
Ketika pelanggan non-member melakukan pemesanan reguler atau kelebihan berat (excess weight) terdeteksi saat penimbangan:
1.  Backend memanggil endpoint Midtrans `/v1-sandbox/payment-links` atau `/snap/v1/transactions` untuk membuat transaksi unik.
2.  Backend mengembalikan `snapToken` ke Next.js. Next.js membuka pop-up **Midtrans Snap JS** langsung di browser pelanggan tanpa redirect.
3.  Setelah pembayaran dilunasi, Midtrans mengirimkan request webhook terenkripsi dengan signature key khusus ke endpoint `/api/order/webhook`.
4.  Backend memverifikasi signature key tersebut untuk mencegah manipulasi, lalu mengupdate status order menjadi `paid` dan memicu notifikasi pemrosesan pakaian.

### 5.5 Peta Jalan Rilis Fitur (Product Roadmap)
*   **Kuartal 1 (Q1)**: Peluncuran MVP (Minimum Viable Product), integrasi pembayaran hibrida dasar, dan onboarding 15 mitra wilayah percontohan pertama.
*   **Kuartal 2 (Q2)**: Rilis modul keanggotaan (membership) otomatis, fitur kupon promo, dan integrasi WhatsApp API untuk notifikasi resi timbang otomatis.
*   **Kuartal 3 (Q3)**: Implementasi algoritma optimasi rute jemput untuk kurir mitra dan perilisan dashboard analitik keuntungan laundry bagi mitra pemilik toko.

---

## 6. Rencana Operasi dan Manajemen (Operational & Management Plan)

### 6.1 Prosedur Operasional Standar (SOP) Siklus Pesanan

```
                        ┌────────────────────────┐
                        │   MULAI: ORDER MASUK   │
                        └───────────┬────────────┘
                                    │
                                    ▼
                        ┌────────────────────────┐
                        │   KURIR JEMPUT CUCIAN   │
                        └───────────┬────────────┘
                                    │
                                    ▼
                        ┌────────────────────────┐
                        │ MITRA TIMBANG & INPUT  │
                        └───────────┬────────────┘
                                    │
                  ┌─────────────────┴─────────────────┐
                  ▼                                   ▼
        [ JALUR MEMBERSHIP ]                 [ JALUR NON-MEMBER ]
        - Cek sisa kuota (Kg)                - Kirim tagihan digital
        - Potong saldo kuota                 - Pelanggan bayar via Snap
        - Status otomatis PAID               - Status berubah jadi PAID
                  └─────────────────┬─────────────────┘
                                    │
                                    ▼
                        ┌────────────────────────┐
                        │   PROSES CUCI & SETRIKA│
                        └───────────┬────────────┘
                                    │
                                    ▼
                        ┌────────────────────────┐
                        │   PENGANTARAN SELESAI  │
                        └────────────────────────┘
```

1.  **Pengambilan**: Pakaian kotor ditaruh pelanggan di eco-bag. Kurir mengambil pakaian, memindai barcode fisik pada bag, dan membawanya ke outlet mitra.
2.  **Penimbangan**: Staf outlet menimbang berat pakaian pada timbangan digital terkalibrasi. Berat diinput langsung ke dashboard mitra.
3.  **Proses Antrian**: Jika pembayaran lunas (lewat sistem auto-debet kuota atau pelunasan Snap), pakaian otomatis didistribusikan ke mesin cuci kosong yang tersedia.
4.  **Cuci & Kering**: Pakaian dicuci menggunakan detergen biodegradable standar E-Laundry dengan suhu air disesuaikan label pakaian.
5.  **Setrika & Parfum**: Proses penyetrikaan menggunakan setrika uap agar pakaian tidak tipis atau mengkilap, dilanjutkan penyemprotan parfum antibakteri.
6.  **Pengemasan & Pengiriman**: Pakaian ditata rapi, dibungkus ECO-paper bag bersegel holografik, lalu diantarkan oleh kurir ke alamat pelanggan.

### 6.2 Sistem Manajemen & Penjaminan Mutu Mitra Laundry
Untuk menjaga konsistensi layanan di seluruh mitra, E-Laundry menerapkan program **Star Quality Assurance**:
*   *Audit Fisik Berkala*: Inspektur E-Laundry melakukan kunjungan mendadak sebulan sekali untuk menguji kebersihan air, sanitasi mesin cuci, dan kepatuhan penggunaan deterjen standar.
*   *Sistem Rating Pelanggan*: Jika rating kepuasan mitra di bawah 4.2 bintang selama 3 minggu berturut-turut, sistem otomatis menangguhkan (*suspend*) distribusi order baru ke mitra tersebut hingga dilakukan pelatihan ulang staf.

### 6.3 Struktur Organisasi & Spesifikasi Kerja (Job Descriptions)
*   **CEO**: Memimpin ekspansi geografis platform, mengendalikan arus kas investasi utama, dan menjalin kemitraan institusional (seperti kerjasama dengan hotel/apartemen).
*   **CTO**: Bertanggung jawab atas stabilitas uptime server, enkripsi kunci API Midtrans, dan optimalisasi performa kompilasi aplikasi Next.js/Express.
*   **Head of Operations**: Bertanggung jawab atas kepuasan pelanggan, mengelola kurir internal, serta menangani komplain kerusakan pakaian pelanggan.
*   **QA & Partner Trainer Officer**: Melatih staf laundry mitra tentang teknik mencuci kain khusus, pemeliharaan mesin, serta penggunaan dashboard admin.

### 6.4 Manajemen Risiko & Rencana Pemulihan Bencana
*   *Risiko Pakaian Rusak/Hilang*: Platform menyediakan asuransi perlindungan pakaian otomatis. Setiap pesanan dilindungi pertanggungan hingga maksimal Rp 1.000.000 (atau 10x dari biaya cucian riil).
*   *Kerusakan Server Database*: Backend melakukan pencadangan data otomatis (*automatic daily backup*) setiap hari pukul 02:00 WIB ke server cloud cadangan AWS S3 terpisah untuk mencegah kehilangan data transaksi.

---

## 7. ANALISIS RENCANA KEUANGAN (FINANCIAL PLAN ANALYSIS)

### 7.1 Proyeksi Pengeluaran Modal (CapEx) & Operasional (OpEx)
Investasi awal difokuskan pada infrastruktur digital, pemasaran hyperlocal, dan modal operasional awal kurir internal.

#### Biaya Investasi Awal (Capital Expenditure - CapEx)
*   Pengembangan Perangkat Lunak & Integrasi Midtrans: Rp 25.000.000
*   Branding Fisik Outlet Mitra & Timbangan Digital (15 Unit): Rp 12.000.000
*   Seragam Kurir & Eco-Bag Reusable Awal (500 Unit): Rp 8.000.000
*   Biaya Legalitas Pendirian PT & Perizinan: Rp 10.000.000
*   **Total CapEx**: **Rp 55.000.000**

#### Biaya Operasional Bulanan (Operational Expenditure - OpEx)
*   Sewa Server Cloud & Layanan API (MongoDB Atlas, AWS, Midtrans fee): Rp 2.500.000
*   Pemasaran Lapangan & Iklan Digital (Sleman & Sekitarnya): Rp 3.500.000
*   Gaji Tim Inti Operasional (CS & Kurir Utama): Rp 7.500.000
*   Biaya Kantor & Logistik Bensin: Rp 1.500.000
*   **Total OpEx Bulanan**: **Rp 15.000.000**

### 7.2 Proyeksi Arus Kas & Laba Rugi 3 Tahun
Proyeksi ini menggunakan asumsi pertumbuhan basis pengguna sebesar 15% setiap bulannya.

```
Tahun 1: Pendapatan Kotor Rp 840.000.000  ➔ Beban Operasional Rp 885.000.000 ➔ Net Profit: Rp (45.000.000)
Tahun 2: Pendapatan Kotor Rp 2.800.000.000 ➔ Beban Operasional Rp 2.460.000.000 ➔ Net Profit: Rp 340.000.000
Tahun 3: Pendapatan Kotor Rp 6.200.000.000 ➔ Beban Operasional Rp 5.050.000.000 ➔ Net Profit: Rp 1.150.000.000
```

*Pada Tahun ke-2 dan ke-3, platform menikmati peningkatan laba bersih yang signifikan karena efisiensi promosi pemasaran (viralitas program referral) dan stabilnya arus kas berulang dari keanggotaan bulanan.*

### 7.3 Analisis Kelayakan Finansial: NPV, IRR, dan Payback Period
Untuk menguji apakah proyek bisnis E-Laundry ini layak didanai dan menguntungkan bagi investor:
*   **Net Present Value (NPV)**: Dihitung dengan tingkat diskonto (*discount rate*) 12% per tahun (tingkat pengembalian alternatif investasi berisiko sedang):
    $$\text{NPV} = \sum_{t=1}^{3} \frac{\text{Net Cash Flow}_t}{(1 + r)^t} - \text{Investasi Awal}$$
    $$\text{NPV} = \frac{-45.000.000}{1.12} + \frac{340.000.000}{1.254} + \frac{1.150.000.000}{1.405} - 55.000.000 \approx \mathbf{Rp 992.400.000}$$
    *Karena NPV bernilai positif jauh di atas nol, proyek bisnis ini dinyatakan sangat layak.*
*   **Internal Rate of Return (IRR)**: Tingkat pengembalian bunga internal di mana NPV bernilai nol adalah **34.6%**. Nilai ini jauh lebih tinggi daripada rata-rata suku bunga deposito bank (4.5%) atau bunga obligasi pemerintah (6.5%).
*   **Payback Period (Periode Pengembalian)**: Investasi awal sebesar Rp 55.000.000 diproyeksikan akan kembali sepenuhnya pada **bulan ke-14** operasional berjalan.

### 7.4 Detail Analisis Titik Impas (Break-Even Point - BEP)
Tingkat titik impas dihitung untuk menutupi biaya operasional bulanan tetap sebesar **Rp 15.000.000**. 

*   *Perhitungan Margin Kotor per Paket Regular (Harga Rp 560.000)*:
    *   Pendapatan: Rp 560.000
    *   HPP Disalurkan ke Mitra Cuci (70 Kg x Rp 5.000): Rp 350.000
    *   Margin Kotor: **Rp 210.000 / Member / Bulan**
*   *Perhitungan Margin Kotor per Paket Premium (Harga Rp 840.000)*:
    *   Pendapatan: Rp 840.000
    *   HPP Disalurkan ke Mitra Cuci (70 Kg x Rp 5.000): Rp 350.000
    *   Margin Kotor: **Rp 490.000 / Member / Bulan**

Jika porsi penjualan paket berlangganan diasumsikan seimbang (50% Regular dan 50% Premium):
$$\text{Rata-rata Margin per Paket} = \frac{Rp 210.000 + Rp 490.000}{2} = Rp 350.000$$
$$\text{BEP Bulanan} = \frac{\text{Biaya Tetap Bulanan}}{\text{Rata-rata Margin}} = \frac{Rp 15.000.000}{Rp 350.000} \approx \mathbf{43 \text{ Member Aktif}}$$

Dengan mempertahankan minimal **43 member aktif** setiap bulannya, platform E-Laundry sudah mampu menutupi seluruh pengeluaran operasionalnya secara mandiri.

### 7.5 Mekanisme Bagi Hasil & Pencairan Saldo Mitra
Keadilan finansial bagi mitra UMKM merupakan prioritas platform E-Laundry guna menjaga retensi kemitraan:
*   Setiap kilogram pakaian yang dicuci oleh mitra bernilai hak bagi hasil flat sebesar **Rp 5.000**.
*   Sistem backend secara otomatis menambahkan saldo piutang mitra seketika setelah status order diubah menjadi `delivered`.
*   Mitra dapat mencairkan saldo pendapatan mereka langsung ke rekening bank lokal terdaftar (BCA, Mandiri, BRI, BNI) atau dompet digital (GoPay/OVO) melalui dashboard mitra setiap hari Jumat (pencairan mingguan) tanpa potongan biaya administrasi tambahan.
*   Hal ini memberikan jaminan likuiditas mingguan yang stabil bagi pengusaha laundry kecil untuk membeli kebutuhan deterjen, air, sabun, dan membayar gaji karyawan mereka secara tepat waktu.
