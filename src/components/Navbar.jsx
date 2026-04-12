import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ShadcnNavbar({ isMobileMenuOpen, setIsMobileMenuOpen, onOpenContact }) {
  const navigate = useNavigate();
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const isLightPage = location.pathname.startsWith('/about');

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousFocus = document.activeElement;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    setTimeout(() => mobileMenuRef.current?.querySelector('button')?.focus(), 100);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocus) previousFocus.focus();
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  const handleNav = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // LOGIKA TEMA BARU: Memperbaiki background saat di-scroll pada halaman terang
  const scrolledBg = isLightPage ? 'bg-white/95 shadow-sm border-b border-slate-100' : 'bg-[#241812]/95 shadow-lg';
  const useDarkText = isLightPage; // Di halaman terang, text harus selalu gelap (baik di top maupun scrolled)

  const logoColor = useDarkText ? 'text-[#241812]' : 'text-white/90';
  const menuLinkColor = useDarkText ? 'text-[#241812]/80 hover:text-[#241812]' : 'text-white/80 hover:text-white';
  const iconHover = useDarkText ? 'hover:bg-[#241812]/10 text-[#241812]' : 'hover:bg-white/10 text-white';
  
  const loginBtnColor = useDarkText ? 'text-[#241812]' : 'text-[#D4AF37]';
  const loginBtnBorder = useDarkText ? 'border border-[#241812]/50' : 'border border-[#D4AF37]/50';
  const loginBtnHover = useDarkText 
    ? 'hover:text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]' 
    : 'hover:text-white hover:border-white hover:bg-white/10';

  const bgGradient = isLightPage ? 'before:from-[#faf9f7]/90' : 'before:from-black/60';

  return (
    <header className={`w-full fixed top-0 left-0 z-50 pointer-events-none transition-all duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${isScrolled ? `${scrolledBg} backdrop-blur-md` : `bg-transparent before:absolute before:inset-0 before:bg-gradient-to-b ${bgGradient} before:to-transparent before:-z-10 before:h-[140px]`}`}>
      
      <nav className="w-full h-[80px] md:h-[100px] px-[24px] lg:px-[56px] grid grid-cols-2 md:grid-cols-3 items-center pointer-events-auto box-border">
        <div className="justify-self-start cursor-pointer" onClick={() => handleNav('/')}>
          <span className={`font-crimson text-[28px] md:text-[32px] font-light ${logoColor} whitespace-nowrap drop-shadow-sm tracking-tight transition-colors duration-300`}>kos mate</span>
        </div>
        
        <div className="hidden md:flex justify-self-center items-center gap-[32px] lg:gap-[56px]">
          <button onClick={() => handleNav('/')} className={`font-forum text-[13px] font-light tracking-[0.2em] transition-colors duration-300 whitespace-nowrap ${menuLinkColor}`}>Beranda</button>
          <button onClick={() => handleNav('/search')} className={`font-forum text-[13px] font-light tracking-[0.2em] transition-colors duration-300 whitespace-nowrap ${menuLinkColor}`}>Cari Kost</button>
          <button onClick={onOpenContact} className={`font-forum text-[13px] font-light tracking-[0.2em] transition-colors duration-300 whitespace-nowrap ${menuLinkColor}`}>Contact</button>
          <button onClick={() => handleNav('/about')} className={`font-forum text-[13px] font-light tracking-[0.2em] transition-colors duration-300 whitespace-nowrap ${menuLinkColor}`}>About</button>
        </div>

        <div className="justify-self-end flex items-center">
          <button 
            onClick={() => handleNav('/signin')} 
            className={`hidden md:flex items-center justify-center font-forum text-xs font-bold tracking-[0.1em] h-[48px] px-[24px] rounded-full transition-all duration-300 whitespace-nowrap shadow-sm hover:shadow-lg hover:-translate-y-[2px] ${loginBtnColor} ${loginBtnBorder} ${loginBtnHover}`}
          >
            Masuk
          </button>
          <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Buka menu navigasi" className={`md:hidden p-[8px] rounded-full transition-colors ml-[16px] ${iconHover}`}>
            <Menu className="h-[26px] w-[26px]" strokeWidth={1.5} />
          </button>
        </div>
      </nav>
      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end pointer-events-auto">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={() => setIsMobileMenuOpen(false)}></div>
          <nav ref={mobileMenuRef} role="dialog" aria-modal="true" aria-label="Menu mobile" className="relative w-[80%] h-full max-w-[400px] bg-[#fdfcf9] p-[32px] shadow-2xl animate-in slide-in-from-right flex flex-col font-forum">
            <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Tutup menu navigasi" className="absolute right-[24px] top-[24px] text-slate-400 hover:text-slate-800 transition-colors">
              <X className="h-[28px] w-[28px]" strokeWidth={1.5} />
            </button>
            <div className="flex flex-col space-y-[32px] mt-[64px]">
              <button onClick={() => handleNav('/')} className="text-left font-normal text-xl text-slate-800 tracking-[0.05em] border-b border-solid border-slate-100 pb-[16px]">Beranda</button>
              <button onClick={() => handleNav('/search')} className="text-left font-normal text-xl text-slate-800 tracking-[0.05em] border-b border-solid border-slate-100 pb-[16px]">Cari Kost</button>
              <button onClick={() => { setIsMobileMenuOpen(false); onOpenContact(); }} className="text-left font-normal text-xl text-slate-800 tracking-[0.05em] border-b border-solid border-slate-100 pb-[16px]">Contact</button>
              <button onClick={() => handleNav('/about')} className="text-left font-normal text-xl text-slate-800 tracking-[0.05em] border-b border-solid border-slate-100 pb-[16px]">About</button>
              <button onClick={() => handleNav('/signin')} className="bg-teal-800 hover:bg-teal-900 transition-colors text-white h-[56px] px-[24px] text-lg font-normal tracking-[0.1em] mt-[32px] rounded-lg">Masuk</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}