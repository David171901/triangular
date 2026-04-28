"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HERO_ROTATIONS = [
  ["CON UNA", "WEB O APP"],
  ["CON DISEÑO", "FUNCIONAL"],
  ["CON MÁS", "ALCANCE"],
  ["CON IDEAS", "EFECTIVAS"],
];

const ROTATION_MS = 1750;

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
      <div className="xs:aspect-1920/1230 relative aspect-430/830 w-full">
        <div
          className="bg-brand-deep pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          <Image
            src="/images/POTENCIA_TU_MARCA.png"
            alt=""
            fill
            priority
            sizes="(max-width: 639px) 100vw, 0px"
            className="xs:hidden object-cover object-top"
          />
          <Image
            src="/images/POTENCIA_TU_MARCA_D.png"
            alt=""
            fill
            priority
            sizes="(min-width: 640px) 100vw, 0px"
            className="xs:block hidden object-cover object-center"
          />
        </div>

        <div
          aria-hidden
          className="to-brand-violet-bloom xs:h-28 pointer-events-none absolute inset-x-0 bottom-0 z-5 h-24 bg-linear-to-b from-transparent"
        />

        <div className="xs:container xs:mx-auto xs:px-0 xs:pt-4 absolute inset-0 z-10 px-6 pt-6 pb-10">
          <header className="relative z-10 flex w-full justify-end">
            <Link
              href="/"
              className="focus-visible:ring-brand-cyan focus-visible:ring-offset-brand-deep inline-block focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <Image
                src="/images/LOGO_HERO.svg"
                alt="Triangular"
                width={150}
                height={16}
                className="xs:w-44 xs:h-5 xs:object-right h-4 w-auto object-contain object-right lg:h-6 lg:w-64"
                priority
              />
            </Link>
          </header>
          <div className="xs:top-1/6 xs:right-1/2 absolute top-7/12 right-0 left-0">
            <h1 className="xs:items-start xs:text-left xs:text-5xl xs:leading-11 xs:-tracking-widest xs:[leading-trim:cap-height] flex flex-col items-center text-center font-sans text-4xl leading-11 font-normal -tracking-widest text-white uppercase not-italic [leading-trim:both] [text-edge:cap_alphabetic] lg:text-7xl lg:leading-16">
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
