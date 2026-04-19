import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

/**
 * Tono de cada estado: el color va en el fondo (tokens de la paleta) y el texto queda en `foreground`,
 * porque el ámbar de aviso no tiene contraste suficiente como texto.
 */
const TONES = {
  success: 'border-transparent bg-secondary text-secondary-foreground',
  warning: 'border-transparent bg-warning/25 text-foreground',
  danger: 'border-transparent bg-danger/15 text-foreground',
  neutral: 'border-transparent bg-muted text-muted-foreground',
} as const;

/** Tono de una insignia de estado. */
export type StatusTone = keyof typeof TONES;

/**
 * Insignia de estado (activo, en riesgo, pendiente…): píldora pequeña con el fondo suave del tono, sin
 * borde ni punto decorativo; el estado se lee en el texto.
 *
 * @param tone Tono del estado.
 * @param children Texto del estado.
 * @param className Clases adicionales.
 */
export function StatusBadge({ tone, children, className }: { tone: StatusTone; children: ReactNode; className?: string }) {
  return (
    <Badge variant="outline" className={cn('h-6 rounded-full px-2.5 text-xs font-semibold', TONES[tone], className)}>
      {children}
    </Badge>
  );
}
