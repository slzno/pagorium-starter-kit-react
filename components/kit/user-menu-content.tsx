'use client';

import { type IconComponent, LogOut } from '@/components/icons';
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { type MarcoUser } from './types';
import { UserInfo } from './user-info';

/** Opción del menú del usuario: enlace (`href`) o acción (`onSelect`). */
export type UserMenuItem = {
  label: string;
  icon: IconComponent;
  href?: string;
  onSelect?: () => void;
};

/**
 * Contenido del menú del avatar: el usuario con su correo, las opciones (perfil, contraseña, apariencia…)
 * y, al final y separada, «Cerrar sesión» si se pasa `onLogout` o `logoutHref`.
 *
 * @param user Usuario.
 * @param items Opciones del menú.
 * @param onLogout Acción de cerrar sesión.
 * @param logoutHref Dirección de cierre de sesión (en lugar de `onLogout`).
 * @param logoutLabel Texto de la opción de salir.
 */
export function UserMenuContent({
  user,
  items = [],
  onLogout,
  logoutHref,
  logoutLabel = 'Cerrar sesión',
}: {
  user: MarcoUser;
  items?: UserMenuItem[];
  onLogout?: () => void;
  logoutHref?: string;
  logoutLabel?: string;
}) {
  return (
    <>
      {/* La etiqueta del menú va dentro de su grupo. */}
      <DropdownMenuGroup>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-3 px-1.5 py-2 text-left text-sm">
            <UserInfo user={user} showEmail />
          </div>
        </DropdownMenuLabel>
      </DropdownMenuGroup>
      {items.length > 0 && (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {items.map((item) =>
              item.href ? (
                <DropdownMenuItem key={item.label} asChild>
                  <Link className="flex w-full items-center gap-3 py-2" href={item.href}>
                    <item.icon className="size-5" />
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem key={item.label} className="gap-3 py-2" onSelect={item.onSelect}>
                  <item.icon className="size-5" />
                  {item.label}
                </DropdownMenuItem>
              ),
            )}
          </DropdownMenuGroup>
        </>
      )}
      {(onLogout || logoutHref) && (
        <>
          <DropdownMenuSeparator />
          {logoutHref ? (
            <DropdownMenuItem asChild>
              <Link className="flex w-full items-center gap-3 py-2" href={logoutHref} onClick={onLogout}>
                <LogOut className="size-5" />
                {logoutLabel}
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="gap-3 py-2" onSelect={onLogout}>
              <LogOut className="size-5" />
              {logoutLabel}
            </DropdownMenuItem>
          )}
        </>
      )}
    </>
  );
}
