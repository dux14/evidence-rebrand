import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { LocaleProvider } from "@/lib/i18n";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://evidence-rebrand.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "evidence — equipos para medicina estética",
    template: "%s · evidence",
  },
  description:
    "Equipos para medicina estética fabricados en Bogotá desde 1995. Cuatro líneas, fabricación propia, servicio técnico directo. ISO 9001 · ISO 13485 · INVIMA.",
  metadataBase: new URL(SITE_URL),
  // noindex mientras haya specs placeholder públicas y no haya dominio definitivo.
  // Al conectar dominio real: borrar `robots`, actualizar SITE_URL y listo.
  robots: { index: false, follow: true },
  openGraph: {
    title: "evidence — equipos para medicina estética",
    description: "Equipos hechos por las mismas manos que los reparan. Bogotá, desde 1995.",
    url: SITE_URL,
    siteName: "evidence",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "evidence — equipos para medicina estética",
    description: "Equipos hechos por las mismas manos que los reparan.",
  },
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Evidence S.A.S",
  url: SITE_URL,
  logo: `${SITE_URL}/img/brand/evidence-wordmark.png`,
  foundingDate: "1995-02-15",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Carrera 72B #49A-70",
    addressLocality: "Bogotá",
    addressCountry: "CO",
  },
  telephone: "+57 310 3247091",
  email: "servicioalcliente@evidence.com.co",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${interTight.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
