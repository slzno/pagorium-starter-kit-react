import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

/**
 * Color tonal del avatar según el nombre: siempre el mismo para la misma persona, tomado de la paleta de
 * las gráficas (`--bar-1` a `--bar-20`).
 *
 * @param name Nombre de la persona.
 * @return Variable CSS del color.
 */
export function avatarColor(name: string): string {
  // Hash FNV-1a de 32 bits: reparte los nombres parecidos entre los 20 colores.
  let hash = 2166136261;

  for (const letter of name.trim().toUpperCase()) {
    hash ^= letter.charCodeAt(0);
    hash = Math.imul(hash, 16777619) >>> 0;
  }

  return `var(--bar-${(hash % 20) + 1})`;
}

/**
 * Iniciales de una persona: primera letra del primer nombre y del primer apellido (la tercera palabra si
 * el nombre tiene cuatro).
 *
 * @param name Nombre completo.
 * @return Hasta dos letras en mayúscula.
 */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const second = parts.length >= 4 ? parts[2] : parts[1];

  return `${parts[0]?.[0] ?? ''}${second?.[0] ?? ''}`.toUpperCase();
}

/**
 * Avatar con las iniciales de una persona sobre un tono suave de su color propio (el mismo siempre para el
 * mismo nombre), con las iniciales en ese color oscurecido para que se lean. Las iniciales toman el tamaño
 * de letra que se pase en `className` junto al tamaño del círculo, para que no se salgan. Con `src`
 * muestra la foto y las iniciales quedan de respaldo.
 *
 * @param name Nombre de la persona.
 * @param src Foto opcional.
 * @param className Tamaño del círculo y de la letra, por ejemplo `size-8 text-[0.6875rem]`.
 */
export function InitialsAvatar({ name, src, className }: { name: string; src?: string; className?: string }) {
  const color = avatarColor(name);

  return (
    <Avatar className={cn('size-9 text-xs', className)}>
      {src && <AvatarImage src={src} alt={name} />}
      <AvatarFallback
        className="text-[length:inherit] leading-none font-bold tracking-tight"
        style={{
          backgroundColor: `color-mix(in oklab, ${color} 26%, var(--card))`,
          color: `color-mix(in oklab, ${color} 45%, var(--foreground))`,
        }}
      >
        {initials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
