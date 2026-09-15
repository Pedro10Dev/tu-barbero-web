# DESIGN — TuBarbero · Sistema "La Imprenta"

Sistema visual unificado para landing (Blade) y app de gestión (React/Inertia).
Frontend de la app: `resources/js/pages/*`, `resources/js/components/*`.
CSS compartido: `resources/css/app.css` (Tailwind v4, un único `@theme` y bloques `:root` / `.dark`).

## Principio

La barbería es una imprenta: cada pantalla es una **hoja** (papel hueso al claro,
tinta al oscuro) compuesta por **tipografía**, **cifras en monoespaciado** y
**reglas de 1px** (hairlines). Un solo acento cálido — el **oliva maderoso** — marca
lo que está vivo o en curso. El ladrillo desaturado solo existe como estado
(destructivo/error). Sin tarjetas píldora, sin sombras, sin cristal, sin texto degradado.

## Tokens (`resources/css/app.css`)

Paleta de estado (`oklch`):

| Rol | Claro | Oscuro |
|---|---|---|
| brand (acento único) | `0.48 0.09 66` | `0.78 0.08 66` |
| success | `0.5 0.09 70` | `0.8 0.09 70` |
| warning | `0.56 0.1 75` | `0.8 0.1 75` |
| info | `0.48 0.035 250` | `0.78 0.035 250` |
| destructive | `0.55 0.13 27` | `0.68 0.13 27` |

- Superficies: claro `--background 0.972 0.004 88` (hueso), tarjetas `0.985`; oscuro `--background 0.145 0.008 258` (tinta), tarjetas `0.18`.
- Texto: claro `foreground 0.225` / `muted-foreground 0.46` (≥4.5:1); oscuro `0.985` / `0.745`.
- Borde/regla: claro `0.868 0.006 90`, oscuro `0.34 0.008 258` (donde aplica, hue en 258 neutro).
- `--radius: 0.25rem` — esquinas casi cuadradas, nunca píldora.
- **Riel lateral (sidebar) siempre tinta** en ambos modos: `--sidebar 0.16 0.008 258`, foreground hueso.
- Landing conserva su propio bloque `--color-landing-*` (fondo tinta + `landing-success 0.72 0.075 66`); no se toca al editar la app.

Contraste: los tonos de estado de la app fueron elegidos para texto pequeño en
modo claro (≥4.5:1 sobre hueso). No oscurecer el texto de estado bajo el pretexto
de "diseñar" — rompe WCAG AA.

## Tipografía (`vite.config.ts` → plugin bunny)

- **Instrument Serif** — displays y nombres de cliente (títulos de página, ticket del próximo turno).
- **Instrument Sans** — cuerpo e interfaz.
- **JetBrains Mono** — cifras, kickers, etiquetas, fechas, botones de acción, precios. Las cifras deben ir con `tabular-nums` (`tabular`).

Roles: kickers/etiquetas → `font-mono text-[10px]–[11px] tracking-[0.14em]–[0.2em] uppercase`.

## Composición de dashboard — "La Bitácora del Día"

Ambos dashboards (`barber` y `admin`) usan la misma gramática de hoja:

1. **Encabezado** (`PageHeader`): saludo en serif + hairline + acciones (botón sólido = acción primaria).
2. **Cinta dateline**: strip `border-y border-border`, kickers mono con separadores verticales `h-3.5 w-px`, una marca cuadrada oliva junto a la fecha. Contenido: fecha de hoy, horario `9:00 — 20:00`, conteos del día.
3. **Ticket del próximo turno** (solo barber): tarjeta con **regla oliva 1px** en el borde izquierdo (única marca cálida de la hoja), hora en mono 4xl–5xl + nombre en serif, caja de reloj con borde hairline, chip mono `Confirmado`.
    - _Usar una sola marca cálida por hoja_: si ya hay ticket oliva, no añadir más acentos cálidos fuera de él.
4. **Cinta de cifras** (`StatCard`): `grid grid-cols-2 gap-px border bg-border lg:grid-cols-4/5` — las celdas `bg-card` y el contenedor `bg-border` producen reglas hairline entre celdas. Cada celda: label mono, cifra `text-3xl` mono tabular, caja de icono con `border-brand/30`, opcional sparkline `strokeWidth 1.5` y delta `text-success`/`text-destructive`.
5. **Ledger + diario**: dos columnas (`lg:grid-cols-7`, 4/3) — sección de filas con `divide-y divide-border` bajo cabecera; en barber, filas de pendientes con hora mono + cliente + **chops** ACCEPT (oliva sólido) / RECHAZAR (hairline → ladrillo solo en hover destino). Diario de actividad: timeline con puntos `size-2` + raíz `w-px bg-border`.
6. **Vacíos**: título completo en mono uppercase + línea de ayuda en muted; icono alineado con el sistema (colores de estado, no brand).

## Reglas de los componentes

- `StatCard` — sin borde propio; se divide sola por hairline del contenedor.
- `PageHeader` — serif + hairline inferior + `actions`.
- `nav-main` — item activo con tick oliva `size-1 bg-brand` (y sub-item activo); grupos y labels en mono uppercase.
- `app-sidebar-header` — kicker de sección en mono uppercase con tick oliva.
- `app-logo` / `app-sidebar` — esquinas cuadradas, sin sombra.
- `charts.tsx` — sparkline hairline `strokeWidth 1.5`; sin ejes ni gradientes contundentes.
- `app.tsx` — barra de progreso Inertia en el oliva (`oklch(0.62 0.1 66)`).

## Acciones y datos

- Acciones de pendientes preservadas: `router.patch('/agenda/appointments/{id}', { action })` con `accept` | `reject`.
- Estado de cita: `resources/js/lib/status.ts` (`appointmentStatus`, `activityTone`). El chip de estado = mono uppercase con **punto de color** únicamente (sin fondo).
- Fechas: `formatTimeAMPM` / `formatDateTimeAMPM` manejan cadenas `"d/m/Y H:i"` (split por espacio).
- Copy siempre en español venezolano (es-VE).

## Alcance

Entregado: shell (sidebar/layout/registro de navegación), `dashboard` (barbero) y
`admin/dashboard` (administración) unificados al sistema. Landing, booking, auth,
settings y páginas CRUD consumen los mismos tokens y heredan el sistema sin
reescritura; `app-header.tsx` está sin uso (starter cruft, no borrado).