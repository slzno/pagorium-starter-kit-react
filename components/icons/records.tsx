import { leafRect, leafStroke, line } from './base';

/**
 * Documentos, tiempo y dinero con el lenguaje «línea de hoja» (trazo de 1,4, puntas redondas): hojas,
 * calendarios y billeteras con esquina de hoja; la pieza que dice qué hace cada ícono (la lupa, la flecha,
 * el check, las agujas, la moneda…) va en el color primario.
 */

const DOC = leafRect(5, 2.5, 14, 19, 4, 1);
const CALENDAR = <><path d={leafRect(3.5, 5, 17, 15.5, 4, 1)} /><path d="M3.5 10h17" /></>;
const CALENDAR_RINGS = 'M8 3v4M16 3v4';

// Documento: hoja con esquina de hoja y renglones; la hoja de Marco en el acento.
export const FileText = line('FileText', <><path d={DOC} /><path d="M8.5 11h7M8.5 14.5h7M8.5 18h4" /></>, leafStroke(15.5, 8, 4.2, 40));

// Archivo comprimido: hoja con el cierre y su jalador en el acento.
export const FileArchive = line('FileArchive', <path d={DOC} />, <><path d="M10.5 5.5H12M12 8h1.5M10.5 10.5H12" /><rect x="10.5" y="13" width="3" height="4.5" rx="1.2" /></>);

// Hoja de cálculo: hoja con el marco de la tabla; las divisiones de la cuadrícula en el acento.
export const FileSpreadsheet = line('FileSpreadsheet', <><path d={DOC} /><path d="M8.5 10h7v8.5h-7z" /></>, 'M8.5 14.2h7M12 10v8.5');

// Subir archivo: hoja con la flecha hacia arriba en el acento.
export const FileUp = line('FileUp', <path d={DOC} />, 'M12 18.5v-7.5M9 14l3-3 3 3');

// Archivo con advertencia: hoja con el signo de exclamación en el acento.
export const FileWarning = line('FileWarning', <path d={DOC} />, 'M12 9v5M12 17.6h.01');

// Buscar en un archivo: hoja abierta donde la tapa la lupa del acento.
export const FileSearch = line(
  'FileSearch',
  'M10.5 19.5H5a1 1 0 0 1-1-1V6.5a4 4 0 0 1 4-4h8a1 1 0 0 1 1 1v6.5M7.5 7.5h6M7.5 11h3',
  <><circle cx="15.5" cy="15.5" r="3.5" /><path d="M18 18l2.5 2.5" /></>,
);

// Pergamino: rollo con el borde enrollado; los renglones de texto en el acento.
export const ScrollText = line(
  'ScrollText',
  'M7 17V5.5A2.5 2.5 0 0 1 9.5 3h8.5a2.5 2.5 0 0 1 2.5 2.5v13a2.5 2.5 0 0 1-5 0V17H3.5v1.5A2.5 2.5 0 0 0 6 21h12',
  'M10.5 7.5h6.5M10.5 11h6.5M10.5 14.5h3.5',
);

// Lista con portapapeles: tabla abierta arriba con renglones; la pinza en el acento.
export const ClipboardList = line(
  'ClipboardList',
  'M15.5 4.5h3a1 1 0 0 1 1 1V17a4 4 0 0 1-4 4h-10a1 1 0 0 1-1-1V8.5a4 4 0 0 1 4-4M8.5 11h7M8.5 14.5h7M8.5 18h4',
  <path d={leafRect(10, 2.5, 4, 4, 1.6, 0.5)} />,
);

// Recibo: tira con el borde dentado y renglones; el total en el acento.
export const Receipt = line(
  'Receipt',
  'M5.5 4a1.5 1.5 0 0 1 1.5-1.5h10A1.5 1.5 0 0 1 18.5 4v17l-2.2-1.4-2.2 1.4-2.1-1.4-2.1 1.4-2.2-1.4-2.2 1.4zM8.5 7h7M8.5 10.5h7',
  'M8.5 14.5h2M13 14.5h2.5',
);

// Bandeja de entrada: bandeja en tinta; la boca por donde entra el correo en el acento.
export const Inbox = line('Inbox', 'M3 13l3-8h12l3 8v5.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5z', 'M3 13h5l1.5 2.5h5L16 13h5');

// Correo: sobre con esquina de hoja y la solapa en el acento.
export const Mail = line('Mail', <path d={leafRect(3, 5, 18, 14, 4, 1)} />, 'M6.5 8.5l5.5 4.2 5.5-4.2');

// Etiqueta: etiqueta de precio con el ojal en el acento.
export const Tag = line(
  'Tag',
  'M3.5 6.5a3 3 0 0 1 3-3h4.8a1.5 1.5 0 0 1 1.06.44l8 8a1.5 1.5 0 0 1 0 2.12l-6.38 6.38a1.5 1.5 0 0 1-2.12 0l-8-8A1.5 1.5 0 0 1 3.5 11.3z',
  <circle cx="8" cy="8" r="1.5" />,
);

// Paquete: caja con sus aristas; la cinta de la tapa en el acento.
export const Package = line('Package', 'M12 3l8 4.3v9.4L12 21l-8-4.3V7.3zM4 7.3l8 4.3 8-4.3M12 11.6V21', 'M8 5.2l7.2 3.9');

// Productos: dos cajas abajo y la de arriba en el acento.
export const Boxes = line(
  'Boxes',
  <><path d={leafRect(3, 13, 8, 7.5, 2.5, 0.6)} /><path d={leafRect(13, 13, 8, 7.5, 2.5, 0.6)} /></>,
  <path d={leafRect(8, 3.5, 8, 7.5, 2.5, 0.6)} />,
);

// Calendario con check: argollas en tinta y el check en el acento.
export const CalendarCheck = line('CalendarCheck', <>{CALENDAR}<path d={CALENDAR_RINGS} /></>, 'M9 15.2l2 2 4-4');
// Calendario de días no laborales: argollas en tinta y la diagonal en el acento.
export const CalendarOff = line('CalendarOff', <>{CALENDAR}<path d={CALENDAR_RINGS} /></>, 'M9.5 13l5 5');
// Calendario con X: argollas en tinta y la X en el acento.
export const CalendarX2 = line('CalendarX2', <>{CALENDAR}<path d={CALENDAR_RINGS} /></>, 'M10 13.2l4 4M14 13.2l-4 4');
// Calendario: contenedor de hoja; argollas y días en el acento.
export const CalendarDays = line('CalendarDays', CALENDAR, 'M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17.2h.01M12 17.2h.01');

// Reloj: esfera en tinta y las agujas en el acento.
export const Clock = line('Clock', <circle cx="12" cy="12" r="8.5" />, 'M12 7.5V12l3 2');

// Temporizador: esfera con corona y botón; la aguja en el acento.
export const Timer = line('Timer', <><circle cx="12" cy="13.3" r="7.3" /><path d="M10 3h4M18.6 6.6l1.4-1.4" /></>, 'M12 13.3V9.5');

// Temporizador vencido: esfera abierta donde la cruza la barra del acento.
export const TimerOff = line('TimerOff', 'M9.17 6.57A7.3 7.3 0 0 1 18.73 16.13M16.43 19.11A7.3 7.3 0 0 1 6.19 8.87M10 3h4M18.6 6.6l1.4-1.4', 'M4 4l16 16');

// Amanecer: medio sol sobre el horizonte; la flecha que sube en el acento.
export const Sunrise = line('Sunrise', 'M7 18a5 5 0 0 1 10 0M3 18h18M8 21h8M4.5 13.5l1.3.8M19.5 13.5l-1.3.8', 'M12 11V3.5M9 6.5l3-3 3 3');

// Atardecer: medio sol sobre el horizonte; la flecha que baja en el acento.
export const Sunset = line('Sunset', 'M7 18a5 5 0 0 1 10 0M3 18h18M8 21h8M4.5 13.5l1.3.8M19.5 13.5l-1.3.8', 'M12 3.5V11M9 8l3 3 3-3');

// Sol: rayos en tinta y el disco en el acento.
export const Sun = line(
  'Sun',
  <>
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <path key={angle} d="M12 3.5v2" transform={`rotate(${angle} 12 12)`} />
    ))}
  </>,
  <circle cx="12" cy="12" r="4" />,
);

// Luna: creciente en tinta con una hoja del acento como estrella.
export const Moon = line('Moon', 'M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z', leafStroke(17.5, 9, 4.2, 20));

// Billetera: cuerpo con la solapa; el broche en el acento.
export const Wallet = line(
  'Wallet',
  'M17.5 7.5v-2a1 1 0 0 0-1-1h-10a3 3 0 0 0-3 3M20.5 11V8.5a1 1 0 0 0-1-1h-16v9a4 4 0 0 0 4 4h12a1 1 0 0 0 1-1V17',
  <><path d="M20.5 11H17a3 3 0 0 0 0 6h3.5z" /><circle cx="17" cy="14" r="0.6" fill="currentColor" stroke="none" /></>,
);

// Billetera con tarjetas: billetera con la costura y la tarjeta que asoma en el acento.
export const WalletCards = line(
  'WalletCards',
  <><path d={leafRect(3.5, 8, 17, 12.5, 4, 1)} /><path d="M3.5 13h5l1.5 2h4l1.5-2h5" /></>,
  'M6 8V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3',
);

// Billete: el billete curvo con la moneda en el acento.
export const Banknote = line('Banknote', 'M3 7.5c6-2.2 12 2.2 18 0v9c-6 2.2-12-2.2-18 0zM6.5 12h.01M17.5 12h.01', <circle cx="12" cy="12" r="2.5" />);

// Tendencia al alza: línea quebrada en tinta; el último tramo y la flecha en el acento.
export const TrendingUp = line('TrendingUp', 'M3.5 17L9 11.5l4 4', 'M13 15.5l7.5-8M14.5 7.5h6v6');

// Gráfica de barras: barras con esquina de hoja sobre la base; la más alta en el acento.
export const BarChart3 = line(
  'BarChart3',
  <><path d={leafRect(5, 13, 3.5, 5.5, 1.5, 0.4)} /><path d={leafRect(10.25, 9, 3.5, 9.5, 1.5, 0.4)} /><path d="M3.5 21h17" /></>,
  <path d={leafRect(15.5, 4, 3.5, 14.5, 1.5, 0.4)} />,
);

// Columnas: tres barras con esquina de hoja; la del centro en el acento.
export const ChartNoAxesColumn = line(
  'ChartNoAxesColumn',
  <><path d={leafRect(4, 12, 4, 8.5, 1.6, 0.4)} /><path d={leafRect(16, 8, 4, 12.5, 1.6, 0.4)} /></>,
  <path d={leafRect(10, 3.5, 4, 17, 1.6, 0.4)} />,
);

// Reconocimiento: medalla con cintas en tinta y la estrella en el acento.
export const Award = line(
  'Award',
  <><circle cx="12" cy="9.2" r="6.2" /><path d="M8.6 14.4 7 21l5-2.5 5 2.5-1.6-6.6" /></>,
  'M12 5.9l.85 2.13 2.29.15-1.76 1.47.56 2.22L12 10.65l-1.94 1.22.56-2.22-1.76-1.47 2.29-.15z',
);
