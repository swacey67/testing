import React, { useState, useEffect, useRef } from 'react';

export default function RevealOnScroll({ children, className = "", direction = "up", delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  let baseTransform = "translate-y-[40px]";
  if (direction === "left") baseTransform = "-translate-x-[40px]";
  if (direction === "right") baseTransform = "translate-x-[40px]";
  if (direction === "none") baseTransform = "scale-95";

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0 translate-y-0 scale-100" : `opacity-0 ${baseTransform}`} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}