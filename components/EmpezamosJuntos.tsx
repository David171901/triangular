// TODO: Code Review
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";
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

function TodoListoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-[rgba(15,8,35,0.55)] backdrop-blur-md motion-reduce:backdrop-blur-sm"
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="todo-listo-modal-title"
        className="animate-modal-slide-from-left relative z-1 flex h-[560px] w-full max-w-[min(100%,22rem)] flex-col justify-between rounded-3xl bg-[linear-gradient(180deg,var(--brand-indigo)_0%,var(--brand-violet-600)_42%,var(--brand-violet-ink)_100%)] px-10 py-14 shadow-2xl motion-reduce:animate-none"
      >
        <h2
          id="todo-listo-modal-title"
          className="text-brand-cyan text-45 shrink-0 font-sans leading-10 font-normal -tracking-tight uppercase not-italic drop-shadow-lg [leading-trim:cap-height] [text-edge:cap_alphabetic]"
        >
          ¡Todo listo!
        </h2>

        <div className="mt-9 flex shrink-0 items-center gap-5 sm:mt-10">
          <div
            className="border-brand-white flex size-20 shrink-0 items-center justify-center rounded-full border-2"
            aria-hidden
          >
            <Check
              className="text-brand-cyan size-8"
              strokeWidth={2.5}
              aria-hidden
            />
          </div>
          <p className="font-axiforma text-brand-white min-w-0 flex-1 text-left text-base leading-5 font-normal tracking-normal not-italic [leading-trim:cap-height] [text-edge:cap_alphabetic]">
            En un plazo de 2 días te contactaremos para coordinar una reunión y
            revisar juntos tu idea.
          </p>
        </div>

        <div className="mt-8 flex shrink-0 justify-end sm:mt-9">
          <button
            type="button"
            onClick={onClose}
            className="font-axiforma bg-brand-purple text-brand-deep box-border flex h-10 w-32 items-center justify-center gap-4 rounded-md px-4 opacity-100 shadow-md transition-opacity [text-edge:cap_alphabetic] hover:opacity-90 active:opacity-90"
          >
            <span className="text-sm leading-none font-bold tracking-normal uppercase not-italic [leading-trim:cap-height]">
              Entendido
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EmpezamosJuntos() {
  const [todoListoOpen, setTodoListoOpen] = useState(false);

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
    setTodoListoOpen(true);
  };

  return (
    <section
      id="empezamos-juntos"
      aria-label="Formulario de contacto"
      className="xs:container xs:mx-auto xs:px-0 xs:pt-20 xs:pb-28 min-h-screen w-full scroll-mt-6 px-6 pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]"
    >
      <h2 className="text-brand-white xs:text-4xl xs:leading-10 xs:mb-16 mb-12 text-center font-sans text-2xl leading-6 font-normal -tracking-widest whitespace-pre-line uppercase not-italic [leading-trim:both] [text-edge:cap_alphabetic]">
        {"DINOS QUÉ TIENES EN MENTE\nY LO EMPEZAMOS JUNTOS"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="xs:grid xs:grid-cols-2 xs:gap-x-6 xs:gap-y-6 flex flex-col gap-5"
      >
        <TextInput
          className="xs:min-w-0"
          label="Nombre"
          required
          placeholder="Escribe tu nombre"
          autoComplete="name"
          error={errors.nombre?.message}
          {...register("nombre", { required: "Ingresa tu nombre" })}
        />

        <TextInput
          className="xs:min-w-0"
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
          className="xs:min-w-0"
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
          className="xs:min-w-0"
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
          className="xs:col-span-2"
          label="Cuéntanos sobre tu proyecto"
          required
          placeholder="Escribe los detalles de tu proyecto"
          rows={5}
          textareaClassName="xs:min-h-52"
          error={errors.proyecto?.message}
          {...register("proyecto", {
            required: "Cuéntanos sobre tu proyecto",
          })}
        />

        <div className="xs:col-span-2 w-full">
          <div className={isValid ? "w-full" : "flex w-full justify-end"}>
            <div
              className={`inline-flex max-w-full items-center gap-4 rounded-lg ${
                isValid
                  ? "xs:flex xs:flex-row xs:justify-between w-full flex-row-reverse bg-black/25 backdrop-blur-sm"
                  : "flex-row-reverse"
              }`}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className={`font-axiforma xs:order-2 order-1 box-border flex h-11 w-44 shrink-0 items-center justify-center rounded-lg px-8 text-base leading-none font-bold uppercase not-italic [leading-trim:both] [text-edge:cap_alphabetic] ${
                  isValid
                    ? "bg-brand-cyan text-brand-deep xs:h-10 xs:w-32 xs:rounded-md xs:px-4 xs:text-sm xs:tracking-wide -tracking-tight shadow-md transition-opacity hover:opacity-75 active:opacity-75"
                    : "border-brand-white text-brand-white hover:bg-brand-white/25 active:bg-brand-white/25 border bg-transparent -tracking-tight transition-colors"
                }`}
              >
                {isSubmitting ? "Enviando…" : "Confirmar"}
              </button>
              {isValid ? (
                <p
                  key="form-hint"
                  className="font-axiforma text-brand-cyan animate-form-hint-in xs:order-1 xs:px-0 xs:py-0 xs:text-base xs:leading-normal xs:font-normal xs:pl-4 order-2 min-w-0 flex-1 self-center px-3.5 py-2 text-left text-xs leading-4 font-medium tracking-normal normal-case [leading-trim:both] [text-edge:cap_alphabetic] motion-reduce:animate-none"
                >
                  Revisa tus datos
                  <br className="xs:hidden" /> antes de confirmar.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </form>

      <TodoListoModal
        open={todoListoOpen}
        onClose={() => setTodoListoOpen(false)}
      />
    </section>
  );
}
