import { type ReactNode } from 'react';

/**
 * Logo de la barra lateral: el ícono en un cuadro del color primario y el nombre de la aplicación al lado.
 *
 * @param icon Ícono o imagen del logo (por ejemplo, un SVG con `fill-current`).
 * @param name Nombre de la aplicación.
 */
export function AppLogo({ icon, name }: { icon?: ReactNode; name: string }) {
  return (
    <>
      {icon && (
        <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground [&>svg]:size-5">
          {icon}
        </div>
      )}
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-tight font-semibold">{name}</span>
      </div>
    </>
  );
}
