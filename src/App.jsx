// src/App.jsx
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

// Import Komponen Global
import ShadcnNavbar from './components/Navbar';
import FooterReplica from './components/Footer';
import ContactDrawer from './components/ContactDrawer';

// Import Pages
import LandingView from './pages/Landing';
import SearchView from './pages/Search';
import AboutView from './pages/About';
import GalleryView from './pages/Gallery';
import SignInView from './pages/SignIn';
import KosDetailView from './pages/Detail';

// Komponen Pembungkus untuk Layout Otomatis (Navbar & Footer)
const Layout = ({ children, isMobileMenuOpen, setIsMobileMenuOpen, setIsContactOpen }) => {
  const location = useLocation();
  // Menyembunyikan navbar/footer di halaman tertentu (misal: SignIn atau Intro)
  const hideLayout = location.pathname === '/signin';

  // Scroll to top otomatis saat pindah page
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {!hideLayout && (
        <div className="fixed top-0 w-full z-50">
          <ShadcnNavbar 
            isMobileMenuOpen={isMobileMenuOpen} 
            setIsMobileMenuOpen={setIsMobileMenuOpen} 
            onOpenContact={() => setIsContactOpen(true)} 
          />
        </div>
      )}
      
      {/* Render Halaman di sini */}
      {children}

      {!hideLayout && (
        <FooterReplica onOpenContact={() => setIsContactOpen(true)} />
      )}
    </>
  );
};

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
        <Routes>
          {/* Ini adalah daftar URL Anda! */}
          <Route path="/" element={<LandingView />} />
          <Route path="/search" element={<SearchView />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/signin" element={<SignInView />} />
          
          {/* Rute Dinamis untuk ID Kost */}
          <Route path="/detail/:kosId" element={<KosDetailView />} />
        </Routes>

        {/* Modal Global */}
        <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </Layout>
    </HashRouter>
  );
}