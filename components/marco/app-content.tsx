'use client';

import { SidebarInset } from '@/components/ui/sidebar';
import { MotionConfig, motion } from 'motion/react';
import { type ComponentProps } from 'react';
import { PageSkeleton, type SkeletonKind } from './page-skeleton';

/** Carga en curso: a otra pantalla (`navigation`), en la misma (`same-page`: filtros, paginación) o ninguna. */
export type PendingState = 'navigation' | 'same-page' | null;

interface AppContentProps extends ComponentProps<'main'> {
  /** Marco con barra superior o con barra lateral. */
  variant?: 'header' | 'sidebar';
  /** Carga en curso, si la aplicación la sigue (por ejemplo, con `useTransition`). */
  pending?: PendingState;
  /** Forma del esqueleto que se muestra al ir a otra pantalla. */
  skeleton?: SkeletonKind;
}

/**
 * Contenido de la pantalla. Con la barra superior, cada página entra con un desvanecido y un leve
 * desplazamiento hacia arriba (Motion); con «reducir movimiento» no se anima.
 *
 * Mientras carga: con `pending="navigation"` muestra el esqueleto de página (`PageSkeleton`) con la forma
 * indicada en `skeleton`; con `pending="same-page"` marca `data-loading` y las filas de las tablas
 * muestran su esqueleto (ver `marco.css`).
 *
 * @param props Variante, carga en curso, forma del esqueleto, contenido y props del `<main>`.
 */
export function AppContent({ variant = 'header', pending = null, skeleton = 'list', children, ...props }: AppContentProps) {
  if (variant === 'sidebar') {
    return <SidebarInset {...props}>{children}</SidebarInset>;
  }

  return (
    <MotionConfig reducedMotion="user">
      <main
        className="mx-auto flex h-full w-full max-w-app flex-1 flex-col gap-4 rounded-xl"
        data-loading={pending === 'same-page' || undefined}
        aria-busy={pending !== null || undefined}
        {...props}
      >
        {pending === 'navigation' ? (
          <PageSkeleton kind={skeleton} />
        ) : (
          <motion.div
            className="flex flex-1 flex-col gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        )}
      </main>
    </MotionConfig>
  );
}
