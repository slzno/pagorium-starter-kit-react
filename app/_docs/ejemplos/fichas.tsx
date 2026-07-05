'use client';

import { FormSection, ReadField, ReadGrid } from '@/components/kit';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * Ficha: pestañas segmentadas y datos de lectura en tarjetas blancas dentro del marco.
 */
export default function EjemploFichas() {
  return (
    <Tabs defaultValue="datos" className="gap-4">
      <TabsList>
        <TabsTrigger value="datos">Datos</TabsTrigger>
        <TabsTrigger value="historial">Historial</TabsTrigger>
      </TabsList>
      <TabsContent value="datos">
        <FormSection title="Datos personales" description="Nombre, documento y contacto.">
          <ReadGrid>
            <ReadField label="Primer nombre" value="Alex" />
            <ReadField label="Apellidos" value="Ejemplo Uno" />
            <ReadField label="Documento" value="DOC-0001" />
            <ReadField label="Teléfono" value="0000-0000" />
            <ReadField label="Correo" value={null} />
          </ReadGrid>
        </FormSection>
      </TabsContent>
      <TabsContent value="historial">
        <FormSection title="Historial" description="Quién creó y modificó el registro.">
          <ReadGrid>
            <ReadField label="Creado por" value="Usuario de prueba" />
            <ReadField label="Modificado por" value="Otro usuario de prueba" />
          </ReadGrid>
        </FormSection>
      </TabsContent>
    </Tabs>
  );
}
