'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/** Tabla con contenedor desplazable en horizontal. */
function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn(
          'w-full caption-bottom text-sm [&_td:first-child]:pl-3 [&_td:last-child]:pr-3 [&_th:first-child]:pl-3 [&_th:last-child]:pr-3',
          className,
        )}
        {...props}
      />
    </div>
  );
}

/** Encabezado de la tabla. */
function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return <thead data-slot="table-header" className={cn('[&_tr]:hover:bg-transparent', className)} {...props} />;
}

/** Cuerpo de la tabla. */
function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return <tbody data-slot="table-body" className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}

/** Pie de la tabla. */
function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn('border-t bg-muted/50 font-medium [&_td]:text-foreground [&>tr]:last:border-b-0', className)}
      {...props}
    />
  );
}

/** Fila de la tabla. */
function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return <tr data-slot="table-row" className={cn(className)} {...props} />;
}

/** Celda de encabezado. */
function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'h-8 px-2 text-left align-middle text-xs font-semibold whitespace-nowrap text-muted-foreground [&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  );
}

/** Celda de la tabla. */
function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'p-2 align-middle font-normal text-foreground/80 whitespace-nowrap [&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  );
}

/** Leyenda de la tabla. */
function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return (
    <caption data-slot="table-caption" className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
  );
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
