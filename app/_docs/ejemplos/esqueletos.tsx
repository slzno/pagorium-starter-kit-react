'use client';

import { PageSkeleton } from '@/components/kit';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

/** Nombre de cada tipo de esqueleto. */
const TIPOS = { list: 'Lista', detail: 'Ficha', form: 'Formulario' } as const;

/**
 * Esqueletos: los tres tipos de pantalla (lista, ficha y formulario) con botones para cambiar entre ellos.
 */
export default function EjemploEsqueletos() {
  const [esqueleto, setEsqueleto] = useState<keyof typeof TIPOS>('list');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {(Object.keys(TIPOS) as (keyof typeof TIPOS)[]).map((tipo) => (
          <Button key={tipo} variant={esqueleto === tipo ? 'default' : 'outline'} onClick={() => setEsqueleto(tipo)}>
            {TIPOS[tipo]}
          </Button>
        ))}
      </div>
      <div className="ring-foreground/10 rounded-4xl ring-1">
        <PageSkeleton kind={esqueleto} />
      </div>
    </div>
  );
}
