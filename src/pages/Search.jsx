import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Sparkles, Star, LayoutGrid, 
  Compass, SlidersHorizontal, Navigation, SearchX, X 
} from 'lucide-react';
import { kosData, campuses, facultiesByCampus } from '../data/dummyData';
import RevealOnScroll from '../components/RevealOnScroll';
import AnimatedDropdown from '../components/ui/animated-dropdown';

const KosPreviewCard = ({ kos }) => {
  if (!kos) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.2 }} className="absolute bottom-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-[280px] bg-white rounded-[16px] shadow-2xl overflow-hidden pointer-events-none z-50 border border-slate-100">
      <div className="relative h-[140px] overflow-hidden bg-slate-100">
        <img src={kos.image} alt={`Foto kamar ${kos.name}`} className="w-full h-full object-cover" />
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

const CAMPUS_COORDINATES = {
  'UGM': { x: '25%', y: '30%', color: 'border-blue-400', glow: 'bg-blue-400/20' },
  'UI': { x: '70%', y: '25%', color: 'border-yellow-400', glow: 'bg-yellow-400/20' },
  'ITB': { x: '50%', y: '50%', color: 'border-green-400', glow: 'bg-green-400/20' },
  'UB': { x: '20%', y: '70%', color: 'border-purple-400', glow: 'bg-purple-400/20' },
  'Undip': { x: '80%', y: '65%', color: 'border-orange-400', glow: 'bg-orange-400/20' },
  'ITS': { x: '45%', y: '85%', color: 'border-pink-400', glow: 'bg-pink-400/20' }
};

const RenderViewSwitcher = ({ isDark, viewMode, setViewMode, activeFilterCount }) => (
  <div className={`w-full flex justify-center z-30 relative ${isDark ? 'pt-[100px] mb-[16px]' : '-mt-[28px] mb-[16px]'}`}>
    <div className={`${isDark ? 'bg-white/10 border-white/20' : 'bg-white/90 border-slate-200/50'} backdrop-blur-md p-[6px] rounded-full shadow-lg border flex items-center gap-[4px]`}>
      <button aria-label="Tampilan Normal" onClick={() => setViewMode('normal')} className={`px-[24px] py-[10px] rounded-full text-sm font-bold flex items-center gap-[8px] transition-all duration-300 ${viewMode === 'normal' ? 'bg-[#241812] text-white shadow-md' : (isDark ? 'text-white/70 hover:text-white' : 'text-slate-500 hover:text-[#241812]')}`}>
        <LayoutGrid className="w-[16px] h-[16px]" /> Normal
      </button>
      <button aria-label="Tampilan Peta Interaktif" onClick={() => setViewMode('explore')} className={`px-[24px] py-[10px] rounded-full text-sm font-bold flex items-center gap-[8px] transition-all duration-300 ${viewMode === 'explore' ? 'bg-[#241812] text-white shadow-md' : (isDark ? 'text-white/70 hover:text-white' : 'text-slate-500 hover:text-[#241812]')}`}>
        <Compass className="w-[16px] h-[16px]" /> Explore
        <AnimatePresence>
          {activeFilterCount > 0 && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="bg-red-500 text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0">
              {activeFilterCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  </div>
);

export default function SearchPage() {
  const navigate = useNavigate();
  // Perbaikan 2: Default viewMode menjadi 'normal'
  const [viewMode, setViewMode] = useState('normal'); 
  const [activeCampus, setActiveCampus] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activePropertyType, setActivePropertyType] = useState('Semua');
  const [activeType, setActiveType] = useState('Semua');
  const [maxPrice, setMaxPrice] = useState(7000000);
  const [reqFacilities, setReqFacilities] = useState([]);
  const [activeFaculty, setActiveFaculty] = useState('Semua');
  const [sortBy, setSortBy] = useState('default');

  const toggleFacility = (fac) => setReqFacilities(prev => prev.includes(fac) ? prev.filter(f => f !== fac) : [...prev, fac]);

  const resetAllFilters = () => {
    setActiveCampus('Semua');
    setSearchQuery('');
    setActivePropertyType('Semua');
    setActiveType('Semua');
    setMaxPrice(7000000);
    setReqFacilities([]);
    setActiveFaculty('Semua');
    setSortBy('default');
  };

  const activeFilterCount = 
    (activeCampus !== 'Semua' ? 1 : 0) + 
    (activePropertyType !== 'Semua' ? 1 : 0) +
    (activeType !== 'Semua' ? 1 : 0) + 
    (maxPrice < 7000000 ? 1 : 0) + 
    reqFacilities.length +
    (sortBy !== 'default' ? 1 : 0);

  const filteredKos = useMemo(() => {
    let result = kosData.filter(kos => {
      const matchCampus = activeCampus === 'Semua' || kos.campus.includes(activeCampus);
      const matchSearch = viewMode === 'normal' ? (kos.name.toLowerCase().includes(searchQuery.toLowerCase()) || kos.campus.toLowerCase().includes(searchQuery.toLowerCase())) : true;
      const matchPropertyType = activePropertyType === 'Semua' || kos.propertyType === activePropertyType;
      const matchType = activeType === 'Semua' || kos.type === activeType;
      const matchPrice = kos.discountedPriceNum <= maxPrice;
      const matchFacilities = reqFacilities.every(fac => kos.facilities.includes(fac));
      
      return matchCampus && matchSearch && matchPropertyType && matchType && matchPrice && matchFacilities;
    });

    if (activeFaculty !== 'Semua') {
      result.sort((a, b) => {
        const distA = a.distances?.[activeFaculty] || 9999;
        const distB = b.distances?.[activeFaculty] || 9999;
        return distA - distB;
      });
    }
    
    if (activeFaculty === 'Semua') {
      if (sortBy === 'price-asc') result.sort((a, b) => a.discountedPriceNum - b.discountedPriceNum);
      if (sortBy === 'price-desc') result.sort((a, b) => b.discountedPriceNum - a.discountedPriceNum);
      if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [activeCampus, searchQuery, activePropertyType, activeType, maxPrice, reqFacilities, activeFaculty, viewMode, sortBy]);

  const [hoveredKosId, setHoveredKosId] = useState(null);

  const getOrbitalPosition = (kos) => {
    const parentCampusKey = Object.keys(CAMPUS_COORDINATES).find(key => kos.campus.includes(key));
    const parentCoords = parentCampusKey ? CAMPUS_COORDINATES[parentCampusKey] : { x: '50%', y: '50%' };
    
    const angle = (kos.id / kosData.length) * Math.PI * 2; 

    if (activeCampus !== 'Semua') {
      if (activeFaculty !== 'Semua' && kos.distances?.[activeFaculty]) {
        const dist = kos.distances[activeFaculty];
        const radius = 10 + Math.min(35, (dist / 2000) * 35); 
        return { x: `calc(50% + ${Math.cos(angle) * radius}%)`, y: `calc(50% + ${Math.sin(angle) * radius}%)`, distance: dist };
      } else {
        const radius = 15 + (kos.priceNum / 200000); 
        return { x: `calc(50% + ${Math.cos(angle) * radius}%)`, y: `calc(50% + ${Math.sin(angle) * radius}%)`, distance: null };
      }
    }

    const radius = 8 + ((kos.priceNum % 2000000) / 200000); 
    return { x: `calc(${parseFloat(parentCoords.x)}% + ${Math.cos(angle) * radius}%)`, y: `calc(${parseFloat(parentCoords.y)}% + ${Math.sin(angle) * radius}%)`, distance: null };
  };

  return (
    <div className="w-full min-h-screen relative">
      <AnimatePresence mode="wait">
        
        {/* =========================================================================
            MODE 1: NORMAL VIEW
            ========================================================================= */}
        {viewMode === 'normal' && (
          <motion.div key="normal-view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full bg-slate-50 font-sans text-slate-800 flex flex-col pb-[100px]">
            <section className="relative w-full h-[400px] md:h-[450px] rounded-b-[40px] md:rounded-b-[64px] overflow-hidden bg-[#241812] z-10 flex flex-col justify-center items-center px-[16px] pt-[80px] shadow-2xl">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241812]/90 via-transparent to-transparent"></div>
              <div className="w-full max-w-[896px] mx-auto text-center relative z-20">
                <h1 className="font-playfair text-4xl md:text-6xl font-extrabold text-white mb-[32px] tracking-tight">Cari <span className="italic text-teal-200">Kost Idaman</span></h1>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-[8px] rounded-[999px] flex items-center gap-[8px]">
                  <div className="bg-white h-[56px] rounded-[999px] flex items-center px-[20px] flex-1">
                    <Search className="w-[20px] h-[20px] text-teal-700 mr-[12px]" />
                    <input type="text" aria-label="Cari nama atau area kos" placeholder="Ketik nama atau area kos..." className="bg-transparent border-none outline-none w-full text-slate-800" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                </div>
              </div>
            </section>

            <RenderViewSwitcher isDark={false} viewMode={viewMode} setViewMode={setViewMode} activeFilterCount={activeFilterCount} />

            <div className="max-w-[1280px] w-full mx-auto px-[16px] sm:px-[24px] lg:px-[32px] py-[32px] flex flex-col lg:flex-row gap-[32px] relative z-20">
              
              <div className="w-full lg:w-[300px] shrink-0 bg-white p-[24px] rounded-[24px] border border-slate-200 shadow-sm h-max lg:sticky lg:top-[120px]">
                <div className="flex items-center gap-[8px] mb-[24px] border-b border-slate-100 pb-[16px]">
                  <SlidersHorizontal className="w-[18px] h-[18px] text-teal-700" />
                  <h3 className="font-bold text-[#241812] text-lg">Filter Pencarian</h3>
                  {activeFilterCount > 0 && (
                    <button onClick={resetAllFilters} className="ml-auto text-xs text-teal-600 font-bold hover:underline">Reset</button>
                  )}
                </div>

                <div className="mb-[24px]">
                  <label className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-[12px] block">Jenis Properti</label>
                  <div className="grid grid-cols-2 gap-[8px]">
                    {[
                      { value: 'Semua', icon: '🏠', label: 'Semua' },
                      { value: 'Kos', icon: '🛏️', label: 'Kos' },
                      { value: 'Apartment', icon: '🏢', label: 'Apartment' },
                      { value: 'Rumah', icon: '🏡', label: 'Rumah' },
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setActivePropertyType(value)}
                        className={`py-[10px] px-[12px] rounded-[12px] text-xs font-bold border transition-all text-center ${
                          activePropertyType === value
                            ? 'bg-[#241812] text-white border-[#241812]'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-[#241812]'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

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
                  <label className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-[12px] block">Penghuni</label>
                  <div className="flex gap-[8px] flex-wrap">
                    {['Semua', 'Putra', 'Putri', 'Campur'].map(type => (
                      <button
                        key={type}
                        onClick={() => setActiveType(type)}
                        className={`px-[16px] py-[8px] rounded-full text-xs font-bold border transition-all ${activeType === type ? 'bg-[#241812] text-white border-[#241812]' : 'bg-white text-slate-600 border-slate-200 hover:border-[#241812] hover:text-[#241812]'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-[24px]">
                  <label className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-[12px] flex justify-between">Harga Maks <span>Rp {(maxPrice/1000000).toFixed(1)} Jt</span></label>
                  <input type="range" aria-label="Range harga maksimum" min="500000" max="7000000" step="100000" value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value))} className="w-full accent-teal-600" />
                </div>

                <div className="mb-[24px]">
                  <label className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-[12px] block">Fasilitas Wajib</label>
                  <div className="flex flex-col gap-[12px]">
                    {['AC', 'Kamar Mandi Dalam', 'WiFi'].map(fac => (
                      <label key={fac} className="flex items-center gap-[12px] cursor-pointer">
                        <input type="checkbox" aria-label={`Fasilitas ${fac}`} checked={reqFacilities.includes(fac)} onChange={() => toggleFacility(fac)} className="w-[18px] h-[18px] rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                        <span className="text-sm font-medium text-slate-700">{fac}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-end mb-[24px]"><h2 className="text-2xl font-playfair font-bold text-[#241812]">Hasil Pencarian ({filteredKos.length})</h2></div>
                
                <div className="flex flex-wrap items-center gap-[8px] mb-[24px] mt-[8px]">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Urutkan:</span>
                  {[
                    { value: 'default', label: 'Default' },
                    { value: 'price-asc', label: 'Harga ↑' },
                    { value: 'price-desc', label: 'Harga ↓' },
                    { value: 'rating', label: 'Rating Tertinggi' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className={`px-[14px] py-[6px] rounded-full text-xs font-bold border transition-all ${
                        sortBy === opt.value
                          ? 'bg-[#241812] text-white border-[#241812]'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-[#241812]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {filteredKos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[24px]">
                    {filteredKos.map((kos) => (
                      <button 
                        key={kos.id} 
                        onClick={() => navigate(`/detail/${kos.id}`)} 
                        aria-label={`Lihat detail ${kos.name} di ${kos.campus}, harga Rp ${kos.isPromo ? kos.discountedPrice : kos.price} per bulan`}
                        className="text-left bg-white rounded-[20px] overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-[4px] transition-all cursor-pointer flex flex-col p-0 w-full"
                      >
                        <div className="relative h-[180px] bg-slate-100 w-full">
                          <img src={kos.image} alt={`Foto properti ${kos.name}`} className="w-full h-full object-cover" />
                          <div className="absolute top-[12px] left-[12px] flex flex-col gap-[8px]">{kos.isPromo && <span className="bg-red-500 text-white px-[8px] py-[2px] rounded-[6px] text-[10px] font-bold flex items-center gap-[4px]"><Sparkles className="w-[10px] h-[10px]"/> -{kos.discount}%</span>}</div>
                        </div>
                        <div className="p-[16px] flex flex-col flex-1 w-full">
                          <div className="flex items-center gap-[4px] text-slate-500 text-xs mb-[8px]"><MapPin className="w-[12px] h-[12px] text-teal-600"/> {kos.campus}</div>
                          <h3 className="font-playfair font-bold text-lg text-[#241812] mb-[4px] line-clamp-1">{kos.name}</h3>
                          <div className="flex items-center gap-[6px] mb-[12px]">
                            <span className="text-xs bg-slate-100 text-slate-600 px-[8px] py-[2px] rounded-md border border-slate-200">{kos.propertyType}</span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-500">{kos.type}</span>
                          </div>
                          {activeFaculty !== 'Semua' && kos.distances?.[activeFaculty] && (
                             <p className="text-xs font-bold text-teal-700 bg-teal-50 px-[8px] py-[4px] rounded-md w-max mb-[12px]">Hanya {kos.distances[activeFaculty]}m ke {activeFaculty}</p>
                          )}
                          <div className="mt-auto border-t border-slate-100 pt-[12px] flex justify-between items-center w-full"><p className="font-extrabold text-orange-600">Rp {kos.isPromo ? kos.discountedPrice : kos.price}<span className="text-[10px] font-normal text-slate-400">/bln</span></p></div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-[80px] px-[24px] text-center bg-white rounded-[24px] border border-slate-200 border-dashed">
                    <div className="w-[80px] h-[80px] bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-[24px]">
                      <SearchX className="w-[40px] h-[40px]" />
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-[#241812] mb-[8px]">Tidak ada kos yang cocok</h3>
                    <p className="text-slate-500 mb-[24px] max-w-[400px]">Coba sesuaikan ulang filter pencarian, lokasi kampus, atau rentang harga.</p>
                    <button onClick={resetAllFilters} className="bg-[#241812] text-white px-[24px] py-[12px] rounded-full font-bold shadow-md hover:bg-black transition-colors">Reset Semua Filter</button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================================================
            MODE 2: EXPLORE VIEW
            ========================================================================= */}
        {viewMode === 'explore' && (
          <motion.div key="explore-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full min-h-screen bg-[#241812] font-sans text-white flex flex-col overflow-hidden pb-[100px]">
            
            <RenderViewSwitcher isDark={true} viewMode={viewMode} setViewMode={setViewMode} activeFilterCount={activeFilterCount} />

            <div className="pb-[16px] px-[24px] lg:px-[56px] z-20 flex flex-col md:flex-row justify-between md:items-end gap-[16px]">
              <div>
                <h1 className="font-playfair text-4xl md:text-5xl font-light text-[#eae0d5] tracking-tight">Kosmosphere <span className="italic text-teal-400">Explorer</span></h1>
                <p className="text-[#eae0d5]/60 text-sm mt-[8px] font-light max-w-[600px]">Peta interaktif dengan filter jarak fakultas real-time.</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-[12px] bg-white/5 border border-white/10 p-[12px] rounded-[16px] backdrop-blur-md">
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

                {/* Filter Jenis Properti */}
                <div className="flex items-center gap-[6px] border-l border-white/20 pl-[12px]">
                  <span className="text-[10px] text-white/50 font-bold uppercase hidden lg:block">Tipe:</span>
                  {['Semua', 'Kos', 'Apartment', 'Rumah'].map(type => (
                    <button
                      key={type}
                      onClick={() => setActivePropertyType(type)}
                      className={`px-[10px] py-[6px] rounded-[8px] text-[10px] font-bold border transition-all ${
                        activePropertyType === type
                          ? 'bg-white text-[#241812] border-white'
                          : 'bg-white/10 text-white/70 border-white/20 hover:border-white/50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Filter Penghuni */}
                <div className="flex items-center gap-[6px] border-l border-white/20 pl-[12px]">
                  <span className="text-[10px] text-white/50 font-bold uppercase hidden lg:block">Penghuni:</span>
                  {['Semua', 'Putra', 'Putri', 'Campur'].map(type => (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`px-[10px] py-[6px] rounded-[8px] text-[10px] font-bold border transition-all ${
                        activeType === type
                          ? 'bg-white text-[#241812] border-white'
                          : 'bg-white/10 text-white/70 border-white/20 hover:border-white/50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-[8px] px-[8px] border-l border-white/20">
                  <span className="text-[10px] text-white/50 font-bold uppercase">Maks: Rp {(maxPrice/1000000).toFixed(1)}Jt</span>
                  <input type="range" aria-label="Range harga maksimum" min="500000" max="7000000" step="100000" value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value))} className="w-[80px] accent-teal-400" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-[8px] px-[24px] lg:px-[56px] mt-[8px] z-20 relative">
              <AnimatePresence>
                {activePropertyType !== 'Semua' && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-[6px] bg-white/10 border border-white/20 text-white px-[12px] py-[6px] rounded-full text-xs backdrop-blur-md">
                    {activePropertyType}
                    <button aria-label={`Hapus filter ${activePropertyType}`} onClick={() => setActivePropertyType('Semua')} className="hover:text-teal-300 transition-colors"><X className="w-[12px] h-[12px]" /></button>
                  </motion.span>
                )}
                {activeCampus !== 'Semua' && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-[6px] bg-white/10 border border-white/20 text-white px-[12px] py-[6px] rounded-full text-xs backdrop-blur-md">
                    Kampus: {activeCampus}
                    <button aria-label="Hapus filter kampus" onClick={() => { setActiveCampus('Semua'); setActiveFaculty('Semua'); }} className="hover:text-teal-300 transition-colors"><X className="w-[12px] h-[12px]" /></button>
                  </motion.span>
                )}
                {activeType !== 'Semua' && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-[6px] bg-white/10 border border-white/20 text-white px-[12px] py-[6px] rounded-full text-xs backdrop-blur-md">
                    Penghuni: {activeType}
                    <button aria-label="Hapus filter tipe" onClick={() => setActiveType('Semua')} className="hover:text-teal-300 transition-colors"><X className="w-[12px] h-[12px]" /></button>
                  </motion.span>
                )}
                {maxPrice < 7000000 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-[6px] bg-white/10 border border-white/20 text-white px-[12px] py-[6px] rounded-full text-xs backdrop-blur-md">
                    Maks: Rp {(maxPrice/1000000).toFixed(1)} Jt
                    <button aria-label="Hapus filter harga" onClick={() => setMaxPrice(7000000)} className="hover:text-teal-300 transition-colors"><X className="w-[12px] h-[12px]" /></button>
                  </motion.span>
                )}
                {reqFacilities.map(fac => (
                  <motion.span key={fac} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-[6px] bg-white/10 border border-white/20 text-white px-[12px] py-[6px] rounded-full text-xs backdrop-blur-md">
                    {fac}
                    <button aria-label={`Hapus filter fasilitas ${fac}`} onClick={() => toggleFacility(fac)} className="hover:text-teal-300 transition-colors"><X className="w-[12px] h-[12px]" /></button>
                  </motion.span>
                ))}
                {activeFilterCount > 0 && (
                  <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={resetAllFilters} className="text-xs text-teal-400 hover:text-white underline ml-[8px] transition-colors">Reset Semua</motion.button>
                )}
              </AnimatePresence>
            </div>

            <div className="relative flex-1 w-full min-h-[600px] border-y border-white/10 bg-[#1a1310] overflow-hidden rounded-[32px] mx-[24px] lg:mx-[56px] my-[16px] shadow-2xl">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

              <AnimatePresence>
                {activeFaculty !== 'Semua' && (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-[90%] h-[90%] rounded-full border-2 border-red-500/20 bg-red-500/5"></div>
                    <div className="absolute w-[55%] h-[55%] rounded-full border-2 border-yellow-500/30 bg-yellow-500/5"></div>
                    <div className="absolute w-[37.5%] h-[37.5%] rounded-full border-2 border-emerald-500/40 bg-emerald-500/10"></div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {activeCampus === 'Semua' && Object.entries(CAMPUS_COORDINATES).map(([name, coords]) => (
                  <motion.div key={`campus-${name}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center justify-center" style={{ left: coords.x, top: coords.y }}>
                    <div className={`absolute w-[120px] h-[120px] rounded-full ${coords.glow} blur-[40px] animate-pulse`}></div>
                    <div className={`w-[24px] h-[24px] rounded-full border-2 ${coords.color} border-dashed animate-[spin_10s_linear_infinite]`}></div>
                    <span className="mt-[8px] text-[10px] font-bold uppercase tracking-widest text-white/40">{name}</span>
                  </motion.div>
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {activeCampus !== 'Semua' && (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center z-10">
                    <div className="w-[200px] h-[200px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-500/10 blur-[60px] rounded-full"></div>
                    <h2 className="font-playfair text-3xl text-teal-300/50 relative z-10">{activeFaculty !== 'Semua' ? activeFaculty : activeCampus}</h2>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {filteredKos.map((kos) => {
                  const pos = getOrbitalPosition(kos);
                  const isHovered = hoveredKosId === kos.id;

                  return (
                    <motion.button key={`kos-explore-${kos.id}`} aria-label={`Lihat detail ${kos.name}`} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ duration: 0.4 }} className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 flex flex-col items-center justify-center p-0 border-0 bg-transparent" style={{ left: pos.x, top: pos.y }} onMouseEnter={() => setHoveredKosId(kos.id)} onMouseLeave={() => setHoveredKosId(null)} onClick={() => navigate(`/detail/${kos.id}`)}>
                      {activeCampus === 'Semua' ? (
                        <div className="relative flex items-center justify-center">
                          {isHovered && <motion.div layoutId="hoverRing" className="absolute w-[32px] h-[32px] rounded-full border border-white/50" />}
                          <div className={`w-[8px] h-[8px] rounded-full transition-all duration-300 ${kos.isPromo ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]' : 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]'} ${isHovered ? 'scale-150' : 'scale-100'}`}></div>
                        </div>
                      ) : (
                        <div className="relative flex flex-col items-center justify-center group">
                          <div className={`px-[12px] py-[6px] rounded-[12px] flex flex-col items-center shadow-xl transition-all duration-300 border ${isHovered ? 'scale-110 z-50 border-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.4)]' : 'scale-100 z-30 border-white/10'} ${kos.isPromo ? 'bg-red-500 text-white' : 'bg-white/95 backdrop-blur-md text-[#241812]'}`}>
                            <span className="text-[9px] font-bold uppercase tracking-wider mb-[2px] opacity-70 line-clamp-1 max-w-[80px] text-center">{kos.name}</span>
                            <span className="font-extrabold text-xs whitespace-nowrap">Rp {kos.isPromo ? kos.discountedPrice : kos.price}</span>
                          </div>
                          <div className={`mt-[6px] bg-black/60 backdrop-blur-md border rounded-full px-[8px] py-[2px] flex items-center gap-[4px] shadow-sm transition-all duration-300 ${activeFaculty !== 'Semua' ? 'border-teal-500/50' : 'border-white/20'} ${isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-80'}`}>
                            <MapPin className={`w-[10px] h-[10px] ${activeFaculty !== 'Semua' ? 'text-teal-400' : 'text-slate-400'}`} />
                            <span className={`text-[9px] font-bold tracking-widest ${activeFaculty !== 'Semua' ? 'text-teal-100' : 'text-white'}`}>{pos.distance ? `${pos.distance}m` : 'Tap to View'}</span>
                          </div>
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </AnimatePresence>

              {/* CARD PREVIEW SINGLE CONTAINER */}
              <AnimatePresence>
                {hoveredKosId && (() => {
                  const hoveredKos = filteredKos.find(k => k.id === hoveredKosId);
                  if (!hoveredKos) return null;
                  const pos = getOrbitalPosition(hoveredKos);
                  return (
                    <div 
                      key={`preview-${hoveredKosId}`}
                      className="absolute z-50 pointer-events-none"
                      style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, calc(-100% - 80px))' }}
                    >
                      <KosPreviewCard kos={hoveredKos} />
                    </div>
                  );
                })()}
              </AnimatePresence>

              <div className="absolute bottom-[24px] left-[24px] bg-[#1a1310]/80 backdrop-blur-md border border-white/10 p-[16px] rounded-[16px] z-40 pointer-events-none shadow-2xl hidden md:block">
                <h4 className="text-white text-sm font-bold mb-[12px] flex items-center gap-[8px]"><Compass className="w-[14px] h-[14px] text-teal-400" /> Keterangan Peta</h4>
                <div className="flex flex-col gap-[8px]">
                  <div className="flex items-center gap-[8px]">
                    <span className="w-[12px] h-[12px] rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                    <span className="text-xs text-white/80 font-medium">Promo Spesial</span>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <span className="w-[12px] h-[12px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"></span>
                    <span className="text-xs text-white/80 font-medium">Harga Reguler</span>
                  </div>
                  
                  {activeFaculty !== 'Semua' && (
                    <>
                      <div className="w-full h-[1px] bg-white/10 my-[4px]"></div>
                      <div className="flex items-center gap-[8px]">
                        <span className="w-[12px] h-[12px] rounded-full border-2 border-emerald-500 bg-emerald-500/20"></span>
                        <span className="text-xs text-white/80 font-medium">&lt; 500m (Jalan Kaki)</span>
                      </div>
                      <div className="flex items-center gap-[8px]">
                        <span className="w-[12px] h-[12px] rounded-full border-2 border-yellow-500 bg-yellow-500/20"></span>
                        <span className="text-xs text-white/80 font-medium">&lt; 1km (Jarak Sedang)</span>
                      </div>
                      <div className="flex items-center gap-[8px]">
                        <span className="w-[12px] h-[12px] rounded-full border-2 border-red-500 bg-red-500/20"></span>
                        <span className="text-xs text-white/80 font-medium">&gt; 1km (Perlu Kendaraan)</span>
                      </div>
                    </>
                  )}
                  
                  <div className="w-full h-[1px] bg-white/10 my-[4px]"></div>
                  <p className="text-xs text-teal-300 font-bold">Menampilkan {filteredKos.length} Properti</p>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}