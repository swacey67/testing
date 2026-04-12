import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactDrawer({ isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusableElements.length) return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    setTimeout(() => { modalRef.current?.querySelector('button')?.focus(); }, 100);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocus) previousFocus.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#241812]/60 backdrop-blur-sm cursor-pointer" />
          
          <motion.div 
            ref={modalRef}
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="contact-heading"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }} 
            className="relative w-full max-w-[600px] h-[100vh] bg-[#f5efe9] shadow-2xl flex flex-col p-[32px] md:p-[64px] overflow-y-auto"
          >
            <button onClick={onClose} aria-label="Tutup modal" className="absolute hidden md:flex items-center justify-center top-1/2 -left-[80px] -translate-y-1/2 text-white/70 hover:text-white transition-transform hover:scale-110"><X size={48} strokeWidth={1} /></button>
            <button onClick={onClose} aria-label="Tutup modal" className="md:hidden absolute top-[24px] right-[24px] text-[#241812] hover:opacity-70 transition-opacity"><X size={32} strokeWidth={1.5} /></button>
            
            <h2 id="contact-heading" className="font-playfair text-[4rem] md:text-[5rem] leading-none text-[#241812] mb-[48px] tracking-tight">contact <span className="italic">us</span></h2>
            
            <form aria-label="Formulir kontak" className="flex flex-col gap-[32px] flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
                <div className="flex flex-col gap-[8px]">
                  <label htmlFor="contact-firstname" className="text-xs text-[#241812]/70 uppercase tracking-wider font-medium">First Name</label>
                  <input id="contact-firstname" type="text" className="bg-transparent border-b border-[#241812]/20 py-[8px] focus:outline-none focus:border-[#241812] transition-colors text-[#241812]" />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <label htmlFor="contact-lastname" className="text-xs text-[#241812]/70 uppercase tracking-wider font-medium">Last Name</label>
                  <input id="contact-lastname" type="text" className="bg-transparent border-b border-[#241812]/20 py-[8px] focus:outline-none focus:border-[#241812] transition-colors text-[#241812]" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
                <div className="flex flex-col gap-[8px]">
                  <label htmlFor="contact-email" className="text-xs text-[#241812]/70 uppercase tracking-wider font-medium">Email</label>
                  <input id="contact-email" type="email" className="bg-transparent border-b border-[#241812]/20 py-[8px] focus:outline-none focus:border-[#241812] transition-colors text-[#241812]" />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <label htmlFor="contact-phone" className="text-xs text-[#241812]/70 uppercase tracking-wider font-medium">Phone Number</label>
                  <input id="contact-phone" type="tel" defaultValue="+62 " className="bg-transparent border-b border-[#241812]/20 py-[8px] focus:outline-none focus:border-[#241812] transition-colors text-[#241812]" />
                </div>
              </div>
              <div className="flex flex-col gap-[8px] mt-[16px]">
                <label htmlFor="contact-message" className="text-xs text-[#241812]/70 uppercase tracking-wider font-medium">Your Message</label>
                <textarea id="contact-message" rows="2" className="bg-transparent border-b border-[#241812]/20 py-[8px] focus:outline-none focus:border-[#241812] transition-colors text-[#241812] resize-none"></textarea>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[24px] mt-[32px] pt-[32px]">
                <label htmlFor="contact-privacy" className="flex items-center gap-[12px] cursor-pointer group">
                  <input id="contact-privacy" type="checkbox" className="w-[20px] h-[20px] rounded-full border border-[#241812]/40 appearance-none checked:bg-[#241812] cursor-pointer transition-colors" />
                  <span className="text-sm text-[#241812]/80">You agree to our friendly Privacy Policy.</span>
                </label>
                <button type="button" className="bg-[#241812] text-[#f5efe9] px-[40px] py-[12px] rounded-[999px] font-medium hover:bg-[#3a2a22] transition-colors whitespace-nowrap">Submit</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}