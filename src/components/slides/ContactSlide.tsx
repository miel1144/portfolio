'use client';

import { motion } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import AmbientBackground from './AmbientBackground';
import { useState } from 'react';
import { Copy, Check, Send, Globe, Briefcase } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

const theme = {
  primary: '#a78bfa',
  secondary: '#67e8f9',
  accent: '#f0abfc',
  bg: '#08080d',
  text: '#f8f8ff',
};

export default function ContactSlide() {
  const { personal, social } = portfolio;
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailValue =
    social.find((s) => s.icon === 'Mail')?.url?.replace('mailto:', '') || '';

  const copyEmail = () => {
    navigator.clipboard.writeText(emailValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative h-screen w-screen overflow-hidden flex items-center justify-center"
      style={{ color: theme.text }}
    >
      <AmbientBackground {...theme} />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-8 md:grid-cols-2 md:px-16">
        {/* Left: CTA */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="font-oceanside mb-4 text-xs uppercase tracking-[0.3em] opacity-50">
            Hablemos
          </div>
          <h2
            className="font-kiwi leading-[0.95]"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            ¿Listo para
            <br />
            <span
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent}, ${theme.secondary})`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              empezar?
            </span>
          </h2>

          <p className="mt-6 max-w-md font-defonte text-lg font-light opacity-75">
            Cuéntame sobre tu proyecto o tu idea. Respondo en menos de 24 horas.
          </p>

          {/* Email card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease }}
            className="mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
          >
            <div>
              <div className="font-oceanside text-[10px] uppercase tracking-[0.3em] opacity-50">
                Email directo
              </div>
              <div className="font-defonte mt-1 text-base">{emailValue}</div>
            </div>
            <button
              onClick={copyEmail}
              className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 font-oceanside text-xs transition-colors hover:bg-white/20"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease }}
            className="mt-6 flex flex-wrap gap-3"
          >
            {social.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-defonte text-sm transition-all hover:scale-105 hover:bg-white/10"
              >
                {item.icon === 'Github' && <Globe size={14} />}
                {item.icon === 'Linkedin' && <Briefcase size={14} />}
                {item.name}
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-10 flex items-center gap-3 font-oceanside text-xs opacity-40"
          >
            <span>vuelve al inicio con</span>
            <span className="flex h-7 w-7 items-center justify-center rounded border border-white/20 font-mono">
              →
            </span>
          </motion.div>
        </motion.div>

        {/* Right: Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8"
        >
          <div className="space-y-4">
            <div>
              <label className="font-oceanside mb-1.5 block text-[10px] uppercase tracking-[0.3em] opacity-50">
                Nombre
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-defonte text-sm transition-all placeholder:opacity-30 focus:border-white/30 focus:bg-white/10 focus:outline-none"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="font-oceanside mb-1.5 block text-[10px] uppercase tracking-[0.3em] opacity-50">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-defonte text-sm transition-all placeholder:opacity-30 focus:border-white/30 focus:bg-white/10 focus:outline-none"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="font-oceanside mb-1.5 block text-[10px] uppercase tracking-[0.3em] opacity-50">
                Mensaje
              </label>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-defonte text-sm transition-all placeholder:opacity-30 focus:border-white/30 focus:bg-white/10 focus:outline-none"
                placeholder="Cuéntame sobre tu proyecto..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={submitting || submitted}
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full overflow-hidden rounded-xl p-[1px] disabled:opacity-70"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent}, ${theme.secondary})`,
              }}
            >
              <span className="relative flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-defonte text-sm font-medium transition-all group-hover:bg-transparent group-hover:text-bg" style={{ background: theme.bg }}>
                {submitted ? (
                  <>
                    <Check size={14} /> ¡Mensaje enviado!
                  </>
                ) : submitting ? (
                  <>Enviando...</>
                ) : (
                  <>
                    Enviar mensaje
                    <Send size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </span>
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}