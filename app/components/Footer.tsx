"use client";

import Image from "next/image";
import { ChevronUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="flex h-[920px] w-full flex-col justify-between px-6 py-14">
      <div>
        <h2 className="text-brand-white font-sans text-[37px] leading-[35px] font-normal tracking-[-2px] uppercase not-italic">
          QUEREMOS{"\n"}ESCUCHARTE
        </h2>

        <div className="mt-16 flex flex-col">
          <div className="bg-brand-purple/60 h-px w-full" />

          <div className="flex items-center justify-between gap-6 py-6">
            <div className="flex-1" />
            <div className="text-right">
              <p className="font-axiforma text-brand-white/70 text-[14px] leading-[20px] font-normal tracking-[0px] not-italic">
                Correo
              </p>
              <p className="font-axiforma text-brand-white text-[20px] leading-[26px] font-medium tracking-[0px] not-italic">
                hola@triangular.com
              </p>
            </div>
          </div>

          <div className="bg-brand-purple/60 h-px w-full" />

          <div className="flex items-center justify-between gap-6 py-6">
            <div className="flex-1" />
            <div className="text-right">
              <p className="font-axiforma text-brand-white/70 text-[14px] leading-[20px] font-normal tracking-[0px] not-italic">
                WhatsApp
              </p>
              <p className="font-axiforma text-brand-white text-[20px] leading-[26px] font-medium tracking-[0px] not-italic">
                948 523 897
              </p>
            </div>
          </div>

          <div className="bg-brand-purple/60 h-px w-full" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="border-brand-white/35 active:bg-brand-white/10 flex h-12 w-12 items-center justify-center rounded-full border bg-transparent transition-colors"
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
            className="h-auto w-full max-w-[420px]"
            priority={false}
          />
          <p className="font-axiforma text-brand-purple text-[14px] leading-[20px] font-normal tracking-[0px] not-italic">
            ©2025
          </p>
        </div>
      </div>
    </footer>
  );
}
