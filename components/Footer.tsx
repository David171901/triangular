"use client";

import Image from "next/image";
import { ChevronUp } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface FooterProps {
  className?: string;
  title: string;
}

export default function Footer({ title, className }: FooterProps) {
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const [ctaAnimated, setCtaAnimated] = useState(false);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setCtaAnimated(true);
        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      data-footer
      className={clsx(
        className,
        "xs:h-[66.6667vh] h-screen w-full lg:h-screen",
      )}
    >
      <div className="xs:container xs:mx-auto xs:px-0 flex h-full w-full flex-col justify-between px-6 py-14">
        <div>
          <h2 className="xs:text-left xs:text-5xl xs:leading-11 text-brand-white font-sans text-4xl leading-9 font-normal -tracking-widest whitespace-pre-line uppercase not-italic [leading-trim:cap-height] [text-edge:cap_alphabetic] lg:text-7xl lg:leading-16">
            {title}
          </h2>

          <div className="mt-16 flex flex-col">
            <div className="bg-brand-purple/60 h-px w-full" />

            <div className="xs:justify-start flex items-center justify-between gap-6 py-6">
              <div className="xs:hidden flex-1" />
              <div className="text-right">
                <p className="font-axiforma text-brand-muted xs:text-left xs:text-xl text-right text-base leading-6 font-medium tracking-normal not-italic [leading-trim:cap-height] [text-edge:cap_alphabetic]">
                  Correo
                </p>
                <p className="font-axiforma text-brand-white xs:text-left xs:text-2xl text-right text-xl leading-8 font-medium tracking-normal not-italic [leading-trim:cap-height] [text-edge:cap_alphabetic]">
                  hola@triangular.com
                </p>
              </div>
              <div className="xs:block hidden text-right">
                <p className="font-axiforma text-brand-muted xs:text-left xs:text-xl text-right text-base leading-6 font-medium tracking-normal not-italic [leading-trim:cap-height] [text-edge:cap_alphabetic]">
                  WhatsApp
                </p>
                <p className="font-axiforma text-brand-white xs:text-left xs:text-2xl text-right text-xl leading-8 font-medium tracking-normal not-italic [leading-trim:cap-height] [text-edge:cap_alphabetic]">
                  948 523 897
                </p>
              </div>
            </div>

            <div className="bg-brand-purple h-px w-full" />

            <div className="xs:hidden flex items-center justify-between gap-6 py-6">
              <div className="flex-1" />
              <div className="text-right">
                <p className="font-axiforma text-brand-muted text-right text-base leading-6 font-medium tracking-normal not-italic [leading-trim:cap-height] [text-edge:cap_alphabetic]">
                  WhatsApp
                </p>
                <p className="font-axiforma text-brand-white text-right text-xl leading-8 font-medium tracking-normal not-italic [leading-trim:cap-height] [text-edge:cap_alphabetic]">
                  948 523 897
                </p>
              </div>
            </div>

            <div className="bg-brand-purple h-px w-full" />

            <div className="flex items-center justify-end gap-6 py-6">
              <Link
                ref={ctaRef}
                href="/contactar"
                className={clsx(
                  ctaAnimated ? "btn motion-reduce:animate-none" : "opacity-0",
                  "text-brand-deep hover:bg-brand-yellow/75 active:bg-brand-yellow/85 bg-brand-yellow focus-visible:ring-brand-yellow/80 font-axiforma box-border inline-flex h-10 w-52 items-center justify-center rounded-sm px-4 text-sm leading-none font-bold tracking-wide uppercase not-italic shadow-[0_10px_28px_rgba(0,0,0,0.45)] transition-[transform,background-color] [leading-trim:both] [text-edge:cap_alphabetic] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none active:translate-y-px motion-safe:active:scale-[0.99]",
                )}
              >
                INICIAR UN PROYECTO
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Volver arriba"
              className="border-brand-white/50 active:bg-brand-white/25 xs:h-11 xs:w-11 flex h-9 w-9 items-center justify-center rounded-full border bg-transparent transition-colors"
            >
              <ChevronUp
                size={24}
                className="text-brand-white xs:h-6 xs:w-6 h-5 w-5"
              />
            </button>
          </div>

          <div className="mt-24 w-full">
            <Image
              src="/images/LOGO_FOOTER.png"
              alt="Triangular"
              width={800}
              height={200}
              className="xs:hidden h-auto w-full max-w-full"
              sizes="100vw"
              priority={false}
            />
            <Image
              src="/images/LOGO_FOOTER_D.png"
              alt="Triangular"
              width={2048}
              height={300}
              className="xs:block hidden h-auto w-full max-w-full"
              sizes="100vw"
              priority={false}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
