/**
 * Archivos de cada sección de la documentación: primero el ejemplo que se ve en «Vista previa»
 * (`app/_docs/ejemplos/<id>.tsx`, completo y listo para copiar) y luego los componentes que usa.
 * `Seccion` lo busca por su `id` y muestra las pestañas «Vista previa» y «Código».
 */
export const CODIGO: Record<string, { files: string[] }> = {
  colores: {
    files: ['app/_docs/ejemplos/colores.tsx', 'app/theme.css'],
  },
  botones: {
    files: ['app/_docs/ejemplos/botones.tsx', 'components/ui/button.tsx'],
  },
  campos: {
    files: ['app/_docs/ejemplos/campos.tsx', 'components/ui/input.tsx', 'components/ui/select.tsx', 'components/ui/native-select.tsx', 'components/ui/textarea.tsx'],
  },
  controles: {
    files: ['app/_docs/ejemplos/controles.tsx', 'components/ui/checkbox.tsx', 'components/ui/switch.tsx', 'components/ui/radio-group.tsx', 'components/kit/password-input.tsx', 'components/ui/accordion.tsx'],
  },
  listas: {
    files: ['app/_docs/ejemplos/listas.tsx', 'components/kit/list-card.tsx', 'components/ui/table.tsx', 'components/kit/initials-avatar.tsx', 'components/kit/status-badge.tsx'],
  },
  fichas: {
    files: ['app/_docs/ejemplos/fichas.tsx', 'components/ui/tabs.tsx', 'components/kit/form-section.tsx', 'components/kit/read-field.tsx'],
  },
  formularios: {
    files: ['app/_docs/ejemplos/formularios.tsx', 'components/kit/form-section.tsx', 'components/kit/form-field.tsx', 'components/kit/form-action-bar.tsx', 'components/ui/field.tsx'],
  },
  esqueletos: {
    files: ['app/_docs/ejemplos/esqueletos.tsx', 'components/kit/page-skeleton.tsx', 'components/kit/app-content.tsx', 'components/ui/skeleton.tsx'],
  },
  navegacion: {
    files: ['app/_docs/ejemplos/navegacion.tsx', 'components/kit/app-header.tsx', 'components/kit/types.ts', 'components/kit/breadcrumbs.tsx', 'components/kit/paginator-links.tsx', 'components/kit/user-menu-content.tsx'],
  },
  pestanas: {
    files: ['app/_docs/ejemplos/pestanas.tsx', 'components/ui/tabs.tsx'],
  },
  modales: {
    files: ['app/_docs/ejemplos/modales.tsx', 'components/ui/dialog.tsx', 'components/ui/alert-dialog.tsx', 'components/ui/sheet.tsx', 'components/ui/drawer.tsx', 'components/ui/dropdown-menu.tsx', 'components/kit/row-actions.tsx', 'components/ui/popover.tsx', 'components/ui/tooltip.tsx', 'components/kit/tour.tsx'],
  },
  busqueda: {
    files: ['app/_docs/ejemplos/busqueda.tsx', 'components/kit/quick-search.tsx', 'components/kit/searchable-select.tsx', 'components/kit/date-picker.tsx', 'components/ui/command.tsx'],
  },
  avisos: {
    files: ['app/_docs/ejemplos/avisos.tsx', 'components/ui/alert.tsx', 'components/kit/flash-messages.tsx', 'components/ui/sonner.tsx', 'components/kit/floating-notice.tsx'],
  },
  cifras: {
    files: ['app/_docs/ejemplos/cifras.tsx', 'components/kit/metric-section.tsx', 'components/kit/detail-list.tsx'],
  },
  iconos: {
    files: ['app/_docs/ejemplos/iconos.tsx', 'components/icons/base.tsx', 'components/icons/index.ts', 'components/icons/glyphs.tsx', 'components/icons/actions.tsx', 'components/icons/people.tsx', 'components/icons/places.tsx', 'components/icons/records.tsx', 'components/icons/shortcuts.tsx'],
  },
  ilustraciones: {
    files: ['app/_docs/ejemplos/ilustraciones.tsx', 'components/icons/illustrations.tsx'],
  },
};
