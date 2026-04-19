'use client';

import { ChevronDown, ChevronRight, type IconComponent } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import Link from 'next/link';
import { type ReactNode, useState, useSyncExternalStore } from 'react';

/** Elemento de la lista del aviso: número o código, texto y a dónde lleva. */
export type FloatingNoticeItem = {
  id: string | number;
  label: ReactNode;
  /** Dato corto a la izquierda (por omisión, el `id`). */
  meta?: ReactNode;
  href?: string;
  onSelect?: () => void;
};

const sessionListeners = new Set<() => void>();

/**
 * Suscribe a los cambios del aviso minimizado guardados en esta pestaña.
 *
 * @param listener Función que se avisa en cada cambio.
 * @return Función para cancelar la suscripción.
 */
function subscribeSession(listener: () => void): () => void {
  sessionListeners.add(listener);

  return () => sessionListeners.delete(listener);
}

/**
 * Lee si el aviso quedó minimizado en esta sesión del navegador.
 *
 * @param key Clave de `sessionStorage`.
 * @return Verdadero o falso si se guardó; nulo si no hay dato.
 */
function readCollapsed(key: string): boolean | null {
  try {
    const value = window.sessionStorage.getItem(key);

    return value === null ? null : value === '1';
  } catch {
    return null;
  }
}

/**
 * Aviso flotante en la esquina inferior derecha, para pendientes que la persona debe atender: ícono,
 * título, descripción, los primeros elementos (cada uno abre su registro) en un marco salvia con filas
 * blancas y un botón al listado completo. Se puede minimizar a una pastilla con el contador; los dos
 * estados entran y salen con Motion (sin animación con «reducir movimiento»). Con `storageKey` recuerda en
 * la sesión del navegador si quedó minimizado.
 *
 * @param visible Si se muestra (por ejemplo, solo cuando hay pendientes).
 * @param title Título de la tarjeta.
 * @param description Texto bajo el título.
 * @param icon Ícono de la tarjeta y de la pastilla.
 * @param pillLabel Texto de la pastilla minimizada.
 * @param count Cantidad de pendientes (contador de la pastilla).
 * @param items Primeros pendientes.
 * @param moreText Nota bajo la lista (por ejemplo, «Y 12 más en el listado.»).
 * @param action Botón al pie (enlace o acción).
 * @param collapsed Estado minimizado controlado.
 * @param onCollapsedChange Avisa al minimizar o desplegar.
 * @param storageKey Clave de `sessionStorage` para recordar el estado minimizado.
 * @param collapseLabel Texto accesible del botón de minimizar.
 */
export function FloatingNotice({
  visible = true,
  title,
  description,
  icon: Icon,
  pillLabel,
  count,
  items = [],
  moreText,
  action,
  collapsed: controlled,
  onCollapsedChange,
  storageKey,
  collapseLabel = 'Minimizar aviso',
}: {
  visible?: boolean;
  title: string;
  description?: ReactNode;
  icon: IconComponent;
  pillLabel: string;
  count: number;
  items?: FloatingNoticeItem[];
  moreText?: ReactNode;
  action?: { label: string; href?: string; onClick?: () => void };
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  storageKey?: string;
  collapseLabel?: string;
}) {
  const [local, setLocal] = useState(false);
  const stored = useSyncExternalStore(subscribeSession, () => (storageKey ? readCollapsed(storageKey) : null), () => null);
  const collapsed = controlled ?? stored ?? local;

  /**
   * Minimiza o despliega el aviso y, con `storageKey`, lo recuerda en esta sesión del navegador.
   *
   * @param next Minimizado.
   */
  const toggle = (next: boolean): void => {
    setLocal(next);

    if (storageKey) {
      try {
        window.sessionStorage.setItem(storageKey, next ? '1' : '0');
      } catch {
        // Sin almacenamiento, solo dura hasta recargar.
      }
      sessionListeners.forEach((listener) => listener());
    }

    onCollapsedChange?.(next);
  };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        {visible && collapsed && (
          <motion.button
            key="pill"
            type="button"
            onClick={() => toggle(false)}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-popover text-popover-foreground ring-foreground/10 focus-visible:ring-ring/50 hover:bg-muted fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full py-2 pr-2 pl-3 text-sm font-semibold shadow-xl ring-1 outline-none focus-visible:ring-3"
          >
            <Icon className="size-5" />
            {pillLabel}
            <span className="bg-destructive text-destructive-foreground flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-bold tabular-nums">{count}</span>
          </motion.button>
        )}

        {visible && !collapsed && (
          <motion.aside
            key="card"
            aria-label={title}
            data-surface="popover"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="bg-popover text-popover-foreground ring-foreground/10 fixed right-4 bottom-4 z-40 flex w-[min(24rem,calc(100vw-2rem))] min-w-0 flex-col gap-4 rounded-4xl p-5 text-sm shadow-2xl ring-1"
          >
            <div className="flex min-w-0 items-start gap-3">
              <span className="bg-warning/25 flex size-11 shrink-0 items-center justify-center rounded-2xl">
                <Icon className="size-6" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className="text-base leading-tight font-extrabold tracking-tight">{title}</p>
                {description && <p className="text-muted-foreground leading-snug">{description}</p>}
              </div>
              <Button type="button" variant="ghost" size="icon" className="-mt-1 -mr-1 size-11.5 shrink-0" aria-label={collapseLabel} onClick={() => toggle(true)}>
                <ChevronDown />
              </Button>
            </div>

            {items.length > 0 && (
              <div className="bg-frame flex min-w-0 flex-col gap-1.5 rounded-3xl p-2">
                <ul className="flex min-w-0 flex-col gap-1.5">
                  {items.map((item, index) => {
                    const className =
                      'bg-card hover:text-primary focus-visible:ring-ring/50 flex w-full min-w-0 items-center gap-3 rounded-xl px-3 py-2 text-left outline-none focus-visible:ring-3';
                    const content = (
                      <>
                        <span className="text-muted-foreground shrink-0 text-xs font-semibold tabular-nums">{item.meta ?? item.id}</span>
                        <span className="min-w-0 flex-1 truncate font-medium">{item.label}</span>
                        <ChevronRight className="text-muted-foreground size-4 shrink-0" />
                      </>
                    );

                    return (
                      <motion.li
                        key={item.id}
                        className="min-w-0"
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 + index * 0.04, duration: 0.2 }}
                      >
                        {item.href ? (
                          <Link href={item.href} className={className}>
                            {content}
                          </Link>
                        ) : (
                          <button type="button" onClick={item.onSelect} className={className}>
                            {content}
                          </button>
                        )}
                      </motion.li>
                    );
                  })}
                </ul>
                {moreText && <p className="text-muted-foreground px-2 pt-0.5 pb-1 text-xs">{moreText}</p>}
              </div>
            )}

            {action &&
              (action.href ? (
                <Button asChild className="w-full">
                  <Link href={action.href}>{action.label}</Link>
                </Button>
              ) : (
                <Button type="button" className="w-full" onClick={action.onClick}>
                  {action.label}
                </Button>
              ))}
          </motion.aside>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
