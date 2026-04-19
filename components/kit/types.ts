import { type IconComponent } from '@/components/icons';

/** Miga de pan: título y a dónde lleva. */
export type BreadcrumbItem = {
  title: string;
  href: string;
};

/** Enlace de navegación (barra superior, barra lateral o accesos rápidos). */
export type NavLink = {
  title: string;
  href: string;
  icon?: IconComponent;
  /** Prefijo de URL que marca el enlace como activo (por omisión, el propio `href`). */
  match?: string;
  /** Abre en otra pestaña con un enlace normal. */
  external?: boolean;
  /** Número de pendientes que se muestra en el acceso rápido (0 lo oculta). */
  count?: number;
};

/** Grupo de enlaces con título (columna del menú grande o sección del menú del celular). */
export type NavGroup = {
  title: string;
  items: NavLink[];
};

/** Datos mínimos de la persona que inició sesión. */
export type MarcoUser = {
  name: string;
  email?: string;
  avatar?: string;
};

/**
 * Si un enlace está activo en la ruta actual: la ruta es su prefijo (`match` o `href`) o empieza con él
 * seguido de `/`. Los externos y las anclas de la misma página (`#…`) nunca se marcan.
 *
 * @param link Enlace.
 * @param path Pathname actual, sin consulta.
 * @return Verdadero si está activo.
 */
export function isLinkActive(link: Pick<NavLink, 'href' | 'match' | 'external'>, path: string): boolean {
  if (link.external) {
    return false;
  }

  const prefix = (link.match ?? link.href).split(/[?#]/)[0];

  if (prefix === '') {
    return false;
  }

  if (prefix === '/') {
    return path === '/';
  }

  return path === prefix || path.startsWith(prefix.endsWith('/') ? prefix : `${prefix}/`);
}
