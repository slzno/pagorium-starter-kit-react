'use client';

import { type IconComponent } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { type ReactNode, useSyncExternalStore } from 'react';
import { useNow } from './use-now';

/** Acción de la pantalla de estado: enlace (`href`) o botón (`onClick`). */
export type StatusAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

/** Tono del aviso: error (rojo), aviso (ámbar) o informativo (verde del sistema). */
export type StatusScreenTone = 'error' | 'warning' | 'info';

/** Clases del código y del ícono según el tono. */
const TONES: Record<StatusScreenTone, string> = {
  error: 'bg-destructive/10 text-destructive dark:bg-destructive/20',
  warning: 'bg-[color-mix(in_oklab,var(--chart-3),transparent_78%)] text-foreground',
  info: 'bg-secondary text-secondary-foreground',
};

/**
 * Dirección actual del navegador (ruta y consulta); vacía en el servidor.
 *
 * @return La dirección.
 */
function useCurrentAddress(): string {
  return useSyncExternalStore(
    () => () => undefined,
    () => window.location.pathname + window.location.search,
    () => '',
  );
}

/**
 * Pantalla de estado a página completa (errores 403, 404, 419 y 500, mantenimiento, accesos
 * suspendidos), con el mismo marco del inicio de sesión: a la izquierda un panel de marca opcional
 * (`aside`, por ejemplo `BrandPanel`) y a la derecha el logo, el código con su ícono y tono, el título, el
 * mensaje, una tarjeta con qué puede hacer la persona, la dirección y la hora para reportarlas a soporte y
 * hasta dos acciones.
 *
 * @param code Código o motivo corto sobre el título, por ejemplo «Error 404».
 * @param title Título.
 * @param message Mensaje.
 * @param icon Ícono del código.
 * @param tone Tono del código y del ícono.
 * @param steps Qué puede hacer la persona, en pasos cortos.
 * @param stepsTitle Título de la tarjeta de pasos.
 * @param showDetail Muestra la dirección y la hora para reportarlas a soporte.
 * @param note Nota opcional bajo el mensaje.
 * @param logo Logo sobre el código.
 * @param aside Panel de la izquierda en pantallas grandes.
 * @param primary Acción principal.
 * @param secondary Acción secundaria.
 * @param locale Configuración regional de la hora.
 */
export function StatusScreen({
  code,
  title,
  message,
  icon: Icon,
  tone = 'error',
  steps,
  stepsTitle = 'Qué puede hacer',
  showDetail = false,
  note,
  logo,
  aside,
  primary,
  secondary,
  locale = 'es',
}: {
  code: string;
  title: string;
  message: string;
  icon: IconComponent;
  tone?: StatusScreenTone;
  steps?: string[];
  stepsTitle?: string;
  showDetail?: boolean;
  note?: ReactNode;
  logo?: ReactNode;
  aside?: ReactNode;
  primary?: StatusAction;
  secondary?: StatusAction;
  locale?: string;
}) {
  const moment = useNow();
  const address = useCurrentAddress();

  return (
    <div className={cn('bg-background text-foreground grid min-h-svh', aside && 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]')}>
      {aside}

      <main className="relative flex items-center justify-center overflow-hidden px-4 py-10 sm:px-8">
        <div className="bg-primary/10 absolute top-1/2 left-1/2 size-[40rem] -translate-1/2 rounded-full blur-3xl" aria-hidden="true" />

        <div className="relative flex w-full max-w-md flex-col gap-8">
          {logo && <div className="flex h-16 items-center self-start [&>img]:h-16 [&>img]:w-auto [&>svg]:h-16 [&>svg]:w-auto">{logo}</div>}

          <div className="flex flex-col gap-3">
            <span className={cn('inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tabular-nums', TONES[tone])}>
              <Icon className="size-4 [--icon:currentColor]" />
              {code}
            </span>
            <h1 className="text-[2.5rem] leading-tight font-extrabold tracking-tight text-balance">{title}</h1>
            <p className="text-muted-foreground text-base text-pretty">{message}</p>
            {note && <p className="text-muted-foreground text-sm">{note}</p>}
          </div>

          {(Boolean(steps?.length) || showDetail) && (
            <div className="bg-frame ring-foreground/5 flex flex-col gap-4 rounded-4xl p-4 ring-1 dark:ring-foreground/10">
              {steps && steps.length > 0 && (
                <div className="bg-card dark:bg-muted rounded-3xl p-5">
                  <h2 className="text-sm font-bold">{stepsTitle}</h2>
                  <ol className="mt-3 flex flex-col gap-2.5">
                    {steps.map((step, index) => (
                      <li key={step} className="flex items-start gap-3 text-sm">
                        <span className="bg-frame flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums">{index + 1}</span>
                        <span className="pt-0.5 text-pretty">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {showDetail && (
                <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1 px-2 pb-1 text-xs">
                  <dt className="text-muted-foreground">Dirección</dt>
                  <dd className="truncate font-medium" title={address}>
                    {address || '/'}
                  </dd>
                  <dt className="text-muted-foreground">Hora</dt>
                  <dd className="font-medium tabular-nums" suppressHydrationWarning>
                    {moment?.toLocaleString(locale, { dateStyle: 'short', timeStyle: 'short' })}
                  </dd>
                </dl>
              )}
            </div>
          )}

          {(primary || secondary) && (
            <div className="flex flex-wrap gap-3">
              {primary && <StatusButton action={primary} />}
              {secondary && <StatusButton action={secondary} variant="outline" />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/**
 * Botón de una acción de la pantalla de estado: enlace si tiene `href`, si no un botón.
 *
 * @param action Acción a mostrar.
 * @param variant Variante del botón.
 * @return El botón.
 */
function StatusButton({ action, variant = 'default' }: { action: StatusAction; variant?: 'default' | 'outline' }) {
  if (action.href) {
    return (
      <Button asChild variant={variant}>
        <Link href={action.href}>{action.label}</Link>
      </Button>
    );
  }

  return (
    <Button type="button" variant={variant} onClick={action.onClick}>
      {action.label}
    </Button>
  );
}
