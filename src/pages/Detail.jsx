import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// INI YANG SEBELUMNYA KURANG: ChevronRight sekarang sudah masuk ke daftar import!
import { 
  ChevronLeft, ChevronRight, MapPin, ShieldCheck, Star, 
  Sparkles, Camera, Coffee, ShoppingBag, Landmark, Map, 
  Share, Heart, ArrowDown, CheckCircle2, X, 
  Calendar as CalendarIcon, ArrowRight, Clock, 
  BedDouble, AlertCircle, FileText, Bus, Navigation 
} from 'lucide-react';

import { kosData, getRichKosData } from '../data/dummyData';
import RevealOnScroll from '../components/RevealOnScroll';
import ChatDrawer from '../components/ChatDrawer';

// ======================================================================
// KOMPONEN: FULLSCREEN GALLERY MODAL
// ======================================================================
const GalleryModal = ({ isOpen, onClose, images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const nextImg = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % images.length); };
  const prevImg = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + images.length) % images.length); };

  return (
    <div className="fixed inset-0 z-[300] flex flex-col bg-black/95 backdrop-blur-md">
      <div className="flex justify-between items-center p-[24px] text-white">
        <span className="font-bold tracking-widest text-sm uppercase">Foto {currentIndex + 1} / {images.length}</span>
        <button onClick={onClose} className="p-[8px] bg-white/10 hover:bg-white/20 rounded-full transition-colors"><X className="w-[24px] h-[24px]" /></button>
      </div>
      
      <div className="flex-1 relative flex items-center justify-center overflow-hidden px-[16px]">
        <button onClick={prevImg} className="absolute left-[24px] md:left-[48px] z-10 w-[48px] h-[48px] md:w-[64px] md:h-[64px] bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"><ChevronLeft className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] shrink-0" /></button>
        <motion.img key={currentIndex} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} src={images[currentIndex]} alt="Kos Gallery" className="max-w-full max-h-full object-contain rounded-[16px] shadow-2xl" />
        <button onClick={nextImg} className="absolute right-[24px] md:right-[48px] z-10 w-[48px] h-[48px] md:w-[64px] md:h-[64px] bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"><ChevronRight className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] shrink-0" /></button>
      </div>
      
      <div className="p-[24px] flex justify-center gap-[12px] overflow-x-auto">
        {images.map((img, idx) => (
          <div key={idx} onClick={() => setCurrentIndex(idx)} className={`w-[60px] h-[60px] rounded-[8px] cursor-pointer overflow-hidden border-2 transition-all ${idx === currentIndex ? 'border-teal-500 scale-110 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}>
            <img src={img} alt="Thumb" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

// ======================================================================
// KOMPONEN: MULTI-STEP BOOKING MODAL
// ======================================================================
const BookingModal = ({ isOpen, onClose, kos }) => {
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [paymentOption, setPaymentOption] = useState('full');
  
  useEffect(() => {
    if (isOpen) { setStep(1); setStartDate(''); setPaymentOption('full'); }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => { if (startDate) setStep(2); };

  const baseSewa = kos.isPromo ? kos.discountedPriceNum : kos.priceNum;
  const deposit = 500000;
  const totalTagihan = paymentOption === 'dp' ? deposit : (baseSewa + deposit);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-[24px]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#241812]/80 backdrop-blur-sm cursor-pointer" />
      <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative w-full max-w-[500px] bg-white rounded-[32px] p-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] overflow-y-auto scrollbar-hide">
        <button onClick={onClose} className="absolute top-[24px] right-[24px] text-slate-400 hover:text-[#241812] transition-colors z-10"><X className="w-[24px] h-[24px]" /></button>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="flex flex-col w-full">
              <h2 className="font-playfair text-3xl font-bold text-[#241812] mb-[8px] tracking-tight">Pengajuan Sewa</h2>
              <p className="text-slate-500 mb-[24px] text-sm">Silakan lengkapi detail pengajuan untuk <strong>{kos.name}</strong>.</p>

              <div className="mb-[24px]">
                <label className="text-xs uppercase tracking-widest font-bold text-[#241812]/70 mb-[12px] block">Mulai Ngekos</label>
                <div className="flex items-center w-full bg-slate-50 border border-slate-200 rounded-[16px] focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100 transition-all overflow-hidden">
                  <div className="pl-[16px] pr-[12px] border-r border-slate-200 h-[56px] flex items-center bg-white">
                    <CalendarIcon className="h-[20px] w-[20px] text-teal-600" />
                  </div>
                  <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    className="w-full h-[56px] bg-transparent text-[#241812] text-sm px-[16px] outline-none" 
                  />
                </div>
              </div>

              <div className="mb-[32px]">
                <label className="text-xs uppercase tracking-widest font-bold text-[#241812]/70 mb-[12px] block">Skema Pembayaran Awal</label>
                <div className="grid grid-cols-2 gap-[12px]">
                  <div onClick={() => setPaymentOption('dp')} className={`border-[2px] rounded-[16px] p-[16px] cursor-pointer transition-all ${paymentOption === 'dp' ? 'border-teal-600 bg-teal-50' : 'border-slate-200 bg-white hover:border-teal-300'}`}>
                    <div className="flex justify-between items-start mb-[4px]"><p className="font-bold text-[#241812]">Bayar DP</p><div className={`w-[16px] h-[16px] rounded-full border-[2px] flex items-center justify-center ${paymentOption === 'dp' ? 'border-teal-600' : 'border-slate-300'}`}>{paymentOption === 'dp' && <div className="w-[8px] h-[8px] bg-teal-600 rounded-full"></div>}</div></div>
                    <p className="text-xs text-slate-500">Amankan kamar dengan DP saja.</p>
                  </div>
                  <div onClick={() => setPaymentOption('full')} className={`border-[2px] rounded-[16px] p-[16px] cursor-pointer transition-all ${paymentOption === 'full' ? 'border-teal-600 bg-teal-50' : 'border-slate-200 bg-white hover:border-teal-300'}`}>
                    <div className="flex justify-between items-start mb-[4px]"><p className="font-bold text-[#241812]">Bayar Lunas</p><div className={`w-[16px] h-[16px] rounded-full border-[2px] flex items-center justify-center ${paymentOption === 'full' ? 'border-teal-600' : 'border-slate-300'}`}>{paymentOption === 'full' && <div className="w-[8px] h-[8px] bg-teal-600 rounded-full"></div>}</div></div>
                    <p className="text-xs text-slate-500">DP + Harga sewa 1 bulan.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#faf9f7] p-[20px] rounded-[20px] border border-slate-100 mb-[32px]">
                <h4 className="font-bold text-[#241812] mb-[16px] text-sm border-b border-slate-200 pb-[12px]">Ringkasan Tagihan Pertama</h4>
                <div className="flex justify-between items-center mb-[12px]"><span className="text-slate-500 text-sm">Deposit (Uang Muka)</span><span className="font-bold text-[#241812]">Rp 500.000</span></div>
                {paymentOption === 'full' && (
                  <div className="flex justify-between items-center mb-[12px]"><span className="text-slate-500 text-sm">Sewa Bulan Pertama</span><span className="font-bold text-[#241812]">Rp {baseSewa.toLocaleString('id-ID').replace(/,/g, '.')}</span></div>
                )}
                <div className="flex justify-between items-center pt-[12px] border-t border-slate-200 mt-[4px]"><span className="font-bold text-[#241812]">Total Tagihan</span><span className="font-bold text-teal-700 text-xl">Rp {totalTagihan.toLocaleString('id-ID').replace(/,/g, '.')}</span></div>
              </div>

              <button onClick={handleNext} disabled={!startDate} className="w-full h-[56px] bg-[#241812] text-white rounded-[16px] font-bold shadow-lg hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-[8px]">
                Konfirmasi & Ajukan <ArrowRight className="w-[18px] h-[18px]" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step-2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="flex flex-col items-center text-center w-full">
              <div className="w-[80px] h-[80px] bg-teal-50 border border-teal-100 rounded-full flex items-center justify-center mb-[24px]"><CheckCircle2 className="w-[40px] h-[40px] text-teal-600" /></div>
              <h2 className="font-playfair text-3xl font-bold text-[#241812] mb-[12px] tracking-tight">Pengajuan Berhasil!</h2>
              <p className="text-slate-600 mb-[32px] leading-relaxed text-sm">Permintaan sewa Anda untuk <strong>{kos.name}</strong> mulai tanggal <strong>{new Date(startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</strong> telah diteruskan ke pemilik.</p>
              
              <div className="w-full bg-slate-50 p-[16px] rounded-[16px] border border-slate-100 mb-[32px]">
                <div className="flex justify-between text-sm mb-[8px]"><span className="text-slate-500">ID Booking</span><span className="font-bold text-[#241812]">#KM-{Math.floor(Math.random() * 90000) + 10000}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-500">Status</span><span className="font-bold text-orange-600 bg-orange-100 px-[8px] py-[2px] rounded">Menunggu Verifikasi</span></div>
              </div>

              <button onClick={() => { onClose(); navigate('/'); }} className="w-full h-[56px] bg-teal-700 text-white rounded-[16px] font-bold shadow-[0_10px_20px_rgba(15,118,110,0.2)] hover:bg-teal-800 hover:-translate-y-[2px] transition-all">
                Menuju Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};

// ======================================================================
// HALAMAN DETAIL UTAMA
// ======================================================================
export default function Detail() {
  const { kosId } = useParams();
  const navigate = useNavigate();
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLocationTab, setActiveLocationTab] = useState('terdekat');
  
  const baseKos = kosData.find(k => k.id === parseInt(kosId)) || kosData[0];
  const kos = getRichKosData(baseKos);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

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

  const transportPlaces = [
    { icon: <Bus className="w-[20px] h-[20px] text-slate-600" />, name: "Halte Trans Metro", dist: "200 m" },
    { icon: <Navigation className="w-[20px] h-[20px] text-slate-600" />, name: "Pangkalan Ojek Online", dist: "50 m" },
    { icon: <MapPin className="w-[20px] h-[20px] text-slate-600" />, name: "Stasiun KRL/Kereta", dist: "1.5 km" },
  ];

  const currentTabPlaces = activeLocationTab === 'terdekat' ? nearbyPlaces : transportPlaces;

  return (
    <div className="w-full overflow-x-hidden bg-black font-sans text-[#241812] flex flex-col">
      <AnimatePresence>
        {isBookingOpen && <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} kos={kos} />}
        {isGalleryOpen && <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} images={kos.gallery} />}
      </AnimatePresence>

      <div className={`fixed top-0 w-full h-[80px] z-40 flex items-center justify-between px-[24px] lg:px-[56px] transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-gradient-to-b from-black/60 to-transparent'}`}>
        <button onClick={() => navigate('/search')} className={`flex items-center gap-[8px] font-bold transition-colors ${isScrolled ? 'text-[#241812] hover:text-teal-700' : 'text-white hover:text-white/70'}`}><ChevronLeft className="w-[20px] h-[20px]" /> <span className="hidden md:inline">Kembali</span></button>
        <div className="flex items-center gap-[16px]">
          <button className={`flex items-center gap-[8px] text-sm font-bold transition-colors ${isScrolled ? 'text-slate-600 hover:text-[#241812]' : 'text-white hover:text-white/70'}`}><Share className="w-[18px] h-[18px]" /> <span className="hidden md:inline">Bagikan</span></button>
          <button onClick={() => setIsSaved(!isSaved)} className={`flex items-center gap-[8px] text-sm font-bold transition-colors ${isScrolled ? 'text-slate-600 hover:text-red-500' : 'text-white hover:text-red-400'}`}><Heart className={`w-[18px] h-[18px] ${isSaved ? 'fill-red-500 text-red-500' : ''}`} /> <span className="hidden md:inline">Simpan</span></button>
        </div>
      </div>

      <div ref={heroRef} className="relative w-full h-screen sticky top-0 overflow-hidden z-0">
        <motion.img style={{ y: heroY, scale: heroScale }} src={kos.gallery[0]} alt={kos.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex flex-col justify-end items-center text-center pb-[15vh] px-[24px]">
          <div className="flex flex-wrap justify-center gap-[8px] mb-[24px]">
            {kos.isPromo && <span className="bg-red-500 text-white px-[12px] py-[4px] rounded-full text-xs font-bold flex items-center gap-[4px] shadow-lg"><Sparkles className="w-[12px] h-[12px]"/> Promo -{kos.discount}%</span>}
            {kos.verified && <span className="bg-teal-500 text-white px-[12px] py-[4px] rounded-full text-xs font-bold flex items-center gap-[4px] shadow-lg"><ShieldCheck className="w-[12px] h-[12px]"/> Terverifikasi</span>}
            <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-[12px] py-[4px] rounded-full text-xs font-bold">{kos.type}</span>
          </div>
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-[16px] tracking-tight leading-[1.1] drop-shadow-2xl">{kos.name}</h1>
          <p className="flex items-center gap-[8px] text-white/80 font-medium text-lg drop-shadow-md"><MapPin className="w-[20px] h-[20px] text-teal-400" /> {kos.campus}</p>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="absolute bottom-[40px] text-white/50 flex flex-col items-center gap-[8px]">
            <span className="text-[10px] uppercase tracking-widest font-bold">Scroll untuk Eksplorasi</span>
            <ArrowDown className="w-[16px] h-[16px]" />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 w-full bg-[#faf9f7] rounded-t-[40px] md:rounded-t-[64px] shadow-[0_-20px_60px_rgba(0,0,0,0.5)] pt-[64px] pb-[120px] px-[24px] lg:px-[56px] -mt-[40px]">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-[64px] items-start">
          <div className="w-full lg:w-2/3">
            
            <RevealOnScroll direction="up">
               <div className="flex flex-wrap gap-[16px] mb-[40px] pb-[24px] border-b border-slate-200">
                 <div className="flex items-center gap-[8px] text-slate-500 text-sm"><Clock className="w-[16px] h-[16px]" /> Diperbarui {kos.lastUpdate}</div>
                 <div className="w-[1px] h-[20px] bg-slate-300 hidden md:block"></div>
                 <div className={`flex items-center gap-[8px] text-sm font-bold ${kos.roomsAvailable > 0 ? 'text-teal-700' : 'text-red-500'}`}><BedDouble className="w-[16px] h-[16px]" /> {kos.roomsAvailable > 0 ? `Sisa ${kos.roomsAvailable} Kamar Kosong` : 'Kamar Penuh'}</div>
               </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up">
              <div className="grid grid-cols-2 gap-[12px] md:gap-[16px] mb-[64px]">
                <div onClick={() => setIsGalleryOpen(true)} className="h-[250px] md:h-[350px] rounded-[24px] overflow-hidden group relative cursor-pointer shadow-sm">
                  <img src={kos.gallery[1]} alt="Interior 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div onClick={() => setIsGalleryOpen(true)} className="h-[250px] md:h-[350px] rounded-[24px] overflow-hidden group relative cursor-pointer shadow-sm">
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

            <RevealOnScroll direction="up">
              <div className="pb-[48px] border-b border-slate-200">
                <h2 className="font-playfair text-4xl font-bold text-[#241812] mb-[24px] tracking-tight">Esensi Ruang</h2>
                <p className="text-slate-600 text-lg leading-relaxed font-light whitespace-pre-line">{kos.description}</p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up">
              <div className="py-[48px] border-b border-slate-200">
                <h2 className="font-playfair text-4xl font-bold text-[#241812] mb-[40px] tracking-tight">Fasilitas Hunian</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-[40px] gap-x-[32px]">
                  {kos.uniqueFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-[20px]">
                      <div className="w-[56px] h-[56px] bg-white border border-slate-200 rounded-[16px] flex items-center justify-center shrink-0 shadow-sm text-teal-700">{feat.icon}</div>
                      <div><h4 className="font-bold text-[#241812] text-lg mb-[4px]">{feat.title}</h4><p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up">
              <div className="py-[48px] border-b border-slate-200">
                <h2 className="font-playfair text-4xl font-bold text-[#241812] mb-[32px] tracking-tight">Hal yang perlu diketahui</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
                  <div>
                    <h3 className="flex items-center gap-[8px] text-lg font-bold text-[#241812] mb-[20px]"><AlertCircle className="w-[20px] h-[20px] text-orange-600" /> Peraturan Kos</h3>
                    <ul className="space-y-[12px]">{kos.rules.map((rule, idx) => (<li key={idx} className="flex items-start gap-[12px] text-slate-600 text-sm"><span className="w-[6px] h-[6px] rounded-full bg-slate-300 mt-[8px] shrink-0"></span>{rule}</li>))}</ul>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-[8px] text-lg font-bold text-[#241812] mb-[20px]"><FileText className="w-[20px] h-[20px] text-teal-700" /> Ketentuan Pengajuan</h3>
                    <ul className="space-y-[12px]">{kos.terms.map((term, idx) => (<li key={idx} className="flex items-start gap-[12px] text-slate-600 text-sm"><span className="w-[6px] h-[6px] rounded-full bg-slate-300 mt-[8px] shrink-0"></span>{term}</li>))}</ul>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up">
              <div className="py-[48px] border-b border-slate-200">
                <h2 className="font-playfair text-4xl font-bold text-[#241812] mb-[8px] tracking-tight">Lokasi dan lingkungan sekitar</h2>
                <p className="flex items-center gap-[8px] text-slate-500 font-medium mb-[32px]"><MapPin className="w-[16px] h-[16px] text-teal-600" /> Kawasan {kos.campus}</p>
                <div className="relative w-full h-[300px] bg-slate-200 rounded-[32px] overflow-hidden mb-[40px] group cursor-pointer border border-slate-200 shadow-inner">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" alt="Map Visualization" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241812]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-colors duration-500"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                     <div className="w-[80px] h-[80px] bg-teal-500/20 rounded-full animate-ping absolute -inset-[25px]"></div>
                     <div className="w-[30px] h-[30px] bg-teal-600 border-[4px] border-white rounded-full relative z-10 shadow-[0_10px_20px_rgba(15,118,110,0.5)]"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <button onClick={() => window.open('https://maps.google.com/?q=Universitas+Gadjah+Mada+Yogyakarta', '_blank')} className="bg-[#241812]/90 backdrop-blur-md text-white px-[28px] py-[12px] rounded-[16px] font-bold text-sm transition-all shadow-2xl pointer-events-auto hover:bg-[#241812] hover:scale-105 border border-white/10">Buka Peta Interaktif</button>
                  </div>
                </div>
                <div className="flex gap-[12px] mb-[40px]">
                  <button onClick={() => setActiveLocationTab('terdekat')} className={`px-[24px] py-[10px] rounded-full text-sm font-bold shadow-md transition-transform hover:-translate-y-[2px] ${activeLocationTab === 'terdekat' ? 'bg-[#241812] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#241812] hover:text-[#241812]'}`}>Tempat Terdekat</button>
                  <button onClick={() => setActiveLocationTab('transportasi')} className={`px-[24px] py-[10px] rounded-full text-sm font-bold shadow-md transition-transform hover:-translate-y-[2px] ${activeLocationTab === 'transportasi' ? 'bg-[#241812] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#241812] hover:text-[#241812]'}`}>Transportasi</button>
                </div>
                <div className="flex flex-col gap-[24px] bg-white p-[32px] rounded-[32px] border border-slate-100 shadow-sm">
                  {currentTabPlaces.map((item, i) => (
                    <div key={i} className="flex items-center gap-[20px] group">
                      <div className="w-[48px] h-[48px] bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center shrink-0 group-hover:bg-teal-50 group-hover:border-teal-200 transition-all duration-300">{item.icon}</div>
                      <div className="flex-1 flex justify-between items-center border-b border-slate-100 pb-[16px] group-hover:border-slate-300 transition-colors"><p className="text-[#241812] font-bold text-lg">{item.name}</p><p className="text-slate-500 text-sm font-medium bg-slate-50 px-[12px] py-[4px] rounded-[8px]">{item.dist}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up">
              <div className="py-[48px]">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-[40px] gap-[16px]">
                  <h2 className="font-playfair text-4xl font-bold text-[#241812] tracking-tight">Suara Penghuni</h2>
                  <span className="flex items-center gap-[8px] bg-orange-50 text-orange-700 text-base px-[16px] py-[6px] rounded-full font-bold shadow-sm border border-orange-100"><Star className="w-[16px] h-[16px] fill-orange-500" /> {kos.rating} / 5.0 Rata-rata</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                  {kos.reviewsList.map((review) => (
                    <div key={review.id} className="bg-white p-[32px] rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-[16px] mb-[20px]">
                        <div className="w-[56px] h-[56px] bg-teal-50 border border-teal-100 text-teal-800 font-playfair font-bold text-2xl rounded-full flex items-center justify-center shadow-inner">{review.name.charAt(0)}</div>
                        <div><div className="font-bold text-[#241812] text-lg">{review.name}</div><div className="text-sm text-slate-400">{review.date}</div></div>
                      </div>
                      <p className="text-slate-600 text-base leading-relaxed italic">"{review.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <div className="w-full lg:w-1/3 lg:sticky lg:top-[120px]">
            <RevealOnScroll direction="up" delay={200}>
              <div className="bg-white p-[32px] rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-slate-100">
                <div className="mb-[24px]">
                  {kos.isPromo ? (
                    <><div className="flex items-center gap-[12px] mb-[8px]"><span className="text-lg text-slate-400 line-through decoration-red-500/50 decoration-2">Rp {kos.price}</span><span className="bg-red-50 text-red-600 border border-red-100 px-[8px] py-[4px] rounded-[6px] text-xs font-bold uppercase tracking-wider">Hemat {kos.discount}%</span></div><div className="flex items-end gap-[8px]"><span className="text-5xl font-playfair font-bold text-[#241812] tracking-tight">Rp {kos.discountedPrice}</span></div></>
                  ) : (
                    <div className="flex items-end gap-[8px]"><span className="text-5xl font-playfair font-bold text-[#241812] tracking-tight">Rp {kos.price}</span></div>
                  )}
                  <span className="text-sm text-slate-500 mt-[8px] block font-medium">/bulan, sudah termasuk pajak</span>
                </div>

                <div className="bg-orange-50 border border-orange-100 rounded-[12px] p-[12px] mb-[24px] flex items-center gap-[12px]">
                   <AlertCircle className="w-[20px] h-[20px] text-orange-600 shrink-0" />
                   <p className="text-xs text-orange-800 font-medium">Jangan sampai kehabisan! Saat ini hanya tersisa <strong className="text-orange-600 text-sm">{kos.roomsAvailable} kamar</strong> untuk Anda.</p>
                </div>
                
                <div className="bg-[#faf9f7] rounded-[24px] p-[24px] mb-[32px] border border-slate-100">
                  <div className="flex justify-between items-start pb-[16px] border-b border-slate-200 mb-[16px]">
                    <span className="text-slate-600 font-medium text-sm">Biaya Tambahan</span>
                    <span className="text-[#241812] text-xs text-right max-w-[150px]">{kos.additionalFees}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Biaya Platform</span>
                    <span className="font-bold text-teal-700 bg-teal-50 px-[10px] py-[4px] rounded-lg border border-teal-100 text-sm">Gratis</span>
                  </div>
                </div>

                <button onClick={() => setIsBookingOpen(true)} disabled={kos.roomsAvailable === 0} className="w-full h-[64px] bg-teal-700 hover:bg-teal-800 text-white font-bold text-lg rounded-[20px] mb-[16px] transition-all shadow-[0_15px_30px_rgba(15,118,110,0.2)] hover:shadow-[0_20px_40px_rgba(15,118,110,0.3)] hover:-translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:-translate-y-0">
                  {kos.roomsAvailable > 0 ? "Ajukan Sewa Sekarang" : "Kamar Penuh"}
                </button>
                
                <button onClick={() => setIsChatOpen(true)} className="w-full h-[64px] bg-white border-2 border-slate-200 hover:border-[#241812] text-[#241812] font-bold text-lg rounded-[20px] transition-all hover:-translate-y-[2px]">
                  Tanya Pemilik via DM
                </button>
                
                <p className="text-center text-xs text-slate-400 mt-[24px] flex items-center justify-center gap-[6px] uppercase tracking-widest font-bold"><ShieldCheck className="w-[14px] h-[14px]" /> KosMate Secure Pay</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} kosName={kos.name} />
    </div>
  );
}