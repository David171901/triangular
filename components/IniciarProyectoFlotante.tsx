"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { getIniciarProyectoDesktopLayout } from "./iniciarProyectoFlotanteLayout";

const subscribeNothing = () => () => {};

const DESKTOP_MEDIA = "(min-width: 36rem)";

const EXIT_ANIMATION_SUBSTRINGS = [
  "iniciar-proyecto-float-exit-desktop",
  "iniciar-proyecto-float-exit-mobile",
];

function useIsClient() {
  return useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );
}

function subscribeDesktopMq(onStoreChange: () => void) {
  const mq = window.matchMedia(DESKTOP_MEDIA);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getDesktopMqSnapshot(): boolean {
  return window.matchMedia(DESKTOP_MEDIA).matches;
}

function useMediaMinWidthXs(): boolean {
  return useSyncExternalStore(
    subscribeDesktopMq,
    getDesktopMqSnapshot,
    () => false,
  );
}

type Props = {
  children: ReactNode;
};

export default function IniciarProyectoFlotante({ children }: Props) {
  const [wantShow, setWantShow] = useState(true);
  const [exitPhase, setExitPhase] = useState<"idle" | "running" | "complete">(
    "idle",
  );
  const [desktopPos, setDesktopPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const isClient = useIsClient();
  const isDesktopLayout = useMediaMinWidthXs();
  const wantShowRef = useRef(wantShow);

  useEffect(() => {
    wantShowRef.current = wantShow;
  }, [wantShow]);

  useEffect(() => {
    const footerEl =
      document.querySelector<HTMLElement>("footer[data-footer]") ??
      document.querySelector<HTMLElement>("footer");
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const show = !entry?.isIntersecting;
        wantShowRef.current = show;
        setWantShow(show);

        if (show) {
          setExitPhase("idle");
          return;
        }

        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        setExitPhase((prev) => {
          if (reduceMotion) return "complete";
          if (prev === "complete") return "complete";
          return "running";
        });
      },
      { threshold: 0 },
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  const updateDesktopPosition = useCallback(() => {
    const mq = window.matchMedia(DESKTOP_MEDIA);
    if (!mq.matches) {
      setDesktopPos(null);
      return;
    }

    const anchor = document.querySelector<HTMLElement>("[data-site-container]");
    const hero = document.querySelector<HTMLElement>("[data-hero-section]");
    if (!anchor) {
      setDesktopPos(null);
      return;
    }

    const layout = getIniciarProyectoDesktopLayout();
    const rect = anchor.getBoundingClientRect();
    const left = rect.left + layout.leftOffsetPx;
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const heroH = hero?.offsetHeight ?? vh;
    const btnH = 40;
    const rootFont =
      typeof CSS !== "undefined"
        ? Number.parseFloat(
            getComputedStyle(document.documentElement).fontSize || "16",
          )
        : 16;
    const stickyTop = Math.max(layout.stickyTopPx, rootFont);

    const centerTop = vh / 2 - btnH / 2 + layout.centerOffsetPx;
    const transitionEnd = Math.min(
      vh * layout.transitionVhFrac,
      heroH * layout.transitionHeroFrac,
      layout.transitionMaxPx,
    );
    const t =
      transitionEnd <= 0
        ? 1
        : Math.min(1, Math.max(0, scrollY / transitionEnd));
    const top = centerTop + (stickyTop - centerTop) * t;

    setDesktopPos({ top, left });
  }, []);

  useLayoutEffect(() => {
    if (!isClient) return;

    const mq = window.matchMedia(DESKTOP_MEDIA);
    let raf = 0;

    const schedule = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = 0;
        updateDesktopPosition();
      });
    };

    schedule();

    const onMqChange = () => schedule();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mq.addEventListener("change", onMqChange);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mq.removeEventListener("change", onMqChange);
    };
  }, [isClient, updateDesktopPosition]);

  const hideAfterExit = exitPhase === "complete";
  const isExitAnimating = exitPhase === "running";

  function handleExitAnimationEnd(e: React.AnimationEvent<HTMLAnchorElement>) {
    if (!EXIT_ANIMATION_SUBSTRINGS.some((s) => e.animationName.includes(s))) {
      return;
    }
    if (wantShowRef.current) {
      setExitPhase("idle");
      return;
    }
    setExitPhase("complete");
  }

  const exitClass =
    isExitAnimating && isDesktopLayout
      ? "iniciar-proyecto-float-exit-desktop motion-safe:transition-none"
      : isExitAnimating && !isDesktopLayout
        ? "iniciar-proyecto-float-exit-mobile motion-safe:transition-none"
        : "";

  const button = (
    <Link
      href="/contactar"
      tabIndex={wantShow && exitPhase === "idle" ? 0 : -1}
      aria-hidden={!wantShow || hideAfterExit}
      className={`hover:bg-brand-yellow/75 active:bg-brand-yellow/75 bg-brand-yellow focus-visible:ring-brand-yellow/75 xs:bottom-auto max-xs:left-1/2 max-xs:bottom-[max(1.25rem,env(safe-area-inset-bottom))] fixed z-100 box-border flex h-10 w-52 items-center justify-center rounded-sm px-4 shadow-[0_10px_28px_rgba(0,0,0,0.45)] transition-[top,left,background-color] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none active:translate-y-px motion-safe:active:scale-95 motion-reduce:transition-none ${wantShow && exitPhase !== "running" ? "xs:translate-x-0 max-xs:-translate-x-1/2" : ""} ${exitClass}`}
      style={{
        visibility: hideAfterExit ? "hidden" : "visible",
        pointerEvents: wantShow && exitPhase === "idle" ? "auto" : "none",
        ...(desktopPos
          ? {
              top: desktopPos.top,
              left: desktopPos.left,
            }
          : {}),
      }}
      onAnimationEnd={handleExitAnimationEnd}
    >
      <span className="text-brand-deep font-axiforma text-sm leading-none font-bold tracking-wide uppercase not-italic [leading-trim:cap-height] [text-edge:cap_alphabetic]">
        Iniciar un proyecto
      </span>
    </Link>
  );

  return (
    <>
      <div className="relative flex w-full flex-col">{children}</div>
      {isClient ? createPortal(button, document.body) : null}
    </>
  );
}
