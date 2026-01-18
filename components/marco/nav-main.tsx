'use client';

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isLinkActive, type NavLink } from './types';

/**
 * Menú principal de la barra lateral: un grupo con su etiqueta y los enlaces, con el activo marcado y
 * ayuda emergente cuando la barra está contraída.
 *
 * @param items Enlaces.
 * @param label Etiqueta del grupo.
 */
export function NavMain({ items = [], label = 'Menú' }: { items: NavLink[]; label?: string }) {
  const path = usePathname() ?? '';

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton isActive={isLinkActive(item, path)} tooltip={{ children: item.title }} asChild>
              <Link href={item.href}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
