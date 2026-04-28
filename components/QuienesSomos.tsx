"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

const DESKTOP_MQ = "(min-width: 36rem)";

function computeOverlayTop(
  section: HTMLElement,
  firstEl: HTMLElement,
  lastEl: HTMLElement,
  overlay: HTMLElement,
): number {
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
}

function Mobile({
  firstImageRef,
  lastImageRef,
  overlayRef,
}: {
  firstImageRef: React.RefObject<HTMLDivElement | null>;
  lastImageRef: React.RefObject<HTMLDivElement | null>;
  overlayRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="xs:hidden flex w-full flex-col">
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 z-10 w-1/2 pl-6 will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <h2 className="text-brand-cyan mb-8 font-sans text-4xl leading-9 font-normal -tracking-widest uppercase not-italic [leading-trim:both] [text-edge:cap_alphabetic]">
          ¿Quiénes somos?
        </h2>
        <p className="font-axiforma text-brand-white text-base leading-6 font-medium -tracking-wide not-italic [leading-trim:both] [text-edge:cap_alphabetic]">
          En Triangular, unimos experiencia en ingeniería, publicidad y UX/UI
          para crear estrategias que sumen valor a tu marca.
        </p>
      </div>

      <div className="relative flex w-full flex-col">
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
    </div>
  );
}

function Desktop() {
  return (
    <div className="xs:grid xs:grid-cols-3 xs:items-stretch xs:gap-8 hidden">
      <div className="xs:pb-0 xs:pt-64 flex flex-col gap-32 py-20 lg:pt-96">
        <div className="relative w-full">
          <Image
            src="/images/IMG_CHICO_LENTES.png"
            alt="Integrante del equipo"
            className="w-full"
            sizes="100vw"
            width={430}
            height={760}
          />
        </div>
        <div className="relative w-full overflow-hidden">
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
      <div className="min-h-0">
        <div className="xs:sticky xs:top-[30vh] xs:mb-0 min-h-0">
          <h2 className="text-brand-cyan mb-8 text-center font-sans text-5xl leading-11 font-normal -tracking-widest uppercase not-italic [leading-trim:cap-height] [text-edge:cap_alphabetic] lg:text-7xl lg:leading-16">
            ¿Quiénes somos?
          </h2>
          <p className="font-axiforma text-brand-white text-center text-base leading-6 font-normal tracking-normal whitespace-pre-line not-italic [leading-trim:both] [text-edge:cap_alphabetic] lg:text-xl lg:leading-7 lg:tracking-normal lg:[leading-trim:cap-height]">
            <span className="block lg:hidden">
              En Triangular, unimos experiencia en ingeniería, publicidad y
              UX/UI para crear estrategias que sumen valor a tu marca.
            </span>
            <span className="hidden lg:block">
              En Triangular, unimos experiencia en ingeniería, publicidad y
              UX/UI para crear estrategias que sumen valor a tu marca.
            </span>
          </p>
        </div>
      </div>
      <div className="flex h-full min-h-0 items-center justify-center">
        <div className="relative w-full">
          <Image
            src="/images/IMG_CHICA_I.png"
            alt="Integrante del equipo"
            className="mx-auto w-full max-w-full"
            sizes="(max-width: 36rem) 100vw, 33vw"
            width={430}
            height={760}
          />
        </div>
      </div>
    </div>
  );
}

export default function QuienesSomos() {
  const sectionRef = useRef<HTMLElement>(null);
  const firstImageRef = useRef<HTMLDivElement>(null);
  const lastImageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      if (window.matchMedia(DESKTOP_MQ).matches) return;

      const section = sectionRef.current;
      const firstEl = firstImageRef.current;
      const lastEl = lastImageRef.current;
      const overlay = overlayRef.current;
      if (!section || !firstEl || !lastEl || !overlay) return;

      const next = computeOverlayTop(section, firstEl, lastEl, overlay);
      overlay.style.transform = `translate3d(0, ${next}px, 0)`;
    };

    const scheduleUpdate = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    const onMediaChange = () => {
      requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const mql = window.matchMedia(DESKTOP_MQ);
    mql.addEventListener("change", onMediaChange);

    // Sin observar el overlay: al cambiar transform a veces re-disparaba.
    const resizeTargets = [
      sectionRef.current,
      firstImageRef.current,
      lastImageRef.current,
    ].filter(Boolean) as Element[];

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => scheduleUpdate())
        : null;
    if (ro) {
      for (const el of resizeTargets) {
        ro.observe(el);
      }
    }

    return () => {
      if (rafId != null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      mql.removeEventListener("change", onMediaChange);
      ro?.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-quienes-somos relative z-1 -my-px border-0 shadow-none ring-0 outline-none"
    >
      <Mobile
        firstImageRef={firstImageRef}
        lastImageRef={lastImageRef}
        overlayRef={overlayRef}
      />
      <Desktop />
    </section>
  );
}
