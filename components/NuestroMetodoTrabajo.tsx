"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface Item {
  number: string;
  title: string;
  description: string;
}

interface CardProps {
  number: string;
  title: string;
  description: string;
  index: number;
}

function Card({ number, title, description, index }: CardProps) {
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = cardContainerRef.current;
    const section = sectionRef.current;
    if (!node || !section) return;

    let inView = false;

    const playEnter = () => {
      setEntered(false);
      requestAnimationFrame(() => {
        void section.offsetHeight;
        requestAnimationFrame(() => setEntered(true));
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          if (inView) return;
          inView = true;
          playEnter();
        } else {
          inView = false;
          setEntered(false);
        }
      },
      {
        threshold: 0.12,
        rootMargin: `0px 0px -${6 + index * 14}% 0px`,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [index]);

  const parity = index % 2 === 0 ? "even" : "odd";

  return (
    <div ref={cardContainerRef} className="relative h-56 w-full max-w-[480px]">
      <section
        ref={sectionRef}
        data-card-parity={parity}
        className={clsx(
          "nuestro-metodo-card bg-brand-gradient-card relative h-full overflow-hidden rounded-xl px-8 py-8 shadow-sm",
          entered && "nuestro-metodo-card-entered",
          "transition-transform duration-1500 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none",
        )}
      >
        <p
          className={clsx(
            "font-sans leading-none font-bold transition-[color,font-size,transform] duration-500 ease-out",
            open
              ? "text-brand-cyan translate-y-0 text-5xl"
              : "text-brand-white translate-y-0 text-2xl",
          )}
        >
          {number}
        </p>

        <div
          className={clsx(
            "absolute right-8 bottom-9 left-8 flex items-center justify-end gap-3",
            "transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
            open ? "-translate-y-28" : "translate-y-0",
          )}
        >
          <h3
            className={clsx(
              "text-brand-white text-right font-sans text-xl leading-5 font-normal -tracking-widest whitespace-pre-line uppercase not-italic",
              "[leading-trim:cap] [text-edge:cap]",
              "transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
            )}
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar" : "Abrir"}
            aria-expanded={open}
            className="border-brand-indigo flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors active:bg-white/25"
          >
            <ChevronDown
              size={24}
              strokeWidth={2}
              className={clsx(
                "text-brand-white transition-transform duration-300 ease-out motion-reduce:transition-none",
                open ? "rotate-0" : "-rotate-180",
              )}
              aria-hidden
            />
          </button>
        </div>

        <div
          className={clsx(
            "absolute right-8 bottom-9 left-8",
            "grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className={clsx(
                "transform-gpu pt-4",
                "transition-transform motion-reduce:transition-none",
                open
                  ? "translate-x-0 delay-300 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  : "translate-x-full delay-0 duration-200 ease-in",
              )}
            >
              <p className="font-axiforma text-brand-white text-[15px] leading-5 font-normal tracking-normal not-italic [leading-trim:both] [text-edge:cap_alphabetic]">
                {description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const DATA: Item[] = [
  {
    number: "01",
    title: "ESCUCHAMOS\nTUS IDEAS",
    description:
      "Conversamos contigo para conocer tu visión, entender tus objetivos y planificar una solución que se adapte a lo que necesitas.",
  },
  {
    number: "02",
    title: "DISEÑAMOS Y\nCREAMOS",
    description:
      "Diseñamos y construimos una propuesta clara, funcional y alineada a tu marca para que conecte con tu público desde el primer vistazo.",
  },
  {
    number: "03",
    title: "AJUSTAMOS Y\nENTREGAMOS",
    description:
      "Realizamos una revisión final, afinamos cada detalle y te entregamos un proyecto listo para impulsar tu marca.",
  },
];

export default function NuestroMetodoTrabajo() {
  return (
    <section className="bg-nuestro-metodo-de-trabajo">
      <div className="xs:grid xs:grid-cols-2 xs:items-start xs:gap-16 xs:container xs:mx-auto xs:px-0 xs:pt-48 xs:pb-32 w-full px-6 pt-36 pb-16">
        <div className="xs:sticky xs:top-[30vh] xs:mb-0 xs:self-start mb-10">
          <h2 className="text-brand-cyan xs:text-left xs:text-4xl xs:leading-8 mb-6 text-right font-sans text-4xl leading-9 font-normal -tracking-widest whitespace-pre-line uppercase not-italic [leading-trim:both] [text-edge:cap_alphabetic] sm:text-5xl sm:leading-11 lg:text-7xl lg:leading-16">
            NUESTRO{"\n"}MÉTODO DE{"\n"}TRABAJO
          </h2>
          <p className="font-axiforma text-brand-white xs:text-left text-right text-base leading-6 font-normal tracking-normal not-italic [leading-trim:both] [text-edge:cap_alphabetic] lg:text-xl lg:leading-7 lg:tracking-normal lg:whitespace-pre-line lg:[leading-trim:cap-height]">
            Escuchamos, creamos y ajustamos para que{"\n"} cada proyecto refleje
            lo mejor de tu marca.
          </p>
        </div>

        <div className="xs:mb-0 xs:min-w-0 xs:pt-64 xs:items-end mb-10 flex w-full flex-col gap-8 overflow-x-clip overflow-y-visible lg:pt-96">
          {DATA.map((card, index) => (
            <Card
              key={card.number}
              index={index}
              number={card.number}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
