import { Pencil } from '@/components/icons';
import { Button } from '@/components/ui/button';

/**
 * Botones: todas las variantes, uno solo de ícono y uno desactivado, dentro del marco salvia.
 */
export default function EjemploBotones() {
  return (
    <div className="bg-frame flex flex-wrap items-center gap-3 rounded-4xl p-5">
      <Button>Guardar</Button>
      <Button variant="outline">Cancelar</Button>
      <Button variant="secondary">Secundario</Button>
      <Button variant="ghost">Fantasma</Button>
      <Button variant="destructive">Eliminar</Button>
      <Button variant="link">Enlace</Button>
      <Button size="icon" variant="outline" aria-label="Editar">
        <Pencil />
      </Button>
      <Button disabled>Desactivado</Button>
    </div>
  );
}
