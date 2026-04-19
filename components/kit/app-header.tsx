'use client';

import { type IconComponent, Menu } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ComponentProps, type ReactNode, useEffect, useRef, useSyncExternalStore } from 'react';
import { Breadcrumbs } from './breadcrumbs';
import { ThemeToggle } from './theme-toggle';
import { type BreadcrumbItem, isLinkActive, type MarcoUser, type NavGroup, type NavLink } from './types';
import { userInitials } from './user-info';

/**
 * Menú desplegable de la barra: con `items` es un panel sencillo bajo su botón (con `label` como título);
 * con `groups` es un menú grande a todo el ancho de la barra, con una columna por grupo.
 */
export type HeaderMenu = {
  title: string;
  label?: string;
  items?: NavLink[];
  groups?: NavGroup[];
  /** Prefijo de URL que marca el menú como activo, además de sus enlaces. */
  match?: string;
};

/** Entrada de la barra: un enlace directo o un menú desplegable. */
export type HeaderNavEntry = NavLink | HeaderMenu;

/**
 * Indica si una entrada de la barra es un enlace directo.
 *
 * @param entry Entrada.
 * @return Verdadero si es un enlace.
 */
const isLink = (entry: HeaderNavEntry): entry is NavLink => 'href' in entry;

/**
 * Enlaces de un menú desplegable (sencillo o grande).
 *
 * @param menu Menú.
 * @return Todos sus enlaces.
 */
const menuLinks = (menu: HeaderMenu): NavLink[] => [...(menu.items ?? []), ...(menu.groups ?? []).flatMap((group) => group.items)];

/**
 * Ícono del módulo en el que está la página, sacado del mismo menú de la cabecera: el enlace cuyo prefijo
 * de URL coincide más largo con la ruta actual. Así el título de cada página puede llevar el mismo ícono
 * que su entrada en el menú (ver `PageHeader`).
 *
 * @param path Ruta actual (con o sin consulta).
 * @param entries Entradas de la barra y accesos rápidos.
 * @return El ícono, o nulo si la página no está en el menú.
 */
export function findNavIcon(path: string, entries: (HeaderNavEntry | NavLink)[]): IconComponent | null {
  const clean = path.split('?')[0];
  const links = entries.flatMap((entry) => (isLink(entry) ? [entry] : menuLinks(entry)));
  let best: { length: number; icon: IconComponent } | null = null;

  for (const link of links) {
    const prefix = link.match ?? link.href;

    if (link.icon && isLinkActive(link, clean) && (!best || prefix.length > best.length)) {
      best = { length: prefix.length, icon: link.icon };
    }
  }

  return best?.icon ?? null;
}

/**
 * Enlace del menú: `Link` de Next para rutas propias y enlace normal en otra pestaña para los externos.
 * Reenvía todas las props (clases, eventos, data-* y ref) que le pasan Button, Tooltip o NavigationMenuLink.
 *
 * @param item Enlace.
 * @param props Props del `<a>`.
 */
function MenuAnchor({ item, ...props }: { item: NavLink } & Omit<ComponentProps<'a'>, 'href'>) {
  if (item.external) {
    return <a href={item.href} target="_blank" rel="noopener noreferrer" {...props} />;
  }

  return <Link href={item.href} {...props} />;
}

/**
 * Ícono de un enlace del menú, sin recuadro: el ícono de 28 px alineado con el texto.
 *
 * @param icon Ícono.
 */
function MegaIcon({ icon: Icon }: { icon: IconComponent }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center">
      <Icon className="size-7" />
    </span>
  );
}

/**
 * Suscribe al desplazamiento de la ventana.
 *
 * @param listener Función que se avisa en cada desplazamiento.
 * @return Función para cancelar la suscripción.
 */
function subscribeScroll(listener: () => void): () => void {
  window.addEventListener('scroll', listener, { passive: true });

  return () => window.removeEventListener('scroll', listener);
}

/**
 * Indica si la página está desplazada hacia abajo, para marcar el borde de la cabecera fija solo cuando el
 * contenido pasa por debajo.
 *
 * @return Verdadero si hay desplazamiento.
 */
function useScrolled(): boolean {
  return useSyncExternalStore(subscribeScroll, () => window.scrollY > 4, () => false);
}

/**
 * Publica la altura real de la cabecera fija en `--app-header-h` (en `<html>`), para que los paneles fijos
 * de las páginas (`lg:sticky`) se peguen justo debajo y no queden tapados; se actualiza si la cabecera
 * cambia de alto (migas de pan, barra superior extra, ancho de la ventana).
 *
 * @return Referencia para el contenedor de la cabecera.
 */
function useHeaderHeight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const publish = () => document.documentElement.style.setProperty('--app-header-h', `${element.offsetHeight}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return ref;
}

/** Props de `AppHeader`. */
export interface AppHeaderProps {
  /** Logo o nombre de la aplicación. */
  brand: ReactNode;
  /** A dónde lleva la marca. */
  brandHref?: string;
  /** Nombre accesible del enlace de la marca. */
  brandLabel?: string;
  /** Entradas del menú principal: enlaces directos y menús desplegables. */
  nav?: HeaderNavEntry[];
  /** Accesos rápidos: botones redondos con ícono, ayuda emergente y contador de pendientes. */
  shortcuts?: NavLink[];
  /** Buscador a la derecha (por ejemplo, `QuickSearch`). */
  search?: ReactNode;
  /** Botones extra a la derecha, antes del tema. */
  actions?: ReactNode;
  /** Botón de tema: `true` muestra `ThemeToggle`, `false` lo oculta o se pasa uno propio. */
  themeToggle?: boolean | ReactNode;
  /** Usuario; sin él no se muestra el avatar. */
  user?: MarcoUser;
  /** Contenido del menú del avatar (por ejemplo, `UserMenuContent`). */
  userMenu?: ReactNode;
  /** Migas de pan bajo la barra (se muestran desde dos tramos). */
  breadcrumbs?: BreadcrumbItem[];
  /** Franja opcional encima de la barra (por ejemplo, herramientas de desarrollo). */
  topBar?: ReactNode;
  /** Ruta actual (por omisión, la de `usePathname`). */
  currentPath?: string;
  /** Título del panel del menú en celular. */
  mobileTitle?: string;
  /** Título del grupo de enlaces directos en el menú del celular. */
  mainGroupTitle?: string;
  /** Título del grupo de accesos rápidos en el menú del celular. */
  shortcutsTitle?: string;
}

/**
 * Cabecera fija de la aplicación: una barra flotante en píldora (con sombra media y un aro fino) con la
 * marca, el menú principal (enlaces, menús sencillos y un menú grande por columnas que se abren al pasar
 * el mouse), el buscador, los accesos rápidos con su contador, el tema y el avatar con su menú. En celular,
 * el menú va en un panel lateral. Debajo van las migas de pan y, al hacer scroll, una línea fina y una
 * sombra suave a lo ancho del contenedor.
 *
 * @param props Ver `AppHeaderProps`.
 */
export function AppHeader({
  brand,
  brandHref = '/',
  brandLabel = 'Inicio',
  nav = [],
  shortcuts = [],
  search,
  actions,
  themeToggle = true,
  user,
  userMenu,
  breadcrumbs = [],
  topBar,
  currentPath,
  mobileTitle = 'Menú',
  mainGroupTitle = 'Principal',
  shortcutsTitle = 'Accesos rápidos',
}: AppHeaderProps) {
  const pathname = usePathname();
  const path = (currentPath ?? pathname ?? '').split('?')[0];
  const scrolled = useScrolled();
  const headerRef = useHeaderHeight();

  /**
   * El enlace está activo si la ruta actual empieza con su prefijo.
   *
   * @param item Enlace.
   */
  const isActive = (item: NavLink): boolean => isLinkActive(item, path);

  /**
   * El menú está activo si alguno de sus enlaces lo está o la ruta empieza con su prefijo.
   *
   * @param menu Menú.
   */
  const isMenuActive = (menu: HeaderMenu): boolean =>
    menuLinks(menu).some(isActive) || Boolean(menu.match && isLinkActive({ href: menu.match }, path));

  const mobileGroups: NavGroup[] = [
    ...nav.flatMap((entry): NavGroup[] =>
      isLink(entry) ? [] : entry.groups ? entry.groups : [{ title: entry.title, items: entry.items ?? [] }],
    ),
    { title: mainGroupTitle, items: nav.filter(isLink) },
    { title: shortcutsTitle, items: shortcuts },
  ].filter((group) => group.items.length > 0);

  // Enlace de la barra: solo texto en negrita; gris al pasar el mouse o con el panel abierto, y la sección activa en verde suave.
  const navItemClass = (active: boolean) =>
    cn(
      'relative inline-flex h-9 flex-row items-center gap-1.5 rounded-full bg-transparent px-3.5 py-0 text-sm font-bold transition-colors outline-none select-none',
      'hover:bg-muted hover:text-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground',
      active ? 'bg-secondary text-secondary-foreground' : 'text-foreground/85',
    );
  const megaLinkClass = (active: boolean) =>
    cn(
      'group/link flex flex-row items-start gap-3 rounded-xl px-2.5 py-2 text-sm transition-colors outline-none',
      // Capa de estado de Material 3: 8 % del color del texto, visible sobre cualquier panel.
      'hover:bg-foreground/[0.08] focus:bg-foreground/[0.08] focus-visible:bg-foreground/[0.08]',
      active ? 'bg-secondary text-secondary-foreground font-medium hover:bg-secondary' : 'text-foreground/90',
    );

  return (
    // Cabecera y migas de pan fijas arriba al hacer scroll, con fondo sólido (sin desenfoque ni transparencia);
    // cuando el contenido pasa por debajo aparecen una línea fina y una sombra suave, solo a lo ancho del
    // contenedor de la página.
    <div ref={headerRef} className="bg-background sticky top-0 z-40">
      {topBar}
      {/* Barra flotante en píldora, con sombra media y un aro fino. */}
      <div className="px-3 pt-3 md:px-6">
        <div className="bg-card ring-foreground/5 relative mx-auto flex h-15 items-center gap-2 rounded-full px-3 shadow-md ring-1 md:max-w-app md:pr-3 md:pl-5 dark:ring-foreground/10">
          {/* Menú en celular */}
          {mobileGroups.length > 0 && (
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-11.5" aria-label="Abrir menú">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-background flex w-80 flex-col gap-0 overflow-y-auto p-0">
                  <SheetHeader className="border-b px-5 py-4 text-left">
                    <SheetTitle>{mobileTitle}</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-5 p-4">
                    {mobileGroups.map((group) => (
                      <div key={group.title} className="flex flex-col gap-0.5">
                        <p className="text-foreground px-2 pb-1 text-sm font-bold">{group.title}</p>
                        {group.items.map((item) => (
                          <Button
                            key={item.href}
                            variant="ghost"
                            className={cn('justify-start gap-3 px-2 font-normal', isActive(item) && 'bg-muted font-medium')}
                            asChild
                          >
                            <MenuAnchor item={item}>
                              {item.icon && <item.icon className="text-muted-foreground" />}
                              {item.title}
                            </MenuAnchor>
                          </Button>
                        ))}
                      </div>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          )}

          <Link href={brandHref} className="relative mr-4 flex shrink-0 items-center [&>img]:h-8 [&>img]:w-auto [&>svg]:h-8" aria-label={brandLabel}>
            {brand}
          </Link>

          {/* Menú en escritorio con NavigationMenu (Radix): se abre al pasar el mouse. Sin viewport, cada
              panel sale debajo de su botón; el menú grande es `static` y se posiciona sobre el contenedor de
              la cabecera (`relative`), así ocupa su ancho y queda centrado. Radix envuelve la lista en un
              div con `position: relative` en línea: `[&>div]:static!` lo anula. */}
          {nav.length > 0 && (
            <NavigationMenu viewport={false} delayDuration={80} className="static hidden max-w-none flex-none lg:flex [&>div]:static!" aria-label="Principal">
              <NavigationMenuList className="gap-0.5">
                {nav.map((entry) =>
                  isLink(entry) ? (
                    <NavigationMenuItem key={entry.href}>
                      <NavigationMenuLink active={isActive(entry)} className={navItemClass(isActive(entry))} asChild>
                        <MenuAnchor item={entry}>{entry.title}</MenuAnchor>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ) : entry.groups ? (
                    <NavigationMenuItem key={entry.title} className="static">
                      <NavigationMenuTrigger className={navItemClass(isMenuActive(entry))}>{entry.title}</NavigationMenuTrigger>
                      {/* Menú grande: 4 columnas en pantallas anchas y 2 en medianas (en celular va el panel lateral). */}
                      <NavigationMenuContent className="z-50 p-5 data-[motion]:animate-none md:inset-x-4 md:w-auto">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-6 xl:grid-cols-4">
                          {entry.groups.map((group) => (
                            <div key={group.title} className="flex min-w-0 flex-col gap-0.5">
                              <p className="text-foreground mb-1.5 border-b px-2.5 pb-2 text-sm font-bold">{group.title}</p>
                              {group.items.map((item) => (
                                <NavigationMenuLink key={item.href} active={isActive(item)} className={megaLinkClass(isActive(item))} asChild>
                                  <MenuAnchor item={item}>
                                    {item.icon && <MegaIcon icon={item.icon} />}
                                    <span className="min-w-0 pt-1 leading-snug">{item.title}</span>
                                  </MenuAnchor>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={entry.title}>
                      <NavigationMenuTrigger className={navItemClass(isMenuActive(entry))}>{entry.title}</NavigationMenuTrigger>
                      {/* Ancho según el contenido (`w-max`): con `w-auto` el panel toma el ancho del botón y los
                          textos se parten; con uno fijo sobra o falta espacio. */}
                      <NavigationMenuContent className="z-50 w-max min-w-48 p-2 data-[motion]:animate-none md:w-max">
                        {entry.label && <p className="text-foreground px-2.5 pt-1 pb-2 text-sm font-bold">{entry.label}</p>}
                        {(entry.items ?? []).map((item) => (
                          <NavigationMenuLink key={item.href} active={isActive(item)} className={cn(megaLinkClass(isActive(item)), 'items-center')} asChild>
                            <MenuAnchor item={item}>
                              {item.icon && <MegaIcon icon={item.icon} />}
                              <span className="min-w-0 truncate">{item.title}</span>
                            </MenuAnchor>
                          </NavigationMenuLink>
                        ))}
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ),
                )}
              </NavigationMenuList>
            </NavigationMenu>
          )}

          <div className="ml-auto flex items-center gap-1">
            {search && <div className="mr-2">{search}</div>}
            {shortcuts.length > 0 && (
              <TooltipProvider delayDuration={0}>
                <div className="hidden items-center gap-1 lg:flex">
                  {shortcuts.map((item) => {
                    const count = item.count ?? 0;

                    return (
                      <Tooltip key={item.href}>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              'bg-frame text-foreground/80 hover:text-foreground size-11.5 rounded-full hover:bg-[color-mix(in_oklab,var(--frame),var(--foreground)_8%)]',
                              isActive(item) && 'bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground',
                            )}
                            aria-current={isActive(item) ? 'page' : undefined}
                            asChild
                          >
                            <MenuAnchor item={item} className="relative">
                              {item.icon && <item.icon className="size-[22px]" />}
                              <span className="sr-only">
                                {item.title}
                                {count > 0 ? `, ${count} pendientes` : ''}
                              </span>
                              {count > 0 && (
                                <span
                                  aria-hidden="true"
                                  className="bg-destructive text-destructive-foreground absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none font-semibold tabular-nums"
                                >
                                  {count > 99 ? '99+' : count}
                                </span>
                              )}
                            </MenuAnchor>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{item.title}</TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
            )}

            {shortcuts.length > 0 && <span className="bg-border mx-1 hidden h-6 w-px lg:block" />}
            {actions}
            {themeToggle === true ? <ThemeToggle /> : themeToggle || null}

            {user && (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hover:bg-foreground/8 dark:hover:bg-foreground/10 data-[state=open]:bg-foreground/8 ml-1 size-11.5 p-0"
                    aria-label="Menú del usuario"
                  >
                    <Avatar className="size-10 overflow-hidden rounded-[50%]">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-accent text-primary dark:bg-primary/15 rounded-[50%] text-xs font-semibold">{userInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                {userMenu && (
                  <DropdownMenuContent className="w-auto min-w-60" align="end">
                    {userMenu}
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
      {breadcrumbs.length > 1 && (
        // Migas de pan como texto simple, alineadas con el contenido de la página.
        <div className="text-muted-foreground mx-auto flex h-11 w-full items-center px-4 md:max-w-app md:px-6">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      )}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full mx-auto px-4 md:max-w-app md:px-6">
        <div className={cn('opacity-0 transition-opacity duration-200', scrolled && 'opacity-100')}>
          <div className="bg-border h-px" />
          <div className="h-3 rounded-b-xl bg-linear-to-b from-(--shadow-ink) to-transparent" />
        </div>
      </div>
    </div>
  );
}

/**
 * Franja de herramientas sobre la cabecera (solo en pantallas extra anchas), con enlaces pequeños y su
 * ícono; útil para herramientas de desarrollo o de administración.
 *
 * @param items Enlaces de la franja.
 * @param label Nombre accesible de la franja.
 */
export function AppHeaderTopBar({ items, label = 'Herramientas' }: { items: NavLink[]; label?: string }) {
  return (
    <div className="bg-muted/50 hidden border-b xl:block">
      <nav className="mx-auto flex h-8 items-center justify-center gap-1 px-4 text-xs md:max-w-app" aria-label={label}>
        {items.map((item) => (
          <MenuAnchor
            key={item.href}
            item={item}
            className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 transition-colors"
          >
            {item.icon && <item.icon className="size-3.5" />}
            {item.title}
          </MenuAnchor>
        ))}
      </nav>
    </div>
  );
}
