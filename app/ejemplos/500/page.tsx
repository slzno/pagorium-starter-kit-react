'use client';

import ErrorPage from '../../error';

/**
 * Ejemplo de la página 500: muestra la misma pantalla que `app/error.tsx`; «Volver a intentar» recarga.
 */
export default function Ejemplo500() {
  return <ErrorPage error={null} retry={() => window.location.reload()} />;
}
