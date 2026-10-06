'use client';

import { motion } from 'framer-motion';
import { useSlide } from './SlideContext';
import { useState, useEffect } from 'react';

export default function TopMenu() {
  const { goTo, currentSlide } = useSlide();
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 right-0 top-0 z-50 px-6 py-5 md:px-12"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => goTo(1)} className="group flex items-center gap-2">
          <span className="font-aston text-3xl leading-none">m</span>
          <span className="font-oceanside text-[10px] uppercase tracking-[0.3em] opacity-60">
            / portafolio
          </span>
        </button>

        {/* Center menu */}
        <nav className="hidden items-center gap-2 md:flex">
          {[
            { label: 'Contacto', index: 0 },
            { label: 'Inicio', index: 1 },
            { label: 'Proyectos', index: 2 },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => goTo(item.index)}
              className="relative rounded-full px-4 py-1.5 font-oceanside text-[10px] uppercase tracking-[0.2em] transition-all hover:opacity-100"
              style={{
                opacity:
                  currentSlide === item.index ||
                  (item.label === 'Proyectos' && currentSlide >= 2 && currentSlide <= 6)
                    ? 1
                    : 0.6,
              }}
            >
              {(currentSlide === item.index ||
                (item.label === 'Proyectos' && currentSlide >= 2 && currentSlide <= 6)) && (
                <motion.span
                  layoutId="menu-active"
                  className="absolute inset-0 -z-10 rounded-full bg-white/10"
                  transition={{ type: 'spring', damping: 30, stiffness: 350 }}
                />
              )}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right info */}
        <div className="flex items-center gap-4 font-oceanside text-[10px] uppercase tracking-[0.2em] opacity-60">
          <span className="hidden md:inline">Tijuana, B.C.</span>
          <span className="hidden md:inline opacity-40">·</span>
          <span className="font-mono">{time}</span>
        </div>
      </div>
    </motion.header>
  );
}