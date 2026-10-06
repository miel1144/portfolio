'use client';

import { useRef, useEffect, useState } from 'react';
import { portfolio } from '@/data/portfolio';
import { SlideProvider, useSlide, SLIDE_LABELS } from './SlideContext';
import HeroSlide from './HeroSlide';
import ProjectSlide from './ProjectSlide';
import ContactSlide from './ContactSlide';
import SlideDots from './SlideDots';
import TopMenu from './TopMenu';
import KeyboardHint from './KeyboardHint';

function SlidesContainer() {
  const { currentSlide, goTo, totalSlides } = useSlide();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Forzar scroll horizontal a 0 al montar
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
    setIsReady(true);
  }, []);

  // Mapeo de slides
  const slides = [
    <ContactSlide key="contact" />,
    <HeroSlide key="hero" />,
    ...portfolio.projects.map((p, i) => (
      <ProjectSlide key={p.id} project={p} index={i + 2} total={totalSlides} />
    )),
  ];

  // Manejar scroll del contenedor
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const slideWidth = container.clientWidth;
        const newIndex = Math.round(container.scrollLeft / slideWidth);
        if (newIndex !== currentSlide && newIndex >= 0 && newIndex < totalSlides) {
          goTo(newIndex);
        }
      }, 80);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentSlide, goTo, totalSlides]);

  // Sincronizar scroll con currentSlide
  useEffect(() => {
    if (!isReady || !containerRef.current) return;
    const container = containerRef.current;
    const targetX = currentSlide * container.clientWidth;
    container.scrollTo({ left: targetX, behavior: 'smooth' });
  }, [currentSlide, isReady]);

  // Loop infinito: al llegar a los extremos, teletransportar
  useEffect(() => {
    if (!isReady || !containerRef.current) return;
    const container = containerRef.current;
    const slideWidth = container.clientWidth;

    if (currentSlide === 0 && Math.abs(container.scrollLeft - 0) < 5) {
      // Estamos en Contact (slide 0). Si scrollea a la derecha, vamos a Hero.
      // Ya controlado por goTo() que se ejecuta desde scroll handler.
    }
  }, [currentSlide, isReady]);

  // Manejar wheel para snap horizontal
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let wheelTimeout: ReturnType<typeof setTimeout>;
    let lastWheelTime = 0;
    const onWheel = (e: WheelEvent) => {
      const now = Date.now();
      const timeSinceLast = now - lastWheelTime;
      lastWheelTime = now;

      // Si el wheel es predominantemente horizontal, dejar pasar
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      e.preventDefault();

      // Determinar dirección
      const delta = e.deltaY > 0 ? 1 : -1;
      const intensity = Math.min(Math.abs(e.deltaY) / 100, 1);

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        goTo(currentSlide + delta);
      }, 50 * intensity);
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', onWheel);
      clearTimeout(wheelTimeout);
    };
  }, [currentSlide, goTo]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative h-screen w-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex h-full" style={{ width: `${totalSlides * 100}vw` }}>
          {slides.map((slide, i) => (
            <div
              key={i}
              className="h-full w-screen shrink-0 snap-start"
              data-slide={i}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function SlidesSystem() {
  return (
    <SlideProvider>
      <TopMenu />
      <SlidesContainer />
      <KeyboardHint />
    </SlideProvider>
  );
}