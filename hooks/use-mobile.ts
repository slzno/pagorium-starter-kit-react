import * as React from 'react';

/** Ancho en píxeles a partir del cual deja de considerarse móvil. */
const MOBILE_BREAKPOINT = 768;

/**
 * Se suscribe a los cambios del ancho de la ventana.
 *
 * @param onChange Función que se llama cuando cruza el punto de corte.
 * @return Función que cancela la suscripción.
 */
function subscribe(onChange: () => void): () => void {
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  mql.addEventListener('change', onChange);

  return () => mql.removeEventListener('change', onChange);
}

/**
 * Indica si la ventana mide menos de 768 px de ancho y se actualiza al cambiar el tamaño.
 * En el servidor devuelve `false`.
 *
 * @return `true` en pantallas móviles.
 */
export function useIsMobile(): boolean {
  return React.useSyncExternalStore(
    subscribe,
    () => window.innerWidth < MOBILE_BREAKPOINT,
    () => false,
  );
}
