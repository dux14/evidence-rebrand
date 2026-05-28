type Item = { label: string; value: string };

type Props = {
  items: Item[];
  tone?: "crema" | "noir";
  align?: "left" | "right";
};

export function MonoReadout({ items, tone = "crema", align = "left" }: Props) {
  const fg = tone === "noir" ? "text-white" : "text-[color:var(--crema-fg)]";
  const muted = tone === "noir" ? "text-white/55" : "text-[color:var(--crema-fg)]/55";
  const border = tone === "noir" ? "border-white/12" : "border-[color:var(--crema-fg)]/12";
  const alignment = align === "right" ? "ml-auto text-right" : "text-left";

  return (
    <dl className={`font-mono-readout text-[11px] md:text-[12px] ${fg} ${alignment} max-w-[280px]`}>
      {items.map((it, i) => (
        <div
          key={it.label}
          className={`flex items-baseline justify-between gap-6 border-b ${border} ${i === 0 ? "pt-0" : "pt-2.5"} pb-2.5`}
        >
          <dt className={muted}>{it.label}</dt>
          <dd>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
