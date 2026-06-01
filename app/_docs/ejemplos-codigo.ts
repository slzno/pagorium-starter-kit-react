/**
 * Código de cada sección de la documentación: el ejemplo de uso en JSX y los archivos de la plantilla que
 * la forman. `Seccion` lo busca por su `id` y muestra el botón «Código».
 */
export const CODIGO: Record<string, { files: string[]; usage?: string }> = {
  colores: {
    files: ['app/theme.css'],
    usage: `/* Los colores son tokens: úsalos con las utilidades de Tailwind. */
<div className="bg-frame rounded-4xl p-5">
  <div className="bg-card text-card-foreground rounded-3xl p-5">Tarjeta dentro del marco</div>
</div>

<p className="text-primary">Texto en el color primario</p>
<span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1">Pastilla</span>`,
  },
  botones: {
    files: ['components/ui/button.tsx'],
    usage: `import { Button } from '@/components/ui/button';
import { Pencil } from '@/components/icons';

<Button>Guardar</Button>
<Button variant="outline">Cancelar</Button>
<Button variant="secondary">Secundario</Button>
<Button variant="destructive">Eliminar</Button>
<Button size="icon" variant="outline" aria-label="Editar">
  <Pencil />
</Button>`,
  },
  campos: {
    files: ['components/ui/input.tsx', 'components/ui/select.tsx', 'components/ui/native-select.tsx', 'components/ui/textarea.tsx'],
    usage: `import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

<Input placeholder="Texto libre" />

<Select>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Elija una opción" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Opción A</SelectItem>
    <SelectItem value="b">Opción B</SelectItem>
  </SelectContent>
</Select>`,
  },
  controles: {
    files: ['components/ui/checkbox.tsx', 'components/ui/switch.tsx', 'components/ui/radio-group.tsx', 'components/kit/password-input.tsx', 'components/ui/accordion.tsx'],
    usage: `import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/kit';

<Label className="flex items-center gap-3">
  <Checkbox defaultChecked /> Acepto los términos
</Label>
<Label className="flex items-center gap-3">
  <Switch defaultChecked /> Recibir notificaciones
</Label>
<PasswordInput id="clave" />`,
  },
  listas: {
    files: ['components/kit/list-card.tsx', 'components/ui/table.tsx', 'components/kit/initials-avatar.tsx', 'components/kit/status-badge.tsx'],
    usage: `import { InitialsAvatar, ListCard, StatusBadge } from '@/components/kit';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

<ListCard>
  <Input className="max-w-sm" placeholder="Buscar…" />
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Nombre</TableHead>
        <TableHead>Estado</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>
          <span className="flex items-center gap-3">
            <InitialsAvatar name="ALEX EJEMPLO UNO" className="size-7 text-[0.625rem]" />
            ALEX EJEMPLO UNO
          </span>
        </TableCell>
        <TableCell>
          <StatusBadge tone="success">Activo</StatusBadge>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</ListCard>`,
  },
  fichas: {
    files: ['components/ui/tabs.tsx', 'components/kit/form-section.tsx', 'components/kit/read-field.tsx'],
    usage: `import { FormSection, ReadField, ReadGrid } from '@/components/kit';

<FormSection title="Datos personales" description="Nombre, documento y contacto.">
  <ReadGrid>
    <ReadField label="Nombre" value="Alex" />
    <ReadField label="Documento" value="DOC-0001" />
    <ReadField label="Correo" value={null} />
  </ReadGrid>
</FormSection>`,
  },
  formularios: {
    files: ['components/kit/form-section.tsx', 'components/kit/form-field.tsx', 'components/kit/form-action-bar.tsx', 'components/ui/field.tsx'],
    usage: `import { FormActionBar, FormField, FormSection } from '@/components/kit';
import { Input } from '@/components/ui/input';

<form>
  <FormSection title="Nueva persona" description="Los campos con asterisco son obligatorios.">
    <div className="bg-card grid gap-5 rounded-3xl p-5 sm:grid-cols-2">
      <FormField label="Nombre *" htmlFor="nombre">
        <Input id="nombre" />
      </FormField>
      <FormField label="Documento *" htmlFor="doc" error="El documento ya está registrado.">
        <Input id="doc" aria-invalid />
      </FormField>
    </div>
  </FormSection>
  <FormActionBar submitLabel="Guardar" cancelHref="/personas" />
</form>`,
  },
  esqueletos: {
    files: ['components/kit/page-skeleton.tsx', 'components/kit/app-content.tsx', 'components/ui/skeleton.tsx'],
    usage: `import { AppContent, PageSkeleton, skeletonKind } from '@/components/kit';

// Esqueleto suelto:
<PageSkeleton kind="list" />   // también "detail" y "form"

// O dentro del contenido de la app, mientras navega:
<AppContent pending={cargando ? 'navigation' : null} skeleton={skeletonKind(destino)}>
  {children}
</AppContent>`,
  },
  navegacion: {
    files: ['components/kit/app-header.tsx', 'components/kit/types.ts', 'components/kit/breadcrumbs.tsx', 'components/kit/paginator-links.tsx', 'components/kit/user-menu-content.tsx'],
    usage: `import { StarterKitLogo } from '@/components/brands';
import { Inbox, Users } from '@/components/icons';
import { AppHeader, QuickSearch, UserMenuContent } from '@/components/kit';

<AppHeader
  brand={<StarterKitLogo />}
  nav={[
    { title: 'Inicio', href: '/' },
    { title: 'Personas', href: '/personas', icon: Users },
    {
      title: 'Administración',
      groups: [{ title: 'Equipo', items: [{ title: 'Usuarios', href: '/usuarios', icon: Users }] }],
    },
  ]}
  shortcuts={[{ title: 'Bandeja', href: '/bandeja', icon: Inbox, count: 3 }]}
  search={<QuickSearch search={buscar} />}
  user={{ name: 'Alex Ejemplo', email: 'demo@ejemplo.com' }}
  userMenu={<UserMenuContent user={usuario} onLogout={salir} />}
  breadcrumbs={[{ title: 'Personas', href: '/personas' }, { title: 'Detalle', href: '#' }]}
/>`,
  },
  pestanas: {
    files: ['components/ui/tabs.tsx'],
    usage: `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

<Tabs defaultValue="datos" className="gap-4">
  <TabsList>               {/* variant="line" para la de línea */}
    <TabsTrigger value="datos">Datos</TabsTrigger>
    <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
  </TabsList>
  <TabsContent value="datos">…</TabsContent>
  <TabsContent value="proyectos">…</TabsContent>
</Tabs>`,
  },
  modales: {
    files: ['components/ui/dialog.tsx', 'components/ui/alert-dialog.tsx', 'components/ui/sheet.tsx', 'components/ui/drawer.tsx', 'components/ui/dropdown-menu.tsx', 'components/kit/row-actions.tsx', 'components/ui/popover.tsx', 'components/ui/tooltip.tsx', 'components/kit/tour.tsx'],
    usage: `import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RowActions } from '@/components/kit';
import { Eye, Pencil, Trash2 } from '@/components/icons';

<Dialog>
  <DialogTrigger asChild>
    <Button>Nueva persona</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Nueva persona</DialogTitle>
      <DialogDescription>Los campos con asterisco son obligatorios.</DialogDescription>
    </DialogHeader>
    …
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <Button>Guardar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

<RowActions
  label="ALEX EJEMPLO UNO"
  actions={[
    { label: 'Ver', icon: Eye, href: '/personas/1' },
    { label: 'Editar', icon: Pencil, href: '/personas/1/editar' },
    { label: 'Eliminar', icon: Trash2, destructive: true, onSelect: eliminar },
  ]}
/>`,
  },
  busqueda: {
    files: ['components/kit/quick-search.tsx', 'components/kit/searchable-select.tsx', 'components/kit/date-picker.tsx', 'components/ui/command.tsx'],
    usage: `import { QuickSearch, type QuickSearchFn, SearchableSelect, DatePicker } from '@/components/kit';

const buscar: QuickSearchFn = async (q, signal) => {
  const respuesta = await fetch(\`/api/buscar?q=\${encodeURIComponent(q)}\`, { signal });
  const personas = await respuesta.json();

  return [{ heading: 'Personas', items: personas.map((p) => ({ id: String(p.id), title: p.nombre, avatarName: p.nombre, href: \`/personas/\${p.id}\` })) }];
};

<QuickSearch search={buscar} placeholder="Buscar persona" />   {/* también abre con Ctrl + K */}
<SearchableSelect options={[{ value: 'a', label: 'Activo' }]} value={estado} onValueChange={setEstado} />
<DatePicker value={fecha} onChange={setFecha} />`,
  },
  avisos: {
    files: ['components/ui/alert.tsx', 'components/kit/flash-messages.tsx', 'components/ui/sonner.tsx', 'components/kit/floating-notice.tsx'],
    usage: `import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Toaster } from '@/components/ui/sonner';
import { FlashMessages } from '@/components/kit';
import { Info } from '@/components/icons';
import { toast } from 'sonner';

<Alert>
  <Info />
  <AlertTitle>Mantenimiento a las 5:00 p. m.</AlertTitle>
  <AlertDescription>Guarde sus cambios antes de esa hora.</AlertDescription>
</Alert>

<FlashMessages messages={{ success: 'Se guardaron los cambios.' }} />

<Toaster />   {/* una vez en el layout */}
toast.success('Se guardaron los cambios');`,
  },
  cifras: {
    files: ['components/kit/metric-section.tsx', 'components/kit/detail-list.tsx'],
    usage: `import { DetailRow, DetailSection, MetricSection } from '@/components/kit';

<MetricSection
  title="Hoy"
  metrics={[
    { key: 'cerradas', label: 'Tareas cerradas', value: '128' },
    { key: 'vencidas', label: 'Vencidas', value: '7', negative: true },
  ]}
/>

<DetailSection title="Proyecto">
  <DetailRow label="Responsable">Usuario de prueba</DetailRow>
  <DetailRow label="Avance">72 %</DetailRow>
</DetailSection>`,
  },
  iconos: {
    files: ['components/icons/base.tsx', 'components/icons/index.ts', 'components/icons/glyphs.tsx', 'components/icons/actions.tsx', 'components/icons/people.tsx', 'components/icons/places.tsx', 'components/icons/records.tsx', 'components/icons/shortcuts.tsx'],
    usage: `import { Search, ShieldCheck } from '@/components/icons';
import { line } from '@/components/icons/base';

<Search className="size-5" />

// Un ícono propio con el mismo lenguaje: cuerpo en tinta y la pieza clave en el acento.
export const Inbox = line('Inbox', 'M4 13.5h4.5l1.5 2.5h4l1.5-2.5H20', 'M12 4v7M9 8l3 3 3-3');`,
  },
  ilustraciones: {
    files: ['components/icons/illustrations.tsx'],
    usage: `import { illustrations, Medal } from '@/components/icons';

<Medal className="size-9" />

// O por nombre, desde un catálogo:
const Ilustracion = illustrations['Medal'];
<Ilustracion className="size-9" />`,
  },
};
