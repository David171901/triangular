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

        <Image
          src="/images/LOGO_HERO.png"
          alt="Triangular"
          width={200}
          height={48}
          className="h-8 w-auto max-w-[min(200px,45vw)] object-contain object-right"
          priority
        />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-2 py-8">
        <h1 className="text-brand-cyan text-center font-sans text-4xl leading-none font-black -tracking-[0.08em] whitespace-pre-line uppercase not-italic [leading-trim:both] [text-edge:cap_alphabetic]">
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
