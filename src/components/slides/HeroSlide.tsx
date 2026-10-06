'use client';

import { motion } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import AmbientBackground from './AmbientBackground';

const ease = [0.16, 1, 0.3, 1] as const;

const theme = {
  primary: '#e8d5b7',
  secondary: '#d4af7a',
  accent: '#f0abfc',
  bg: '#0a0814',
  text: '#fff8e8',
};

// Destellos pixelados — posiciones relativas
const sparkles = [
  { top: '12%', left: '8%', size: 6, delay: 0, duration: 2.5 },
  { top: '8%', left: '18%', size: 4, delay: 0.8, duration: 3 },
  { top: '15%', left: '5%', size: 3, delay: 1.5, duration: 2 },
  { top: '18%', left: '14%', size: 5, delay: 0.3, duration: 2.8 },
  { top: '10%', left: '22%', size: 3, delay: 1.2, duration: 2.2 },
  // Esquina inferior opuesta (derecha-abajo)
  { bottom: '15%', right: '8%', size: 6, delay: 0.5, duration: 2.6 },
  { bottom: '12%', right: '18%', size: 4, delay: 1.3, duration: 3.1 },
  { bottom: '20%', right: '5%', size: 3, delay: 0.9, duration: 2.3 },
  // Decorativos sueltos
  { top: '40%', left: '85%', size: 3, delay: 0.7, duration: 2.4 },
  { top: '65%', left: '10%', size: 4, delay: 1.8, duration: 2.7 },
  { top: '30%', right: '30%', size: 2, delay: 1.1, duration: 2 },
  { bottom: '35%', left: '45%', size: 3, delay: 0.4, duration: 3.2 },
];

function Sparkle({
  config,
}: {
  config: (typeof sparkles)[number];
}) {
  const style: React.CSSProperties = { position: 'absolute' };
  if ('top' in config) style.top = config.top as string;
  if ('bottom' in config) style.bottom = config.bottom as string;
  if ('left' in config) style.left = config.left as string;
  if ('right' in config) style.right = config.right as string;

  return (
    <motion.div
      style={{
        ...style,
        width: config.size,
        height: config.size,
        background: theme.secondary,
        borderRadius: 0,
        boxShadow: `0 0 ${config.size * 3}px ${theme.secondary}`,
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: config.duration,
        delay: config.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function HeroSlide() {
  const { personal, education } = portfolio;

  return (
    <section
      id="hero"
      className="relative h-screen w-screen overflow-hidden flex items-center justify-center"
      style={{ color: theme.text }}
    >
      <AmbientBackground {...theme} />

      {/* Destellos pixelados */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {sparkles.map((s, i) => (
          <Sparkle key={i} config={s} />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-8 md:px-16">
        {/* Badge superior — solo "Dev freelancer" en Kiwi Soda */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease }}
          className="mb-8"
        >
          <span
            className="font-kiwi inline-block text-xl md:text-2xl"
            style={{
              background: `linear-gradient(135deg, ${theme.secondary}, ${theme.primary})`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Dev freelancer
          </span>
        </motion.div>

        {/* Nombre Miel en Aston Script */}
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease }}
            className="font-aston leading-none"
            style={{
              fontSize: 'clamp(5rem, 15vw, 12rem)',
              background: `linear-gradient(135deg, ${theme.secondary}, ${theme.primary})`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 60px rgba(212, 175, 122, 0.3))',
            }}
          >
            Miel
          </motion.h1>

          {/* Nombre real más pequeño abajo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease }}
            className="mt-2 font-defonte text-2xl font-light tracking-wide text-white/50 md:text-3xl"
          >
            ({personal.name.replace('Miel (', '').replace(')', '')})
          </motion.div>
        </div>

        {/* Tagline + Rol */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease }}
          className="mt-12 grid gap-8 md:grid-cols-2"
        >
          <div>
            <div className="mb-2 font-oceanside text-xs uppercase tracking-[0.3em] text-white/40">
              Rol
            </div>
            <div className="font-kiwi text-2xl md:text-3xl">
              {personal.role}
            </div>
          </div>
          <div>
            <div className="mb-2 font-oceanside text-xs uppercase tracking-[0.3em] text-white/40">
              Tagline
            </div>
            <div className="font-defonte text-2xl font-light italic md:text-3xl">
              &ldquo;{personal.tagline}&rdquo;
            </div>
          </div>
        </motion.div>

        {/* Educación y diseñadora */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
            <div className="font-oceanside text-[10px] uppercase tracking-[0.3em] text-white/40">
              Educación
            </div>
            <div>
              <div className="font-defonte text-sm md:text-base">
                {education.school}
              </div>
              <div className="font-sans text-xs text-white/60">
                {education.degree} · {education.period}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
            <div className="font-oceanside text-[10px] uppercase tracking-[0.3em] text-white/40">
              También
            </div>
            <div className="font-defonte text-sm md:text-base">
              Diseñadora gráfica · Identidades de marca
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
            <div className="font-oceanside text-[10px] uppercase tracking-[0.3em] text-white/40">
              Ubicación
            </div>
            <div className="font-defonte text-sm md:text-base">
              {personal.location}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}