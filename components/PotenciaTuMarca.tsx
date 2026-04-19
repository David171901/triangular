"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const HERO_ROTATIONS = [
  ["CON UNA", "WEB O APP"],
  ["CON DISEÑO", "FUNCIONAL"],
  ["CON MÁS", "ALCANCE"],
  ["CON IDEAS", "EFECTIVAS"],
];

const ROTATION_MS = 1250;

export default function PotenciaTuMarca() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_ROTATIONS.length);
    }, ROTATION_MS);
    return () => window.clearInterval(id);
  }, []);

  const [lineA, lineB] = HERO_ROTATIONS[index];

  return (
    <section aria-label="Potencia tu marca" className="relative isolate w-full">
      <div className="xs:aspect-1920/1538 relative aspect-430/966 w-full">
        <div
          className="bg-brand-deep pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          <Image
            src="/images/HERO_WEB.png"
            alt=""
            fill
            priority
            sizes="(max-width: 639px) 100vw, 0px"
            className="xs:hidden object-cover object-top"
          />
          <Image
            src="/images/HERO_WEB_DESKTOP.png"
            alt=""
            fill
            priority
            sizes="(min-width: 640px) 100vw, 0px"
            className="xs:block hidden object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 z-10 px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(2.5rem,env(safe-area-inset-bottom))]">
          <header className="relative z-10 flex w-full justify-end">
            <Image
              src="/images/LOGO_HERO.png"
              alt="Triangular"
              width={150}
              height={16}
              className="h-4 w-auto object-contain object-right"
              priority
            />
          </header>
          <div className="absolute top-3/5 right-0 left-0">
            <h1 className="flex flex-col items-center text-center font-sans text-5xl leading-11 font-normal -tracking-widest text-white uppercase not-italic [leading-trim:both] [text-edge:cap_alphabetic]">
              <span>POTENCIA</span>
              <span>TU MARCA</span>
              <span
                key={index}
                aria-live="polite"
                aria-atomic="true"
                className="animate-title whitespace-pre-line"
              >
                {`${lineA}\n${lineB}`}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
