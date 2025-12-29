import { leafRect, leafStroke, line } from './base';

/**
 * Acciones y avisos con el lenguaje «línea de hoja»: trazo de 1,4 en la tinta del ícono y la
 * pieza que dice qué hace (el lápiz, la X, la señal, la pupila…) en el color primario.
 */

const RING = <circle cx="12" cy="12" r="8.5" />;

// Editar: cuerpo del lápiz en tinta y la punta en el acento.
export const Pencil = line('Pencil', 'M7.6 12.4 16 4a2.1 2.1 0 0 1 3 0l1 1a2.1 2.1 0 0 1 0 3l-8.4 8.4M14 6l4 4', 'M6.4 13.6 5 15l-1 5 5-1 1.4-1.4');

// Eliminar: tapa y cuerpo de la papelera en tinta, las rayas en el acento.
export const Trash2 = line(
  'Trash2',
  'M4 6.5h16M9 6.5V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v1.5M6 6.5l.9 12.1a2 2 0 0 0 2 1.9h6.2a2 2 0 0 0 2-1.9L18 6.5',
  'M10 10.5v6M14 10.5v6',
);

// Buscar: el aro abierto en tinta; el cuarto superior derecho y el mango en el acento.
export const Search = line('Search', 'M10.5 3.5a7 7 0 1 0 7 7', 'M17.5 10.5a7 7 0 0 0-7-7M15.6 15.6 20.5 20.5');

// Sin resultados: lupa en tinta con la X del acento dentro.
export const SearchX = line(
  'SearchX',
  <>
    <circle cx="10.5" cy="10.5" r="7" />
    <path d="M15.6 15.6 20.5 20.5" />
  </>,
  'M8.3 8.3l4.4 4.4M12.7 8.3l-4.4 4.4',
);

// Ver: ojo en tinta con la pupila del acento.
export const Eye = line('Eye', 'M2.5 12C5 7.5 8.3 5.5 12 5.5s7 2 9.5 6.5c-2.5 4.5-5.8 6.5-9.5 6.5S5 16.5 2.5 12z', <circle cx="12" cy="12" r="3" />);

// Ocultar: ojo en tinta, cortado donde lo cruza la barra del acento.
export const EyeOff = line(
  'EyeOff',
  'M5.3 8.7C4.3 9.6 3.4 10.7 2.5 12c2.5 4.5 5.8 6.5 9.5 6.5 1.4 0 2.8-.3 4-.8M9.5 5.8c.8-.2 1.7-.3 2.5-.3 3.7 0 7 2 9.5 6.5-.7 1.3-1.5 2.4-2.4 3.4M12.8 14.9A3 3 0 0 1 9.1 11.2M11.2 9.1a3 3 0 0 1 3.7 3.7',
  'M4 4l16 16',
);

// Copiar: la hoja de atrás asomada y la de adelante con la hoja de Marco en el acento.
export const Copy = line(
  'Copy',
  <>
    <path d={leafRect(8.5, 8.5, 12, 12, 4, 1)} />
    <path d="M15.5 5.5v-1a1 1 0 0 0-1-1h-7a4 4 0 0 0-4 4v7a1 1 0 0 0 1 1h1" />
  </>,
  leafStroke(12.8, 16.8, 4.4, 40),
);

// Imprimir: impresora en tinta y la hoja impresa que sale en el acento.
export const Printer = line(
  'Printer',
  'M7 8.5v-4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4M6.5 17.5H6a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3h-.5M7 11.8h.01',
  <rect x="7.5" y="14" width="9" height="6.5" rx="1" />,
);

// Enviar: avión de papel en tinta con el doblez en el acento.
export const Send = line('Send', 'M20.5 3.5 3.5 10.6l6.8 3.1 3.1 6.8z', 'M20.5 3.5 10.3 13.7');

// Ajustes: dos rieles en tinta y las perillas en el acento.
export const Settings2 = line(
  'Settings2',
  'M12 7.5h8.5M3.5 16.5H12',
  <>
    <circle cx="7.5" cy="7.5" r="2.8" />
    <circle cx="16.5" cy="16.5" r="2.8" />
  </>,
);

// Tema: paleta en tinta con los toques de color en el acento.
export const Palette = line(
  'Palette',
  'M12 3.5a8.5 8.5 0 0 0 0 17c1.3 0 1.9-.9 1.5-2.1-.4-1.2.3-2.2 1.5-2.2H17a3.5 3.5 0 0 0 3.5-3.5c0-5.2-3.8-9.2-8.5-9.2z',
  'M7.8 12.3h.01M9.2 8.2h.01M13.6 7.6h.01M16.6 10.4h.01',
);

// Errores: insecto con cuerpo y patas en tinta; la cabeza y las antenas en el acento.
export const Bug = line(
  'Bug',
  'M8 11.5a4 4 0 0 1 8 0V16a4 4 0 0 1-8 0zM12 12.5v7M4.5 9.5l3.3 1.6M19.5 9.5l-3.3 1.6M3.5 14.5H8M16 14.5h4.5M4.5 19.5l3.6-2M19.5 19.5l-3.6-2',
  'M9.2 6.8a2.8 2.8 0 0 1 5.6 0M9.6 3l1 1.4M14.4 3l-1 1.4',
);

// Rápido: rayo en tinta con la hoja de Marco en el acento.
export const Zap = line('Zap', 'M12.5 3 4.5 13h6.5l-1 8 8-10h-6.5z', leafStroke(16.8, 8, 4.4, 35));

// Fórmula: cuadro de hoja en tinta con la «f» en el acento.
export const SquareFunction = line(
  'SquareFunction',
  <path d={leafRect(3.5, 3.5, 17, 17, 4, 1)} />,
  'M14.8 7.5h-.6a2.2 2.2 0 0 0-2.2 2.2v5.6a2.2 2.2 0 0 1-2.2 2.2h-.6M9.2 12h5.4',
);

// Calculadora: cuerpo y teclas en tinta, la pantalla en el acento.
export const Calculator = line(
  'Calculator',
  <>
    <path d={leafRect(4.5, 2.5, 15, 19, 4, 1)} />
    <path d="M8.5 14h.01M12 14h.01M15.5 14h.01M8.5 17.5h.01M12 17.5h.01M15.5 17.5h.01" />
  </>,
  <rect x="8" y="6" width="8" height="4" rx="1" />,
);

// Advertencia: triángulo en tinta con la señal en el acento.
export const TriangleAlert = line(
  'TriangleAlert',
  'M10.3 4.4 3.1 17a2.2 2.2 0 0 0 1.9 3.3h14a2.2 2.2 0 0 0 1.9-3.3L13.7 4.4a2 2 0 0 0-3.4 0z',
  'M12 9.5v4M12 16.8h.01',
);

// Alerta: círculo en tinta con la señal en el acento.
export const CircleAlert = line('CircleAlert', RING, 'M12 7.8v4.8M12 16.2h.01');

// Correcto: círculo en tinta con el visto en el acento.
export const CircleCheck = line('CircleCheck', RING, 'M8.2 12.2l2.6 2.6 5-5.2');

// Error: círculo en tinta con el aspa en el acento.
export const XCircle = line('XCircle', RING, 'M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6');

// Error grave: octágono en tinta con el aspa en el acento.
export const OctagonX = line('OctagonX', 'M8.5 3.5h7l5 5v7l-5 5h-7l-5-5v-7z', 'M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6');

// Información: círculo en tinta con la «i» en el acento.
export const Info = line('Info', RING, 'M12 11v5.2M12 7.8h.01');

// Bloquear: aro en tinta cruzado por la barra del acento.
export const Ban = line('Ban', RING, 'M7.6 7.6l8.8 8.8');
