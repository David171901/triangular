// # TODO: review code
"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import {
  type ReactNode,
  useEffect,
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
  const [visible, setVisible] = useState(true);
  const isClient = useIsClient();

  useEffect(() => {
    const footerEl =
      document.querySelector<HTMLElement>("footer[data-footer]") ??
      document.querySelector<HTMLElement>("footer");
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // En cuanto el footer entra al viewport, ocultar el botón.
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  const button = (
    <Link
      href="/contactar"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className="text-brand-deep hover:bg-brand-yellow/75 active:bg-brand-yellow/85 bg-brand-yellow focus-visible:ring-brand-yellow/80 font-axiforma xs:hidden fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-100 box-border flex h-10 w-52 -translate-x-1/2 items-center justify-center rounded-sm px-4 text-sm leading-none font-bold tracking-wide uppercase not-italic shadow-[0_10px_28px_rgba(0,0,0,0.45)] transition-[transform,background-color] [leading-trim:both] [text-edge:cap_alphabetic] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none active:translate-y-px motion-safe:active:scale-[0.99]"
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
      <div className="relative flex w-full flex-col">{children}</div>
      {isClient ? createPortal(button, document.body) : null}
    </>
  );
}
