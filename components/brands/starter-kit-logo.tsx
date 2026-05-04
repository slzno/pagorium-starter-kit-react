import { cn } from '@/lib/utils';

/**
 * Símbolo de Pagorium Starter Kit React: el marco verde con una tarjeta blanca de esquina de hoja, dos
 * renglones y la hoja de la plantilla. Usa colores fijos de la marca para verse igual en todos los temas.
 *
 * @param className Clases del SVG (tamaño).
 */
export function StarterKitMark({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={cn('size-9 shrink-0', className)} role="img" aria-label="Pagorium Starter Kit React">
      <rect width="32" height="32" rx="9" fill="#2E7D3A" />
      <path d="M13 7H24a1.5 1.5 0 0 1 1.5 1.5V19a6 6 0 0 1-6 6H8.5A1.5 1.5 0 0 1 7 23.5V13a6 6 0 0 1 6-6z" fill="#fff" />
      <path d="M11 16.5h4.5M11 20.5h7" stroke="#CFE3D2" strokeWidth={2} strokeLinecap="round" />
      <path d="M0 -4.6C2.9 -2.2 2.9 2.2 0 4.6C-2.9 2.2 -2.9 -2.2 0 -4.6Z" fill="#16A34A" transform="translate(19.8 12.6) rotate(40)" />
    </svg>
  );
}

/**
 * Logo completo: el símbolo y el nombre en dos líneas («Pagorium» pequeño arriba y «Starter Kit React»).
 * El texto toma el color del texto, así sirve sobre fondos claros, oscuros y sobre el verde del panel.
 *
 * @param className Clases del contenedor.
 * @param compact Solo «Starter Kit» en una línea, para barras angostas.
 * @param large Versión grande, para paneles de marca y portadas.
 */
export function StarterKitLogo({ className, compact = false, large = false }: { className?: string; compact?: boolean; large?: boolean }) {
  return (
    <span className={cn('inline-flex items-center', large ? 'gap-3.5' : 'gap-2.5', className)}>
      <StarterKitMark className={large ? 'size-13' : undefined} />
      <span className={cn('flex flex-col leading-none', large && 'gap-0.5')}>
        {!compact && <span className={cn('font-semibold opacity-70', large ? 'text-sm' : 'text-[0.6875rem]')}>Pagorium</span>}
        <span className={cn('font-extrabold tracking-tight whitespace-nowrap', large ? 'text-2xl' : 'text-[1.0625rem]')}>
          Starter Kit <span className="font-bold opacity-60">React</span>
        </span>
      </span>
    </span>
  );
}
