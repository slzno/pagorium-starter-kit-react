'use client';

import { ShieldCheck } from '@/components/icons';
import { Leaf } from '@/components/icons/base';
import { cn } from '@/lib/utils';
import { type ReactNode, useEffect, useState } from 'react';

/** Recordatorios de seguridad por omisión para el personal (sistema interno). */
export const DEFAULT_REMINDERS = [
  'No comparta su usuario ni su contraseña con nadie.',
  'Cierre sesión al terminar, sobre todo en equipos compartidos.',
  'Si la sesión se cierra por inactividad, vuelva a entrar con sus datos.',
];

/**
 * Saludo según la hora del día.
 *
 * @param hour Hora de 0 a 23.
 * @return «Buenos días», «Buenas tardes» o «Buenas noches».
 */
export function greeting(hour: number): string {
  return hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';
}

/**
 * Hora en el formato de la RAE («9:05 a. m.», «12:00 m.», «3:15 p. m.»).
 *
 * @param date Momento a mostrar.
 * @return La hora con su abreviatura.
 */
export function formatTimeRae(date: Date): string {
  const hour = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (hour === 12 && date.getMinutes() === 0) {
    return '12:00 m.';
  }

  return `${hour % 12 === 0 ? 12 : hour % 12}:${minutes} ${hour < 12 ? 'a. m.' : 'p. m.'}`;
}

/**
 * Fecha y hora actuales que se actualizan cada 20 segundos, para el reloj del panel.
 *
 * @return Momento actual.
 */
function useNow(): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 20000);

    return () => clearInterval(timer);
  }, []);

  return now;
}

/**
 * Panel de marca del inicio de sesión y de las pantallas de estado (solo en pantallas grandes), sin
 * imágenes: sobre el verde oscuro de la marca (`--brand-ink`) con hojas tenues de fondo, el nombre del
 * sistema, un saludo según la hora (con el nombre de la persona si se pasa), la fecha y la hora, una cifra
 * destacada opcional (por ejemplo, el tipo de cambio del día) y recordatorios de seguridad.
 *
 * @param brand Nombre del sistema (texto o logo).
 * @param name Nombre con el que se saluda.
 * @param highlight Cifra destacada con su etiqueta.
 * @param reminders Recordatorios (por omisión, los de seguridad; lista vacía para ocultarlos).
 * @param footer Pie del panel (por omisión, «© año marca»).
 * @param locale Configuración regional de la fecha.
 */
export function BrandPanel({
  brand,
  name,
  highlight,
  reminders = DEFAULT_REMINDERS,
  footer,
  locale = 'es-NI',
}: {
  brand: ReactNode;
  name?: string;
  highlight?: { label: string; value: ReactNode };
  reminders?: string[];
  footer?: ReactNode;
  locale?: string;
}) {
  const now = useNow();
  const date = now.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <aside className="relative hidden overflow-hidden bg-[var(--brand-ink)] text-white lg:flex">
      {/* Hojas grandes y tenues, con un brillo suave detrás. */}
      <div className="absolute -top-40 -right-40 size-[36rem] rounded-full bg-[var(--brand-ink-glow)] opacity-60 blur-3xl" aria-hidden="true" />
      <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute -right-24 -bottom-24 size-[34rem] text-white">
        <Leaf cx={38} cy={58} r={34} rotate={-35} fill="currentColor" fillOpacity={0.06} />
        <Leaf cx={70} cy={36} r={28} rotate={30} fill="currentColor" fillOpacity={0.05} />
        <Leaf cx={76} cy={80} r={18} rotate={80} fill="currentColor" fillOpacity={0.04} />
      </svg>

      <div className="relative flex w-full flex-col justify-between gap-10 p-12 xl:p-16">
        <span className={cn('text-3xl font-extrabold tracking-tight text-white')}>{brand}</span>

        <div className="flex max-w-lg flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-5xl leading-tight font-extrabold tracking-tight xl:text-6xl" suppressHydrationWarning>
              {greeting(now.getHours())}
              {name ? `, ${name}` : ''}
            </p>
            <p className="text-lg text-white/80" suppressHydrationWarning>
              <span className="inline-block first-letter:uppercase">{date}</span>, <span className="tabular-nums">{formatTimeRae(now)}</span>
            </p>
          </div>

          {highlight && (
            <div className="flex w-fit flex-col gap-1 rounded-3xl bg-white/10 px-6 py-4 ring-1 ring-white/15">
              <span className="text-sm text-white/75">{highlight.label}</span>
              <span className="text-3xl font-extrabold tabular-nums">{highlight.value}</span>
            </div>
          )}

          {reminders.length > 0 && (
            <ul className="flex flex-col gap-3">
              {reminders.map((text) => (
                <li key={text} className="flex items-start gap-3 text-sm text-white/80">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-white [--icon:white]" />
                  {text}
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-sm text-white/60" suppressHydrationWarning>
          {footer ?? (
            <>
              © {now.getFullYear()} {brand}
            </>
          )}
        </p>
      </div>
    </aside>
  );
}
