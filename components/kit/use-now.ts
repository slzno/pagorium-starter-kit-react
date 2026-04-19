'use client';

import { useSyncExternalStore } from 'react';

/** Momento actual compartido por todos los relojes (0 = aún no se leyó, como en el servidor). */
let actual = 0;
let temporizador: ReturnType<typeof setInterval> | undefined;
const oyentes = new Set<() => void>();

/**
 * Se suscribe al reloj: la primera suscripción lee la hora y arranca un temporizador de 20 segundos; la
 * última en salir lo detiene.
 *
 * @param oyente Función que avisa a React de un cambio.
 * @return Función para cancelar la suscripción.
 */
function suscribir(oyente: () => void): () => void {
  oyentes.add(oyente);

  if (!temporizador) {
    actual = Date.now();
    temporizador = setInterval(() => {
      actual = Date.now();
      oyentes.forEach((avisar) => avisar());
    }, 20000);
    queueMicrotask(oyente);
  }

  return () => {
    oyentes.delete(oyente);

    if (oyentes.size === 0 && temporizador) {
      clearInterval(temporizador);
      temporizador = undefined;
    }
  };
}

/**
 * Fecha y hora actuales que se actualizan cada 20 segundos. En el servidor y antes de montar devuelve
 * `null`, así la página se puede generar estática sin desajustes de hidratación.
 *
 * @return Momento actual o `null`.
 */
export function useNow(): Date | null {
  const momento = useSyncExternalStore(
    suscribir,
    () => actual,
    () => 0,
  );

  return momento ? new Date(momento) : null;
}
