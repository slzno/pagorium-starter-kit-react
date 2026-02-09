'use client';

import { CircleCheck, type IconComponent, LeafMoon, LeafSun, LoaderCircle } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { type ReactNode, useState } from 'react';
import { useAppearance } from './use-appearance';

/** Paso del recorrido. */
export type TourStep = {
  icon: IconComponent;
  /** Nombre corto del paso en la lista lateral. */
  label: string;
  title: string;
  description: ReactNode;
  /** Vista previa esquemática del paso (ver `TourPreview`). */
  preview?: ReactNode;
  /** Mejoras o puntos del paso, en dos columnas. */
  items?: { title: string; text: string }[];
  /** Contenido extra al final del paso (por ejemplo, `ThemePicker`). */
  content?: ReactNode;
};

/** Props de `Tour`. */
export interface TourProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  steps: TourStep[];
  /** Título pequeño de la lista lateral de pasos. */
  heading?: string;
  /** Obligatorio: no se puede cerrar ni omitir, y solo se salta a pasos ya vistos. */
  required?: boolean;
  /** Se llama al terminar; si devuelve una promesa, la ventana se cierra cuando se cumple. */
  onFinish?: () => void | Promise<void>;
  /** Aviso al pie mientras el recorrido es obligatorio. */
  requiredHint?: string;
  /** Aviso si `onFinish` falla. */
  errorText?: string;
  startLabel?: string;
  nextLabel?: string;
  backLabel?: string;
  finishLabel?: string;
}

/**
 * Recorrido guiado en una ventana: una lista lateral de pasos con la píldora del activo que se desliza,
 * una barra de avance y, por paso, su ícono, título, descripción, una vista previa opcional, sus puntos
 * en dos columnas y contenido extra. El contenido entra del lado al que se avanza y las tarjetas aparecen
 * escalonadas (Motion; sin animación con «reducir movimiento»). Con `required`, no se puede cerrar ni
 * omitir hasta terminar.
 *
 * @param props Ver `TourProps`.
 */
export function Tour({ open, onOpenChange, required = false, ...props }: TourProps) {
  return (
    <MotionConfig reducedMotion="user" transition={{ type: 'spring', stiffness: 380, damping: 34 }}>
      <Dialog open={open} onOpenChange={(next) => !next && !required && onOpenChange(false)}>
        <DialogContent
          className="gap-0 overflow-hidden p-0 sm:max-w-4xl"
          showCloseButton={false}
          onEscapeKeyDown={(event) => required && event.preventDefault()}
          onPointerDownOutside={(event) => required && event.preventDefault()}
          onInteractOutside={(event) => required && event.preventDefault()}
        >
          {/* El cuerpo se monta al abrir, así cada apertura empieza en el primer paso. */}
          <TourBody required={required} onClose={() => onOpenChange(false)} {...props} />
        </DialogContent>
      </Dialog>
    </MotionConfig>
  );
}

/**
 * Contenido del recorrido con su estado (paso actual, sentido y paso más lejano alcanzado).
 *
 * @param props Props del recorrido y la función para cerrarlo.
 */
function TourBody({
  steps,
  heading,
  required,
  onFinish,
  onClose,
  requiredHint = 'Complete el recorrido para empezar.',
  errorText = 'No se pudo guardar. Revise su conexión e intente de nuevo.',
  startLabel = 'Ver lo nuevo',
  nextLabel = 'Continuar',
  backLabel = 'Atrás',
  finishLabel = 'Empezar',
}: Omit<TourProps, 'open' | 'onOpenChange'> & { required: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  // Sentido del último cambio de paso (1 hacia adelante, -1 hacia atrás) para la animación.
  const [direction, setDirection] = useState(1);
  // Paso más lejano al que llegó: mientras sea obligatorio, solo se puede saltar a pasos ya vistos.
  const [reached, setReached] = useState(required ? 0 : steps.length - 1);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const current = steps[step];
  const last = step === steps.length - 1;

  if (!current) {
    return null;
  }

  /**
   * Va a un paso y recuerda si se avanzó o se retrocedió, para que el contenido entre del lado correcto.
   *
   * @param target Índice del paso.
   */
  const goTo = (target: number): void => {
    setDirection(target >= step ? 1 : -1);
    setStep(target);
    setReached((max) => Math.max(max, target));
  };

  /**
   * Termina el recorrido: llama a `onFinish` y cierra; si devuelve una promesa, espera a que se cumpla y,
   * si falla, sigue abierto y avisa.
   */
  const finish = async (): Promise<void> => {
    setSaveError(false);

    try {
      const result = onFinish?.();

      if (result instanceof Promise) {
        setSaving(true);
        await result;
      }

      onClose();
    } catch {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid md:grid-cols-[13rem_minmax(0,1fr)]">
      <nav aria-label="Pasos del recorrido" className="bg-muted hidden flex-col gap-1 p-4 md:flex">
        {heading && <p className="text-muted-foreground px-2 pb-2 text-xs font-semibold">{heading}</p>}
        {steps.map((item, index) => (
          <button
            key={item.label}
            type="button"
            onClick={() => goTo(index)}
            disabled={index > reached}
            aria-current={index === step ? 'step' : undefined}
            className={cn(
              'focus-visible:ring-ring/50 relative flex items-center gap-2 rounded-full px-3 py-1.5 text-left text-sm outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50',
              index === step ? 'text-secondary-foreground font-semibold' : 'text-foreground/80 hover:bg-foreground/8',
            )}
          >
            {/* La píldora del paso activo se desliza de un paso a otro. */}
            {index === step && <motion.span layoutId="tour-active-step" className="bg-secondary absolute inset-0 rounded-full" aria-hidden="true" />}
            <motion.span
              key={index < step ? 'done' : 'pending'}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={cn(
                'relative flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold tabular-nums',
                index < step ? 'bg-primary text-primary-foreground' : index === step ? 'bg-primary/15' : 'bg-card',
              )}
            >
              {index < step ? '✓' : index + 1}
            </motion.span>
            <span className="relative">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="relative flex min-h-[32rem] flex-col gap-6 overflow-hidden p-6 sm:p-8">
        {/* Barra de avance arriba del contenido. */}
        <div className="bg-muted absolute inset-x-0 top-0 h-1" aria-hidden="true">
          <motion.div className="bg-primary h-full origin-left" initial={false} animate={{ scaleX: (step + 1) / steps.length }} />
        </div>

        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -32 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <motion.span initial={{ scale: 0.7, rotate: -12 }} animate={{ scale: 1, rotate: 0 }} className="bg-secondary flex size-12 shrink-0 items-center justify-center rounded-2xl">
                <current.icon className="size-7" />
              </motion.span>
              <span className="text-muted-foreground text-xs font-medium tabular-nums">
                Paso {step + 1} de {steps.length}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <DialogTitle className="text-[1.75rem] leading-tight font-extrabold tracking-tight">{current.title}</DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm leading-relaxed">{current.description}</DialogDescription>
            </div>

            {current.preview}

            {current.items && (
              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {current.items.map((item, index) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.06, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-0.5"
                  >
                    <span className="flex items-center gap-2 text-sm font-bold">
                      <CircleCheck className="text-primary size-4 shrink-0" />
                      {item.title}
                    </span>
                    <span className="text-muted-foreground text-sm">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            )}

            {current.content}
          </motion.div>
        </AnimatePresence>

        <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
          <span className="text-muted-foreground text-xs">
            {saveError ? (
              <span role="alert" className="text-destructive font-medium">
                {errorText}
              </span>
            ) : required ? (
              requiredHint
            ) : null}
          </span>
          <div className="flex gap-2">
            {step > 0 && (
              <Button type="button" variant="outline" onClick={() => goTo(step - 1)}>
                {backLabel}
              </Button>
            )}
            <Button type="button" disabled={saving} onClick={() => (last ? void finish() : goTo(step + 1))}>
              {saving && <LoaderCircle className="animate-spin motion-reduce:animate-none" />}
              {last ? finishLabel : step === 0 ? startLabel : nextLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Miniatura de un tema con los tokens `--preview-*` (fijos, no cambian con el tema activo).
 *
 * @param dark Si es el tema oscuro.
 */
function ThemeThumbnail({ dark }: { dark: boolean }) {
  const line = dark ? 'bg-(--preview-dark-line)' : 'bg-(--preview-light-line)';
  const muted = dark ? 'bg-(--preview-dark-muted)' : 'bg-(--preview-light-muted)';

  return (
    <div aria-hidden className={cn('flex h-32 flex-col gap-2 rounded-2xl p-3', dark ? 'bg-(--preview-dark-surface)' : 'bg-(--preview-light-surface)')}>
      <div className={cn('h-3 w-full rounded-full', line)} />
      <div className={cn('flex flex-1 items-end gap-1.5 rounded-xl p-2', muted)}>
        {[80, 55, 65, 40, 70].map((height, index) => (
          <span key={height} className="flex-1 rounded-t" style={{ height: `${height}%`, background: `var(--bar-${index + 1})` }} />
        ))}
      </div>
      <div className={cn('h-4 w-16 rounded-full', dark ? 'bg-(--preview-dark-accent)' : 'bg-(--preview-light-accent)')} />
    </div>
  );
}

/**
 * Selector de tema claro u oscuro con miniaturas, para un paso del recorrido o una página de ajustes. Se
 * aplica al instante (ver `useAppearance`); `onChange` sirve para guardarlo también en el servidor.
 *
 * @param onChange Se llama con el tema elegido después de aplicarlo.
 * @param error Aviso de error sobre las opciones (por ejemplo, si no se guardó).
 */
export function ThemePicker({ onChange, error }: { onChange?: (theme: 'light' | 'dark') => void; error?: ReactNode }) {
  const { resolved, updateAppearance } = useAppearance();
  const options = [
    { value: 'light', title: 'Claro', icon: LeafSun, dark: false },
    { value: 'dark', title: 'Oscuro', icon: LeafMoon, dark: true },
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      {error && (
        <p role="alert" className="bg-destructive/10 text-destructive rounded-2xl px-4 py-3 text-sm font-medium">
          {error}
        </p>
      )}
      <div role="radiogroup" aria-label="Tema" className="grid gap-4 sm:grid-cols-2">
        {options.map((option) => (
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            key={option.value}
            type="button"
            role="radio"
            aria-checked={resolved === option.value}
            onClick={() => {
              updateAppearance(option.value);
              onChange?.(option.value);
            }}
            className={cn(
              'focus-visible:ring-ring/50 flex flex-col gap-3 rounded-3xl border-2 p-3 text-left outline-none focus-visible:ring-3',
              resolved === option.value ? 'border-primary' : 'border-input hover:border-field-hover',
            )}
          >
            <ThemeThumbnail dark={option.dark} />
            <span className="flex items-center gap-2 px-1 text-sm font-bold">
              <option.icon className="size-5" />
              {option.title}
              {resolved === option.value && <CircleCheck className="text-primary ml-auto size-5" />}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/**
 * Marco de una vista previa esquemática del recorrido: superficie salvia con borde suave donde se dibuja
 * la pantalla con bloques (sin capturas).
 *
 * @param children Dibujo de la pantalla.
 * @param className Clases extra (alto, cuadrícula…).
 */
export function TourPreview({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div aria-hidden="true" className={cn('bg-frame ring-foreground/5 relative h-44 overflow-hidden rounded-3xl p-3 ring-1', className)}>
      {children}
    </div>
  );
}

/**
 * Bloque de texto falso (una barra redondeada) para las vistas previas.
 *
 * @param className Ancho, alto y color.
 */
export function TourPreviewLine({ className }: { className?: string }) {
  return <span className={cn('bg-foreground/12 block h-2 rounded-full', className)} />;
}
