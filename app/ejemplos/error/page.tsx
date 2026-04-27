'use client';

import { SearchX } from '@/components/icons';
import { BrandPanel, StatusScreen } from '@/components/kit';

/**
 * Ejemplo de pantalla de error 404 con el panel de marca a la izquierda.
 */
export default function EjemploError() {
  return (
    <StatusScreen
      code="Error 404"
      icon={SearchX}
      tone="warning"
      title="Página no encontrada"
      message="La página que busca no existe o cambió de dirección."
      steps={['Revise que la dirección esté bien escrita.', 'Si llegó desde un enlace guardado, búsquelo de nuevo desde el menú.', 'Si el problema sigue, reporte la dirección de abajo a soporte.']}
      showDetail
      aside={<BrandPanel brand="Pagorium Starter Kit React" />}
      primary={{ label: 'Volver a la documentación', href: '/' }}
      secondary={{ label: 'Regresar', onClick: () => window.history.back() }}
    />
  );
}
