'use client';

import { MadeByPagorium, StarterKitLogo } from '@/components/brands';
import { FileText } from '@/components/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { BloqueCodigo, BotonCodigo, BotonCopiar, useFuentes } from './codigo';
import { Seccion } from './secciones';

/** Dependencias de la plantilla, además de Next y React. */
const DEPENDENCIAS =
  'class-variance-authority clsx cmdk date-fns embla-carousel-react input-otp motion next-themes radix-ui react-day-picker react-resizable-panels recharts shadcn sonner tailwind-merge tw-animate-css vaul';

/** Repositorio público de la plantilla. */
export const REPOSITORIO = 'https://github.com/slzno/pagorium-starter-kit-react';

/**
 * Indica si un elemento ya entró en pantalla (una sola vez), para cargar el código solo cuando se ve.
 *
 * @return La referencia del elemento y si ya se vio.
 */
function useVisto<T extends HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [visto, setVisto] = useState(false);

  useEffect(() => {
    const elemento = ref.current;

    if (!elemento || visto) {
      return;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada?.isIntersecting) {
          setVisto(true);
          observador.disconnect();
        }
      },
      { rootMargin: '400px' },
    );
    observador.observe(elemento);

    return () => observador.disconnect();
  }, [visto]);

  return [ref, visto];
}

/**
 * Saca de la hoja del tema los bloques de tokens (`:root`, `.dark` y `.green` con la paleta), como los
 * que se copian de un tema de shadcn.
 *
 * @param css Contenido de `app/theme.css`.
 * @return Los bloques de tokens, separados por una línea en blanco.
 */
function tokensDelTema(css: string): string {
  const bloques: string[] = [];

  for (const selector of [':root', '.dark', '.green']) {
    const patron = new RegExp(`(^|\\n)${selector.replace('.', '\\.')} \\{\\n[\\s\\S]*?\\n\\}`, 'g');

    for (const coincidencia of css.matchAll(patron)) {
      const bloque = coincidencia[0].trim();

      if (bloque.includes('--background:')) {
        bloques.push(bloque);
      }
    }
  }

  return bloques.join('\n\n');
}

/**
 * Tema: los tokens de color (claro, oscuro y verde) para pegar en cualquier proyecto con shadcn, y el CSS
 * completo de la plantilla (tokens, tablas, esqueletos y ajustes de oscuro).
 */
export function SeccionTema() {
  const [ref, visto] = useVisto<HTMLDivElement>();
  const fuentes = useFuentes(visto);
  const css = fuentes ? (fuentes['app/theme.css'] ?? '') : '';
  const tokens = css ? tokensDelTema(css) : '';

  return (
    <Seccion id="tema" title="Tema" description="Copia los tokens para un proyecto con shadcn, o el CSS completo con las tablas, los esqueletos y el modo oscuro.">
      <div ref={ref} className="bg-frame flex flex-col gap-4 rounded-4xl p-5">
        {fuentes === false ? (
          <p className="text-destructive text-sm">No se pudo cargar el tema. Recarga la página.</p>
        ) : !css ? (
          <p className="text-muted-foreground text-sm">Cargando el tema…</p>
        ) : (
          <Tabs defaultValue="tokens" className="gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <TabsList>
                <TabsTrigger value="tokens">Tokens</TabsTrigger>
                <TabsTrigger value="completo">CSS completo</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <BotonCopiar text={tokens} label="Copiar tokens" />
                <BotonCopiar text={css} label="Copiar CSS completo" />
              </div>
            </div>
            <TabsContent value="tokens">
              <BloqueCodigo code={tokens} title="globals.css (tokens)" />
            </TabsContent>
            <TabsContent value="completo">
              <BloqueCodigo code={css} title="app/theme.css" />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Seccion>
  );
}

/**
 * Paso numerado de la instalación.
 *
 * @param n Número del paso.
 * @param title Título.
 * @param children Explicación y código.
 */
function Paso({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <li className="bg-card dark:bg-muted flex gap-4 rounded-3xl p-5">
      <span className="bg-frame flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold tabular-nums">{n}</span>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <p className="pt-1 text-sm font-semibold">{title}</p>
        {children}
      </div>
    </li>
  );
}

/**
 * Instalación: clonar la plantilla completa o pasar el tema y los componentes a un proyecto existente.
 */
export function SeccionInstalacion() {
  return (
    <Seccion id="instalacion" title="Instalación" description="Arranca un proyecto nuevo con la plantilla, o pasa el tema y los componentes a uno que ya tengas.">
      <ol className="bg-frame flex flex-col gap-3 rounded-4xl p-4">
        <Paso n={1} title="Proyecto nuevo: clona la plantilla y arranca">
          <BloqueCodigo title="terminal" code={`git clone ${REPOSITORIO} mi-app\ncd mi-app\nnpm install\nnpm run dev`} />
        </Paso>
        <Paso n={2} title="Proyecto existente (Next.js y Tailwind 4): instala las dependencias">
          <BloqueCodigo title="terminal" code={`npm install ${DEPENDENCIAS}`} />
        </Paso>
        <Paso n={3} title="Copia el tema e impórtalo una vez en el layout raíz">
          <p className="text-muted-foreground text-sm">
            Copia <code className="font-mono">app/theme.css</code> desde la sección <Link href="#tema" className="text-primary underline-offset-4 hover:underline">Tema</Link> y usa la fuente Plus Jakarta Sans.
          </p>
          <BloqueCodigo
            title="app/layout.tsx"
            code={`import { Plus_Jakarta_Sans } from 'next/font/google';
import './theme.css';

const jakarta = Plus_Jakarta_Sans({ variable: '--font-jakarta', subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}`}
          />
        </Paso>
        <Paso n={4} title="Copia los componentes que necesites">
          <p className="text-muted-foreground text-sm">
            Cada sección tiene su botón <strong className="text-foreground">Código</strong>, y el <Link href="#catalogo" className="text-primary underline-offset-4 hover:underline">catálogo</Link> trae todos los archivos.
            Empieza por <code className="font-mono">lib/utils.ts</code>, <code className="font-mono">components/icons</code> y <code className="font-mono">components/ui</code>; las composiciones de{' '}
            <code className="font-mono">components/kit</code> se apoyan en ellos.
          </p>
        </Paso>
      </ol>
    </Seccion>
  );
}

/** Títulos de los grupos del catálogo, por carpeta. */
const GRUPOS: [string, string][] = [
  ['app/_docs/ejemplos', 'Ejemplos (app/_docs/ejemplos)'],
  ['components/ui', 'Primitivos (components/ui)'],
  ['components/kit', 'Composiciones (components/kit)'],
  ['components/icons', 'Íconos (components/icons)'],
  ['components/brands', 'Logos (components/brands)'],
  ['hooks', 'Hooks'],
  ['lib', 'Utilidades'],
  ['app/theme.css', 'Tema'],
];

/**
 * Catálogo: todos los archivos de la plantilla agrupados por carpeta; cada uno abre su código para copiarlo.
 */
export function SeccionCatalogo() {
  const [ref, visto] = useVisto<HTMLDivElement>();
  const fuentes = useFuentes(visto);
  const rutas = fuentes ? Object.keys(fuentes) : [];

  return (
    <Seccion id="catalogo" title="Catálogo" description="Todos los archivos de la plantilla. Abre cualquiera para ver su código y copiarlo.">
      <div ref={ref} className="bg-frame flex flex-col gap-5 rounded-4xl p-5">
        {fuentes === false && <p className="text-destructive text-sm">No se pudo cargar el catálogo. Recarga la página.</p>}
        {fuentes === null && <p className="text-muted-foreground text-sm">Cargando el catálogo…</p>}
        {GRUPOS.map(([carpeta, titulo]) => {
          const archivos = rutas.filter((ruta) => ruta === carpeta || ruta.startsWith(`${carpeta}/`));

          return archivos.length === 0 ? null : (
            <div key={carpeta} className="flex flex-col gap-2">
              <p className="text-sm font-bold">
                {titulo} <span className="text-muted-foreground font-normal tabular-nums">{archivos.length}</span>
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                {archivos.map((ruta) => (
                  <BotonCodigo
                    key={ruta}
                    title={ruta}
                    files={[ruta]}
                    trigger={
                      <button
                        type="button"
                        className="bg-card dark:bg-muted hover:ring-primary/40 focus-visible:ring-ring/50 flex h-11.5 items-center gap-2 rounded-2xl px-3 text-left text-sm ring-1 ring-transparent transition-shadow outline-none focus-visible:ring-3"
                      >
                        <FileText className="size-4 shrink-0" />
                        <span className="truncate font-mono text-xs">{ruta.split('/').at(-1)}</span>
                      </button>
                    }
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Seccion>
  );
}

/**
 * Columna de enlaces del pie.
 *
 * @param title Título de la columna.
 * @param links Enlaces: texto, dirección y si es externo.
 */
function ColumnaPie({ title, links }: { title: string; links: { label: string; href: string; external?: boolean }[] }) {
  return (
    <nav aria-label={title} className="flex flex-col gap-3">
      <p className="text-sm font-bold">{title}</p>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 rounded-sm text-sm transition-colors outline-none focus-visible:ring-3"
            >
              {link.label}
              {link.external && <span className="sr-only"> (abre en otra pestaña)</span>}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Pie de la documentación: la marca con su descripción y la firma de Pagorium, columnas de enlaces a las
 * secciones y recursos, y la franja final con la licencia y el año.
 *
 * @param grupos Grupos de secciones de la documentación: título y enlaces `[id, título]`.
 */
export function PieDocumentacion({ grupos }: { grupos: Record<string, readonly (readonly [string, string])[]> }) {
  return (
    <footer className="bg-frame mt-6 rounded-t-4xl">
      <div className="mx-auto flex w-full max-w-app flex-col gap-10 px-4 pt-12 pb-8 md:px-6">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]">
          <div className="flex flex-col gap-4">
            <StarterKitLogo large />
            <p className="text-muted-foreground max-w-xs text-sm">
              Plantilla de código abierto para arrancar aplicaciones internas y de gestión con React, Next.js y Tailwind.
            </p>
            <MadeByPagorium />
          </div>
          {Object.entries(grupos)
            .slice(0, 2)
            .map(([grupo, enlaces]) => (
              <ColumnaPie key={grupo} title={grupo} links={enlaces.map(([id, titulo]) => ({ label: titulo, href: `#${id}` }))} />
            ))}
          <ColumnaPie
            title="Empezar"
            links={[
              { label: 'Instalación', href: '#instalacion' },
              { label: 'Tema', href: '#tema' },
              { label: 'Catálogo', href: '#catalogo' },
              { label: 'Inicio de sesión', href: '/ejemplos/acceso' },
              { label: 'Página de error', href: '/ejemplos/error' },
            ]}
          />
          <ColumnaPie
            title="Recursos"
            links={[
              { label: 'Repositorio', href: REPOSITORIO, external: true },
              { label: 'Licencia MIT', href: `${REPOSITORIO}/blob/main/LICENSE`, external: true },
              { label: 'Pagorium', href: 'https://pagorium.com', external: true },
              { label: 'shadcn/ui', href: 'https://ui.shadcn.com', external: true },
            ]}
          />
        </div>
        <div className="text-muted-foreground flex flex-col gap-2 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>© 2025-2026 Pagorium Technologies. Publicado con licencia MIT: úsalo, cámbialo y compártelo.</span>
          <span>Hecho con React, Next.js, Tailwind CSS y Radix.</span>
        </div>
      </div>
    </footer>
  );
}
