import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Tag, ArrowRight, ShieldCheck, Star, Sparkles, LayoutGrid, Compass } from 'lucide-react';
import { kosData, campuses } from '../data/dummyData';
import RevealOnScroll from '../components/RevealOnScroll';

// ======================================================================
// KOMPONEN: PROMO SECTION (Untuk Mode Normal)
// ======================================================================
const PromoSection = ({ kosData, onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState(86400);
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec) => `${Math.floor(sec / 3600).toString().padStart(2, '0')}:${Math.floor((sec % 3600) / 60).toString().padStart(2, '0')}:${(sec % 60).toString().padStart(2, '0')}`;
  const promoItems = kosData.filter((k) => k.isPromo);

  if (promoItems.length === 0) return null;

  return (
    <div className="mb-[80px] pt-[48px] border-t border-slate-200/60">
      <RevealOnScroll direction="up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px] mb-[40px]">
          <div className="flex items-center gap-[16px]">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#241812] tracking-tight">Flash Promos</h2>
            <div className="bg-red-50 text-red-600 border border-red-200 px-[16px] py-[8px] rounded-[8px] flex items-center gap-[8px] shadow-sm">
              <span className="w-[8px] h-[8px] bg-red-500 rounded-full animate-pulse shrink-0"></span>
              <span className="text-sm md:text-base font-bold tracking-widest">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </RevealOnScroll>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
        {promoItems.map((kos, index) => (
          <RevealOnScroll key={`promo-${kos.id}`} delay={index * 100} direction="up" className="h-full">
            <div onClick={() => onNavigate(`/detail/${kos.id}`)} className="bg-white/80 backdrop-blur-md rounded-[24px] overflow-hidden border border-red-100 shadow-[0_8px_30px_rgba(239,68,68,0.06)] hover:shadow-[0_20px_40px_rgba(239,68,68,0.12)] hover:-translate-y-[8px] transition-all duration-300 group cursor-pointer flex flex-col h-full relative">
              <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-gradient-to-bl from-red-500/10 to-transparent rounded-bl-full pointer-events-none z-0"></div>
              <div className="relative h-[220px] overflow-hidden shrink-0 bg-slate-100">
                <img src={kos.image} alt={kos.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-[16px] left-[16px] flex flex-col gap-[8px] items-start z-10">
                  <div className="bg-red-500/95 backdrop-blur-sm h-[32px] px-[12px] rounded-[8px] flex items-center gap-[6px] shadow-md">
                    <Sparkles className="w-[14px] h-[14px] text-white shrink-0" /><span className="text-xs font-bold text-white whitespace-nowrap">-{kos.discount}% OFF</span>
                  </div>
                </div>
                <div className="absolute bottom-[16px] left-[16px] bg-[#241812]/90 backdrop-blur-sm text-white text-xs font-bold h-[28px] flex items-center px-[12px] rounded-[8px] shadow-sm whitespace-nowrap z-10">{kos.type}</div>
              </div>
              <div className="p-[24px] flex flex-col flex-1 relative z-10">
                <div className="flex items-start gap-[8px] text-slate-500 text-sm mb-[12px]"><MapPin className="w-[16px] h-[16px] mt-[2px] shrink-0 text-teal-600" /><span className="line-clamp-1 leading-relaxed">{kos.campus}</span></div>
                <h3 className="font-playfair font-bold text-xl text-[#241812] mb-[8px] line-clamp-1 group-hover:text-red-600 transition-colors tracking-tight">{kos.name}</h3>
                <div className="text-sm text-slate-500 mb-[24px] line-clamp-1 flex-1 font-light">{kos.facilities.join(" • ")}</div>
                <div className="flex justify-between items-center pt-[20px] border-t border-red-100/50 mt-auto">
                  <div>
                    <p className="text-[10px] text-red-500 mb-[4px] font-bold uppercase tracking-wider">Harga Promo</p>
                    <div className="flex flex-col">
                      <p className="text-xs text-slate-400 line-through mb-[2px]">Rp {kos.price}</p>
                      <p className="font-extrabold text-red-600 text-lg">Rp {kos.discountedPrice}<span className="text-xs text-red-400 font-normal">/bln</span></p>
                    </div>
                  </div>
                  <button className="bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white w-[40px] h-[40px] flex items-center justify-center rounded-[12px] transition-all duration-300 shrink-0 mt-auto"><ArrowRight className="w-[20px] h-[20px] group-hover:translate-x-[2px] transition-transform" /></button>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
};

// ======================================================================
// KOMPONEN: KARTU PREVIEW MINI (Muncul saat Hover di Mode Explore)
// ======================================================================
const KosPreviewCard = ({ kos }) => {
  if (!kos) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-[280px] bg-white rounded-[16px] shadow-2xl overflow-hidden pointer-events-none z-50 border border-slate-100"
    >
      <div className="relative h-[140px] overflow-hidden bg-slate-100">
        <img src={kos.image} alt={kos.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-[12px] left-[12px] flex items-center gap-[4px]">
          <span className="bg-white/90 backdrop-blur-sm text-[#241812] text-[10px] font-bold px-[8px] py-[2px] rounded-[4px]">{kos.type}</span>
          {kos.isPromo && <span className="bg-red-500 text-white text-[10px] font-bold px-[8px] py-[2px] rounded-[4px] flex items-center gap-[2px]"><Sparkles className="w-[10px] h-[10px]" /> -{kos.discount}%</span>}
        </div>
      </div>
      <div className="p-[16px]">
        <div className="flex items-start justify-between mb-[4px]">
          <h4 className="font-playfair font-bold text-lg text-[#241812] leading-tight truncate">{kos.name}</h4>
          <div className="flex items-center gap-[2px] shrink-0 bg-orange-50 px-[6px] py-[2px] rounded-[4px]"><Star className="w-[12px] h-[12px] fill-orange-500 text-orange-500" /><span className="text-[10px] font-bold text-orange-700">{kos.rating}</span></div>
        </div>
        <div className="flex items-center gap-[4px] text-slate-500 text-xs mb-[12px]"><MapPin className="w-[12px] h-[12px] shrink-0 text-teal-600" /><span className="truncate">{kos.campus}</span></div>
      </div>
    </motion.div>
  );
};

// ======================================================================
// KOMPONEN UTAMA: HALAMAN PENCARIAN (NORMAL + EXPLORE)
// ======================================================================
export default function SearchPage() {
  const navigate = useNavigate();
  
  // GLOBAL STATE (Explore sebagai Default)
  const [viewMode, setViewMode] = useState('explore'); 
  const [activeCampus, setActiveCampus] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('Semua');
  const [hoveredKosId, setHoveredKosId] = useState(null);

  // DATA PEMETAAN ABSTRAK (Koordinat Kampus untuk Mode Explore)
  const campusCoordinates = {
    'UGM': { x: '25%', y: '30%', color: 'border-blue-400', glow: 'bg-blue-400/20' },
    'UI': { x: '70%', y: '25%', color: 'border-yellow-400', glow: 'bg-yellow-400/20' },
    'ITB': { x: '50%', y: '50%', color: 'border-green-400', glow: 'bg-green-400/20' },
    'UB': { x: '20%', y: '70%', color: 'border-purple-400', glow: 'bg-purple-400/20' },
    'Undip': { x: '80%', y: '65%', color: 'border-orange-400', glow: 'bg-orange-400/20' },
    'ITS': { x: '45%', y: '85%', color: 'border-pink-400', glow: 'bg-pink-400/20' }
  };

  // FILTERING LOGIC
  const filteredKos = useMemo(() => {
    return kosData.filter(kos => {
      const matchCampus = activeCampus === 'Semua' || kos.campus.includes(activeCampus);
      const matchSearch = viewMode === 'normal' ? (kos.name.toLowerCase().includes(searchQuery.toLowerCase()) || kos.campus.toLowerCase().includes(searchQuery.toLowerCase())) : true;
      const matchType = viewMode === 'explore' ? (activeType === 'Semua' || kos.type === activeType) : true;
      
      return matchCampus && matchSearch && matchType;
    });
  }, [activeCampus, searchQuery, activeType, viewMode]);

  // HELPER: Menghitung Posisi Orbit & Jarak Kos dari Kampus Utama
  const getOrbitalPosition = (campusName, index, total) => {
    const parentCampusKey = Object.keys(campusCoordinates).find(key => campusName.includes(key));
    const parentCoords = parentCampusKey ? campusCoordinates[parentCampusKey] : { x: '50%', y: '50%' };
    
    // Jika fokus ke SATU KAMPUS spesifik
    if (activeCampus !== 'Semua') {
      const radius = 18 + (index * 5); // Radius lebih lebar agar label tidak terlalu menumpuk
      const angle = (index / total) * Math.PI * 4; // Tersebar melingkar
      const simulatedDistance = Math.floor(radius * 15); // Hitung jarak dummy (meter) berdasarkan radius visual
      
      return { 
        x: `calc(50% + ${Math.cos(angle) * radius}%)`, 
        y: `calc(50% + ${Math.sin(angle) * radius}%)`,
        distance: simulatedDistance
      };
    }

    // Jika menampilkan SEMUA KAMPUS
    const radius = 8 + (Math.random() * 8); 
    const angle = Math.random() * Math.PI * 2; 
    const centerX = parseFloat(parentCoords.x);
    const centerY = parseFloat(parentCoords.y);
    return { 
      x: `calc(${centerX}% + ${Math.cos(angle) * radius}%)`, 
      y: `calc(${centerY}% + ${Math.sin(angle) * radius}%)`,
      distance: null // Tidak perlu jarak di mode makro
    };
  };

  return (
    <div className="w-full min-h-screen relative">
      
      {/* ======================================================================
          FLOATING VIEW TOGGLE (Bisa diakses kapan saja)
          ====================================================================== */}
      <div className="fixed bottom-[32px] left-1/2 -translate-x-1/2 z-[100]">
        <div className="bg-white/80 backdrop-blur-md p-[6px] rounded-full shadow-2xl border border-slate-200/50 flex items-center gap-[4px]">
          <button 
            onClick={() => setViewMode('normal')}
            className={`px-[24px] py-[10px] rounded-full text-sm font-bold flex items-center gap-[8px] transition-all duration-300 ${viewMode === 'normal' ? 'bg-[#241812] text-white shadow-md' : 'text-slate-500 hover:text-[#241812]'}`}
          >
            <LayoutGrid className="w-[16px] h-[16px]" /> Normal
          </button>
          <button 
            onClick={() => setViewMode('explore')}
            className={`px-[24px] py-[10px] rounded-full text-sm font-bold flex items-center gap-[8px] transition-all duration-300 ${viewMode === 'explore' ? 'bg-[#241812] text-white shadow-md' : 'text-slate-500 hover:text-[#241812]'}`}
          >
            <Compass className="w-[16px] h-[16px]" /> Explore
          </button>
        </div>
      </div>

      {/* ======================================================================
          MODE 1: NORMAL VIEW (Grid standar dengan Search Bar)
          ====================================================================== */}
      <AnimatePresence mode="wait">
        {viewMode === 'normal' && (
          <motion.div 
            key="normal-view"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
            className="w-full bg-slate-50 font-sans text-slate-800 flex flex-col pb-[100px]"
          >
            <section className="relative w-full h-[450px] md:h-[500px] rounded-b-[40px] md:rounded-b-[64px] overflow-hidden bg-[#241812] z-10 flex flex-col justify-center items-center px-[16px] shrink-0 pt-[80px] shadow-2xl">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" alt="Interior Background" className="absolute top-0 left-0 w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-teal-900/70 to-teal-900/90"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#241812]/80 via-transparent to-transparent"></div>
              <div className="w-full max-w-[896px] mx-auto text-center relative z-20">
                <RevealOnScroll direction="up" delay={100}><h1 className="font-playfair text-4xl md:text-6xl font-extrabold text-white mb-[24px] drop-shadow-xl tracking-tight">Temukan <span className="italic text-teal-200">Kost Idamanmu</span></h1></RevealOnScroll>
                <RevealOnScroll direction="up" delay={300}>
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-[8px] md:p-[12px] rounded-[24px] md:rounded-[999px] flex flex-col md:flex-row items-center gap-[8px] shadow-2xl shrink-0">
                    <div className="bg-white/90 md:bg-white h-[48px] md:h-[64px] rounded-[16px] md:rounded-[999px] flex items-center px-[20px] flex-1 w-full shadow-inner overflow-hidden shrink-0 transition-all focus-within:bg-white">
                      <Search className="w-[20px] h-[20px] text-teal-700 mr-[12px] shrink-0" />
                      <input type="text" placeholder="Ketik nama kota, area, atau kampus..." className="bg-transparent border-none outline-none w-full text-slate-800 placeholder-slate-500 text-sm md:text-lg font-medium whitespace-nowrap" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <button className="w-full md:w-auto h-[48px] md:h-[64px] bg-orange-500 hover:bg-orange-600 text-white font-bold px-[40px] rounded-[16px] md:rounded-[999px] transition-all shadow-[0_4px_20px_rgba(249,115,22,0.4)] flex items-center justify-center shrink-0 whitespace-nowrap text-base md:text-lg">Cari</button>
                  </div>
                </RevealOnScroll>
              </div>
            </section>

            <div className="max-w-[1280px] w-full mx-auto px-[16px] sm:px-[24px] lg:px-[32px] py-[48px] flex-1 relative z-20">
              <RevealOnScroll direction="up" delay={100}>
                <div className="flex items-center gap-[12px] overflow-x-auto pb-[16px] scrollbar-hide mb-[32px]">
                  <span className="text-sm font-bold text-slate-700 mr-[8px] hidden sm:block shrink-0 whitespace-nowrap">Kampus Populer:</span>
                  {campuses.map(campus => (
                    <button key={campus} onClick={() => setActiveCampus(campus)} className={`h-[40px] px-[24px] rounded-[999px] text-sm font-bold whitespace-nowrap transition-all shadow-sm border shrink-0 ${activeCampus === campus ? 'bg-teal-800 text-white border-teal-800 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-teal-500 hover:text-teal-700'}`}>{campus}</button>
                  ))}
                </div>
              </RevealOnScroll>

              <PromoSection kosData={kosData} onNavigate={navigate} />

              <RevealOnScroll direction="up" delay={200}>
                <div className="flex justify-between items-end mb-[32px]">
                  <div>
                    <h2 className="text-3xl font-playfair font-bold text-[#241812] tracking-tight">Kost Tersedia</h2>
                    <p className="text-base text-slate-500 mt-[4px]">Menampilkan {filteredKos.length} tempat istirahat terbaik</p>
                  </div>
                </div>
              </RevealOnScroll>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[32px]">
                {filteredKos.map((kos, index) => (
                  <RevealOnScroll key={kos.id} delay={(index % 8) * 100} direction="up" className="h-full">
                    <div onClick={() => navigate(`/detail/${kos.id}`)} className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-[8px] transition-all duration-300 group cursor-pointer flex flex-col h-full">
                      <div className="relative h-[220px] overflow-hidden shrink-0 bg-slate-100">
                        <img src={kos.image} alt={kos.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-[16px] left-[16px] flex flex-col gap-[8px] items-start z-10">
                          {kos.isPromo && <div className="bg-red-500/95 backdrop-blur-sm h-[32px] px-[12px] rounded-[8px] flex items-center gap-[6px] shadow-md"><Sparkles className="w-[14px] h-[14px] text-white shrink-0" /><span className="text-xs font-bold text-white whitespace-nowrap">-{kos.discount}% OFF</span></div>}
                          {kos.verified && <div className="bg-white/95 backdrop-blur-sm h-[32px] px-[12px] rounded-[8px] flex items-center gap-[6px] shadow-sm"><ShieldCheck className="w-[16px] h-[16px] text-teal-600 shrink-0" /><span className="text-xs font-bold text-teal-900 whitespace-nowrap">Terverifikasi</span></div>}
                        </div>
                        <div className="absolute bottom-[16px] left-[16px] bg-[#241812]/90 backdrop-blur-sm text-white text-xs font-bold h-[28px] flex items-center px-[12px] rounded-[8px] shadow-sm whitespace-nowrap z-10">{kos.type}</div>
                      </div>
                      <div className="p-[24px] flex flex-col flex-1 relative z-10">
                        <div className="flex items-start gap-[8px] text-slate-500 text-sm mb-[12px]"><MapPin className="w-[16px] h-[16px] mt-[2px] shrink-0 text-teal-600" /><span className="line-clamp-1 leading-relaxed">{kos.campus}</span></div>
                        <h3 className={`font-playfair font-bold text-xl mb-[8px] line-clamp-1 transition-colors tracking-tight ${kos.isPromo ? 'text-[#241812] group-hover:text-red-600' : 'text-[#241812] group-hover:text-teal-700'}`}>{kos.name}</h3>
                        <div className="flex justify-between items-center pt-[20px] border-t mt-auto border-slate-100">
                          {kos.isPromo ? (
                            <div><p className="text-[10px] text-red-500 mb-[4px] font-bold uppercase tracking-wider">Harga Promo</p><div className="flex flex-col"><p className="text-xs text-slate-400 line-through mb-[2px]">Rp {kos.price}</p><p className="font-extrabold text-red-600 text-lg">Rp {kos.discountedPrice}<span className="text-xs text-red-400 font-normal">/bln</span></p></div></div>
                          ) : (
                            <div><p className="text-xs text-slate-400 mb-[4px] uppercase tracking-wider">MULAI DARI</p><p className="font-extrabold text-orange-500 text-lg">Rp {kos.price}<span className="text-xs text-slate-400 font-normal">/bln</span></p></div>
                          )}
                          <button className="w-[40px] h-[40px] flex items-center justify-center rounded-[12px] transition-all duration-300 shrink-0 bg-slate-50 text-slate-600 group-hover:bg-[#241812] group-hover:text-white"><ArrowRight className="w-[20px] h-[20px]" /></button>
                        </div>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================================
          MODE 2: EXPLORE VIEW (Kosmosphere Dinamis - DEFAULT)
          ====================================================================== */}
      <AnimatePresence mode="wait">
        {viewMode === 'explore' && (
          <motion.div 
            key="explore-view"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="w-full min-h-screen bg-[#241812] font-sans text-white flex flex-col overflow-hidden pb-[100px]"
          >
            <div className="pt-[100px] pb-[24px] px-[24px] lg:px-[56px] z-20">
              <h1 className="font-playfair text-4xl md:text-5xl font-light text-[#eae0d5] tracking-tight">Kosmosphere <span className="italic text-teal-400">Explorer</span></h1>
              <p className="text-[#eae0d5]/60 text-sm md:text-base mt-[8px] font-light max-w-[600px]">Jelajahi peta interaktif. Lihat harga secara langsung dan arahkan kursor untuk detail foto.</p>
            </div>

            {/* AREA VISUALISASI UTAMA */}
            <div className="relative flex-1 w-full min-h-[600px] border-y border-white/10 bg-[#1a1310] overflow-hidden rounded-[32px] mx-[24px] lg:mx-[56px] my-[16px] shadow-2xl">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

              {/* RENDER KAMPUS PUSAT (Bila Semua Kampus dipilih) */}
              <AnimatePresence>
                {activeCampus === 'Semua' && Object.entries(campusCoordinates).map(([name, coords]) => (
                  <motion.div key={`campus-${name}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center justify-center" style={{ left: coords.x, top: coords.y }}>
                    <div className={`absolute w-[120px] h-[120px] rounded-full ${coords.glow} blur-[40px] animate-pulse`}></div>
                    <div className={`w-[24px] h-[24px] rounded-full border-2 ${coords.color} border-dashed animate-[spin_10s_linear_infinite]`}></div>
                    <span className="mt-[8px] text-[10px] font-bold uppercase tracking-widest text-white/40">{name}</span>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* TAMPILAN NAMA KAMPUS DI TENGAH (Bila Spesifik) */}
              <AnimatePresence>
                {activeCampus !== 'Semua' && (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
                    <div className="w-[200px] h-[200px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-500/10 blur-[60px] rounded-full"></div>
                    <h2 className="font-playfair text-4xl text-teal-300/30 opacity-50 relative z-10">{activeCampus}</h2>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* RENDER PROPERTI KOS */}
              <AnimatePresence>
                {filteredKos.map((kos, index) => {
                  const pos = getOrbitalPosition(kos.campus, index, filteredKos.length);
                  const isHovered = hoveredKosId === kos.id;

                  return (
                    <motion.div
                      key={`kos-explore-${kos.id}`}
                      layout
                      initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ duration: 0.4, delay: index * 0.02 }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 flex flex-col items-center justify-center"
                      style={{ left: pos.x, top: pos.y }}
                      onMouseEnter={() => setHoveredKosId(kos.id)}
                      onMouseLeave={() => setHoveredKosId(null)}
                      onClick={() => navigate(`/detail/${kos.id}`)}
                    >
                      {activeCampus === 'Semua' ? (
                        
                        /* --- TAMPILAN TITIK CAHAYA (Bila Semua Kampus) --- */
                        <div className="relative flex items-center justify-center">
                          {isHovered && <motion.div layoutId="hoverRing" className="absolute w-[32px] h-[32px] rounded-full border border-white/50" transition={{ duration: 0.2 }} />}
                          <div className={`w-[8px] h-[8px] rounded-full transition-all duration-300 ${kos.isPromo ? 'bg-red-400 shadow-[0_0_15px_rgba(248,113,113,0.8)]' : kos.type === 'Putra' ? 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.6)]' : kos.type === 'Putri' ? 'bg-pink-400 shadow-[0_0_10px_rgba(244,114,182,0.6)]' : 'bg-teal-300 shadow-[0_0_10px_rgba(94,234,212,0.6)]'} ${isHovered ? 'scale-150' : 'scale-100'}`}></div>
                        </div>

                      ) : (

                        /* --- TAMPILAN LABEL HARGA & METERAN (Bila Kampus Spesifik) --- */
                        <div className="relative flex flex-col items-center justify-center group">
                          <div className={`px-[12px] py-[6px] rounded-[12px] flex flex-col items-center shadow-xl transition-all duration-300 border ${isHovered ? 'scale-110 z-50 border-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.4)]' : 'scale-100 z-30 border-white/10'} ${kos.isPromo ? 'bg-red-500 text-white' : 'bg-white/95 backdrop-blur-md text-[#241812]'}`}>
                            <span className={`text-[9px] font-bold uppercase tracking-wider mb-[2px] ${kos.isPromo ? 'text-red-100' : 'text-slate-400'} line-clamp-1 max-w-[80px] text-center`}>{kos.name}</span>
                            <span className="font-extrabold text-xs whitespace-nowrap">Rp {kos.isPromo ? kos.discountedPrice : kos.price}</span>
                          </div>
                          
                          {/* Indikator Jarak Meteran */}
                          <div className={`mt-[6px] bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-[8px] py-[2px] flex items-center gap-[4px] shadow-sm transition-all duration-300 ${isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-80'}`}>
                            <MapPin className="w-[10px] h-[10px] text-teal-400" />
                            <span className="text-[9px] font-bold text-white tracking-widest">{pos.distance}m</span>
                          </div>
                        </div>

                      )}

                      {/* KARTU PREVIEW FULL (Muncul saat di-hover pada kedua mode) */}
                      <AnimatePresence>
                        {isHovered && <KosPreviewCard kos={kos} />}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filteredKos.length === 0 && <div className="absolute inset-0 flex items-center justify-center text-white/40 font-light">Tidak ada properti yang cocok dengan filter saat ini.</div>}
            </div>

            {/* FILTER BAWAH (Khusus Mode Explore) */}
            <div className="px-[24px] lg:px-[56px] py-[24px] bg-[#241812] z-20 flex flex-col md:flex-row items-center justify-center md:justify-start gap-[24px]">
              <div className="flex flex-col gap-[8px]">
                <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Fokus Kampus</label>
                <div className="flex flex-wrap gap-[8px]">
                  {campuses.map(campus => (
                    <button key={`exp-${campus}`} onClick={() => setActiveCampus(campus)} className={`px-[16px] py-[8px] rounded-full text-xs font-medium transition-all border ${activeCampus === campus ? 'bg-teal-700 text-white border-teal-600 shadow-[0_0_15px_rgba(15,118,110,0.4)]' : 'bg-transparent text-white/60 border-white/20 hover:border-white/50 hover:text-white'}`}>{campus}</button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Tipe Hunian</label>
                <div className="flex gap-[8px] bg-white/5 p-[4px] rounded-full border border-white/10">
                  {['Semua', 'Putra', 'Putri', 'Campur'].map(type => (
                    <button key={`type-${type}`} onClick={() => setActiveType(type)} className={`px-[16px] py-[6px] rounded-full text-xs font-medium transition-all ${activeType === type ? 'bg-white text-[#241812] shadow-sm' : 'text-white/60 hover:text-white'}`}>{type}</button>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}