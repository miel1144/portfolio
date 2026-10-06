export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display text-8xl font-bold text-gradient-static md:text-9xl">
          404
        </h1>
        <p className="mt-4 text-xl text-text-dim">
          Esta página se escapó al multiverso.
        </p>
        <a
          href="/"
          className="glass glass-hover mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3"
        >
          ← Volver al inicio
        </a>
      </div>
    </div>
  );
}