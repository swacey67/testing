// src/components/ui/animated-dropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function useClickOutside(ref, handler) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) handler();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, handler]);
}

export default function AnimatedDropdown({
  options = [],
  value,
  onChange,
  placeholder = 'Select Option',
  className,
  buttonClassName,
  menuClassName,
  itemClassName,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useClickOutside(wrapperRef, () => setIsOpen(false));

  return (
    <div ref={wrapperRef} className={cn('relative inline-block text-left w-full z-50', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between w-full px-[16px] py-[12px] rounded-[12px] text-sm font-medium transition-colors focus:outline-none outline-none',
          buttonClassName || 'bg-white border border-slate-200 text-[#241812] hover:border-teal-500'
        )}
      >
        <span className="truncate">{value || placeholder}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-[16px] w-[16px] opacity-70" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'absolute left-0 mt-[8px] w-full z-[100] overflow-hidden rounded-[12px] shadow-xl',
              menuClassName || 'bg-white border border-slate-200'
            )}
          >
            <div className="max-h-[250px] overflow-y-auto scrollbar-hide py-[8px]">
              {options.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }}
                  onClick={() => { onChange(item); setIsOpen(false); }}
                  className={cn(
                    'w-full text-left px-[16px] py-[10px] text-sm transition-colors',
                    value === item 
                      ? 'bg-teal-50 text-teal-700 font-bold' 
                      : itemClassName || 'text-slate-700 hover:bg-slate-50'
                  )}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}