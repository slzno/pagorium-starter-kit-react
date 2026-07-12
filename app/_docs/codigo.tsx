'use client';

import { Check, Copy, FileText } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { type ReactNode, useEffect, useState } from 'react';

/** Código fuente de la plantilla: ruta relativa a contenido. */
export type Fuentes = Record<string, string>;

/** Promesa compartida: el código se pide una sola vez, la primera vez que alguien lo abre. */
let pedido: Promise<Fuentes> | null = null;

/**
 * Pide el código de la plantilla (una sola vez por visita).
 *
 * @return El mapa de archivos.
 */
export function cargarFuentes(): Promise<Fuentes> {
  pedido ??= fetch('/codigo')
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error(String(respuesta.status));
      }

      return respuesta.json() as Promise<Fuentes>;
    })
    .catch((error: unknown) => {
      pedido = null;
      throw error;
    });

  return pedido;
}

/**
 * Código de la plantilla cuando `activo` es verdadero (por ejemplo, al abrir la ventana).
 *
 * @param activo Si ya hay que pedirlo.
 * @return Las fuentes, o `null` mientras cargan, o `false` si falló.
 */
export function useFuentes(activo: boolean): Fuentes | null | false {
  const [fuentes, setFuentes] = useState<Fuentes | null | false>(null);

  useEffect(() => {
    if (!activo) {
      return;
    }

    let vigente = true;
    cargarFuentes()
      .then((datos) => vigente && setFuentes(datos))
      .catch(() => vigente && setFuentes(false));

    return () => {
      vigente = false;
    };
  }, [activo]);

  return fuentes;
}

/**
 * Botón que copia un texto al portapapeles y confirma con un check por dos segundos.
 *
 * @param text Texto que se copia.
 * @param label Texto del botón (si no, solo ícono).
 * @param className Clases extra.
 */
export function BotonCopiar({ text, label, className }: { text: string; label?: string; className?: string }) {
  const [copiado, setCopiado] = useState(false);

  /** Copia el texto y muestra la confirmación. */
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setCopiado(false);
    }
  };

  return (
    <Button type="button" variant={label ? 'outline' : 'ghost'} size={label ? 'default' : 'icon'} onClick={copiar} className={className} aria-label={label ? undefined : 'Copiar código'}>
      {copiado ? <Check /> : <Copy />}
      {label && (copiado ? 'Copiado' : label)}
      <span className="sr-only" aria-live="polite">
        {copiado ? 'Copiado al portapapeles' : ''}
      </span>
    </Button>
  );
}

/**
 * Bloque de código con su nombre arriba y el botón de copiar: fondo de la página, letra monoespaciada y
 * desplazamiento propio.
 *
 * @param code Código.
 * @param title Nombre del archivo o del ejemplo.
 * @param className Clases extra (por ejemplo, el alto máximo).
 */
export function BloqueCodigo({ code, title, className }: { code: string; title?: string; className?: string }) {
  return (
    <div className="bg-background ring-foreground/10 overflow-hidden rounded-3xl ring-1">
      <div className="bg-frame flex items-center justify-between gap-3 py-1.5 pr-1.5 pl-4">
        <span className="text-muted-foreground truncate font-mono text-xs">{title ?? 'código'}</span>
        <BotonCopiar text={code} />
      </div>
      <pre className={cn('max-h-[28rem] overflow-auto p-4 font-mono text-[0.8125rem] leading-relaxed', className)}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

/**
 * Nombre corto de un archivo para su pestaña.
 *
 * @param ruta Ruta relativa.
 * @return El nombre del archivo.
 */
const nombre = (ruta: string): string => ruta.split('/').at(-1) ?? ruta;

/**
 * Código de un componente: el ejemplo completo (el mismo que se ve en la vista previa) y los archivos React
 * que usa, cada uno en su pestaña y con botón de copiar. Los archivos se piden solo cuando `activo` es
 * verdadero (cuando se ve el panel).
 *
 * @param files Rutas de los archivos; el primero de `app/_docs/ejemplos` se rotula «Ejemplo».
 * @param activo Si ya se muestra (para cargar el código).
 */
export function PanelCodigo({ files = [], activo }: { files?: string[]; activo: boolean }) {
  const fuentes = useFuentes(activo);

  return (
    <Tabs defaultValue={files[0]} className="min-w-0 gap-3">
      <TabsList variant="line" className="max-w-full justify-start overflow-x-auto">
        {files.map((ruta) => (
          <TabsTrigger key={ruta} value={ruta} className={ruta.startsWith('app/_docs/ejemplos/') ? undefined : 'font-mono text-xs'}>
            {ruta.startsWith('app/_docs/ejemplos/') ? 'Ejemplo' : nombre(ruta)}
          </TabsTrigger>
        ))}
      </TabsList>
      {files.map((ruta) => (
        <TabsContent key={ruta} value={ruta}>
          {fuentes === false ? (
            <p className="text-destructive text-sm">No se pudo cargar el código. Inténtelo de nuevo.</p>
          ) : fuentes === null ? (
            <p className="text-muted-foreground text-sm">Cargando el código…</p>
          ) : (
            <BloqueCodigo code={fuentes[ruta] ?? '// Archivo no encontrado.'} title={ruta} />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}

/**
 * Botón que abre una ventana con el código de uno o varios archivos (lo usa el catálogo).
 *
 * @param title Título de la ventana.
 * @param files Rutas de los archivos.
 * @param trigger Botón propio en lugar del de «Código».
 */
export function BotonCodigo({ title, files = [], trigger }: { title: string; files?: string[]; trigger?: ReactNode }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <Dialog open={abierto} onOpenChange={setAbierto}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline">
            <FileText /> Código
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90svh] gap-4 overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Copia el archivo a tu proyecto; depende del tema y de `lib/utils.ts`.</DialogDescription>
        </DialogHeader>
        <PanelCodigo files={files} activo={abierto} />
      </DialogContent>
    </Dialog>
  );
}
