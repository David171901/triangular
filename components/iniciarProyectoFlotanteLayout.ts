/**
 * Ajuste del botón «INICIAR UN PROYECTO» solo en desktop (≥ `xs` = 36rem del tema).
 *
 * Modifica aquí los valores por breakpoint. El orden importa: se usa el **primer**
 * `media` que coincida al evaluar de arriba hacia abajo (de pantalla más ancha a más estrecha).
 *
 * Breakpoints alineados con Tailwind por defecto + `xs` del proyecto (`globals.css`):
 * - `2xl` → min-width: 96rem (1536px)
 * - `xl`  → min-width: 80rem (1280px)
 * - `lg`  → min-width: 64rem (1024px)
 * - `md`  → min-width: 48rem (768px)
 * - `sm`  → min-width: 40rem (640px)
 * - `xs`  → min-width: 36rem (576px), custom en `@theme`
 */
export type IniciarProyectoDesktopLayout = {
  /** Etiqueta solo para comentarios / depuración. */
  label: string;
  /** Media query `min-width` (debe ser desktop; la más ancha va primero en la lista). */
  media: string;
  /** Top del viewport cuando el botón ya está “pegado” arriba (px). */
  stickyTopPx: number;
  /**
   * Suma al centro vertical inicial: `viewportHeight/2 - alturaBotón/2 + centerOffsetPx`.
   * Negativo sube el botón en el estado inicial centrado.
   */
  centerOffsetPx: number;
  /** Suma al `left` medido del contenedor `[data-site-container]`. */
  leftOffsetPx: number;
  /** `transitionEnd = min(vh * a, heroH * b, maxPx)` — controla cuánto scroll anima el paso centro → arriba. */
  transitionVhFrac: number;
  transitionHeroFrac: number;
  transitionMaxPx: number;
};

const BASE: Omit<IniciarProyectoDesktopLayout, "label" | "media"> = {
  stickyTopPx: 36,
  centerOffsetPx: 0,
  leftOffsetPx: 0,
  transitionVhFrac: 0.42,
  transitionHeroFrac: 0.38,
  transitionMaxPx: 320,
};

export const INICIAR_PROYECTO_DESKTOP_LAYOUTS: IniciarProyectoDesktopLayout[] =
  [
    {
      label: "2xl",
      media: "(min-width: 96rem)",
      ...BASE,
      centerOffsetPx: 48,
    },
    {
      label: "xl",
      media: "(min-width: 80rem)",
      ...BASE,
      centerOffsetPx: 32,
    },
    {
      label: "lg",
      media: "(min-width: 64rem)",
      ...BASE,
    },
    {
      label: "md",
      media: "(min-width: 48rem)",
      ...BASE,
      centerOffsetPx: -100,
    },
    {
      label: "sm",
      media: "(min-width: 40rem)",
      ...BASE,
      centerOffsetPx: -72,
      stickyTopPx: 24,
    },
    {
      label: "xs",
      media: "(min-width: 36rem)",
      ...BASE,
      centerOffsetPx: -144,
      stickyTopPx: 16,
    },
  ];

export function getIniciarProyectoDesktopLayout(): IniciarProyectoDesktopLayout {
  if (typeof window === "undefined") {
    return INICIAR_PROYECTO_DESKTOP_LAYOUTS[
      INICIAR_PROYECTO_DESKTOP_LAYOUTS.length - 1
    ]!;
  }
  for (const row of INICIAR_PROYECTO_DESKTOP_LAYOUTS) {
    if (window.matchMedia(row.media).matches) {
      return row;
    }
  }
  return INICIAR_PROYECTO_DESKTOP_LAYOUTS[
    INICIAR_PROYECTO_DESKTOP_LAYOUTS.length - 1
  ]!;
}
