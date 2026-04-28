"use client";

import clsx from "clsx";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Code } from "./Icons";

interface Item {
  number: string;
  title: string;
  preview: string;
  description: string;
  items?: string[];
  sections?: { title: string; items: string[] }[];
}

const DATA: Item[] = [
  {
    number: "01",
    title: "DISEÑO WEB\nUX / UI",
    preview: "Creamos sitios que hablan de ti...",
    description:
      "Creamos sitios que hablan de ti con diseño y usabilidad que conectan desde el primer clic.",
    items: [
      "Diseño de Landing Pages",
      "Desarrollo de páginas web",
      "Creación de tiendas en línea",
      "Optimización para dispositivos móviles",
      "Mejora de experiencia de usuario (UX)",
    ],
  },
  {
    number: "02",
    title: "ESTRATEGIA\nDIGITAL",
    preview: "Hacemos crecer tu marca...",
    description:
      "Hacemos crecer tu marca con estrategias efectivas que conectan con tu público.",
    items: [
      "Contenido para redes sociales",
      "Campañas de publicidad digital (Google Ads, Facebook Ads, Instagram Ads, TikTok Ads)",
      "Gestión de redes sociales (CM)",
      "E-mail Marketing",
      "Análisis de datos y métricas de rendimiento",
      "Estrategias de generación de leads",
    ],
  },
  {
    number: "03",
    title: "POSICIONAMIENTO\nSEO / SEM",
    preview: "Te hacemos visible...",
    description:
      "Te hacemos visible con optimización y estrategias para que te encuentren primero.",
    sections: [
      {
        title: "SEO",
        items: [
          "Investigación y análisis de palabras clave",
          "Optimización de contenido (on-page)",
          "Construcción de enlaces (link building)",
          "Optimización de meta etiquetas (títulos, descripciones)",
          "SEO técnico (estructura del sitio, archivos robots.txt, sitemap)",
        ],
      },
      {
        title: "SEM",
        items: [
          "Creación y gestión de campañas en Google Ads",
          "Anuncios de búsqueda pagados (Google Search Ads)",
          "Remarketing en Google",
          "Optimización de presupuesto y ofertas",
          "Análisis y optimización de campañas SEM",
        ],
      },
    ],
  },
  {
    number: "04",
    title: "SERVICIOS\nADICIONALES",
    preview: "Tenemos mucho más...",
    description:
      "Tenemos mucho más para complementar y potenciar el crecimiento de tu marca.",
    items: [
      "Creación de identidad visual (naming, logotipo, colores y tipografía)",
      "Diseño de manual de marca",
      "Diseño de piezas gráficas para campañas publicitarias (flyers, banners, brochures)",
      "Creación de materiales impresos para eventos y promociones",
    ],
  },
];

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: Item;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <section className="isolate border-t border-b border-white/25 py-5">
      <p className="text-brand-white mb-6 font-sans text-sm font-normal tracking-tighter not-italic [leading-trim:both] [text-edge:cap_alphabetic] lg:text-2xl lg:leading-8 lg:-tracking-tighter lg:[leading-trim:cap-height]">
        {item.number}
      </p>

      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-3 text-left"
      >
        <h3 className="text-brand-white font-sans text-2xl leading-6 font-normal -tracking-widest whitespace-pre-line uppercase not-italic [leading-trim:both] [text-edge:cap_alphabetic] lg:text-4xl lg:leading-9 lg:-tracking-widest lg:[leading-trim:cap-height]">
          {item.title}
        </h3>

        <span className="border-brand-indigo xs:h-16 xs:w-16 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border">
          {isOpen ? (
            <ChevronUp
              size={24}
              className="text-brand-white xs:h-10 xs:w-10 h-5 w-5"
            />
          ) : (
            <ChevronDown
              size={24}
              className="text-brand-white xs:h-10 xs:w-10 h-5 w-5"
            />
          )}
        </span>
      </button>

      <div className="relative mt-4">
        <p
          aria-hidden={isOpen || undefined}
          className={clsx(
            "font-axiforma text-brand-white text-base leading-6 font-normal tracking-normal not-italic [leading-trim:both] [text-edge:cap_alphabetic] lg:text-xl lg:leading-6 lg:tracking-normal lg:[leading-trim:cap-height]",
            "transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
            isOpen
              ? "pointer-events-none absolute inset-x-0 top-0 z-0 -translate-y-0.5 opacity-0 lg:-translate-y-1"
              : "relative z-10 translate-y-0 opacity-100",
          )}
        >
          {item.preview}
        </p>
        <p
          aria-hidden={!isOpen || undefined}
          className={clsx(
            "font-axiforma text-brand-white text-base leading-6 font-normal tracking-normal not-italic [leading-trim:both] [text-edge:cap_alphabetic] lg:text-xl lg:leading-6 lg:tracking-normal lg:[leading-trim:cap-height]",
            "transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
            isOpen
              ? "relative z-10 translate-y-0 opacity-100"
              : "pointer-events-none absolute inset-x-0 top-0 z-0 translate-y-0.5 opacity-0 lg:translate-y-1",
          )}
        >
          {item.description}
        </p>
      </div>

      <div
        className={clsx(
          "grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none",
          isOpen ? "mt-4 grid-rows-[1fr]" : "mt-0 grid-rows-[0fr]",
        )}
      >
        <div
          className={clsx(
            "min-h-0 overflow-hidden transition-opacity duration-300 ease-out motion-reduce:transition-none",
            isOpen ? "opacity-100" : "opacity-0",
          )}
        >
          {item.sections && item.sections.length > 0 ? (
            <div className="flex flex-col gap-5">
              {item.sections.map((section) => (
                <div key={section.title}>
                  <p className="font-axiforma text-brand-white mb-3 text-[15px] leading-[22px] font-medium tracking-[0px] not-italic [leading-trim:both] [text-edge:cap_alphabetic]">
                    {section.title}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {section.items.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <Code
                          width={12}
                          height={12}
                          className="mt-[3px] shrink-0"
                        />
                        <span className="font-axiforma text-brand-white text-base leading-6 font-normal tracking-normal not-italic [leading-trim:both] [text-edge:cap_alphabetic] lg:text-xl lg:leading-6 lg:tracking-normal lg:[leading-trim:cap-height]">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : item.items && item.items.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {item.items.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <Code width={12} height={12} className="mt-[3px] shrink-0" />
                  <span className="font-axiforma text-brand-white text-base leading-6 font-normal tracking-normal not-italic [leading-trim:both] [text-edge:cap_alphabetic] lg:text-xl lg:leading-6 lg:tracking-normal lg:[leading-trim:cap-height]">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="min-h-0" aria-hidden />
          )}
        </div>
      </div>
    </section>
  );
}

export default function ComoTeAyudamos() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="bg-como-te-ayudamos-a-crecer">
      <div className="xs:container xs:mx-auto xs:px-0 xs:grid xs:grid-cols-[2fr_1fr] xs:gap-9 xs:pt-0 xs:items-start w-full px-6 pt-16 pb-36 lg:pb-72">
        <div className="xs:order-2 xs:mb-0 xs:sticky xs:top-[30vh] xs:self-start mb-10">
          <h2 className="text-brand-cyan xs:text-5xl xs:leading-11 xs:-tracking-widest xs:[leading-trim:cap-height] mb-6 text-right font-sans text-4xl leading-9 font-normal -tracking-widest whitespace-pre-line uppercase not-italic [leading-trim:both] [text-edge:cap_alphabetic] lg:text-7xl lg:leading-16">
            <span className="xs:hidden block">
              CÓMO{"\n"}TE AYUDAMOS{"\n"}A CRECER
            </span>
            <span className="xs:block hidden">
              CÓMO TE {"\n"}AYUDAMOS{"\n"}A CRECER
            </span>
          </h2>
          <p className="font-axiforma text-brand-white text-right text-base leading-6 font-normal tracking-normal not-italic [leading-trim:both] [text-edge:cap_alphabetic] lg:text-xl lg:leading-7 lg:tracking-normal lg:[leading-trim:cap-height]">
            Te ofrecemos soluciones pensadas para que tu marca crezca y llegue a
            más personas.
          </p>
        </div>

        <div className="xs:order-1 xs:pt-64 flex flex-col lg:pt-96">
          {DATA.map((item, i) => (
            <AccordionRow
              key={item.number}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
