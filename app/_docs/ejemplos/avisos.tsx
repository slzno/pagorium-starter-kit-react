'use client';

import { FileWarning, Info, TriangleAlert } from '@/components/icons';
import { FlashMessages, FloatingNotice } from '@/components/kit';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { useState } from 'react';
import { toast } from 'sonner';

/** Pendientes de ejemplo para el aviso flotante (datos ficticios). */
const PENDIENTES = ['ALEX EJEMPLO UNO', 'BRUNO EJEMPLO DOS', 'CAMILA EJEMPLO TRES'];

/**
 * Avisos: alertas en línea, mensajes tras guardar, notificaciones emergentes (con su `<Toaster />`) y el
 * aviso flotante minimizable.
 */
export default function EjemploAvisos() {
  const [aviso, setAviso] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-frame grid gap-4 rounded-4xl p-5 md:grid-cols-2">
        <Alert>
          <Info />
          <AlertTitle>Mantenimiento a las 5:00 p. m.</AlertTitle>
          <AlertDescription>Guarde sus cambios antes de esa hora.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertTitle>No se pudo guardar</AlertTitle>
          <AlertDescription>Revise los campos marcados.</AlertDescription>
        </Alert>
        <FlashMessages className="md:col-span-2" messages={{ success: 'Se guardaron los cambios.', warning: 'Hay 3 tareas que vencen esta semana.' }} />
      </div>
      <div className="bg-frame flex flex-col gap-3 rounded-4xl p-5">
        <p className="text-muted-foreground text-xs font-semibold">Emergentes</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={() => toast.success('Se guardaron los cambios')}>
            Éxito
          </Button>
          <Button variant="outline" onClick={() => toast.error('No se pudo conectar')}>
            Error
          </Button>
          <Button variant="outline" onClick={() => toast('Informe enviado', { description: 'Al correo del equipo.' })}>
            Con detalle
          </Button>
          <Button variant="secondary" onClick={() => setAviso((v) => !v)}>
            {aviso ? 'Ocultar' : 'Mostrar'} aviso flotante
          </Button>
        </div>
      </div>
      <FloatingNotice
        visible={aviso}
        title="Pendientes de revisar"
        description="Complételos antes del cierre del día."
        icon={FileWarning}
        pillLabel="Pendientes"
        count={3}
        items={PENDIENTES.map((p, i) => ({ id: 2600 + i, label: p }))}
        action={{ label: 'Ver todos', onClick: () => toast('Ver todos') }}
      />
      <Toaster position="bottom-left" />
    </div>
  );
}
