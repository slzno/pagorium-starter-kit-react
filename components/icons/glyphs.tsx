import { leafRect, line } from './base';

/**
 * Marcas chicas con el lenguaje «línea de hoja» (trazo de 1,4, puntas redondas). Las estructurales
 * (chevrones, más, menos, X, menú…) van en un solo tono para no hacer ruido en campos y botones; las que
 * indican movimiento (descargar, subir, actualizar, enlace externo) llevan la flecha en el color primario.
 */

export const Check = line('Check', 'M5 12.6l4.4 4.4L19 7.2');
export const X = line('X', 'M6.5 6.5l11 11M17.5 6.5l-11 11');
export const Plus = line('Plus', 'M12 5v14M5 12h14');
export const Minus = line('Minus', 'M5 12h14');
export const ChevronDown = line('ChevronDown', 'M6.5 9.5l5.5 5.5 5.5-5.5');
export const ChevronUp = line('ChevronUp', 'M6.5 14.5L12 9l5.5 5.5');
export const ChevronLeft = line('ChevronLeft', 'M14.5 6.5L9 12l5.5 5.5');
export const ChevronRight = line('ChevronRight', 'M9.5 6.5L15 12l-5.5 5.5');
export const ChevronsUpDown = line('ChevronsUpDown', 'M8 9.5l4-4 4 4M8 14.5l4 4 4-4');
export const ArrowLeft = line('ArrowLeft', 'M8.5 12H19.5', 'M10 6.5L4.5 12l5.5 5.5');
export const MoveRight = line('MoveRight', 'M4 12h11.5', 'M14 6.5l5.5 5.5-5.5 5.5');
export const ArrowLeftRight = line('ArrowLeftRight', 'M8 8h11.5M4.5 16H16', 'M8 4.5L4.5 8 8 11.5M16 12.5l3.5 3.5-3.5 3.5');
export const ArrowRightLeft = line('ArrowRightLeft', 'M4.5 8H16M8 16h11.5', 'M16 4.5L19.5 8 16 11.5M8 12.5L4.5 16 8 19.5');
export const Circle = line('Circle', <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />);
export const LoaderCircle = line('LoaderCircle', 'M20.5 12A8.5 8.5 0 1 1 12 3.5');
export const Loader = line(
  'Loader',
  <>
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
      <path key={angle} d="M12 3.5v3" transform={`rotate(${angle} 12 12)`} opacity={0.3 + index * 0.1} />
    ))}
  </>,
);
export const MoreHorizontal = line(
  'MoreHorizontal',
  <g fill="currentColor" stroke="none">
    <circle cx="5.5" cy="12" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <circle cx="18.5" cy="12" r="1.6" />
  </g>,
);
export const Menu = line('Menu', 'M4 6.5h16M4 12h16M4 17.5h10');
export const ExternalLink = line('ExternalLink', 'M18.5 13.5v3a4 4 0 0 1-4 4H6.5A1 1 0 0 1 5.5 19.5V9.5a4 4 0 0 1 4-4h3', 'M11.5 12.5 19.5 4.5M14.5 4.5h5v5');
export const Hash = line('Hash', 'M10 4 8.5 20M15.5 4 14 20M4.5 9h15M4 15h15');
export const AtSign = line('AtSign', 'M15.6 9v4.2a2.6 2.6 0 0 0 5.2 0V12A8.8 8.8 0 1 0 17.4 19', <circle cx="12" cy="12" r="3.6" />);
export const Percent = line('Percent', 'M18.5 5.5l-13 13', <><circle cx="7" cy="7" r="2.3" /><circle cx="17" cy="17" r="2.3" /></>);
export const AlignLeft = line('AlignLeft', 'M4 6h16M4 10.5h10M4 15h16M4 19.5h7');
export const Undo2 = line('Undo2', 'M5 9h9.8a5.2 5.2 0 0 1 0 10.4H11', 'M8.5 5.5 5 9l3.5 3.5');
export const RotateCcw = line('RotateCcw', 'M4.8 12.5a7.2 7.2 0 1 0 2.4-5.4L5 9.2', 'M5 4.5v4.7h4.7');
export const RefreshCw = line('RefreshCw', 'M19 11a7.2 7.2 0 0 0-12.6-3.6L4.5 9.5M5 13a7.2 7.2 0 0 0 12.6 3.6l1.9-2.1', 'M4.5 4.8v4.7h4.7M19.5 19.2v-4.7h-4.7');
export const Download = line('Download', 'M4.5 15.5v1a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-1', 'M12 4v10.5M7.5 10l4.5 4.5 4.5-4.5');
export const Upload = line('Upload', 'M4.5 15.5v1a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-1', 'M12 14.5V4M7.5 8.5 12 4l4.5 4.5');
export const Link2 = line('Link2', 'M9.5 17H7.5a5 5 0 0 1 0-10h2M14.5 7h2a5 5 0 0 1 0 10h-2', 'M8.5 12h7');
export const SlidersHorizontal = line('SlidersHorizontal', 'M4 7h8M17 7h3M4 17h3M12 17h8', <><circle cx="14.5" cy="7" r="2.5" /><circle cx="9.5" cy="17" r="2.5" /></>);
export const PanelLeft = line('PanelLeft', <path d={leafRect(3.5, 4.5, 17, 15, 4, 1)} />, 'M9.5 4.5v15');
