"use server";

import { Resend } from "resend";

export type ContactState = { ok: true } | { ok: false; error: "invalid" | "send" } | null;

const MAX = 200;

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const field = (k: string) => String(formData.get(k) ?? "").trim().slice(0, MAX);

  const nombre = field("nombre");
  const clinica = field("clinica");
  const ciudad = field("ciudad");
  const telefono = field("telefono");

  if (!nombre || !clinica || !ciudad || !/^[+\d][\d\s().-]{6,}$/.test(telefono)) {
    return { ok: false, error: "invalid" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("contact: missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return { ok: false, error: "send" };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    // Remitente sandbox de Resend hasta verificar dominio propio.
    from: "Evidence Landing <onboarding@resend.dev>",
    to,
    subject: `Solicitud de demostración — ${clinica} (${ciudad})`,
    text: [
      `Nombre:   ${nombre}`,
      `Clínica:  ${clinica}`,
      `Ciudad:   ${ciudad}`,
      `Teléfono: ${telefono}`,
      "",
      "Enviado desde evidence-rebrand.vercel.app",
    ].join("\n"),
  });

  if (error) {
    console.error("contact: resend error", error);
    return { ok: false, error: "send" };
  }
  return { ok: true };
}
