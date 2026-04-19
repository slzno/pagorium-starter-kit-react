import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { type ComponentPropsWithoutRef } from 'react';
import { type NavLink } from './types';

/**
 * Enlaces secundarios al pie de la barra lateral (documentación, sitios externos…), que abren en otra
 * pestaña.
 *
 * @param items Enlaces.
 * @param className Clases adicionales del grupo.
 */
export function NavFooter({ items, className, ...props }: ComponentPropsWithoutRef<typeof SidebarGroup> & { items: NavLink[] }) {
  return (
    <SidebarGroup {...props} className={cn('group-data-[collapsible=icon]:p-0', className)}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100" asChild>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.icon && <item.icon className="h-5 w-5" />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
