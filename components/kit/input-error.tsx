import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

/**
 * Mensaje de error de un campo, en rojo; sin mensaje no dibuja nada.
 *
 * @param message Mensaje de error.
 * @param className Clases adicionales.
 */
export function InputError({ message, className = '', ...props }: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
  return message ? (
    <p {...props} className={cn('text-sm text-red-600 dark:text-red-400', className)}>
      {message}
    </p>
  ) : null;
}
