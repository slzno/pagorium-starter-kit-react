'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useRouter } from 'next/navigation';
import { type MouseEvent } from 'react';

/** Enlace de un paginador: dirección (nula si no aplica), texto y si es la página actual. */
export type PaginatorLink = {
  url: string | null;
  label: string;
  active: boolean;
};

/**
 * Página de un resultado paginado (con la misma forma que `paginate()` de Laravel): registros, enlaces y
 * totales.
 */
export type Paginator<T> = {
  data: T[];
  links: PaginatorLink[];
  total: number;
  from: number | null;
  to: number | null;
};

/**
 * Paginación con los enlaces de un resultado paginado: anterior, páginas (con puntos suspensivos donde no
 * hay dirección) y siguiente. El primero y el último de `links` son «Anterior» y «Siguiente». Navega en el
 * cliente sin subir al inicio; con `onNavigate`, la página decide cómo cargar.
 *
 * @param links Enlaces del paginador.
 * @param onNavigate Carga una dirección (por omisión, `router.push` de Next sin desplazar).
 * @param className Clases de la paginación.
 */
export function PaginatorLinks({ links, onNavigate, className }: { links: PaginatorLink[]; onNavigate?: (url: string) => void; className?: string }) {
  const router = useRouter();

  if (links.length <= 3) {
    return null;
  }

  /**
   * Manejador del clic: evita la recarga y navega a la dirección.
   *
   * @param url Dirección de destino.
   */
  const visit = (url: string | null) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (url) {
      if (onNavigate) {
        onNavigate(url);
      } else {
        router.push(url, { scroll: false });
      }
    }
  };

  const previous = links[0];
  const next = links[links.length - 1];
  const pages = links.slice(1, -1);

  return (
    <Pagination className={className ?? 'mx-0 w-auto'}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={previous.url ?? undefined}
            aria-disabled={!previous.url}
            className={previous.url ? undefined : 'pointer-events-none opacity-50'}
            onClick={visit(previous.url)}
          />
        </PaginationItem>
        {pages.map((link, index) => (
          <PaginationItem key={`${link.label}-${index}`}>
            {link.url === null ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink href={link.url} isActive={link.active} className="tabular-nums" onClick={visit(link.url)}>
                {link.label}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={next.url ?? undefined}
            aria-disabled={!next.url}
            className={next.url ? undefined : 'pointer-events-none opacity-50'}
            onClick={visit(next.url)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
