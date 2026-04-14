// src/data/dummyData.jsx
import React from 'react';
import { 
  Home, Search, ShieldCheck, Star, CreditCard, Eye, 
  MapPin, Smartphone, Lock, Sparkles, Wifi, Coffee 
} from 'lucide-react';

import fotoAkmal from '../images/akmal.jpg';
import fotoSekarayu from '../images/sekarayu.jpg';
import fotoElisya from '../images/elisya.jpg';
import fotoFawwaz from '../images/fawwaz.jpg';
import fotoDevi from '../images/devi.jpg';

export const campuses = ['Semua', 'UGM', 'UI', 'ITB', 'UB', 'Undip', 'ITS'];

export const facultiesByCampus = {
  'UGM': ['FEB UGM', 'Fakultas Teknik', 'Fakultas Hukum', 'Fisipol'],
  'UI': ['Fasilkom', 'FEB UI', 'Fakultas Teknik', 'FIB'],
  'ITB': ['STEI', 'SBM', 'FTMD', 'FSRD'],
  'UB': ['FEB UB', 'FILKOM', 'Fakultas Hukum'],
  'Undip': ['FEB Undip', 'FSM', 'Fakultas Teknik'],
  'ITS': ['FTEIC', 'FT-IRS', 'FTSPK']
};

const baseKosData = [
  { id: 1, name: "KosMate Eksklusif UGM", campus: "UGM Yogyakarta, Sleman", price: "1.500.000", priceNum: 1500000, rating: 4.8, type: "Campur", propertyType: "Kos", verified: true, facilities: ["AC", "WiFi", "Kamar Mandi Dalam"], distances: { "FEB UGM": 300, "Fakultas Hukum": 850, "Fisipol": 700 }, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", lastUpdate: "2 Hari yang lalu", roomsAvailable: 2, additionalFees: "Kamar berdua: +Rp 500.000/bulan. Listrik: Token prabayar (tanggungan penyewa)." },
  { id: 2, name: "Kos Mawar UI Depok", campus: "UI Depok, Beji", price: "1.200.000", priceNum: 1200000, rating: 4.5, type: "Putri", propertyType: "Apartment", verified: true, facilities: ["Kipas", "WiFi", "Dapur Bersama"], distances: { "Fasilkom": 400, "FEB UI": 900 }, image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", lastUpdate: "1 Minggu yang lalu", roomsAvailable: 1, additionalFees: "Kamar berdua: Tidak diizinkan. Parkir Mobil: +Rp 150.000/bulan." },
  { id: 3, name: "Griya ITB Bandung", campus: "ITB Bandung, Coblong", price: "1.800.000", priceNum: 1800000, rating: 4.9, type: "Putra", propertyType: "Rumah", verified: true, facilities: ["AC", "WiFi", "Water Heater", "Parkir Mobil"], distances: { "STEI": 250, "SBM": 600 }, image: "https://static.mamikos.com/uploads/cache/data/style/2025-11-28/RWY5LhZw-360x480.jpg", lastUpdate: "Hari ini", roomsAvailable: 4, additionalFees: "Sudah termasuk air dan listrik (pemakaian wajar). Bawa alat elektronik daya besar: +Rp 50.000/item." },
  { id: 4, name: "Kos Brawijaya Indah", campus: "UB Malang, Lowokwaru", price: "900.000", priceNum: 900000, rating: 4.3, type: "Putri", propertyType: "Kos", verified: false, facilities: ["WiFi", "Kamar Mandi Luar", "Akses 24 Jam"], distances: { "FEB UB": 500, "FILKOM": 800 }, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", lastUpdate: "3 Hari yang lalu", roomsAvailable: 0, additionalFees: "Kamar berdua: +Rp 300.000/bulan. Laundry: Bayar sesuai timbangan." },
  { id: 5, name: "Paviliun Undip Tembalang", campus: "Undip Semarang, Tembalang", price: "1.400.000", priceNum: 1400000, rating: 4.6, type: "Campur", propertyType: "Apartment", verified: true, facilities: ["AC", "WiFi", "Smart TV", "Dapur Bersama"], distances: { "FEB Undip": 350, "FSM": 700 }, image: "https://static.mamikos.com/uploads/cache/data/style/2026-01-14/8zk1q5F8-540x720.jpg", lastUpdate: "2 Minggu yang lalu", roomsAvailable: 3, additionalFees: "Listrik prabayar. Tambahan orang menginap (tamu): Rp 50.000/hari." },
  { id: 6, name: "Kos Sukolilo ITS", campus: "ITS Surabaya, Sukolilo", price: "1.100.000", priceNum: 1100000, rating: 4.2, type: "Putra", propertyType: "Kos", verified: false, facilities: ["Kipas", "Kamar Mandi Dalam", "Parkir Motor"], distances: { "FTEIC": 450, "FT-IRS": 900 }, image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", lastUpdate: "5 Jam yang lalu", roomsAvailable: 1, additionalFees: "Air dan listrik sudah termasuk. Kamar berdua: +Rp 400.000/bulan." },
  { id: 7, name: "D'Paragon Pogung", campus: "UGM Yogyakarta, Sleman", price: "2.100.000", priceNum: 2100000, rating: 4.9, type: "Campur", propertyType: "Rumah", verified: true, facilities: ["AC", "WiFi", "Kamar Mandi Dalam", "Laundry"], distances: { "FEB UGM": 1200, "Fakultas Teknik": 600 }, image: "https://static.mamikos.com/uploads/cache/data/style/2026-04-03/znaG7sT9-540x720.jpg", lastUpdate: "Kemarin", roomsAvailable: 5, additionalFees: "Harga all-in (Air, Listrik, Laundry bulanan terbatas). Bawa hewan peliharaan: Deposit +Rp 500.000." },
  { id: 8, name: "Kos Kutek UI", campus: "UI Depok, Kukusan", price: "1.050.000", priceNum: 1050000, rating: 4.4, type: "Putri", propertyType: "Kos", verified: true, facilities: ["AC", "WiFi", "Kamar Mandi Luar"], distances: { "Fakultas Teknik": 300, "FEB UI": 1500 }, image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", lastUpdate: "1 Bulan yang lalu", roomsAvailable: 2, additionalFees: "Kamar berdua: +Rp 350.000. Tamu pria dilarang masuk area kamar." },
  { id: 9, name: "Asrama Cisitu ITB", campus: "ITB Bandung, Cisitu", price: "1.350.000", priceNum: 1350000, rating: 4.5, type: "Putra", propertyType: "Apartment", verified: false, facilities: ["WiFi", "Water Heater", "Kamar Mandi Dalam"], distances: { "FTMD": 500, "FSRD": 900 }, image: "https://static.mamikos.com/uploads/cache/data/style/2023-01-10/Xt149mwy-540x720.jpg", lastUpdate: "Hari ini", roomsAvailable: 1, additionalFees: "Listrik token. Iuran kebersihan lingkungan: Rp 20.000/bulan." },
  { id: 10, name: "Suhat Executive", campus: "UB Malang, Soekarno Hatta", price: "2.500.000", priceNum: 2500000, rating: 5.0, type: "Campur", propertyType: "Rumah", verified: true, facilities: ["AC", "Kamar Mandi Dalam", "Gym", "WiFi"], distances: { "FEB UB": 1500, "Fakultas Hukum": 1800 }, image: "https://static.mamikos.com/uploads/cache/data/style/2023-01-10/pZNwDuDA.-540x720.jpg", lastUpdate: "Baru saja", roomsAvailable: 2, additionalFees: "Harga all-in. Fasilitas gym dan kolam renang gratis untuk penyewa. Kamar berdua: +Rp 800.000." },
  { id: 11, name: "Kos Tirto Agung", campus: "Undip Semarang, Pedalangan", price: "850.000", priceNum: 850000, rating: 4.1, type: "Putra", propertyType: "Kos", verified: false, facilities: ["Kipas", "WiFi"], distances: { "Fakultas Teknik": 600, "FEB Undip": 1200 }, image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", lastUpdate: "3 Minggu yang lalu", roomsAvailable: 0, additionalFees: "Listrik bayar patungan bulanan. Tidak ada parkir mobil." },
  { id: 12, name: "Griya Keputih ITS", campus: "ITS Surabaya, Keputih", price: "1.450.000", priceNum: 1450000, rating: 4.7, type: "Putri", propertyType: "Apartment", verified: true, facilities: ["AC", "WiFi", "Dapur Bersama", "Kamar Mandi Dalam"], distances: { "FTSPK": 400, "FTEIC": 1100 }, image: "https://static.mamikos.com/uploads/cache/data/style/2025-01-09/91mvnVdb-540x720.jpg", lastUpdate: "4 Hari yang lalu", roomsAvailable: 3, additionalFees: "Kamar berdua: +Rp 500.000. Jam malam berlaku." },
  { id: 13, name: "Kos Seturan Nyaman", campus: "UGM Yogyakarta, Seturan", price: "1.750.000", priceNum: 1750000, rating: 4.6, type: "Campur", propertyType: "Apartment", verified: true, facilities: ["AC", "Smart TV", "Kamar Mandi Dalam", "WiFi"], distances: { "FEB UGM": 2500, "Fisipol": 2800 }, image: "https://static.mamikos.com/uploads/cache/data/style/2023-08-04/DlYvk8D4-540x720.jpg", lastUpdate: "1 Hari yang lalu", roomsAvailable: 2, additionalFees: "Listrik token. Parkir mobil terbatas, harap konfirmasi. Kamar berdua: +Rp 450.000." },
  { id: 14, name: "Pondok Cina Minimalis", campus: "UI Depok, Pondok Cina", price: "1.600.000", priceNum: 1600000, rating: 4.8, type: "Putra", propertyType: "Rumah", verified: true, facilities: ["AC", "WiFi", "Kamar Mandi Dalam"], distances: { "FIB": 500, "Fasilkom": 800 }, image: "https://static.mamikos.com/uploads/cache/data/style/2023-07-13/LV0xlx2z-540x720.jpg", lastUpdate: "2 Hari yang lalu", roomsAvailable: 1, additionalFees: "Harga all-in (termasuk cuci gosok 10kg/bulan). Kamar berdua: +Rp 600.000." },
  { id: 15, name: "Kos Margonda Premium", campus: "UI Depok, Margonda", price: "1.300.000", priceNum: 1300000, rating: 4.4, type: "Putri", propertyType: "Kos", verified: true, facilities: ["AC", "WiFi", "Kamar Mandi Dalam"], distances: { "Fasilkom": 600, "FEB UI": 1100 }, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1920&q=80", lastUpdate: "Hari ini", roomsAvailable: 3, additionalFees: "Listrik token. Parkir motor Rp 50.000/bulan." },
  { id: 16, name: "Apartemen Mataram City", campus: "UGM Yogyakarta, Caturtunggal", price: "3.200.000", priceNum: 3200000, rating: 4.7, type: "Campur", propertyType: "Apartment", verified: true, facilities: ["AC", "WiFi", "Kolam Renang", "Gym", "Kamar Mandi Dalam"], distances: { "FEB UGM": 1800, "Fisipol": 2000 }, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80", lastUpdate: "2 Hari yang lalu", roomsAvailable: 2, additionalFees: "Harga all-in. IPL Rp 200.000/bulan." },
  { id: 17, name: "Rumah Sewa Tembalang Asri", campus: "Undip Semarang, Tembalang", price: "4.500.000", priceNum: 4500000, rating: 4.8, type: "Campur", propertyType: "Rumah", verified: true, facilities: ["AC", "WiFi", "Dapur Pribadi", "Parkir Mobil", "Taman"], distances: { "FEB Undip": 900, "FSM": 1400 }, image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1920&q=80", lastUpdate: "Kemarin", roomsAvailable: 1, additionalFees: "Sewa 1 unit penuh. Min. kontrak 6 bulan." },
  { id: 18, name: "Kos Keputih Garden", campus: "ITS Surabaya, Keputih", price: "980.000", priceNum: 980000, rating: 4.2, type: "Putra", propertyType: "Kos", verified: false, facilities: ["Kipas", "Kamar Mandi Luar", "WiFi"], distances: { "FTEIC": 300, "FTSPK": 750 }, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1920&q=80", lastUpdate: "5 Hari yang lalu", roomsAvailable: 4, additionalFees: "Air dan listrik sudah termasuk." },
  { id: 19, name: "Apartemen Taman Melati", campus: "UGM Yogyakarta, Sleman", price: "2.800.000", priceNum: 2800000, rating: 4.9, type: "Campur", propertyType: "Apartment", verified: true, facilities: ["AC", "WiFi", "Smart TV", "Laundry", "Kamar Mandi Dalam", "Dapur"], distances: { "FEB UGM": 800, "Fakultas Teknik": 500 }, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1920&q=80", lastUpdate: "Baru saja", roomsAvailable: 1, additionalFees: "Listrik prabayar. Akses rooftop gratis." },
  { id: 20, name: "Rumah Kos Dago Bandung", campus: "ITB Bandung, Dago", price: "5.000.000", priceNum: 5000000, rating: 5.0, type: "Campur", propertyType: "Rumah", verified: true, facilities: ["AC", "WiFi", "Kolam Renang", "Dapur Pribadi", "Parkir Mobil", "Water Heater"], distances: { "STEI": 1200, "FSRD": 1500 }, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80", lastUpdate: "1 Hari yang lalu", roomsAvailable: 1, additionalFees: "Sewa rumah penuh 4 kamar. Cocok untuk sharing 4 orang." },
  { id: 21, name: "Kos Manyar Rejo ITS", campus: "ITS Surabaya, Manyar", price: "1.150.000", priceNum: 1150000, rating: 4.3, type: "Putri", propertyType: "Kos", verified: true, facilities: ["AC", "WiFi", "Kamar Mandi Dalam"], distances: { "FT-IRS": 400, "FTSPK": 900 }, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1920&q=80", lastUpdate: "3 Hari yang lalu", roomsAvailable: 2, additionalFees: "Kamar berdua: +Rp 350.000. Jam malam pukul 22:00." },
  { id: 22, name: "Apartemen Tlogosari", campus: "Undip Semarang, Tlogosari", price: "2.400.000", priceNum: 2400000, rating: 4.5, type: "Campur", propertyType: "Apartment", verified: true, facilities: ["AC", "WiFi", "Balkon", "Kamar Mandi Dalam", "Dapur"], distances: { "Fakultas Teknik": 1500, "FSM": 1800 }, image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1920&q=80", lastUpdate: "1 Minggu yang lalu", roomsAvailable: 3, additionalFees: "Listrik dan air all-in. Akses 24 jam." },
  { id: 23, name: "Kos Veteran Malang", campus: "UB Malang, Dinoyo", price: "850.000", priceNum: 850000, rating: 4.0, type: "Putra", propertyType: "Kos", verified: false, facilities: ["Kipas", "WiFi", "Kamar Mandi Luar"], distances: { "FILKOM": 350, "FEB UB": 700 }, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1920&q=80", lastUpdate: "2 Minggu yang lalu", roomsAvailable: 0, additionalFees: "Biaya air Rp 30.000/bulan terpisah." },
  { id: 24, name: "Rumah Meruya UI Depok", campus: "UI Depok, Beji", price: "6.500.000", priceNum: 6500000, rating: 4.6, type: "Campur", propertyType: "Rumah", verified: true, facilities: ["AC", "WiFi", "Dapur Pribadi", "Taman", "Parkir Mobil", "CCTV"], distances: { "FIB": 700, "Fasilkom": 1200 }, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80", lastUpdate: "4 Hari yang lalu", roomsAvailable: 1, additionalFees: "Sewa rumah 5 kamar. Bisa untuk komunitas/organisasi." },
  { id: 25, name: "Apartemen Cisitu View", campus: "ITB Bandung, Cisitu", price: "3.500.000", priceNum: 3500000, rating: 4.8, type: "Campur", propertyType: "Apartment", verified: true, facilities: ["AC", "WiFi", "Rooftop", "Gym", "Kamar Mandi Dalam", "Smart Lock"], distances: { "STEI": 400, "SBM": 800 }, image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1920&q=80", lastUpdate: "Hari ini", roomsAvailable: 2, additionalFees: "Termasuk IPL dan akses fasilitas gedung." }
];

export const kosData = baseKosData.map((kos) => {
  if (kos.id % 3 === 0) {
    const discountOptions = [10, 15, 13, 20, 25, 12];
    const discount = discountOptions[kos.id % discountOptions.length];
    const discountedPriceNum = kos.priceNum - (kos.priceNum * discount / 100);
    return {
      ...kos,
      isPromo: true,
      discount,
      discountedPriceNum: discountedPriceNum,
      discountedPrice: discountedPriceNum.toLocaleString('id-ID').replace(/,/g, '.')
    };
  }
  return { ...kos, isPromo: false, discountedPriceNum: kos.priceNum };
});

export const galleryImagesPool = [
  ...baseKosData.map(k => k.image),
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1920&q=80"
].sort((a, b) => a.length - b.length); 

export const teamMembers = [
  { 
    id: 1, 
    name: "Akmal W", 
    role: "Ketua Kelompok", 
    image: fotoAkmal, // <-- Gunakan variabel tanpa tanda kutip
    bio: "Visioner di balik KosMate dengan 10 tahun pengalaman di industri proptech. Mengutamakan kenyamanan pengguna di atas segalanya." 
  },
  { 
    id: 2, 
    name: "Sekarayu A", 
    role: "Anggota #1", 
    image: fotoSekarayu, 
    bio: "Arsitek di balik antarmuka mewah dan pengalaman pengguna yang seamless yang membedakan KosMate dari yang lain." 
  },
  { 
    id: 3, 
    name: "Elisya A", 
    role: "Anggota #2", 
    image: fotoElisya, 
    bio: "Pakar infrastruktur cloud yang memastikan platform KosMate berjalan sangat cepat, stabil, dan aman sepanjang waktu." 
  },
  { 
    id: 4, 
    name: "Fawwaz S", 
    role: "Anggota #3", 
    image: fotoFawwaz, 
    bio: "Ahli strategi pemasaran yang membawa KosMate ke seluruh penjuru nusantara dengan kampanye yang menginspirasi." 
  },
  { 
    id: 5, 
    name: "Devi I", 
    role: "Anggota #4", 
    image: fotoDevi, 
    bio: "Pengembang tangal yang menerjemahkan bahasa desain visual ke dalam baris kode pixel-perfect dengan performa tinggi." 
  }
];

export const features = [
  { title: "Smart Search & Filter", description: "Filter lengkap (lokasi, harga, fasilitas) bantu kamu temukan kos idaman tanpa ribet.", icon: <Search className="w-[32px] h-[32px] text-teal-500 shrink-0" /> },
  { title: "Informasi Transparan", description: "Foto asli, deskripsi kamar, rincian harga lengkap. No hidden fee!", icon: <Home className="w-[32px] h-[32px] text-teal-500 shrink-0" /> }
];

export const steps = [
  { step: "01", title: "Cari Kos Sesuai Lokasi", description: "Gunakan fitur pencarian untuk menemukan kos di dekat kampus atau kantor.", icon: <MapPin className="w-[40px] h-[40px] text-teal-600 shrink-0" /> },
  { step: "02", title: "Bandingkan Pilihan", description: "Cek fasilitas, baca review asli, dan bandingkan harga antar kos dengan mudah.", icon: <Search className="w-[40px] h-[40px] text-teal-600 shrink-0" /> }
];

export const locationSlides = [
  { img: "https://media.quipper.com/media/W1siZiIsIjIwMTgvMDEvMjMvMDkvMzYvMzMvNzA2ZWNhMjctZTkzZC00ZjM0LWI0NTAtNTFjNDMwNjgwOGYwLyJdLFsicCIsInRodW1iIiwiMTIwMHhcdTAwM2UiXSxbInAiLCJjb252ZXJ0IiwiLWNvbG9yc3BhY2Ugc1JHQiAtc3RyaXAiLHsiZm9ybWF0IjoianBnIn1dXQ", text: ["DEPOK,", "UNIVERSITAS INDONESIA"] },
  { img: "https://zjglidcehtsqqqhbdxyp.supabase.co/storage/v1/object/public/atourin/images/destination/bandung/institut-teknologi-bandung-profile1695282317.jpeg?x-image-process=image/resize,p_100,limit_1/imageslim", text: ["BANDUNG,", "INSTITUT TEKNOLOGI BANDUNG"] },
  { img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEge2UsCaDGcOmMHAtqt5uPbJZavCmiYjf4fmRQs5HRteD3frHVUz_WJSUDwIbgBONT98lT09LAYnL7qiK2xc2x9mZfGlaa7RcEiwHK6q01Sdf1cZdGinEAb6O04A6M_xzKikx5yTtOo_Pfu/s1300/2017_10_17_34201_1508237640._large.jpg", text: ["YOGYAKARTA,", "UNIVERSITAS GADJAH MADA"] },
  { img: "https://serayunews.pw/wp-content/uploads/2025/01/Universitas-Brawijaya-.jpg", text: ["MALANG,", "UNIVERSITAS BRAWIJAYA"] },
  { img: "https://tugujatim.id/wp-content/uploads/2024/03/5f6b8d6b-87aa-408d-91d6-000d50343e56-1.jpeg", text: ["SURABAYA,", "INSTITUT TEKNOLOGI SEP NOPEMBER"] },
];

export const getRichKosData = (kos) => {
  const interiorPool = [
    "https://i0.wp.com/rancangrekaruang.id/wp-content/uploads/2023/01/Arsitek-Semarang-Desain-Interior-Kost-Modern-Kontemporer-Ibu-Yutta-07.jpg",
    "https://www.ruparupa.com/blog/wp-content/uploads/2021/08/Screenshot-2021-08-09-170709.png",
    "https://arsigriya.id/wp-content/uploads/2023/06/12-2.png",
    "https://rancangrekaruang.id/wp-content/uploads/2023/01/Arsitek-Semarang-Desain-Interior-Kost-Modern-Kontemporer-Ibu-Yutta-00.jpg"
  ];
  
  const filtered = interiorPool.filter(img => img !== kos.image);
  const startIndex = kos.id % filtered.length;
  const shuffledInteriors = [
    ...filtered.slice(startIndex),
    ...filtered.slice(0, startIndex)
  ].slice(0, 4);

  return {
    ...kos,
    gallery: [kos.image, ...shuffledInteriors],
    description: `Rasakan pengalaman menetap yang tak tertandingi di ${kos.name}. Dirancang khusus untuk mengutamakan privasi dan kenyamanan, properti ini menawarkan perpaduan sempurna antara estetika modern dan fungsionalitas.\n\nBerlokasi strategis hanya beberapa langkah dari ${kos.campus}, properti ini membebaskan Anda dari stres kemacetan harian.`,
    uniqueFeatures: [
      { title: "Smart Door Lock", desc: "Akses kamar menggunakan PIN & RFID khusus.", icon: <Lock className="w-[20px] h-[20px] text-[#241812]" /> },
      { title: "Weekly Cleaning", desc: "Layanan pembersihan kamar gratis setiap minggunya.", icon: <Sparkles className="w-[20px] h-[20px] text-[#241812]" /> },
      { title: "High-Speed WiFi", desc: "Koneksi internet dedikasi hingga 100Mbps.", icon: <Wifi className="w-[20px] h-[20px] text-[#241812]" /> }
    ],
    rules: [
      "Tamu menginap wajib lapor pemilik/penjaga kos.",
      "Dilarang membawa hewan peliharaan (anjing/kucing).",
      "Dilarang merokok di dalam kamar tidur.",
      "Akses pintu utama/pagar ditutup pukul 23:00 WIB (kecuali shift malam)."
    ],
    terms: [
      "Penyewa wajib melampirkan KTP dan Kartu Tanda Mahasiswa / ID Card Pegawai yang masih berlaku saat pengajuan sewa.",
      "Uang Muka (Booking) tidak dapat dikembalikan apabila penyewa membatalkan sewa sepihak.",
      "Pembayaran sewa bulanan wajib dilunasi paling lambat tanggal 5 setiap bulannya.",
      "Minimal masa sewa adalah 3 bulan. Pemutusan sewa di bawah 3 bulan akan dikenakan penalti sebesar 50% dari harga sewa satu bulan."
    ],
    reviewsList: [
      { id: 1, name: "Joko Wi", date: "Oktober 2025", rating: 5, text: "Sangat nyaman dan aman. Worth the price!" },
      { id: 2, name: "Aldi Burger", date: "Agustus 2025", rating: kos.rating >= 4.5 ? 5 : 4, text: "Desain interior kamarnya sangat estetik. Cocok banget." }
    ]
  };
};