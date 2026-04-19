import { AlertCircleIcon } from '@/components/icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

/**
 * Alerta destructiva con una lista de errores (sin repetidos) y un título.
 *
 * @param errors Mensajes de error.
 * @param title Título de la alerta (por omisión, «Algo salió mal.»).
 */
export function AlertError({ errors, title }: { errors: string[]; title?: string }) {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>{title || 'Algo salió mal.'}</AlertTitle>
      <AlertDescription>
        <ul className="list-inside list-disc text-sm">
          {Array.from(new Set(errors)).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
