import { cn } from '@/lib/utils';
import { PagoriumLogo } from './pagorium-logo';

/**
 * Firma «Hecho por Pagorium» con el logo, que lleva a pagorium.com en otra pestaña.
 *
 * @param className Clases del enlace.
 * @param onDark Sobre un fondo oscuro (por ejemplo, el panel de marca): texto y logo en blanco.
 */
export function MadeByPagorium({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <a
      href="https://pagorium.com"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        onDark ? 'text-white/70 hover:text-white' : 'text-muted-foreground hover:text-foreground',
        'focus-visible:ring-ring/50 inline-flex items-center gap-2 rounded-full text-sm transition-colors outline-none focus-visible:ring-3',
        className,
      )}
    >
      Hecho por
      <PagoriumLogo className={cn('h-7 w-auto', onDark ? 'text-white' : 'text-foreground')} />
      <span className="sr-only">(abre pagorium.com en otra pestaña)</span>
    </a>
  );
}
