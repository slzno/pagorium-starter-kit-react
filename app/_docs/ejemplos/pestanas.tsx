'use client';

import { ReadField, ReadGrid } from '@/components/kit';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * Pestañas: la segmentada del sistema y la variante de línea, cada una con su contenido.
 */
export default function EjemploPestanas() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="bg-frame rounded-4xl p-5">
        <Tabs defaultValue="datos" className="gap-4">
          <TabsList>
            <TabsTrigger value="datos">Datos</TabsTrigger>
            <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
            <TabsTrigger value="referencias">Referencias</TabsTrigger>
          </TabsList>
          <TabsContent value="datos">
            <ReadGrid>
              <ReadField label="Nombre" value="Alex" />
              <ReadField label="Documento" value="DOC-0001" />
              <ReadField label="Ciudad" value="Ciudad Ejemplo" />
            </ReadGrid>
          </TabsContent>
          <TabsContent value="proyectos">
            <p className="bg-card rounded-3xl p-5 text-sm">Participa en 2 proyectos activos.</p>
          </TabsContent>
          <TabsContent value="referencias">
            <p className="bg-card rounded-3xl p-5 text-sm">Sin referencias registradas.</p>
          </TabsContent>
        </Tabs>
      </div>
      <div className="bg-frame rounded-4xl p-5">
        <Tabs defaultValue="resumen" className="gap-4">
          <TabsList variant="line">
            <TabsTrigger value="resumen">Resumen</TabsTrigger>
            <TabsTrigger value="movimientos">Movimientos</TabsTrigger>
            <TabsTrigger value="notas">Notas</TabsTrigger>
          </TabsList>
          <TabsContent value="resumen">
            <p className="bg-card rounded-3xl p-5 text-sm">Variante de línea, para pestañas dentro de una tarjeta.</p>
          </TabsContent>
          <TabsContent value="movimientos">
            <p className="bg-card rounded-3xl p-5 text-sm">Sin movimientos este mes.</p>
          </TabsContent>
          <TabsContent value="notas">
            <p className="bg-card rounded-3xl p-5 text-sm">Sin notas.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
