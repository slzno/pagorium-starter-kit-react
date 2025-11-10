import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Une clases de Tailwind sin duplicados: la última gana cuando dos chocan.
 *
 * @param inputs Clases, condiciones u objetos de clases.
 * @return El `className` final.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
