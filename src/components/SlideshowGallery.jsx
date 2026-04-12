import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { locationSlides } from '../data/dummyData';

export default function SlideshowGallery() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const nextSlide = (e) => { e.stopPropagation(); setCurrent((prev) => (prev + 1) % locationSlides.length); };
  const prevSlide = (e) => { e.stopPropagation(); setCurrent((prev) => (prev - 1 + locationSlides.length) % locationSlides.length); };

  return (
    <div className="relative w-full h-[100vh] overflow-hidden bg-black shrink-0 group select-none cursor-pointer" onClick={() => navigate('/gallery')}>
      {locationSlides.map((slide, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[15s] ease-out" style={{ backgroundImage: `url(${slide.img})`, transform: i === current ? 'scale(1.1)' : 'scale(1)' }}></div>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
            <div className="font-playfair text-center flex flex-col items-center px-[24px]">
              <span className={`text-2xl md:text-4xl tracking-[0.2em] md:tracking-[0.3em] uppercase font-light drop-shadow-lg opacity-90 translate-y-[10px] md:translate-y-[20px] transition-all duration-1000 delay-300 ${i === current ? 'opacity-100 translate-y-0' : 'opacity-0'}`}>{slide.text[0]}</span>
              <span className={`text-5xl md:text-7xl lg:text-8xl tracking-tight font-extrabold drop-shadow-2xl transition-all duration-1000 delay-500 ${i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}`}>{slide.text[1]}</span>
            </div>
          </div>
        </div>
      ))}
      <button aria-label="Lihat slide sebelumnya" className="absolute left-[16px] md:left-[48px] top-1/2 -translate-y-1/2 z-30 w-[48px] h-[48px] md:w-[64px] md:h-[64px] rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 hover:scale-110" onClick={prevSlide}><ChevronLeft className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] shrink-0" /></button>
      <button aria-label="Lihat slide berikutnya" className="absolute right-[16px] md:right-[48px] top-1/2 -translate-y-1/2 z-30 w-[48px] h-[48px] md:w-[64px] md:h-[64px] rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 hover:scale-110" onClick={nextSlide}><ChevronRight className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] shrink-0" /></button>
      <div className="absolute bottom-[32px] md:bottom-[48px] left-1/2 -translate-x-1/2 z-20 text-white/90 font-medium tracking-widest text-xs md:text-sm px-[24px] py-[8px] border border-white/20 rounded-full backdrop-blur-md pointer-events-none">0{current + 1} / 0{locationSlides.length}</div>
    </div>
  );
}