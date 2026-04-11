// src/data/dummyData.jsx
import React from 'react';
import { 
  Home, Search, ShieldCheck, Star, CreditCard, Eye, 
  MapPin, Smartphone, Lock, Sparkles, Wifi, Coffee 
} from 'lucide-react';

// 1. Data Kampus
export const campuses = ['Semua', 'UGM', 'UI', 'ITB', 'UB', 'Undip', 'ITS'];

// 2. Data Master Kost
const baseKosData = [
  { id: 1, name: "KosMate Eksklusif UGM", campus: "UGM Yogyakarta, Sleman", price: "1.500.000", rating: 4.8, type: "Campur", verified: true, facilities: ["AC", "WiFi", "Kamar Mandi Dalam"], image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" },
  { id: 2, name: "Kos Mawar UI Depok", campus: "UI Depok, Beji", price: "1.200.000", rating: 4.5, type: "Putri", verified: true, facilities: ["Kipas", "WiFi", "Dapur Bersama"], image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" },
  { id: 3, name: "Griya ITB Bandung", campus: "ITB Bandung, Coblong", price: "1.800.000", rating: 4.9, type: "Putra", verified: true, facilities: ["AC", "WiFi", "Water Heater", "Parkir Mobil"], image: "https://images.unsplash.com/photo-1598928506311-c55dd1821430?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" },
  { id: 4, name: "Kos Brawijaya Indah", campus: "UB Malang, Lowokwaru", price: "900.000", rating: 4.3, type: "Putri", verified: false, facilities: ["WiFi", "Kamar Mandi Luar", "Akses 24 Jam"], image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" },
  { id: 5, name: "Paviliun Undip Tembalang", campus: "Undip Semarang, Tembalang", price: "1.400.000", rating: 4.6, type: "Campur", verified: true, facilities: ["AC", "WiFi", "Smart TV", "Dapur"], image: "https://images.unsplash.com/photo-1505691938895-1758d7bef511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" },
  { id: 6, name: "Kos Sukolilo ITS", campus: "ITS Surabaya, Sukolilo", price: "1.100.000", rating: 4.2, type: "Putra", verified: false, facilities: ["Kipas", "Kamar Mandi Dalam", "Parkir Motor"], image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" },
  { id: 7, name: "D'Paragon Pogung", campus: "UGM Yogyakarta, Sleman", price: "2.100.000", rating: 4.9, type: "Campur", verified: true, facilities: ["AC", "WiFi", "Kulkas", "Laundry"], image: "https://images.unsplash.com/photo-1497368942940-2e061ddf5948?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" },
  { id: 8, name: "Kos Kutek UI", campus: "UI Depok, Kukusan", price: "1.050.000", rating: 4.4, type: "Putri", verified: true, facilities: ["AC", "Kamar Mandi Luar", "Akses Kunci 24 Jam"], image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" },
  { id: 9, name: "Asrama Cisitu ITB", campus: "ITB Bandung, Cisitu", price: "1.350.000", rating: 4.5, type: "Putra", verified: false, facilities: ["WiFi", "Water Heater", "Balkon"], image: "https://static.mamikos.com/uploads/cache/data/style/2023-01-10/Xt149mwy-540x720.jpg" },
  { id: 10, name: "Suhat Executive", campus: "UB Malang, Soekarno Hatta", price: "2.500.000", rating: 5.0, type: "Campur", verified: true, facilities: ["AC", "Kolam Renang", "Gym", "WiFi"], image: "https://static.mamikos.com/uploads/cache/data/style/2023-01-10/pZNwDuDA.-540x720.jpg" },
  { id: 11, name: "Kos Tirto Agung", campus: "Undip Semarang, Pedalangan", price: "850.000", rating: 4.1, type: "Putra", verified: false, facilities: ["Kipas", "Parkir Luas", "Kantin"], image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" },
  { id: 12, name: "Griya Keputih ITS", campus: "ITS Surabaya, Keputih", price: "1.450.000", rating: 4.7, type: "Putri", verified: true, facilities: ["AC", "WiFi", "Dapur Bersama", "CCTV"], image: "https://static.mamikos.com/uploads/cache/data/style/2025-01-09/91mvnVdb-540x720.jpg" },
  { id: 13, name: "Kos Seturan Nyaman", campus: "UGM Yogyakarta, Seturan", price: "1.750.000", rating: 4.6, type: "Campur", verified: true, facilities: ["AC", "Smart TV", "Kamar Mandi Dalam"], image: "https://static.mamikos.com/uploads/cache/data/style/2023-08-04/DlYvk8D4-540x720.jpg" },
  { id: 14, name: "Pondok Cina Minimalis", campus: "UI Depok, Pondok Cina", price: "1.600.000", rating: 4.8, type: "Putra", verified: true, facilities: ["AC", "WiFi", "Ruang Belajar"], image: "https://images.unsplash.com/photo-1540518614846-1536a65249a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" }
];

// 3. Logika Generator Promo (Tereksekusi otomatis saat file di-import)
export const kosData = (() => {
  const shuffledIndices = [...Array(baseKosData.length).keys()].sort(() => 0.5 - Math.random());
  const promoIndices = shuffledIndices.slice(0, 4);
  const discountOptions = [10, 15, 13, 20, 25, 12];

  return baseKosData.map((kos, index) => {
    if (promoIndices.includes(index)) {
      const discount = discountOptions[Math.floor(Math.random() * discountOptions.length)];
      const originalPrice = parseInt(kos.price.replace(/\./g, ''), 10);
      const discountedPrice = originalPrice - (originalPrice * discount / 100);
      return {
        ...kos,
        isPromo: true,
        discount,
        discountedPrice: discountedPrice.toLocaleString('id-ID').replace(/,/g, '.')
      };
    }
    return { ...kos, isPromo: false };
  });
})();

// 4. Kumpulan Gambar untuk Halaman Galeri Full (Bento Box)
export const galleryImagesPool = [
  ...baseKosData.map(k => k.image),
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1b5594b281?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7bef511?auto=format&fit=crop&w=1920&q=80"
].sort(() => 0.5 - Math.random());

// 5. Data Tim (Halaman About)
export const teamMembers = [
  { id: 1, name: "Akmal W", role: "Ketua Kelompok", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80", bio: "Visioner di balik KosMate dengan 10 tahun pengalaman di industri proptech. Mengutamakan kenyamanan pengguna di atas segalanya." },
  { id: 2, name: "Sekarayu A", role: "Anggota #2", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80", bio: "Arsitek di balik antarmuka mewah dan pengalaman pengguna yang seamless yang membedakan KosMate dari yang lain." },
  { id: 3, name: "Elisya A", role: "Anggota #3", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80", bio: "Pakar infrastruktur cloud yang memastikan platform KosMate berjalan sangat cepat, stabil, dan aman sepanjang waktu." },
  { id: 4, name: "Fawwaz S", role: "Anggota #4", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80", bio: "Ahli strategi pemasaran yang membawa KosMate ke seluruh penjuru nusantara dengan kampanye yang menginspirasi." },
  { id: 5, name: "Devi I", role: "Anggota #5", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", bio: "Pengembang tangal yang menerjemahkan bahasa desain visual ke dalam baris kode pixel-perfect dengan performa tinggi." }
];

// 6. Data Fitur (Landing Page)
export const features = [
  { title: "Smart Search & Filter", description: "Filter lengkap (lokasi, harga, fasilitas) bantu kamu temukan kos idaman tanpa ribet.", icon: <Search className="w-[32px] h-[32px] text-teal-500 shrink-0" /> },
  { title: "Informasi Transparan", description: "Foto asli, deskripsi kamar, rincian harga lengkap. No hidden fee!", icon: <Home className="w-[32px] h-[32px] text-teal-500 shrink-0" /> },
  { title: "Verified Kost", description: "Setiap properti dicek keasliannya. Label 'Verified' menjamin keamanan dan bebas penipuan.", icon: <ShieldCheck className="w-[32px] h-[32px] text-teal-500 shrink-0" /> },
  { title: "Review & Rating Asli", description: "Ulasan jujur dari penghuni sebelumnya untuk gambaran realistis kondisi kos sebenarnya.", icon: <Star className="w-[32px] h-[32px] text-teal-500 shrink-0" /> },
  { title: "Booking & Bayar Online", description: "Reservasi kamar dan bayar aman dari mana saja. Cocok buat kamu yang belum bisa survei.", icon: <CreditCard className="w-[32px] h-[32px] text-teal-500 shrink-0" /> },
  { title: "Virtual Tour 360°", description: "Lihat kondisi kamar secara menyeluruh lewat layar HP kamu sebelum deal.", icon: <Eye className="w-[32px] h-[32px] text-teal-500 shrink-0" /> }
];

// 7. Data Langkah Penggunaan (Landing Page)
export const steps = [
  { step: "01", title: "Cari Kos Sesuai Lokasi", description: "Gunakan fitur pencarian untuk menemukan kos di dekat kampus atau kantor.", icon: <MapPin className="w-[40px] h-[40px] text-teal-600 shrink-0" /> },
  { step: "02", title: "Bandingkan Pilihan", description: "Cek fasilitas, baca review asli, dan bandingkan harga antar kos dengan mudah.", icon: <Search className="w-[40px] h-[40px] text-teal-600 shrink-0" /> },
  { step: "03", title: "Pesan & Hubungi Pemilik", description: "Booking langsung via aplikasi dengan pembayaran aman tanpa perantara.", icon: <Smartphone className="w-[40px] h-[40px] text-teal-600 shrink-0" /> }
];

// 8. Data Slideshow Lokasi
export const locationSlides = [
  { img: "https://ui.kompas.id/wp-content/uploads/2020/09/kampus-ui-shutterstock-featured-default.jpg", text: ["DEPOK,", "UNIVERSITAS INDONESIA"] },
  { img: "https://uisi.ac.id/assets/upload/article/1280x572/69a541e6e8cfc4697562707faa0795c8.jpg", text: ["BANDUNG,", "INSTITUT TEKNOLOGI BANDUNG"] },
  { img: "https://cdn.antaranews.com/cache/1200x800/2021/06/09/IMG_20210609_235450.jpg", text: ["YOGYAKARTA,", "UNIVERSITAS GADJAH MADA"] },
  { img: "https://prasetya.ub.ac.id/wp-content/uploads/2022/01/Unibraw-Rektorat-Pagi-scaled.jpg", text: ["MALANG,", "UNIVERSITAS BRAWIJAYA"] },
  { img: "https://www.its.ac.id/wp-content/uploads/2020/12/slider-1-1.jpg", text: ["SURABAYA,", "INSTITUT TEKNOLOGI SEP NOPEMBER"] },
];

// 9. Fungsi Helper Detail Kost (Menggabungkan Gambar Acak & Deskripsi)
export const getRichKosData = (kos) => {
  const interiorPool = [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1b5594b281?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1505691938895-1758d7bef511?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1512918580421-6c84b423dd71?auto=format&fit=crop&w=1920&q=80",
  ];
  
  const shuffledInteriors = interiorPool.filter(img => img !== kos.image).sort(() => 0.5 - Math.random()).slice(0, 4);

  return {
    ...kos,
    gallery: [kos.image, ...shuffledInteriors],
    description: `Rasakan pengalaman menetap yang tak tertandingi di ${kos.name}. Dirancang khusus untuk mengutamakan privasi dan kenyamanan, properti ini menawarkan perpaduan sempurna antara estetika modern dan fungsionalitas.\n\nSetiap sudut ruangan didesain dengan saksama menggunakan material premium, pencahayaan alami yang optimal, serta sirkulasi udara yang menyegarkan. Berlokasi strategis hanya beberapa langkah dari ${kos.campus}, properti ini membebaskan Anda dari stres kemacetan harian. Nikmati akses eksklusif ke berbagai fasilitas kelas atas yang dikurasi khusus untuk mendukung gaya hidup produktif sekaligus memberikan relaksasi maksimal.`,
    uniqueFeatures: [
      { title: "Smart Door Lock", desc: "Akses kamar menggunakan PIN & RFID khusus.", icon: <Lock className="w-[20px] h-[20px] text-[#241812]" /> },
      { title: "Weekly Cleaning", desc: "Layanan pembersihan kamar gratis setiap minggunya.", icon: <Sparkles className="w-[20px] h-[20px] text-[#241812]" /> },
      { title: "High-Speed WiFi", desc: "Koneksi internet dedikasi hingga 100Mbps.", icon: <Wifi className="w-[20px] h-[20px] text-[#241812]" /> },
      { title: "Premium Lounge", desc: "Area komunal mewah untuk bekerja atau bersantai.", icon: <Coffee className="w-[20px] h-[20px] text-[#241812]" /> }
    ],
    reviewsList: [
      { id: 1, name: "Joko Wi", date: "Oktober 2025", rating: 5, text: "Sangat nyaman dan aman. Penjaganya super ramah, fasilitas selalu bersih dan wangi. Worth the price!" },
      { id: 2, name: "Aldi Burger", date: "Agustus 2025", rating: kos.rating >= 4.5 ? 5 : 4, text: "Desain interior kamarnya sangat estetik. Cocok banget buat mahasiswa/pekerja karena suasananya tenang banget." },
      { id: 3, name: "Pak Basu", date: "Juli 2025", rating: 5, text: "Lokasi paling strategis! Gampang cari makan dan akses ke kampus benar-benar tinggal jalan kaki saja." }
    ]
  };
};