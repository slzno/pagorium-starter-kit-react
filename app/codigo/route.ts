import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/** Carpetas y archivos cuyo código se publica en la documentación para copiarlo (los ejemplos primero). */
const CARPETAS = ['app/_docs/ejemplos', 'components/ui', 'components/kit', 'components/icons', 'components/brands', 'hooks'];
const SUELTOS = ['lib/utils.ts', 'app/theme.css'];

/**
 * Lee el código de todos los componentes, hooks, utilidades y el tema. Es síncrono y determinista, así que
 * Next genera la respuesta estática al compilar.
 *
 * @return Mapa de ruta relativa a contenido.
 */
function leerFuentes(): Record<string, string> {
  const raiz = process.cwd();
  const fuentes: Record<string, string> = {};

  for (const carpeta of CARPETAS) {
    for (const archivo of readdirSync(join(/* turbopackIgnore: true */ raiz, carpeta)).sort()) {
      if (/\.(tsx?|css)$/.test(archivo)) {
        fuentes[`${carpeta}/${archivo}`] = readFileSync(join(/* turbopackIgnore: true */ raiz, carpeta, archivo), 'utf8');
      }
    }
  }

  for (const archivo of SUELTOS) {
    fuentes[archivo] = readFileSync(join(/* turbopackIgnore: true */ raiz, archivo), 'utf8');
  }

  return fuentes;
}

/**
 * Entrega el código fuente de la plantilla en JSON para el visor de código de la documentación.
 *
 * @return Respuesta JSON con `{ ruta: contenido }`.
 */
export async function GET(): Promise<Response> {
  return Response.json(leerFuentes());
}
