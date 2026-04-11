import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ShieldCheck, Star, MapPin, ArrowRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export default function PromoSection({ kosData }) {
  const navigate = useNavigate();
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
          <p className="text-sm md:text-base text-slate-500 italic">Diskon spesial berakhir besok!</p>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
        {promoItems.map((kos, index) => (
          <RevealOnScroll key={`promo-${kos.id}`} delay={index * 100} direction="up" className="h-full">
            <div onClick={() => navigate(`/detail/${kos.id}`)} className="bg-white/80 backdrop-blur-md rounded-[24px] overflow-hidden border border-red-100 shadow-[0_8px_30px_rgba(239,68,68,0.06)] hover:shadow-[0_20px_40px_rgba(239,68,68,0.12)] hover:-translate-y-[8px] transition-all duration-300 group cursor-pointer flex flex-col h-full relative">
              <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-gradient-to-bl from-red-500/10 to-transparent rounded-bl-full pointer-events-none z-0"></div>
              
              <div className="relative h-[220px] overflow-hidden shrink-0 bg-slate-100">
                <img src={kos.image} alt={kos.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-[16px] left-[16px] flex flex-col gap-[8px] items-start z-10">
                  <div className="bg-red-500/95 backdrop-blur-sm h-[32px] px-[12px] rounded-[8px] flex items-center gap-[6px] shadow-md"><Sparkles className="w-[14px] h-[14px] text-white shrink-0" /><span className="text-xs font-bold text-white whitespace-nowrap">-{kos.discount}% OFF</span></div>
                  {kos.verified && <div className="bg-white/95 backdrop-blur-sm h-[32px] px-[12px] rounded-[8px] flex items-center gap-[6px] shadow-sm"><ShieldCheck className="w-[16px] h-[16px] text-teal-600 shrink-0" /><span className="text-xs font-bold text-teal-900 whitespace-nowrap">Terverifikasi</span></div>}
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
                    <div className="flex flex-col"><p className="text-xs text-slate-400 line-through mb-[2px]">Rp {kos.price}</p><p className="font-extrabold text-red-600 text-lg">Rp {kos.discountedPrice}<span className="text-xs text-red-400 font-normal">/bln</span></p></div>
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
}