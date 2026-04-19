import { SidebarProvider } from '@/components/ui/sidebar';
import { type ReactNode } from 'react';

/**
 * Envoltorio de toda la aplicación: columna de pantalla completa con la barra superior, o el proveedor de
 * la barra lateral.
 *
 * @param children Cabecera y contenido.
 * @param variant Marco con barra superior o con barra lateral.
 * @param defaultOpen Si la barra lateral empieza abierta.
 */
export function AppShell({ children, variant = 'header', defaultOpen = true }: { children: ReactNode; variant?: 'header' | 'sidebar'; defaultOpen?: boolean }) {
  if (variant === 'header') {
    return <div className="flex min-h-screen w-full flex-col">{children}</div>;
  }

  return <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>;
}
