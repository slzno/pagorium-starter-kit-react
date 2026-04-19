'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, parse } from 'date-fns';
import { es as esFns } from 'date-fns/locale';
import { useState } from 'react';
import { es } from 'react-day-picker/locale';

/**
 * Selector de fecha (botón con aspecto de campo, ventana emergente y calendario en español). Recibe y
 * devuelve la fecha como AAAA-MM-DD, armada en hora local para que no cambie de día por la zona horaria.
 *
 * @param props Identificador, valor, cambio, texto de ayuda, clases, deshabilitado y atributos ARIA.
 */
export function DatePicker({
  id,
  value,
  onChange,
  placeholder = 'Seleccione la fecha',
  className,
  disabled = false,
  'aria-invalid': ariaInvalid,
  'aria-label': ariaLabel,
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  'aria-invalid'?: boolean;
  'aria-label'?: string;
}) {
  const [open, setOpen] = useState(false);
  const date = value ? parse(value, 'yyyy-MM-dd', new Date()) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="field"
          disabled={disabled}
          aria-invalid={ariaInvalid}
          aria-label={ariaLabel}
          className={cn('w-full justify-start font-normal', !date && 'text-muted-foreground', className)}
        >
          {date ? format(date, "d 'de' MMMM 'de' yyyy", { locale: esFns }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          locale={es}
          captionLayout="dropdown"
          selected={date}
          defaultMonth={date}
          onSelect={(day) => {
            onChange(day ? format(day, 'yyyy-MM-dd') : '');
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
