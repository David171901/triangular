"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";

export type ComboboxOption = { value: string; label: string };

export type ComboboxInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  options: readonly ComboboxOption[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
  triggerClassName?: string;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
};

export default function ComboboxInput<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = "Selecciona una opción",
  error,
  required,
  className,
  triggerClassName,
  rules,
}: ComboboxInputProps<TFieldValues>) {
  const id = useId();
  const listboxId = `${id}-listbox`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const el = containerRef.current;
      if (el && !el.contains(e.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const selected = options.find((o) => o.value === field.value);
        const filled = Boolean(field.value && String(field.value).length > 0);
        const surfaceBg = error
          ? "bg-brand-lilac"
          : filled
            ? "bg-brand-plum"
            : "bg-brand-lilac";

        return (
          <div
            ref={containerRef}
            className={clsx("relative flex flex-col", className)}
          >
            <label
              id={`${id}-label`}
              htmlFor={id}
              className="font-axiforma text-brand-white mb-3 text-base leading-6 font-medium tracking-normal normal-case not-italic [leading-trim:both] [text-edge:cap_alphabetic]"
            >
              {label}
              {required ? "*" : ""}
            </label>

            <div className="flex flex-col overflow-hidden rounded-lg">
              <button
                id={id}
                type="button"
                role="combobox"
                ref={field.ref}
                aria-invalid={error ? "true" : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-autocomplete="list"
                aria-labelledby={`${id}-label`}
                aria-controls={listboxId}
                className={clsx(
                  "font-axiforma box-border flex h-14 w-full items-center justify-between gap-3 px-3.5 py-4 text-left text-base leading-5 font-medium",
                  "ring-0 outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none",
                  open ? "rounded-t-lg rounded-b-none" : "rounded-lg",
                  filled ? "text-brand-white" : "text-brand-muted",
                  surfaceBg,
                  triggerClassName,
                )}
                onBlur={field.onBlur}
                onClick={() => setOpen((o) => !o)}
              >
                <span className="min-w-0 flex-1 truncate normal-case">
                  {selected ? selected.label : placeholder}
                </span>
                <span
                  className="border-brand-white/50 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-transparent"
                  aria-hidden
                >
                  <ChevronDown
                    size={18}
                    strokeWidth={2}
                    className={clsx(
                      "text-brand-white transition-transform duration-300 ease-out",
                      open && "rotate-180",
                    )}
                  />
                </span>
              </button>

              <div
                className={clsx(
                  "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                  open
                    ? "grid-rows-[1fr] opacity-100"
                    : "pointer-events-none grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <ul
                    id={listboxId}
                    role="listbox"
                    aria-labelledby={`${id}-label`}
                    aria-hidden={!open}
                    className="border-brand-deep/25 bg-brand-violet-600 max-h-64 overflow-auto rounded-b-lg border border-t-0 py-1"
                  >
                    {options.map((opt) => {
                      const active = field.value === opt.value;
                      return (
                        <li
                          key={opt.value}
                          role="option"
                          aria-selected={active}
                          className={clsx(
                            "font-axiforma text-brand-white cursor-pointer border-b border-black/15 px-3.5 py-3 text-base leading-5 font-medium normal-case last:border-b-0",
                            active && "bg-black/10",
                          )}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            field.onChange(opt.value);
                            close();
                          }}
                        >
                          {opt.label}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

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
      }}
    />
  );
}
