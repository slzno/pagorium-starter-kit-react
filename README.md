# Marco UI

Sistema de diseño de código abierto de **Pagorium** para aplicaciones internas y de gestión, hecho con
React 19, Next.js, Tailwind CSS 4 y Radix (sobre la base de shadcn/ui).

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
| `app/marco.css` | Tokens, temas, tablas, esqueletos y alineación claro/oscuro. |
| `components/ui` | Primitivos (botón, campos, select, diálogo, tabla, pestañas…). |
| `components/icons` | Íconos de línea con los nombres de Lucide e ilustraciones. |
| `components/marco` | Composiciones: listas, fichas, formularios, esqueletos, pantallas de estado, cabecera. |
| `app/page.tsx` | Documentación y ejemplos de todo. |

## Uso

```bash
npm install
npm run dev
```

Abre http://localhost:3000 para ver la documentación con todos los componentes.

## Licencia

MIT © 2025-2026 Pagorium. Ver [LICENSE](LICENSE).
