/**
 * Encabezado de sección de una página de ajustes: título de 20 px y descripción opcional.
 *
 * @param title Título.
 * @param description Descripción bajo el título.
 */
export function Heading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8 space-y-0.5">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {description && <p className="text-muted-foreground text-sm">{description}</p>}
    </div>
  );
}

/**
 * Encabezado pequeño de un bloque dentro de una sección: título de 16 px y descripción opcional.
 *
 * @param title Título.
 * @param description Descripción bajo el título.
 */
export function HeadingSmall({ title, description }: { title: string; description?: string }) {
  return (
    <header>
      <h3 className="mb-0.5 text-base font-medium">{title}</h3>
      {description && <p className="text-muted-foreground text-sm">{description}</p>}
    </header>
  );
}
