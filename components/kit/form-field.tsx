import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { type ReactNode } from 'react';

/**
 * Campo de formulario: `Field` con su etiqueta, el control, una ayuda opcional y el error de validación.
 * Con error, el `Field` se marca con `data-invalid` (el control debe llevar `aria-invalid`).
 *
 * @param label Etiqueta.
 * @param htmlFor Identificador del control.
 * @param help Ayuda bajo el control (se oculta si hay error).
 * @param error Mensaje de error.
 * @param className Clases del `Field`.
 * @param children Control.
 */
export function FormField({
  label,
  htmlFor,
  help,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  help?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Field data-invalid={error ? true : undefined} className={className}>
      <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
      {children}
      {help && !error && <FieldDescription>{help}</FieldDescription>}
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
