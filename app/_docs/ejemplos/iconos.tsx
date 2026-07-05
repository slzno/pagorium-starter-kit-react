import * as Icons from '@/components/icons';
import { illustrations } from '@/components/icons';
import { type ComponentType } from 'react';

/** Íconos de línea: las funciones exportadas, sin los alias `…Icon` de shadcn ni las ilustraciones. */
const ICONOS = Object.entries(Icons).filter(
  ([nombre, valor]) => typeof valor === 'function' && /^[A-Z]/.test(nombre) && !/Icon$/.test(nombre) && !(nombre in illustrations) && nombre !== 'CheckCircle2',
) as [string, ComponentType<{ className?: string }>][];

/**
 * Galería de íconos de línea: cada uno en su tarjeta con su nombre (el mismo que en Lucide).
 */
export default function EjemploIconos() {
  return (
    <div className="bg-frame grid grid-cols-3 gap-2 rounded-4xl p-4 sm:grid-cols-6 lg:grid-cols-10">
      {ICONOS.map(([nombre, Icono]) => (
        <div key={nombre} className="bg-card flex flex-col items-center gap-2 rounded-2xl px-2 py-4">
          <Icono className="size-7" />
          <span className="text-muted-foreground w-full truncate text-center text-[0.6875rem]">{nombre}</span>
        </div>
      ))}
    </div>
  );
}
