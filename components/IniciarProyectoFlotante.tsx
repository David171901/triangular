// # TODO: review code
"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const subscribeNothing = () => () => {};

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
  const rangoRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const isClient = useIsClient();

  useEffect(() => {
    const el = rangoRef.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.visualViewport?.height ?? window.innerHeight;
      const intersects = r.bottom > 0.5 && r.top < vh - 0.5;
      setVisible(intersects);
    };

    const schedule = () => {
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("scroll", schedule);

    return () => {
      window.removeEventListener("scroll", schedule, { capture: true });
      window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("scroll", schedule);
    };
  }, []);

  const button = (
    <Link
      href="/contactar"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className="text-brand-deep hover:bg-brand-yellow/90 active:bg-brand-yellow/85 bg-brand-yellow focus-visible:ring-brand-yellow/80 font-axiforma fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-100 box-border flex h-10 w-[200px] -translate-x-1/2 items-center justify-center rounded-[5px] px-[17px] text-[14px] leading-none font-bold tracking-[0.02em] uppercase not-italic shadow-[0_10px_28px_rgba(0,0,0,0.45)] transition-[transform,background-color] [leading-trim:both] [text-edge:cap_alphabetic] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none active:translate-y-px motion-safe:active:scale-[0.99]"
      style={{
        visibility: visible ? "visible" : "hidden",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      INICIAR UN PROYECTO
    </Link>
  );

  return (
    <>
      <div ref={rangoRef} className="flex w-full flex-col">
        {children}
      </div>
      {isClient ? createPortal(button, document.body) : null}
    </>
  );
}
