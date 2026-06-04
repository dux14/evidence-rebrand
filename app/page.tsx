import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { HeroNoir } from "@/components/hero/HeroNoir";
import { SectionBeat } from "@/components/ui/SectionBeat";
import { LineasSection } from "@/components/lineas/LineasSection";
import { TeardownSequence } from "@/components/evidence-pro-detail/TeardownSequence";
import { ManufactorySection } from "@/components/manufactory/ManufactorySection";
import { TimelineEditorial } from "@/components/timeline/TimelineEditorial";
import { RespaldoSection } from "@/components/respaldo/RespaldoSection";
import { ContactForm } from "@/components/contact/ContactForm";

export default function Page() {
  return (
    <>
      {/* Nav fuera de <main>: semántica correcta y el skip-link (#contenido)
          aterriza después del nav en el orden de tabulación. Footer fuera por
          la misma razón (landmark propio). */}
      <Nav />
      <main id="contenido">
        <HeroNoir />
        <SectionBeat direction="noir-to-crema" />
        <LineasSection />
        <TeardownSequence />
        <ManufactorySection />
        <TimelineEditorial />
        <RespaldoSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
