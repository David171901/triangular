"use client";

import Image from "next/image";
import { ChevronUp } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type DesktopContactLayout = "inline" | "stacked";

interface FooterProps {
  className?: string;
  title: string;
  showCtaButton?: boolean;
  desktopContactLayout?: DesktopContactLayout;
}

function ContactBlock({
  label,
  value,
  align,
}: {
  label: string;
  value: string;
  align: "left" | "right";
}) {
  return (
    <div
      className={clsx(
        align === "left" ? "xs:text-left text-right" : "text-right",
      )}
    >
      <p
        className={clsx(
          "font-axiforma text-brand-muted text-base leading-6 font-medium tracking-normal not-italic [leading-trim:cap-height] [text-edge:cap_alphabetic]",
          align === "left" && "xs:text-xl",
        )}
      >
        {label}
      </p>
      <p
        className={clsx(
          "font-axiforma text-brand-white text-xl leading-8 font-medium tracking-normal not-italic [leading-trim:cap-height] [text-edge:cap_alphabetic]",
          align === "left" && "xs:text-2xl",
        )}
      >
        {value}
      </p>
    </div>
  );
}

export default function Footer({
  title,
  className,
  showCtaButton = true,
  desktopContactLayout = "inline",
}: FooterProps) {
  const contactStackedDesktop = desktopContactLayout === "stacked";
  const ctaContainerRef = useRef<HTMLDivElement | null>(null);
  const [ctaEnterActive, setCtaEnterActive] = useState(false);

  useEffect(() => {
    if (!showCtaButton) return;

    const el = ctaContainerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = !!entry?.isIntersecting;
        if (inView) {
          setCtaEnterActive(false);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setCtaEnterActive(true));
          });
        } else {
          setCtaEnterActive(false);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [showCtaButton]);

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      data-footer
      className={clsx(className, "xs:h-[65vh] h-screen w-full lg:h-screen")}
    >
      <div className="xs:container xs:mx-auto xs:px-0 flex h-full w-full flex-col justify-between overflow-hidden px-6 py-14">
        <div>
          <h2 className="xs:text-left text-brand-white xs:text-4xl xs:leading-8 font-sans text-4xl leading-9 font-normal -tracking-widest whitespace-pre-line uppercase not-italic [leading-trim:cap-height] [text-edge:cap_alphabetic] sm:text-5xl sm:leading-11 lg:text-7xl lg:leading-16">
            {title}
          </h2>

          <div className="mt-16 flex flex-col">
            <div className="bg-brand-purple/75 h-px w-full" />

            <div className="xs:hidden">
              <div className="flex justify-end py-6">
                <ContactBlock
                  label="Correo"
                  value="hola@triangular.com"
                  align="right"
                />
              </div>
              <div className="bg-brand-purple/75 h-px w-full" />
              <div className="flex justify-end py-6">
                <ContactBlock
                  label="WhatsApp"
                  value="948 523 897"
                  align="right"
                />
              </div>
              <div className="bg-brand-purple/75 h-px w-full" />
            </div>

            <div
              className={clsx(
                "xs:flex hidden w-full",
                contactStackedDesktop
                  ? "flex-col items-end"
                  : "flex-row items-center justify-start gap-6 py-6",
              )}
            >
              <div
                className={contactStackedDesktop ? "w-full py-6" : undefined}
              >
                <ContactBlock
                  label="Correo"
                  value="hola@triangular.com"
                  align={contactStackedDesktop ? "right" : "left"}
                />
              </div>
              {contactStackedDesktop ? (
                <div className="bg-brand-purple/75 h-px w-full" />
              ) : null}
              <div
                className={contactStackedDesktop ? "w-full py-6" : undefined}
              >
                <ContactBlock
                  label="WhatsApp"
                  value="948 523 897"
                  align={contactStackedDesktop ? "right" : "left"}
                />
              </div>
            </div>

            {!contactStackedDesktop || !showCtaButton ? (
              <div className="bg-brand-purple/75 xs:block hidden h-px w-full" />
            ) : null}

            {showCtaButton ? (
              <>
                <div className="bg-brand-purple/75 h-px w-full" />

                <div
                  ref={ctaContainerRef}
                  className="flex items-center justify-end gap-6 py-6"
                >
                  <Link
                    href="/contactar"
                    className={clsx(
                      ctaEnterActive
                        ? "footer-cta-contactar-enter motion-reduce:animate-none"
                        : "opacity-0",
                      "hover:bg-brand-yellow/75 active:bg-brand-yellow/75 bg-brand-yellow focus-visible:ring-brand-yellow/75 box-border inline-flex h-10 w-52 items-center justify-center rounded-sm px-4 shadow-[0_10px_28px_rgba(0,0,0,0.45)] transition-[transform,background-color] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none active:translate-y-px motion-safe:active:scale-95",
                    )}
                  >
                    <span className="text-brand-deep font-axiforma text-sm leading-none font-bold tracking-wide uppercase not-italic [leading-trim:cap-height] [text-edge:cap_alphabetic]">
                      Iniciar un proyecto
                    </span>
                  </Link>
                </div>
              </>
            ) : null}
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
