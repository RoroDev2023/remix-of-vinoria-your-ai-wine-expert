const bandItems = [
  { text: "Vinoria Live", tone: "text-primary" },
  { text: "Hologram Sommelier", tone: "text-foreground/80" },
  { text: "Sensor-Driven", tone: "text-gold" },
  { text: "Voice Mode", tone: "text-muted-foreground" },
  { text: "Instant Pairings", tone: "text-foreground/70" },
  { text: "Cellar Intelligence", tone: "text-primary/80" },
];

const HomePulseBand = () => {
  const track = [...bandItems, ...bandItems];

  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-gradient-to-r from-background via-card/60 to-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-16 top-1/2 h-24 w-24 rounded-full bg-primary/15 blur-2xl animate-float" />
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gold/15 blur-3xl animate-float [animation-delay:1.2s]" />
        <div className="absolute left-1/3 bottom-0 h-16 w-40 rounded-full bg-tech/20 blur-2xl animate-float [animation-delay:2.2s]" />
      </div>

      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max items-center gap-10 py-5 animate-[marquee_28s_linear_infinite]">
          {track.map((item, index) => (
            <span
              key={`${item.text}-${index}`}
              className={`font-body text-[11px] md:text-sm uppercase tracking-[0.35em] ${item.tone}`}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePulseBand;
