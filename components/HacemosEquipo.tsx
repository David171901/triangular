"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HacemosEquipo() {
  const copyBlockRef = useRef<HTMLDivElement | null>(null);
  const [copyVisible, setCopyVisible] = useState(false);

  useEffect(() => {
    const el = copyBlockRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setCopyVisible(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-label="Hacemos equipo con tu marca"
      className="relative isolate z-10 -mt-px w-full"
    >
      <div className="xs:aspect-1920/1904 relative aspect-430/1003 w-full">
        <div
          className="bg-brand-deep pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          <Image
            src="/images/HACEMOS_EQUIPO.png"
            alt=""
            fill
            sizes="(max-width: 639px) 100vw, 0px"
            className="xs:hidden object-cover object-top"
          />
          <Image
            src="/images/HACEMOS_EQUIPO_DESKTOP.png"
            alt=""
            fill
            sizes="(min-width: 640px) 100vw, 0px"
            className="xs:block hidden object-cover object-center"
          />
        </div>

        <div
          aria-hidden
          className="from-brand-violet-night xs:h-28 pointer-events-none absolute inset-x-0 top-0 z-5 h-24 bg-linear-to-b to-transparent"
        />
        <div
          aria-hidden
          className="to-brand-violet-ink xs:h-28 pointer-events-none absolute inset-x-0 bottom-0 z-5 h-24 bg-linear-to-b from-transparent"
        />
        <div className="absolute inset-0 z-10">
          <div className="xs:container xs:mx-auto xs:items-center xs:justify-end xs:px-0 xs:pt-0 flex h-full w-full items-start justify-center px-6 pt-28">
            <div
              ref={copyBlockRef}
              className="xs:items-end xs:text-right flex max-w-[520px] flex-col items-center text-center"
            >
              <h2 className="text-brand-purple xs:text-5xl xs:leading-11 mb-6 font-sans text-4xl leading-9 font-normal -tracking-widest whitespace-pre-line uppercase not-italic [leading-trim:both] [text-edge:cap_alphabetic] lg:text-7xl lg:leading-16 lg:-tracking-widest">
                <span className="xs:hidden block">{`HACEMOS \nEQUIPO CON \nTU MARCA`}</span>
                <span
                  className={clsx(
                    "xs:block hidden",
                    copyVisible
                      ? "hacemos-equipo-desktop-entrance motion-reduce:animate-none"
                      : "opacity-0",
                  )}
                >
                  HACEMOS {"\n"}EQUIPO CON {"\n"}TU MARCA
                </span>
              </h2>
              <p className="font-axiforma text-brand-white xs:text-right xs:text-base xs:leading-6 text-center text-base leading-6 font-normal tracking-normal whitespace-pre-line not-italic [leading-trim:both] [text-edge:cap_alphabetic] lg:text-lg lg:leading-6">
                <span className="xs:hidden block">
                  {" "}
                  Démosle vida a tu proyecto {"\n"}uniendo tu visión con nuestra{" "}
                  {"\n"}creatividad y experiencia.
                </span>
                <span
                  className={clsx(
                    "xs:block hidden",
                    copyVisible
                      ? "hacemos-equipo-desktop-entrance hacemos-equipo-desktop-entrance--delayed motion-reduce:animate-none"
                      : "opacity-0",
                  )}
                >
                  Démosle vida a tu proyecto uniendo tu visión {"\n"}con nuestra
                  creatividad y experiencia.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
