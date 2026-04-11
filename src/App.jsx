// src/App.jsx
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Import Komponen Global
import ShadcnNavbar from './components/Navbar';
import FooterReplica from './components/Footer';
import ContactDrawer from './components/ContactDrawer';
import PageTransition from './components/PageTransition';

// Import Pages
import LandingView from './pages/Landing';
import SearchView from './pages/Search';
import AboutView from './pages/About';
import GalleryView from './pages/Gallery';
import SignInView from './pages/SignIn';
import KosDetailView from './pages/Detail';

// Komponen Pembungkus Layout Otomatis (Navbar & Footer)
const Layout = ({ children, isMobileMenuOpen, setIsMobileMenuOpen, setIsContactOpen }) => {
  const location = useLocation();
  
  // LOGIKA VISIBILITAS: Cek di halaman mana user berada
  const isAuthPage = location.pathname === '/signin';
  const isDetailPage = location.pathname.startsWith('/detail');

  // Sembunyikan Navbar global di Sign In DAN Detail (karena Detail punya Navbar sendiri yang immersive)
  const showGlobalNavbar = !isAuthPage && !isDetailPage;
  
  // Sembunyikan Footer HANYA di halaman Sign In
  const showGlobalFooter = !isAuthPage;

  return (
    // Wrapper Flexbox: Memaksa tinggi minimal selayar penuh
    <div className="flex flex-col min-h-screen w-full bg-[#faf9f7]">
      
      {/* Navbar dengan Animasi Masuk/Keluar */}
      <AnimatePresence>
        {showGlobalNavbar && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 w-full z-50"
          >
            <ShadcnNavbar 
              isMobileMenuOpen={isMobileMenuOpen} 
              setIsMobileMenuOpen={setIsMobileMenuOpen} 
              onOpenContact={() => setIsContactOpen(true)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Area Konten Utama 
          (flex-1 akan mengisi sisa ruang layar dan mendesak footer SELALU ke paling bawah) */}
      <main className="flex flex-col flex-1 w-full relative">
        {children}
      </main>

      {/* Footer dengan Animasi Fade-In */}
      <AnimatePresence>
        {showGlobalFooter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full shrink-0 mt-auto z-30"
          >
            <FooterReplica onOpenContact={() => setIsContactOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

// Komponen Khusus untuk Menangani Animasi Rute
const AnimatedRoutes = () => {
  const location = useLocation();

  // Scroll to top otomatis saat pindah rute
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        {/* Setiap Route dibungkus oleh PageTransition untuk animasi mulus */}
        <Route path="/" element={<PageTransition><LandingView /></PageTransition>} />
        <Route path="/search" element={<PageTransition><SearchView /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutView /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><GalleryView /></PageTransition>} />
        <Route path="/signin" element={<PageTransition><SignInView /></PageTransition>} />
        
        {/* Rute Dinamis untuk ID Kost */}
        <Route path="/detail/:kosId" element={<PageTransition><KosDetailView /></PageTransition>} />
        
      </Routes>
    </AnimatePresence>
  );
};

// Komponen Utama Aplikasi
export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <HashRouter>
      <Layout 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setIsContactOpen={setIsContactOpen}
      >
        <AnimatedRoutes />
        
        {/* Modal Global Contact Us */}
        <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </Layout>
    </HashRouter>
  );
}