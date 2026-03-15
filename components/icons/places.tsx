import { leafRect, leafStroke, line } from './base';

/**
 * Lugares, equipos y sistema con el lenguaje «línea de hoja»: contorno de 1,4 en tinta, contenedores con
 * la esquina de hoja de la plantilla y la pieza clave (puerta, toldo, ruedas, pantalla, luces) en el color primario.
 */

// Inicio: techo y paredes en tinta, la puerta en el acento.
export const House = line('House', 'M4 10.5 12 3.5l8 7M5.5 9.2v8.3a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3V9.2', 'M10 20.5v-4.5a2 2 0 0 1 4 0v4.5');

// Edificio: torre de hoja con ventanas y anexo; la entrada en el acento.
export const Building2 = line(
  'Building2',
  <><path d={leafRect(4, 3, 10.5, 17.5, 4, 1)} /><path d="M14.5 9h2.5a3 3 0 0 1 3 3v8.5h-5.5M7.5 7.5h4M7.5 11h4M7.5 14.5h4" /></>,
  'M7.7 20.5v-2.5a2.05 2.05 0 0 1 4.1 0v2.5',
);

// Tienda: local con la puerta en tinta y el toldo en el acento.
export const Store = line(
  'Store',
  'M5 12v5.5a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V12M10 20.5v-4h4v4',
  'M4.5 3.5h15l1.5 4.6a2.4 2.4 0 0 1-4.5 1.2 2.5 2.5 0 0 1-4.5 0 2.5 2.5 0 0 1-4.5 0A2.4 2.4 0 0 1 3 8.1z',
);

// Fábrica: naves dentadas con ventanas y la chimenea; el humo es una hoja del acento.
export const Factory = line(
  'Factory',
  'M3.5 20.5h17V8.5H18v5.2l-4.5-2.7v2.7L9 11v2.7l-5.5-3.2zM7 17.5h1.5M11.5 17.5h1.5M16 17.5h1.5',
  leafStroke(19.3, 7, 4.4, 30),
);

// Trabajo: maletín de hoja con asa y costura; el broche en el acento.
export const Briefcase = line(
  'Briefcase',
  <><path d={leafRect(3, 7, 18, 13.5, 4, 1)} /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 13h6.8M14.2 13H21" /></>,
  <rect x="10" y="11.2" width="4" height="3.6" rx="1" />,
);

// Mapa: plano plegado en tinta y los dos pliegues en el acento.
export const Map = line('Map', 'M3.5 6.5 9 4.2l6 2.6 5.5-2.3v13l-5.5 2.3-6-2.6-5.5 2.3z', 'M9 4.2v13M15 6.8v13');

// Ubicación: marcador en tinta con el centro en el acento.
export const MapPin = line('MapPin', 'M12 21s-6.5-5.5-6.5-11a6.5 6.5 0 0 1 13 0c0 5.5-6.5 11-6.5 11z', <circle cx="12" cy="10" r="2.5" />);

// Ubicación en el mapa: mapa plegado en tinta y el marcador en el acento encima.
export const MapPinned = line(
  'MapPinned',
  'M8 13.6 3.5 15.3v5.2l5.2-1.8 6.6 2.3 5.2-1.8v-5.2L16 13.6',
  <><path d="M12 15.5s-4.5-3.9-4.5-7.5a4.5 4.5 0 0 1 9 0c0 3.6-4.5 7.5-4.5 7.5z" /><circle cx="12" cy="8" r="1.5" /></>,
);

// Vehículo: carrocería y parabrisas en tinta, las ruedas en el acento.
export const Car = line(
  'Car',
  'M3.8 17.5a.8.8 0 0 1-.8-.8v-3.5a2 2 0 0 1 .4-1.2l2.1-4.2A2 2 0 0 1 7.2 6.8h9.6a2 2 0 0 1 1.7 1l2.1 4.2a2 2 0 0 1 .4 1.2v3.5a.8.8 0 0 1-.8.8M11 17.5h2M5.2 11.8h13.6',
  <><circle cx="7.5" cy="17.5" r="2" /><circle cx="16.5" cy="17.5" r="2" /></>,
);

// Radar: aros abiertos en tinta y el barrido en el acento.
export const Radar = line('Radar', 'M20.5 12A8.5 8.5 0 1 1 12 3.5M16 12a4 4 0 1 1-4-4', 'M12 12l5.8-5.8M12 12h.01');

// Red: dos nodos de hoja en tinta unidos al de arriba, que va en el acento.
export const Network = line(
  'Network',
  <><path d={leafRect(3, 15, 6, 5.5, 2, 0.5)} /><path d={leafRect(15, 15, 6, 5.5, 2, 0.5)} /><path d="M6 15v-2.5h12V15M12 12.5v-1.8" /></>,
  <path d={leafRect(9, 3.5, 6, 5.5, 2, 0.5)} />,
);

// Celular: carcasa de hoja en tinta y el botón en el acento.
export const Smartphone = line('Smartphone', <><path d={leafRect(6.5, 2.5, 11, 19, 4, 1)} /><path d="M10.5 5.5h3" /></>, 'M10.5 18h3');

// Computadora: pantalla de hoja y pie en tinta; la gráfica en el acento.
export const Monitor = line(
  'Monitor',
  <><path d={leafRect(3, 4, 18, 12.5, 4, 1)} /><path d="M12 16.5v4M8.5 20.5h7" /></>,
  'M7 12.5l3-3 2.5 2 4.5-4.5',
);

// Teléfono: auricular en tinta y las ondas en el acento.
export const Phone = line(
  'Phone',
  'M5.2 3.5h3a1 1 0 0 1 1 .8l.9 3.5a1 1 0 0 1-.4 1.1L8 10a12 12 0 0 0 6 6l1.1-1.7a1 1 0 0 1 1.1-.4l3.5.9a1 1 0 0 1 .8 1v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3.2 5.7a2 2 0 0 1 2-2.2z',
  'M14.5 3.5a6 6 0 0 1 6 6M14.5 7a2.5 2.5 0 0 1 2.5 2.5',
);

// Servidor: dos módulos de hoja con ranuras en tinta; las luces en el acento.
export const Server = line(
  'Server',
  <><path d={leafRect(3, 3.5, 18, 7, 3, 0.8)} /><path d={leafRect(3, 13.5, 18, 7, 3, 0.8)} /><path d="M11 7h6M11 17h6" /></>,
  'M7 7h.01M7 17h.01',
);

const DB_TOP = <ellipse cx="12" cy="6" rx="7.5" ry="2.8" />;

// Base de datos: cilindro y anillo en tinta; la tapa en el acento.
export const Database = line('Database', 'M4.5 6v12c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8V6M4.5 12c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8', DB_TOP);

// Respaldo: cilindro en tinta y la flecha de regreso en el acento.
export const DatabaseBackup = line(
  'DatabaseBackup',
  <>{DB_TOP}<path d="M4.5 6v12c0 1.4 2.6 2.5 6 2.75M19.5 6v4M4.5 12c0 1.4 2.6 2.5 6 2.75" /></>,
  'M13 16.5a3.8 3.8 0 1 0 1.1-2.7M13.8 11.3v2.5h2.5',
);

// Base de datos con rayo: cilindro en tinta y el rayo en el acento.
export const DatabaseZap = line(
  'DatabaseZap',
  <>{DB_TOP}<path d="M4.5 6v12c0 1.55 3.36 2.8 7.5 2.8M19.5 6v3.5M4.5 12c0 1.55 3.36 2.8 7.5 2.8" /></>,
  'M18.5 11 15 16h4.5L16 21',
);

// Tablero: módulos de hoja en tinta, uno en el acento.
export const LayoutDashboard = line(
  'LayoutDashboard',
  <><path d={leafRect(3.5, 3.5, 7, 9, 3, 0.8)} /><path d={leafRect(3.5, 15.5, 7, 5, 2, 0.6)} /><path d={leafRect(13.5, 11.5, 7, 9, 3, 0.8)} /></>,
  <path d={leafRect(13.5, 3.5, 7, 5, 2, 0.6)} />,
);

// Tarjeta horizontal: tarjeta de hoja en tinta con la franja en el acento.
export const RectangleHorizontal = line('RectangleHorizontal', <path d={leafRect(3, 6, 18, 12, 4, 1)} />, 'M6.5 14.5h5');
