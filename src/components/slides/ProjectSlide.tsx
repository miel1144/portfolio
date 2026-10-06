'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSlide } from './SlideContext';
import type { Project } from '@/data/portfolio';
import AmbientBackground from './AmbientBackground';
import { ArrowUpRight, Code2, Smartphone, Monitor, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

type Media = {
  logo?: string;
  logoAlt?: string;
  phoneMockup?: string;
  gif?: string;
  screens?: string[];
};

export default function ProjectSlide({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const { currentSlide } = useSlide();
  const isActive = currentSlide === index;
  const media = (project.media ?? {}) as Media;

  return (
    <section
      id={project.id}
      className="relative h-screen w-screen overflow-hidden"
      style={{ color: project.theme.text }}
    >
      <AmbientBackground {...project.theme} />

      {/* Isotipo de fondo con opacidad baja (solo si existe logoAlt) */}
      {media.logoAlt && (
        <div
          className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center"
          style={{ opacity: 0.06 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={media.logoAlt}
            alt=""
            className="max-h-[80vh] max-w-[80vw] object-contain"
          />
        </div>
      )}

      <div className="relative z-10 flex h-full w-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 md:px-16 md:pt-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease }}
            className="flex items-center gap-3 font-oceanside text-xs"
          >
            <span
              className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              Branding by Miel
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease }}
            className="flex items-center gap-3 font-oceanside text-xs"
          >
            <span style={{ opacity: 0.5 }}>{project.type}</span>
            {project.device === 'mobile' ? (
              <Smartphone size={14} style={{ opacity: 0.7 }} />
            ) : (
              <Monitor size={14} style={{ opacity: 0.7 }} />
            )}
          </motion.div>
        </div>

        {/* Main content */}
        <div className="grid flex-1 grid-cols-1 items-center gap-8 px-8 pb-20 pt-8 md:grid-cols-2 md:px-16">
          {/* Left: Logo + descripción */}
          <div className="flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8, ease }}
            >
              <div
                className="mb-4 inline-block rounded-2xl border px-3 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur"
                style={{
                  borderColor: 'rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                  opacity: 0.8,
                }}
              >
                {project.year}
              </div>

              {/* Logo del proyecto + nombre en Aston Script */}
              <div className="flex items-center gap-4">
                {media.logo && (
                  <div className="flex h-[100px] w-[100px] items-center justify-center shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={media.logo}
                      alt={`${project.title} logo`}
                      className="max-h-full max-w-full object-contain"
                      style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))' }}
                    />
                  </div>
                )}
                <h2
                  className="font-aston leading-none"
                  style={{
                    fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                    color: project.theme.text,
                    filter: `drop-shadow(0 0 30px ${project.theme.primary}60)`,
                  }}
                >
                  {project.title}
                </h2>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8, ease }}
              className="font-defonte max-w-lg text-base font-light leading-relaxed md:text-lg"
              style={{ opacity: 0.85 }}
            >
              {project.description}
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8, ease }}
              className="flex flex-wrap gap-2"
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1 font-mono text-xs"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    borderColor: 'rgba(255,255,255,0.15)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.8, ease }}
            >
              <div
                className="font-oceanside mb-1 text-[10px] uppercase tracking-[0.3em]"
                style={{ opacity: 0.4 }}
              >
                Skills desarrolladas
              </div>
              <div className="font-kiwi text-sm" style={{ opacity: 0.8 }}>
                {project.skills?.join(' · ')}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.8, ease }}
              className="mt-2 flex flex-wrap gap-3"
            >
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full px-5 py-2.5 font-defonte text-sm transition-all hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Code2 size={14} />
                Ver código
              </a>
              {project.repoSecondary && (
                <a
                  href={project.repoSecondary}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full px-5 py-2.5 font-defonte text-sm transition-all hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Code2 size={14} />
                  Landing
                </a>
              )}
              {project.repoMobile && (
                <a
                  href={project.repoMobile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full px-5 py-2.5 font-defonte text-sm transition-all hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Smartphone size={14} />
                  App móvil
                </a>
              )}
              {project.url && project.url !== '#' && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full px-5 py-2.5 font-defonte text-sm transition-all hover:scale-105"
                  style={{
                    background: project.theme.primary,
                    color: project.theme.bg,
                  }}
                >
                  {project.urlLabel || 'Ver demo'}
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              {project.video && (
                <a
                  href={project.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full px-5 py-2.5 font-defonte text-sm transition-all hover:scale-105"
                  style={{
                    background: project.theme.secondary,
                    color: project.theme.bg,
                  }}
                >
                  <Play size={14} />
                  Ver video
                </a>
              )}
            </motion.div>
          </div>

          {/* Right: Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={isActive ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 1.2, ease }}
            className="relative flex h-full items-center justify-center"
          >
            <DeviceMockup
              projectId={project.id}
              device={project.device}
              theme={project.theme}
              media={media}
              video={project.video}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DeviceMockup({
  projectId,
  device,
  theme,
  media,
  video,
}: {
  projectId: string;
  device: string;
  theme: Project['theme'];
  media: Media;
  video?: string;
}) {
  // Si hay un gif del teléfono (gestolab), mostrarlo con contorno de celular
  if (media.gif) {
    return (
      <div className="relative">
        <PhoneFrame theme={theme}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={media.gif}
            alt={`${projectId} gif`}
            className="h-full w-full object-cover"
          />
        </PhoneFrame>
        <Glow theme={theme} />
      </div>
    );
  }

  // Si hay video de YouTube, embeberlo en un marco de celular
  if (video) {
    const ytId = extractYouTubeId(video);
    if (ytId) {
      return (
        <div className="relative">
          <PhoneFrame theme={theme}>
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?rel=0`}
              title={`${projectId} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </PhoneFrame>
          <Glow theme={theme} />
        </div>
      );
    }
  }

  // Si hay capturas para mostrar en carrusel
  if (media.screens && media.screens.length > 0) {
    if (device === 'mobile') {
      return (
        <div className="relative">
          <PhoneFrame theme={theme}>
            <ImageCarousel
              screens={media.screens}
              theme={theme}
              projectId={projectId}
            />
          </PhoneFrame>
          <Glow theme={theme} />
        </div>
      );
    }
    // Desktop con pestañas
    return (
      <div className="relative">
        <DesktopFrame theme={theme} projectId={projectId} screens={media.screens} />
        {/* Glow debajo del mockup */}
        <div
          className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 h-40 w-3/4 blur-3xl"
          style={{ background: `radial-gradient(circle, ${theme.accent}50, transparent 70%)` }}
        />
      </div>
    );
  }

  // Si hay logo, mostrarlo en marco
  if (media.logo) {
    if (device === 'mobile') {
      return (
        <div className="relative">
          <PhoneFrame theme={theme}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media.logo}
              alt={`${projectId} logo`}
              className="h-full w-full object-contain p-8"
            />
          </PhoneFrame>
          <Glow theme={theme} />
        </div>
      );
    }
    return (
      <div className="relative">
        <DesktopFrame theme={theme} projectId={projectId}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={media.logo}
            alt={`${projectId} logo`}
            className="h-full w-full object-contain p-12"
          />
        </DesktopFrame>
        <Glow theme={theme} />
      </div>
    );
  }

  // Placeholder
  return (
    <div
      className="flex h-full w-full items-center justify-center rounded-2xl"
      style={{ background: `linear-gradient(135deg, ${theme.primary}30, ${theme.secondary}30)` }}
    >
      <div className="text-center">
        <div className="font-kiwi text-4xl" style={{ color: theme.text, opacity: 0.4 }}>
          {projectId}
        </div>
      </div>
    </div>
  );
}

// Marco de celular reutilizable
function PhoneFrame({ theme, children }: { theme: Project['theme']; children: React.ReactNode }) {
  return (
    <div
      className="relative h-[580px] w-[290px] overflow-hidden rounded-[2.5rem] border-[8px] shadow-2xl"
      style={{
        borderColor: theme.primary,
        background: theme.bg,
        boxShadow: `0 40px 80px -20px ${theme.primary}80`,
      }}
    >
      <div
        className="absolute left-1/2 top-0 z-20 h-5 w-16 -translate-x-1/2 rounded-b-xl"
        style={{ background: theme.primary }}
      />
      <div className="relative h-full w-full overflow-hidden">{children}</div>
    </div>
  );
}

// Marco de desktop con pestañas
function DesktopFrame({
  theme,
  projectId,
  screens,
  children,
}: {
  theme: Project['theme'];
  projectId: string;
  screens?: string[];
  children?: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const hasScreens = screens && screens.length > 0;

  return (
    <div
      className="relative w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl"
      style={{
        borderColor: theme.primary + '60',
        background: theme.bg,
        boxShadow: `0 50px 100px -20px ${theme.primary}80`,
      }}
    >
      {/* Barra superior con pestañas */}
      <div
        className="flex items-center gap-2 border-b px-3 py-2"
        style={{
          borderColor: theme.primary + '40',
          background: theme.primary + '15',
        }}
      >
        <div className="flex gap-1.5 mr-2">
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: theme.accent + '80' }} />
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: theme.secondary + '80' }} />
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: theme.primary }} />
        </div>
        {/* Pestañas si hay múltiples capturas */}
        {hasScreens && screens!.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className="rounded-t-md px-3 py-1 font-mono text-[10px] transition-all"
            style={{
              background: activeTab === i ? theme.bg : 'transparent',
              color: activeTab === i ? theme.text : theme.text + '50',
              borderBottom: activeTab === i ? `2px solid ${theme.accent}` : '2px solid transparent',
            }}
          >
            tab {i + 1}
          </button>
        ))}
        {!hasScreens && (
          <div
            className="flex-1 rounded px-3 py-0.5 font-mono text-[10px]"
            style={{ background: theme.bg, color: theme.text + '60' }}
          >
            localhost:8000/{projectId}
          </div>
        )}
      </div>
      {/* Contenido */}
      <div className="aspect-[16/10] w-full overflow-hidden">
        {hasScreens ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease }}
              className="h-full w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={screens![activeTab]}
                alt={`${projectId} captura ${activeTab + 1}`}
                className="h-full w-full object-cover object-top"
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

// Carrusel de imágenes con deslizamiento (mouse drag + botones)
function ImageCarousel({
  screens,
  theme,
  projectId,
}: {
  screens: string[];
  theme: Project['theme'];
  projectId: string;
}) {
  const [current, setCurrent] = useState(0);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  const next = () => setCurrent((c) => (c + 1) % screens.length);
  const prev = () => setCurrent((c) => (c - 1 + screens.length) % screens.length);

  const onMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = true;
  };
  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - dragStartX.current;
    if (delta > 50) prev();
    else if (delta < -50) next();
    isDragging.current = false;
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.4, ease }}
          className="h-full w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={screens[current]}
            alt={`${projectId} captura ${current + 1}`}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Indicadores */}
      {screens.length > 1 && (
        <>
          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {screens.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === current ? 20 : 6,
                  background: i === current ? theme.accent : 'rgba(255,255,255,0.3)',
                }}
              />
            ))}
          </div>
          {/* Botones laterales */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-1 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur transition-all hover:bg-black/60"
          >
            <ChevronLeft size={14} style={{ color: theme.text }} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-1 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur transition-all hover:bg-black/60"
          >
            <ChevronRight size={14} style={{ color: theme.text }} />
          </button>
        </>
      )}
    </div>
  );
}

function Glow({ theme }: { theme: Project['theme'] }) {
  return (
    <div
      className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 h-40 w-3/4 blur-3xl"
      style={{ background: `radial-gradient(circle, ${theme.accent}50, transparent 70%)` }}
    />
  );
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/shorts\/)([\w-]+)/,
    /(?:youtube\.com\/watch\?v=)([\w-]+)/,
    /(?:youtu\.be\/)([\w-]+)/,
    /(?:youtube\.com\/embed\/)([\w-]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}