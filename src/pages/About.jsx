import React from 'react';
import { teamMembers } from '../data/dummyData';
import RevealOnScroll from '../components/RevealOnScroll';

export default function About() {
  return (
    <div className="w-full overflow-x-hidden bg-[#faf9f7] font-sans text-[#241812] flex flex-col">
      
      {/* HERO SECTION: Elegan & Penuh White Space */}
      <div className="relative w-full pt-[180px] pb-[100px] px-[24px] lg:px-[56px] flex flex-col items-center justify-center text-center">
        <RevealOnScroll direction="up">
          <p className="text-teal-800 uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-[32px]">
            Di Balik Layar KosMate
          </p>
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-normal text-[#241812] mb-[40px] tracking-tight leading-[1.1]">
            Mendefinisikan ulang <br/> <span className="italic text-teal-900">cara Anda menetap.</span>
          </h1>
          <p className="text-base md:text-xl text-[#241812]/60 max-w-[700px] mx-auto font-light leading-relaxed">
            Kami membuang segala kerumitan dalam mencari hunian. KosMate adalah wujud dedikasi kami untuk transparansi, kenyamanan, dan estetika tanpa kompromi.
          </p>
        </RevealOnScroll>
      </div>

      {/* TEAM SECTION: Gaya Editorial / Majalah Mewah */}
      <div className="max-w-[1280px] w-full mx-auto px-[24px] lg:px-[56px] py-[120px] border-t border-[#241812]/10">
        <RevealOnScroll direction="up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[100px] gap-[32px]">
            <h2 className="font-playfair text-4xl md:text-6xl text-[#241812] leading-[1.1]">
              The <span className="italic text-teal-800">Visionaries.</span>
            </h2>
            <p className="text-[#241812]/60 font-light max-w-[400px] md:text-right">
              Kelompok 6.
            </p>
          </div>
        </RevealOnScroll>

        {/* Grid dibuat jauh lebih longgar (gap-y sangat besar) agar tidak bertabrakan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[48px] gap-y-[120px]">
          {teamMembers.map((member, index) => (
            <RevealOnScroll key={member.id} delay={(index % 3) * 150} direction="up" className="flex flex-col group cursor-pointer">
              
              {/* Foto dengan rasio portrait 3:4, efek grayscale -> warna */}
              <div className="w-full aspect-[3/4] overflow-hidden mb-[32px] bg-[#ebebeb] rounded-[8px]">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                />
              </div>
              
              {/* Informasi Tim dengan Tipografi Renggang */}
              <div className="flex flex-col flex-1">
                <h3 className="font-playfair text-2xl md:text-3xl text-[#241812] mb-[8px] tracking-tight">
                  {member.name}
                </h3>
                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-teal-800 mb-[24px] pb-[24px] border-b border-[#241812]/10">
                  {member.role}
                </p>
                <p className="text-[#241812]/60 text-sm leading-relaxed font-light flex-1">
                  {member.bio}
                </p>
              </div>
              
            </RevealOnScroll>
          ))}
        </div>
      </div>
      
    </div>
  );
}