import React, { useEffect, useRef, useState } from 'react';
import { X, Move } from 'lucide-react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Mapping propertyType ke foto panorama 360° yang sesuai
const TOUR_IMAGES = {
  Kos: [
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=3840&q=80",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=3840&q=80",
  ],
  Apartment: [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=3840&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=3840&q=80",
  ],
  Rumah: [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=3840&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=3840&q=80",
  ],
};

export default function VirtualTourModal({ isOpen, onClose, kos }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const sphericalRef = useRef({ theta: 0, phi: Math.PI / 2 });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    
    setIsLoading(true);
    const loadTimer = setTimeout(() => setIsLoading(true), 0);
    let cleanup;
    
    const initThreeJS = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.set(0, 0, 0.1);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      // OPTIMASI: Batasi pixel ratio maksimal di 1.5 untuk performa GPU
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      mountRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1);

      const imagePool = TOUR_IMAGES[kos?.propertyType] || TOUR_IMAGES['Kos'];
      const imageUrl = imagePool[kos?.id % imagePool.length] || imagePool[0];

      const loader = new THREE.TextureLoader();
      const texture = loader.load(
        imageUrl,
        () => { setIsLoading(false); }
      );
      texture.colorSpace = THREE.SRGBColorSpace;

      const material = new THREE.MeshBasicMaterial({ map: texture });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      const updateCamera = () => {
        const { theta, phi } = sphericalRef.current;
        camera.lookAt(
          Math.sin(phi) * Math.cos(theta),
          Math.cos(phi),
          Math.sin(phi) * Math.sin(theta)
        );
      };

      const onMouseDown = (e) => {
        isDragging.current = true;
        previousMouse.current = { x: e.clientX, y: e.clientY };
      };
      const onMouseMove = (e) => {
        if (!isDragging.current) return;
        const dx = e.clientX - previousMouse.current.x;
        const dy = e.clientY - previousMouse.current.y;
        sphericalRef.current.theta -= dx * 0.005;
        sphericalRef.current.phi = Math.max(0.2, Math.min(Math.PI - 0.2,
          sphericalRef.current.phi + dy * 0.005));
        previousMouse.current = { x: e.clientX, y: e.clientY };
        updateCamera();
      };
      const onMouseUp = () => { isDragging.current = false; };
      const onTouchStart = (e) => {
        if (e.touches.length > 0) {
          isDragging.current = true;
          previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      };
      const onTouchMove = (e) => {
        if (!isDragging.current || e.touches.length === 0) return;
        const dx = e.touches[0].clientX - previousMouse.current.x;
        const dy = e.touches[0].clientY - previousMouse.current.y;
        sphericalRef.current.theta -= dx * 0.005;
        sphericalRef.current.phi = Math.max(0.2, Math.min(Math.PI - 0.2,
          sphericalRef.current.phi + dy * 0.005));
        previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        updateCamera();
      };

      let lastInteraction = Date.now();
      const onInteraction = () => { lastInteraction = Date.now(); };

      renderer.domElement.addEventListener('mousedown', onMouseDown);
      renderer.domElement.addEventListener('mousedown', onInteraction);
      renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: false });
      renderer.domElement.addEventListener('touchstart', onInteraction, { passive: false });
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onMouseUp);

      const onKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', onKeyDown);

      const onResize = () => {
        if (!mountRef.current) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      let frameId;
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        if (!isDragging.current && Date.now() - lastInteraction > 2000) {
          sphericalRef.current.theta += 0.0005;
          updateCamera();
        }
        renderer.render(scene, camera);
      };

      updateCamera();
      animate();

      return () => {
        cancelAnimationFrame(frameId);
        
        renderer.domElement.removeEventListener('mousedown', onMouseDown);
        renderer.domElement.removeEventListener('mousedown', onInteraction);
        renderer.domElement.removeEventListener('touchstart', onTouchStart);
        renderer.domElement.removeEventListener('touchstart', onInteraction);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onMouseUp);
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('resize', onResize);

        geometry.dispose();
        material.dispose();
        texture.dispose();
        renderer.dispose();
        renderer.forceContextLoss();

        if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      };
    };

    const timer = setTimeout(() => {
      cleanup = initThreeJS();
    }, 100);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, [isOpen, kos, onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[400] flex flex-col bg-black"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-[24px] py-[20px] bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <h3 className="text-white font-playfair text-xl font-bold">
            Virtual Tour — {kos?.name}
          </h3>
          <p className="text-white/60 text-xs mt-[2px]">
            {kos?.propertyType} · {kos?.campus}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Tutup virtual tour"
          className="pointer-events-auto w-[44px] h-[44px] bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
        >
          <X className="w-[20px] h-[20px]" />
        </button>
      </div>

      {/* Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black pointer-events-none">
          <div className="w-[48px] h-[48px] rounded-full border-[3px] border-white/10 border-t-teal-400 animate-spin mb-[20px]">
          </div>
          <p className="text-white/60 text-sm font-medium tracking-widest uppercase">Memuat ruang...</p>
        </div>
      )}

      {/* Hint overlay */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-[48px] left-1/2 -translate-x-1/2 flex items-center gap-[10px] bg-black/60 backdrop-blur-md text-white px-[24px] py-[12px] rounded-full pointer-events-none"
        >
          <Move className="w-[16px] h-[16px] text-teal-400" />
          <span className="text-sm font-medium">
            Seret untuk melihat ke segala arah
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}