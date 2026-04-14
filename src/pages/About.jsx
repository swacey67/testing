import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { teamMembers } from '../data/dummyData';
import RevealOnScroll from '../components/RevealOnScroll';

// ─── DATA ────────────────────────────────────────────────────────────────────

const stats = [
  { value: '25+', label: 'Kota di Indonesia' },
  { value: '12K+', label: 'Properti Terverifikasi' },
  { value: '98%', label: 'Kepuasan Penyewa' },
  { value: '6', label: 'Orang di Balik Layar' },
];

const values = [
  {
    no: '01',
    title: 'Transparansi',
    body:
      'Setiap detail properti — harga, foto, fasilitas — ditampilkan apa adanya. Tidak ada biaya tersembunyi, tidak ada informasi yang menyesatkan.',
  },
  {
    no: '02',
    title: 'Aksesibilitas',
    body:
      'Kami percaya hunian nyaman bukan hak istimewa. KosMate dirancang agar siapa pun bisa menemukan kamar impian dengan mudah.',
  },
  {
    no: '03',
    title: 'Keamanan',
    body:
      'Setiap properti melewati proses kurasi ketat. Sistem pembayaran terenkripsi dan data pribadi pengguna selalu terlindungi.',
  },
  {
    no: '04',
    title: 'Inovasi',
    body:
      'Dari virtual tour 360° hingga filter berbasis jarak fakultas — kami terus mendorong batas teknologi demi pengalaman terbaik.',
  },
];

// ─── HELPER ──────────────────────────────────────────────────────────────────

const Divider = ({ light = false }) => (
  <div
    className={`w-full h-px ${light ? 'bg-[#eae0d5]/20' : 'bg-[#241812]/10'}`}
  />
);

// ─── SECTIONS ────────────────────────────────────────────────────────────────

/** HERO */
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-[#241812] overflow-hidden flex flex-col justify-end"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#eae0d5 1px,transparent 1px),linear-gradient(90deg,#eae0d5 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Large decorative number */}
      <motion.div
        style={{ y }}
        className="absolute top-0 right-0 font-playfair text-[28vw] leading-none text-[#eae0d5]/[0.04] select-none pointer-events-none tracking-tighter"
      >
        KM
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-[24px] lg:px-[56px] pb-[80px] pt-[180px]">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-[12px] mb-[40px]"
        >
          <span className="text-teal-400 font-forum text-xs tracking-[0.4em] uppercase">
            Tentang Kami
          </span>
          <div className="flex-1 h-px bg-teal-400/30 max-w-[80px]" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-playfair text-[#eae0d5] text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-[40px]"
        >
          Kami hadir untuk <br />
          <em className="text-teal-300 not-italic">menyederhanakan</em> <br />
          cara kamu tinggal.
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-[#eae0d5]/55 text-lg md:text-xl font-light leading-relaxed max-w-[560px]"
        >
          KosMate lahir dari frustrasi nyata: mencari kos yang jujur, terjangkau,
          dan dekat kampus itu susah. Kami mengubahnya menjadi pengalaman yang
          menyenangkan.
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center gap-[12px] mt-[64px]"
        >
          <div className="w-[1px] h-[48px] bg-teal-400/40" />
          <span className="text-[10px] text-[#eae0d5]/30 uppercase tracking-[0.35em] font-bold">
            Gulir ke bawah
          </span>
        </motion.div>
      </div>
    </section>
  );
};

/** STATS BAR */
const StatsSection = () => (
  <section className="bg-teal-800 py-[48px] px-[24px] lg:px-[56px]">
    <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-[40px]">
      {stats.map((s, i) => (
        <RevealOnScroll key={i} delay={i * 80} direction="up">
          <div className="flex flex-col items-start md:items-center text-center">
            <span className="font-playfair text-4xl md:text-5xl font-bold text-white tracking-tight">
              {s.value}
            </span>
            <span className="text-teal-200/70 text-xs font-bold uppercase tracking-[0.2em] mt-[6px]">
              {s.label}
            </span>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  </section>
);

/** MISSION */
const MissionSection = () => (
  <section className="bg-[#faf9f7] py-[100px] md:py-[140px] px-[24px] lg:px-[56px]">
    <div className="max-w-[1280px] mx-auto">
      <RevealOnScroll direction="up">
        <div className="flex flex-col lg:flex-row gap-[64px] items-start">
          {/* Left label */}
          <div className="lg:w-[280px] shrink-0">
            <p className="text-teal-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-[16px]">
              Misi & Visi
            </p>
            <div className="w-[40px] h-[3px] bg-teal-700" />
          </div>

          {/* Right content */}
          <div className="flex-1 flex flex-col gap-[48px]">
            <div>
              <h2 className="font-playfair text-4xl md:text-5xl text-[#241812] tracking-tight leading-[1.1] mb-[24px]">
                Visi kami adalah platform <br />
                <em>properti paling dipercaya</em> <br /> di Indonesia.
              </h2>
            </div>

            <Divider />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
              <div>
                <h3 className="font-playfair text-2xl text-[#241812] mb-[16px] tracking-tight">
                  Misi
                </h3>
                <p className="text-[#241812]/60 leading-relaxed font-light">
                  Membangun ekosistem properti sewa yang jujur, efisien, dan
                  inklusif — menghubungkan pencari kos dengan pemilik properti
                  terpercaya di seluruh Indonesia melalui teknologi terkini.
                </p>
              </div>
              <div>
                <h3 className="font-playfair text-2xl text-[#241812] mb-[16px] tracking-tight">
                  Komitmen
                </h3>
                <p className="text-[#241812]/60 leading-relaxed font-light">
                  Setiap fitur yang kami bangun berpusat pada satu pertanyaan:
                  apakah ini benar-benar memudahkan hidup pengguna kami? Jika
                  tidak, kami tidak merilisnya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

/** VALUES */
const ValuesSection = () => (
  <section className="bg-[#1c1410] py-[100px] md:py-[140px] px-[24px] lg:px-[56px]">
    <div className="max-w-[1280px] mx-auto">
      <RevealOnScroll direction="up">
        <div className="flex flex-col lg:flex-row items-start gap-[64px] mb-[80px]">
          <div className="lg:w-[280px] shrink-0">
            <p className="text-teal-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-[16px]">
              Nilai-Nilai
            </p>
            <div className="w-[40px] h-[3px] bg-teal-400" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl text-[#eae0d5] tracking-tight leading-[1.1]">
            Prinsip yang memandu <br />
            <em className="text-teal-300">setiap keputusan</em> kami.
          </h2>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-[#eae0d5]/10">
        {values.map((v, i) => (
          <RevealOnScroll key={i} delay={i * 80} direction="none">
            <div className="bg-[#1c1410] p-[40px] md:p-[48px] group hover:bg-[#241812] transition-colors duration-500">
              <span className="font-playfair text-[#eae0d5]/15 text-7xl font-bold leading-none select-none">
                {v.no}
              </span>
              <h3 className="font-playfair text-2xl md:text-3xl text-[#eae0d5] tracking-tight mt-[16px] mb-[16px] group-hover:text-teal-300 transition-colors duration-300">
                {v.title}
              </h3>
              <div className="w-[32px] h-[2px] bg-teal-700 group-hover:w-[64px] group-hover:bg-teal-400 transition-all duration-500 mb-[20px]" />
              <p className="text-[#eae0d5]/50 leading-relaxed font-light text-sm md:text-base">
                {v.body}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

/** TEAM */
const TeamSection = () => (
  <section className="bg-[#faf9f7] py-[100px] md:py-[140px] px-[24px] lg:px-[56px]">
    <div className="max-w-[1280px] mx-auto">
      {/* Header */}
      <RevealOnScroll direction="up">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-[40px] mb-[72px]">
          <div className="lg:w-[280px] shrink-0">
            <p className="text-teal-700 font-bold text-[10px] uppercase tracking-[0.4em] mb-[16px]">
              Tim Kami
            </p>
            <div className="w-[40px] h-[3px] bg-teal-700" />
          </div>
          <div className="flex-1">
            <h2 className="font-playfair text-4xl md:text-5xl text-[#241812] tracking-tight leading-[1.1]">
              Enam orang, satu <em>mimpi</em>.
            </h2>
            <p className="mt-[16px] text-[#241812]/55 font-light leading-relaxed max-w-[480px]">
              KosMate dibangun oleh mahasiswa yang pernah merasakan sulitnya
              mencari tempat tinggal. Kami tahu permasalahan ini karena kami
              pernah mengalaminya.
            </p>
          </div>
        </div>
      </RevealOnScroll>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px]">
        {teamMembers.map((member, index) => (
          <RevealOnScroll key={member.id} delay={index * 80} direction="up" className="h-full">
            <div className="group h-full border border-[#241812]/8 bg-white rounded-[20px] overflow-hidden hover:shadow-[0_24px_48px_rgba(36,24,18,0.08)] hover:-translate-y-[4px] transition-all duration-500 flex flex-col">
              {/* Color band top */}
              <div className="h-[6px] bg-gradient-to-r from-teal-600 to-teal-800 group-hover:from-teal-400 group-hover:to-teal-700 transition-all duration-500" />

              {/* Body */}
              <div className="p-[32px] flex flex-col flex-1">
                {/* Initial avatar */}
                <div className="flex items-center gap-[20px] mb-[28px]">
                  <div className="w-[64px] h-[64px] rounded-[16px] bg-[#241812] flex items-center justify-center shrink-0">
                    <span className="font-playfair text-3xl font-bold text-teal-300 leading-none">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl font-bold text-[#241812] tracking-tight leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-teal-700 text-[10px] font-bold uppercase tracking-[0.25em] mt-[4px]">
                      {member.role}
                    </p>
                  </div>
                </div>

                <Divider />

                {/* Bio */}
                <p className="text-[#241812]/55 text-sm leading-relaxed font-light mt-[24px] flex-1">
                  {member.bio}
                </p>

                {/* Index tag */}
                <div className="mt-[24px] flex justify-end">
                  <span className="font-playfair text-5xl font-bold text-[#241812]/[0.05] leading-none select-none group-hover:text-teal-100 transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

/** CLOSING */
const ClosingSection = () => (
  <section className="bg-[#241812] py-[120px] md:py-[160px] px-[24px] lg:px-[56px] relative overflow-hidden">
    {/* Decorative grid */}
    <div
      className="absolute inset-0 opacity-[0.035] pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(#eae0d5 1px,transparent 1px),linear-gradient(90deg,#eae0d5 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    />

    <div className="relative max-w-[1280px] mx-auto flex flex-col items-center text-center">
      <RevealOnScroll direction="up">
        <div className="flex items-center gap-[16px] mb-[40px]">
          <div className="w-[48px] h-px bg-teal-400/40" />
          <span className="text-teal-400 text-[10px] font-bold uppercase tracking-[0.4em]">
            The KosMate Team
          </span>
          <div className="w-[48px] h-px bg-teal-400/40" />
        </div>

        <blockquote className="font-playfair text-3xl md:text-5xl lg:text-6xl text-[#eae0d5] leading-[1.15] tracking-tight mb-[56px] max-w-[800px]">
          "Kami tidak sekadar membangun platform.{' '}
          <em className="text-teal-300">
            Kami merancang pengalaman tinggal yang lebih manusiawi.
          </em>
          "
        </blockquote>

        <Divider light />

        <p className="text-[#eae0d5]/35 text-sm font-light mt-[40px] uppercase tracking-[0.25em]">
          Dibuat dengan bangga · 2026 · KosMate
        </p>
      </RevealOnScroll>
    </div>
  </section>
);

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <div className="w-full overflow-x-hidden font-sans">
      <HeroSection />
      <StatsSection />
      <MissionSection />
      <ValuesSection />
      <TeamSection />
      <ClosingSection />
    </div>
  );
}