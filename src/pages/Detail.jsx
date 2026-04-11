import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, MapPin, ShieldCheck, Star, Sparkles, Camera, Coffee, ShoppingBag, Landmark, Map, Share, Heart, ArrowDown } from 'lucide-react';
import { kosData, getRichKosData } from '../data/dummyData';
import RevealOnScroll from '../components/RevealOnScroll';
import ChatDrawer from '../components/ChatDrawer';

export default function Detail() {
  const { kosId } = useParams();
  const navigate = useNavigate();
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Ambil data kos
  const baseKos = kosData.find(k => k.id === parseInt(kosId)) || kosData[0];
  const kos = getRichKosData(baseKos);

  // Setup Animasi Parallax Hero
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Saat di-scroll: Gambar hero turun perlahan (parallax), teks memudar
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // Efek Top Bar Dinamis
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nearbyPlaces = [
    { icon: <Coffee className="w-[20px] h-[20px] text-slate-600" />, name: "Rumah Makan & Cafe Madem", dist: "150 m" },
    { icon: <ShoppingBag className="w-[20px] h-[20px] text-slate-600" />, name: "Minimarket Circle K", dist: "250 m" },
    { icon: <Landmark className="w-[20px] h-[20px] text-slate-600" />, name: `Area Kampus ${kos.campus.split(',')[0]}`, dist: "450 m" },
    { icon: <Map className="w-[20px] h-[20px] text-slate-600" />, name: "ATM Center & Apotek", dist: "500 m" }
  ];

  return (
    <div className="w-full overflow-x-hidden bg-black font-sans text-[#241812] flex flex-col">
      
      {/* ==========================================
          DYNAMIC TOP BAR
          ========================================== */}
      <div className={`fixed top-0 w-full h-[80px] z-50 flex items-center justify-between px-[24px] lg:px-[56px] transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-gradient-to-b from-black/60 to-transparent'}`}>
        <button onClick={() => navigate('/search')} className={`flex items-center gap-[8px] font-bold transition-colors ${isScrolled ? 'text-[#241812] hover:text-teal-700' : 'text-white hover:text-white/70'}`}>
          <ChevronLeft className="w-[20px] h-[20px]" /> <span className="hidden md:inline">Kembali</span>
        </button>
        <div className="flex items-center gap-[16px]">
          <button className={`flex items-center gap-[8px] text-sm font-bold transition-colors ${isScrolled ? 'text-slate-600 hover:text-[#241812]' : 'text-white hover:text-white/70'}`}>
            <Share className="w-[18px] h-[18px]" /> <span className="hidden md:inline">Bagikan</span>
          </button>
          <button onClick={() => setIsSaved(!isSaved)} className={`flex items-center gap-[8px] text-sm font-bold transition-colors ${isScrolled ? 'text-slate-600 hover:text-red-500' : 'text-white hover:text-red-400'}`}>
            <Heart className={`w-[18px] h-[18px] ${isSaved ? 'fill-red-500 text-red-500' : ''}`} /> <span className="hidden md:inline">Simpan</span>
          </button>
        </div>
      </div>

      {/* ==========================================
          SECTION 1: FULLSCREEN PARALLAX HERO
          ========================================== */}
      <div ref={heroRef} className="relative w-full h-screen sticky top-0 overflow-hidden z-0">
        <motion.img 
          style={{ y: heroY, scale: heroScale }}
          src={kos.gallery[0]} 
          alt={kos.name} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex flex-col justify-end items-center text-center pb-[15vh] px-[24px]">
          <div className="flex flex-wrap justify-center gap-[8px] mb-[24px]">
            {kos.isPromo && <span className="bg-red-500 text-white px-[12px] py-[4px] rounded-full text-xs font-bold flex items-center gap-[4px] shadow-lg"><Sparkles className="w-[12px] h-[12px]"/> Promo -{kos.discount}%</span>}
            {kos.verified && <span className="bg-teal-500 text-white px-[12px] py-[4px] rounded-full text-xs font-bold flex items-center gap-[4px] shadow-lg"><ShieldCheck className="w-[12px] h-[12px]"/> Terverifikasi</span>}
            <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-[12px] py-[4px] rounded-full text-xs font-bold">{kos.type}</span>
          </div>
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-[16px] tracking-tight leading-[1.1] drop-shadow-2xl">
            {kos.name}
          </h1>
          <p className="flex items-center gap-[8px] text-white/80 font-medium text-lg drop-shadow-md">
            <MapPin className="w-[20px] h-[20px] text-teal-400" /> {kos.campus}
          </p>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute bottom-[40px] text-white/50 flex flex-col items-center gap-[8px]"
          >
            <span className="text-[10px] uppercase tracking-widest font-bold">Scroll untuk Eksplorasi</span>
            <ArrowDown className="w-[16px] h-[16px]" />
          </motion.div>
        </motion.div>
      </div>

      {/* ==========================================
          SECTION 2: OVERLAPPING CONTENT (Meluncur ke Atas)
          ========================================== */}
      <div className="relative z-10 w-full bg-[#faf9f7] rounded-t-[40px] md:rounded-t-[64px] shadow-[0_-20px_60px_rgba(0,0,0,0.5)] pt-[64px] pb-[120px] px-[24px] lg:px-[56px] -mt-[40px]">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-[64px] items-start">
          
          {/* ---------------- LEFT COLUMN ---------------- */}
          <div className="w-full lg:w-2/3">
            
            {/* Gallery Grid Mini (Khas Editorial) */}
            <RevealOnScroll direction="up">
              <div className="grid grid-cols-2 gap-[12px] md:gap-[16px] mb-[64px]">
                <div className="h-[250px] md:h-[350px] rounded-[24px] overflow-hidden group relative cursor-pointer shadow-sm">
                  <img src={kos.gallery[1]} alt="Interior 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="h-[250px] md:h-[350px] rounded-[24px] overflow-hidden group relative cursor-pointer shadow-sm">
                  <img src={kos.gallery[2]} alt="Interior 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-[#241812]/80 backdrop-blur-md text-white px-[20px] py-[10px] rounded-full text-sm font-bold flex items-center gap-[8px] shadow-xl pointer-events-auto hover:bg-[#241812] transition-colors">
                      <Camera className="w-[16px] h-[16px]" /> Lihat Semua Foto
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Overview & Description */}
            <RevealOnScroll direction="up">
              <div className="pb-[48px] border-b border-slate-200">
                <h2 className="font-playfair text-4xl font-bold text-[#241812] mb-[24px] tracking-tight">Esensi Ruang</h2>
                <p className="text-slate-600 text-lg leading-relaxed font-light whitespace-pre-line">
                  {kos.description}
                </p>
              </div>
            </RevealOnScroll>

            {/* Fasilitas */}
            <RevealOnScroll direction="up">
              <div className="py-[48px] border-b border-slate-200">
                <h2 className="font-playfair text-4xl font-bold text-[#241812] mb-[40px] tracking-tight">Fasilitas Hunian</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-[40px] gap-x-[32px]">
                  {kos.uniqueFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-[20px]">
                      <div className="w-[56px] h-[56px] bg-white border border-slate-200 rounded-[16px] flex items-center justify-center shrink-0 shadow-sm text-teal-700">
                        {feat.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#241812] text-lg mb-[4px]">{feat.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* ==========================================
                LOKASI & POI (Sesuai Referensi Pengguna)
                ========================================== */}
            <RevealOnScroll direction="up">
              <div className="py-[48px] border-b border-slate-200">
                <h2 className="font-playfair text-4xl font-bold text-[#241812] mb-[8px] tracking-tight">Lokasi dan lingkungan sekitar</h2>
                <p className="flex items-center gap-[8px] text-slate-500 font-medium mb-[32px]">
                  <MapPin className="w-[16px] h-[16px] text-teal-600" /> Kawasan {kos.campus}
                </p>

                {/* Interactive Map Wrapper */}
                <div className="relative w-full h-[300px] bg-slate-200 rounded-[32px] overflow-hidden mb-[40px] group cursor-pointer border border-slate-200 shadow-inner">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" alt="Map Visualization" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241812]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-colors duration-500"></div>
                  
                  {/* Radar Pin */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                     <div className="w-[80px] h-[80px] bg-teal-500/20 rounded-full animate-ping absolute -inset-[25px]"></div>
                     <div className="w-[30px] h-[30px] bg-teal-600 border-[4px] border-white rounded-full relative z-10 shadow-[0_10px_20px_rgba(15,118,110,0.5)]"></div>
                  </div>

                  {/* Button Floating */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <button className="bg-[#241812]/90 backdrop-blur-md text-white px-[28px] py-[12px] rounded-[16px] font-bold text-sm transition-all shadow-2xl pointer-events-auto hover:bg-[#241812] hover:scale-105 border border-white/10">
                      Buka Peta Interaktif
                    </button>
                  </div>
                </div>

                {/* Point of Interest (POI) Lists */}
                <div className="flex gap-[12px] mb-[40px]">
                  <button className="px-[24px] py-[10px] bg-[#241812] text-white rounded-full text-sm font-bold shadow-md transition-transform hover:-translate-y-[2px]">Tempat Terdekat</button>
                  <button className="px-[24px] py-[10px] bg-white border border-slate-200 text-slate-600 hover:border-[#241812] hover:text-[#241812] rounded-full text-sm font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-[2px]">Transportasi</button>
                </div>

                <div className="flex flex-col gap-[24px] bg-white p-[32px] rounded-[32px] border border-slate-100 shadow-sm">
                  {nearbyPlaces.map((item, i) => (
                    <div key={i} className="flex items-center gap-[20px] group">
                      <div className="w-[48px] h-[48px] bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center shrink-0 group-hover:bg-teal-50 group-hover:border-teal-200 transition-all duration-300">
                        {item.icon}
                      </div>
                      <div className="flex-1 flex justify-between items-center border-b border-slate-100 pb-[16px] group-hover:border-slate-300 transition-colors">
                        <p className="text-[#241812] font-bold text-lg">{item.name}</p>
                        <p className="text-slate-500 text-sm font-medium bg-slate-50 px-[12px] py-[4px] rounded-[8px]">{item.dist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Reviews */}
            <RevealOnScroll direction="up">
              <div className="py-[48px]">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-[40px] gap-[16px]">
                  <h2 className="font-playfair text-4xl font-bold text-[#241812] tracking-tight">Suara Penghuni</h2>
                  <span className="flex items-center gap-[8px] bg-orange-50 text-orange-700 text-base px-[16px] py-[6px] rounded-full font-bold shadow-sm border border-orange-100">
                    <Star className="w-[16px] h-[16px] fill-orange-500" /> {kos.rating} / 5.0 Rata-rata
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                  {kos.reviewsList.map((review) => (
                    <div key={review.id} className="bg-white p-[32px] rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-[16px] mb-[20px]">
                        <div className="w-[56px] h-[56px] bg-teal-50 border border-teal-100 text-teal-800 font-playfair font-bold text-2xl rounded-full flex items-center justify-center shadow-inner">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-[#241812] text-lg">{review.name}</div>
                          <div className="text-sm text-slate-400">{review.date}</div>
                        </div>
                      </div>
                      <p className="text-slate-600 text-base leading-relaxed italic">"{review.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* ---------------- RIGHT COLUMN: STICKY BOOKING CARD ---------------- */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-[120px]">
            <RevealOnScroll direction="up" delay={200}>
              <div className="bg-white p-[32px] rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-slate-100">
                <div className="mb-[32px]">
                  {kos.isPromo ? (
                    <>
                      <div className="flex items-center gap-[12px] mb-[8px]">
                        <span className="text-lg text-slate-400 line-through decoration-red-500/50 decoration-2">Rp {kos.price}</span>
                        <span className="bg-red-50 text-red-600 border border-red-100 px-[8px] py-[4px] rounded-[6px] text-xs font-bold uppercase tracking-wider">Hemat {kos.discount}%</span>
                      </div>
                      <div className="flex items-end gap-[8px]">
                        <span className="text-5xl font-playfair font-bold text-[#241812] tracking-tight">Rp {kos.discountedPrice}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-end gap-[8px]">
                      <span className="text-5xl font-playfair font-bold text-[#241812] tracking-tight">Rp {kos.price}</span>
                    </div>
                  )}
                  <span className="text-sm text-slate-500 mt-[8px] block font-medium">/bulan, sudah termasuk pajak</span>
                </div>
                
                <div className="bg-[#faf9f7] rounded-[24px] p-[24px] mb-[32px] border border-slate-100">
                  <div className="flex justify-between items-center pb-[16px] border-b border-slate-200 mb-[16px]">
                    <span className="text-slate-600 font-medium">Uang Muka (Booking)</span>
                    <span className="font-bold text-[#241812] text-lg">Rp 500.000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Biaya Platform</span>
                    <span className="font-bold text-teal-700 bg-teal-50 px-[10px] py-[4px] rounded-lg border border-teal-100 text-sm">Gratis</span>
                  </div>
                </div>

                <button className="w-full h-[64px] bg-teal-700 hover:bg-teal-800 text-white font-bold text-lg rounded-[20px] mb-[16px] transition-all shadow-[0_15px_30px_rgba(15,118,110,0.2)] hover:shadow-[0_20px_40px_rgba(15,118,110,0.3)] hover:-translate-y-[2px]">
                  Ajukan Sewa Sekarang
                </button>
                
                <button 
                  onClick={() => setIsChatOpen(true)} 
                  className="w-full h-[64px] bg-white border-2 border-slate-200 hover:border-[#241812] text-[#241812] font-bold text-lg rounded-[20px] transition-all hover:-translate-y-[2px]"
                >
                  Tanya Pemilik via DM
                </button>
                
                <p className="text-center text-xs text-slate-400 mt-[24px] flex items-center justify-center gap-[6px] uppercase tracking-widest font-bold">
                  <ShieldCheck className="w-[14px] h-[14px]" /> KosMate Secure Pay
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>

      </div>

      <ChatDrawer 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        kosName={kos.name} 
      />
    </div>
  );
}