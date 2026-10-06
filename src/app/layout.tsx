import type { Metadata } from 'next';
import './globals.css';
import SlidesSystem from '@/components/slides/SlidesSystem';

export const metadata: Metadata = {
  title: 'Miel — Portafolio',
  description:
    'Desarrolladora de Software Multiplataforma interesada en la tecnología, inspirada por su alrededor para crear soluciones reales a problemas reales.',
  openGraph: {
    title: 'Miel — Portafolio',
    description: 'Tecnología con sentido, inspirada por mi alrededor.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-bg text-white antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}