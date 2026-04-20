import Image from "next/image";

export default function HacemosEquipo() {
  return (
    <section
      aria-label="Hacemos equipo con tu marca"
      className="relative isolate z-10 -mt-px w-full"
    >
      <div className="xs:aspect-1920/1904 relative aspect-430/1003 w-full">
        <div
          className="bg-brand-deep pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          <Image
            src="/images/HACEMOS_EQUIPO.png"
            alt=""
            fill
            sizes="(max-width: 639px) 100vw, 0px"
            className="xs:hidden object-cover object-top"
          />
          <Image
            src="/images/HACEMOS_EQUIPO_DESKTOP.png"
            alt=""
            fill
            sizes="(min-width: 640px) 100vw, 0px"
            className="xs:block hidden object-cover object-center"
          />
        </div>

        <div
          aria-hidden
          className="from-brand-violet-night xs:h-28 pointer-events-none absolute inset-x-0 top-0 z-5 h-24 bg-linear-to-b to-transparent"
        />
        <div
          aria-hidden
          className="to-brand-violet-ink xs:h-28 pointer-events-none absolute inset-x-0 bottom-0 z-5 h-24 bg-linear-to-b from-transparent"
        />

        <div className="absolute top-1/6 right-0 left-0 z-10">
          <div className="flex max-w-2xl flex-col items-center text-center">
            <h2 className="text-brand-purple mb-6 text-center font-sans text-4xl leading-9 font-normal -tracking-widest whitespace-pre-line uppercase not-italic [leading-trim:both] [text-edge:cap_alphabetic]">
              {`HACEMOS \nEQUIPO CON \nTU MARCA`}
            </h2>
            <p className="font-axiforma text-brand-white text-center text-base leading-6 font-normal tracking-normal whitespace-pre-line not-italic [leading-trim:both] [text-edge:cap_alphabetic]">
              {`Démosle vida a tu proyecto \nuniendo tu visión con nuestra \ncreatividad y experiencia.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
