'use client';

import { useEffect } from 'react';
import { Bug } from '@/components/icons';
import { MadeByPagorium, StarterKitLogo } from '@/components/brands';
import { BrandPanel, StatusScreen } from '@/components/kit';

/**
 * Página 500 de la aplicación: un error inesperado al mostrar la página. Next.js la usa como límite de
 * errores de las rutas; `retry` vuelve a pedir y mostrar la página.
 *
 * @param error Lo que se lanzó; en producción, los errores del servidor solo traen el `digest`.
 * @param retry Vuelve a intentar mostrar la página.
 * @return La pantalla de estado del error 500.
 */
export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    if (error != null) {
      console.error(error);
    }
  }, [error]);

  const digest = error instanceof Error && 'digest' in error ? String(error.digest) : null;

  return (
    <StatusScreen
      code="Error 500"
      icon={Bug}
      tone="error"
      title="Algo salió mal"
      message="Ocurrió un error inesperado al mostrar esta página."
      steps={['Vuelva a intentarlo en unos segundos.', 'Si el error se repite, reporte la dirección y la hora de abajo a soporte.']}
      note={digest ? `Referencia del error: ${digest}` : undefined}
      showDetail
      aside={<BrandPanel brand={<StarterKitLogo large className="text-white" />} footer={<MadeByPagorium onDark />} />}
      primary={{ label: 'Volver a intentar', onClick: retry }}
      secondary={{ label: 'Volver al inicio', href: '/' }}
    />
  );
}
