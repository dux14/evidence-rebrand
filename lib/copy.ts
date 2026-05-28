import data from "@/content/copy.json";

export type LineaDescriptor = {
  nombre: string;
  descriptor: string;
  tecnologias: string[];
};

export type TimelineMilestone = {
  anio: string;
  objeto: string;
  frase: string;
};

export type RespaldoPromise = {
  index: string;
  claim: string;
  metrics: { label: string; value: string }[];
};

export type EvidenceSpec = { label: string; value: string };

export type Copy = {
  hero_headline: string;
  hero_subheadline: string;
  seccion_lineas_headline: string;
  lineas_descriptors: LineaDescriptor[];
  evidence_pro_detail_intro: string;
  evidence_pro_specs: EvidenceSpec[];
  manufactory_headline: string;
  manufactory_subhead: string;
  manufactory_quote: string;
  timeline_milestones: TimelineMilestone[];
  respaldo_headline: string;
  respaldo_concrete_promises: RespaldoPromise[];
  cta_primary: string;
  cta_secondary: string;
  footer_line: string;
};

export const copy = data as Copy;
