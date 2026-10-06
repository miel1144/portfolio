'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface SlideContextValue {
  currentSlide: number;
  totalSlides: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  slideLabels: string[];
}

const SlideContext = createContext<SlideContextValue | null>(null);

export const SLIDE_LABELS = [
  'Contacto',
  'Miel',
  'CosechIA',
  'MONSE',
  'Tonalli',
  'ANGL · GestoLab',
  'Tijuana Accesible',
];

const TOTAL = SLIDE_LABELS.length;

export function SlideProvider({ children }: { children: ReactNode }) {
  const [currentSlide, setCurrentSlide] = useState(1); // empezamos en Hero
  const router = useRouter();
  const pathname = usePathname();

  const goTo = useCallback((index: number) => {
    let target = index;
    if (target < 0) target = TOTAL - 1;
    if (target >= TOTAL) target = 0;
    setCurrentSlide(target);
    const hash = ['contact', 'hero', 'cosechia', 'monse', 'tonalli', 'angl', 'tijuana'][target];
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `${pathname}#${hash}`);
    }
  }, [pathname]);

  const next = useCallback(() => {
    goTo(currentSlide === 1 ? 2 : currentSlide + 1);
  }, [currentSlide, goTo]);

  const prev = useCallback(() => {
    goTo(currentSlide === 2 ? 1 : currentSlide - 1);
  }, [currentSlide, goTo]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        goTo(currentSlide + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goTo(currentSlide - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(0);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentSlide, goTo]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '');
    const map: Record<string, number> = {
      contact: 0, hero: 1, cosechia: 2, monse: 3, tonalli: 4, angl: 5, tijuana: 6,
    };
    if (hash && map[hash] !== undefined) {
      setCurrentSlide(map[hash]);
    }
  }, []);

  return (
    <SlideContext.Provider
      value={{
        currentSlide,
        totalSlides: TOTAL,
        goTo,
        next,
        prev,
        slideLabels: SLIDE_LABELS,
      }}
    >
      {children}
    </SlideContext.Provider>
  );
}

export function useSlide() {
  const ctx = useContext(SlideContext);
  if (!ctx) throw new Error('useSlide must be used within SlideProvider');
  return ctx;
}