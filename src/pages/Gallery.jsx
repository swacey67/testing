import React, { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { galleryImagesPool } from '../data/dummyData';
import RevealOnScroll from '../components/RevealOnScroll';

const AnimatedImage = ({ src, className, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div ref={ref} className={`relative w-full h-full rounded-[16px] md:rounded-[24px] overflow-hidden bg-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] hover:z-10 transition-all duration-500 cursor-pointer ${className || ''}`}>
      <img 
        src={src} 
        alt={`Foto galeri properti KosMate ${index + 1}`} 
        loading="lazy" 
        onLoad={() => setIsLoaded(true)} 
        className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${isInView && isLoaded ? 'opacity-100' : 'opacity-0'}`} 
      />
      <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300"></div>
    </div>
  );
};

export default function Gallery() {
  return (
    <div className="w-full overflow-x-hidden bg-[#faf9f7] font-sans text-slate-800 flex flex-col">
      <div className="bg-[#241812] pt-[160px] pb-[80px] md:pb-[120px] rounded-b-[40px] md:rounded-b-[64px] relative z-10 shrink-0 shadow-2xl">
        <div className="max-w-[1280px] w-full mx-auto px-[16px] sm:px-[24px] lg:px-[48px] text-center">
          <RevealOnScroll direction="up">
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#eae0d5] mb-[24px] tracking-tight">Curated <span className="italic text-teal-300">Spaces</span></h1>
            <p className="text-base md:text-xl lg:text-2xl text-[#eae0d5]/70 max-w-[768px] mx-auto font-light leading-relaxed">Jelajahi koleksi visual eksklusif dari berbagai properti premium yang tersedia di seluruh nusantara.</p>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-[1280px] w-full mx-auto px-[16px] sm:px-[24px] lg:px-[48px] relative z-20 flex-1 -mt-[40px] md:-mt-[60px] pb-[120px]">
        <div className="bg-white rounded-[32px] p-[16px] md:p-[32px] lg:p-[48px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[160px] md:auto-rows-[240px] gap-[12px] md:gap-[20px] grid-flow-dense">
            {galleryImagesPool.map((src, i) => {
              let spanClass = "col-span-1 row-span-1";
              if (i % 7 === 0) spanClass = "col-span-2 row-span-2";
              else if (i % 5 === 0) spanClass = "col-span-2 row-span-1";
              else if (i % 4 === 0) spanClass = "col-span-1 row-span-2";
              return <AnimatedImage key={i} src={src} className={spanClass} index={i} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}