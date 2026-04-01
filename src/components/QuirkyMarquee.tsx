type QuirkyMarqueeProps = {
  items: string[];
  palette?: "teal" | "amber" | "mint" | "slate";
  reverse?: boolean;
  variant?: 1 | 2 | 3;
  fullBleed?: boolean;
};

const paletteClass: Record<NonNullable<QuirkyMarqueeProps["palette"]>, string> = {
  teal: "[--marquee-accent:hsl(184_48%_35%)] [--marquee-highlight:hsl(184_42%_52%)]",
  amber: "[--marquee-accent:hsl(20_76%_56%)] [--marquee-highlight:hsl(34_82%_58%)]",
  mint: "[--marquee-accent:hsl(154_33%_31%)] [--marquee-highlight:hsl(158_40%_48%)]",
  slate: "[--marquee-accent:hsl(214_28%_30%)] [--marquee-highlight:hsl(210_20%_48%)]",
};

const QuirkyMarquee = ({
  items,
  palette = "teal",
  reverse = false,
  variant = 1,
  fullBleed = true,
}: QuirkyMarqueeProps) => {
  const safeItems = items.length > 0 ? items : ["Raipur Life"];
  const repeated = [...safeItems, ...safeItems, ...safeItems];
  const variantClass = `marquee-v${variant}`;

  return (
    <div className={`${fullBleed ? "marquee-full-bleed" : ""}`}>
      <div className={`marquee-shell ${variantClass} ${paletteClass[palette]}`}>
      <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
        {repeated.map((item, index) => (
          <div key={`${item}-${index}`} className="inline-flex items-center gap-3">
            <span className={`marquee-chip ${variantClass}`} style={{ borderColor: "var(--marquee-accent)", boxShadow: "0 6px 14px hsl(214 24% 14% / 0.08)" }}>
              {item}
            </span>
            <span className={`marquee-dot ${variantClass}`} style={{ color: "var(--marquee-highlight)" }}>•</span>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default QuirkyMarquee;
