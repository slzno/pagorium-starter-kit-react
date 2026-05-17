'use client';

import { MadeByPagorium, StarterKitLogo } from '@/components/brands';
import * as Icons from '@/components/icons';
import { illustrations } from '@/components/icons';
import {
  AppHeader,
  FormField,
  FormSection,
  InitialsAvatar,
  ListCard,
  PageHeader,
  PageSkeleton,
  QuickSearch,
  type QuickSearchFn,
  ReadField,
  ReadGrid,
  StatusBadge,
  UserMenuContent,
} from '@/components/kit';
import { Seccion, SeccionAvisos, SeccionBusqueda, SeccionCifras, SeccionControles, SeccionModales, SeccionNavegacion, SeccionPestanas } from './_docs/secciones';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { type ComponentType, useState } from 'react';

/** Secciones de la documentación, en orden. */
const SECCIONES = {
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
  ],
} as const;

/** Tokens de color que se muestran en la paleta. */
const TOKENS = ['background', 'frame', 'card', 'muted', 'field', 'border', 'primary', 'secondary', 'icon', 'destructive', 'foreground', 'muted-foreground'];

/** Filas de ejemplo para la tabla. */
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

/** Íconos de línea: las funciones exportadas, sin los alias `…Icon` de shadcn ni las ilustraciones. */
const ICONOS = Object.entries(Icons).filter(
  ([nombre, valor]) => typeof valor === 'function' && /^[A-Z]/.test(nombre) && !/Icon$/.test(nombre) && !(nombre in illustrations) && nombre !== 'CheckCircle2',
) as [string, ComponentType<{ className?: string }>][];

/**
 * Documentación de Pagorium Starter Kit React: la cabecera real del sistema y un ejemplo de cada pieza (paleta, botones,
 * campos, listas, fichas, formularios, esqueletos, íconos e ilustraciones).
 */
export default function Documentacion() {
  const [esqueleto, setEsqueleto] = useState<'list' | 'detail' | 'form'>('list');

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
          { title: 'Repositorio', href: 'https://github.com/pagorium/starter-kit-react', icon: Icons.ExternalLink, external: true },
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
          description="Sistema de diseño de código abierto de Pagorium: marco salvia, tarjetas blancas, íconos de línea y medidas parejas."
          actions={
            <>
              <Button variant="outline" asChild>
                <a href="#iconos">Ver íconos</a>
              </Button>
              <Button asChild>
                <a href="#listas">Empezar</a>
              </Button>
            </>
          }
        />

        <Seccion id="colores" title="Colores" description="Tokens de la paleta; cambian solos en oscuro y en el tema verde.">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {TOKENS.map((token) => (
              <div key={token} className="bg-frame flex flex-col gap-2 rounded-3xl p-3">
                <div className="ring-foreground/10 h-16 rounded-2xl ring-1" style={{ background: `var(--${token})` }} />
                <code className="text-xs">--{token}</code>
              </div>
            ))}
          </div>
        </Seccion>

        <Seccion id="botones" title="Botones" description="Todos miden 46 px; el principal va una sola vez por pantalla.">
          <div className="bg-frame flex flex-wrap items-center gap-3 rounded-4xl p-5">
            <Button>Guardar</Button>
            <Button variant="outline">Cancelar</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="ghost">Fantasma</Button>
            <Button variant="destructive">Eliminar</Button>
            <Button variant="link">Enlace</Button>
            <Button size="icon" variant="outline" aria-label="Editar">
              <Icons.Pencil />
            </Button>
            <Button disabled>Desactivado</Button>
          </div>
        </Seccion>

        <Seccion id="campos" title="Campos" description="Mismo alto que los botones, borde de 2 px y fondo propio de campo.">
          <div className="bg-frame grid gap-4 rounded-4xl p-5 sm:grid-cols-2 lg:grid-cols-4">
            <Input placeholder="Texto libre" />
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Elija una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Opción A</SelectItem>
                <SelectItem value="b">Opción B</SelectItem>
              </SelectContent>
            </Select>
            <NativeSelect defaultValue="">
              <option value="" disabled>
                Select nativo
              </option>
              <option>Uno</option>
              <option>Dos</option>
            </NativeSelect>
            <Input type="date" />
            <Textarea className="sm:col-span-2 lg:col-span-4" placeholder="Observaciones" />
          </div>
        </Seccion>

        <SeccionControles />

        <Seccion id="listas" title="Listas" description="Marco salvia con filas tarjeta; al pasar el mouse la fila se levanta.">
          <ListCard>
            <div className="flex items-center justify-between gap-3">
              <Input className="max-w-sm" placeholder="Buscar por nombre o documento…" />
              <StatusBadge tone="success">{PERSONAS.length} registros</StatusBadge>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N.º</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PERSONAS.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="tabular-nums">{p.id}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-3">
                        <InitialsAvatar name={p.nombre} className="size-7 text-[0.625rem]" />
                        {p.nombre}
                      </span>
                    </TableCell>
                    <TableCell className="tabular-nums">{p.documento}</TableCell>
                    <TableCell>
                      <StatusBadge tone={p.estado}>{p.etiqueta}</StatusBadge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ListCard>
        </Seccion>

        <Seccion id="fichas" title="Fichas" description="Pestañas segmentadas y datos de lectura en tarjetas blancas dentro del marco.">
          <Tabs defaultValue="datos" className="gap-4">
            <TabsList>
              <TabsTrigger value="datos">Datos</TabsTrigger>
              <TabsTrigger value="historial">Historial</TabsTrigger>
            </TabsList>
            <TabsContent value="datos">
              <FormSection title="Datos personales" description="Nombre, documento y contacto.">
                <ReadGrid>
                  <ReadField label="Primer nombre" value="Alex" />
                  <ReadField label="Apellidos" value="Ejemplo Uno" />
                  <ReadField label="Documento" value="DOC-0001" />
                  <ReadField label="Teléfono" value="0000-0000" />
                  <ReadField label="Correo" value={null} />
                </ReadGrid>
              </FormSection>
            </TabsContent>
            <TabsContent value="historial">
              <FormSection title="Historial" description="Quién creó y modificó el registro.">
                <ReadGrid>
                  <ReadField label="Creado por" value="Usuario de prueba" />
                  <ReadField label="Modificado por" value="Otro usuario de prueba" />
                </ReadGrid>
              </FormSection>
            </TabsContent>
          </Tabs>
        </Seccion>

        <Seccion id="formularios" title="Formularios" description="Secciones con título y ayuda, campos con etiqueta y error.">
          <FormSection title="Nueva persona" description="Los campos con asterisco son obligatorios.">
            <div className="bg-card grid gap-5 rounded-3xl p-5 sm:grid-cols-2">
              <FormField label="Nombre *" htmlFor="nombre">
                <Input id="nombre" placeholder="Nombre completo" />
              </FormField>
              <FormField label="Documento *" htmlFor="documento" error="El documento ya está registrado.">
                <Input id="documento" aria-invalid defaultValue="DOC-0001" />
              </FormField>
            </div>
          </FormSection>
        </Seccion>

        <Seccion id="esqueletos" title="Esqueletos" description="Uno por tipo de pantalla, para que la carga se parezca a lo que viene.">
          <div className="flex gap-2">
            {(['list', 'detail', 'form'] as const).map((tipo) => (
              <Button key={tipo} variant={esqueleto === tipo ? 'default' : 'outline'} onClick={() => setEsqueleto(tipo)}>
                {{ list: 'Lista', detail: 'Ficha', form: 'Formulario' }[tipo]}
              </Button>
            ))}
          </div>
          <div className="ring-foreground/10 rounded-4xl ring-1">
            <PageSkeleton kind={esqueleto} />
          </div>
        </Seccion>

        <SeccionNavegacion />

        <SeccionPestanas />

        <SeccionModales />

        <SeccionBusqueda />

        <SeccionAvisos />

        <SeccionCifras />

        <Seccion id="iconos" title="Íconos" description={`${ICONOS.length} íconos de línea de 1,4 con la pieza clave en el color primario; los nombres siguen a Lucide.`}>
          <div className="bg-frame grid grid-cols-3 gap-2 rounded-4xl p-4 sm:grid-cols-6 lg:grid-cols-10">
            {ICONOS.map(([nombre, Icono]) => (
              <div key={nombre} className="bg-card flex flex-col items-center gap-2 rounded-2xl px-2 py-4">
                <Icono className="size-7" />
                <span className="text-muted-foreground w-full truncate text-center text-[0.6875rem]">{nombre}</span>
              </div>
            ))}
          </div>
        </Seccion>

        <Seccion id="ilustraciones" title="Ilustraciones" description="Íconos duotono más grandes, para tarjetas y catálogos.">
          <div className="bg-frame grid grid-cols-3 gap-2 rounded-4xl p-4 sm:grid-cols-6 lg:grid-cols-10">
            {Object.entries(illustrations).map(([nombre, Ilustracion]) => (
              <div key={nombre} className="bg-card flex flex-col items-center gap-2 rounded-2xl px-2 py-4">
                <Ilustracion className="size-9" />
                <span className="text-muted-foreground w-full truncate text-center text-[0.6875rem]">{nombre}</span>
              </div>
            ))}
          </div>
        </Seccion>

        <footer className="text-muted-foreground flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm sm:flex-row">
          <span>Pagorium Starter Kit React, licencia MIT © 2026 Pagorium.</span>
          <MadeByPagorium />
        </footer>
      </main>
    </div>
  );
}
