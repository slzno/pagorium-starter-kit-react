'use client';

import { TimerOff } from '@/components/icons';
import { MadeByPagorium, StarterKitLogo } from '@/components/brands';
import { BrandPanel, StatusScreen } from '@/components/kit';

/**
 * Ejemplo de la página 419: la sesión o el formulario expiraron (por ejemplo, un token CSRF vencido).
 */
export default function Ejemplo419() {
  return (
    <StatusScreen
      code="Error 419"
      icon={TimerOff}
      tone="warning"
      title="La página expiró"
      message="La sesión venció o la página estuvo abierta mucho tiempo sin uso."
      steps={['Recargue la página para seguir trabajando.', 'Si estaba llenando un formulario, revise los datos antes de guardarlos otra vez.', 'Si le pide entrar, hágalo con su usuario y contraseña.']}
      aside={<BrandPanel brand={<StarterKitLogo large className="text-white" />} footer={<MadeByPagorium onDark />} />}
      primary={{ label: 'Recargar la página', onClick: () => window.location.reload() }}
      secondary={{ label: 'Volver al inicio', href: '/' }}
    />
  );
}
