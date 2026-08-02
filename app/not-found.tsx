'use client';

import { SearchX } from '@/components/icons';
import { MadeByPagorium, StarterKitLogo } from '@/components/brands';
import { BrandPanel, StatusScreen } from '@/components/kit';

/**
 * Página 404 de la aplicación: la dirección no existe o se llamó a `notFound()`.
 *
 * @return La pantalla de estado del error 404.
 */
export default function NotFound() {
  return (
    <StatusScreen
      code="Error 404"
      icon={SearchX}
      tone="warning"
      title="Página no encontrada"
      message="La página que busca no existe o cambió de dirección."
      steps={['Revise que la dirección esté bien escrita.', 'Si llegó desde un enlace guardado, búsquelo de nuevo desde el menú.', 'Si el problema sigue, reporte la dirección de abajo a soporte.']}
      showDetail
      aside={<BrandPanel brand={<StarterKitLogo large className="text-white" />} footer={<MadeByPagorium onDark />} />}
      primary={{ label: 'Volver al inicio', href: '/' }}
      secondary={{ label: 'Regresar', onClick: () => window.history.back() }}
    />
  );
}
