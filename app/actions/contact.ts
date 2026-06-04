"use server";

import { Resend } from "resend";

export type ContactValues = {
  nombre: string;
  clinica: string;
  email: string;
  ciudad: string;
  telefono: string;
};
// `values` viaja en el estado de error: React 19 resetea el form tras la
// action y sin esto el usuario perdería lo que escribió.
export type ContactState =
  | { ok: true }
  | { ok: false; error: "invalid" | "send"; values: ContactValues }
  | null;

const MAX = 200;

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const field = (k: string) => String(formData.get(k) ?? "").trim().slice(0, MAX);

  // Honeypot anti-spam: "sitio" está oculto para humanos (CSS + tabIndex -1);
  // si llega con valor es un bot. Respondemos éxito silencioso para no
  // delatar el mecanismo. (P1-3, auditoría 2026-06-04)
  if (field("sitio")) {
    return { ok: true };
  }

  const nombre = field("nombre");
  const clinica = field("clinica");
  const email = field("email");
  const ciudad = field("ciudad");
  const telefono = field("telefono");
  const values: ContactValues = { nombre, clinica, email, ciudad, telefono };

  if (
    !nombre ||
    !clinica ||
    !ciudad ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !/^[+\d][\d\s().-]{6,}$/.test(telefono)
  ) {
    return { ok: false, error: "invalid", values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("contact: missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return { ok: false, error: "send", values };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    // Remitente sandbox de Resend hasta verificar dominio propio.
    from: "Evidence Landing <onboarding@resend.dev>",
    to,
    // replyTo: responder al lead directo desde el buzón (P1-5).
    replyTo: email,
    subject: `Solicitud de demostración — ${clinica} (${ciudad})`,
    text: [
      `Nombre:   ${nombre}`,
      `Clínica:  ${clinica}`,
      `Email:    ${email}`,
      `Ciudad:   ${ciudad}`,
      `Teléfono: ${telefono}`,
      "",
      "Enviado desde evidence-rebrand.vercel.app",
    ].join("\n"),
  });

  if (error) {
    console.error("contact: resend error", error);
    return { ok: false, error: "send", values };
  }
  return { ok: true };
}
