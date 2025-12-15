import * as React from 'react';
import { cn } from '@/lib/utils';

/** Tarjeta de contenido en tamaño `default` o `sm`. */
function Card({ className, size = 'default', ...props }: React.ComponentProps<'div'> & { size?: 'default' | 'sm' }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        'group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-4xl bg-frame py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/5 dark:ring-foreground/10 [--card-spacing:--spacing(6)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)] *:[img:first-child]:rounded-t-4xl *:[img:last-child]:rounded-b-4xl',
        className,
      )}
      {...props}
    />
  );
}

/** Cabecera de la tarjeta: título, descripción y acción. */
function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-4xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)',
        className,
      )}
      {...props}
    />
  );
}

/** Título de la tarjeta. */
function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('text-base leading-normal font-medium group-data-[size=sm]/card:text-sm', className)}
      {...props}
    />
  );
}

/** Descripción breve bajo el título de la tarjeta. */
function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-description" className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

/** Acción alineada a la derecha en la cabecera de la tarjeta. */
function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

/** Contenido principal de la tarjeta. */
function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-content" className={cn('flex flex-col gap-3 px-(--card-spacing)', className)} {...props} />
  );
}

/** Pie de la tarjeta. */
function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center rounded-b-4xl px-(--card-spacing) [.border-t]:pt-(--card-spacing)', className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
