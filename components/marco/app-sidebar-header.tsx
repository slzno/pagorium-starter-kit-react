import { SidebarTrigger } from '@/components/ui/sidebar';
import { Breadcrumbs } from './breadcrumbs';
import { type BreadcrumbItem } from './types';

/**
 * Cabecera del contenido en el marco con barra lateral: el botón para contraer la barra y las migas de pan.
 *
 * @param breadcrumbs Migas de pan.
 */
export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItem[] }) {
  return (
    <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
    </header>
  );
}
