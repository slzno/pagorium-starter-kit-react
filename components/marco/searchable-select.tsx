'use client';

import { CheckIcon, ChevronsUpDownIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useState } from 'react';

/** Opción de un `SearchableSelect`. */
export type SearchableOption = {
  value: string;
  label: string;
};

/**
 * Selector con búsqueda (combobox: ventana emergente con lista filtrable): el botón muestra la opción
 * elegida y la lista filtra mientras se escribe. Para listas largas (sucursales, personas, lugares…).
 *
 * @param props Identificador, opciones, valor, cambio, textos, clases, deshabilitado y atributos ARIA.
 */
export function SearchableSelect({
  id,
  options,
  value,
  onValueChange,
  placeholder = 'Seleccione…',
  searchPlaceholder = 'Buscar…',
  emptyText = 'Sin resultados.',
  className,
  disabled,
  'aria-invalid': ariaInvalid,
  'aria-label': ariaLabel,
}: {
  id?: string;
  options: SearchableOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  disabled?: boolean;
  'aria-invalid'?: boolean;
  'aria-label'?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value) ?? null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="field"
          role="combobox"
          aria-expanded={open}
          aria-invalid={ariaInvalid}
          aria-label={ariaLabel}
          disabled={disabled}
          className={cn('w-full justify-between px-3 font-normal', !selected && 'text-muted-foreground', className)}
        >
          <span className="truncate">{selected ? selected.label : placeholder}</span>
          <ChevronsUpDownIcon className="size-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      {/* Tan ancho como el campo o como la opción más larga, sin salirse de la pantalla. */}
      <PopoverContent align="start" className="w-auto max-w-(--radix-popover-content-available-width) min-w-(--radix-popover-trigger-width) p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={`${option.label} ${option.value}`}
                  onSelect={() => {
                    onValueChange(option.value);
                    setOpen(false);
                  }}
                >
                  <span className="whitespace-nowrap">{option.label}</span>
                  <CheckIcon className={cn('ml-auto size-4', option.value === value ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
