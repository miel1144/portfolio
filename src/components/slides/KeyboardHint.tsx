'use client';

export default function KeyboardHint() {
  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 md:bottom-10">
      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 backdrop-blur-md">
        <kbd className="flex h-6 items-center rounded border border-white/20 px-2 font-mono text-xs text-white/60">
          ←
        </kbd>
        <kbd className="flex h-6 items-center rounded border border-white/20 px-2 font-mono text-xs text-white/60">
          →
        </kbd>
      </div>
    </div>
  );
}