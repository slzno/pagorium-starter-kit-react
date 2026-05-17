'use client';

import { ShieldCheck } from '@/components/icons';
import { MadeByPagorium, StarterKitLogo } from '@/components/brands';
import { BrandPanel, FormField, PasswordInput } from '@/components/kit';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

/**
 * Ejemplo de inicio de sesión en dos paneles: la marca con saludo, fecha y recordatorios a la izquierda, y
 * el formulario en una tarjeta a la derecha.
 */
export default function EjemploAcceso() {
  return (
    <div className="bg-background grid min-h-svh lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <BrandPanel brand={<StarterKitLogo large className="text-white" />} footer={<MadeByPagorium onDark />} name="Alex" highlight={{ label: 'Tareas para hoy', value: '12' }} />

      <main className="relative flex items-center justify-center overflow-hidden px-4 py-10 sm:px-8">
        <div className="bg-primary/10 absolute top-1/2 left-1/2 size-[40rem] -translate-1/2 rounded-full blur-3xl" aria-hidden="true" />
        <div className="relative flex w-full max-w-md flex-col gap-8">
          <StarterKitLogo />
          <div className="flex flex-col gap-3">
            <span className="bg-secondary text-secondary-foreground inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
              <ShieldCheck className="size-4 [--icon:currentColor]" />
              Acceso solo para personal autorizado
            </span>
            <h1 className="text-[2.5rem] leading-tight font-extrabold tracking-tight">Inicia sesión</h1>
            <p className="text-muted-foreground text-sm">Usa tu usuario y contraseña del sistema.</p>
          </div>

          <form className="bg-card ring-foreground/5 flex flex-col gap-5 rounded-4xl p-8 shadow-xl ring-1 dark:ring-foreground/10" onSubmit={(e) => e.preventDefault()}>
            <FormField label="Usuario" htmlFor="usuario">
              <Input id="usuario" autoComplete="username" placeholder="usuario.demo" />
            </FormField>
            <FormField label="Contraseña" htmlFor="clave">
              <PasswordInput id="clave" autoComplete="current-password" />
            </FormField>
            <Label className="flex items-center gap-3">
              <Checkbox /> Recordarme
            </Label>
            <Button type="submit" className="w-full text-base font-bold">
              Entrar
            </Button>
            <Link href="/" className="text-muted-foreground text-center text-sm underline-offset-4 hover:underline">
              Volver a la documentación
            </Link>
          </form>
          <MadeByPagorium className="self-center" />
        </div>
      </main>
    </div>
  );
}
