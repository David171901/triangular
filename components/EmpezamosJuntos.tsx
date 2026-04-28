"use client";

import { useForm } from "react-hook-form";
import {
  ComboboxInput,
  TextInput,
  TextareaInput,
  type ComboboxOption,
} from "@/components/Form";

const TIPO_PROYECTO_OPTIONS: ComboboxOption[] = [
  { value: "diseno-web", label: "Diseño web" },
  { value: "estrategia-digital", label: "Estrategia digital" },
  { value: "seo-sem", label: "Posicionamiento SEO / SEM" },
  { value: "diseno-publicitario", label: "Diseño publicitario" },
  { value: "otros", label: "Otros" },
];

type EmpezamosJuntosValues = {
  nombre: string;
  correo: string;
  telefono?: string;
  tipoProyecto: string;
  proyecto: string;
};

export default function EmpezamosJuntos() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<EmpezamosJuntosValues>({
    mode: "onChange",
    defaultValues: {
      tipoProyecto: "",
    },
  });

  const onSubmit = async (data: EmpezamosJuntosValues) => {
    console.log(data);
  };

  return (
    <section
      id="empezamos-juntos"
      aria-label="Formulario de contacto"
      className="min-h-screen w-full scroll-mt-6 px-6 pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]"
    >
      <h2 className="text-brand-white mb-12 text-center font-sans text-2xl leading-6 font-normal -tracking-widest whitespace-pre-line not-italic [leading-trim:both] [text-edge:cap_alphabetic]">
        {"DINOS QUÉ TIENES EN MENTE\nY LO EMPEZAMOS JUNTOS"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5"
      >
        <TextInput
          label="Nombre"
          required
          placeholder="Escribe tu nombre"
          autoComplete="name"
          error={errors.nombre?.message}
          {...register("nombre", { required: "Ingresa tu nombre" })}
        />

        <TextInput
          label="Correo"
          required
          type="email"
          placeholder="Escribe tu correo electrónico"
          autoComplete="email"
          error={errors.correo?.message}
          {...register("correo", {
            required: "Ingresa tu correo",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ingresa un correo válido",
            },
          })}
        />

        <TextInput
          label="Teléfono"
          type="tel"
          placeholder="Escribe tu número de contacto"
          autoComplete="tel"
          error={errors.telefono?.message}
          {...register("telefono", {
            validate: (value) => {
              const v = String(value ?? "").trim();
              if (!v) return true;
              return (
                /^[+\d\s\-()]{7,20}$/.test(v) || "Ingresa un número válido"
              );
            },
          })}
        />

        <ComboboxInput<EmpezamosJuntosValues>
          name="tipoProyecto"
          control={control}
          label="Tipo de proyecto"
          required
          options={TIPO_PROYECTO_OPTIONS}
          placeholder="Selecciona el tipo de proyecto"
          error={errors.tipoProyecto?.message}
          rules={{ required: "Selecciona el tipo de proyecto" }}
        />

        <TextareaInput
          label="Cuéntanos sobre tu proyecto"
          required
          placeholder="Escribe los detalles de tu proyecto"
          rows={5}
          error={errors.proyecto?.message}
          {...register("proyecto", {
            required: "Cuéntanos sobre tu proyecto",
          })}
        />

        <div>
          <div
            key={isValid ? "valid" : "pending"}
            className="animate-button-form motion-reduce:animate-none"
          >
            {isValid ? (
              <div className="flex flex-row items-center justify-between gap-4 rounded-lg bg-black/25 backdrop-blur-sm">
                <p className="font-axiforma text-brand-cyan min-w-0 flex-1 self-center px-3.5 py-2 text-left text-xs leading-4 font-medium tracking-normal normal-case [leading-trim:both] [text-edge:cap_alphabetic]">
                  Revisa tus datos <br />
                  antes de confirmar.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-cyan font-axiforma text-brand-deep box-border flex h-11 shrink-0 items-center justify-center rounded-lg px-4 text-base leading-none font-bold -tracking-tight uppercase not-italic shadow-md transition-opacity [leading-trim:both] [text-edge:cap_alphabetic] hover:opacity-75 active:opacity-75"
                >
                  {isSubmitting ? "ENVIANDO…" : "CONFIRMAR"}
                </button>
              </div>
            ) : (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="border-brand-white font-axiforma text-brand-white hover:bg-brand-white/25 active:bg-brand-white/25 box-border flex h-11 items-center justify-center rounded-lg border bg-transparent px-4 text-base leading-none font-bold -tracking-tight uppercase not-italic transition-colors [leading-trim:both] [text-edge:cap_alphabetic]"
                >
                  CONFIRMAR
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
