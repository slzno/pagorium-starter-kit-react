'use client';

import { Eye, FileText } from '@/components/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type ReactNode, useState } from 'react';
import { PanelCodigo } from './codigo';
import { CODIGO } from './ejemplos-codigo';

/**
 * Sección de la documentación: título, ayuda y, si la sección tiene ejemplo en `CODIGO`, las pestañas «Vista
 * previa» (el ejemplo) y «Código» (el mismo ejemplo y los archivos que usa), como en la documentación de shadcn.
 *
 * @param id Ancla de la sección.
 * @param title Título.
 * @param description Ayuda bajo el título.
 * @param children Ejemplos.
 */
export function Seccion({ id, title, description, children }: { id: string; title: string; description: string; children: ReactNode }) {
  const codigo = CODIGO[id];
  const [vista, setVista] = useState('preview');

  const cabecera = (
    <div>
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );

  if (!codigo) {
    return (
      <section id={id} className="flex flex-col gap-4">
        {cabecera}
        {children}
      </section>
    );
  }

  return (
    <section id={id} className="flex flex-col gap-4">
      <Tabs value={vista} onValueChange={setVista} className="gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          {cabecera}
          <TabsList aria-label={`Vista de ${title}`}>
            <TabsTrigger value="preview">
              <Eye /> Vista previa
            </TabsTrigger>
            <TabsTrigger value="codigo">
              <FileText /> Código
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="flex flex-col gap-4">
          {children}
        </TabsContent>
        <TabsContent value="codigo">
          <div className="bg-frame rounded-4xl p-4">
            <PanelCodigo files={codigo.files} activo={vista === 'codigo'} />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
