"use client";

import Image from "next/image";
import { ChevronUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full h-[920px] px-6 py-14 flex flex-col justify-between">
      <div>
        <h2 className="font-sans font-normal not-italic text-[37px] leading-[35px] tracking-[-2px] uppercase text-brand-white">
          QUEREMOS{"\n"}ESCUCHARTE
        </h2>

        <div className="mt-16 flex flex-col">
          <div className="h-px w-full bg-brand-purple/60" />

          <div className="py-6 flex items-center justify-between gap-6">
            <div className="flex-1" />
            <div className="text-right">
              <p className="font-axiforma font-normal not-italic text-[14px] leading-[20px] tracking-[0px] text-brand-white/70">
                Correo
              </p>
              <p className="font-axiforma font-medium not-italic text-[20px] leading-[26px] tracking-[0px] text-brand-white">
                hola@triangular.com
              </p>
            </div>
          </div>

          <div className="h-px w-full bg-brand-purple/60" />

          <div className="py-6 flex items-center justify-between gap-6">
            <div className="flex-1" />
            <div className="text-right">
              <p className="font-axiforma font-normal not-italic text-[14px] leading-[20px] tracking-[0px] text-brand-white/70">
                WhatsApp
              </p>
              <p className="font-axiforma font-medium not-italic text-[20px] leading-[26px] tracking-[0px] text-brand-white">
                948 523 897
              </p>
            </div>
          </div>

          <div className="h-px w-full bg-brand-purple/60" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-white/35 bg-transparent transition-colors active:bg-brand-white/10"
          >
            <ChevronUp size={18} className="text-brand-white/80" />
          </button>
        </div>

        <div className="mt-32 flex flex-col items-center gap-4">
          <Image
            src="/images/LOGO_FOOTER.png"
            alt="Triangular"
            width={360}
            height={90}
            className="w-full max-w-[420px] h-auto"
            priority={false}
          />
          <p className="font-axiforma font-normal not-italic text-[14px] leading-[20px] tracking-[0px] text-brand-purple">
            ©2025
          </p>
        </div>
      </div>
    </footer>
  );
}
