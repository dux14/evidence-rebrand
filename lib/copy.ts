import es from "@/content/copy.es.json";

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

export type TeardownBeat = { eyebrow: string; title: string; body: string };

export type UiCopy = {
  nav_links: { href: string; label: string }[];
  nav_menu_open: string;
  nav_menu_close: string;
  hero_meta_location: string;
  hero_meta_film: string;
  hero_readout_lines: string[];
  hero_scroll_cue: string;
  beat_whisper: string;
  teardown_eyebrow: string;
  teardown_scroll_label: string;
  teardown_beats: TeardownBeat[];
  lineas_eyebrow: string;
  lineas_tech_label: string;
  lineas_quote: string;
  lineas_cta_prefix: string;
  respaldo_subhead: string;
  manufactory_eyebrow_label: string;
  manufactory_eyebrow: string;
  manufactory_captions: string[];
  timeline_eyebrow: string;
  timeline_counter: string;
  timeline_headline: string;
  timeline_quote: string;
  timeline_hito_label: string;
  timeline_year_aria: string;
  timeline_alts: Record<string, string>;
  respaldo_eyebrow_label: string;
  respaldo_eyebrow: string;
  contact_headline: string;
  contact_body: string;
  contact_cities_label: string;
  contact_cities: string;
  contact_fields: { nombre: string; clinica: string; ciudad: string; telefono: string };
  contact_submit: string;
  contact_sending: string;
  contact_success_eyebrow: string;
  contact_success_msg: string;
  meta_title: string;
  meta_description: string;
  contact_error_invalid: string;
  contact_error_msg: string;
  contact_phone: string;
  contact_email: string;
  footer_sedes_label: string;
  footer_cities: string[];
  footer_copyright: string;
};

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
  ui: UiCopy;
};

/** Default (ES) copy — para contextos server/no-reactivos. Componentes client usan useCopy(). */
export const copy = es as Copy;
