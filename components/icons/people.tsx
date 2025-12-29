import { leafRect, leafStroke, line } from './base';

/**
 * Personas y seguridad con el lenguaje «línea de hoja»: siluetas y escudos de trazo de 1,4 en
 * la tinta del ícono y la pieza clave (la cabeza, el visto, el candado, el lápiz) en el color primario.
 */

// Persona a la izquierda: cabeza y hombros enteros, para acompañar una marca a la derecha.
const HEAD = <circle cx="9" cy="8" r="3.6" />;
const SHOULDERS = 'M3 20.5a6 6 0 0 1 12 0';

// Hombros recortados, para dejar sitio a la pieza de abajo a la derecha.
const SHOULDERS_SHORT = 'M3 20.5a6 6 0 0 1 9.4-4.9';

const SHIELD = 'M12 3.2 5 6v5.2c0 4.6 3 7.9 7 9.6 4-1.7 7-5 7-9.6V6z';
const LOCK = leafRect(4.5, 10, 15, 11, 4, 1);

// Usuario: hombros en tinta y la cabeza en el acento.
export const User = line('User', 'M4.5 20.5a7.5 7.5 0 0 1 15 0', <circle cx="12" cy="8" r="4" />);

// Usuario (redondo): aro y hombros en tinta, la cabeza en el acento.
export const UserRound = line(
  'UserRound',
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M6.8 18a6 6 0 0 1 10.4 0" />
  </>,
  <circle cx="12" cy="10" r="3" />,
);

// Usuarios: dos personas en tinta y la cabeza de la del frente en el acento.
export const Users = line('Users', `${SHOULDERS}M16 4.6a3.6 3.6 0 0 1 0 6.8M17.5 14.6a6 6 0 0 1 3.5 5.9`, HEAD);

// Usuarios (redondos): persona del frente en tinta y la de atrás en el acento.
export const UsersRound = line(
  'UsersRound',
  <>
    <circle cx="9" cy="8" r="4" />
    <path d={SHOULDERS} />
  </>,
  'M15.5 4.3a4 4 0 0 1 0 7.4M18 14.4a6.3 6.3 0 0 1 3 6.1',
);

// Usuario verificado: persona en tinta y el visto en el acento.
export const UserCheck = line(
  'UserCheck',
  <>
    {HEAD}
    <path d={SHOULDERS} />
  </>,
  'M15.5 12l2 2 3.8-4',
);

// Usuario con ajustes: persona en tinta y el engranaje en el acento.
export const UserCog = line(
  'UserCog',
  <>
    {HEAD}
    <path d={SHOULDERS_SHORT} />
  </>,
  <>
    <circle cx="17" cy="16.5" r="2" />
    <path d="M17 13.6v-1M19.5 15.05l.87-.5M19.5 17.95l.87.5M17 19.4v1M14.5 17.95l-.87.5M14.5 15.05l-.87-.5" />
  </>,
);

// Usuario bloqueado: persona en tinta y el candado en el acento.
export const UserLock = line(
  'UserLock',
  <>
    {HEAD}
    <path d={SHOULDERS_SHORT} />
  </>,
  <>
    <rect x="14" y="15" width="7" height="5.5" rx="1.5" />
    <path d="M15.8 15v-1.3a1.7 1.7 0 0 1 3.4 0V15" />
  </>,
);

// Editar usuario: persona en tinta y el lápiz en el acento.
export const UserPen = line(
  'UserPen',
  <>
    {HEAD}
    <path d={SHOULDERS_SHORT} />
  </>,
  'M18.6 12.4a1.5 1.5 0 0 1 2.1 2.1L15.4 19.8l-2.9.7.7-2.9z',
);

// Libreta de contactos: libreta de hoja y hombros en tinta, la cabeza en el acento.
export const BookUser = line(
  'BookUser',
  <>
    <path d={leafRect(4.5, 2.5, 15, 19, 4, 1)} />
    <path d="M8.5 17a3.5 3.5 0 0 1 7 0" />
  </>,
  <circle cx="12" cy="10" r="2.5" />,
);

// Cédula: tarjeta de hoja y renglones en tinta, la foto de la persona en el acento.
export const IdCard = line(
  'IdCard',
  <>
    <path d={leafRect(2.5, 4.5, 19, 15, 4, 1)} />
    <path d="M14.5 10h4M14.5 13.5h3" />
  </>,
  <>
    <circle cx="8.5" cy="10.2" r="2" />
    <path d="M5.5 16a3 3 0 0 1 6 0" />
  </>,
);

// Sexo: aro y cruz de un símbolo en tinta; la flecha del otro en el acento.
export const VenusAndMars = line(
  'VenusAndMars',
  <>
    <circle cx="9" cy="12.5" r="4.2" />
    <path d="M9 16.7V21M6.8 19h4.4" />
  </>,
  'M13 8.5 18.5 3M15 3h3.5v3.5',
);

// Atención telefónica: diadema y auriculares en tinta, el micrófono en el acento.
export const Headset = line(
  'Headset',
  'M3.5 12h2.5a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-.5a2 2 0 0 1-2-2zm0 0a8.5 8.5 0 0 1 17 0m0 0H18a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h.5a2 2 0 0 0 2-2z',
  'M19.8 19.3c-.7 1-1.8 1.7-3.3 1.7H13',
);

// Escudo con la alerta en el acento.
export const ShieldAlert = line('ShieldAlert', SHIELD, 'M12 8v4.4M12 15.8h.01');

// Escudo con el visto en el acento.
export const ShieldCheck = line('ShieldCheck', SHIELD, 'M8.8 12.2l2.3 2.3 4.4-4.6');

// Escudo desactivado: escudo en tinta, cortado donde lo cruza la barra del acento.
export const ShieldOff = line(
  'ShieldOff',
  'M8 4.8 12 3.2 19 6v5.2c0 1.5-.3 2.8-.9 4M15.8 18.6c-1.1.9-2.4 1.6-3.8 2.2-4-1.7-7-5-7-9.6V7.3',
  'M4 4l16 16',
);

// Escudo con el más en el acento.
export const ShieldPlus = line('ShieldPlus', SHIELD, 'M12 8.6v6M9 11.6h6');

// Llave: cabeza redonda, caña y dientes en tinta; la hoja de Marco en el acento dentro de la cabeza.
export const KeyRound = line(
  'KeyRound',
  <>
    <circle cx="8" cy="16" r="4.5" />
    <path d="M11.2 12.8 20 4M17 7l2.5 2.5M14.6 9.4l1.9 1.9" />
  </>,
  leafStroke(6.6, 17.4, 3.8, 45),
);

// Candado: cuerpo de hoja en tinta y el arco en el acento.
export const Lock = line('Lock', <path d={LOCK} />, 'M8 10V7.5a4 4 0 0 1 8 0V10');

// Candado con cerradura: cuerpo y arco en tinta, la cerradura en el acento.
export const LockKeyhole = line(
  'LockKeyhole',
  <>
    <path d={LOCK} />
    <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
  </>,
  <>
    <circle cx="12" cy="14.6" r="1.4" />
    <path d="M12 16v2.2" />
  </>,
);

// Candado abierto: arco levantado en tinta y la cerradura en el acento.
export const LockKeyholeOpen = line(
  'LockKeyholeOpen',
  <>
    <path d={LOCK} />
    <path d="M8 10V7.5a4 4 0 0 1 7.7-1.5" />
  </>,
  <>
    <circle cx="12" cy="14.6" r="1.4" />
    <path d="M12 16v2.2" />
  </>,
);

// Cerrar sesión: marco de la puerta en tinta y la flecha que sale en el acento.
export const LogOut = line('LogOut', 'M10 20.5H7.5a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4H10', 'M9.5 12h11M16.5 8l4 4-4 4');
