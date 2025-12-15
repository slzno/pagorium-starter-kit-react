import { cn } from '@/lib/utils';
import { Loader2Icon } from '@/components/icons';

/** Indicador giratorio de carga. */
function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="Cargando"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
