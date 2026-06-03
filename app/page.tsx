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
    <main>
      <Nav />
      <HeroNoir />
      <SectionBeat direction="noir-to-crema" whisper="Cuatro disciplinas. Un fabricante." />
      <LineasSection />
      <TeardownSequence />
      <ManufactorySection />
      <TimelineEditorial />
      <RespaldoSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
