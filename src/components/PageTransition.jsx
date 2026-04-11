// src/components/PageTransition.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function PageTransition({ children }) {
  return (
    <motion.div
      // Halaman baru dimulai dari bawah (y: 20) dan transparan
      initial={{ opacity: 0, y: 20 }}
      // Halaman masuk ke posisi normal dan terlihat jelas
      animate={{ opacity: 1, y: 0 }}
      // Halaman lama bergeser ke atas (y: -20) dan memudar saat keluar
      exit={{ opacity: 0, y: -20 }}
      // Durasi 0.4s dengan kurva easing yang halus (sinematik)
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex flex-col flex-1"
    >
      {children}
    </motion.div>
  );
}