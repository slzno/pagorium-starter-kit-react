'use client';

import * as Icons from '@/components/icons';
import {
  Breadcrumbs,
  DatePicker,
  DetailRow,
  DetailSection,
  FlashMessages,
  FloatingNotice,
  FormField,
  MetricSection,
  PaginatorLinks,
  PasswordInput,
  QuickSearch,
  type QuickSearchFn,
  ReadField,
  ReadGrid,
  RowActions,
  SearchableSelect,
  StatusBadge,
  ThemePicker,
  Tour,
  TourPreview,
  TourPreviewLine,
} from '@/components/kit';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/sonner';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import { type ReactNode, useState } from 'react';
import { toast } from 'sonner';

/**
 * Sección de la documentación: título, ayuda y contenido.
 *
 * @param id Ancla de la sección.
 * @param title Título.
 * @param description Ayuda bajo el título.
 * @param children Ejemplos.
 */
export function Seccion({ id, title, description, children }: { id: string; title: string; description: string; children: ReactNode }) {
  return (
    <section id={id} className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {children}
    </section>
  );
}

/**
 * Bloque de ejemplo dentro del marco salvia, con su nombre arriba.
 *
 * @param title Nombre del ejemplo.
 * @param children Ejemplo.
 */
function Ejemplo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-frame flex flex-col gap-3 rounded-4xl p-5">
      <p className="text-muted-foreground text-xs font-semibold">{title}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/** Personas de ejemplo para la búsqueda. */
const PERSONAS = ['ALEX EJEMPLO UNO', 'BRUNO EJEMPLO DOS', 'CAMILA EJEMPLO TRES', 'DARÍO EJEMPLO CUATRO'];

/**
 * Búsqueda de ejemplo: personas y documentos que coinciden con el texto.
 *
 * @param q Texto buscado.
 * @return Dos grupos de resultados.
 */
const buscar: QuickSearchFn = async (q) => {
  const texto = q.toUpperCase();
  const personas = PERSONAS.filter((p) => p.includes(texto));

  return [
    {
      heading: 'Personas',
      items: personas.map((p, i) => ({ id: `p${i}`, title: p, description: `N.º ${1042 - i}`, avatarName: p, onSelect: () => toast(`Abriste a ${p}`) })),
    },
    {
      heading: 'Documentos',
      items: personas.map((p, i) => ({
        id: `d${i}`,
        title: `Informe ${2600 + i}`,
        description: p,
        icon: Icons.FileText,
        badge: { tone: i % 2 ? 'warning' : 'success', label: i % 2 ? 'Pendiente' : 'Aprobado' },
        onSelect: () => toast(`Abriste el informe ${2600 + i}`),
      })),
    },
  ];
};

/**
 * Navegación: migas de pan, paginación y enlaces; la barra superior de esta página muestra el menú
 * sencillo, el menú grande, los accesos rápidos con contador y el menú del usuario.
 */
export function SeccionNavegacion() {
  const [pagina, setPagina] = useState(2);
  const enlaces = [
    { url: pagina > 1 ? String(pagina - 1) : null, label: '&laquo; Anterior', active: false },
    ...[1, 2, 3, 4, 5].map((n) => ({ url: String(n), label: String(n), active: n === pagina })),
    { url: pagina < 5 ? String(pagina + 1) : null, label: 'Siguiente &raquo;', active: false },
  ];

  return (
    <Seccion id="navegacion" title="Navegación" description="La barra de arriba es AppHeader: menú sencillo, menú grande por columnas, búsqueda, accesos con contador, tema y menú del usuario.">
      <Ejemplo title="Migas de pan">
        <Breadcrumbs
          breadcrumbs={[
            { title: 'Personas', href: '#navegacion' },
            { title: 'ALEX EJEMPLO UNO', href: '#navegacion' },
            { title: 'Editar', href: '#navegacion' },
          ]}
        />
      </Ejemplo>
      <Ejemplo title="Paginación">
        <PaginatorLinks links={enlaces} onNavigate={(url) => setPagina(Number(url))} />
      </Ejemplo>
      <Ejemplo title="Pantallas completas">
        <Button variant="outline" asChild>
          <Link href="/ejemplos/acceso">Inicio de sesión</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/ejemplos/error">Página no encontrada</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/ejemplos/cerrado">Sistema cerrado</Link>
        </Button>
      </Ejemplo>
    </Seccion>
  );
}

/**
 * Pestañas: segmentadas (la del sistema) y de línea, con contenido.
 */
export function SeccionPestanas() {
  return (
    <Seccion id="pestanas" title="Pestañas" description="Control segmentado con la activa en blanco; la variante de línea para secciones secundarias.">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="bg-frame rounded-4xl p-5">
          <Tabs defaultValue="datos" className="gap-4">
            <TabsList>
              <TabsTrigger value="datos">Datos</TabsTrigger>
              <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
              <TabsTrigger value="referencias">Referencias</TabsTrigger>
            </TabsList>
            <TabsContent value="datos">
              <ReadGrid>
                <ReadField label="Nombre" value="Alex" />
                <ReadField label="Documento" value="DOC-0001" />
                <ReadField label="Ciudad" value="Ciudad Ejemplo" />
              </ReadGrid>
            </TabsContent>
            <TabsContent value="proyectos">
              <p className="bg-card rounded-3xl p-5 text-sm">Participa en 2 proyectos activos.</p>
            </TabsContent>
            <TabsContent value="referencias">
              <p className="bg-card rounded-3xl p-5 text-sm">Sin referencias registradas.</p>
            </TabsContent>
          </Tabs>
        </div>
        <div className="bg-frame rounded-4xl p-5">
          <Tabs defaultValue="resumen" className="gap-4">
            <TabsList variant="line">
              <TabsTrigger value="resumen">Resumen</TabsTrigger>
              <TabsTrigger value="movimientos">Movimientos</TabsTrigger>
              <TabsTrigger value="notas">Notas</TabsTrigger>
            </TabsList>
            <TabsContent value="resumen">
              <p className="bg-card rounded-3xl p-5 text-sm">Variante de línea, para pestañas dentro de una tarjeta.</p>
            </TabsContent>
            <TabsContent value="movimientos">
              <p className="bg-card rounded-3xl p-5 text-sm">Sin movimientos este mes.</p>
            </TabsContent>
            <TabsContent value="notas">
              <p className="bg-card rounded-3xl p-5 text-sm">Sin notas.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Seccion>
  );
}

/**
 * Ventanas y capas: diálogo, confirmación, panel lateral, panel inferior, globo, ayuda emergente, menú de
 * acciones y recorrido de bienvenida.
 */
export function SeccionModales() {
  const [recorrido, setRecorrido] = useState(false);
  const [notificar, setNotificar] = useState(true);

  return (
    <Seccion id="modales" title="Ventanas y menús" description="Todas se cierran con Esc o fuera de ellas, salvo la confirmación y el recorrido obligatorio.">
      <Ejemplo title="Ventanas">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Nueva persona</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nueva persona</DialogTitle>
              <DialogDescription>Los campos con asterisco son obligatorios.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <FormField label="Nombre *" htmlFor="d-nombre">
                <Input id="d-nombre" placeholder="Nombre completo" />
              </FormField>
              <FormField label="Documento *" htmlFor="d-doc">
                <Input id="d-doc" placeholder="DOC-0000" />
              </FormField>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={() => toast.success('Persona guardada')}>Guardar</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Eliminar</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar a esta persona?</AlertDialogTitle>
              <AlertDialogDescription>Se borra con su historial y no se puede deshacer.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={() => toast('Persona eliminada')}>
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Panel lateral</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>Afinan la lista sin salir de la pantalla.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 px-4">
              <FormField label="Estado">
                <SearchableSelect options={[{ value: 'a', label: 'Activo' }, { value: 'c', label: 'Cerrado' }]} value="a" onValueChange={() => undefined} />
              </FormField>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Aplicar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Panel inferior</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Cambios publicados</DrawerTitle>
              <DrawerDescription>La versión 2.6 ya está disponible para el equipo.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button>Listo</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Button variant="secondary" onClick={() => setRecorrido(true)}>
          Recorrido de bienvenida
        </Button>
        <Tour
          open={recorrido}
          onOpenChange={setRecorrido}
          heading="Novedades"
          steps={[
            {
              icon: Icons.House,
              label: 'Bienvenida',
              title: 'Bienvenido a Pagorium Starter Kit React',
              description: 'Un recorrido corto por lo nuevo.',
              preview: (
                <TourPreview>
                  <TourPreviewLine className="w-2/3" />
                  <TourPreviewLine className="w-1/2" />
                </TourPreview>
              ),
            },
            {
              icon: Icons.Search,
              label: 'Búsqueda',
              title: 'Busca desde cualquier pantalla',
              description: 'Pulsa Ctrl + K o «/» y escribe un nombre o un número.',
              items: [
                { title: 'Por nombre', text: 'Cada palabra, en cualquier orden.' },
                { title: 'Por número', text: 'Documento o código.' },
              ],
            },
            { icon: Icons.Palette, label: 'Tema', title: 'Elige tu tema', description: 'Se guarda para la próxima vez.', content: <ThemePicker /> },
          ]}
        />
      </Ejemplo>

      <Ejemplo title="Menús, globos y ayudas">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Opciones <Icons.ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Persona</DropdownMenuLabel>
            <DropdownMenuItem>
              <Icons.Pencil /> Editar <DropdownMenuShortcut>E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icons.Copy /> Duplicar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={notificar} onCheckedChange={(v) => setNotificar(Boolean(v))}>
              Notificar cambios
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Icons.Trash2 /> Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <RowActions
          label="ALEX EJEMPLO UNO"
          actions={[
            { label: 'Ver ficha', icon: Icons.Eye, onSelect: () => toast('Ver ficha') },
            { label: 'Editar', icon: Icons.Pencil, onSelect: () => toast('Editar') },
            { label: 'Eliminar', icon: Icons.Trash2, destructive: true, onSelect: () => toast('Eliminar') },
          ]}
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Globo</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Tareas pendientes</PopoverTitle>
              <PopoverDescription>3 tareas vencen esta semana.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" aria-label="Imprimir">
                <Icons.Printer />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Imprimir</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Ejemplo>
    </Seccion>
  );
}

/**
 * Búsqueda: la búsqueda rápida (también en la barra, con Ctrl + K), el selector con búsqueda y la fecha.
 */
export function SeccionBusqueda() {
  const [estado, setEstado] = useState('');
  const [fecha, setFecha] = useState('');

  return (
    <Seccion id="busqueda" title="Búsqueda" description="La búsqueda rápida abre con Ctrl + K o «/»; prueba con «alex» o «ejemplo».">
      <div className="bg-frame grid gap-4 rounded-4xl p-5 sm:grid-cols-3">
        <FormField label="Búsqueda rápida">
          <QuickSearch search={buscar} placeholder="Buscar persona o documento" inputPlaceholder="Nombre o número" hints={[['Nombre', 'por ejemplo, alex'], ['Número', 'del documento']]} />
        </FormField>
        <FormField label="Selector con búsqueda">
          <SearchableSelect
            options={['Activo', 'Pendiente', 'Vencido', 'Cerrado'].map((e) => ({ value: e, label: e }))}
            value={estado}
            onValueChange={setEstado}
            placeholder="Elija un estado"
          />
        </FormField>
        <FormField label="Fecha">
          <DatePicker value={fecha} onChange={setFecha} />
        </FormField>
      </div>
    </Seccion>
  );
}

/**
 * Controles de formulario: casillas, interruptores, opciones, contraseña y acordeón.
 */
export function SeccionControles() {
  return (
    <Seccion id="controles" title="Controles" description="Casillas, interruptores, opciones, contraseña con ojo y acordeón.">
      <div className="bg-frame grid gap-4 rounded-4xl p-5 md:grid-cols-2">
        <div className="bg-card flex flex-col gap-4 rounded-3xl p-5">
          <Label className="flex items-center gap-3">
            <Checkbox defaultChecked /> Acepto los términos
          </Label>
          <Label className="flex items-center gap-3">
            <Switch defaultChecked /> Recibir notificaciones
          </Label>
          <RadioGroup defaultValue="lista" className="flex gap-5">
            {['Lista', 'Tarjetas', 'Tablero'].map((op) => (
              <Label key={op} className="flex items-center gap-2">
                <RadioGroupItem value={op.toLowerCase()} /> {op}
              </Label>
            ))}
          </RadioGroup>
          <FormField label="Contraseña" htmlFor="c-pass">
            <PasswordInput id="c-pass" defaultValue="secreto123" />
          </FormField>
        </div>
        <div className="bg-card rounded-3xl p-5">
          <Accordion type="single" collapsible defaultValue="a">
            <AccordionItem value="a">
              <AccordionTrigger>¿Qué es Pagorium Starter Kit React?</AccordionTrigger>
              <AccordionContent>El sistema de diseño de código abierto de Pagorium.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>¿Tiene modo oscuro?</AccordionTrigger>
              <AccordionContent>Sí: claro, oscuro y verde, con la misma jerarquía.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Seccion>
  );
}

/**
 * Avisos: alertas, mensajes de la acción, notificaciones emergentes y aviso flotante.
 */
export function SeccionAvisos() {
  const [aviso, setAviso] = useState(false);

  return (
    <Seccion id="avisos" title="Avisos" description="Alertas en línea, mensajes tras guardar, notificaciones emergentes y el aviso flotante minimizable.">
      <div className="bg-frame grid gap-4 rounded-4xl p-5 md:grid-cols-2">
        <Alert>
          <Icons.Info />
          <AlertTitle>Mantenimiento a las 5:00 p. m.</AlertTitle>
          <AlertDescription>Guarde sus cambios antes de esa hora.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <Icons.TriangleAlert />
          <AlertTitle>No se pudo guardar</AlertTitle>
          <AlertDescription>Revise los campos marcados.</AlertDescription>
        </Alert>
        <FlashMessages className="md:col-span-2" messages={{ success: 'Se guardaron los cambios.', warning: 'Hay 3 tareas que vencen esta semana.' }} />
      </div>
      <Ejemplo title="Emergentes">
        <Button variant="outline" onClick={() => toast.success('Se guardaron los cambios')}>
          Éxito
        </Button>
        <Button variant="outline" onClick={() => toast.error('No se pudo conectar')}>
          Error
        </Button>
        <Button variant="outline" onClick={() => toast('Informe enviado', { description: 'Al correo del equipo.' })}>
          Con detalle
        </Button>
        <Button variant="secondary" onClick={() => setAviso((v) => !v)}>
          {aviso ? 'Ocultar' : 'Mostrar'} aviso flotante
        </Button>
      </Ejemplo>
      <FloatingNotice
        visible={aviso}
        title="Pendientes de revisar"
        description="Complételos antes del cierre del día."
        icon={Icons.FileWarning}
        pillLabel="Pendientes"
        count={3}
        items={PERSONAS.slice(0, 3).map((p, i) => ({ id: 2600 + i, label: p }))}
        action={{ label: 'Ver todos', onClick: () => toast('Ver todos') }}
      />
      <Toaster position="bottom-left" />
    </Seccion>
  );
}

/**
 * Cifras y detalle: métricas del tablero y listas de detalle.
 */
export function SeccionCifras() {
  return (
    <Seccion id="cifras" title="Cifras y detalle" description="Métricas con su etiqueta y listas de detalle de dos columnas.">
      <div className="grid gap-4 lg:grid-cols-2">
        <MetricSection
          title="Hoy"
          metrics={[
            { key: 'cerradas', label: 'Tareas cerradas', value: '128' },
            { key: 'meta', label: 'Meta', value: '150' },
            { key: 'vencidas', label: 'Vencidas', value: '7', negative: true },
          ]}
        />
        <DetailSection title="Proyecto">
          <DetailRow label="Responsable">Usuario de prueba</DetailRow>
          <DetailRow label="Avance">72 %</DetailRow>
          <DetailRow label="Estado">
            <StatusBadge tone="success">En curso</StatusBadge>
          </DetailRow>
        </DetailSection>
      </div>
    </Seccion>
  );
}
