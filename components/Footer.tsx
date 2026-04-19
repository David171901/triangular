"use client";

import Image from "next/image";
import { ChevronUp } from "lucide-react";

interface FooterProps {
  title: string;
}

export default function Footer({ title }: FooterProps) {
  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="flex min-h-screen w-full flex-col justify-between px-6 py-14">
      <div>
        <h2 className="text-brand-white font-sans text-4xl leading-9 font-normal -tracking-widest uppercase not-italic [leading-trim:cap-height] [text-edge:cap_alphabetic]">
          {title}
        </h2>

        <div className="mt-16 flex flex-col">
          <div className="bg-brand-purple/60 h-px w-full" />

          <div className="flex items-center justify-between gap-6 py-6">
            <div className="flex-1" />
            <div className="text-right">
              <p className="font-axiforma text-brand-muted text-right text-base leading-6 font-medium tracking-normal not-italic [leading-trim:cap-height] [text-edge:cap_alphabetic]">
                Correo
              </p>
              <p className="font-axiforma text-brand-white text-right text-xl leading-8 font-medium tracking-normal not-italic [leading-trim:cap-height] [text-edge:cap_alphabetic]">
                hola@triangular.com
              </p>
            </div>
          </div>

          <div className="bg-brand-purple h-px w-full" />

          <div className="flex items-center justify-between gap-6 py-6">
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
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="border-brand-white/50 active:bg-brand-white/25 flex h-9 w-9 items-center justify-center rounded-full border bg-transparent transition-colors"
          >
            <ChevronUp size={18} className="text-brand-white" />
          </button>
        </div>

        <div className="mt-32 flex flex-col items-center gap-4">
          <Image
            src="/images/LOGO_FOOTER.png"
            alt="Triangular"
            width={360}
            height={90}
            className="h-auto w-full max-w-[420px]"
            priority={false}
          />
        </div>
      </div>
    </footer>
  );
}
