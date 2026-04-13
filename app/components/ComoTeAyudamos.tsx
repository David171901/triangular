"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Code } from "lucide-react";

interface AccordionItem {
  number: string;
  title: string;
  preview: string;
  description: string;
  items?: string[];
  sections?: { title: string; items: string[] }[];
}

const DATA: AccordionItem[] = [
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
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/25 py-5">
      <p className="font-sans font-normal not-italic text-sm leading-9 tracking-tighter text-brand-white mb-2 [text-edge:cap_alphabetic] [leading-trim:both]">
        {item.number}
      </p>

      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-3 text-left"
      >
        <h3 className="font-sans font-normal not-italic text-2xl leading-6 -tracking-widest uppercase text-brand-white whitespace-pre-line [text-edge:cap_alphabetic] [leading-trim:both]">
          {item.title}
        </h3>

        <span className="shrink-0 mt-1 flex items-center justify-center w-8 h-8 rounded-full border border-white/25">
          {isOpen ? (
            <ChevronUp size={16} className="text-white" />
          ) : (
            <ChevronDown size={16} className="text-white" />
          )}
        </span>
      </button>

      <div
        className={[
          "grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr] mt-0",
        ].join(" ")}
      >
        <div
          className={[
            "min-h-0 overflow-hidden transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
          ].join(" ")}
        >
          <p className="font-axiforma font-normal not-italic text-base leading-6 tracking-normal text-brand-white mb-4 [text-edge:cap_alphabetic] [leading-trim:both]">
            {item.description}
          </p>

          {item.sections && item.sections.length > 0 ? (
            <div className="flex flex-col gap-5">
              {item.sections.map((section) => (
                <div key={section.title}>
                  <p className="font-axiforma font-medium not-italic text-[15px] leading-[22px] tracking-[0px] text-brand-white mb-3 [text-edge:cap_alphabetic] [leading-trim:both]">
                    {section.title}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {section.items.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <Code
                          size={12}
                          color="white"
                          className="shrink-0 mt-[3px]"
                        />
                        <span className="font-axiforma font-normal not-italic text-base leading-6 tracking-normal text-brand-white [text-edge:cap_alphabetic] [leading-trim:both]">
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
                  <Code size={12} color="white" className="shrink-0 mt-[3px]" />
                  <span className="font-axiforma font-normal not-italic text-base leading-6 tracking-normal text-brand-white [text-edge:cap_alphabetic] [leading-trim:both]">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {!isOpen && (
        <p className="font-axiforma font-normal not-italic text-base leading-6 tracking-normal text-brand-white mb-4 [text-edge:cap_alphabetic] [leading-trim:both]">
          {item.preview}
        </p>
      )}
    </div>
  );
}

export default function ComoTeAyudamos() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="w-full px-6 pt-12 pb-16">
      <div className="mb-10">
        <h2 className="font-sans font-normal not-italic text-4xl leading-9 -tracking-widest uppercase text-brand-cyan text-right mb-6 [text-edge:cap_alphabetic] [leading-trim:both]">
          CÓMO{"\n"}TE AYUDAMOS{"\n"}A CRECER
        </h2>
        <p className="font-axiforma font-normal not-italic text-base leading-6 tracking-normal text-brand-white text-right [text-edge:cap_alphabetic] [leading-trim:both]">
          Te ofrecemos soluciones pensadas para que tu marca crezca y llegue a
          más personas.
        </p>
      </div>

      <div className="flex flex-col">
        {DATA.map((item, i) => (
          <AccordionRow
            key={item.number}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </section>
  );
}
