'use client';

import { Breadcrumbs, PaginatorLinks } from '@/components/kit';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { type ReactNode, useState } from 'react';

/**
 * Bloque salvia con su nombre arriba, para agrupar los ejemplos.
 *
 * @param title Nombre del bloque.
 * @param children Contenido.
 */
function Bloque({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-frame flex flex-col gap-3 rounded-4xl p-5">
      <p className="text-muted-foreground text-xs font-semibold">{title}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/**
 * Navegación: migas de pan, paginación y enlaces a las pantallas completas.
 */
export default function EjemploNavegacion() {
  const [pagina, setPagina] = useState(2);
  const enlaces = [
    { url: pagina > 1 ? String(pagina - 1) : null, label: '&laquo; Anterior', active: false },
    ...[1, 2, 3, 4, 5].map((n) => ({ url: String(n), label: String(n), active: n === pagina })),
    { url: pagina < 5 ? String(pagina + 1) : null, label: 'Siguiente &raquo;', active: false },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Bloque title="Migas de pan">
        <Breadcrumbs
          breadcrumbs={[
            { title: 'Personas', href: '#navegacion' },
            { title: 'ALEX EJEMPLO UNO', href: '#navegacion' },
            { title: 'Editar', href: '#navegacion' },
          ]}
        />
      </Bloque>
      <Bloque title="Paginación">
        <PaginatorLinks links={enlaces} onNavigate={(url) => setPagina(Number(url))} />
      </Bloque>
      <Bloque title="Pantallas completas">
        <Button variant="outline" asChild>
          <Link href="/ejemplos/acceso">Inicio de sesión</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/ejemplos/403">Error 403</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/ejemplos/404">Error 404</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/ejemplos/419">Error 419</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/ejemplos/500">Error 500</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/ejemplos/cerrado">Sistema cerrado</Link>
        </Button>
      </Bloque>
    </div>
  );
}
