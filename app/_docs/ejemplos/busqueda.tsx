'use client';

import { FileText } from '@/components/icons';
import { DatePicker, FormField, QuickSearch, type QuickSearchFn, SearchableSelect } from '@/components/kit';
import { useState } from 'react';
import { toast } from 'sonner';

/** Personas de ejemplo (datos ficticios). */
const PERSONAS = ['ALEX EJEMPLO UNO', 'BRUNO EJEMPLO DOS', 'CAMILA EJEMPLO TRES', 'DARÍO EJEMPLO CUATRO'];

/**
 * Búsqueda de ejemplo: personas e informes que coinciden con el texto. En una app real, aquí va el
 * `fetch` a tu API con la `signal` para cancelar.
 *
 * @param q Texto buscado.
 * @return Dos grupos de resultados.
 */
const buscar: QuickSearchFn = async (q) => {
  const texto = q.toUpperCase();
  const personas = PERSONAS.filter((p) => p.includes(texto));

  return [
    {
      heading: 'Personas',
      items: personas.map((p, i) => ({ id: `p${i}`, title: p, description: `N.º ${1042 - i}`, avatarName: p, onSelect: () => toast(`Abriste a ${p}`) })),
    },
    {
      heading: 'Documentos',
      items: personas.map((p, i) => ({
        id: `d${i}`,
        title: `Informe ${2600 + i}`,
        description: p,
        icon: FileText,
        badge: { tone: i % 2 ? 'warning' : 'success', label: i % 2 ? 'Pendiente' : 'Aprobado' },
        onSelect: () => toast(`Abriste el informe ${2600 + i}`),
      })),
    },
  ];
};

/**
 * Búsqueda: la búsqueda rápida (abre también con Ctrl + K o «/»), el selector con búsqueda y la fecha.
 * Las notificaciones (`toast`) necesitan un `<Toaster />` una vez en el layout (ver el ejemplo de Avisos).
 */
export default function EjemploBusqueda() {
  const [estado, setEstado] = useState('');
  const [fecha, setFecha] = useState('');

  return (
    <div className="bg-frame grid gap-4 rounded-4xl p-5 sm:grid-cols-3">
      <FormField label="Búsqueda rápida">
        <QuickSearch search={buscar} placeholder="Buscar persona o documento" inputPlaceholder="Nombre o número" hints={[['Nombre', 'por ejemplo, alex'], ['Número', 'del documento']]} />
      </FormField>
      <FormField label="Selector con búsqueda">
        <SearchableSelect
          options={['Activo', 'Pendiente', 'Vencido', 'Cerrado'].map((e) => ({ value: e, label: e }))}
          value={estado}
          onValueChange={setEstado}
          placeholder="Elija un estado"
        />
      </FormField>
      <FormField label="Fecha">
        <DatePicker value={fecha} onChange={setFecha} />
      </FormField>
    </div>
  );
}
