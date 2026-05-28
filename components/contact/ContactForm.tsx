"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CINEMATIC_EASE } from "@/lib/motion";
import { copy } from "@/lib/copy";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    // Placeholder: in production wire to a server action / API route.
    await new Promise((r) => setTimeout(r, 700));
    setBusy(false);
    setSubmitted(true);
  };

  return (
    <section
      id="contacto"
      data-mode="crema"
      className="relative isolate overflow-hidden py-28 md:py-40"
      style={{ background: "var(--crema-canvas)", color: "var(--crema-fg)" }}
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
            Agende una demostración en su clínica.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: CINEMATIC_EASE, delay: 0.2 }}
            className="mt-6 max-w-[34ch] text-[16px] leading-[1.55] text-[color:var(--crema-fg)]/75 md:text-[18px]"
          >
            Un técnico Evidence visita su cabina con un Pro configurado para sus protocolos.
          </motion.p>

          <ul className="mt-10 space-y-2 text-[14px]">
            <li className="font-mono-readout text-[10px] opacity-50">— CIUDADES CON COBERTURA</li>
            <li>Bogotá · Medellín · Cali · Barranquilla</li>
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
                SOLICITUD RECIBIDA
              </p>
              <p className="mt-4 font-display text-[24px] font-light leading-[1.2] md:text-[28px]">
                Un técnico de Evidence se comunicará con usted en menos de 48 horas hábiles.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col">
              <Field label="Nombre" name="nombre" autoComplete="name" required />
              <Field label="Clínica" name="clinica" autoComplete="organization" required />
              <div className="grid grid-cols-2 gap-6">
                <Field label="Ciudad" name="ciudad" autoComplete="address-level2" required />
                <Field label="Teléfono" name="telefono" autoComplete="tel" type="tel" required />
              </div>

              <button
                type="submit"
                disabled={busy}
                className="mt-10 inline-flex h-[56px] w-fit items-center gap-3 bg-[color:var(--crema-fg)] px-7 text-[14px] font-medium tracking-tight text-[color:var(--crema-canvas)] transition-all hover:bg-[color:var(--ev-blue-deep)] disabled:opacity-50"
              >
                {busy ? "Enviando…" : "Agendar visita"}
                <span aria-hidden>→</span>
              </button>

              <p className="font-mono-readout mt-6 text-[10px] text-[color:var(--crema-fg)]/45">
                {copy.cta_secondary.toUpperCase()} · +57 1 000 0000
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="group flex flex-col gap-2 border-b border-[color:var(--crema-fg)]/15 py-4 transition-colors focus-within:border-[color:var(--ev-blue-deep)]">
      <span className="font-mono-readout text-[10px] text-[color:var(--crema-fg)]/55 transition-colors group-focus-within:text-[color:var(--ev-blue-deep)]">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="bg-transparent text-[18px] outline-none placeholder:text-[color:var(--crema-fg)]/30"
      />
    </label>
  );
}
