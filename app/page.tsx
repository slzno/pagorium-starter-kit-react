'use client';

import { StarterKitLogo } from '@/components/brands';
import * as Icons from '@/components/icons';
import { AppHeader, PageHeader, QuickSearch, type QuickSearchFn, UserMenuContent } from '@/components/kit';
import { Button } from '@/components/ui/button';
import { PieDocumentacion, SeccionCatalogo, SeccionInstalacion, SeccionTema } from './_docs/extra';
import { Seccion } from './_docs/secciones';
import EjemploColores from './_docs/ejemplos/colores';
import EjemploBotones from './_docs/ejemplos/botones';
import EjemploCampos from './_docs/ejemplos/campos';
import EjemploControles from './_docs/ejemplos/controles';
import EjemploListas from './_docs/ejemplos/listas';
import EjemploFichas from './_docs/ejemplos/fichas';
import EjemploFormularios from './_docs/ejemplos/formularios';
import EjemploEsqueletos from './_docs/ejemplos/esqueletos';
import EjemploNavegacion from './_docs/ejemplos/navegacion';
import EjemploPestanas from './_docs/ejemplos/pestanas';
import EjemploModales from './_docs/ejemplos/modales';
import EjemploBusqueda from './_docs/ejemplos/busqueda';
import EjemploAvisos from './_docs/ejemplos/avisos';
import EjemploCifras from './_docs/ejemplos/cifras';
import EjemploIconos from './_docs/ejemplos/iconos';
import EjemploIlustraciones from './_docs/ejemplos/ilustraciones';

/** Secciones de la documentación, en orden. */
const SECCIONES = {
  Empezar: [
    ['instalacion', 'Instalación'],
    ['tema', 'Tema'],
  ],
  Fundamentos: [
    ['colores', 'Colores'],
    ['botones', 'Botones'],
    ['campos', 'Campos'],
    ['controles', 'Controles'],
  ],
  Pantallas: [
    ['listas', 'Listas'],
    ['fichas', 'Fichas'],
    ['formularios', 'Formularios'],
    ['esqueletos', 'Esqueletos'],
  ],
  Interacción: [
    ['navegacion', 'Navegación'],
    ['pestanas', 'Pestañas'],
    ['modales', 'Ventanas y menús'],
    ['busqueda', 'Búsqueda'],
    ['avisos', 'Avisos'],
  ],
  Recursos: [
    ['cifras', 'Cifras y detalle'],
    ['iconos', 'Íconos'],
    ['ilustraciones', 'Ilustraciones'],
    ['catalogo', 'Catálogo'],
  ],
} as const;

/** Personas de ejemplo para la búsqueda de la barra (datos ficticios). */
const PERSONAS = [
  { id: 1042, nombre: 'ALEX EJEMPLO UNO', documento: 'DOC-0001', estado: 'success', etiqueta: 'Activo' },
  { id: 1041, nombre: 'BRUNO EJEMPLO DOS', documento: 'DOC-0002', estado: 'warning', etiqueta: 'Pendiente' },
  { id: 1040, nombre: 'CAMILA EJEMPLO TRES', documento: 'DOC-0003', estado: 'danger', etiqueta: 'Vencido' },
  { id: 1039, nombre: 'DARÍO EJEMPLO CUATRO', documento: 'DOC-0004', estado: 'neutral', etiqueta: 'Cerrado' },
] as const;

/**
 * Búsqueda de ejemplo sobre las filas de la tabla.
 *
 * @param q Texto buscado.
 * @return Un grupo con las personas que coinciden.
 */
const buscar: QuickSearchFn = async (q) => [
  {
    heading: 'Personas',
    items: PERSONAS.filter((p) => p.nombre.includes(q.toUpperCase()) || String(p.id).startsWith(q)).map((p) => ({
      id: String(p.id),
      title: p.nombre,
      description: `N.º ${p.id}, documento ${p.documento}`,
      avatarName: p.nombre,
      badge: { tone: p.estado, label: p.etiqueta },
      onSelect: () => undefined,
    })),
  },
];

/**
 * Documentación de Pagorium Starter Kit React: la cabecera real del sistema y un ejemplo de cada pieza (paleta, botones,
 * campos, listas, fichas, formularios, esqueletos, íconos e ilustraciones).
 */
export default function Documentacion() {
  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader
        brand={<StarterKitLogo />}
        brandLabel="Pagorium Starter Kit React"
        nav={[
          { title: 'Inicio', href: '/' },
          {
            title: 'Componentes',
            label: 'Lo más usado',
            items: [
              { title: 'Listas', href: '#listas', icon: Icons.ClipboardList },
              { title: 'Fichas', href: '#fichas', icon: Icons.IdCard },
              { title: 'Formularios', href: '#formularios', icon: Icons.Pencil },
              { title: 'Ventanas y menús', href: '#modales', icon: Icons.LayoutDashboard },
            ],
          },
          {
            title: 'Documentación',
            groups: Object.entries(SECCIONES).map(([grupo, enlaces]) => ({
              title: grupo,
              items: enlaces.map(([id, titulo]) => ({ title: titulo, href: `#${id}`, icon: Icons.FileText })),
            })),
          },
        ]}
        shortcuts={[
          { title: 'Avisos', href: '#avisos', icon: Icons.Inbox, count: 3 },
          { title: 'Íconos', href: '#iconos', icon: Icons.Palette },
          { title: 'Repositorio', href: 'https://github.com/slzno/pagorium-starter-kit-react', icon: Icons.ExternalLink, external: true },
          { title: 'Pagorium', href: 'https://pagorium.com', icon: Icons.Building2, external: true },
        ]}
        search={<QuickSearch search={buscar} placeholder="Buscar persona" inputPlaceholder="Nombre o número" />}
        user={{ name: 'Pagorium', email: 'demo@ejemplo.com' }}
        userMenu={
          <UserMenuContent
            user={{ name: 'Pagorium', email: 'demo@ejemplo.com' }}
            items={[
              { label: 'Editar mi perfil', icon: Icons.UserPen, href: '#formularios' },
              { label: 'Cambiar contraseña', icon: Icons.KeyRound, href: '#controles' },
            ]}
            onLogout={() => undefined}
          />
        }
        breadcrumbs={[
          { title: 'Pagorium Starter Kit React', href: '/' },
          { title: 'Documentación', href: '/' },
        ]}
      />

      <main className="mx-auto flex w-full max-w-app flex-col gap-14 px-4 py-8 md:px-6">
        <PageHeader
          title="Pagorium Starter Kit React"
          description="Plantilla de código abierto de Pagorium para arrancar aplicaciones con React: tema, componentes, íconos y pantallas listos para copiar."
          actions={
            <>
              <Button variant="outline" asChild>
                <a href="#tema">Copiar el tema</a>
              </Button>
              <Button asChild>
                <a href="#instalacion">Empezar</a>
              </Button>
            </>
          }
        />

        <SeccionInstalacion />

        <SeccionTema />

        <Seccion id="colores" title="Colores" description="Tokens de la paleta; cambian solos en oscuro y en el tema verde.">
          <EjemploColores />
        </Seccion>

        <Seccion id="botones" title="Botones" description="Todos miden 46 px; el principal va una sola vez por pantalla.">
          <EjemploBotones />
        </Seccion>

        <Seccion id="campos" title="Campos" description="Mismo alto que los botones, borde de 2 px y fondo propio de campo.">
          <EjemploCampos />
        </Seccion>

        <Seccion id="controles" title="Controles" description="Casillas, interruptores, opciones, contraseña con ojo y acordeón.">
          <EjemploControles />
        </Seccion>

        <Seccion id="listas" title="Listas" description="Marco salvia con filas tarjeta; al pasar el mouse la fila se levanta.">
          <EjemploListas />
        </Seccion>

        <Seccion id="fichas" title="Fichas" description="Pestañas segmentadas y datos de lectura en tarjetas blancas dentro del marco.">
          <EjemploFichas />
        </Seccion>

        <Seccion id="formularios" title="Formularios" description="Secciones con título y ayuda, campos con etiqueta y error.">
          <EjemploFormularios />
        </Seccion>

        <Seccion id="esqueletos" title="Esqueletos" description="Uno por tipo de pantalla, para que la carga se parezca a lo que viene.">
          <EjemploEsqueletos />
        </Seccion>

        <Seccion id="navegacion" title="Navegación" description="La barra de arriba es AppHeader: menú sencillo, menú grande por columnas, búsqueda, accesos con contador, tema y menú del usuario.">
          <EjemploNavegacion />
        </Seccion>

        <Seccion id="pestanas" title="Pestañas" description="Control segmentado con la activa en blanco; la variante de línea para secciones secundarias.">
          <EjemploPestanas />
        </Seccion>

        <Seccion id="modales" title="Ventanas y menús" description="Todas se cierran con Esc o fuera de ellas, salvo la confirmación y el recorrido obligatorio.">
          <EjemploModales />
        </Seccion>

        <Seccion id="busqueda" title="Búsqueda" description="La búsqueda rápida abre con Ctrl + K o «/»; prueba con «alex» o «ejemplo».">
          <EjemploBusqueda />
        </Seccion>

        <Seccion id="avisos" title="Avisos" description="Alertas en línea, mensajes tras guardar, notificaciones emergentes y el aviso flotante minimizable.">
          <EjemploAvisos />
        </Seccion>

        <Seccion id="cifras" title="Cifras y detalle" description="Métricas con su etiqueta y listas de detalle de dos columnas.">
          <EjemploCifras />
        </Seccion>

        <Seccion id="iconos" title="Íconos" description="Íconos de línea de 1,4 con la pieza clave en el color primario; los nombres siguen a Lucide.">
          <EjemploIconos />
        </Seccion>

        <Seccion id="ilustraciones" title="Ilustraciones" description="Íconos duotono más grandes, para tarjetas y catálogos.">
          <EjemploIlustraciones />
        </Seccion>

        <SeccionCatalogo />
      </main>

      <PieDocumentacion grupos={{ Fundamentos: SECCIONES.Fundamentos, Interacción: SECCIONES.Interacción }} />
    </div>
  );
}
