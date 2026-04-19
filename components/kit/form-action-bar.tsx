import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { type ReactNode } from 'react';

/**
 * Barra de acciones de un formulario de página, fija al pie de la pantalla: un aviso o resumen a la
 * izquierda y Cancelar y Guardar a la derecha. Va dentro del `<form>`, después del contenido, para que el
 * botón de guardar quede siempre a la vista.
 *
 * @param message Aviso a la izquierda (por ejemplo, «Hay cambios sin guardar.»).
 * @param summary Contenido a la izquierda en lugar del aviso (por ejemplo, un total calculado).
 * @param cancelHref A dónde vuelve «Cancelar».
 * @param onCancel Acción de «Cancelar» (en lugar de `cancelHref`); sin ninguno de los dos no se muestra.
 * @param cancelLabel Texto del botón de cancelar.
 * @param submitLabel Texto del botón de guardar.
 * @param processingLabel Texto del botón mientras se envía.
 * @param processing Se está enviando (deshabilita el botón y cambia su texto).
 * @param disabled Deshabilita el botón de guardar por otra razón.
 */
export function FormActionBar({
  message,
  summary,
  cancelHref,
  onCancel,
  cancelLabel = 'Cancelar',
  submitLabel,
  processingLabel = 'Guardando…',
  processing = false,
  disabled = false,
}: {
  message?: string;
  summary?: ReactNode;
  cancelHref?: string;
  onCancel?: () => void;
  cancelLabel?: string;
  submitLabel: string;
  processingLabel?: string;
  processing?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky bottom-0 z-10 border-t backdrop-blur">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 md:px-6">
        {summary ?? <p className="text-muted-foreground hidden text-sm sm:block">{message}</p>}
        <div className="ml-auto flex gap-2">
          {cancelHref ? (
            <Button variant="outline" asChild>
              <Link href={cancelHref}>{cancelLabel}</Link>
            </Button>
          ) : (
            onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                {cancelLabel}
              </Button>
            )
          )}
          <Button type="submit" className="min-w-32" disabled={processing || disabled}>
            {processing ? processingLabel : submitLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
