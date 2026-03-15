import { accent, accentFill, bodyLine, icon, type IconComponent, inlay, Leaf, leafRect } from './base';

/**
 * Ilustraciones de Pagorium Starter Kit React: íconos grandes en duotono con relleno (ver `icon` en `base.tsx`), pensados
 * para tarjetas, catálogos y estados vacíos. Cuerpo sólido con esquina de hoja, detalles recortados, capa
 * clara del duotono y la pieza clave en el color primario (`--primary`). Comparten la firma de Pagorium Starter Kit React:
 * la esquina de hoja y la hoja.
 */

const DOC = leafRect(5, 2.5, 13, 19);
const CAL = leafRect(3, 4.5, 18, 16.5);
const CAL_CUT = <path d="M3.5 9.6h17M8 2.8v3.6M16 2.8v3.6" strokeWidth={2.2} />;
const CAL_RINGS = <path {...bodyLine} d="M8 2.6v3.6M16 2.6v3.6" />;
const BILL = 'M2.5 7c6-2 11 2 16 0v10c-5 2-10-2-16 0z';
const PERSON_HEAD = <circle cx="8.5" cy="7.5" r="3.4" />;
const PERSON_BODY = <path d="M2.5 19.6a6 6 0 0 1 12 0 .8.8 0 0 1-.8.8H3.3a.8.8 0 0 1-.8-.8z" />;

/** Monedas anuladas: pila de monedas sólida tachada por la diagonal del acento. */
export const CoinsOff = icon('CoinsOff', {
  body: <path d="M6 6.5c0-1.5 2.7-2.5 6-2.5s6 1 6 2.5v11c0 1.5-2.7 2.5-6 2.5s-6-1-6-2.5z" />,
  cut: <path d="M6 7c0 1.4 2.7 2.4 6 2.4S18 8.4 18 7M6 12.2c0 1.4 2.7 2.4 6 2.4s6-1 6-2.4M3.5 20.5l17-17" strokeWidth={2} />,
  accent: <path {...accent} d="M3.5 20.5l17-17" />,
});

/** Documento con resta: hoja sólida con la resta del acento incrustada. */
export const FileMinus = icon('FileMinus', {
  body: <path d={DOC} />,
  cut: (
    <>
      <path d="M8 9h7M8 12.5h4" />
      <circle cx="16.5" cy="17" r="4.8" strokeWidth={2.6} />
    </>
  ),
  accent: (
    <>
      <circle {...accentFill} cx="16.5" cy="17" r="3.8" />
      <path stroke="var(--color-background)" strokeWidth={1.6} strokeLinecap="round" d="M14.8 17h3.4" />
    </>
  ),
});

/** Reprogramar: calendario sólido con la flecha de vuelta del acento. */
export const CalendarSync = icon('CalendarSync', {
  body: <path d={CAL} />,
  cut: (
    <>
      {CAL_CUT}
      <path d="M9 16.3a3 3 0 1 0 3-3" {...inlay} />
    </>
  ),
  accent: (
    <>
      {CAL_RINGS}
      <path {...accent} d="M9 16.3a3 3 0 1 0 3-3" />
      <path {...accentFill} d="M10.4 13.3l2.6-1.8v3.6z" />
    </>
  ),
});

/** Carpeta rechazada: carpeta sólida con el aspa del acento incrustada. */
export const FolderX = icon('FolderX', {
  body: <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2h8.5A1.5 1.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z" />,
  cut: <path d="M10 11l4 4M14 11l-4 4" {...inlay} />,
  accent: <path {...accent} d="M10 11l4 4M14 11l-4 4" />,
});

/** Dar de baja: billete claro que cae a la bandeja sólida con el dardo del acento. */
export const TrayArrowDown = icon('TrayArrowDown', {
  soft: <path d={leafRect(7, 2.5, 10, 7, 2, 0.5)} />,
  body: <path d="M3 14.5h5l1.5 2.2h5l1.5-2.2h5v4a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5z" />,
  accent: <path {...accentFill} d="M12 15l3.2-3.2c.4-.4.1-1.1-.5-1H13V7.5a1 1 0 0 0-2 0v3.3H9.3c-.6-.1-.9.6-.5 1z" />,
});

/** Persona con billete: persona sólida y el billete curvo del acento. */
export const UserBanknote = icon('UserBanknote', {
  body: (
    <>
      {PERSON_HEAD}
      {PERSON_BODY}
    </>
  ),
  accent: <path {...accentFill} d="M12.5 13.5c3-1.6 6-1.6 9 0v6c-3-1.6-6-1.6-9 0z" />,
});

/** Atención telefónica: auriculares sólidos con el micrófono de hoja del acento. */
export const Headphones = icon('Headphones', {
  body: (
    <>
      <path d="M3.5 13.5A2.5 2.5 0 0 1 6 11h1.5v7H6a2.5 2.5 0 0 1-2.5-2.5zM20.5 13.5A2.5 2.5 0 0 0 18 11h-1.5v7H18a2.5 2.5 0 0 0 2.5-2.5z" />
      <path {...bodyLine} d="M4.8 11.5a7.2 7.2 0 0 1 14.4 0" />
    </>
  ),
  accent: <Leaf cx={12} cy={19.5} r={2.6} rotate={-90} />,
});

/** Listado de personas: persona sólida y renglones del acento. */
export const UserList = icon('UserList', {
  body: (
    <>
      {PERSON_HEAD}
      {PERSON_BODY}
    </>
  ),
  accent: <path {...accent} strokeWidth={2.2} d="M16.5 6.5h5M16.5 11h5M16.5 15.5h3" />,
});

/** Billetera: billetera sólida con el broche de hoja del acento. */
export const Purse = icon('Purse', {
  soft: <path d="M3 8.5A3 3 0 0 1 6 5.5h10v3z" />,
  body: <path d="M3 8.5h16.5A1.5 1.5 0 0 1 21 10v8.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5z" />,
  cut: <path d="M15.5 12.4h5.6v3.2h-5.6a1.6 1.6 0 0 1 0-3.2z" strokeWidth={2.6} />,
  accent: <Leaf cx={16.8} cy={14} r={1.6} rotate={90} />,
});

/** Balanza: balanza sólida con la moneda de más del acento. */
export const Scale = icon('Scale', {
  body: (
    <>
      <path {...bodyLine} d="M12 4v15.5M5 7h14M8.5 20.5h7" />
      <path d="M1.8 13.5L5 7.5l3.2 6a3.2 3.2 0 0 1-6.4 0z" />
      <path d="M15.8 13.5L19 7.5l3.2 6a3.2 3.2 0 0 1-6.4 0z" />
    </>
  ),
  accent: <circle {...accentFill} cx="19" cy="10.6" r="1.8" />,
});

/** Salida de dinero: billete sólido y el dardo del acento que sale. */
export const BanknoteArrowUp = icon('BanknoteArrowUp', {
  body: <path d="M2.5 11c4.5-1.5 8.5 1.5 13 0v8c-4.5 1.5-8.5-1.5-13 0z" />,
  cut: <circle cx="9" cy="15" r="1.9" {...inlay} />,
  accent: <path {...accentFill} d="M21.5 2.5l-1 6.4c-.1.6-.9.8-1.3.3l-1.4-1.6-4.9 4.9a1 1 0 0 1-1.4-1.4l4.9-4.9-1.6-1.4c-.5-.4-.3-1.2.3-1.3z" />,
});

/** Pago completo: billete sólido con el sello de visto del acento. */
export const BanknoteCheck = icon('BanknoteCheck', {
  body: <path d={BILL} />,
  cut: (
    <>
      <circle cx="10.5" cy="12" r="2" {...inlay} />
      <circle cx="17.5" cy="17" r="5" strokeWidth={2.4} />
    </>
  ),
  accent: (
    <>
      <circle {...accentFill} cx="17.5" cy="17" r="4.1" />
      <path stroke="var(--color-background)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" fill="none" d="M15.7 17l1.2 1.2 2.3-2.4" />
    </>
  ),
});

/** Documento de una persona: hoja sólida con la persona del acento incrustada. */
export const FileUser = icon('FileUser', {
  body: <path d={DOC} />,
  cut: (
    <>
      <circle cx="11.5" cy="9" r="2.1" {...inlay} />
      <path d="M8.3 14.2a3.4 3.4 0 0 1 6.4 0" {...inlay} />
      <path d="M8 18h7" />
    </>
  ),
  accent: (
    <>
      <circle {...accentFill} cx="11.5" cy="9" r="2.2" />
      <path {...accent} d="M8.3 14.2a3.4 3.4 0 0 1 6.4 0" />
    </>
  ),
});

/** Documentos apilados: la hoja de atrás clara y renglones del acento. */
export const FilesStack = icon('FilesStack', {
  soft: <path d={leafRect(8.5, 2, 12, 16, 3.5, 0.8)} />,
  body: <path d={leafRect(3.5, 6, 12, 16, 3.5, 0.8)} />,
  cut: <path d="M6.5 12h6M6.5 15.5h6M6.5 19h3.5" {...inlay} strokeWidth={2.8} />,
  accent: <path {...accent} strokeWidth={1.6} d="M6.5 12h6M6.5 15.5h6M6.5 19h3.5" />,
});

/** Recuperación: moneda sólida y la flecha de vuelta del acento. */
export const CoinArrowBack = icon('CoinArrowBack', {
  body: <circle cx="12" cy="13.5" r="6" />,
  cut: <path d="M12 10.8v5.4M10.3 12.2c.4-.9 3-1 3.4.3M13.7 15c-.4.9-3 1-3.4-.3" />,
  accent: (
    <>
      <path {...accent} d="M3.6 12a8.4 8.4 0 0 1 14.2-6" />
      <path {...accentFill} d="M20 2.5l-.6 5.8-5.1-2.6z" />
    </>
  ),
});

/** Pago del día: calendario sólido con la moneda del acento. */
export const CalendarCoin = icon('CalendarCoin', {
  body: <path d={leafRect(3, 4.5, 16, 15)} />,
  cut: (
    <>
      <path d="M3.5 9.4h15M7.5 2.8v3.6M14.5 2.8v3.6" strokeWidth={2.2} />
      <circle cx="17.5" cy="17.5" r="5" strokeWidth={2.4} />
    </>
  ),
  accent: (
    <>
      <path {...bodyLine} d="M7.5 2.6v3.6M14.5 2.6v3.6" />
      <circle {...accentFill} cx="17.5" cy="17.5" r="4" />
      <path stroke="var(--color-background)" strokeWidth={1.6} strokeLinecap="round" d="M17.5 15.8v3.4" />
    </>
  ),
});

/** Atraso por persona: reloj sólido con agujas recortadas y la persona del acento. */
export const ClockUser = icon('ClockUser', {
  body: <circle cx="10" cy="10.5" r="7.5" />,
  cut: (
    <>
      <path d="M10 6.5v4l2.6 1.6" />
      <circle cx="18.2" cy="17" r="4.8" strokeWidth={2.6} />
    </>
  ),
  accent: (
    <>
      <circle {...accentFill} cx="18.2" cy="14.6" r="1.8" />
      <path {...accentFill} d="M15.2 20.6a3 3 0 0 1 6 0z" />
    </>
  ),
});

/** Reloj de arena: reloj de arena sólido con la arena del acento. */
export const Hourglass = icon('Hourglass', {
  body: <path d="M6 2.5h12a1 1 0 0 1 0 2h-.7c-.3 3.4-2.6 5.4-4.3 7.5 1.7 2.1 4 4.1 4.3 7.5h.7a1 1 0 0 1 0 2H6a1 1 0 0 1 0-2h.7c.3-3.4 2.6-5.4 4.3-7.5C9.3 9.9 7 7.9 6.7 4.5H6a1 1 0 0 1 0-2z" />,
  cut: <path d="M9 7.2h6" strokeWidth={1.4} />,
  accent: <path {...accentFill} d="M8.6 19.3h6.8C15 17 13.6 15.6 12 14c-1.6 1.6-3 3-3.4 5.3z" />,
});

/** Aviso con tiempo: megáfono sólido con el reloj del acento. */
export const MegaphoneClock = icon('MegaphoneClock', {
  body: <path d="M3 9.8a1 1 0 0 1 1-1h2.5L13 5.3a.7.7 0 0 1 1 .6v12.2a.7.7 0 0 1-1 .6l-6.5-3.5H6l1 4.3H4.6L3.8 15A1 1 0 0 1 3 14z" />,
  cut: <circle cx="18.6" cy="12" r="4.4" strokeWidth={2.4} />,
  accent: (
    <>
      <circle {...accentFill} cx="18.6" cy="12" r="3.5" />
      <path stroke="var(--color-background)" strokeWidth={1.3} strokeLinecap="round" fill="none" d="M18.6 10.4V12l1 .8" />
    </>
  ),
});

/** Barras con alerta: barras de hoja sólidas con la alerta del acento. */
export const ChartBarAlert = icon('ChartBarAlert', {
  soft: <rect x="3" y="19.5" width="18" height="1.8" rx="0.9" />,
  body: (
    <>
      <path d={leafRect(4, 13, 3.6, 5.5, 1.4, 0.4)} />
      <path d={leafRect(10.2, 9, 3.6, 9.5, 1.4, 0.4)} />
      <path d={leafRect(16.4, 5, 3.6, 13.5, 1.4, 0.4)} />
    </>
  ),
  accent: <path {...accent} strokeWidth={2.4} d="M6 3.5v4M6 10.4v.1" />,
});

/** Día marcado: calendario sólido con el día del acento incrustado. */
export const CalendarDay = icon('CalendarDay', {
  body: <path d={CAL} />,
  cut: (
    <>
      {CAL_CUT}
      <path d="M7.8 13.6h.1M11.6 13.6h.1M7.8 17.2h.1M11.6 17.2h.1" strokeWidth={2.3} />
      <path d="M14.6 12.8h3.4v3.4h-3.4z" strokeWidth={2.6} />
    </>
  ),
  accent: (
    <>
      {CAL_RINGS}
      <rect {...accentFill} x="14.6" y="12.8" width="3.4" height="3.4" rx="0.6" />
    </>
  ),
});

/** Entrada y salida: dardo sólido que sube y dardo del acento que baja. */
export const ArrowUpDown = icon('ArrowUpDown', {
  soft: <circle cx="7" cy="14" r="5" />,
  body: <path d="M7 3l4.6 4.8c.4.5 0 1.2-.6 1.1H8.2V19.5a1.2 1.2 0 0 1-2.4 0V8.9H3c-.6.1-1-.6-.6-1.1z" />,
  accent: <path {...accentFill} d="M17 21l-4.6-4.8c-.4-.5 0-1.2.6-1.1h2.8V4.5a1.2 1.2 0 0 1 2.4 0v10.6H21c.6-.1 1 .6.6 1.1z" />,
});

/** Variación: dos barras sólidas y el delta del acento. */
export const ChartBarDelta = icon('ChartBarDelta', {
  soft: <rect x="3" y="19.5" width="11.5" height="1.8" rx="0.9" />,
  body: (
    <>
      <path d={leafRect(4, 10, 4, 8.5, 1.4, 0.4)} />
      <path d={leafRect(10, 5, 4, 13.5, 1.4, 0.4)} />
    </>
  ),
  accent: <path {...accentFill} d="M19 13.5l3.3 6.6a.8.8 0 0 1-.7 1.1h-5.2a.8.8 0 0 1-.7-1.1z" />,
});

/** Reconocimiento: medalla sólida con la estrella del acento incrustada. */
export const Medal = icon('Medal', {
  soft: <path d="M8.2 13.6l-1.8 7.6 5.6-2.8 5.6 2.8-1.8-7.6z" />,
  body: <circle cx="12" cy="9" r="6.6" />,
  cut: <circle cx="12" cy="9" r="4" strokeWidth={1.4} />,
  accent: <path {...accentFill} d="M12 5.9l.9 1.9 2.1.3-1.5 1.5.4 2.1-1.9-1-1.9 1 .4-2.1-1.5-1.5 2.1-.3z" />,
});

/** Altas y bajas: persona sólida con más y menos del acento. */
export const UserPlusMinus = icon('UserPlusMinus', {
  body: (
    <>
      {PERSON_HEAD}
      {PERSON_BODY}
    </>
  ),
  accent: <path {...accent} strokeWidth={2.2} d="M18.5 4.5v5M16 7h5M16 14.5h5" />,
});

/** Altas por persona: persona sólida y el dardo del acento que entra. */
export const UserArrowLeft = icon('UserArrowLeft', {
  body: (
    <>
      {PERSON_HEAD}
      {PERSON_BODY}
    </>
  ),
  accent: <path {...accentFill} d="M15 12l3.8-3.8c.4-.4 1.1-.1 1 .5v2.1H22a1.2 1.2 0 0 1 0 2.4h-2.2v2.1c.1.6-.6.9-1 .5z" />,
});

/** Sin riesgo: escudo sólido con el visto del acento incrustado. */
export const ShieldVerified = icon('ShieldVerified', {
  body: <path d="M12 2.6l7.8 3.1a.8.8 0 0 1 .5.7v5c0 4.8-3.3 8.4-8 9.9a1 1 0 0 1-.6 0c-4.7-1.5-8-5.1-8-9.9v-5a.8.8 0 0 1 .5-.7z" />,
  cut: (
    <>
      <path d="M12 5.4v13.8" strokeWidth={1.2} />
      <path d="M8.3 11.8l2.6 2.6 4.8-4.9" {...inlay} />
    </>
  ),
  accent: <path {...accent} d="M8.3 11.8l2.6 2.6 4.8-4.9" />,
});

/** Red de nodos: nodos sólidos con el de envío en hoja del acento. */
export const NetworkNodes = icon('NetworkNodes', {
  body: (
    <>
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="4.5" cy="5" r="2.2" />
      <circle cx="12" cy="20.5" r="1.8" />
      <path {...bodyLine} strokeWidth={1.8} d="M6 6.4l3.4 3.2M14.6 9.6L18 6.4M12 15.8v2.8" />
    </>
  ),
  accent: <Leaf cx={19.5} cy={4.6} r={2.6} rotate={45} />,
});

/** Revisión de dinero: lupa sólida sobre una moneda del acento. */
export const SearchCoin = icon('SearchCoin', {
  soft: <circle cx="10.2" cy="10.2" r="4.8" />,
  body: <path fillRule="evenodd" d="M10.2 3a7.2 7.2 0 0 1 5.8 11.5l4.4 4.4a1.4 1.4 0 0 1-2 2L14 16.5A7.2 7.2 0 1 1 10.2 3zm0 2.4a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6z" />,
  accent: (
    <>
      <circle {...accentFill} cx="10.2" cy="10.2" r="3" />
      <path stroke="var(--color-background)" strokeWidth={1.2} strokeLinecap="round" d="M10.2 8.8v2.8" />
    </>
  ),
});

/** Matriz: cuadrícula sólida recortada con la celda de arriba a la derecha en el acento. */
export const GridHighlight = icon('GridHighlight', {
  body: <path d={leafRect(3, 3, 18, 18)} />,
  cut: <path d="M9 3v18M15 3v18M3 9h18M3 15h18" strokeWidth={1.4} />,
  accent: <path {...accentFill} d="M15.7 3h4.3a1 1 0 0 1 1 1v4.3h-5.3z" />,
});

/** Pago anticipado: billete sólido y el rayo del acento. */
export const BanknoteZap = icon('BanknoteZap', {
  body: <path d="M2 8c4.3-1.5 8.2 1.5 12.5 0v8c-4.3 1.5-8.2-1.5-12.5 0z" />,
  cut: <circle cx="8.3" cy="12" r="1.9" {...inlay} />,
  accent: <path {...accentFill} d="M21 2.5l-4.6 8h3.2l-3.4 9.5 6.3-11.2h-3.4l2.6-6.3z" />,
});

/** Proyección: área clara, tendencia sólida y el tramo proyectado del acento. */
export const ChartProjection = icon('ChartProjection', {
  soft: <path d="M3 21v-6l4-4 4 3 3-3v10z" />,
  body: <path {...bodyLine} strokeWidth={2.4} d="M3 3v17.5h18M3 15l4-4 4 3 3-3" />,
  accent: (
    <>
      <path {...accent} strokeDasharray="1.8 2.6" d="M14 11l5-5" />
      <path {...accentFill} d="M21.4 3.6l-.5 5c0 .6-.8.9-1.2.4l-3.9-3.7c-.4-.4-.2-1.2.4-1.2z" />
    </>
  ),
});

/** Avance: anillo claro con el avance del acento y el porcentaje sólido. */
export const CirclePercent = icon('CirclePercent', {
  soft: <path fillRule="evenodd" d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm0 2.6a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8z" />,
  body: <path d="M9.4 15.4l5.2-6.8M9.6 9.4h.1M14.4 14.6h.1" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />,
  accent: <path {...accent} strokeWidth={2.6} strokeLinecap="butt" d="M12 4.3a7.7 7.7 0 1 1-7.3 5.3" />,
});

/** Cierre del día: calendario sólido con el candado del acento. */
export const CalendarLock = icon('CalendarLock', {
  body: <path d={CAL} />,
  cut: (
    <>
      {CAL_CUT}
      <path d={leafRect(8.6, 13.6, 6.8, 5.4, 1.4, 0.4)} strokeWidth={2.4} />
      <path d="M10.2 13.6v-1a1.8 1.8 0 0 1 3.6 0v1" strokeWidth={3.2} />
    </>
  ),
  accent: (
    <>
      {CAL_RINGS}
      <path {...accentFill} d={leafRect(8.6, 13.6, 6.8, 5.4, 1.4, 0.4)} />
      <path {...accent} strokeWidth={1.4} d="M10.2 13.6v-1a1.8 1.8 0 0 1 3.6 0v1" />
    </>
  ),
});

/** Cierre nocturno: luna sólida con el reloj del acento. */
export const MoonClock = icon('MoonClock', {
  body: <path d="M19 15A8.2 8.2 0 1 1 8.6 4.6a6.6 6.6 0 0 0 10.4 10.4z" />,
  cut: <circle cx="17.8" cy="6.2" r="4.4" strokeWidth={2.4} />,
  accent: (
    <>
      <circle {...accentFill} cx="17.8" cy="6.2" r="3.5" />
      <path stroke="var(--color-background)" strokeWidth={1.3} strokeLinecap="round" fill="none" d="M17.8 4.6v1.6l1 .8" />
    </>
  ),
});

/** Interés que crece: moneda sólida con el porcentaje recortado y el dardo del acento que sube. */
export const CoinTrendUp = icon('CoinTrendUp', {
  body: <circle cx="9" cy="14.5" r="6.5" />,
  cut: <path d="M6.8 16.8l4.4-4.6M7.1 12.6h.1M10.9 16.4h.1" strokeWidth={1.7} />,
  accent: <path {...accentFill} d="M21.5 2.5l-.6 6.4c0 .6-.8.9-1.2.4l-1.6-1.6-3.3 3.3a1 1 0 0 1-1.4-1.4l3.3-3.3-1.6-1.6c-.5-.4-.2-1.2.4-1.2z" />,
});

/** Tabla con celda: tabla sólida recortada con la celda del acento. */
export const TableCell = icon('TableCell', {
  body: <path d={leafRect(3, 3, 18, 18)} />,
  cut: <path d="M3 8.2h18M3 14h18M9 8.2V21M15 8.2V21" strokeWidth={1.4} />,
  accent: (
    <>
      <path {...accentFill} d="M15.7 14.7H21V20a1 1 0 0 1-1 1h-4.3z" />
      <path stroke="var(--color-background)" strokeWidth={1.1} strokeLinecap="round" d="M16.9 19.6l2.9-3.8" />
    </>
  ),
});

/** Institución: columnas sólidas con el frontón del acento. */
export const Landmark = icon('Landmark', {
  soft: <rect x="2.5" y="19.3" width="19" height="2" rx="1" />,
  body: <path d="M5 10.5h2.5v7H5zM10.75 10.5h2.5v7h-2.5zM16.5 10.5H19v7h-2.5z" />,
  accent: <path {...accentFill} d="M11.4 2.7a1.2 1.2 0 0 1 1.2 0l8.4 5a.7.7 0 0 1-.4 1.3H3.4a.7.7 0 0 1-.4-1.3z" />,
});

/** Enviar tabla: hoja de cálculo sólida y el dardo de envío del acento. */
export const SheetArrowUp = icon('SheetArrowUp', {
  body: <path d={leafRect(3.5, 2.5, 13, 19)} />,
  cut: <path d="M6.5 10h7v7.5h-7zM6.5 13.7h7M10 10v7.5" strokeWidth={1.4} />,
  accent: <path {...accentFill} d="M20 6l3 3.4c.4.5 0 1.2-.6 1.1h-1.3v10a1.1 1.1 0 0 1-2.2 0v-10h-1.3c-.6.1-1-.6-.6-1.1z" />,
});

/** Documento en ciclo: hoja sólida dentro de dos flechas del acento en ciclo. */
export const FileCycle = icon('FileCycle', {
  body: <path d={leafRect(8.2, 6.8, 7.6, 10.4, 2.2, 0.5)} />,
  cut: <path d="M10.5 10.4h3M10.5 13.6h3" strokeWidth={1.4} />,
  accent: (
    <>
      <path {...accent} d="M3.8 12a8.2 8.2 0 0 1 13.6-6.2M20.2 12a8.2 8.2 0 0 1-13.6 6.2" />
      <path {...accentFill} d="M19.5 2.6l-.4 5.2-4.6-2.4zM4.5 21.4l.4-5.2 4.6 2.4z" />
    </>
  ),
});

/** Documento genérico: hoja sólida con renglones recortados y la hoja de la plantilla en el acento. */
export const FileLines = icon('FileLines', {
  body: <path d={DOC} />,
  cut: <path d="M8 9h7M8 12.5h7M8 16h4" />,
  accent: <Leaf cx={15} cy={5.6} r={1.6} rotate={40} />,
});

/** Todas las ilustraciones por nombre (para galerías y para elegir una por clave). */
export const illustrations: Record<string, IconComponent> = {
  CoinsOff,
  FileMinus,
  CalendarSync,
  FolderX,
  TrayArrowDown,
  UserBanknote,
  Headphones,
  UserList,
  Purse,
  Scale,
  BanknoteArrowUp,
  BanknoteCheck,
  FileUser,
  FilesStack,
  CoinArrowBack,
  CalendarCoin,
  ClockUser,
  Hourglass,
  MegaphoneClock,
  ChartBarAlert,
  CalendarDay,
  ArrowUpDown,
  ChartBarDelta,
  Medal,
  UserPlusMinus,
  UserArrowLeft,
  ShieldVerified,
  NetworkNodes,
  SearchCoin,
  GridHighlight,
  BanknoteZap,
  ChartProjection,
  CirclePercent,
  CalendarLock,
  MoonClock,
  CoinTrendUp,
  TableCell,
  Landmark,
  SheetArrowUp,
  FileCycle,
  FileLines,
};
