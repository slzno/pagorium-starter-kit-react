'use client';

import { type IconComponent, Search } from '@/components/icons';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Kbd } from '@/components/ui/kbd';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { Command as CommandPrimitive } from 'cmdk';
import { useRouter } from 'next/navigation';
import { type ReactNode, useEffect, useEffectEvent, useState, useSyncExternalStore } from 'react';
import { InitialsAvatar } from './initials-avatar';
import { StatusBadge, type StatusTone } from './status-badge';

/** Resultado de la búsqueda rápida. */
export type QuickSearchItem = {
  /** Identificador único dentro de la búsqueda. */
  id: string;
  title: ReactNode;
  /** Línea secundaria en gris (número, documento, lugar…). */
  description?: ReactNode;
  /** Nombre para dibujar un avatar con iniciales a la izquierda. */
  avatarName?: string;
  /** Ícono en círculo a la izquierda (si no hay `avatarName`). */
  icon?: IconComponent;
  /** Insignia de estado a la derecha. */
  badge?: { tone: StatusTone; label: string };
  /** A dónde lleva al elegirlo. */
  href?: string;
  /** Acción al elegirlo (en lugar de `href`). */
  onSelect?: () => void;
};

/** Grupo de resultados con su título. */
export type QuickSearchGroup = {
  heading: string;
  items: QuickSearchItem[];
};

/** Función que busca: recibe el texto y una señal para cancelar, y devuelve los grupos. */
export type QuickSearchFn = (query: string, signal: AbortSignal) => Promise<QuickSearchGroup[]>;

/** Clases de cada resultado. */
const ITEM = 'flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-sm outline-none select-none data-[selected=true]:bg-frame';

/** Clases del título de cada grupo de resultados. */
const GROUP =
  '[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold';

/**
 * Busca con espera entre teclas y cancela la búsqueda anterior si llega otra. El estado de «buscando» se
 * deduce comparando el texto actual con el de los últimos resultados.
 *
 * @param text Texto escrito.
 * @param search Función que busca.
 * @param minLength Letras mínimas para buscar.
 * @param delay Espera tras la última tecla, en milisegundos.
 * @return Grupos encontrados, si está buscando y si hubo un error.
 */
function useQuickSearch(text: string, search: QuickSearchFn, minLength: number, delay: number) {
  const [state, setState] = useState<{ query: string; groups: QuickSearchGroup[]; error: boolean }>({ query: '', groups: [], error: false });
  const query = text.trim();
  const active = query.length >= minLength;
  // La función puede cambiar en cada render (flecha en línea): se lee la última sin volver a buscar.
  const run = useEffectEvent((value: string, signal: AbortSignal) => search(value, signal));

  useEffect(() => {
    if (!active) {
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => {
      run(query, controller.signal)
        .then((groups) => setState({ query, groups, error: false }))
        .catch((error: unknown) => {
          if (!(error instanceof DOMException && error.name === 'AbortError')) {
            setState({ query, groups: [], error: true });
          }
        });
    }, delay);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, active, delay]);

  const current = active && state.query === query;

  return {
    groups: current ? state.groups.filter((group) => group.items.length > 0) : [],
    searching: active && !current,
    error: current && state.error,
  };
}

/**
 * Indica si el navegador corre en Mac o iOS, para mostrar ⌘ en vez de Ctrl.
 *
 * @return Verdadero en Mac.
 */
function useIsMac(): boolean {
  return useSyncExternalStore(
    () => () => undefined,
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => false,
  );
}

/**
 * Buscador rápido de la barra superior: un campo (o un botón redondo en celular) que abre una ventana para
 * buscar con `search` y abrir el resultado con Enter o un clic. Se abre también con Ctrl + K (⌘ + K en Mac)
 * o con «/». Los resultados se agrupan, con avatar de iniciales o ícono, una línea secundaria y una
 * insignia de estado opcional.
 *
 * @param search Función que busca (por ejemplo, un `fetch` a la API).
 * @param label Nombre accesible del buscador y título de la ventana.
 * @param placeholder Texto del campo de la barra.
 * @param inputPlaceholder Texto del campo dentro de la ventana.
 * @param description Descripción accesible de la ventana.
 * @param hints Ayuda inicial: pares de título y detalle de lo que se puede escribir.
 * @param emptyText Texto sin resultados, a partir del texto buscado.
 * @param errorText Texto si la búsqueda falla.
 * @param minLength Letras mínimas para buscar.
 * @param delay Espera tras la última tecla, en milisegundos.
 * @param uppercase Si los títulos van en mayúsculas.
 * @param onNavigate Abre una dirección (por omisión, `router.push` de Next).
 */
export function QuickSearch({
  search,
  label = 'Buscar',
  placeholder = 'Buscar',
  inputPlaceholder = 'Escriba para buscar',
  description = 'Escriba un nombre o un número.',
  hints = [],
  emptyText = (query) => (
    <>
      Sin resultados para «<span className="text-foreground font-semibold">{query}</span>».
    </>
  ),
  errorText = 'No se pudo buscar. Inténtelo de nuevo.',
  minLength = 2,
  delay = 250,
  uppercase = true,
  onNavigate,
}: {
  search: QuickSearchFn;
  label?: string;
  placeholder?: string;
  inputPlaceholder?: string;
  description?: string;
  hints?: [string, string][];
  emptyText?: (query: string) => ReactNode;
  errorText?: string;
  minLength?: number;
  delay?: number;
  uppercase?: boolean;
  onNavigate?: (href: string) => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const { groups, searching, error } = useQuickSearch(open ? text : '', search, minLength, delay);
  const mac = useIsMac();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.closest('input, textarea, select, [contenteditable="true"]');

      if ((event.key === 'k' || event.key === 'K') && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setOpen((previous) => !previous);
      } else if (event.key === '/' && !typing) {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  /**
   * Cierra la ventana y abre el resultado elegido.
   *
   * @param item Resultado.
   */
  const choose = (item: QuickSearchItem) => {
    setOpen(false);
    setText('');

    if (item.onSelect) {
      item.onSelect();
    } else if (item.href) {
      if (onNavigate) {
        onNavigate(item.href);
      } else {
        router.push(item.href);
      }
    }
  };

  const query = text.trim();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-field border-input hover:border-field-hover focus-visible:border-ring focus-visible:ring-ring/50 text-muted-foreground hidden h-11.5 w-56 items-center gap-2 rounded-full border-2 px-4 text-sm transition-[border-color,box-shadow] outline-none focus-visible:ring-3 md:flex xl:w-72"
        aria-label={label}
        aria-keyshortcuts="Control+K"
      >
        <Search className="size-4 shrink-0" />
        <span className="min-w-0 flex-1 truncate text-left">{placeholder}</span>
        <Kbd className="bg-frame">{mac ? '⌘' : 'Ctrl'} K</Kbd>
      </button>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-frame text-foreground/80 hover:text-foreground focus-visible:ring-ring/50 flex size-11.5 items-center justify-center rounded-full outline-none focus-visible:ring-3 md:hidden"
        aria-label={label}
      >
        <Search className="size-[22px]" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="top-[12vh] translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-xl">
          <DialogTitle className="sr-only">{label}</DialogTitle>
          <DialogDescription className="sr-only">{description}</DialogDescription>

          <CommandPrimitive shouldFilter={false} loop className="flex flex-col">
            <div className="border-border flex items-center gap-3 border-b px-5">
              {searching ? <Spinner className="text-muted-foreground size-5 shrink-0" /> : <Search className="text-muted-foreground size-5 shrink-0" />}
              <CommandPrimitive.Input
                value={text}
                onValueChange={setText}
                placeholder={inputPlaceholder}
                className="placeholder:text-muted-foreground h-16 min-w-0 flex-1 bg-transparent text-base outline-none"
              />
              <Kbd className="bg-frame">Esc</Kbd>
            </div>

            <CommandPrimitive.List className="max-h-[60vh] overflow-y-auto p-2">
              {query.length < minLength ? (
                hints.length > 0 && <QuickSearchHints hints={hints} />
              ) : error ? (
                <p className="text-destructive px-3 py-8 text-center text-sm">{errorText}</p>
              ) : !searching && groups.length === 0 ? (
                <p className="text-muted-foreground px-3 py-8 text-center text-sm">{emptyText(query)}</p>
              ) : null}

              {groups.map((group) => (
                <CommandPrimitive.Group key={group.heading} heading={group.heading} className={GROUP}>
                  {group.items.map((item) => (
                    <CommandPrimitive.Item key={item.id} value={item.id} onSelect={() => choose(item)} className={ITEM}>
                      {item.avatarName ? (
                        <InitialsAvatar name={item.avatarName} className="size-9 shrink-0 text-xs" />
                      ) : (
                        item.icon && (
                          <span className="bg-frame flex size-9 shrink-0 items-center justify-center rounded-full">
                            <item.icon className="size-5" />
                          </span>
                        )
                      )}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className={cn('truncate font-medium', uppercase && 'uppercase')}>{item.title}</span>
                        {item.description && <span className="text-muted-foreground truncate text-xs tabular-nums">{item.description}</span>}
                      </div>
                      {item.badge && <StatusBadge tone={item.badge.tone}>{item.badge.label}</StatusBadge>}
                    </CommandPrimitive.Item>
                  ))}
                </CommandPrimitive.Group>
              ))}
            </CommandPrimitive.List>

            <div className="border-border text-muted-foreground flex items-center gap-4 border-t px-5 py-3 text-xs">
              <span className="flex items-center gap-1.5">
                <Kbd className="bg-frame">↑</Kbd>
                <Kbd className="bg-frame">↓</Kbd> para moverse
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd className="bg-frame">Enter</Kbd> para abrir
              </span>
            </div>
          </CommandPrimitive>
        </DialogContent>
      </Dialog>
    </>
  );
}

/**
 * Ayuda inicial: qué se puede escribir.
 *
 * @param hints Pares de título y detalle.
 */
function QuickSearchHints({ hints }: { hints: [string, string][] }) {
  return (
    <div className="flex flex-col gap-1 px-3 py-4">
      <p className="text-muted-foreground pb-2 text-xs font-semibold">Puede buscar por</p>
      {hints.map(([title, detail]) => (
        <p key={title} className="text-sm">
          <span className="font-semibold">{title}</span> <span className="text-muted-foreground">{detail}</span>
        </p>
      ))}
    </div>
  );
}
