# Triangular — Landing Page (Mobile First)

Landing page para **Triangular**, construida en **Next.js (App Router)** con **Tailwind CSS v4**. El desarrollo está pensado **mobile-first**.

## Requisitos

- Node.js + npm

## Ejecutar en local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Estructura principal

- **Entrada**: `app/page.tsx`
- **Secciones**:
  - `app/components/QuienesSomos.tsx`
  - `app/components/ComoTeAyudamos.tsx` (acordeón)
  - `app/components/Footer.tsx`
- **Assets**: `public/images/`

## Diseño (tokens)

Los tokens se definen en `app/globals.css` usando `@theme inline` (Tailwind v4).

- **Colores (brand)**:
  - `brand-muted`: `#D9D9D9`
  - `brand-deep`: `#2F1B56`
  - `brand-purple`: `#AC40FF`
  - `brand-cyan`: `#3DFFD8`
  - `brand-yellow`: `#FFE945`
  - `brand-white`: `#FFFFFF`
- **Gradiente de sección**:
  - Utilidad: `bg-brand-gradient-section`
- **Fuentes**:
  - `font-sans` → **Geometos**
  - `font-axiforma` → **Axiforma**

> Nota: `leading-trim` / `text-edge` se usan como propiedades arbitrarias en Tailwind y su soporte varía por navegador.

## Scripts

- `npm run dev`: servidor de desarrollo
- `npm run build`: build de producción
- `npm run start`: servir build
