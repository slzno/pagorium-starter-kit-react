import { InitialsAvatar, ListCard, StatusBadge } from '@/components/kit';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

/** Filas de ejemplo (datos ficticios). */
const PERSONAS = [
  { id: 1042, nombre: 'ALEX EJEMPLO UNO', documento: 'DOC-0001', estado: 'success', etiqueta: 'Activo' },
  { id: 1041, nombre: 'BRUNO EJEMPLO DOS', documento: 'DOC-0002', estado: 'warning', etiqueta: 'Pendiente' },
  { id: 1040, nombre: 'CAMILA EJEMPLO TRES', documento: 'DOC-0003', estado: 'danger', etiqueta: 'Vencido' },
  { id: 1039, nombre: 'DARÍO EJEMPLO CUATRO', documento: 'DOC-0004', estado: 'neutral', etiqueta: 'Cerrado' },
] as const;

/**
 * Lista: marco salvia con búsqueda, contador y la tabla en filas tarjeta con avatar e insignia de estado.
 */
export default function EjemploListas() {
  return (
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
  );
}
