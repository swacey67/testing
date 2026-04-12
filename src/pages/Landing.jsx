import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, useAnimationFrame } from 'framer-motion';
import { Search, Home, ShieldCheck, Star, CreditCard, Eye, MapPin, Smartphone } from 'lucide-react';

// IMPORT KOMPONEN EKSTERNAL
import RevealOnScroll from '../components/RevealOnScroll';
import SlideshowGallery from '../components/SlideshowGallery';

// ======================================================================
// DATA LOKAL
// ======================================================================
const features = [
  { title: "Smart Search", description: "Filter presisi membantu Anda menemukan properti idaman tanpa membuang waktu.", icon: <Search className="w-[28px] h-[28px] stroke-[1.5]" /> },
  { title: "Transparansi Total", description: "Visual asli, deskripsi akurat, dan rincian harga final. Tanpa biaya tersembunyi.", icon: <Home className="w-[28px] h-[28px] stroke-[1.5]" /> },
  { title: "Kurasi Ketat", description: "Setiap properti melewati tahap verifikasi untuk menjamin standar kualitas & keamanan.", icon: <ShieldCheck className="w-[28px] h-[28px] stroke-[1.5]" /> },
  { title: "Ulasan Autentik", description: "Kumpulan perspektif nyata dari penghuni sebelumnya untuk referensi Anda.", icon: <Star className="w-[28px] h-[28px] stroke-[1.5]" /> },
  { title: "Transaksi Seamless", description: "Sistem reservasi dan pembayaran digital yang terenkripsi penuh.", icon: <CreditCard className="w-[28px] h-[28px] stroke-[1.5]" /> },
  { title: "Immersive Tour", description: "Eksplorasi ruang secara menyeluruh melalui teknologi virtual 360°.", icon: <Eye className="w-[28px] h-[28px] stroke-[1.5]" /> }
];

const steps = [
  { step: "01", title: "Cari Lokasi", description: "Gunakan fitur pencarian untuk menemukan kos.", icon: <MapPin className="w-[40px] h-[40px] shrink-0" /> },
  { step: "02", title: "Bandingkan", description: "Cek fasilitas dan bandingkan harga antar kos.", icon: <Search className="w-[40px] h-[40px] shrink-0" /> },
  { step: "03", title: "Reservasi", description: "Booking langsung via aplikasi tanpa perantara.", icon: <Smartphone className="w-[40px] h-[40px] shrink-0" /> }
];

// ======================================================================
// KOMPONEN LOKAL: INFINITE GRID BACKGROUND
// ======================================================================
const GridPattern = ({ offsetX, offsetY }) => (
  <svg className="w-full h-full">
    <defs>
      <motion.pattern id="grid-pattern" width="54" height="54" patternUnits="userSpaceOnUse" x={offsetX} y={offsetY}>
        <path d="M 54 0 L 0 0 0 54" fill="none" stroke="rgba(255,255,255,1)" strokeWidth="1" />
      </motion.pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
  </svg>
);

const InteractiveGridSection = ({ children, className, id, refProp, style }) => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);
  const isVisible = useRef(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  useAnimationFrame(() => {
    if (!isVisible.current) return;
    gridOffsetX.set((gridOffsetX.get() + 0.4) % 54);
    gridOffsetY.set((gridOffsetY.get() + 0.4) % 54);
  });

  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <motion.section
      id={id}
      ref={(node) => {
        sectionRef.current = node;
        if (typeof refProp === 'function') refProp(node);
        else if (refProp) refProp.current = node;
      }}
      style={style}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
        </div>
        <motion.div
          className="absolute inset-0 opacity-[0.25]"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        >
          <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
        </motion.div>
      </div>
      <div className="relative z-10 w-full h-full flex flex-col items-center">
        {children}
      </div>
    </motion.section>
  );
};

// ======================================================================
// HALAMAN UTAMA: LANDING
// ======================================================================
export default function Landing() {
  const navigate = useNavigate();
  const section2Ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: section2Ref,
    offset: ['start end', 'start start'],
  });

  // LOGIKA ANIMASI BARU (Luxury / Premium Feel)
  const opacity1 = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale1   = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const y2       = useTransform(scrollYProgress, [0, 1], ['6vh', '0vh']);
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);

  return (
    <div className="w-full overflow-x-hidden font-sans animate-in fade-in duration-700 flex flex-col bg-black">
      
      <main className="relative bg-[#06060e]">
        
        {/* SECTION 1: HERO */}
        <motion.section 
          style={{ scale: scale1, opacity: opacity1 }} 
          className="sticky top-0 h-screen w-full overflow-hidden bg-[#1a2e2b] flex flex-col z-0 drop-shadow-2xl will-change-transform"
        >
          <img src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=2126&q=80" alt="City Background" className="absolute top-0 left-0 w-full h-full object-cover opacity-40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e2b]/95 via-[#1a2e2b]/60 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e2b]/95 via-[#1a2e2b]/20 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 w-full h-full max-w-[1280px] mx-auto px-[24px] lg:px-[56px] text-left flex flex-col justify-center">
            <div className="max-w-[896px]">
              <RevealOnScroll direction="left" delay={100}>
                <h1 className="font-playfair text-white leading-[1.1] mb-[24px] drop-shadow-2xl tracking-tight text-5xl md:text-7xl lg:text-8xl mt-[80px]">
                  A smart way,<br/><span className="italic font-normal text-teal-100">To find your stay.</span>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll direction="left" delay={300}>
                <p className="text-base md:text-xl lg:text-2xl text-teal-50/90 mb-[48px] max-w-[672px] drop-shadow-md font-light leading-relaxed">
                  Temukan ribuan pilihan kost terbaik, nyaman & terjangkau di seluruh Indonesia.
                </p>
              </RevealOnScroll>
              <RevealOnScroll direction="up" delay={500}>
                <button onClick={() => navigate('/search')} className="bg-white text-[#241812] hover:bg-[#241812] hover:text-white font-sans tracking-[0.1em] text-sm uppercase h-[56px] md:h-[64px] rounded-full px-[40px] md:px-[56px] transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center shrink-0 w-max cursor-pointer">
                  Mulai Pencarian
                </button>
              </RevealOnScroll>
            </div>
          </div>
        </motion.section>

        {/* SECTION 2: KENAPA HARUS KOSMATE */}
        <InteractiveGridSection 
          refProp={section2Ref}
          style={{ y: y2, opacity: opacity2 }}
          className="z-10 w-full min-h-screen bg-[#241812] flex flex-col pt-[100px] pb-[160px] md:pt-[160px] md:pb-[200px] drop-shadow-[0_-20px_25px_rgba(0,0,0,0.8)] will-change-transform"
        >
          <div className="relative z-10 max-w-[1280px] w-full mx-auto px-[24px] lg:px-[56px] flex flex-col gap-[80px] md:gap-[120px]">
            <RevealOnScroll direction="up">
              <div className="flex flex-col lg:flex-row gap-[32px] lg:gap-[64px] items-start lg:items-end border-b border-white/10 pb-[48px]">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-[#eae0d5] tracking-tight leading-[1.1] lg:w-1/2">
                  Standar baru <br/> <span className="italic text-teal-300">mencari hunian.</span>
                </h2>
                <p className="text-[#eae0d5]/60 text-lg md:text-xl font-light leading-relaxed lg:w-1/2">
                  Kami membuang semua kerumitan dan ketidakpastian. Menghadirkan pengalaman kurasi properti yang transparan, aman, dan berestetika tinggi.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[64px] gap-y-[80px]">
              {features.map((feature, index) => (
                <RevealOnScroll key={index} delay={index * 100} direction="up">
                  <div className="flex flex-col items-start group cursor-pointer pointer-events-auto">
                    <div className="w-[64px] h-[64px] rounded-full border border-white/20 flex items-center justify-center mb-[24px] text-[#eae0d5] group-hover:bg-[#eae0d5] group-hover:text-[#241812] group-hover:border-[#eae0d5] transition-all duration-500 shrink-0 shadow-lg">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-playfair text-[#eae0d5] mb-[16px] tracking-tight group-hover:text-teal-300 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-[#eae0d5]/60 leading-relaxed font-light text-base">{feature.description}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </InteractiveGridSection>

      </main>

      {/* SECTION 3: SLIDESHOW GALLERY */}
      <section className="relative z-20 w-full shrink-0 drop-shadow-[0_-30px_30px_rgba(0,0,0,0.8)] bg-black will-change-transform">
        <SlideshowGallery onNavigate={navigate} />
      </section>

      {/* SECTION 4: CARA KERJA */}
      <InteractiveGridSection id="carakerja" className="z-10 min-h-[100vh] flex flex-col justify-center py-[120px] md:py-[160px] bg-[#241812] text-white w-full shrink-0 border-t border-white/5">
        <div className="max-w-[1280px] w-full mx-auto px-[24px] lg:px-[56px] relative z-10 flex flex-col gap-[80px] md:gap-[120px]">
          
          <RevealOnScroll direction="up">
            <div className="flex flex-col lg:flex-row gap-[32px] lg:gap-[64px] items-start lg:items-end border-b border-white/10 pb-[48px]">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-[#eae0d5] tracking-tight leading-[1.1] lg:w-1/2">
                Kemudahan dalam <br/> <span className="italic text-teal-300">tiga langkah.</span>
              </h2>
              <p className="text-[#eae0d5]/60 text-lg md:text-xl font-light leading-relaxed lg:w-1/2">
                Tidak perlu lagi menghabiskan akhir pekan untuk survei. Sistem pintar kami menyederhanakan segalanya.
              </p>
            </div>
          </RevealOnScroll>

          <div className="flex flex-col md:flex-row justify-center items-start gap-[48px] md:gap-[32px] w-full">
            {steps.map((step, index) => (
              <RevealOnScroll key={index} delay={index * 200} direction={index === 0 ? "left" : index === 2 ? "right" : "up"} className="flex-1 w-full">
                <div className="flex-1 flex flex-col items-center text-center relative w-full pointer-events-auto">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-[48px] left-[60%] w-[80%] h-[1px] bg-white/10"></div>
                  )}
                  <div className="w-[96px] h-[96px] rounded-full bg-[#241812] border border-white/20 flex items-center justify-center mb-[32px] z-10 relative shrink-0 text-[#eae0d5] hover:bg-white hover:text-[#241812] transition-colors duration-500 group cursor-pointer shadow-lg">
                    <div className="absolute -top-[12px] -right-[12px] w-[32px] h-[32px] rounded-full bg-teal-800 text-white font-sans font-medium flex items-center justify-center text-xs shrink-0 shadow-sm border-[4px] border-[#241812]">
                      {step.step}
                    </div>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-playfair text-[#eae0d5] mb-[16px] tracking-tight">{step.title}</h3>
                  <p className="text-base text-[#eae0d5]/60 px-[16px] font-light leading-relaxed">{step.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          
        </div>
      </InteractiveGridSection>

    </div>
  );
}