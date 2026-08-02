'use client';

import { ShieldOff } from '@/components/icons';
import { MadeByPagorium, StarterKitLogo } from '@/components/brands';
import { BrandPanel, StatusScreen } from '@/components/kit';

/**
 * Ejemplo de la página 403: el usuario no tiene el permiso que pide la ruta.
 */
export default function Ejemplo403() {
  return (
    <StatusScreen
      code="Error 403"
      icon={ShieldOff}
      tone="error"
      title="Acceso denegado"
      message="Su usuario no tiene permiso para ver esta página."
      steps={['Si necesita esta opción para su trabajo, pídala al administrador del sistema.', 'Indique la dirección de abajo para que le asignen el permiso correcto.']}
      showDetail
      aside={<BrandPanel brand={<StarterKitLogo large className="text-white" />} footer={<MadeByPagorium onDark />} />}
      primary={{ label: 'Volver al inicio', href: '/' }}
      secondary={{ label: 'Regresar', onClick: () => window.history.back() }}
    />
  );
}
