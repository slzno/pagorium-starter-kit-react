/**
 * Receta única de las tablas: encabezados de 13 px en gris semibold, sin franja (las filas son tarjetas
 * redondeadas separadas, ver `marco.css`); celdas de 15 px con filas de unos 46 px y cifras en peso medio.
 * Las páginas usan estas clases en `TableHead` y `TableCell` en lugar de repetir las suyas.
 */

/** Clases de un encabezado de columna. */
export const thClass = 'text-muted-foreground h-8 text-xs font-semibold';

/** Clases de una celda de texto. */
export const tdClass = 'text-foreground py-3 text-sm font-normal';

/** Clases de una celda secundaria (datos de apoyo, en gris). */
export const tdMutedClass = 'text-muted-foreground py-3 text-sm font-normal';

/** Clases de una celda con números (alineados por dígito). */
export const tdNumberClass = 'text-foreground py-3 text-sm font-medium tabular-nums';

/**
 * Total de un listado para el encabezado de página: la cifra con separador de miles y el sustantivo en
 * singular o plural («1 rol», «1.234 roles»).
 *
 * @param total Cantidad de registros.
 * @param singular Sustantivo para uno.
 * @param plural Sustantivo para varios o ninguno.
 * @param locale Configuración regional de la cifra.
 * @return El texto del total.
 */
export function countLabel(total: number, singular: string, plural: string, locale = 'es-NI'): string {
  return `${total.toLocaleString(locale)} ${total === 1 ? singular : plural}`;
}
