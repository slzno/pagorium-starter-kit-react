import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Marco UI',
  description: 'Sistema de diseño de código abierto de Pagorium: marco salvia, tarjetas blancas e íconos de línea.',
};

/**
 * Layout raíz: fuente Plus Jakarta Sans y los estilos de Marco UI.
 *
 * @param children Página.
 */
export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
