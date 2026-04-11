// src/components/ChatDrawer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatDrawer({ isOpen, onClose, kosName }) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // State untuk menyimpan daftar pesan
  const [messages, setMessages] = useState([]);

  // Set pesan awal otomatis dari pemilik saat laci chat dibuka
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: `Halo! Terima kasih sudah tertarik dengan ${kosName || 'properti kami'}. Ada yang bisa saya bantu?`,
          sender: 'owner',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [isOpen, kosName, messages.length]);

  // Efek auto-scroll ke pesan paling bawah setiap ada pesan baru
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Kunci scroll body website saat chat terbuka
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Tambahkan pesan user ke state
    const newUserMsg = {
      id: Date.now(),
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput('');
    
    // 2. Munculkan animasi "Pemilik sedang mengetik..."
    setIsTyping(true);

    // 3. Simulasi balasan otomatis dari pemilik setelah 1.5 detik
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: "Baik, pesan Anda sudah kami terima. Kami akan segera mengecek ketersediaan kamar dan menghubungi Anda kembali secepatnya. Mohon ditunggu ya!",
        sender: 'owner',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop Blur Gelap */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} 
            className="absolute inset-0 bg-[#241812]/40 backdrop-blur-sm cursor-pointer"
          />
          
          {/* Panel Chat dari Kanan */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
            className="relative w-full max-w-[450px] h-[100vh] bg-[#f5efe9] shadow-2xl flex flex-col"
          >
            {/* Header Chat */}
            <div className="bg-white p-[24px] shadow-sm flex items-center justify-between border-b border-slate-100 z-10">
              <div className="flex items-center gap-[16px]">
                <div className="relative">
                  <div className="w-[48px] h-[48px] bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                    <User className="w-[24px] h-[24px] text-slate-400" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-[14px] h-[14px] bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-[#241812] leading-tight">Pemilik Kos</h3>
                  <p className="text-xs text-green-600 font-medium">Online</p>
                </div>
              </div>
              <button onClick={onClose} className="p-[8px] bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 hover:text-[#241812] transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Area Balon Pesan (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-[24px] flex flex-col gap-[16px]">
              <div className="text-center mb-[16px]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-200/50 px-[12px] py-[4px] rounded-full">
                  Hari Ini
                </span>
              </div>

              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
                  <div className={`p-[16px] text-sm md:text-base shadow-sm ${msg.sender === 'user' ? 'bg-[#241812] text-white rounded-[20px] rounded-tr-[4px]' : 'bg-white text-slate-700 rounded-[20px] rounded-tl-[4px] border border-slate-100'}`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-[4px] px-[4px] font-medium">{msg.time}</span>
                </div>
              ))}

              {/* Indikator Animasi Mengetik */}
              {isTyping && (
                <div className="self-start bg-white border border-slate-100 rounded-[20px] rounded-tl-[4px] p-[16px] shadow-sm flex items-center gap-[4px]">
                  <span className="w-[8px] h-[8px] bg-slate-300 rounded-full animate-bounce"></span>
                  <span className="w-[8px] h-[8px] bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                  <span className="w-[8px] h-[8px] bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Text Area */}
            <form onSubmit={handleSend} className="p-[20px] bg-white border-t border-slate-100 flex items-center gap-[12px] z-10">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pesan Anda..."
                className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 text-sm py-[14px] px-[20px] rounded-full focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-[48px] h-[48px] bg-[#241812] text-white flex items-center justify-center rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors shadow-md shrink-0"
              >
                <Send className="w-[20px] h-[20px] ml-[2px]" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}