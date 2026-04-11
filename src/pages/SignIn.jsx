import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100vh] w-full flex bg-[#faf9f7] font-sans text-[#241812] fixed inset-0 z-[100]">
      {/* Gambar Kiri */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-[#241812]">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" alt="Luxury Interior" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#241812]/90 via-[#241812]/20 to-transparent"></div>
        <div className="absolute bottom-[15%] left-[10%] pr-[10%]">
          <h1 className="font-playfair text-5xl text-[#eae0d5] mb-[16px] leading-[1.1] tracking-tight">Temukan ruang<br/><span className="italic text-teal-300">kenyamananmu.</span></h1>
          <p className="text-[#eae0d5]/80 text-lg font-light max-w-[400px]">Masuk untuk menyimpan properti favorit dan mengelola jadwal kunjungan Anda dengan mudah.</p>
        </div>
      </div>

      {/* Form Kanan */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-[32px] sm:px-[64px] py-[48px] relative overflow-y-auto">
        <button onClick={() => navigate(-1)} className="absolute top-[32px] left-[32px] sm:left-[64px] flex items-center gap-[8px] text-slate-500 hover:text-[#241812] transition-colors font-medium text-sm">
          <ChevronLeft className="w-[18px] h-[18px]" /> Kembali
        </button>
        <div className="w-full max-w-[400px] mx-auto mt-[40px]">
          <div className="mb-[48px]">
            <h2 className="font-playfair text-4xl font-bold text-[#241812] mb-[8px] tracking-tight">Selamat Datang</h2>
            <p className="text-slate-500 text-sm">Silakan masukkan kredensial akun Anda.</p>
          </div>
          <form className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[8px]"><label className="text-xs uppercase tracking-wider font-bold text-[#241812]/70">Email</label><input type="email" placeholder="nama@email.com" className="w-full border-b border-slate-300 py-[12px] bg-transparent focus:outline-none focus:border-[#241812] transition-colors placeholder:text-slate-300 text-[#241812] font-medium" /></div>
            <div className="flex flex-col gap-[8px]"><label className="text-xs uppercase tracking-wider font-bold text-[#241812]/70">Password</label><input type="password" placeholder="••••••••" className="w-full border-b border-slate-300 py-[12px] bg-transparent focus:outline-none focus:border-[#241812] transition-colors placeholder:text-slate-300 text-[#241812] font-medium" /></div>
            <div className="flex items-center justify-between mt-[8px]">
              <label className="flex items-center gap-[8px] cursor-pointer group"><input type="checkbox" className="w-[16px] h-[16px] rounded-[4px] border border-slate-300 appearance-none checked:bg-[#241812] cursor-pointer transition-colors" /><span className="text-sm text-slate-600">Ingat saya</span></label>
              <a href="#" className="text-sm font-medium text-[#241812] hover:underline">Lupa password?</a>
            </div>
            <button type="button" className="w-full bg-[#241812] text-[#eae0d5] py-[16px] rounded-[999px] font-bold hover:bg-[#3a2a22] transition-all mt-[16px] shadow-lg hover:shadow-xl hover:-translate-y-[2px]">Masuk</button>
            <div className="relative flex items-center justify-center mt-[24px] mb-[8px]"><div className="absolute w-full border-t border-slate-200"></div><span className="bg-[#faf9f7] px-[16px] text-xs text-slate-400 relative z-10 uppercase tracking-wider font-bold">Atau masuk dengan</span></div>
            <button type="button" className="w-full bg-white border border-slate-200 text-[#241812] py-[16px] rounded-[999px] font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-[12px]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}