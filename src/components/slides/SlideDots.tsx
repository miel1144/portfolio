'use client';

import { motion } from 'framer-motion';
import { useSlide } from './SlideContext';

export default function SlideDots() {
  const { currentSlide, totalSlides, goTo, slideLabels } = useSlide();

  return (
    <div className="fixed left-4 top-1/2 z-50 -translate-y-1/2 md:left-8">
      <ul className="flex flex-col gap-3">
        {slideLabels.map((label, i) => (
          <li key={label}>
            <button
              onClick={() => goTo(i)}
              className="group flex items-center gap-3"
              aria-label={`Ir a ${label}`}
            >
              <motion.span
                className="block rounded-full border"
                animate={{
                  width: currentSlide === i ? 32 : 8,
                  height: 8,
                  backgroundColor:
                    currentSlide === i
                      ? 'rgba(255,255,255,0.95)'
                      : 'rgba(255,255,255,0.2)',
                  borderColor:
                    currentSlide === i
                      ? 'rgba(255,255,255,0.95)'
                      : 'rgba(255,255,255,0.2)',
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              />
              <span
                className="font-oceanside whitespace-nowrap text-[10px] uppercase tracking-[0.2em] opacity-0 transition-opacity group-hover:opacity-60"
                style={{ color: 'currentColor' }}
              >
                {label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}