import React, { useState, useEffect, useRef } from 'react';
import { X, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatDrawer({ isOpen, onClose, kosName }) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const modalRef = useRef(null);
  
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length === 0) return;
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
    
    setTimeout(() => {
      const focusable = modalRef.current?.querySelectorAll('button, input, textarea');
      if (focusable?.length) focusable[1]?.focus();
    }, 100);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocus) previousFocus.focus();
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Bungkus dengan setTimeout
      const timer = setTimeout(() => {
        setMessages([{ id: 1, text: `Halo! Terima kasih sudah tertarik dengan ${kosName || 'properti kami'}. Ada yang bisa saya bantu?`, sender: 'owner', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, kosName, messages.length]);

  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newUserMsg = { id: Date.now(), text: input, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: "Baik, pesan Anda sudah kami terima. Kami akan segera mengecek ketersediaan kamar.", sender: 'owner', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#241812]/40 backdrop-blur-sm cursor-pointer" />
          
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Live Chat dengan Pemilik"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
            className="relative w-full sm:max-w-[450px] h-[100vh] bg-[#f5efe9] shadow-2xl flex flex-col sm:rounded-none rounded-t-[24px]"
          >
            <div className="bg-white px-[24px] pb-[24px] pt-[16px] sm:pt-[24px] shadow-sm flex flex-col border-b border-slate-100 z-10 sm:rounded-none rounded-t-[24px]">
              {/* HANDLE SWIPE (Hanya muncul di Mobile) */}
              <div className="w-full flex justify-center pb-[16px] sm:hidden">
                <div className="w-[40px] h-[4px] bg-slate-300 rounded-full"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[16px]">
                  <div className="relative">
                    <div className="w-[48px] h-[48px] bg-slate-100 rounded-full flex items-center justify-center border border-slate-200"><User className="w-[24px] h-[24px] text-slate-400" /></div>
                    <span className="absolute bottom-0 right-0 w-[14px] h-[14px] bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#241812] leading-tight">Pemilik Kos</h3>
                    <p className="text-xs text-green-600 font-medium">Online</p>
                  </div>
                </div>
                <button onClick={onClose} aria-label="Tutup chat" className="p-[8px] bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 hover:text-[#241812] transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-[24px] flex flex-col gap-[16px]">
              <div className="text-center mb-[16px]"><span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-200/50 px-[12px] py-[4px] rounded-full">Hari Ini</span></div>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
                  <div className={`p-[16px] text-sm md:text-base shadow-sm ${msg.sender === 'user' ? 'bg-[#241812] text-white rounded-[20px] rounded-tr-[4px]' : 'bg-white text-slate-700 rounded-[20px] rounded-tl-[4px] border border-slate-100'}`}>{msg.text}</div>
                  <span className="text-[10px] text-slate-400 mt-[4px] px-[4px] font-medium">{msg.time}</span>
                </div>
              ))}
              {isTyping && (
                <div className="self-start bg-white border border-slate-100 rounded-[20px] rounded-tl-[4px] p-[16px] shadow-sm flex items-center gap-[4px]">
                  <span className="w-[8px] h-[8px] bg-slate-300 rounded-full animate-bounce"></span><span className="w-[8px] h-[8px] bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span><span className="w-[8px] h-[8px] bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} aria-label="Formulir kirim pesan" className="p-[20px] bg-white border-t border-slate-100 flex items-center gap-[12px] z-10 pb-[env(safe-area-inset-bottom,20px)]">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pesan Anda..."
                className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 text-sm py-[14px] px-[20px] rounded-full focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
              />
              <button type="submit" aria-label="Kirim pesan" disabled={!input.trim()} className="w-[48px] h-[48px] bg-[#241812] text-white flex items-center justify-center rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors shadow-md shrink-0">
                <Send className="w-[20px] h-[20px] ml-[2px]" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}