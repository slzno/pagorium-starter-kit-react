'use client';

import { Clock } from '@/components/icons';
import { BrandPanel, StatusScreen } from '@/components/kit';

/**
 * Ejemplo de pantalla de sistema cerrado fuera del horario de operación.
 */
export default function EjemploCerrado() {
  return (
    <StatusScreen
      code="Fuera del horario operativo"
      icon={Clock}
      tone="warning"
      title="Sistema cerrado"
      message="El sistema no está disponible en este momento."
      steps={['De lunes a viernes el sistema abre de 7:00 a. m. a 5:00 p. m.', 'Los sábados abre de 7:00 a. m. a 12:00 m.; los domingos y feriados está cerrado.']}
      aside={<BrandPanel brand="Pagorium Starter Kit React" />}
      primary={{ label: 'Volver a intentar', onClick: () => window.location.reload() }}
      secondary={{ label: 'Volver a la documentación', href: '/' }}
    />
  );
}
