"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

/** Interpolación hacia el objetivo cada frame (más bajo = más inercia / más suave). */
const SMOOTH_LERP = 0.09;
const SNAP_PX = 0.35;

export default function QuienesSomos() {
  const sectionRef = useRef<HTMLElement>(null);
  const firstImageRef = useRef<HTMLDivElement>(null);
  const lastImageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const targetTopPxRef = useRef<number | null>(null);
  const smoothTopPxRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    /**
     * Progreso del scroll dentro de la sección [0, 1]:
     * 0 = inicio (tope de la sección alineado con el viewport de forma natural al entrar),
     * 1 = fin (se ha recorrido todo el rango útil de scroll de la sección).
     * Usa la altura real de la sección (suma de imágenes) frente al viewport.
     */
    const computeTargetTop = () => {
      const section = sectionRef.current;
      const firstEl = firstImageRef.current;
      const lastEl = lastImageRef.current;
      const overlay = overlayRef.current;
      if (!section || !firstEl || !lastEl || !overlay) return null;

      const sectionRect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrollIntoSection = Math.max(0, -sectionRect.top);
      const maxScroll = Math.max(1, sectionHeight - windowHeight);
      const progress = Math.min(1, scrollIntoSection / maxScroll);

      const rFirst = firstEl.getBoundingClientRect();
      const rLast = lastEl.getBoundingClientRect();
      const centerFirst = rFirst.top + rFirst.height / 2;
      const centerLast = rLast.top + rLast.height / 2;

      const targetCenterY = centerFirst + (centerLast - centerFirst) * progress;

      const overlayH = overlay.offsetHeight;
      return targetCenterY - overlayH / 2;
    };

    const applySmoothTop = () => {
      const el = overlayRef.current;
      const target = targetTopPxRef.current;
      if (el == null || target == null) {
        rafIdRef.current = null;
        return;
      }

      let smooth = smoothTopPxRef.current;
      if (smooth == null) smooth = target;

      smooth += (target - smooth) * SMOOTH_LERP;
      smoothTopPxRef.current = smooth;

      if (Math.abs(target - smooth) <= SNAP_PX) {
        smooth = target;
        smoothTopPxRef.current = target;
        el.style.top = `${smooth}px`;
        rafIdRef.current = null;
        return;
      }

      el.style.top = `${smooth}px`;
      rafIdRef.current = requestAnimationFrame(applySmoothTop);
    };

    const update = () => {
      const next = computeTargetTop();
      if (next == null) return;

      targetTopPxRef.current = next;

      if (rafIdRef.current == null) {
        rafIdRef.current = requestAnimationFrame(applySmoothTop);
      }
    };

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const resizeTargets = [
      sectionRef.current,
      firstImageRef.current,
      lastImageRef.current,
      overlayRef.current,
    ].filter(Boolean) as Element[];

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => update())
        : null;
    if (ro) {
      for (const el of resizeTargets) {
        ro.observe(el);
      }
    }

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro?.disconnect();
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full flex flex-col">
      <div
        ref={overlayRef}
        className="fixed z-10 w-1/2 pl-6 will-change-[top]"
        style={{ top: 0, left: 0 }}
      >
        <h2 className="font-sans font-normal not-italic text-4xl leading-10 -tracking-widest uppercase text-brand-cyan [text-edge:cap_alphabetic] [leading-trim:both]">
          ¿Quiénes somos?
        </h2>
        <p className="font-axiforma font-medium not-italic text-base leading-6 -tracking-wide text-brand-white [text-edge:cap_alphabetic] [leading-trim:both]">
          En Triangular, unimos experiencia en ingeniería, publicidad y UX/UI
          para crear estrategias que sumen valor a tu marca.
        </p>
      </div>

      <div className="relative flex flex-col w-full">
        <div ref={firstImageRef} className="relative w-full">
          <Image
            src="/images/IMG_CHICO_LENTES.png"
            alt="Integrante del equipo"
            className="w-full"
            sizes="100vw"
            width={430}
            height={760}
          />
        </div>

        <div className="relative w-full">
          <Image
            src="/images/IMG_CHICA.png"
            alt="Integrante del equipo"
            className="w-full"
            sizes="100vw"
            width={430}
            height={760}
          />
        </div>

        <div ref={lastImageRef} className="relative w-full overflow-hidden">
          <Image
            src="/images/IMG_CHICO.png"
            alt="Integrante del equipo"
            className="w-full"
            sizes="100vw"
            width={430}
            height={760}
          />
        </div>
      </div>
    </section>
  );
}
