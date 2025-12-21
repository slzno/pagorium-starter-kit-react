import { Children, cloneElement, type ComponentType, Fragment, isValidElement, type ReactNode, type SVGProps } from 'react';

/**
 * Íconos de Marco UI, en dos lenguajes que comparten su firma: la esquina de hoja y la hoja.
 *
 * - «Línea de hoja» (`line`), el de todo el sistema: un solo trazo de 1,4 sin rellenos, el cuerpo en la
 *   tinta del ícono (`--icon`) y la pieza clave en el color primario. Ver `line`.
 * - Duotono con relleno (`icon`), solo para las ilustraciones grandes (`illustrations.tsx`): contorno de 1,4 con
 *   relleno claro, detalles recortados y el acento en el color primario.
 *
 * Cuadrícula de 24 × 24. Sobre botones sólidos o en texto rojo, `app/marco.css` cambia el acento
 * (`--icon-accent`) al color del texto.
 */

export type IconProps = SVGProps<SVGSVGElement>;
export type IconComponent = ComponentType<IconProps>;

/** Color del acento: el color primario (`--primary`); `--icon-accent` lo cambia (botones sólidos, rojo). */
export const ACCENT = 'var(--icon-accent, var(--primary))';

/** Opacidad del acento de las ilustraciones: el color primario, entero. */
const ACCENT_OPACITY = 1;

/** Capa suave del duotono. */
export const soft = { fill: 'currentColor', fillOpacity: 0.28, stroke: 'none' } as const;
/** Relleno del acento: el color del ícono al 50 %. */
export const accentFill = { fill: ACCENT, fillOpacity: ACCENT_OPACITY, stroke: 'none' } as const;
/** Línea gruesa que forma parte del cuerpo (asas, cintas, rayos). */
export const bodyLine = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
/** Canal ancho para incrustar la marca del acento. */
export const inlay = { strokeWidth: 3.6 } as const;
/** Trazo del acento (para piezas finas): el color del ícono al 50 %. */
export const accent = { stroke: ACCENT, strokeOpacity: ACCENT_OPACITY, fill: 'none', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

/**
 * Rectángulo con esquina de hoja: arriba a la izquierda y abajo a la derecha redondas; las otras dos
 * casi rectas.
 *
 * @param x Izquierda.
 * @param y Arriba.
 * @param w Ancho.
 * @param h Alto.
 * @param r Radio de las esquinas redondas.
 * @param t Radio de las esquinas agudas.
 * @return El trazo `d`.
 */
export const leafRect = (x: number, y: number, w: number, h: number, r = 4.5, t = 1): string =>
  `M${x + r} ${y}H${x + w - t}A${t} ${t} 0 0 1 ${x + w} ${y + t}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + t}A${t} ${t} 0 0 1 ${x} ${y + h - t}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;

/**
 * Hoja de Marco (la firma de Marco UI): punta arriba, cuerpo curvo, inclinada.
 *
 * @param cx Centro horizontal.
 * @param cy Centro vertical.
 * @param r Medio largo de la hoja.
 * @param rotate Giro en grados (0 = punta arriba).
 */
export function Leaf({ cx, cy, r = 3, rotate = 35, ...props }: { cx: number; cy: number; r?: number; rotate?: number } & SVGProps<SVGPathElement>) {
  const w = r * 0.78;

  return (
    <path
      d={`M0 ${-r}C${w} ${-r * 0.35} ${w} ${r * 0.55} 0 ${r}C${-w} ${r * 0.55} ${-w} ${-r * 0.35} 0 ${-r}Z`}
      transform={`translate(${cx} ${cy}) rotate(${rotate})`}
      {...accentFill}
      {...props}
    />
  );
}

/** Grosor de los trazos de las ilustraciones (duotono con relleno). */
export const STROKE = 1.4;

/**
 * Pone el trazo de 1,4 a todo lo que tenga trazo dentro de una capa. Con `dropChannels`, quita los
 * canales anchos (3 o más) que solo servían para separar la pieza del acento del cuerpo sólido.
 *
 * @param node Capa del ícono.
 * @param force Si todo lo que hay dentro es trazo (los detalles).
 * @param dropChannels Si se quitan los canales anchos.
 * @return La capa con el trazo unificado.
 */
function restroke(node: ReactNode, force = false, dropChannels = false): ReactNode {
  return Children.map(node, (child) => {
    if (!isValidElement<Record<string, unknown>>(child)) {
      return child;
    }
    const props = child.props;
    if (child.type === Fragment) {
      return <>{restroke(props.children as ReactNode, force, dropChannels)}</>;
    }
    if (dropChannels && Number(props.strokeWidth ?? 0) >= 3) {
      return null;
    }
    const hasStroke = force || (props.stroke !== undefined && props.stroke !== 'none');
    const children = props.children ? restroke(props.children as ReactNode, force, dropChannels) : undefined;

    return cloneElement(child, hasStroke ? { strokeWidth: STROKE } : {}, children);
  });
}

/**
 * Lienzo común del duotono de las ilustraciones: el cuerpo es un contorno de 1,4 con relleno claro por dentro, los
 * detalles son líneas de 1,4 y la pieza clave va en el color primario.
 *
 * @param props Props del SVG; `soft` es la capa clara, `body` las formas con contorno, `cut` las líneas
 *   de detalle y `children` el acento.
 */
export function Svg({ soft: softLayer, body, cut, children, ...props }: IconProps & { soft?: ReactNode; body?: ReactNode; cut?: ReactNode; children?: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-icon=""
      {...props}
    >
      {softLayer && <g {...soft}>{softLayer}</g>}
      {body && (
        <g fill="currentColor" fillOpacity={0.22} stroke="currentColor" strokeWidth={STROKE}>
          {restroke(body)}
        </g>
      )}
      {cut && (
        <g fill="none" stroke="currentColor" strokeWidth={STROKE}>
          {restroke(cut, true, true)}
        </g>
      )}
      {restroke(children)}
    </svg>
  );
}

type Parts = { soft?: ReactNode; body?: ReactNode; cut?: ReactNode; accent?: ReactNode };

/**
 * Crea un ícono con nombre a partir de sus capas.
 *
 * @param name Nombre del ícono.
 * @param parts Capa suave, cuerpo sólido, recortes y acento.
 * @return El componente.
 */
export function icon(name: string, parts: Parts): IconComponent {
  const Component = (props: IconProps) => (
    <Svg soft={parts.soft} body={parts.body} cut={parts.cut} {...props}>
      {parts.accent}
    </Svg>
  );
  Component.displayName = name;

  return Component;
}

/**
 * Crea un glifo de un solo tono hecho de formas llenas y afiladas (flechas, chevrones, más, menos…).
 *
 * @param name Nombre del glifo.
 * @param shapes Formas llenas.
 * @return El componente.
 */
export function glyph(name: string, shapes: ReactNode): IconComponent {
  const Component = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true" data-icon="" {...props}>
      {shapes}
    </svg>
  );
  Component.displayName = name;

  return Component;
}

/** Grosor único del lenguaje de línea. */
export const LINE = 1.4;

/** Una pieza de un ícono de línea: el `d` de un trazo o elementos SVG ya armados. */
type LinePart = string | ReactNode;

/**
 * Convierte una pieza en elementos: un texto es el `d` de un trazo.
 *
 * @param part Pieza del ícono.
 * @return Los elementos SVG.
 */
const toNodes = (part: LinePart): ReactNode => (typeof part === 'string' ? <path d={part} /> : part);

/**
 * Crea un ícono del lenguaje «línea de hoja»:
 *
 * - Un solo trazo de 1,4, puntas y uniones redondas, sin rellenos, en la cuadrícula de 24 × 24 con 2,5 de
 *   margen.
 * - El cuerpo va en el color del ícono (`--icon`, la tinta del tema) y la pieza clave en el
 *   color primario (`ACCENT`). El cuerpo se corta (hueco de 1,5 a 2) donde empieza el acento, así se leen
 *   como dos trazos y no como uno pintado a medias.
 * - Contenedores con esquina de hoja: arriba a la izquierda y abajo a la derecha redondas (radio 4) y las
 *   otras dos casi rectas (radio 1), la firma de Marco UI (`leafRect`).
 * - Firma: cuando el ícono no tiene una pieza clave obvia, el acento es una hoja abierta (`leafStroke`),
 *   nunca la esquina en ángulo recto de otros sistemas.
 *
 * @param name Nombre del ícono.
 * @param body Trazos del cuerpo.
 * @param accentPart Trazos del acento.
 * @return El componente.
 */
export function line(name: string, body: LinePart, accentPart?: LinePart): IconComponent {
  const Component = (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={LINE}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-icon=""
      {...props}
    >
      {toNodes(body)}
      {accentPart !== undefined && <g stroke={ACCENT}>{toNodes(accentPart)}</g>}
    </svg>
  );
  Component.displayName = name;

  return Component;
}

/**
 * Hoja abierta (la firma del lenguaje de línea): dos curvas que se juntan en punta, la firma de Marco UI.
 *
 * @param x Base de la hoja (donde nace el tallo).
 * @param y Base de la hoja.
 * @param len Largo de la hoja.
 * @param rotate Giro en grados (0 = punta hacia arriba).
 * @return El `d` del trazo, ya girado y trasladado.
 */
export const leafStroke = (x: number, y: number, len = 5, rotate = 45): string => {
  const rad = (rotate * Math.PI) / 180;
  const w = len * 0.42;
  const pt = (px: number, py: number): string => {
    const rx = px * Math.cos(rad) - py * Math.sin(rad) + x;
    const ry = px * Math.sin(rad) + py * Math.cos(rad) + y;

    return `${rx.toFixed(2)} ${ry.toFixed(2)}`;
  };

  return `M${pt(0, 0)}C${pt(w, -len * 0.3)} ${pt(w, -len * 0.75)} ${pt(0, -len)}C${pt(-w, -len * 0.75)} ${pt(-w, -len * 0.3)} ${pt(0, 0)}Z`;
};
