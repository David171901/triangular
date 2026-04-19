// # TODO: review code
"use client";

import clsx from "clsx";
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export type TextareaInputProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className"
> & {
  label: string;
  /** Mensaje de error (p. ej. errors.campo?.message de react-hook-form) */
  error?: string;
  /** Muestra asterisco en la etiqueta */
  required?: boolean;
  className?: string;
  textareaClassName?: string;
};

function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (value) => {
    for (const ref of refs) {
      if (ref == null) continue;
      if (typeof ref === "function") ref(value);
      else (ref as React.RefObject<T | null>).current = value;
    }
  };
}

/**
 * Área de texto para usar con {@link https://react-hook-form.com/ react-hook-form}:
 *
 * ```tsx
 * const { register, formState: { errors } } = useForm();
 * <TextareaInput
 *   label="Mensaje"
 *   required
 *   placeholder="Escribe tu mensaje"
 *   rows={5}
 *   error={errors.mensaje?.message as string | undefined}
 *   {...register("mensaje", { required: "Ingresa un mensaje" })}
 * />
 * ```
 */
const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  function TextareaInput(
    {
      label,
      error,
      required,
      className,
      textareaClassName,
      onChange,
      defaultValue,
      value,
      rows = 4,
      ...restProps
    },
    forwardedRef,
  ) {
    const { ref: registerRef, ...rest } = restProps as typeof restProps & {
      ref?: React.Ref<HTMLTextAreaElement>;
    };
    const id = useId();
    const innerRef = useRef<HTMLTextAreaElement | null>(null);
    const [filled, setFilled] = useState(() => {
      if (value != null && value !== "") return true;
      if (defaultValue != null && String(defaultValue) !== "") return true;
      return false;
    });

    const syncFilledFromDom = useCallback(() => {
      const el = innerRef.current;
      if (!el) return;
      setFilled(el.value.length > 0);
    }, []);

    useEffect(() => {
      syncFilledFromDom();
    }, [syncFilledFromDom, value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFilled(e.target.value.length > 0);
      onChange?.(e);
    };

    const surfaceBg = error
      ? "bg-brand-lilac"
      : filled
        ? "bg-brand-plum"
        : "bg-brand-lilac";

    return (
      <div className={clsx("flex flex-col", className)}>
        <label
          htmlFor={id}
          className="font-axiforma text-brand-white mb-3 text-base leading-6 font-medium tracking-normal normal-case not-italic [leading-trim:both] [text-edge:cap_alphabetic]"
        >
          {label}
          {required ? "*" : ""}
        </label>
        <textarea
          id={id}
          ref={mergeRefs(
            innerRef,
            registerRef as React.Ref<HTMLTextAreaElement> | undefined,
            forwardedRef,
          )}
          rows={rows}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={clsx(
            "font-axiforma text-brand-white box-border min-h-32 w-full resize-y rounded-lg px-3.5 py-4 text-base leading-5",
            "normal-case",
            "placeholder:text-brand-muted",
            "ring-0 outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none",
            surfaceBg,
            textareaClassName,
          )}
          autoCapitalize="none"
          autoCorrect="off"
          onChange={handleChange}
          defaultValue={defaultValue}
          value={value}
          {...rest}
        />
        {error ? (
          <p
            id={`${id}-error`}
            role="alert"
            className="font-axiforma text-brand-fuchsia mt-1.5 text-right text-sm leading-6 font-medium tracking-normal normal-case not-italic [leading-trim:both] [text-edge:cap_alphabetic]"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

export default TextareaInput;
