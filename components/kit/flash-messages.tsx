import { CircleAlert, CircleCheck, TriangleAlert } from '@/components/icons';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

/** Avisos de una acción: éxito, advertencia y error (`danger` o `error`). */
export type FlashMessagesData = {
  success?: string | null;
  warning?: string | null;
  danger?: string | null;
  error?: string | null;
};

/**
 * Muestra los avisos que deja una acción (guardar, eliminar…): éxito en verde, advertencia en ámbar y
 * error en rojo, cada uno con su ícono. Sin avisos no dibuja nada.
 *
 * @param messages Avisos a mostrar.
 * @param className Clases del contenedor.
 */
export function FlashMessages({ messages, className }: { messages?: FlashMessagesData | null; className?: string }) {
  const notices = [
    { text: messages?.success, icon: CircleCheck, style: 'border-primary/30 bg-primary/5 [&>svg]:text-primary' },
    { text: messages?.warning, icon: TriangleAlert, style: 'border-warning/40 bg-warning/5 [&>svg]:text-warning' },
    { text: messages?.danger ?? messages?.error, icon: CircleAlert, style: 'border-destructive/40 bg-destructive/5 [&>svg]:text-destructive' },
  ].filter((notice) => Boolean(notice.text));

  if (notices.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {notices.map(({ text, icon: Icon, style }) => (
        <Alert key={text} className={style}>
          <Icon className="size-4" />
          <AlertDescription>{text}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
