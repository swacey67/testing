import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactDrawer({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#241812]/60 backdrop-blur-sm cursor-pointer" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }} className="relative w-full max-w-[600px] h-[100vh] bg-[#f5efe9] shadow-2xl flex flex-col p-[32px] md:p-[64px] overflow-y-auto">
            <button onClick={onClose} className="absolute hidden md:flex items-center justify-center top-1/2 -left-[80px] -translate-y-1/2 text-white/70 hover:text-white transition-transform hover:scale-110"><X size={48} strokeWidth={1} /></button>
            <button onClick={onClose} className="md:hidden absolute top-[24px] right-[24px] text-[#241812] hover:opacity-70 transition-opacity"><X size={32} strokeWidth={1.5} /></button>
            <h2 className="font-playfair text-[4rem] md:text-[5rem] leading-none text-[#241812] mb-[48px] tracking-tight">contact <span className="italic">us</span></h2>
            <form className="flex flex-col gap-[32px] flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
                <div className="flex flex-col gap-[8px]"><label className="text-xs text-[#241812]/70 uppercase tracking-wider font-medium">First Name</label><input type="text" className="bg-transparent border-b border-[#241812]/20 py-[8px] focus:outline-none focus:border-[#241812] transition-colors text-[#241812]" /></div>
                <div className="flex flex-col gap-[8px]"><label className="text-xs text-[#241812]/70 uppercase tracking-wider font-medium">Last Name</label><input type="text" className="bg-transparent border-b border-[#241812]/20 py-[8px] focus:outline-none focus:border-[#241812] transition-colors text-[#241812]" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
                <div className="flex flex-col gap-[8px]"><label className="text-xs text-[#241812]/70 uppercase tracking-wider font-medium">Email</label><input type="email" className="bg-transparent border-b border-[#241812]/20 py-[8px] focus:outline-none focus:border-[#241812] transition-colors text-[#241812]" /></div>
                <div className="flex flex-col gap-[8px]"><label className="text-xs text-[#241812]/70 uppercase tracking-wider font-medium">Phone Number</label><input type="tel" defaultValue="+62 " className="bg-transparent border-b border-[#241812]/20 py-[8px] focus:outline-none focus:border-[#241812] transition-colors text-[#241812]" /></div>
              </div>
              <div className="flex flex-col gap-[8px] mt-[16px]"><label className="text-xs text-[#241812]/70 uppercase tracking-wider font-medium">Your Message</label><textarea rows="2" className="bg-transparent border-b border-[#241812]/20 py-[8px] focus:outline-none focus:border-[#241812] transition-colors text-[#241812] resize-none"></textarea></div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[24px] mt-[32px] pt-[32px]">
                <label className="flex items-center gap-[12px] cursor-pointer group"><input type="checkbox" className="w-[20px] h-[20px] rounded-full border border-[#241812]/40 appearance-none checked:bg-[#241812] cursor-pointer transition-colors" /><span className="text-sm text-[#241812]/80">You agree to our friendly Privacy Policy.</span></label>
                <button type="button" className="bg-[#241812] text-[#f5efe9] px-[40px] py-[12px] rounded-[999px] font-medium hover:bg-[#3a2a22] transition-colors whitespace-nowrap">Submit</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}