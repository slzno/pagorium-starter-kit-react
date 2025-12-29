import { leafStroke, line } from './base';

/**
 * Íconos propios de los accesos rápidos de la barra superior y del cambio de tema, con el lenguaje «línea
 * de hoja»: contorno de 1,4 en tinta y la pieza clave en el color primario, casi siempre una hoja de
 * Marco, para que se distingan de los íconos genéricos y se lean claros a 22 px.
 */

// Anulaciones: recibo de borde dentado en tinta y el sello de anulado (círculo tachado) en el acento.
export const NulledReceipt = line(
  'NulledReceipt',
  'M11.6 20.6 10.1 19.5 8.6 20.6 7.1 19.5 5 20.7V7a4 4 0 0 1 4-4h7.5a1 1 0 0 1 1 1v7M8.5 8h5.5M8.5 11.5h3.5',
  <><circle cx="17" cy="17" r="4" /><path d="M14.2 14.2l5.6 5.6" /></>,
);

// Transferencias: dos trazos opuestos que salen de un punto (la cuenta de origen) y terminan en punta del acento.
export const LeafTransfer = line(
  'LeafTransfer',
  <><circle cx="4.6" cy="7.5" r="1.4" /><circle cx="19.4" cy="16.5" r="1.4" /><path d="M7 7.5h11.5M17 16.5H5.5" /></>,
  'M15.5 4 19 7.5 15.5 11M8.5 13 5 16.5 8.5 20',
);

// Solicitudes: bandeja de entrada en tinta con una hoja del acento que cae dentro.
export const RequestStack = line(
  'RequestStack',
  'M8.5 7.3H7.4a1.5 1.5 0 0 0-1.4.9L3.5 13.5v4a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-4L18 8.2a1.5 1.5 0 0 0-1.4-.9h-1.1M3.5 13.5h4.5l1.5 2.5h5l1.5-2.5h4.5',
  leafStroke(12, 3.2, 7, 180),
);

// Exportaciones: hoja de reporte en tinta de la que sale una flecha del acento con punta de hoja.
export const SheetExport = line(
  'SheetExport',
  'M15.5 11.5V4a1 1 0 0 0-1-1h-7a4 4 0 0 0-4 4v13a1 1 0 0 0 1 1h7a4 4 0 0 0 4-3.5M7 8h5M7 11h3',
  <><path d="M9.5 14.5h5.5" /><path d={leafStroke(15, 14.5, 5.6, 90)} /></>,
);

// Tema claro: sol de disco en tinta con cuatro rayos de hoja y cuatro rayos cortos en el acento.
export const LeafSun = line(
  'LeafSun',
  <circle cx="12" cy="12" r="4" />,
  <>
    {[0, 90, 180, 270].map((angle) => (
      <path key={angle} d={leafStroke(12 + 6.2 * Math.sin((angle * Math.PI) / 180), 12 - 6.2 * Math.cos((angle * Math.PI) / 180), 3, angle)} />
    ))}
    <path d="M17.1 6.9l.9-.9M17.1 17.1l.9.9M6.9 17.1l-.9.9M6.9 6.9 6 6" />
  </>,
);

// Tema oscuro: luna creciente en tinta con una hoja del acento como estrella.
export const LeafMoon = line(
  'LeafMoon',
  'M20 14.5A8.2 8.2 0 1 1 9.5 4a6.6 6.6 0 0 0 10.5 10.5z',
  leafStroke(16.8, 10, 5.2, 30),
);
