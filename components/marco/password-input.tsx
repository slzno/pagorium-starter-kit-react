'use client';

import { Eye, EyeOff } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { type ComponentProps, type Ref, useState } from 'react';

/**
 * Campo de contraseña con un botón para mostrarla u ocultarla.
 *
 * @param className Clases del campo.
 * @param ref Referencia al `<input>`.
 * @param props Demás props del `<input>` (sin `type`).
 */
export function PasswordInput({ className, ref, ...props }: Omit<ComponentProps<'input'>, 'type'> & { ref?: Ref<HTMLInputElement> }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input type={showPassword ? 'text' : 'password'} className={cn('pr-10', className)} ref={ref} {...props} />
      <button
        type="button"
        onClick={() => setShowPassword((previous) => !previous)}
        className="text-muted-foreground hover:text-foreground focus-visible:ring-ring absolute inset-y-0 right-0 flex items-center rounded-r-md px-3 focus-visible:ring-[3px] focus-visible:outline-none"
        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        tabIndex={-1}
      >
        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}
