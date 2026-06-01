# Pagorium Starter Kit React

Plantilla de código abierto de **Pagorium** para arrancar aplicaciones internas y de gestión, al estilo de
los starter kits de Laravel: diseño, componentes, íconos y pantallas listos, hechos con React 19, Next.js,
Tailwind CSS 4 y Radix (sobre la base de shadcn/ui). Es neutra: no trae lógica de ningún negocio.

## La idea

- **Marco salvia, tarjetas blancas.** Las secciones van en un marco salvia y lo que se lee o se edita va en
  tarjetas blancas dentro. Las tablas son filas tarjeta separadas.
- **Íconos «línea de hoja».** Un solo trazo de 1,4 en la tinta del ícono y la pieza clave en el verde de la
  marca; contenedores con esquina de hoja.
- **Medidas parejas.** Botones y campos de 46 px, contenedor de 1500 px, tipografía Plus Jakarta Sans.
- **Claro, oscuro y verde.** Los tres temas con la misma jerarquía de superficies.
- **Carga sin saltos.** Esqueletos de lista, ficha y formulario, y filas con brillo al filtrar.

## Estructura

| Carpeta | Contenido |
|---|---|
| `app/theme.css` | Tokens, temas, tablas, esqueletos y alineación claro/oscuro. |
| `components/ui` | Primitivos (botón, campos, select, diálogo, tabla, pestañas…). |
| `components/icons` | Íconos de línea con los nombres de Lucide e ilustraciones. |
| `components/kit` | Composiciones: cabecera y navegación, listas, fichas, formularios, esqueletos, búsqueda rápida, avisos, recorrido y pantallas de estado. |
| `components/brands` | Logo del starter kit (`StarterKitLogo`, `StarterKitMark`), logo de Pagorium y la firma «Hecho por Pagorium». |
| `app/page.tsx` | Documentación y ejemplos de todo. |
| `app/codigo` | Ruta estática que entrega el código de la plantilla para copiarlo desde la documentación. |
| `app/ejemplos` | Pantallas completas: inicio de sesión, error y sistema cerrado. |

## Uso

```bash
npm install
npm run dev
```

Abre http://localhost:3000 para ver la documentación con todos los componentes. Cada sección tiene un botón
**Código** con el ejemplo de uso y los archivos para copiar; la sección **Tema** copia los tokens (para
cualquier proyecto con shadcn) o el CSS completo, y el **Catálogo** abre el código de cualquier archivo.

## Licencia

MIT © 2025-2026 [Pagorium](https://pagorium.com). Ver [LICENSE](LICENSE).
