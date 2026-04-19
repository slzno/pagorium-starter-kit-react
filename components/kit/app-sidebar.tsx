import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Link from 'next/link';
import { type ReactNode } from 'react';
import { NavFooter } from './nav-footer';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { type MarcoUser, type NavLink } from './types';

/**
 * Barra lateral contraíble (marco con barra lateral): la marca arriba, el menú principal, los enlaces
 * secundarios al pie y el usuario con su menú.
 *
 * @param brand Logo o nombre (por ejemplo, `AppLogo`).
 * @param brandHref A dónde lleva la marca.
 * @param items Enlaces del menú principal.
 * @param label Etiqueta del menú principal.
 * @param footerItems Enlaces secundarios del pie.
 * @param user Usuario; sin él no se muestra el pie de usuario.
 * @param userMenu Contenido del menú del usuario.
 */
export function AppSidebar({
  brand,
  brandHref = '/',
  items,
  label,
  footerItems = [],
  user,
  userMenu,
}: {
  brand: ReactNode;
  brandHref?: string;
  items: NavLink[];
  label?: string;
  footerItems?: NavLink[];
  user?: MarcoUser;
  userMenu?: ReactNode;
}) {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={brandHref}>{brand}</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={items} label={label} />
      </SidebarContent>

      <SidebarFooter>
        {footerItems.length > 0 && <NavFooter items={footerItems} className="mt-auto" />}
        {user && <NavUser user={user} menu={userMenu} />}
      </SidebarFooter>
    </Sidebar>
  );
}
