'use client';

import { ChevronsUpDown } from '@/components/icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { type ReactNode } from 'react';
import { type MarcoUser } from './types';
import { UserInfo } from './user-info';

/**
 * Usuario al pie de la barra lateral: avatar y nombre que abren su menú (por ejemplo, `UserMenuContent`).
 *
 * @param user Usuario.
 * @param menu Contenido del menú desplegable.
 */
export function NavUser({ user, menu }: { user: MarcoUser; menu: ReactNode }) {
  const { state, isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent">
              <UserInfo user={user} />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="end"
            side={isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom'}
          >
            {menu}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
