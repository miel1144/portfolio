'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionValueEvent } from 'framer-motion';

export default function AmbientBackground({
  primary,
  secondary,
  accent,
  bg,
}: {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 30, stiffness: 100 });
  const sy = useSpring(y, { damping: 30, stiffness: 100 });

  const xInv = useMotionValue(0);
  const yInv = useMotionValue(0);
  const sxInv = useSpring(xInv, { damping: 30, stiffness: 100 });
  const syInv = useSpring(yInv, { damping: 30, stiffness: 100 });

  const xHalf = useMotionValue(0);
  const yHalf = useMotionValue(0);
  const sxHalf = useSpring(xHalf, { damping: 30, stiffness: 100 });
  const syHalf = useSpring(yHalf, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = ((e.clientX - cx) / rect.width) * 40;
      const ny = ((e.clientY - cy) / rect.height) * 40;
      x.set(nx);
      y.set(ny);
      xInv.set(-nx);
      yInv.set(-ny);
      xHalf.set(nx * 0.5);
      yHalf.set(ny * 0.5);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y, xInv, yInv, xHalf, yHalf]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ background: bg }}
    >
      <motion.div
        className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full blur-[120px] opacity-50"
        style={{
          x: sx,
          y: sy,
          background: primary,
        }}
      />
      <motion.div
        className="absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full blur-[120px] opacity-40"
        style={{
          x: sxInv,
          y: syInv,
          background: secondary,
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full blur-[120px] opacity-30"
        style={{
          x: sxHalf,
          y: syHalf,
          background: accent,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${primary}40 1px, transparent 1px), linear-gradient(90deg, ${primary}40 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="absolute inset-0 noise" />
    </div>
  );
}