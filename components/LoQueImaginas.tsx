import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronDown } from "lucide-react";

export default function LoQueImaginas() {
  return (
    <section
      aria-label="Contacto"
      className="flex min-h-screen w-full flex-col justify-between px-6 pt-5 pb-10"
    >
      <header className="mx-auto flex w-full items-center justify-between">
        <Link
          href="/"
          className="border-brand-white/50 active:bg-brand-white/25 flex h-6 w-6 items-center justify-center rounded-full border bg-transparent transition-colors"
          aria-label="Volver al inicio"
        >
          <ArrowLeft size={18} strokeWidth={2} className="text-brand-white" />
        </Link>

        <Link
          href="/"
          className="focus-visible:ring-brand-cyan inline-block focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none"
        >
          <Image
            src="/images/LOGO_HERO.svg"
            alt="Triangular"
            width={252}
            height={27}
            className="h-8 w-auto max-w-[min(200px,45vw)] object-contain object-right"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </Link>
      </header>
      {/* xs:items-start xs:text-left xs:text-5xl xs:leading-11 xs:-tracking-widest xs:[leading-trim:cap-height] flex flex-col items-center text-center font-sans text-4xl leading-11 font-normal -tracking-widest text-white uppercase not-italic [leading-trim:both] [text-edge:cap_alphabetic] lg:text-7xl lg:leading-16 */}
      <div className="flex flex-1 flex-col items-center justify-center px-2 py-8">
        <h1 className="xs:items-start xs:text-5xl xs:leading-11 xs:-tracking-widest xs:[leading-trim:cap-height] text-brand-cyan text-center font-sans text-4xl leading-none font-black -tracking-[0.08em] whitespace-pre-line uppercase not-italic [leading-trim:both] [text-edge:cap_alphabetic] lg:text-7xl lg:leading-16">
          LO QUE{"\n"}IMAGINAS,{"\n"}EMPIEZA{"\n"}AQUÍ
        </h1>
      </div>

      <div className="flex justify-center pb-1">
        <a
          href="#empezamos-juntos"
          className="border-brand-white/50 active:bg-brand-white/25 flex h-11 w-11 items-center justify-center rounded-full border bg-transparent transition-colors"
          aria-label="Ir al formulario de contacto"
        >
          <ChevronDown
            size={22}
            strokeWidth={2}
            className="text-brand-white"
            aria-hidden
          />
        </a>
      </div>
    </section>
  );
}
