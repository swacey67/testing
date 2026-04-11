import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FooterReplica({ onOpenContact }) {
  const navigate = useNavigate();

  // Class seragam untuk semua teks menu di Footer (Button maupun Link)
  const menuClass = "text-[#eae0d5]/80 hover:text-white transition-colors duration-300 text-left w-max font-sans";

  return (
    <footer className="bg-[#241812] text-[#eae0d5] pt-[64px] md:pt-[96px] overflow-hidden flex flex-col relative w-full shrink-0 font-sans z-30">
      <div className="max-w-[1280px] w-full mx-auto px-[24px] lg:px-[48px] flex flex-col z-10 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start mb-[64px] md:mb-[96px] gap-[48px]">
          
          {/* Logo Footer */}
          <div className="font-playfair text-4xl md:text-6xl leading-[1.1] tracking-tight">
            kos mate,<br /><span className="italic">in motion</span>
          </div>
          
          {/* Grid Menu */}
          <div className="grid grid-cols-3 gap-[32px] md:gap-[80px] text-sm md:text-base font-medium">
            
            {/* Kolom 1 (Navigasi Internal) */}
            <div className="flex flex-col gap-[16px]">
              <button onClick={() => navigate('/')} className={menuClass}>Beranda</button>
              <button onClick={() => navigate('/search')} className={menuClass}>Cari Kost</button>
              <button onClick={onOpenContact} className={menuClass}>Contact</button>
              <button onClick={() => navigate('/about')} className={menuClass}>About</button>
            </div>
            
            {/* Kolom 2 (Informasi) */}
            <div className="flex flex-col gap-[16px]">
              <a href="#" className={menuClass}>Events</a>
              <a href="#" className={menuClass}>Press</a>
              <a href="#" className={menuClass}>Rewards</a>
              <a href="#" className={menuClass}>FAQ</a>
              <a href="#" className={menuClass}>Careers</a>
            </div>
            
            {/* Kolom 3 (Sosial Media) */}
            <div className="flex flex-col gap-[16px]">
              <a href="#" className={menuClass}>Instagram</a>
              <a href="#" className={menuClass}>WhatsApp</a>
              <a href="#" className={menuClass}>LinkedIn</a>
            </div>

          </div>
        </div>
        
        {/* Garis Pembatas */}
        <div className="w-full h-[1px] bg-[#eae0d5] opacity-20 mb-[24px]"></div>
        
        {/* Footer Bawah (Copyright & Legal) */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-[#eae0d5]/60 gap-[16px]">
          <div>© 2026 KosMate. All rights reserved.</div>
          <div className="flex items-center gap-[24px]">
            <a href="#" className="hover:text-[#eae0d5] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#eae0d5] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#eae0d5] transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
      
      {/* Teks Raksasa di Latar Belakang Bawah */}
      <div className="w-full mt-auto flex justify-center pointer-events-none select-none pb-[16px] md:pb-[32px]">
        <span className="font-playfair text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] leading-none text-[#eae0d5] tracking-tighter whitespace-nowrap">kos mate</span>
      </div>
    </footer>
  );
}