"use client";

import { motion } from "framer-motion";
import { useActionState } from "react";
import { CINEMATIC_EASE } from "@/lib/motion";
import { useCopy } from "@/lib/i18n";
import { sendContact, type ContactState } from "@/app/actions/contact";

export function ContactForm() {
  const copy = useCopy();
  const [state, formAction, pending] = useActionState<ContactState, FormData>(sendContact, null);
  const submitted = state?.ok === true;
  // React 19 resetea el form tras la action; rehidratamos con lo enviado.
  const prev = state && !state.ok ? state.values : undefined;

  return (
    <section
      id="contacto"
      data-mode="crema"
      className="relative isolate overflow-hidden py-28 md:py-40"
      style={{ background: "var(--crema-ivory)", color: "var(--crema-fg)" }}
    >
      <div className="crema-grain pointer-events-none absolute inset-0" />

      <div className="section-frame relative grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: CINEMATIC_EASE }}
            className="max-w-[16ch] font-display text-[36px] font-light leading-[1.02] md:text-[56px]"
          >
            {copy.ui.contact_headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: CINEMATIC_EASE, delay: 0.2 }}
            className="mt-6 max-w-[34ch] text-[16px] leading-[1.55] text-[color:var(--crema-fg)]/75 md:text-[18px]"
          >
            {copy.ui.contact_body}
          </motion.p>

          <ul className="mt-10 space-y-2 text-[14px] md:text-[17px]">
            <li className="font-mono-readout text-[10px] opacity-70 md:text-[12px]">
              {copy.ui.contact_cities_label}
            </li>
            <li>{copy.ui.contact_cities}</li>
          </ul>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: CINEMATIC_EASE }}
              className="border-t border-[color:var(--crema-fg)]/10 pt-8"
            >
              <p className="font-mono-readout text-[11px] text-[color:var(--ev-blue-deep)]">
                {copy.ui.contact_success_eyebrow}
              </p>
              <p className="mt-4 font-display text-[24px] font-light leading-[1.2] md:text-[28px]">
                {copy.ui.contact_success_msg}
              </p>
            </motion.div>
          ) : (
            <form action={formAction} className="flex flex-col">
              <Field
                label={copy.ui.contact_fields.nombre}
                name="nombre"
                autoComplete="name"
                required
                defaultValue={prev?.nombre}
              />
              <Field
                label={copy.ui.contact_fields.clinica}
                name="clinica"
                autoComplete="organization"
                required
                defaultValue={prev?.clinica}
              />
              <div className="grid grid-cols-2 gap-6">
                <Field
                  label={copy.ui.contact_fields.ciudad}
                  name="ciudad"
                  autoComplete="address-level2"
                  required
                  defaultValue={prev?.ciudad}
                />
                <Field
                  label={copy.ui.contact_fields.telefono}
                  name="telefono"
                  autoComplete="tel"
                  type="tel"
                  required
                  defaultValue={prev?.telefono}
                />
              </div>

              <button
                type="submit"
                disabled={pending}
                className="mt-10 inline-flex h-[56px] w-fit items-center gap-3 bg-[color:var(--crema-fg)] px-7 text-[14px] font-medium tracking-tight text-[color:var(--crema-canvas)] transition-all hover:bg-[color:var(--ev-blue-deep)] disabled:opacity-50"
              >
                {pending ? copy.ui.contact_sending : copy.ui.contact_submit}
                <span aria-hidden>→</span>
              </button>

              {state && !state.ok ? (
                <p role="alert" className="mt-4 text-[13px] text-[#A33B2E]">
                  {state.error === "invalid"
                    ? copy.ui.contact_error_invalid
                    : copy.ui.contact_error_msg}
                </p>
              ) : null}

              <p className="font-mono-readout mt-6 text-[10px] text-[color:var(--crema-fg)]/70 md:text-[12px]">
                {copy.cta_secondary.toUpperCase()} ·{" "}
                <a
                  href={`tel:${copy.ui.contact_phone.replace(/\s/g, "")}`}
                  className="hover:opacity-100"
                >
                  {copy.ui.contact_phone}
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  defaultValue?: string;
}) {
  return (
    <label className="group flex flex-col gap-2 border-b border-[color:var(--crema-fg)]/15 py-4 transition-colors focus-within:border-[color:var(--ev-blue-deep)]">
      <span className="font-mono-readout text-[10px] text-[color:var(--crema-fg)]/70 transition-colors group-focus-within:text-[color:var(--ev-blue-deep)] md:text-[12px]">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        className="bg-transparent text-[18px] outline-none placeholder:text-[color:var(--crema-fg)]/30 md:text-[20px]"
      />
    </label>
  );
}
