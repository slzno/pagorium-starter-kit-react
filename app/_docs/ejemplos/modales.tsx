'use client';

import { ChevronDown, Copy, Eye, House, Palette, Pencil, Printer, Search, Trash2 } from '@/components/icons';
import { FormField, RowActions, SearchableSelect, ThemePicker, Tour, TourPreview, TourPreviewLine } from '@/components/kit';
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
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { type ReactNode, useState } from 'react';
import { toast } from 'sonner';

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
 * Ventanas y menús: diálogo con formulario, confirmación, panel lateral, panel inferior, recorrido de
 * bienvenida, menú desplegable, acciones de fila, globo y ayuda emergente. Las notificaciones (`toast`)
 * necesitan un `<Toaster />` una vez en el layout (ver el ejemplo de Avisos).
 */
export default function EjemploModales() {
  const [recorrido, setRecorrido] = useState(false);
  const [notificar, setNotificar] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <Bloque title="Ventanas">
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
              icon: House,
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
              icon: Search,
              label: 'Búsqueda',
              title: 'Busca desde cualquier pantalla',
              description: 'Pulsa Ctrl + K o «/» y escribe un nombre o un número.',
              items: [
                { title: 'Por nombre', text: 'Cada palabra, en cualquier orden.' },
                { title: 'Por número', text: 'Documento o código.' },
              ],
            },
            { icon: Palette, label: 'Tema', title: 'Elige tu tema', description: 'Se guarda para la próxima vez.', content: <ThemePicker /> },
          ]}
        />
      </Bloque>

      <Bloque title="Menús, globos y ayudas">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Opciones <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Persona</DropdownMenuLabel>
            <DropdownMenuItem>
              <Pencil /> Editar <DropdownMenuShortcut>E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy /> Duplicar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={notificar} onCheckedChange={(v) => setNotificar(Boolean(v))}>
              Notificar cambios
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash2 /> Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <RowActions
          label="ALEX EJEMPLO UNO"
          actions={[
            { label: 'Ver ficha', icon: Eye, onSelect: () => toast('Ver ficha') },
            { label: 'Editar', icon: Pencil, onSelect: () => toast('Editar') },
            { label: 'Eliminar', icon: Trash2, destructive: true, onSelect: () => toast('Eliminar') },
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
                <Printer />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Imprimir</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Bloque>
    </div>
  );
}
