"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { getIniciarProyectoDesktopLayout } from "./iniciarProyectoFlotanteLayout";

const subscribeNothing = () => () => {};

const DESKTOP_MEDIA = "(min-width: 36rem)";

function useIsClient() {
  return useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );
}

type Props = {
  children: ReactNode;
};

export default function IniciarProyectoFlotante({ children }: Props) {
  const [visible, setVisible] = useState(true);
  const [desktopPos, setDesktopPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const isClient = useIsClient();

  useEffect(() => {
    const footerEl =
      document.querySelector<HTMLElement>("footer[data-footer]") ??
      document.querySelector<HTMLElement>("footer");
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
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

  const button = (
    <Link
      href="/contactar"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className="hover:bg-brand-yellow/75 active:bg-brand-yellow/75 bg-brand-yellow focus-visible:ring-brand-yellow/75 xs:bottom-auto xs:translate-x-0 max-xs:bottom-[max(1.25rem,env(safe-area-inset-bottom))] max-xs:left-1/2 max-xs:-translate-x-1/2 fixed z-100 box-border flex h-10 w-52 items-center justify-center rounded-sm px-4 shadow-[0_10px_28px_rgba(0,0,0,0.45)] transition-[top,left,transform,background-color] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none active:translate-y-px motion-safe:active:scale-95 motion-reduce:transition-none"
      style={{
        visibility: visible ? "visible" : "hidden",
        pointerEvents: visible ? "auto" : "none",
        ...(desktopPos
          ? {
              top: desktopPos.top,
              left: desktopPos.left,
            }
          : {}),
      }}
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
