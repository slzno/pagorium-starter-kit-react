import { DetailRow, DetailSection, MetricSection, StatusBadge } from '@/components/kit';

/**
 * Cifras y detalle: métricas con su etiqueta y una lista de detalle de dos columnas.
 */
export default function EjemploCifras() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <MetricSection
        title="Hoy"
        metrics={[
          { key: 'cerradas', label: 'Tareas cerradas', value: '128' },
          { key: 'meta', label: 'Meta', value: '150' },
          { key: 'vencidas', label: 'Vencidas', value: '7', negative: true },
        ]}
      />
      <DetailSection title="Proyecto">
        <DetailRow label="Responsable">Usuario de prueba</DetailRow>
        <DetailRow label="Avance">72 %</DetailRow>
        <DetailRow label="Estado">
          <StatusBadge tone="success">En curso</StatusBadge>
        </DetailRow>
      </DetailSection>
    </div>
  );
}
