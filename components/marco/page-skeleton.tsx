import { Skeleton } from '@/components/ui/skeleton';

/** Forma del esqueleto: lista (índices), ficha (detalle con cabecera y pestañas) o formulario. */
export type SkeletonKind = 'list' | 'detail' | 'form';

/** Opciones para adivinar la forma del esqueleto a partir de la ruta. */
export type SkeletonKindOptions = {
  /** Últimos tramos de ruta que abren un formulario (por omisión, `create` y `edit`). */
  formSegments?: string[];
  /** Primeros tramos de rutas que, aunque lleven un id, no son fichas (reportes, descargas…). */
  listPrefixes?: string[];
};

/**
 * Si la ruta es un formulario: termina en uno de `formSegments` (por omisión `create` o `edit`) o lleva
 * `edit` o `create` en medio (`orders/edit/5`). Ignora la consulta (`?…`) y el ancla.
 *
 * @param path Pathname o URL relativa, por ejemplo `/orders/12/edit?tab=1`.
 * @param formSegments Tramos finales que también cuentan como formulario.
 * @return Verdadero si es un formulario de crear o editar.
 */
export function isFormPath(path: string | null, formSegments: string[] = ['create', 'edit']): boolean {
  const segments = (path ?? '').split(/[?#]/)[0].split('/').filter(Boolean);
  const last = segments.at(-1) ?? '';

  return formSegments.includes(last) || segments.includes('edit') || segments.includes('create');
}

/**
 * Decide la forma del esqueleto según la ruta a la que se va: formulario si es de crear o editar (ver
 * `isFormPath`); ficha si lleva un id numérico después del primer tramo (`orders/12`); lista en el resto.
 *
 * @param path Pathname de destino, por ejemplo `/orders/12/edit`.
 * @param options Tramos de formulario y prefijos que siempre son lista.
 * @return La forma del esqueleto.
 */
export function skeletonKind(path: string | null, options: SkeletonKindOptions = {}): SkeletonKind {
  const segments = (path ?? '').split(/[?#]/)[0].split('/').filter(Boolean);

  if (isFormPath(path, options.formSegments)) {
    return 'form';
  }

  if (!(options.listPrefixes ?? []).includes(segments[0] ?? '') && segments.slice(1).some((segment) => /^\d+$/.test(segment))) {
    return 'detail';
  }

  return 'list';
}

/**
 * Esqueleto de una pantalla mientras carga, con las mismas formas y colores del sistema (marco salvia,
 * elementos blancos) y la forma de la pantalla de destino. Sirve también como `loading.tsx` de Next.
 *
 * @param kind Lista, ficha o formulario.
 */
export function PageSkeleton({ kind = 'list' }: { kind?: SkeletonKind }) {
  return (
    <div role="status" aria-label="Cargando" className="flex flex-1 flex-col gap-6 px-4 py-6 md:px-6">
      {kind === 'detail' ? <DetailSkeleton /> : kind === 'form' ? <FormSkeleton /> : <ListSkeleton />}
      <span className="sr-only">Cargando la pantalla…</span>
    </div>
  );
}

/**
 * Título con su ayuda y, a la derecha, el botón principal.
 *
 * @param button Si se dibuja el botón de la derecha.
 */
function SkeletonHeading({ button = true }: { button?: boolean }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="bg-frame h-8 w-56 rounded-full" />
        <Skeleton className="bg-frame h-4 w-72 rounded-full" />
      </div>
      {button && <Skeleton className="bg-frame h-11.5 w-36 rounded-full" />}
    </div>
  );
}

/**
 * Índice: búsqueda y filtros y filas en tarjeta dentro del marco.
 */
function ListSkeleton() {
  return (
    <>
      <SkeletonHeading />
      <div className="bg-frame ring-foreground/5 flex flex-col gap-4 rounded-4xl p-4 ring-1 sm:p-5 dark:ring-foreground/10">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="bg-card h-11.5 w-full max-w-sm rounded-full" />
          <Skeleton className="bg-card hidden h-11.5 w-56 rounded-full sm:block" />
        </div>
        <div className="flex flex-col gap-1.5">
          {Array.from({ length: 9 }, (_, index) => (
            <div key={index} className="bg-card dark:bg-muted flex h-12 items-center gap-4 rounded-[0.875rem] px-3">
              <Skeleton className="bg-frame size-7 shrink-0 rounded-full" />
              <Skeleton className="bg-frame h-3 rounded-full" style={{ width: `${30 - (index % 3) * 5}%` }} />
              <Skeleton className="bg-frame ml-auto hidden h-3 w-24 rounded-full md:block" />
              <Skeleton className="bg-frame hidden h-3 w-20 rounded-full lg:block" />
              <Skeleton className="bg-frame size-7 shrink-0 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/**
 * Ficha: cabecera con avatar, nombre y pastillas, pestañas, tarjetas de datos y el resumen a la derecha.
 */
function DetailSkeleton() {
  return (
    <>
      <div className="flex items-center gap-4">
        <Skeleton className="bg-frame size-16 shrink-0 rounded-full" />
        <div className="flex flex-col gap-2.5">
          <Skeleton className="bg-frame h-8 w-72 max-w-[60vw] rounded-full" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="bg-frame h-6 w-24 rounded-full" />
            <Skeleton className="bg-frame h-6 w-36 rounded-full" />
            <Skeleton className="bg-frame hidden h-6 w-28 rounded-full sm:block" />
          </div>
        </div>
        <Skeleton className="bg-frame ml-auto hidden h-11.5 w-32 rounded-full sm:block" />
      </div>

      <Skeleton className="bg-frame h-11.5 w-80 max-w-full rounded-full" />

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="grid min-w-0 gap-4">
          {[6, 3].map((fields, section) => (
            <div key={section} className="bg-frame ring-foreground/5 rounded-4xl p-5 ring-1 dark:ring-foreground/10">
              <Skeleton className="bg-card mb-4 h-5 w-44 rounded-full" />
              <div className="bg-card dark:bg-muted grid gap-x-6 gap-y-5 rounded-3xl p-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: fields }, (_, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <Skeleton className="bg-frame h-3 w-20 rounded-full" />
                    <Skeleton className="bg-frame h-4 rounded-full" style={{ width: `${70 - (index % 3) * 15}%` }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-frame ring-foreground/5 flex flex-col gap-4 rounded-4xl p-5 ring-1 dark:ring-foreground/10">
          <Skeleton className="bg-card h-5 w-28 rounded-full" />
          <Skeleton className="bg-card h-11.5 w-full rounded-full" />
          <Skeleton className="bg-card h-11.5 w-full rounded-full" />
          <div className="bg-card dark:bg-muted flex flex-col gap-4 rounded-3xl p-4">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="bg-frame size-9 shrink-0 rounded-xl" />
                <div className="flex flex-1 flex-col gap-1.5">
                  <Skeleton className="bg-frame h-3 w-16 rounded-full" />
                  <Skeleton className="bg-frame h-3.5 w-3/4 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Formulario (crear y editar): secciones en marco con etiquetas y campos, y el botón al pie.
 */
function FormSkeleton() {
  return (
    <>
      <SkeletonHeading button={false} />
      {[6, 4].map((fields, section) => (
        <div key={section} className="bg-frame ring-foreground/5 rounded-4xl px-6.5 py-6 ring-1 dark:ring-foreground/10">
          <div className="mb-5 flex flex-col gap-2">
            <Skeleton className="bg-card h-5 w-48 rounded-full" />
            <Skeleton className="bg-card h-3 w-72 max-w-full rounded-full" />
          </div>
          <div className="bg-card dark:bg-muted grid gap-x-5 gap-y-5 rounded-3xl p-5 sm:grid-cols-2">
            {Array.from({ length: fields }, (_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Skeleton className="bg-frame h-3 w-28 rounded-full" />
                <Skeleton className="bg-frame h-11.5 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Skeleton className="bg-frame h-11.5 w-40 rounded-full" />
      </div>
    </>
  );
}
