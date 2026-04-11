import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Sparkles, ShieldCheck, Star, ArrowRight, LayoutGrid, Compass, SlidersHorizontal, Navigation } from 'lucide-react';
import { kosData, campuses, facultiesByCampus } from '../data/dummyData';
import RevealOnScroll from '../components/RevealOnScroll';
import AnimatedDropdown from '../components/ui/animated-dropdown';

// ... (Komponen KosPreviewCard & PromoSection tetap ada untuk mode explore & promo biasa) ...
const KosPreviewCard = ({ kos }) => {
  if (!kos) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.2 }} className="absolute bottom-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-[280px] bg-white rounded-[16px] shadow-2xl overflow-hidden pointer-events-none z-50 border border-slate-100">
      <div className="relative h-[140px] overflow-hidden bg-slate-100">
        <img src={kos.image} alt={kos.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-[12px] left-[12px] flex items-center gap-[4px]"><span className="bg-white/90 backdrop-blur-sm text-[#241812] text-[10px] font-bold px-[8px] py-[2px] rounded-[4px]">{kos.type}</span>{kos.isPromo && <span className="bg-red-500 text-white text-[10px] font-bold px-[8px] py-[2px] rounded-[4px] flex items-center gap-[2px]"><Sparkles className="w-[10px] h-[10px]" /> -{kos.discount}%</span>}</div>
      </div>
      <div className="p-[16px]">
        <div className="flex items-start justify-between mb-[4px]"><h4 className="font-playfair font-bold text-lg text-[#241812] leading-tight truncate">{kos.name}</h4><div className="flex items-center gap-[2px] shrink-0 bg-orange-50 px-[6px] py-[2px] rounded-[4px]"><Star className="w-[12px] h-[12px] fill-orange-500 text-orange-500" /><span className="text-[10px] font-bold text-orange-700">{kos.rating}</span></div></div>
        <div className="flex items-center gap-[4px] text-slate-500 text-xs mb-[12px]"><MapPin className="w-[12px] h-[12px] shrink-0 text-teal-600" /><span className="truncate">{kos.campus}</span></div>
      </div>
    </motion.div>
  );
};

const PromoSection = ({ kosData, onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState(86400);
  useEffect(() => { const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000); return () => clearInterval(timer); }, []);
  const formatTime = (sec) => `${Math.floor(sec / 3600).toString().padStart(2, '0')}:${Math.floor((sec % 3600) / 60).toString().padStart(2, '0')}:${(sec % 60).toString().padStart(2, '0')}`;
  const promoItems = kosData.filter((k) => k.isPromo);
  if (promoItems.length === 0) return null;
  return (
    <div className="mb-[80px] pt-[48px] border-t border-slate-200/60">
      <RevealOnScroll direction="up"><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px] mb-[40px]"><div className="flex items-center gap-[16px]"><h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#241812] tracking-tight">Flash Promos</h2><div className="bg-red-50 text-red-600 border border-red-200 px-[16px] py-[8px] rounded-[8px] flex items-center gap-[8px] shadow-sm"><span className="w-[8px] h-[8px] bg-red-500 rounded-full animate-pulse shrink-0"></span><span className="text-sm md:text-base font-bold tracking-widest">{formatTime(timeLeft)}</span></div></div></div></RevealOnScroll>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">{promoItems.map((kos, index) => (
        <RevealOnScroll key={`promo-${kos.id}`} delay={index * 100} direction="up" className="h-full">
          <div onClick={() => onNavigate(`/detail/${kos.id}`)} className="bg-white/80 backdrop-blur-md rounded-[24px] overflow-hidden border border-red-100 shadow-[0_8px_30px_rgba(239,68,68,0.06)] hover:shadow-[0_20px_40px_rgba(239,68,68,0.12)] hover:-translate-y-[8px] transition-all duration-300 group cursor-pointer flex flex-col h-full relative"><div className="absolute top-0 right-0 w-[120px] h-[120px] bg-gradient-to-bl from-red-500/10 to-transparent rounded-bl-full pointer-events-none z-0"></div><div className="relative h-[220px] overflow-hidden shrink-0 bg-slate-100"><img src={kos.image} alt={kos.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div><div className="absolute top-[16px] left-[16px] flex flex-col gap-[8px] items-start z-10"><div className="bg-red-500/95 backdrop-blur-sm h-[32px] px-[12px] rounded-[8px] flex items-center gap-[6px] shadow-md"><Sparkles className="w-[14px] h-[14px] text-white shrink-0" /><span className="text-xs font-bold text-white whitespace-nowrap">-{kos.discount}% OFF</span></div></div><div className="absolute bottom-[16px] left-[16px] bg-[#241812]/90 backdrop-blur-sm text-white text-xs font-bold h-[28px] flex items-center px-[12px] rounded-[8px] shadow-sm whitespace-nowrap z-10">{kos.type}</div></div><div className="p-[24px] flex flex-col flex-1 relative z-10"><div className="flex items-start gap-[8px] text-slate-500 text-sm mb-[12px]"><MapPin className="w-[16px] h-[16px] mt-[2px] shrink-0 text-teal-600" /><span className="line-clamp-1 leading-relaxed">{kos.campus}</span></div><h3 className="font-playfair font-bold text-xl text-[#241812] mb-[8px] line-clamp-1 group-hover:text-red-600 transition-colors tracking-tight">{kos.name}</h3><div className="text-sm text-slate-500 mb-[24px] line-clamp-1 flex-1 font-light">{kos.facilities.join(" • ")}</div><div className="flex justify-between items-center pt-[20px] border-t border-red-100/50 mt-auto"><div><p className="text-[10px] text-red-500 mb-[4px] font-bold uppercase tracking-wider">Harga Promo</p><div className="flex flex-col"><p className="text-xs text-slate-400 line-through mb-[2px]">Rp {kos.price}</p><p className="font-extrabold text-red-600 text-lg">Rp {kos.discountedPrice}<span className="text-xs text-red-400 font-normal">/bln</span></p></div></div><button className="bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white w-[40px] h-[40px] flex items-center justify-center rounded-[12px] transition-all duration-300 shrink-0 mt-auto"><ArrowRight className="w-[20px] h-[20px] group-hover:translate-x-[2px] transition-transform" /></button></div></div></div>
        </RevealOnScroll>
      ))}</div>
    </div>
  );
};

export default function SearchPage() {
  const navigate = useNavigate();
  
  const [viewMode, setViewMode] = useState('explore'); 
  const [activeCampus, setActiveCampus] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activeType, setActiveType] = useState('Semua');
  const [maxPrice, setMaxPrice] = useState(3000000);
  const [reqFacilities, setReqFacilities] = useState([]);
  const [activeFaculty, setActiveFaculty] = useState('Semua');

  const campusCoordinates = {
    'UGM': { x: '25%', y: '30%', color: 'border-blue-400', glow: 'bg-blue-400/20' },
    'UI': { x: '70%', y: '25%', color: 'border-yellow-400', glow: 'bg-yellow-400/20' },
    'ITB': { x: '50%', y: '50%', color: 'border-green-400', glow: 'bg-green-400/20' },
    'UB': { x: '20%', y: '70%', color: 'border-purple-400', glow: 'bg-purple-400/20' },
    'Undip': { x: '80%', y: '65%', color: 'border-orange-400', glow: 'bg-orange-400/20' },
    'ITS': { x: '45%', y: '85%', color: 'border-pink-400', glow: 'bg-pink-400/20' }
  };

  const toggleFacility = (fac) => setReqFacilities(prev => prev.includes(fac) ? prev.filter(f => f !== fac) : [...prev, fac]);

  const filteredKos = useMemo(() => {
    let result = kosData.filter(kos => {
      const matchCampus = activeCampus === 'Semua' || kos.campus.includes(activeCampus);
      const matchSearch = viewMode === 'normal' ? (kos.name.toLowerCase().includes(searchQuery.toLowerCase()) || kos.campus.toLowerCase().includes(searchQuery.toLowerCase())) : true;
      const matchType = activeType === 'Semua' || kos.type === activeType;
      const matchPrice = kos.discountedPriceNum <= maxPrice;
      const matchFacilities = reqFacilities.every(fac => kos.facilities.includes(fac));
      return matchCampus && matchSearch && matchType && matchPrice && matchFacilities;
    });

    if (activeFaculty !== 'Semua') {
      result.sort((a, b) => {
        const distA = a.distances?.[activeFaculty] || 9999;
        const distB = b.distances?.[activeFaculty] || 9999;
        return distA - distB;
      });
    }
    return result;
  }, [activeCampus, searchQuery, activeType, maxPrice, reqFacilities, activeFaculty, viewMode]);

  const [hoveredKosId, setHoveredKosId] = useState(null);

  const getOrbitalPosition = (kos, index, total) => {
    const parentCampusKey = Object.keys(campusCoordinates).find(key => kos.campus.includes(key));
    const parentCoords = parentCampusKey ? campusCoordinates[parentCampusKey] : { x: '50%', y: '50%' };
    
    if (activeCampus !== 'Semua') {
      let radius = 18 + (index * 5); 
      let displayDistance = Math.floor(radius * 15);

      if (activeFaculty !== 'Semua' && kos.distances?.[activeFaculty]) {
        displayDistance = kos.distances[activeFaculty];
        radius = 15 + Math.min(30, (displayDistance / 2000) * 30); 
      }
      const angle = (index / total) * Math.PI * 4; 
      return { x: `calc(50% + ${Math.cos(angle) * radius}%)`, y: `calc(50% + ${Math.sin(angle) * radius}%)`, distance: displayDistance };
    }

    const radius = 8 + (Math.random() * 8); 
    const angle = Math.random() * Math.PI * 2; 
    return { x: `calc(${parseFloat(parentCoords.x)}% + ${Math.cos(angle) * radius}%)`, y: `calc(${parseFloat(parentCoords.y)}% + ${Math.sin(angle) * radius}%)`, distance: null };
  };

  return (
    <div className="w-full min-h-screen relative">
      <div className="fixed bottom-[32px] left-1/2 -translate-x-1/2 z-[100]">
        <div className="bg-white/80 backdrop-blur-md p-[6px] rounded-full shadow-2xl border border-slate-200/50 flex items-center gap-[4px]">
          <button onClick={() => setViewMode('normal')} className={`px-[24px] py-[10px] rounded-full text-sm font-bold flex items-center gap-[8px] transition-all duration-300 ${viewMode === 'normal' ? 'bg-[#241812] text-white shadow-md' : 'text-slate-500 hover:text-[#241812]'}`}><LayoutGrid className="w-[16px] h-[16px]" /> Normal</button>
          <button onClick={() => setViewMode('explore')} className={`px-[24px] py-[10px] rounded-full text-sm font-bold flex items-center gap-[8px] transition-all duration-300 ${viewMode === 'explore' ? 'bg-[#241812] text-white shadow-md' : 'text-slate-500 hover:text-[#241812]'}`}><Compass className="w-[16px] h-[16px]" /> Explore</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'normal' && (
          <motion.div key="normal-view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full bg-slate-50 font-sans text-slate-800 flex flex-col pb-[100px]">
            <section className="relative w-full h-[400px] md:h-[450px] rounded-b-[40px] md:rounded-b-[64px] overflow-hidden bg-[#241812] z-10 flex flex-col justify-center items-center px-[16px] pt-[80px] shadow-2xl">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241812]/90 via-transparent to-transparent"></div>
              <div className="w-full max-w-[896px] mx-auto text-center relative z-20">
                <h1 className="font-playfair text-4xl md:text-6xl font-extrabold text-white mb-[32px] tracking-tight">Cari <span className="italic text-teal-200">Kost Idaman</span></h1>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-[8px] rounded-[999px] flex items-center gap-[8px]">
                  <div className="bg-white h-[56px] rounded-[999px] flex items-center px-[20px] flex-1">
                    <Search className="w-[20px] h-[20px] text-teal-700 mr-[12px]" />
                    <input type="text" placeholder="Ketik nama atau area kos..." className="bg-transparent border-none outline-none w-full text-slate-800" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                </div>
              </div>
            </section>

            <div className="max-w-[1280px] w-full mx-auto px-[16px] sm:px-[24px] lg:px-[32px] py-[32px] flex flex-col lg:flex-row gap-[32px] relative z-20">
              
              <div className="w-full lg:w-[300px] shrink-0 bg-white p-[24px] rounded-[24px] border border-slate-200 shadow-sm h-max lg:sticky lg:top-[120px]">
                <div className="flex items-center gap-[8px] mb-[24px] border-b border-slate-100 pb-[16px]"><SlidersHorizontal className="w-[18px] h-[18px] text-teal-700" /><h3 className="font-bold text-[#241812] text-lg">Filter Pencarian</h3></div>

                <div className="mb-[24px]">
                  <label className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-[12px] block">Kampus</label>
                  <AnimatedDropdown 
                    options={campuses}
                    value={activeCampus}
                    onChange={(val) => { setActiveCampus(val); setActiveFaculty('Semua'); }}
                    buttonClassName="w-full bg-slate-50 border border-slate-200 text-[#241812] focus:border-teal-500 hover:border-teal-500"
                  />
                </div>

                {activeCampus !== 'Semua' && facultiesByCampus[activeCampus] && (
                  <div className="mb-[24px]">
                    <label className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-[12px] flex items-center gap-[4px]"><Navigation className="w-[14px] h-[14px] text-teal-600"/> Urutkan Jarak</label>
                    <AnimatedDropdown 
                      options={['Semua', ...facultiesByCampus[activeCampus]]}
                      value={activeFaculty}
                      onChange={(val) => setActiveFaculty(val)}
                      buttonClassName="w-full bg-teal-50 border border-teal-200 text-teal-800 font-bold hover:border-teal-500"
                    />
                  </div>
                )}

                <div className="mb-[24px]">
                  <label className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-[12px] flex justify-between">Harga Maks <span>Rp {(maxPrice/1000000).toFixed(1)} Jt</span></label>
                  <input type="range" min="500000" max="4000000" step="100000" value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value))} className="w-full accent-teal-600" />
                </div>

                <div className="mb-[24px]">
                  <label className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-[12px] block">Fasilitas Wajib</label>
                  <div className="flex flex-col gap-[12px]">
                    {['AC', 'Kamar Mandi Dalam', 'WiFi'].map(fac => (
                      <label key={fac} className="flex items-center gap-[12px] cursor-pointer">
                        <input type="checkbox" checked={reqFacilities.includes(fac)} onChange={() => toggleFacility(fac)} className="w-[18px] h-[18px] rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                        <span className="text-sm font-medium text-slate-700">{fac}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-end mb-[24px]"><h2 className="text-2xl font-playfair font-bold text-[#241812]">Hasil Pencarian ({filteredKos.length})</h2></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[24px]">
                  {filteredKos.map((kos) => (
                    <div key={kos.id} onClick={() => navigate(`/detail/${kos.id}`)} className="bg-white rounded-[20px] overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-[4px] transition-all cursor-pointer flex flex-col">
                      <div className="relative h-[180px] bg-slate-100">
                        <img src={kos.image} alt={kos.name} className="w-full h-full object-cover" />
                        <div className="absolute top-[12px] left-[12px] flex flex-col gap-[8px]">{kos.isPromo && <span className="bg-red-500 text-white px-[8px] py-[2px] rounded-[6px] text-[10px] font-bold flex items-center gap-[4px]"><Sparkles className="w-[10px] h-[10px]"/> -{kos.discount}%</span>}</div>
                      </div>
                      <div className="p-[16px] flex flex-col flex-1">
                        <div className="flex items-center gap-[4px] text-slate-500 text-xs mb-[8px]"><MapPin className="w-[12px] h-[12px] text-teal-600"/> {kos.campus}</div>
                        <h3 className="font-playfair font-bold text-lg text-[#241812] mb-[8px] line-clamp-1">{kos.name}</h3>
                        {activeFaculty !== 'Semua' && kos.distances?.[activeFaculty] && (
                           <p className="text-xs font-bold text-teal-700 bg-teal-50 px-[8px] py-[4px] rounded-md w-max mb-[12px]">Hanya {kos.distances[activeFaculty]}m ke {activeFaculty}</p>
                        )}
                        <div className="mt-auto border-t border-slate-100 pt-[12px] flex justify-between items-center"><p className="font-extrabold text-orange-600">Rp {kos.isPromo ? kos.discountedPrice : kos.price}<span className="text-[10px] font-normal text-slate-400">/bln</span></p></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'explore' && (
          <motion.div key="explore-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full min-h-screen bg-[#241812] font-sans text-white flex flex-col overflow-hidden pb-[100px]">
            <div className="pt-[100px] pb-[16px] px-[24px] lg:px-[56px] z-20 flex flex-col md:flex-row justify-between md:items-end gap-[16px]">
              <div><h1 className="font-playfair text-4xl md:text-5xl font-light text-[#eae0d5] tracking-tight">Kosmosphere <span className="italic text-teal-400">Explorer</span></h1><p className="text-[#eae0d5]/60 text-sm mt-[8px] font-light max-w-[600px]">Peta interaktif dengan filter jarak fakultas real-time.</p></div>
              
              <div className="flex flex-wrap items-center gap-[12px] bg-white/5 border border-white/10 p-[12px] rounded-[16px] backdrop-blur-md">
                {/* Menggunakan Animated Dropdown di Mode Gelap */}
                <div className="w-[120px]">
                  <AnimatedDropdown 
                    options={campuses}
                    value={activeCampus}
                    onChange={(val) => { setActiveCampus(val); setActiveFaculty('Semua'); }}
                    buttonClassName="w-full bg-[#241812] border border-white/20 text-white hover:border-white/50 text-xs px-[12px] py-[8px]"
                    menuClassName="bg-[#241812] border border-white/20 shadow-2xl text-white"
                    itemClassName="text-white/70 hover:bg-white/10"
                  />
                </div>
                
                {activeCampus !== 'Semua' && facultiesByCampus[activeCampus] && (
                  <div className="w-[180px]">
                    <AnimatedDropdown 
                      options={['Semua', ...facultiesByCampus[activeCampus]]}
                      value={activeFaculty}
                      onChange={(val) => setActiveFaculty(val)}
                      placeholder="Semua Fakultas"
                      buttonClassName="w-full bg-teal-900 border border-teal-500 text-teal-100 font-bold hover:border-teal-400 text-xs px-[12px] py-[8px]"
                      menuClassName="bg-teal-900 border border-teal-500 shadow-2xl text-white"
                      itemClassName="text-teal-100 hover:bg-teal-800"
                    />
                  </div>
                )}

                <div className="flex items-center gap-[8px] px-[8px] border-l border-white/20">
                  <span className="text-[10px] text-white/50 font-bold uppercase">Maks: Rp {(maxPrice/1000000).toFixed(1)}Jt</span>
                  <input type="range" min="500000" max="4000000" step="100000" value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value))} className="w-[80px] accent-teal-400" />
                </div>
              </div>
            </div>

            <div className="relative flex-1 w-full min-h-[600px] border-y border-white/10 bg-[#1a1310] overflow-hidden rounded-[32px] mx-[24px] lg:mx-[56px] my-[16px] shadow-2xl">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

              <AnimatePresence>
                {activeCampus === 'Semua' && Object.entries(campusCoordinates).map(([name, coords]) => (
                  <motion.div key={`campus-${name}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center justify-center" style={{ left: coords.x, top: coords.y }}>
                    <div className={`absolute w-[120px] h-[120px] rounded-full ${coords.glow} blur-[40px] animate-pulse`}></div>
                    <div className={`w-[24px] h-[24px] rounded-full border-2 ${coords.color} border-dashed animate-[spin_10s_linear_infinite]`}></div>
                    <span className="mt-[8px] text-[10px] font-bold uppercase tracking-widest text-white/40">{name}</span>
                  </motion.div>
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {activeCampus !== 'Semua' && (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
                    <div className="w-[200px] h-[200px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-500/10 blur-[60px] rounded-full"></div>
                    <h2 className="font-playfair text-3xl text-teal-300/50 relative z-10">{activeFaculty !== 'Semua' ? activeFaculty : activeCampus}</h2>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {filteredKos.map((kos, index) => {
                  const pos = getOrbitalPosition(kos, index, filteredKos.length);
                  const isHovered = hoveredKosId === kos.id;

                  return (
                    <motion.div key={`kos-explore-${kos.id}`} layout initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ duration: 0.4 }} className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 flex flex-col items-center justify-center" style={{ left: pos.x, top: pos.y }} onMouseEnter={() => setHoveredKosId(kos.id)} onMouseLeave={() => setHoveredKosId(null)} onClick={() => navigate(`/detail/${kos.id}`)}>
                      {activeCampus === 'Semua' ? (
                        <div className="relative flex items-center justify-center">
                          {isHovered && <motion.div layoutId="hoverRing" className="absolute w-[32px] h-[32px] rounded-full border border-white/50" />}
                          <div className={`w-[8px] h-[8px] rounded-full transition-all duration-300 bg-teal-300 shadow-[0_0_10px_rgba(94,234,212,0.6)] ${isHovered ? 'scale-150' : 'scale-100'}`}></div>
                        </div>
                      ) : (
                        <div className="relative flex flex-col items-center justify-center group">
                          <div className={`px-[12px] py-[6px] rounded-[12px] flex flex-col items-center shadow-xl transition-all duration-300 border ${isHovered ? 'scale-110 z-50 border-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.4)]' : 'scale-100 z-30 border-white/10'} ${kos.isPromo ? 'bg-red-500 text-white' : 'bg-white/95 backdrop-blur-md text-[#241812]'}`}>
                            <span className="text-[9px] font-bold uppercase tracking-wider mb-[2px] opacity-70 line-clamp-1 max-w-[80px] text-center">{kos.name}</span>
                            <span className="font-extrabold text-xs whitespace-nowrap">Rp {kos.isPromo ? kos.discountedPrice : kos.price}</span>
                          </div>
                          <div className={`mt-[6px] bg-black/60 backdrop-blur-md border rounded-full px-[8px] py-[2px] flex items-center gap-[4px] shadow-sm transition-all duration-300 ${activeFaculty !== 'Semua' ? 'border-teal-500/50' : 'border-white/20'} ${isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-80'}`}>
                            <MapPin className={`w-[10px] h-[10px] ${activeFaculty !== 'Semua' ? 'text-teal-400' : 'text-slate-400'}`} />
                            <span className={`text-[9px] font-bold tracking-widest ${activeFaculty !== 'Semua' ? 'text-teal-100' : 'text-white'}`}>{pos.distance}m</span>
                          </div>
                        </div>
                      )}
                      <AnimatePresence>{isHovered && <KosPreviewCard kos={kos} />}</AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}